import type { HrMicroproject, AiUseTask, Scenario } from '../domain/schemas'
import { STOP_RULES_MAP, ROLE_LABELS, compareBlindTestRole } from './mockDiagnosisService'

const TRAFFIC_LIGHT_TEXT: Record<string, string> = {
  green: 'Grønt — greit å jobbe videre',
  yellow: 'Gult — noe må avklares først',
  red: 'Rødt — stopp og gjør en grundig vurdering først',
}

// Områder oppgaven berører — samme logikk som badges i steg 1.
function affectedAreas(task: AiUseTask): string[] {
  const areas: string[] = []
  if (task.directEffectOnPeople) areas.push('Ansattes rettigheter')
  if (task.usesPersonalOrSensitiveData) areas.push('Personvern')
  if (task.expectedRiskFlags?.healthSafetyEnvironment) areas.push('HMS')
  if (task.expectedRiskFlags?.workConditionsImpact) areas.push('Arbeidsvilkår')
  if (task.expectedRiskFlags?.irreversibleConsequences) areas.push('Vanskelig å angre')
  if (task.expectedRiskFlags?.discriminationRisk) areas.push('Diskrimineringsrisiko')
  return areas
}

/**
 * Bygger en ferdig-til-å-lime-inn prompt fra sak + vurdering. Prompten tas ut
 * til en ekstern, linse-utstyrt LLM; svaret limes tilbake i appen som kontekst.
 * Inneholder ingen SR-koder eller fagtermer — bare klartekst.
 */
export function generateLensPrompt(
  project: HrMicroproject,
  task: AiUseTask,
  scenarios: Scenario[],
  userBlindTestAnswer?: string | null,
): string {
  const scores = task.expectedModuleScores
  const lines: string[] = []

  lines.push('# Innspill ønskes: vurdering av KI-bruk i en HR-sak')
  lines.push('')
  lines.push('Vi er en prosjektgruppe som vurderer om det er forsvarlig å bruke KI i en konkret HR-oppgave. Under er saken og vår foreløpige vurdering. Vi ønsker innspill fra deres perspektiver før vi konkluderer.')
  lines.push('')

  lines.push('## Saken')
  lines.push(`- Sak: ${project.caseId} – ${project.title}`)
  lines.push(`- Konkret KI-oppgave som vurderes: ${task.title}`)
  lines.push(`- Datagrunnlag: ${task.inputDataType}`)
  lines.push(`- Hvem som tar beslutningen: ${task.humanDecisionPoint}`)
  lines.push(`- Ansvarlig: ${project.decisionOwner}`)
  lines.push('')

  lines.push('## Vår foreløpige vurdering')
  lines.push(`- Hvor tydelige er målene: ${scores.målklarhet.score.toFixed(1)} av 5`)
  lines.push(`- Kan oppgaven løses med faste regler: ${scores.separabilitet.score.toFixed(1)} av 5`)
  lines.push(`- Anbefalt KI-rolle: ${ROLE_LABELS[task.expectedAllowedRole] || task.expectedAllowedRole}`)
  lines.push(`- Status (trafikklys): ${TRAFFIC_LIGHT_TEXT[task.expectedTrafficLight || 'yellow']}`)
  lines.push('')

  const stopRules = task.expectedStopRules || []
  lines.push('## Forhold som må avklares')
  if (stopRules.length > 0) {
    for (const sr of stopRules) lines.push(`- ${STOP_RULES_MAP[sr] || sr}`)
  } else {
    lines.push('- Ingen spesielle forhold er flagget ut fra det vi vet.')
  }
  lines.push('')

  const areas = affectedAreas(task)
  if (areas.length > 0) {
    lines.push('## Områder oppgaven berører')
    for (const a of areas) lines.push(`- ${a}`)
    lines.push('')
  }

  if (userBlindTestAnswer) {
    const cmp = compareBlindTestRole(userBlindTestAnswer, task.expectedAllowedRole)
    const cmpText =
      cmp === 'overconfident'
        ? ' (gruppen vil gi KI en større rolle enn systemet anbefaler)'
        : cmp === 'cautious'
          ? ' (gruppen er strengere enn systemet)'
          : cmp === 'agree'
            ? ' (samsvar med systemet)'
            : ''
    lines.push('## Gruppens egen vurdering')
    lines.push(`- Gruppen mente KI-rollen burde være: ${ROLE_LABELS[userBlindTestAnswer] || userBlindTestAnswer}${cmpText}`)
    lines.push('')
  }

  const describedRisks = scenarios.filter((s) => s.simulertHendelse.trim().length > 0)
  if (describedRisks.length > 0) {
    lines.push('## Risikoer gruppen har beskrevet')
    for (const s of describedRisks) lines.push(`- ${s.temaTittel}: ${s.simulertHendelse}`)
    lines.push('')
  }

  if (project.uncertainties && project.uncertainties.length > 0) {
    lines.push('## Åpne spørsmål / usikkerhet')
    for (const u of project.uncertainties) lines.push(`- ${u}`)
    lines.push('')
  }

  lines.push('## Hva vi ønsker fra dere')
  lines.push('Vurder saken fra deres ulike perspektiver (linser). Pek særlig på:')
  lines.push('1. Blindsoner og forhold vi har oversett.')
  lines.push('2. Om den anbefalte KI-rollen er forsvarlig, eller om den bør strammes inn.')
  lines.push('3. Konkrete lokale kontrollpunkter og tiltak som må på plass før KI tas i bruk.')
  lines.push('4. Juridiske, personvernmessige, HMS- og arbeidsrettslige forhold som må avklares.')
  lines.push('')
  lines.push('Svar strukturert og kortfattet, slik at vi kan lime svaret rett inn i beslutningsnotatet vårt.')

  return lines.join('\n')
}
