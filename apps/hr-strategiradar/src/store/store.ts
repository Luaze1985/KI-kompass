import { create } from 'zustand'
import type { HrMicroproject, AiUseTask, Scenario } from '../domain/schemas'
import {
  INITIAL_VALUE_JUDGMENTS,
  type ValueJudgments,
  runCalculationEngine,
  calculateCompassPosition,
  mapCheckpointAnswersToModel,
  generatePreFilledDecisionLog,
  generateRiskMitigationMeasures,
  ROLE_LABELS,
} from '../services/mockDiagnosisService'
import { allCases } from '../fixtures/all-cases'
import { DEFAULT_SCENARIOS } from '../fixtures/default-scenarios'

export type Point = { x: number; y: number } // 0-1 normalized
export type CalculationModel = 'gmm' | 'linear' | 'conservative'

export type ChatMessage = {
  role: 'user' | 'system'
  text: string

}

export type CheckpointAnswer = 'yes' | 'no' | 'info' | null;
export type DecisionLogText = {
  risikovurdering: string
  menneskeligKontroll: string
  endeligBeslutning: string
  internkontrollTiltak: string
}

function emptyDecisionLogText(): DecisionLogText {
  return {
    risikovurdering: '',
    menneskeligKontroll: '',
    endeligBeslutning: '',
    internkontrollTiltak: '',
  }
}

function areRequiredReflectionsAnswered(judgments: ValueJudgments) {
  return (
    judgments.rightsOrWorkImpact !== null &&
    judgments.sensitiveOrPersonalDataRisk !== null &&
    judgments.localExceptionsMatter !== null &&
    judgments.errorReversible !== null
  )
}

function isHighRiskAssessment(task: AiUseTask | null, judgments: ValueJudgments) {
  if (!task) return false
  return Boolean(
    judgments.rightsOrWorkImpact ||
      task.expectedRiskFlags.rightsOrSignificantImpact ||
      task.expectedRiskFlags.personalOrSensitiveData ||
      task.expectedRiskFlags.healthSafetyEnvironment ||
      task.expectedRiskFlags.workConditionsImpact ||
      task.expectedStopRules.length > 0
  )
}

function isDecisionLogReady(
  task: AiUseTask | null,
  judgments: ValueJudgments,
  log: DecisionLogText
) {
  if (!areRequiredReflectionsAnswered(judgments)) return false
  if (isHighRiskAssessment(task, judgments)) {
    return Boolean(
      log.risikovurdering.trim() &&
        log.menneskeligKontroll.trim() &&
        log.endeligBeslutning.trim() &&
        log.internkontrollTiltak.trim()
    )
  }
  return Boolean(log.endeligBeslutning.trim() && log.internkontrollTiltak.trim())
}

interface AppState {
  currentStep: number
  selectedCaseId: string | null
  activeProject: HrMicroproject | null
  activeTask: AiUseTask | null
  compassPosition: Point | null
  freeText: string
  chatHistory: ChatMessage[]
  calculationModel: CalculationModel

  // Reactive evaluation states
  valueJudgments: ValueJudgments
  checkpointAnswers: Record<number, CheckpointAnswer>
  isDecisionLogComplete: boolean
  decisionLogText: DecisionLogText
  isSigned: boolean
  makerName: string
  isMakerChecked: boolean
  scenarios: Record<string, Scenario[]>
  isAssumptionsConfirmed: boolean
  userBlindTestAnswer: string | null
  stopRuleDiscussed: Record<string, boolean>
  userRole: 'hms_radgiver' | 'hr_radgiver' | 'linjeleder' | 'tillitsvalgt' | null
  setUserRole: (role: 'hms_radgiver' | 'hr_radgiver' | 'linjeleder' | 'tillitsvalgt' | null) => void

  setStep: (step: number) => void
  setSelectedCaseId: (id: string | null) => void
  setActiveData: (project: HrMicroproject, task: AiUseTask) => void
  setCompassPosition: (point: Point) => void
  setFreeText: (text: string) => void
  signDocument: (signed: boolean) => void
  setCalculationModel: (model: CalculationModel) => void
  setMakerName: (name: string) => void
  setMakerChecked: (checked: boolean) => void
  confirmAssumptions: (confirmed: boolean) => void
  setUserBlindTestAnswer: (answer: string | null) => void
  setStopRuleDiscussed: (srCode: string, value: boolean) => void

  // Dynamic tweak actions
  setModuleScore: (
    moduleKey: 'målklarhet' | 'separabilitet' | 'forklarbarhet' | 'antiOverreliance',
    score: number,
    justification?: string
  ) => void
  toggleRiskFlag: (flagKey: keyof AiUseTask['expectedRiskFlags']) => void
  toggleValueJudgment: (key: keyof ValueJudgments) => void
  setCheckpointAnswer: (index: number, answer: CheckpointAnswer) => void
  updateDecisionLogField: (key: keyof DecisionLogText, value: string) => void
  setSimplifiedQuestionAnswer: (
    questionKey: 'rights' | 'sensitive' | 'context' | 'reversible',
    answer: boolean | null
  ) => void
  simplifyDecisionLog: () => void
  updateScenarioField: (caseId: string, temaKey: string, field: keyof Scenario, value: string) => void

  reset: () => void
}

export const useAppStore = create<AppState>((set, get) => {
  // Helper to re-evaluate and recalculate state
  const recalculate = (
    task: AiUseTask,
    judgments: ValueJudgments,
    logComplete: boolean,
    model?: CalculationModel,
    isSigned?: boolean
  ) => {
    const currentModel = model !== undefined ? model : (get()?.calculationModel || 'gmm')
    const currentSigned = isSigned !== undefined ? isSigned : (get()?.isSigned || false)
    const calculated = runCalculationEngine(task, judgments, logComplete, currentModel, currentSigned)
    return {
      activeTask: calculated,
      compassPosition: calculateCompassPosition(calculated, currentModel),
    }
  }

  return {
    currentStep: 1,
    selectedCaseId: null,
    activeProject: null,
    activeTask: null,
    compassPosition: null,
    freeText: '',
    chatHistory: [],
    calculationModel: 'linear',

    valueJudgments: { ...INITIAL_VALUE_JUDGMENTS },
    checkpointAnswers: {},
    isDecisionLogComplete: false,
    decisionLogText: emptyDecisionLogText(),
    isSigned: false,
    makerName: '',
    isMakerChecked: false,
    scenarios: JSON.parse(JSON.stringify(DEFAULT_SCENARIOS)),
    isAssumptionsConfirmed: false,
    userBlindTestAnswer: null,
    stopRuleDiscussed: {},
    userRole: null,
    setUserRole: (role) => set((s) => (s.isMakerChecked ? {} : { userRole: role })),

    setStep: (step) => set((s) => {
      if (s.isMakerChecked) return {}
      if (step === 2 && s.activeProject && s.activeTask) {
        const preFilled = generatePreFilledDecisionLog(s.activeProject, s.activeTask, s.valueJudgments, s.checkpointAnswers)
        const updatedLog = { ...s.decisionLogText }
        Object.keys(preFilled).forEach((key) => {
          const logKey = key as keyof DecisionLogText
          if (!updatedLog[logKey] || !updatedLog[logKey].trim()) {
            updatedLog[logKey] = preFilled[key]
          }
        })
        if (!updatedLog.internkontrollTiltak.trim()) {
          updatedLog.internkontrollTiltak = generateRiskMitigationMeasures(s.activeTask)
        }

        const isComplete = isDecisionLogReady(s.activeTask, s.valueJudgments, updatedLog)
        const calculated = runCalculationEngine(s.activeTask, s.valueJudgments, isComplete, s.calculationModel, s.isSigned)

        return {
          currentStep: step,
          decisionLogText: updatedLog,
          isDecisionLogComplete: isComplete,
          activeTask: calculated,
          compassPosition: calculateCompassPosition(calculated, s.calculationModel),
        }
      }
      return { currentStep: step }
    }),
    setSelectedCaseId: (id) => set((s) => (s.isMakerChecked ? {} : { selectedCaseId: id })),
    setActiveData: (project, task) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        // Kjør motoren med en gang slik at rolle/stoppregler/trafikklys er
        // motor-derivert (konsistent) allerede i steg 1 — ingen hopp til steg 2.
        const judgments = { ...INITIAL_VALUE_JUDGMENTS }
        const calculated = runCalculationEngine(task, judgments, false, s.calculationModel, false)
        return {
          activeProject: project,
          activeTask: calculated,
          compassPosition: calculateCompassPosition(calculated, s.calculationModel),
          valueJudgments: judgments,
          checkpointAnswers: {},
          isDecisionLogComplete: false,
          decisionLogText: emptyDecisionLogText(),
          isSigned: false,
          makerName: '',
          isMakerChecked: false,
          userBlindTestAnswer: null,
          stopRuleDiscussed: {},
        }
      }),
    setCompassPosition: (point) => set((s) => (s.isMakerChecked ? {} : { compassPosition: point })),
    setFreeText: (text) => set((s) => (s.isMakerChecked ? {} : { freeText: text })),
    signDocument: (signed) => set((s) => {
      if (s.isMakerChecked) return {}
      if (!s.activeTask) return { isSigned: signed }
      return {
        isSigned: signed,
        makerName: signed ? s.makerName : '',
        ...recalculate(s.activeTask, s.valueJudgments, s.isDecisionLogComplete, s.calculationModel, signed)
      }
    }),
    setCalculationModel: (model) => set((s) => {
      if (s.isMakerChecked) return {}
      if (!s.activeTask) return { calculationModel: model }
      return {
        calculationModel: model,
        ...recalculate(s.activeTask, s.valueJudgments, s.isDecisionLogComplete, model, s.isSigned)
      }
    }),
    setMakerName: (name) => set((s) => (s.isMakerChecked ? {} : { makerName: name })),
    setMakerChecked: (checked) => set((s) => {
      if (s.isMakerChecked) return {}
      if (!checked) return { isMakerChecked: false }
      if (!s.isSigned || !s.makerName.trim()) return {}
      return { isMakerChecked: true }
    }),

    setModuleScore: (moduleKey, score, justification) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        if (!s.activeTask) return {}
        const clampedScore = Math.max(1.0, Math.min(5.0, score))
        const updatedTask = {
          ...s.activeTask,
          expectedModuleScores: {
            ...s.activeTask.expectedModuleScores,
            [moduleKey]: {
              score: clampedScore,
              justification:
                justification || s.activeTask.expectedModuleScores[moduleKey].justification,
            },
          },
        }
        return recalculate(updatedTask, s.valueJudgments, s.isDecisionLogComplete)
      }),

    toggleRiskFlag: (flagKey) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        if (!s.activeTask) return {}
        const updatedTask = {
          ...s.activeTask,
          expectedRiskFlags: {
            ...s.activeTask.expectedRiskFlags,
            [flagKey]: !s.activeTask.expectedRiskFlags[flagKey],
          },
        }
        return recalculate(updatedTask, s.valueJudgments, s.isDecisionLogComplete)
      }),

    toggleValueJudgment: (key) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        const updatedJudgments = {
          ...s.valueJudgments,
          [key]: !s.valueJudgments[key],
        }
        if (!s.activeTask) return { valueJudgments: updatedJudgments }
        return {
          valueJudgments: updatedJudgments,
          ...recalculate(s.activeTask, updatedJudgments, s.isDecisionLogComplete),
        }
      }),

    setCheckpointAnswer: (index, answer) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        if (!s.activeTask || !s.selectedCaseId) return {}
        const updatedAnswers = {
          ...s.checkpointAnswers,
          [index]: answer,
        }

        // Apply answer effects directly to cloned task and judgments
        const taskClone: AiUseTask = JSON.parse(JSON.stringify(s.activeTask))
        const judgmentsClone: ValueJudgments = { ...s.valueJudgments }

        mapCheckpointAnswersToModel(s.selectedCaseId, updatedAnswers, taskClone, judgmentsClone)
        const isComplete = isDecisionLogReady(taskClone, judgmentsClone, s.decisionLogText)

        return {
          checkpointAnswers: updatedAnswers,
          valueJudgments: judgmentsClone,
          isDecisionLogComplete: isComplete,
          ...recalculate(taskClone, judgmentsClone, isComplete),
        }
      }),

    updateDecisionLogField: (key, value) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        const updatedLog = {
          ...s.decisionLogText,
          [key]: value,
        }
        const isComplete = isDecisionLogReady(s.activeTask, s.valueJudgments, updatedLog)

        if (!s.activeTask) return { decisionLogText: updatedLog, isDecisionLogComplete: isComplete }

        // Recalculate because SR-05 depends on decision log completeness!
        return {
          decisionLogText: updatedLog,
          isDecisionLogComplete: isComplete,
          ...recalculate(s.activeTask, s.valueJudgments, isComplete),
        }
      }),

    setSimplifiedQuestionAnswer: (questionKey, answer) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        if (!s.activeTask || !s.selectedCaseId) return {}

        const judgmentsClone = { ...s.valueJudgments }
        const taskClone = JSON.parse(JSON.stringify(s.activeTask))

        if (questionKey === 'rights') {
          judgmentsClone.rightsOrWorkImpact = answer
          taskClone.expectedRiskFlags.rightsOrSignificantImpact = answer === true
          taskClone.expectedRiskFlags.workConditionsImpact = answer === true
        } else if (questionKey === 'sensitive') {
          judgmentsClone.sensitiveOrPersonalDataRisk = answer
          taskClone.expectedRiskFlags.personalOrSensitiveData = answer === true
          taskClone.usesPersonalOrSensitiveData = answer === true
        } else if (questionKey === 'context') {
          judgmentsClone.localExceptionsMatter = answer
          judgmentsClone.relationalTrustImportant = answer
          judgmentsClone.humanPresencePartOfValue = answer
        } else if (questionKey === 'reversible') {
          judgmentsClone.errorReversible = answer
          taskClone.expectedRiskFlags.irreversibleConsequences = answer === false
        }

        // Clean Base Score Dynamic adjustments
        const originalProject = allCases.find((c) => c.caseId === s.selectedCaseId)
        const originalTask = originalProject?.aiUseTasks.find((t) => t.taskId === s.activeTask?.taskId) || originalProject?.aiUseTasks[0]

        if (originalTask) {
          let newSeparabilitet = originalTask.expectedModuleScores.separabilitet.score
          let newMålklarhet = originalTask.expectedModuleScores.målklarhet.score

          // Adjust scores based on checks
          if (judgmentsClone.rightsOrWorkImpact) {
            newSeparabilitet -= 1.5
          }
          if (judgmentsClone.sensitiveOrPersonalDataRisk) {
            newSeparabilitet -= 0.5
          }
          if (judgmentsClone.localExceptionsMatter) {
            newSeparabilitet -= 1.0
            newMålklarhet -= 0.5
          }
          if (judgmentsClone.errorReversible === false) {
            newSeparabilitet -= 1.0
          }

          // Clamp
          taskClone.expectedModuleScores.separabilitet.score = Math.max(1.0, Math.min(5.0, newSeparabilitet))
          taskClone.expectedModuleScores.målklarhet.score = Math.max(1.0, Math.min(5.0, newMålklarhet))
        }

        const preliminaryComplete = isDecisionLogReady(taskClone, judgmentsClone, s.decisionLogText)
        const preliminaryCalculated = runCalculationEngine(taskClone, judgmentsClone, preliminaryComplete, s.calculationModel, s.isSigned)

        // Generate updated pre-fill log based on new risikoprofil
        const preFilled = generatePreFilledDecisionLog(s.activeProject!, preliminaryCalculated, judgmentsClone, s.checkpointAnswers)
        const updatedLog = { ...s.decisionLogText }
        Object.keys(preFilled).forEach((key) => {
          const logKey = key as keyof DecisionLogText
          if (!updatedLog[logKey] || !updatedLog[logKey].trim()) {
            updatedLog[logKey] = preFilled[key]
          }
        })
        if (!updatedLog.internkontrollTiltak.trim()) {
          updatedLog.internkontrollTiltak = generateRiskMitigationMeasures(preliminaryCalculated)
        }

        const isComplete = isDecisionLogReady(preliminaryCalculated, judgmentsClone, updatedLog)
        const calculated = runCalculationEngine(taskClone, judgmentsClone, isComplete, s.calculationModel, s.isSigned)

        return {
          valueJudgments: judgmentsClone,
          activeTask: calculated,
          compassPosition: calculateCompassPosition(calculated, s.calculationModel),
          decisionLogText: updatedLog,
          isDecisionLogComplete: isComplete,
        }
      }),

    simplifyDecisionLog: () =>
      set((s) => {
        if (s.isMakerChecked) return {}
        if (!s.activeProject || !s.activeTask) return {}
        const caseId = s.activeProject.caseId
        const role = s.activeTask.expectedAllowedRole
        const roleLabel = ROLE_LABELS[role] || role
        const owner = s.activeProject.decisionOwner || 'Ansvarlig leder'

        let forhaand: string
        let slutt: string
        let motargumenter: string
        let verifikasjon: string
        let usikkerhet: string
        let kioutput: string
        let endelig: string
        let overstyring: string

        if (caseId === 'HRR-01') {
          forhaand = `• Aggregert senioranalyse uten enkeltpersoner`
          slutt = `• Leder og tillitsvalgte gjør 100% manuell kontroll`
          motargumenter = `• Risiko for blind tillit og feiltolkning av tall`
          verifikasjon = `• Sjekk mot tariff og lokale HR-målinger`
          usikkerhet = `• Feil/avvik = saken avvises til ordinær prosess`
          kioutput = `• Kun sparring og idéskisse i partssamarbeid`
          endelig = `• Kan bare brukes som ${roleLabel}`
        } else if (caseId === 'HRR-02') {
          forhaand = `• Oppfølging sykefravær uten sensitive helsedata i KI`
          slutt = `• Linjeleder gjør fullstendig manuell tilrettelegging`
          motargumenter = `• Risiko for upersonlig og mekanisk oppfølging`
          verifikasjon = `• Turnus verifiseres i dialog med ansatt og BHT`
          usikkerhet = `• Avvik kastes umiddelbart, følg standard IA-rutine`
          kioutput = `• Kun sjekkliste og agenda for oppfølgingsmøte`
          endelig = `• Kan bare brukes som ${roleLabel}`
        } else if (caseId === 'HRR-04') {
          forhaand = `• Utarbeidelse av kravprofil helse uten kandidatrangering`
          slutt = `• 100% manuell sortering og utvelgelse av søkere`
          motargumenter = `• Innebygd diskriminering og bias i historiske data`
          verifikasjon = `• Profiler sjekkes mot mangfoldsmål av HR/leder`
          usikkerhet = `• Feil = KI deaktiveres, gå over to standard maler`
          kioutput = `• Kun utkast to profil og råforslag til spørsmålsbank`
          endelig = `• Kan bare brukes som ${roleLabel}`
        } else if (caseId === 'HRR-07') {
          forhaand = `• Scenarioanalyse av langvakter for HMS-avklaring`
          slutt = `• Turnusplaner avgjøres 100% manuelt med tillitsvalgte`
          motargumenter = `• Matematisk optimering ignorerer ansattes velferd`
          verifikasjon = `• Sjekkes mot AML-regler og HMS-risikovurdering`
          usikkerhet = `• Feil = scenarioer forkastes for ordinær planlegging`
          kioutput = `• Kun for å tegne visuelle scenarioer under drøfting`
          endelig = `• Kan bare brukes som ${roleLabel}`
        } else {
          forhaand = `• Vurdering av KI-støtte for ${s.activeTask.title}`
          slutt = `• Fullstendig manuell kontroll og verifisering av leder`
          motargumenter = `• Fare for blind tillit og manglende kontekst`
          verifikasjon = `• Utdata sjekkes mot avtalte kilder før bruk`
          usikkerhet = `• Ved minste mistanke om feil opphører all bruk`
          kioutput = `• Brukes utelukkende som råutkast for videre bearbeiding`
          endelig = `• Kan bare brukes som ${roleLabel}`
        }

        if (role !== s.activeTask.expectedCalculatedRole) {
          overstyring = `• Cap satt til '${roleLabel}' pga. aktive stoppregler`
        } else {
          overstyring = `• Modellens rolle ('${roleLabel}') samsvarer med risiko`
        }

        const baseLog: DecisionLogText = {
          risikovurdering: `${forhaand}\n${motargumenter}\n${usikkerhet}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
          menneskeligKontroll: `${slutt}\n${verifikasjon}\n${kioutput}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
          endeligBeslutning: `${endelig}\n${overstyring}\n• Ansvarlig: ${owner}`.replace(/^\n+|\n+$/g, '').replace(/\n{2,}/g, '\n'),
          internkontrollTiltak: generateRiskMitigationMeasures(s.activeTask),
        }

        const taskClone = JSON.parse(JSON.stringify(s.activeTask))
        const isComplete = isDecisionLogReady(taskClone, s.valueJudgments, baseLog)
        const calculated = runCalculationEngine(taskClone, s.valueJudgments, isComplete, s.calculationModel, s.isSigned)

        const caseScenarios = s.scenarios[caseId] || []
        const scenarioText = caseScenarios.length > 0
          ? '\n\n• LOKALE SCENARIER (ROS):\n' + caseScenarios.map(sc =>
              `  - Hvis dette blir utfallet (${sc.temaTittel}): ${sc.simulertHendelse}\n` +
              `    [Signaler: ${sc.tidligeSignaler} | Verifikasjon: ${sc.lokalVerifikasjon} | Ansvarlig: ${sc.ansvarligEier}]`
            ).join('\n')
          : ''

        const updatedLog = {
          ...baseLog,
          internkontrollTiltak: generateRiskMitigationMeasures(calculated) + scenarioText,
        }

        return {
          decisionLogText: updatedLog,
          isDecisionLogComplete: isComplete,
          activeTask: calculated,
          compassPosition: calculateCompassPosition(calculated, s.calculationModel),
        }
      }),

    confirmAssumptions: (confirmed) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        return { isAssumptionsConfirmed: confirmed }
      }),

    setUserBlindTestAnswer: (answer) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        return { userBlindTestAnswer: answer }
      }),

    setStopRuleDiscussed: (srCode, value) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        return { stopRuleDiscussed: { ...s.stopRuleDiscussed, [srCode]: value } }
      }),

    updateScenarioField: (caseId, temaKey, field, value) =>
      set((s) => {
        if (s.isMakerChecked) return {}
        const caseScenarios = s.scenarios[caseId] || []
        const updatedCaseScenarios = caseScenarios.map((sc) =>
          sc.temaKey === temaKey ? { ...sc, [field]: value } : sc
        )
        return {
          scenarios: {
            ...s.scenarios,
            [caseId]: updatedCaseScenarios,
          },
        }
      }),

    reset: () =>
      set({
        currentStep: 1,
        selectedCaseId: null,
        activeProject: null,
        activeTask: null,
        compassPosition: null,
        chatHistory: [],
        freeText: '',
        valueJudgments: { ...INITIAL_VALUE_JUDGMENTS },
        checkpointAnswers: {},
        isDecisionLogComplete: false,
        decisionLogText: emptyDecisionLogText(),
        isSigned: false,
        makerName: '',
        isMakerChecked: false,
        scenarios: JSON.parse(JSON.stringify(DEFAULT_SCENARIOS)),
        isAssumptionsConfirmed: false,
        userBlindTestAnswer: null,
        stopRuleDiscussed: {},
        userRole: null,
      }),
  }
})
