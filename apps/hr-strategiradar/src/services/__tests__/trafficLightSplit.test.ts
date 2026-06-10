/**
 * TDD: Trafikklys-split + språkkvalitet
 *
 * Gruppe A — SR-05 er en prosessindikator, ikke en risikoindikator.
 *   - SR-05 alene skal ikke sette trafikklyset til rødt.
 *   - SR-05 skal sette assessmentComplete: false.
 *   - SR-05 skal ikke begrense KI-rollen.
 *   - Ekte risikoflagg (SR-01 osv.) skal fortsatt gi rødt.
 *
 * Gruppe B — Språkkvalitet: ord-lengde og vanskelige begreper.
 *   - Ingen ord > 20 tegn i presentStopRule() eller presentRole().
 *   - Ingen forbudte fagord i STOP_RULES_MAP (kildemappe).
 */

import { describe, it, expect } from 'vitest'
import {
  runCalculationEngine,
  INITIAL_VALUE_JUDGMENTS,
  STOP_RULES_MAP,
} from '../mockDiagnosisService'
import { presentStopRule, presentRole } from '../presentationLanguage'
import type { AiUseTask } from '../../domain/schemas'

// Minimal oppgave som isolerer SR-05 fra alle andre stoppregler.
// Betingelse for at BARE SR-05 utløses:
//   - separabilitet >= 3.0  → SR-02 (første ledd) slår ikke til
//   - forklarbarhet >= 3.0  → SR-03 og SR-08 (første ledd) slår ikke til
//   - antiOverreliance >= 3 → SR-04 slår ikke til
//   - workConditionsImpact = true → isHighRisk = true
//   - separabilitet >= 3.0  → SR-08 (andre ledd) slår ikke til selv med workConditions
//   - isDecisionLogComplete = false → SR-05 utløses
const SR05_TASK: AiUseTask = {
  taskId: 'TEST-SR05-ONLY',
  title: 'Oppsummere aggregerte innsikter fra medarbeiderundersøkelse',
  taskType: 'strukturering',
  inputDataType: 'aggregerte anonyme svar',
  outputUse: 'intern drøfting',
  humanDecisionPoint: 'Leder bestemmer tiltak',
  directEffectOnPeople: false,
  usesPersonalOrSensitiveData: false,
  expectedModuleScores: {
    målklarhet:       { score: 4.0, justification: 'Tydelig formål' },
    separabilitet:    { score: 3.0, justification: 'Kan følge regler' },
    forklarbarhet:    { score: 3.5, justification: 'Transparent output' },
    antiOverreliance: { score: 3.5, justification: 'God kontroll' },
  },
  expectedRiskFlags: {
    rightsOrSignificantImpact: false,
    vulnerableParty: false,
    personalOrSensitiveData: false,
    healthSafetyEnvironment: false,
    irreversibleConsequences: false,
    workConditionsImpact: true,     // isHighRisk = true → SR-05 utløses om log mangler
    discriminationRisk: false,
    surveillanceOrControl: false,
  },
  expectedStopRules: [],
  expectedCalculatedRole: 'forsterket_skjønn',
  expectedAllowedRole: 'forsterket_skjønn',
  requiredControls: [],
  requiredLocalVerification: 'Leder gjennomgår',
}

const SAFE_JUDGMENTS = {
  ...INITIAL_VALUE_JUDGMENTS,
  relationalTrustImportant: false,
  humanPresencePartOfValue: false,
  localExceptionsMatter: false,
  valueConflictPresent: false,
  errorReversible: true,
  rightsOrWorkImpact: false,
  sensitiveOrPersonalDataRisk: false,
}

// ─── Gruppe A: Trafikklys-split ───────────────────────────────────────────────

describe('A: SR-05 er prosessindikator, ikke risikoindikator', () => {
  it('A1: SR-05 alene skal IKKE sette trafikklyset til rødt', () => {
    const result = runCalculationEngine(SR05_TASK, SAFE_JUDGMENTS, false)

    expect(result.expectedStopRules).toContain('SR-05')
    expect(result.expectedTrafficLight).not.toBe('red')
  })

  it('A2: SR-05 utløst → assessmentComplete er false', () => {
    const result = runCalculationEngine(SR05_TASK, SAFE_JUDGMENTS, false)

    expect(result.assessmentComplete).toBe(false)
  })

  it('A3: SR-05 ikke utløst (log komplett) → assessmentComplete er true', () => {
    const result = runCalculationEngine(SR05_TASK, SAFE_JUDGMENTS, true)

    expect(result.assessmentComplete).toBe(true)
  })

  it('A4: SR-01 (reell risiko) gir fortsatt rødt trafikklys', () => {
    // Lav forklarbarhet + arbeidsvilkår-risiko → SR-01 utløses
    const highRiskTask: AiUseTask = {
      ...SR05_TASK,
      taskId: 'TEST-SR01',
      expectedModuleScores: {
        ...SR05_TASK.expectedModuleScores,
        forklarbarhet: { score: 2.0, justification: 'Svak forklarbarhet' },
      },
    }
    const result = runCalculationEngine(highRiskTask, SAFE_JUDGMENTS, false)

    expect(result.expectedStopRules).toContain('SR-01')
    expect(result.expectedTrafficLight).toBe('red')
  })

  it('A5: SR-05 alene skal IKKE degradere KI-rollen til idégiver', () => {
    // Med målklarhet=4.0 og separabilitet=3.0 er kalkulert rolle forsterket_skjønn.
    // SR-05 er prosess — skal ikke trekke rollen ned til utforskende_støtte.
    const result = runCalculationEngine(SR05_TASK, SAFE_JUDGMENTS, false)

    expect(result.expectedAllowedRole).not.toBe('utforskende_støtte')
  })
})

// ─── Gruppe B: Språkkvalitet ──────────────────────────────────────────────────

const ALL_STOP_RULES = ['SR-01', 'SR-02', 'SR-03', 'SR-04', 'SR-05', 'SR-06', 'SR-07', 'SR-08']
const ALL_ROLES = [
  'utforskende_støtte',
  'forsterket_skjønn',
  'automatisert_beslutning',
  'strategisk_autonomi',
]
// Ord og uttrykk som ikke skal vises i brukervendt tekst
const FORBIDDEN_VOCAB = [
  'overreliance', 'antioverreliance', 'compliance',
  'deterministisk', 'rolle_tak', 'fria', 'samsvarsgrad',
  'separabilitet',
]

function longWords(text: string): string[] {
  return text.split(/\s+/).filter(w => w.replace(/[^a-zA-ZæøåÆØÅ]/g, '').length > 20)
}

describe('B: Ord-lengde i brukervendt tekst (maks 20 tegn)', () => {
  it('B1: ingen ord i presentStopRule() overstiger 20 tegn', () => {
    for (const sr of ALL_STOP_RULES) {
      const longs = longWords(presentStopRule(sr))
      expect(longs, `presentStopRule(${sr}) har for langt ord: ${longs.join(', ')}`).toHaveLength(0)
    }
  })

  it('B2: ingen ord i presentRole() overstiger 20 tegn', () => {
    for (const r of ALL_ROLES) {
      const longs = longWords(presentRole(r))
      expect(longs, `presentRole(${r}) har for langt ord: ${longs.join(', ')}`).toHaveLength(0)
    }
  })
})

describe('B: Forbudte fagord i STOP_RULES_MAP (kildekartlegging)', () => {
  it('B3: STOP_RULES_MAP-verdiene inneholder ingen forbudte fagord', () => {
    for (const [key, text] of Object.entries(STOP_RULES_MAP)) {
      const lower = text.toLowerCase()
      for (const word of FORBIDDEN_VOCAB) {
        expect(lower, `${key} inneholder forbudt ord: "${word}"`).not.toContain(word)
      }
    }
  })

  it('B4: STOP_RULES_MAP-verdiene inneholder ingen SR-koder', () => {
    for (const [key, text] of Object.entries(STOP_RULES_MAP)) {
      expect(text, `${key} lekker SR-kode i teksten`).not.toMatch(/SR-\d/)
    }
  })

  it('B5: ingen STOP_RULES_MAP-verdi er kortere enn 15 tegn (for vag)', () => {
    for (const [key, text] of Object.entries(STOP_RULES_MAP)) {
      expect(text.length, `${key} er for kort: "${text}"`).toBeGreaterThan(15)
    }
  })
})

describe('B: presentStopRule() bruker ikke forbudte fagord', () => {
  it('B6: presentStopRule() for alle regler er fri for forbudte fagord', () => {
    for (const sr of ALL_STOP_RULES) {
      const lower = presentStopRule(sr).toLowerCase()
      for (const word of FORBIDDEN_VOCAB) {
        expect(lower, `presentStopRule(${sr}) inneholder forbudt ord: "${word}"`).not.toContain(word)
      }
    }
  })
})
