import { allCases } from '../fixtures/all-cases'
import type { AiUseTask, HrMicroproject, StopRule } from '../domain/schemas'
import type { Point } from '../store/store'

export interface ValueJudgments {
  relationalTrustImportant: boolean | null
  humanPresencePartOfValue: boolean | null
  localExceptionsMatter: boolean | null
  valueConflictPresent: boolean | null
  errorReversible: boolean | null
  rightsOrWorkImpact: boolean | null
  sensitiveOrPersonalDataRisk: boolean | null
}

// Initial default value judgments
export const INITIAL_VALUE_JUDGMENTS: ValueJudgments = {
  relationalTrustImportant: null,
  humanPresencePartOfValue: null,
  localExceptionsMatter: null,
  valueConflictPresent: null,
  errorReversible: null, // Må besvares aktivt!
  rightsOrWorkImpact: null, // Må besvares aktivt!
  sensitiveOrPersonalDataRisk: null, // Må besvares aktivt!
}

// Look up case and primary task by caseId
export function getDiagnosisData(caseId: string) {
  const project = allCases.find(c => c.caseId === caseId)
  if (!project) return null
  // Deep clone to ensure mutation safety
  const clonedProject: HrMicroproject = JSON.parse(JSON.stringify(project))
  const task = clonedProject.aiUseTasks[0]
  return { project: clonedProject, task }
}

// Look up case and a specific task by taskId
export function getDiagnosisDataForTask(caseId: string, taskId: string) {
  const project = allCases.find(c => c.caseId === caseId)
  if (!project) return null
  const clonedProject: HrMicroproject = JSON.parse(JSON.stringify(project))
  const task = clonedProject.aiUseTasks.find(t => t.taskId === taskId) || clonedProject.aiUseTasks[0]
  return { project: clonedProject, task }
}

// Auto-calculate compass position from module scores
export function calculateCompassPosition(
  task: AiUseTask,
  model: 'gmm' | 'linear' | 'conservative' = 'gmm'
): Point {
  const scores = task.expectedModuleScores
  if (model === 'conservative') {
    const minVal = Math.min(scores.separabilitet.score, scores.målklarhet.score)
    return {
      x: (minVal - 1) / 4,
      y: (minVal - 1) / 4,
    }
  }
  if (model === 'linear') {
    return {
      x: (scores.separabilitet.score - 1) / 4,
      y: (scores.målklarhet.score - 1) / 4,
    }
  }
  // Default: gmm
  const penalty = 1 - Math.abs(scores.målklarhet.score - scores.separabilitet.score) / 10
  return {
    x: Math.max(0, Math.min(1, ((scores.separabilitet.score - 1) / 4) * penalty)),
    y: Math.max(0, Math.min(1, ((scores.målklarhet.score - 1) / 4) * penalty)),
  }
}

export const STOP_RULES_MAP: Record<string, string> = {
  'SR-01': 'Påvirker ansatte direkte (krever reell medvirkning og menneskelig skjønn)',
  'SR-02': 'Krever lokalkunnskap og skjønn (kan ikke standardiseres helt ut fra sentrale data)',
  'SR-03': 'Systemet kan ikke forklare eller begrunne egne valg (krever manuell ettergåelse)',
  'SR-04': 'Fare for blind tillit (krever etablerte rutiner for uavhengig kontroll og verifisering)',
  'SR-05': 'Notatet mangler nødvendig vurdering, verifikasjon eller ansvar',
  'SR-06': 'Inneholder verdikonflikter eller etiske dilemmaer (krever menneskelig/politisk avveining)',
  'SR-07': 'Vanskelig eller umulig å rette opp feil i etterkant (krever særskilt feilsikring)',
  'SR-08': 'KI-output kan ikke verifiseres godt nok mot kilder, regler eller lokal fagvurdering',
}

export const STOP_RULE_QUESTIONS: Record<string, string> = {
  'SR-01': 'Hvem i gruppen tar direkte kontakt med de ansatte som berøres, og har dere sikret reell medvirkning?',
  'SR-02': 'Hvem lokalt kjenner konteksten og unntakene godt nok til å kvalitetssikre KI-forslaget?',
  'SR-03': 'Kan gruppen forklare for berørte parter hvorfor KI ga akkurat dette svaret?',
  'SR-04': 'Har dere lagt inn en konkret rutine for å ettersjekke KI-forslag uavhengig av systemet selv?',
  'SR-05': 'Er beslutningsnotatet fylt ut med tydelig vurdering, ansvar og verifikasjon?',
  'SR-06': 'Hvilken verdikonflikt er til stede, og hvem har myndighet til å gjøre den endelige avveiingen?',
  'SR-07': 'Hva er planen hvis KI-resultatet viser seg å være feil etter at det er tatt i bruk?',
  'SR-08': 'Mot hvilke lokale fagvurderinger, regler eller kilder skal gruppen etterkontrollere KI-output?',
}

export function generatePreFilledDecisionLog(
  project: HrMicroproject,
  task: AiUseTask,
  _judgments: ValueJudgments,
  _answers: Record<number, unknown>
): Record<string, string> {
  void _judgments
  void _answers
  const caseId = project.caseId
  const role = task.expectedAllowedRole || 'utforskende_støtte'
  const calcRole = task.expectedCalculatedRole || 'utforskende_støtte'
  const roleLabel = ROLE_LABELS[role] || role
  const calcRoleLabel = ROLE_LABELS[calcRole] || calcRole
  const owner = project.decisionOwner || 'Ansvarlig leder'
  let forhaand: string
  let slutt: string
  let motargumenter: string
  let verifikasjon: string
  let usikkerhet: string
  let overstyring: string
  let kioutput: string
  let endelig: string

  if (caseId === 'HRR-01') {
    forhaand = `• Kun anonyme, aggregerte data\n• Sikre partsmedvirkning i bunn\n• Ingen individuell profilering`
    slutt = `• 100% manuell kontroll av tiltak\n• Leder + tillitsvalgte drøfter sammen\n• Ingen automatiske vedtak`
    motargumenter = `• Risiko for blind tillit til tall\n• Feiltolkning av lokal arbeidshverdag`
    verifikasjon = `• Sjekkes mot tariff og HR-målinger\n• Drøftes i partssammensatt utvalg`
    usikkerhet = `• Ved avvik forkastes KI-rapporten\n• Går over til ordinær dialog`
    kioutput = `• Kun som samtalestarter/idéskisse\n• Aldri som beslutningsgrunnlag alene`
    endelig = `• Kan bare brukes som sparring\n• Menneskelig beslutning i alle ledd`
  } else if (caseId === 'HRR-02') {
    forhaand = `• Oppfølging sykefravær uten sensitive helsedata i KI\n• Fokus på lokal tilrettelegging`
    slutt = `• Fullstendig manuell tilrettelegging og dialog\n• Involvere BHT for kvalitetssikring`
    motargumenter = `• KI mangler relasjonell forståelse\n• Kan virke upersonlig og mekanisk`
    verifikasjon = `• Sjekkes i direkte dialog med ansatt\n• Verneombud vurderer arbeidsmiljøsiden`
    usikkerhet = `• Ved avvik forkastes KI-forslaget helt\n• Følger ordinære IA-rutiner`
    kioutput = `• Kun struktur for agenda/sjekkliste`
    endelig = `• Kan bare brukes som '${roleLabel}' for forberedelse\n• Aldri for turnustildeling`
  } else if (caseId === 'HRR-04') {
    forhaand = `• Rekruttering av helsepersonell\n• Unngå diskriminering under utvelgelse`
    slutt = `• Rangering/sortering gjøres 100% manuelt\n• HR + leder kvalitetssikrer alt`
    motargumenter = `• Risiko for historisk bias/diskriminering\n• Modellen kan favorisere skjevt`
    verifikasjon = `• Profiler sjekkes mot mangfoldsmål\n• Manuell kontroll mot kvalifikasjonsprinsippet`
    usikkerhet = `• Ved bias deaktiveres KI umiddelbart\n• Går over to standard maler`
    kioutput = `• Kun utkast til profil og spørsmål`
    endelig = `• Kan bare brukes som '${roleLabel}' for råutkast\n• Aldri for rangering av søkere`
  } else if (caseId === 'HRR-07') {
    forhaand = `• Beslutningsgrunnlag for langvakter\n• Vurdering av HMS og ansattes velferd`
    slutt = `• Turnusplaner avgjøres 100% manuelt\n• Tett dialog med tillitsvalgte og verneombud`
    motargumenter = `• Matematisk optimering ignorerer hviletid\n• Kan gi økt sykefravær over tid`
    verifikasjon = `• Sjekk mot AML-regler og lokale avtaler\n• Egen selvstendig HMS-risikovurdering`
    usikkerhet = `• Scenarioer forkastes ved minste HMS-brudd\n• Går over til manuell turnus`
    kioutput = `• Kun scenarioer under partsdrøfting`
    endelig = `• Kan bare brukes som '${roleLabel}' for analyser\n• Aldri som automatisert planlegger`
  } else {
    forhaand = `• Vurderer KI-støtte for ${task.title}\n• Etiske rammer vurdert`
    slutt = `• Leder har fullt ansvar for kontroll\n• KI gir kun innspill; beslutning tas uavhengig`
    motargumenter = `• Risiko for blind tillit (overreliance)\n• Manglende forståelse for lokal kontekst`
    verifikasjon = `• Kvalitetssikres mot avtalt kildegrunnlag\n• Sjekk mot gjeldende regelverk`
    usikkerhet = `• All bruk opphører ved mistanke om feil\n• Går umiddelbart over til manuell behandling`
    kioutput = `• Kun som råutkast underlagt redigering`
    endelig = `• Kan bare brukes som '${roleLabel}'\n• Menneskelig vurdering må gjøres før bruk`
  }

  if (role !== calcRole) {
    overstyring = `• Begrenset til '${roleLabel}' pga. aktive stoppregler (Modell foreslo: '${calcRoleLabel}')`
  } else {
    overstyring = `• Rolle '${roleLabel}' samsvarer med vår risikovurdering`
  }

  return {
    risikovurdering: `${forhaand}\n${motargumenter}\n${usikkerhet}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
    menneskeligKontroll: `${slutt}\n${verifikasjon}\n${kioutput}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
    endeligBeslutning: `${endelig}\n${overstyring}\n• Ansvarlig: ${owner}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
  }
}

export function generateRiskMitigationMeasures(task: AiUseTask): string {
  const trafficLight = task.expectedTrafficLight || 'yellow'
  const stopRules = task.expectedStopRules || []

  if (trafficLight === 'red') {
    const stopRuleLine = stopRules.length > 0
      ? `- Disse forholdene må avklares før videre bruk: ${stopRules.map(rule => STOP_RULES_MAP[rule] || rule).join('; ')}.`
      : '- Kritiske mangler må lukkes før videre bruk.'

    return [
      '- Bruk bare lukket løsning med databehandleravtale og uten leverandørtrening på dataene.',
      '- Gjennomfør personvernkonsekvensvurdering før utrulling.',
      '- Test systematisk for skjevheter før utrulling.',
      stopRuleLine,
    ].join('\n')
  }

  if (trafficLight === 'green') {
    return '- Gjennomfør en enkel risikovurdering minst én gang i året.'
  }

  return [
    '- Etabler ukentlig stikkprøvekontroll av en femtedel av utdataene.',
    '- Gjennomfør HMS-gjennomgang før videre bruk i drift.',
  ].join('\n')
}

// Role labels
export const ROLE_LABELS: Record<string, string> = {
  'utforskende_støtte': 'KI som sparringspartner (III. Utforskende støtte)',
  'forsterket_skjønn': 'KI hjelper, gruppen bestemmer (I. Forsterket skjønn)',
  'strategisk_autonomi': 'KI handler innen gitte rammer (IV. Strategisk autonomi)',
  'automatisert_beslutning': 'Automatisering krever egen lavrisikovurdering (II. Automatisert beslutning)',
}

// Calculate expected role based on kompass scores (maalklarhet and separabilitet)
export function getCalculatedRole(maalklarhetScore: number, separabilitetScore: number): 'utforskende_støtte' | 'forsterket_skjønn' | 'automatisert_beslutning' | 'strategisk_autonomi' {
  const hoyMalklarhet = maalklarhetScore >= 3.0;
  const hoySeparabilitet = separabilitetScore >= 3.0;

  if (hoyMalklarhet && hoySeparabilitet) {
    return 'automatisert_beslutning';
  } else if (hoyMalklarhet && !hoySeparabilitet) {
    return 'forsterket_skjønn';
  } else if (!hoyMalklarhet && !hoySeparabilitet) {
    return 'utforskende_støtte';
  } else {
    // !hoyMalklarhet && hoySeparabilitet
    return 'strategisk_autonomi';
  }
}

const ROLE_ORDER = {
  'utforskende_støtte': 1,
  'strategisk_autonomi': 2,
  'forsterket_skjønn': 3,
  'automatisert_beslutning': 4,
} as const;

export function minRole(
  role1: 'utforskende_støtte' | 'forsterket_skjønn' | 'strategisk_autonomi' | 'automatisert_beslutning',
  role2: 'utforskende_støtte' | 'forsterket_skjønn' | 'strategisk_autonomi' | 'automatisert_beslutning'
): 'utforskende_støtte' | 'forsterket_skjønn' | 'strategisk_autonomi' | 'automatisert_beslutning' {
  return ROLE_ORDER[role1] <= ROLE_ORDER[role2] ? role1 : role2;
}

// Core evaluation of stop rules
export function evaluateStopRules(
  task: AiUseTask,
  judgments: ValueJudgments,
  scores: {
    målklarhet: number
    separabilitet: number
    forklarbarhet: number
    antiOverreliance: number
  },
  isDecisionLogComplete: boolean
): string[] {
  const triggered: string[] = []

  // SR-01: Rights/work impact and low oversight
  if ((judgments.rightsOrWorkImpact || task.expectedRiskFlags.rightsOrSignificantImpact || task.expectedRiskFlags.workConditionsImpact) && scores.forklarbarhet < 3) {
    triggered.push('SR-01')
  }

  // SR-02: Low separabilitet, relational trust, or local exceptions
  if (scores.separabilitet <= 2.5 || judgments.localExceptionsMatter || judgments.relationalTrustImportant || judgments.humanPresencePartOfValue) {
    triggered.push('SR-02')
  }

  // SR-03: Svak forklarbarhet
  if (scores.forklarbarhet < 3) {
    triggered.push('SR-03')
  }

  // SR-04: Svak overreliance protection
  if (scores.antiOverreliance < 3) {
    triggered.push('SR-04')
  }

  // SR-05: Missing log in high-risk
  const isHighRisk = judgments.rightsOrWorkImpact ||
                     task.expectedRiskFlags.rightsOrSignificantImpact ||
                     task.expectedRiskFlags.personalOrSensitiveData ||
                     task.expectedRiskFlags.healthSafetyEnvironment ||
                     task.expectedRiskFlags.workConditionsImpact;
  if (isHighRisk && !isDecisionLogComplete) {
    triggered.push('SR-05')
  }

  // SR-06: Value conflict
  if (judgments.valueConflictPresent || task.expectedRiskFlags.discriminationRisk) {
    triggered.push('SR-06')
  }

  // SR-07: Irreversible
  if (judgments.errorReversible === false || task.expectedRiskFlags.irreversibleConsequences) {
    triggered.push('SR-07')
  }

  // SR-08: Output cannot be verified well enough against sources, rules or local assessment.
  if (
    scores.forklarbarhet < 3 ||
    (scores.separabilitet < 3 &&
      (task.expectedRiskFlags.healthSafetyEnvironment ||
        task.expectedRiskFlags.workConditionsImpact ||
        task.expectedRiskFlags.rightsOrSignificantImpact ||
        task.directEffectOnPeople))
  ) {
    triggered.push('SR-08')
  }

  return triggered
}

// Calculate role cap based on stop rules
export function getRoleCap(stopRules: string[]): 'utforskende_støtte' | 'forsterket_skjønn' | 'strategisk_autonomi' | 'automatisert_beslutning' {
  if (stopRules.includes('SR-01') || stopRules.includes('SR-02') || stopRules.includes('SR-03') || stopRules.includes('SR-04') || stopRules.includes('SR-05') || stopRules.includes('SR-08')) {
    return 'utforskende_støtte';
  }
  if (stopRules.includes('SR-06') || stopRules.includes('SR-07')) {
    return 'forsterket_skjønn';
  }
  return 'automatisert_beslutning';
}

function getHrRiskFallbackCap(
  task: AiUseTask,
  judgments: ValueJudgments
): 'forsterket_skjønn' | 'automatisert_beslutning' {
  const hasHrRisk =
    judgments.rightsOrWorkImpact ||
    judgments.sensitiveOrPersonalDataRisk ||
    task.directEffectOnPeople ||
    task.usesPersonalOrSensitiveData ||
    task.expectedRiskFlags.rightsOrSignificantImpact ||
    task.expectedRiskFlags.personalOrSensitiveData ||
    task.expectedRiskFlags.healthSafetyEnvironment ||
    task.expectedRiskFlags.workConditionsImpact ||
    task.expectedRiskFlags.vulnerableParty ||
    task.expectedRiskFlags.discriminationRisk ||
    task.expectedRiskFlags.surveillanceOrControl

  return hasHrRisk ? 'forsterket_skjønn' : 'automatisert_beslutning'
}

// Map checkpoint answers from Step 2 to risk flags and verdivurderinger
// Map checkpoint answers from Step 2 to risk flags and verdivurderinger
export function mapCheckpointAnswersToModel(
  caseId: string,
  answers: Record<number, 'yes' | 'no' | 'info' | null>,
  task: AiUseTask,
  judgments: ValueJudgments
) {
  if (caseId === 'HRR-01') {
    // Q0: 'Gjelder saken konkrete senioransatte eller policy på gruppenivå?'
    if (answers[0] === 'yes' || answers[0] === 'info') {
      task.directEffectOnPeople = true;
      judgments.rightsOrWorkImpact = true;
      task.expectedRiskFlags.rightsOrSignificantImpact = true;
      task.expectedModuleScores.separabilitet.score = 1.5;
      task.expectedModuleScores.separabilitet.justification = 'Individrettet prioritering krever menneskelig skjønn og lokal praksis.';
    } else if (answers[0] === 'no') {
      task.directEffectOnPeople = false;
      judgments.rightsOrWorkImpact = false;
      task.expectedRiskFlags.rightsOrSignificantImpact = false;
      task.expectedModuleScores.separabilitet.score = 3.0;
    }
    // Q1: 'Er formålet å beholde folk lenger, eller å forstå hvorfor de slutter?'
    if (answers[1] === 'yes' || answers[1] === 'info') {
      task.expectedModuleScores.målklarhet.score = 4.0;
      task.expectedModuleScores.målklarhet.justification = 'Aggregert analyse av avgangsgrunner har relativt høy målklarhet.';
    }
  } else if (caseId === 'HRR-02') {
    // Q0: 'Skal KI hjelpe med møtestruktur, eller med selve tilretteleggingen?'
    if (answers[0] === 'yes' || answers[0] === 'info') {
      task.directEffectOnPeople = true;
      judgments.rightsOrWorkImpact = true;
      task.expectedRiskFlags.rightsOrSignificantImpact = true;
      task.expectedModuleScores.separabilitet.score = 1.5;
    }
    // Q1: 'Involverer saken helseopplysninger?'
    if (answers[1] === 'yes' || answers[1] === 'info') {
      task.usesPersonalOrSensitiveData = true;
      judgments.sensitiveOrPersonalDataRisk = true;
      task.expectedRiskFlags.personalOrSensitiveData = true;
    }
  } else if (caseId === 'HRR-04') {
    // Q0: 'Skal KI hjelpe med kravprofil/utlysning, eller med å vurdere kandidater?'
    if (answers[0] === 'yes' || answers[0] === 'info') {
      task.directEffectOnPeople = true;
      judgments.rightsOrWorkImpact = true;
      task.expectedRiskFlags.rightsOrSignificantImpact = true;
      task.expectedModuleScores.separabilitet.score = 1.5;
    }
    // Q1: 'Er det fare for diskriminering i utvelgelsen?'
    if (answers[1] === 'yes' || answers[1] === 'info') {
      task.expectedRiskFlags.discriminationRisk = true;
      judgments.valueConflictPresent = true;
    }
  } else if (caseId === 'HRR-07') {
    // Q0: 'Gjelder det vakter over 12,5 timer?'
    if (answers[0] === 'yes' || answers[0] === 'info') {
      task.expectedRiskFlags.healthSafetyEnvironment = true;
    }
    // Q1: 'Er tillitsvalgte og verneombud involvert?'
    // Conservative: Treat as high risk ('no', 'info', or null/unanswered) unless explicitly confirmed 'yes'
    if (answers[1] !== 'yes') {
      task.expectedRiskFlags.workConditionsImpact = true;
      judgments.rightsOrWorkImpact = true;
    } else {
      task.expectedRiskFlags.workConditionsImpact = false;
    }
    // Q2: 'Skal KI hjelpe med analyse eller med å fordele vakter?'
    if (answers[2] === 'yes' || answers[2] === 'info') {
      task.directEffectOnPeople = true;
      task.expectedModuleScores.separabilitet.score = 1.5;
    }
  }
}

export function calculateComplianceScore(
  task: AiUseTask,
  judgments: ValueJudgments,
  isDecisionLogComplete: boolean,
  isSigned: boolean
): number {
  let score = 0

  // D1 (Lokal ROS-analyse)
  if (isDecisionLogComplete) score += 2
  else if (task.expectedRiskFlags.rightsOrSignificantImpact || task.expectedRiskFlags.personalOrSensitiveData) score += 0
  else score += 1

  // D2 (Menneskelig overstyring)
  if (isDecisionLogComplete) score += 2
  else if (judgments.errorReversible === false) score += 0
  else score += 1

  // D3 (Transparens og merking)
  if (isDecisionLogComplete) score += 2
  else score += 1

  // D4 (Partsmedvirkning)
  if (!judgments.rightsOrWorkImpact) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 1

  // P1 (Rettslig grunnlag)
  if (!judgments.sensitiveOrPersonalDataRisk) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 0

  // P2 (Lukket system og databehandleravtale)
  if (!judgments.sensitiveOrPersonalDataRisk) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 0

  // P3 (Personvernkonsekvensvurdering)
  if (!judgments.sensitiveOrPersonalDataRisk) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 0

  // P4 (Registredes rettigheter)
  if (!judgments.sensitiveOrPersonalDataRisk) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 0

  // S1 (Livssyklus risikostyring)
  if (isSigned) score += 2
  else if (isDecisionLogComplete) score += 1
  else score += 0

  // S2 (Sporbar logging)
  if (isDecisionLogComplete) score += 2
  else score += 1

  // S3 (Bias-overvåking)
  if (!task.expectedRiskFlags.discriminationRisk && !judgments.valueConflictPresent) score += 2
  else if (isDecisionLogComplete) score += 2
  else score += 0

  // S4 (Modellkvalitet og drift)
  if (isDecisionLogComplete) score += 2
  else score += 1

  return Math.round((score / 24) * 100)
}

// Recalculate whole task scores, stop rules and role recommendation
export function runCalculationEngine(
  task: AiUseTask,
  judgments: ValueJudgments,
  isDecisionLogComplete: boolean,
  model: 'gmm' | 'linear' | 'conservative' = 'gmm',
  isSigned: boolean = false
): AiUseTask {
  const scores = {
    målklarhet: task.expectedModuleScores.målklarhet.score,
    separabilitet: task.expectedModuleScores.separabilitet.score,
    forklarbarhet: task.expectedModuleScores.forklarbarhet.score,
    antiOverreliance: task.expectedModuleScores.antiOverreliance.score,
  }

  let kompassScore: number
  if (model === 'conservative') {
    kompassScore = Math.min(scores.målklarhet, scores.separabilitet)
  } else if (model === 'linear') {
    kompassScore = scores.målklarhet * 0.45 + scores.separabilitet * 0.55
  } else {
    // Default: gmm
    kompassScore = Math.sqrt(scores.målklarhet * scores.separabilitet) * (1 - Math.abs(scores.målklarhet - scores.separabilitet) / 10)
  }

  // const kontrollScore = scores.forklarbarhet * 0.55 + scores.antiOverreliance * 0.45

  // Calculate base role without stop rules - based on official independent axes
  const calculatedRole = getCalculatedRole(scores.målklarhet, scores.separabilitet)

  // Evaluate stop rules
  const stopRules = evaluateStopRules(task, judgments, scores, isDecisionLogComplete)

  // Apply role cap
  const roleCap = minRole(getRoleCap(stopRules), getHrRiskFallbackCap(task, judgments))
  const allowedRole = minRole(calculatedRole, roleCap)

  // Calculate compliance score I_C
  const complianceScore = calculateComplianceScore(task, judgments, isDecisionLogComplete, isSigned)

  // Determine traffic light rating — følger kompass og stoppregler direkte
  const isSrkTriggered = stopRules.includes('SR-01') || stopRules.includes('SR-02') || stopRules.includes('SR-03') || stopRules.includes('SR-04') || stopRules.includes('SR-05') || stopRules.includes('SR-08')
  let trafficLight: 'green' | 'yellow' | 'red' = 'yellow'
  if (isSrkTriggered || kompassScore < 2.5) {
    trafficLight = 'red'
  } else if (stopRules.length === 0 && kompassScore >= 3.5) {
    trafficLight = 'green'
  }

  return {
    ...task,
    expectedStopRules: stopRules as StopRule[],
    expectedCalculatedRole: calculatedRole,
    expectedAllowedRole: allowedRole,
    expectedTrafficLight: trafficLight,
    expectedComplianceScore: complianceScore,
  }
}

// Generate contextual follow-up questions based on case selection
export function getContextualQuestions(caseId: string): string[] {
  const map: Record<string, string[]> = {
    'HRR-01': [
      'Gjelder saken konkrete senioransatte eller policy på gruppenivå?',
      'Er formålet å beholde folk lenger, eller å forstå hvorfor de slutter?',
    ],
    'HRR-02': [
      'Skal KI hjelpe med møtestruktur, eller med selve tilretteleggingen?',
      'Involverer saken helseopplysninger?',
    ],
    'HRR-04': [
      'Skal KI hjelpe med kravprofil/utlysning, eller med å vurdere kandidater?',
      'Er det fare for diskriminering i utvelgelsen?',
    ],
    'HRR-07': [
      'Gjelder det vakter over 12,5 timer?',
      'Er tillitsvalgte og verneombud involvert?',
      'Skal KI hjelpe med analyse eller med å fordele vakter?',
    ],
  }
  return map[caseId] || []
}

// Generate system proposals based on case (simulates LLM reasoning)
export function getSystemProposal(caseId: string): {
  summary: string
  affectedParties: string
  suggestedTask: string
  keyRisk: string
} | null {
  const map: Record<string, ReturnType<typeof getSystemProposal>> = {
    'HRR-01': {
      summary: 'Saken handler om seniorpolitikk i hjemmetjenesten. Kommunen ønsker å forstå og forbedre vilkårene for at eldre ansatte kan stå lenger i jobb.',
      affectedParties: 'Senioransatte, ledere, brukere av hjemmetjenesten',
      suggestedTask: 'Strukturere anonymisert innsikt og tiltakshypoteser',
      keyRisk: 'Kan gli over i individuell prioritering av ansatte',
    },
    'HRR-02': {
      summary: 'Saken gjelder sykefravær og tilrettelegging i turnus. En leder trenger støtte til oppfølgingsmøter uten å overbelaste kolleger.',
      affectedParties: 'Sykmeldt arbeidstaker, kolleger, brukere',
      suggestedTask: 'Lage oppfølgingsstruktur og agenda',
      keyRisk: 'Kan involvere sensitive helseopplysninger',
    },
    'HRR-04': {
      summary: 'Kommunen sliter med å rekruttere sykepleiere. HR vurderer KI-støtte i behovsavklaring og kravprofil.',
      affectedParties: 'Jobbsøkere, ansettende leder, HR',
      suggestedTask: 'Lage kravprofil og intervjuguide',
      keyRisk: 'Kan bli kandidatrangering (høyrisiko under EU AI Act)',
    },
    'HRR-07': {
      summary: 'Enheten vurderer langvakter for å styrke kontinuitet og helgebemanning. Det er usikkerhet om HMS, restitusjon og rettferdighet.',
      affectedParties: 'Ansatte i turnus, brukere/pasienter, tillitsvalgte',
      suggestedTask: 'Strukturere beslutningsgrunnlag og scenarioer',
      keyRisk: 'Arbeidstid, HMS og pasient-/brukersikkerhet',
    },
  }
  return map[caseId] || null
}

// Generate deep research prompt based on compass position and stop rules
export function generateDeepResearchPrompt(
  task: AiUseTask,
  compassPos: Point,
): string | null {
  void compassPos
  const stopRules = task.expectedStopRules

  if (stopRules.length === 0) return null

  const srDescriptions = stopRules.map(sr => `* ${STOP_RULES_MAP[sr]}`).join('\n  ')

  return `Saken "${task.title}" krever at du tar hensyn til følgende:
  ${srDescriptions}

Kopier denne prompten til din research-agent for å utforske videre:

"Jeg vurderer KI for: ${task.title}.
Dette er en sak som krever at vi tar hensyn til flere risikofaktorer.
Kan du forklare hva dette betyr i praksis,
og hva som kreves av menneskelig kontroll og lokal verifikasjon
før KI kan brukes på en forsvarlig måte?"`
}

export const SEPARABILITET_EXPLANATION = `
<div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.4; color: var(--text-main); padding: 8px;">
  <h3 style="margin-top:0; color: var(--accent); font-size: 1.15rem;">Standardisering og separabilitet</h3>
  <p style="font-size:0.85rem; margin-bottom: 12px;">
    Kan oppgaven løses med faste regler uten personlig kontakt eller unike unntak?
  </p>
  <div style="display: grid; gap: 8px; font-size: 0.8rem;">
    <div style="background: rgba(239,108,0,0.06); padding: 8px; border-radius: 6px; border-left: 3px solid #ef6c00;">
      <strong>Menneskelig vurdering:</strong> Krever tillit, lokalkunnskap og unike vurderinger.
    </div>
    <div style="background: rgba(76,175,80,0.06); padding: 8px; border-radius: 6px; border-left: 3px solid #4caf50;">
      <strong>Mer standardisert:</strong> Strukturert data, faste regler og repeterbare oppgaver.
    </div>
  </div>
</div>
`

export const MALKLARHET_EXPLANATION = `
<div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.4; color: var(--text-main); padding: 8px;">
  <h3 style="margin-top:0; color: var(--accent); font-size: 1.15rem;">Målklarhet</h3>
  <p style="font-size:0.85rem; margin-bottom: 12px;">
    Er det krystallklart og målbart hva et "godt resultat" betyr?
  </p>
  <div style="display: grid; gap: 8px; font-size: 0.8rem;">
    <div style="background: rgba(239,108,0,0.06); padding: 8px; border-radius: 6px; border-left: 3px solid #ef6c00;">
      <strong>Vage mål:</strong> "Trivsel", "arbeidsmiljø" eller etiske og politiske avveininger.
    </div>
    <div style="background: rgba(76,175,80,0.06); padding: 8px; border-radius: 6px; border-left: 3px solid #4caf50;">
      <strong>Klare mål:</strong> "Fyll vakter iht. turnus", "kalkuler kostnad" eller andre målbare krav.
    </div>
  </div>
</div>
`

// Mock chat responses (simulates LLM RAG)
export function getMockChatResponse(
  message: string,
  caseId: string | null
): { text: string; adjustCompass?: { dx: number; dy: number }; simplifyTrigger?: boolean } {
  const lower = message.toLowerCase()

  if (!caseId) {
    return { text: 'Velg et fagområde fra navigasjonen, så kan jeg hjelpe deg videre.' }
  }

  if (lower.includes('forenkle') || lower.includes('forenkling')) {
    return {
      text: 'Jeg har forenklet notatet. Gå gjennom teksten og signer først når prosjektgruppen har vurdert innholdet.',
      simplifyTrigger: true
    }
  }

  if (lower.includes('mindre risiko') || lower.includes('tryggere') || lower.includes('mer manuelt') || lower.includes('kontroll')) {
    return {
      text: 'Forstått. Hvis vi legger inn mer manuell kontroll, synker risikoen. Jeg har justert kompasset mot venstre (mer menneskelig skjønn).',
      adjustCompass: { dx: -0.25, dy: -0.1 }
    }
  }

  if (lower.includes('mer auto') || lower.includes('effektiv') || lower.includes('la ki')) {
    return {
      text: 'Ok. Hvis du vil at KI skal gjøre mer selvstendig, øker både målklarheten og separabiliteten. Jeg har flyttet kompasset opp og mot høyre.',
      adjustCompass: { dx: 0.25, dy: 0.2 }
    }
  }

  if (lower.includes('langvakt') || lower.includes('arbeidstid')) {
    return { text: 'Langvakter i helsesektoren er et sammensatt tema. KI kan trolig hjelpe med å strukturere grunnlag og lage scenarioer, men bør ikke foreslå hvem som skal gå hvilke vakter. Vil du at jeg utdyper noe?' }
  }

  if (lower.includes('risiko') || lower.includes('fare')) {
    return { text: 'De viktigste risikoene i denne saken er knyttet til arbeidstid (HMS), restitusjon, pasient-/brukersikkerhet og rettferdighet. Stoppreglene er utløst som en veiledning for dette.' }
  }

  if (lower.includes('hjelp') || lower.includes('hva kan')) {
    return { text: 'Jeg er din KI-Radar. Jeg kan hjelpe deg å vurdere forsvarligheten av dette KI-prosjektet. Spør meg gjerne om å justere vurderingen hvis du planlegger å legge inn mer manuell kontroll.' }
  }

  return {
    text: 'Takk for innspillet. Jeg har notert meg konteksten. Hvis du vil endre KI-rollen, kan du si f.eks. "jeg vil ha mer manuell kontroll" eller "la KI styre mer". For å forenkle loggen kan du skrive "forenkle saksnotat".',
    adjustCompass: { dx: 0.05, dy: -0.05 }
  }
}
