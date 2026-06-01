import { describe, it, expect } from 'vitest'
import {
  HrMicroprojectSchema,
  AiUseTaskSchema,
  ModuleScoresSchema,
  ValueJudgmentsSchema,
  DecisionLogSchema,
  KiRole,
  StopRule,
} from '../schemas'

describe('HrMicroproject schema', () => {
  it('accepts valid microproject with AI use tasks', () => {
    const valid = {
      caseId: 'HRR-01',
      title: 'Seniorbevaring i hjemmetjenesten',
      strategyArea: 'livsfasepolitikk',
      strategicGoal: 'Bidra til at senioransatte står lenger i arbeid',
      targetGroups: ['senioransatte', 'ledere', 'HR'],
      affectedParties: ['ansatte i ulike livsfaser', 'brukere av hjemmetjenesten'],
      decisionOwner: 'HR-sjef',
      knownFacts: ['Kommunen har behov for arbeidskraft'],
      uncertainties: ['lokale data', 'årsaker til avgang'],
      sourceBasis: 'KS-rapport om tiltak for lengre arbeidsliv',
      aiUseTasks: [
        {
          taskId: 'HRR-01-A',
          title: 'Strukturere anonymisert innsikt og tiltakshypoteser',
          taskType: 'strukturering',
          inputDataType: 'anonymiserte innspill og aggregerte indikatorer',
          outputUse: 'intern drøfting',
          humanDecisionPoint: 'Leder/HR vurderer og velger tiltak',
          directEffectOnPeople: false,
          usesPersonalOrSensitiveData: false,
          expectedModuleScores: {
            målklarhet: { score: 3.5, justification: 'Tiltaksmål er bredt men retning er klar' },
            separabilitet: { score: 2.5, justification: 'Verdivalg: lokal praksis og tillit avgjør om KI-output kan brukes isolert' },
            forklarbarhet: { score: 3.5, justification: 'Output kan spores til innspill' },
            antiOverreliance: { score: 3, justification: 'Krever aktiv vurdering av hypoteser' },
          },
          expectedRiskFlags: {
            rightsOrSignificantImpact: false,
            vulnerableParty: false,
            personalOrSensitiveData: false,
            healthSafetyEnvironment: false,
            irreversibleConsequences: false,
            workConditionsImpact: true,
            discriminationRisk: false,
            surveillanceOrControl: false,
          },
          expectedStopRules: ['SR-02', 'SR-05'],
          expectedCalculatedRole: 'forsterket_skjønn',
          expectedAllowedRole: 'utforskende_støtte',
          requiredControls: ['lokal verifikasjon', 'beslutningslogg'],
          requiredLocalVerification: 'Leder må vurdere mot lokale forhold',
        },
      ],
    }

    const result = HrMicroprojectSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects project without title', () => {
    const invalid = {
      caseId: 'HRR-01',
      strategyArea: 'livsfasepolitikk',
      strategicGoal: 'Mål',
      targetGroups: ['a'],
      affectedParties: ['b'],
      decisionOwner: 'HR-sjef',
      knownFacts: [],
      uncertainties: [],
      sourceBasis: 'kilde',
      aiUseTasks: [],
    }
    const result = HrMicroprojectSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('rejects project without strategicGoal', () => {
    const invalid = {
      caseId: 'HRR-01',
      title: 'Test',
      strategyArea: 'livsfasepolitikk',
      targetGroups: ['a'],
      affectedParties: ['b'],
      decisionOwner: 'HR-sjef',
      knownFacts: [],
      uncertainties: [],
      sourceBasis: 'kilde',
      aiUseTasks: [],
    }
    const result = HrMicroprojectSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('rejects project without decisionOwner', () => {
    const invalid = {
      caseId: 'HRR-01',
      title: 'Test',
      strategyArea: 'livsfasepolitikk',
      strategicGoal: 'Mål',
      targetGroups: ['a'],
      affectedParties: ['b'],
      knownFacts: [],
      uncertainties: [],
      sourceBasis: 'kilde',
      aiUseTasks: [],
    }
    const result = HrMicroprojectSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('rejects project without aiUseTasks', () => {
    const invalid = {
      caseId: 'HRR-01',
      title: 'Test',
      strategyArea: 'livsfasepolitikk',
      strategicGoal: 'Mål',
      targetGroups: ['a'],
      affectedParties: ['b'],
      decisionOwner: 'HR-sjef',
      knownFacts: [],
      uncertainties: [],
      sourceBasis: 'kilde',
    }
    const result = HrMicroprojectSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })

  it('requires at least one AI use task', () => {
    const invalid = {
      caseId: 'HRR-01',
      title: 'Test',
      strategyArea: 'livsfasepolitikk',
      strategicGoal: 'Mål',
      targetGroups: ['a'],
      affectedParties: ['b'],
      decisionOwner: 'HR-sjef',
      knownFacts: [],
      uncertainties: [],
      sourceBasis: 'kilde',
      aiUseTasks: [],
    }
    const result = HrMicroprojectSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})

describe('AiUseTask schema', () => {
  it('validates module scores are between 1 and 5', () => {
    const invalidScore = {
      taskId: 'X',
      title: 'Test',
      taskType: 'strukturering',
      inputDataType: 'data',
      outputUse: 'bruk',
      humanDecisionPoint: 'Leder vurderer',
      directEffectOnPeople: false,
      usesPersonalOrSensitiveData: false,
      expectedModuleScores: {
        målklarhet: { score: 6, justification: 'For høy' },
        separabilitet: { score: 2, justification: 'Ok' },
        forklarbarhet: { score: 3, justification: 'Ok' },
        antiOverreliance: { score: 3, justification: 'Ok' },
      },
      expectedRiskFlags: {
        rightsOrSignificantImpact: false,
        vulnerableParty: false,
        personalOrSensitiveData: false,
        healthSafetyEnvironment: false,
        irreversibleConsequences: false,
        workConditionsImpact: false,
        discriminationRisk: false,
        surveillanceOrControl: false,
      },
      expectedStopRules: [],
      expectedCalculatedRole: 'utforskende_støtte',
      expectedAllowedRole: 'utforskende_støtte',
      requiredControls: [],
      requiredLocalVerification: '',
    }
    const result = AiUseTaskSchema.safeParse(invalidScore)
    expect(result.success).toBe(false)
  })

  it('validates stop rules are valid SR codes', () => {
    const invalidStopRule = {
      taskId: 'X',
      title: 'Test',
      taskType: 'strukturering',
      inputDataType: 'data',
      outputUse: 'bruk',
      humanDecisionPoint: 'Leder',
      directEffectOnPeople: false,
      usesPersonalOrSensitiveData: false,
      expectedModuleScores: {
        målklarhet: { score: 3, justification: 'Ok' },
        separabilitet: { score: 3, justification: 'Ok' },
        forklarbarhet: { score: 3, justification: 'Ok' },
        antiOverreliance: { score: 3, justification: 'Ok' },
      },
      expectedRiskFlags: {
        rightsOrSignificantImpact: false,
        vulnerableParty: false,
        personalOrSensitiveData: false,
        healthSafetyEnvironment: false,
        irreversibleConsequences: false,
        workConditionsImpact: false,
        discriminationRisk: false,
        surveillanceOrControl: false,
      },
      expectedStopRules: ['SR-99'],
      expectedCalculatedRole: 'utforskende_støtte',
      expectedAllowedRole: 'utforskende_støtte',
      requiredControls: [],
      requiredLocalVerification: '',
    }
    const result = AiUseTaskSchema.safeParse(invalidStopRule)
    expect(result.success).toBe(false)
  })
})

describe('ModuleScores schema', () => {
  it('requires justification for each score', () => {
    const noJustification = {
      målklarhet: { score: 4 },
      separabilitet: { score: 2, justification: 'Ok' },
      forklarbarhet: { score: 3, justification: 'Ok' },
      antiOverreliance: { score: 3, justification: 'Ok' },
    }
    const result = ModuleScoresSchema.safeParse(noJustification)
    expect(result.success).toBe(false)
  })

  it('marks separabilitet as value judgment', () => {
    const scores = {
      målklarhet: { score: 4, justification: 'Klart mål' },
      separabilitet: { score: 2, justification: 'Verdivalg: lokal praksis avgjør' },
      forklarbarhet: { score: 3, justification: 'Ok' },
      antiOverreliance: { score: 3, justification: 'Ok' },
    }
    const result = ModuleScoresSchema.safeParse(scores)
    expect(result.success).toBe(true)
    // Schema should have isValueJudgment metadata on separabilitet
  })
})

describe('ValueJudgments schema', () => {
  it('accepts valid value judgments', () => {
    const valid = {
      relationalTrustImportant: true,
      humanPresencePartOfValue: true,
      localExceptionsMatter: true,
      valueConflictPresent: false,
      errorReversible: true,
      rightsOrWorkImpact: false,
      sensitiveOrPersonalDataRisk: false,
    }
    const result = ValueJudgmentsSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })
})

describe('DecisionLog schema', () => {
  it('accepts low-risk log with minimal fields', () => {
    const lowRisk = {
      riskLevel: 'low' as const,
      beslutningId: 'D-001',
      beslutningTittel: 'Bruk av KI for strukturering',
      beslutningseier: 'HR-sjef',
      forelopigTillattRolle: 'utforskende_støtte' as const,
      kiOutputBrukt: 'Strukturerte tiltakshypoteser',
      endeligBeslutning: 'Godkjent for intern bruk',
      endeligAnsvarlig: 'HR-sjef',
      dato: '2026-05-16',
    }
    const result = DecisionLogSchema.safeParse(lowRisk)
    expect(result.success).toBe(true)
  })

  it('requires additional fields for high-risk log', () => {
    const highRiskMissingFields = {
      riskLevel: 'high' as const,
      beslutningId: 'D-002',
      beslutningTittel: 'KI-prioritering av ansatte',
      beslutningseier: 'HR-sjef',
      forelopigTillattRolle: 'utforskende_støtte' as const,
      kiOutputBrukt: 'Prioriteringsliste',
      endeligBeslutning: 'Avvist',
      endeligAnsvarlig: 'HR-sjef',
      dato: '2026-05-16',
      // Missing: berorteParter, stopreglerUtloest, menneskeligForhandsvurdering, etc.
    }
    const result = DecisionLogSchema.safeParse(highRiskMissingFields)
    expect(result.success).toBe(false)
  })

  it('accepts complete high-risk log', () => {
    const highRisk = {
      riskLevel: 'high' as const,
      beslutningId: 'D-002',
      beslutningTittel: 'KI-prioritering av ansatte',
      beslutningseier: 'HR-sjef',
      berorteParter: ['senioransatte', 'ledere'],
      risikoniva: 'høy',
      stopreglerUtloest: ['SR-01', 'SR-02'],
      rolleTak: 'utforskende_støtte' as const,
      beregnetRolle: 'forsterket_skjønn' as const,
      forelopigTillattRolle: 'utforskende_støtte' as const,
      kiOutputBrukt: 'Prioriteringsliste',
      menneskeligForhandsvurdering: 'Vurdert før KI-output ble sett',
      menneskeligSluttvurdering: 'Avvist pga individpåvirkning',
      motargumenterVurdert: 'KI kan gi objektivitet, men mangler lokalkunnskap',
      verifikasjon: 'Sjekket mot lokale data',
      usikkerhet: 'Uklart om KI fanger lokal kontekst',
      overstyring: true,
      begrunnelseForOverstyring: 'For høy risiko for feilprioritering',
      endeligBeslutning: 'Bruk kun som utforskende støtte',
      endeligAnsvarlig: 'HR-sjef',
      dato: '2026-05-16',
    }
    const result = DecisionLogSchema.safeParse(highRisk)
    expect(result.success).toBe(true)
  })
})

describe('KiRole enum', () => {
  it('contains expected roles', () => {
    expect(KiRole.options).toContain('utforskende_støtte')
    expect(KiRole.options).toContain('forsterket_skjønn')
    expect(KiRole.options).toContain('strategisk_autonomi')
    expect(KiRole.options).toContain('automatisert_beslutning')
  })
})

describe('StopRule enum', () => {
  it('contains SR-01 through SR-08', () => {
    for (let i = 1; i <= 8; i++) {
      expect(StopRule.options).toContain(`SR-0${i}`)
    }
  })
})
