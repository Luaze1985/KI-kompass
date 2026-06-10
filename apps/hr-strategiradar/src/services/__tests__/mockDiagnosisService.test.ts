import { describe, it, expect } from 'vitest'
import {
  runCalculationEngine,
  calculateCompassPosition,
  scaleScoreToAxis,
  compareBlindTestRole,
  getDiagnosisData,
  evaluateStopRules,
  getRoleCap,
  getCalculatedRole,
  minRole,
  generateRiskMitigationMeasures,
  INITIAL_VALUE_JUDGMENTS,
  type ValueJudgments,
} from '../mockDiagnosisService'
import type { AiUseTask } from '../../domain/schemas'

describe('mockDiagnosisService calculations and rules engine', () => {
  it('loads valid diagnosis data for HRR-01', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    expect(data?.project.caseId).toBe('HRR-01')
    expect(data?.task.taskId).toBe('HRR-01-A')
  })

  it('calculates compass position correctly (sentrert på terskel 3.0)', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const position = calculateCompassPosition(data.task, 'linear')
      const scores = data.task.expectedModuleScores
      const expectedX = scaleScoreToAxis(scores.separabilitet.score)
      const expectedY = scaleScoreToAxis(scores.målklarhet.score)

      expect(position.x).toBe(expectedX)
      expect(position.y).toBe(expectedY)
    }
  })

  it('scaleScoreToAxis sentrerer score 3.0 på 0.5 og forsterker rundt terskelen', () => {
    expect(scaleScoreToAxis(3.0)).toBe(0.5)
    // Høyere score → høyere koordinat, og forskjellen er større enn gammel (score-1)/4
    expect(scaleScoreToAxis(4.0)).toBeGreaterThan(scaleScoreToAxis(3.5))
    expect(scaleScoreToAxis(3.5)).toBeGreaterThan(0.5)
    expect(scaleScoreToAxis(2.0)).toBeLessThan(0.5)
    // Klamping til [0,1]
    expect(scaleScoreToAxis(1.0)).toBeGreaterThanOrEqual(0)
    expect(scaleScoreToAxis(5.0)).toBeLessThanOrEqual(1)
  })

  it('calculates base role from compass and control scores', () => {
    // Høy målklarhet (>=3) + Høy separabilitet (>=3) -> automatisert_beslutning
    expect(getCalculatedRole(4.0, 4.0)).toBe('automatisert_beslutning')
    expect(getCalculatedRole(3.0, 5.0)).toBe('automatisert_beslutning')

    // Høy målklarhet (>=3) + Lav separabilitet (<3) -> forsterket_skjønn
    expect(getCalculatedRole(4.0, 2.0)).toBe('forsterket_skjønn')
    expect(getCalculatedRole(3.0, 2.9)).toBe('forsterket_skjønn')

    // Lav målklarhet (<3) + Lav separabilitet (<3) -> utforskende_støtte
    expect(getCalculatedRole(2.0, 2.0)).toBe('utforskende_støtte')
    expect(getCalculatedRole(2.9, 1.0)).toBe('utforskende_støtte')

    // Lav målklarhet (<3) + Høy separabilitet (>=3) -> strategisk_autonomi
    expect(getCalculatedRole(2.0, 4.0)).toBe('strategisk_autonomi')
    expect(getCalculatedRole(2.5, 3.0)).toBe('strategisk_autonomi')
  })

  it('compareBlindTestRole flagger overconfidence når gruppen vil gi KI større rolle', () => {
    // Gruppen velger automatisert, systemet anbefaler idégiver -> overconfident
    expect(compareBlindTestRole('automatisert_beslutning', 'utforskende_støtte')).toBe('overconfident')
    // Gruppen strengere enn systemet -> cautious
    expect(compareBlindTestRole('utforskende_støtte', 'forsterket_skjønn')).toBe('cautious')
    // Samme nivå -> agree
    expect(compareBlindTestRole('forsterket_skjønn', 'forsterket_skjønn')).toBe('agree')
    // Mangler svar -> null
    expect(compareBlindTestRole(null, 'utforskende_støtte')).toBe(null)
  })

  it('evaluates role prioritization (minRole) correctly', () => {
    expect(minRole('utforskende_støtte', 'automatisert_beslutning')).toBe('utforskende_støtte')
    expect(minRole('strategisk_autonomi', 'forsterket_skjønn')).toBe('strategisk_autonomi')
    expect(minRole('automatisert_beslutning', 'automatisert_beslutning')).toBe('automatisert_beslutning')
  })

  it('triggers stop rules correctly based on inputs', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = JSON.parse(JSON.stringify(data.task))
      const judgments: ValueJudgments = { ...INITIAL_VALUE_JUDGMENTS }

      const scores = {
        målklarhet: 4,
        separabilitet: 4,
        forklarbarhet: 4,
        antiOverreliance: 4,
      }

      // No risk factors -> no stop rules triggered (except SR-05 if high risk, which is false)
      task.expectedRiskFlags.workConditionsImpact = false
      let rules = evaluateStopRules(task, judgments, scores, false)
      expect(rules).toHaveLength(0)

      // SR-02: Relational trust / local exceptions / human presence / low separabilitet
      judgments.relationalTrustImportant = true
      rules = evaluateStopRules(task, judgments, scores, false)
      expect(rules).toContain('SR-02')

      // SR-03: Low forklarbarhet (<3)
      judgments.relationalTrustImportant = false
      const lowOversightScores = { ...scores, forklarbarhet: 2 }
      rules = evaluateStopRules(task, judgments, lowOversightScores, false)
      expect(rules).toContain('SR-03')

      // SR-04: Low overreliance (<3)
      const lowOverrelianceScores = { ...scores, antiOverreliance: 2 }
      rules = evaluateStopRules(task, judgments, lowOverrelianceScores, false)
      expect(rules).toContain('SR-04')

      // SR-08: Output cannot be verified well enough
      task.expectedRiskFlags.workConditionsImpact = true
      const weakVerificationScores = { ...scores, separabilitet: 2.8 }
      rules = evaluateStopRules(task, judgments, weakVerificationScores, false)
      expect(rules).toContain('SR-08')
    }
  })

  it('caps roles correctly based on active stop rules', () => {
    expect(getRoleCap(['SR-01'])).toBe('utforskende_støtte')
    expect(getRoleCap(['SR-02'])).toBe('utforskende_støtte')
    expect(getRoleCap(['SR-05'])).toBe('utforskende_støtte')
    expect(getRoleCap(['SR-08'])).toBe('utforskende_støtte')

    expect(getRoleCap(['SR-03'])).toBe('utforskende_støtte')
    expect(getRoleCap(['SR-04'])).toBe('utforskende_støtte')
    expect(getRoleCap(['SR-06'])).toBe('forsterket_skjønn')
    expect(getRoleCap(['SR-07'])).toBe('forsterket_skjønn')

    expect(getRoleCap([])).toBe('automatisert_beslutning')
  })

  it('runs the full calculation engine reactively and handles SR-05 decision log completeness', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = JSON.parse(JSON.stringify(data.task))
      const judgments: ValueJudgments = { ...INITIAL_VALUE_JUDGMENTS }

      // Make the case high-risk
      judgments.rightsOrWorkImpact = true
      task.expectedModuleScores.målklarhet.score = 4.5
      task.expectedModuleScores.separabilitet.score = 4.5
      task.expectedModuleScores.forklarbarhet.score = 4.0
      task.expectedModuleScores.antiOverreliance.score = 4.0

      // Run engine with INCOMPLETE decision log
      let result = runCalculationEngine(task, judgments, false)
      // Since it is high risk and log is incomplete, SR-05 must be triggered
      expect(result.expectedStopRules).toContain('SR-05')
      // Allowed role must be capped to utforskende_støtte
      expect(result.expectedAllowedRole).toBe('utforskende_støtte')

      // Run engine with COMPLETE decision log
      result = runCalculationEngine(task, judgments, true)
      // SR-05 must be resolved
      expect(result.expectedStopRules).not.toContain('SR-05')
      // HR risk can never jump to automated decision just because the log is complete.
      expect(result.expectedCalculatedRole).toBe('automatisert_beslutning')
      expect(result.expectedAllowedRole).toBe('forsterket_skjønn')
    }
  })

  it('supports three calculation models: gmm, linear, conservative', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = JSON.parse(JSON.stringify(data.task))
      const judgments: ValueJudgments = { ...INITIAL_VALUE_JUDGMENTS }

      // Set scores that are polarized (M=5, S=1)
      task.expectedModuleScores.målklarhet.score = 5.0
      task.expectedModuleScores.separabilitet.score = 1.0
      task.expectedModuleScores.forklarbarhet.score = 4.5
      task.expectedModuleScores.antiOverreliance.score = 4.5

      // Under GMM: kompassScore is 1.3416 < 2.5 -> red traffic light
      // calculatedRole is 'forsterket_skjønn' (M=5 >= 3, S=1 < 3)
      const resultGmm = runCalculationEngine(task, judgments, true, 'gmm')
      expect(resultGmm.expectedCalculatedRole).toBe('forsterket_skjønn')
      expect(resultGmm.expectedTrafficLight).toBe('red')

      // Under Linear (45/55): kompassScore is 2.80 >= 2.5, but SR-02 is triggered because separabilitet = 1.0 <= 2.5 -> red traffic light
      const resultLinear = runCalculationEngine(task, judgments, true, 'linear')
      expect(resultLinear.expectedCalculatedRole).toBe('forsterket_skjønn')
      expect(resultLinear.expectedTrafficLight).toBe('red')

      // Under Conservative: kompassScore is min(5, 1) = 1.0 < 2.5 -> red traffic light
      const resultCons = runCalculationEngine(task, judgments, true, 'conservative')
      expect(resultCons.expectedCalculatedRole).toBe('forsterket_skjønn')
      expect(resultCons.expectedTrafficLight).toBe('red')
    }
  })

  it('generates red risk mitigation measures from traffic light and stop rules', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = {
        ...data.task,
        expectedTrafficLight: 'red',
        expectedStopRules: ['SR-05', 'SR-08'],
      }

      const measures = generateRiskMitigationMeasures(task)

      expect(measures).toContain('personvernvurdering')
      expect(measures).toContain('forskjellsbehandler')
      expect(measures).not.toContain('SR-05')
      expect(measures).not.toContain('SR-08')
    }
  })

  it('generates yellow risk mitigation measures from traffic light', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = {
        ...data.task,
        expectedTrafficLight: 'yellow',
        expectedStopRules: [],
      }

      const measures = generateRiskMitigationMeasures(task)

      expect(measures).toContain('ukentlig stikkprøvekontroll av en femtedel av utdataene')
      expect(measures).toContain('HMS-gjennomgang')
    }
  })

  it('generates green risk mitigation measures from traffic light', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = {
        ...data.task,
        expectedTrafficLight: 'green',
        expectedStopRules: [],
      }

      const measures = generateRiskMitigationMeasures(task)

      expect(measures).toContain('en enkel risikovurdering minst én gang i året')
    }
  })

  it('keeps generated user-facing text free of approval and rule-code language', () => {
    const data = getDiagnosisData('HRR-01')
    expect(data).not.toBeNull()
    if (data) {
      const task: AiUseTask = {
        ...data.task,
        expectedTrafficLight: 'red',
        expectedStopRules: ['SR-05', 'SR-08'],
      }

      const measures = generateRiskMitigationMeasures(task)
      expect(measures).not.toMatch(/SR-\d+/)
      expect(measures.toLowerCase()).not.toContain('godkjent')
      expect(measures.toLowerCase()).not.toContain('revisjon')
    }
  })
})
