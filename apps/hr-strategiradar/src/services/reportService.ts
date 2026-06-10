import type { HrMicroproject, AiUseTask, Scenario } from '../domain/schemas'
import type { ValueJudgments } from './mockDiagnosisService'
import { presentRole, presentStopRule } from './presentationLanguage'

/** Generate restrictions based on task type and risk flags */
function generateRestrictions(task: AiUseTask, judgments: ValueJudgments): string[] {
  const restrictions: string[] = []

  if (task.directEffectOnPeople || judgments.rightsOrWorkImpact) {
    restrictions.push('KI skal ikke brukes til å prioritere, rangere eller beslutte på individnivå.')
  }
  if (task.usesPersonalOrSensitiveData || judgments.sensitiveOrPersonalDataRisk) {
    restrictions.push('KI skal ikke behandle personopplysninger uten særskilt kontroll og databehandleravtale.')
  }
  if (judgments.relationalTrustImportant) {
    restrictions.push('KI skal ikke erstatte menneskelig kontakt der tillit og relasjon er viktig.')
  }
  if (judgments.localExceptionsMatter) {
    restrictions.push('KI-output skal ikke brukes uten lokal sjekk av den som kjenner situasjonen.')
  }
  if (judgments.errorReversible === false) {
    restrictions.push('KI-output skal ikke brukes i situasjoner der feil er vanskelige å rette opp.')
  }

  if (restrictions.length === 0) {
    restrictions.push('Ingen spesifikke begrensninger utover normal kvalitetskontroll.')
  }

  return restrictions
}

/**
 * Generate a Markdown decision memo (beslutningsnotat) from assessment state.
 *
 * All user-facing text uses presentation language — no SR-codes,
 * no "separabilitet", no technical jargon.
 */
export function generateReport(
  project: HrMicroproject,
  task: AiUseTask,
  judgments: ValueJudgments,
  decisionLog: Record<string, string>,
  scenarios: Scenario[]
): string {
  const stopRuleTexts = task.expectedStopRules.map(r => presentStopRule(r))
  const restrictions = generateRestrictions(task, judgments)
  const calculatedLabel = presentRole(task.expectedCalculatedRole)
  const allowedLabel = presentRole(task.expectedAllowedRole)
  const hasRoleDifference = task.expectedCalculatedRole !== task.expectedAllowedRole

  const sections: string[] = []

  // Header
  sections.push(`# Beslutningsnotat — utkast fra workshop`)
  sections.push('')
  sections.push(`> Dette er et utkast. Må gjennomgås av ${project.decisionOwner} før bruk.`)
  sections.push('')

  // 1. HR-kontekst
  sections.push(`## Saken`)
  sections.push('')
  sections.push(`**${project.title}**`)
  sections.push('')
  sections.push(`**Mål:** ${project.strategicGoal}`)
  sections.push('')
  sections.push(`**Berørte:** ${project.affectedParties.join(', ')}`)
  sections.push('')
  sections.push(`**Beslutningseier:** ${project.decisionOwner}`)
  sections.push('')

  // 2. KI-bruksoppgave
  sections.push(`## Hva KI skal gjøre`)
  sections.push('')
  sections.push(`**Oppgave:** ${task.title}`)
  sections.push('')
  sections.push(`**Brukes til:** ${task.outputUse}`)
  sections.push('')
  sections.push(`**Mennesket tar stilling her:** ${task.humanDecisionPoint}`)
  sections.push('')

  // 3. Røde flagg (FØR rolle)
  if (stopRuleTexts.length > 0) {
    sections.push(`## Vi ser noe som begrenser KI-bruken`)
    sections.push('')
    for (const text of stopRuleTexts) {
      sections.push(`- ${text}`)
    }
    sections.push('')
  }

  // 4. Kompassvurdering
  sections.push(`## Kompassvurdering`)
  sections.push('')
  sections.push(`- **Hvor tydelige er målene:** ${task.expectedModuleScores.målklarhet.score.toFixed(1)} av 5.0`)
  sections.push(`- **Kan det løses med faste regler:** ${task.expectedModuleScores.separabilitet.score.toFixed(1)} av 5.0`)
  sections.push('')

  // 5. KI-rolle
  sections.push(`## KI-rolle`)
  sections.push('')
  sections.push(`**Hva modellen foreslår:** ${calculatedLabel}`)
  sections.push('')
  sections.push(`**Vår anbefaling etter gjennomgang:** ${allowedLabel}`)
  sections.push('')
  if (hasRoleDifference) {
    sections.push(`**Hvorfor forskjellen:** Røde flagg begrenser KI-bruken til en tryggere rolle.`)
    sections.push('')
  }

  // 5. Hva KI ikke skal gjøre
  sections.push(`## Hva KI ikke skal gjøre`)
  sections.push('')
  for (const r of restrictions) {
    sections.push(`- ${r}`)
  }
  sections.push('')

  // 6. Lokal verifikasjon
  sections.push(`## Lokal verifikasjon`)
  sections.push('')
  sections.push(task.requiredLocalVerification)
  sections.push('')

  // 7. ROS-punkter fra workshop
  if (scenarios.length > 0) {
    sections.push(`## Risikopunkter fra workshopen`)
    sections.push('')
    for (const s of scenarios) {
      sections.push(`### ${s.temaTittel}`)
      sections.push('')
      sections.push(`**Hvis dette skjer:** ${s.simulertHendelse}`)
      sections.push('')
      if (s.tidligeSignaler) {
        sections.push(`**Tidlige signaler:** ${s.tidligeSignaler}`)
        sections.push('')
      }
      if (s.lokalVerifikasjon) {
        sections.push(`**Må sjekkes lokalt:** ${s.lokalVerifikasjon}`)
        sections.push('')
      }
      if (s.ansvarligEier) {
        sections.push(`**Ansvarlig:** ${s.ansvarligEier}`)
        sections.push('')
      }
      sections.push(`**Bekymring:** ${s.bekymringsniva}`)
      sections.push('')
    }
  }

  // 8. Menneskelig vurdering
  sections.push(`## Menneskelig vurdering`)
  sections.push('')
  if (decisionLog.risikovurdering) {
    sections.push(`### Risikovurdering`)
    sections.push('')
    sections.push(decisionLog.risikovurdering)
    sections.push('')
  }
  if (decisionLog.menneskeligKontroll) {
    sections.push(`### Menneskelig kontroll`)
    sections.push('')
    sections.push(decisionLog.menneskeligKontroll)
    sections.push('')
  }
  if (decisionLog.endeligBeslutning) {
    sections.push(`### Beslutning`)
    sections.push('')
    sections.push(decisionLog.endeligBeslutning)
    sections.push('')
  }

  // Footer
  sections.push(`---`)
  sections.push('')
  sections.push(`*Generert av HR Strategiradar. Dette er et arbeidsnotat, ikke en endelig juridisk vurdering.*`)

  return sections.join('\n')
}

/**
 * Generate a JSON export with the same assessment data, using presentation language.
 * No SR-codes, no camelCase domain terms, no technical jargon in output.
 */
export function generateJsonExport(
  project: HrMicroproject,
  task: AiUseTask,
  judgments: ValueJudgments,
  decisionLog: Record<string, string>,
  scenarios: Scenario[]
): string {
  const restrictions = generateRestrictions(task, judgments)

  const exportObj = {
    status: 'Utkast fra workshop — må gjennomgås før bruk',
    generert: new Date().toISOString().slice(0, 10),

    prosjekt: {
      tittel: project.title,
      mål: project.strategicGoal,
      berørte: project.affectedParties,
      beslutningseier: project.decisionOwner,
    },

    kiOppgave: {
      tittel: task.title,
      brukesTil: task.outputUse,
      menneskeligBeslutningspunkt: task.humanDecisionPoint,
    },

    kompass: {
      tydeligeMål: task.expectedModuleScores.målklarhet.score,
      fasteRegler: task.expectedModuleScores.separabilitet.score,
    },

    vurdering: {
      rødeFlagg: task.expectedStopRules.map(r => presentStopRule(r)),
      modellForeslår: presentRole(task.expectedCalculatedRole),
      anbefalingEtterGjennomgang: presentRole(task.expectedAllowedRole),
      hvaKiIkkeSkalGjøre: restrictions,
      lokalVerifikasjon: task.requiredLocalVerification,
    },

    risikopunkter: scenarios.map(s => ({
      tema: s.temaTittel,
      hvisDetteSkjer: s.simulertHendelse,
      tidligeSignaler: s.tidligeSignaler,
      måSjekkesLokalt: s.lokalVerifikasjon,
      ansvarlig: s.ansvarligEier,
      bekymring: s.bekymringsniva,
    })),

    menneskeligVurdering: {
      risikovurdering: decisionLog.risikovurdering || '',
      kontroll: decisionLog.menneskeligKontroll || '',
      beslutning: decisionLog.endeligBeslutning || '',
    },
  }

  // Suppress unused param warning
  void judgments

  return JSON.stringify(exportObj, null, 2)
}
