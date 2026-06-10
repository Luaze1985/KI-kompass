import { describe, it, expect, beforeEach } from 'vitest'
import { generateJsonExport } from '../reportService'
import { getDiagnosisData, runCalculationEngine, INITIAL_VALUE_JUDGMENTS } from '../mockDiagnosisService'
import type { ValueJudgments } from '../mockDiagnosisService'
import type { AiUseTask, Scenario } from '../../domain/schemas'

describe('generateJsonExport — maskinlesbar vurderingseksport', () => {
  let task: AiUseTask
  let judgments: ValueJudgments
  let decisionLog: Record<string, string>
  let scenarios: Scenario[]

  beforeEach(() => {
    const data = getDiagnosisData('HRR-01')!
    judgments = {
      ...INITIAL_VALUE_JUDGMENTS,
      relationalTrustImportant: true,
      localExceptionsMatter: true,
      rightsOrWorkImpact: true,
      errorReversible: false,
      sensitiveOrPersonalDataRisk: false,
    }
    task = runCalculationEngine(
      JSON.parse(JSON.stringify(data.task)),
      judgments, true
    )
    decisionLog = {
      risikovurdering: 'Kun anonyme, aggregerte data.',
      menneskeligKontroll: 'Leder og tillitsvalgte drøfter sammen.',
      endeligBeslutning: 'KI brukes kun som sparringspartner.',
    }
    scenarios = [{
      temaKey: 'arbeid_rettigheter',
      temaTittel: 'Arbeid og rettigheter',
      simulertHendelse: 'Tiltakshypotesene brukes til å peke ut senioransatte.',
      utfallstype: 'rettigheter',
      tidshorisont: '1-3 måneder',
      berørteParter: 'Senioransatte',
      utløsendeAntakelse: 'KI-output brukes direkte',
      tidligeSignaler: 'Ansatte reagerer',
      konsekvensHvisIkkeHåndtert: 'Tillitsbrudd',
      lokalVerifikasjon: 'Sjekk med tillitsvalgt',
      ansvarligEier: 'HR-leder',
      bekymringsniva: 'høy',
    }]
  })

  it('returnerer gyldig JSON-streng', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    expect(() => JSON.parse(json)).not.toThrow()
  })

  it('inneholder prosjekt-metadata', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.prosjekt.tittel).toBe('Seniorbevaring i hjemmetjenesten')
    expect(obj.prosjekt.beslutningseier).toBeTruthy()
  })

  it('inneholder KI-oppgave', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.kiOppgave.tittel).toBe(task.title)
    expect(obj.kiOppgave.brukesTil).toBeTruthy()
  })

  it('inneholder vurderingsresultat med roller i klartekst', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.vurdering.modellForeslår).toMatch(/sparringspartner|forbereder|handler|tar beslutningen/i)
    expect(obj.vurdering.anbefalingEtterGjennomgang).toMatch(/sparringspartner|forbereder|handler|tar beslutningen/i)
  })

  it('inneholder røde flagg som klartekst-array', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(Array.isArray(obj.vurdering.rødeFlagg)).toBe(true)
    for (const flagg of obj.vurdering.rødeFlagg) {
      expect(flagg).not.toMatch(/SR-\d+/)
    }
  })

  it('inneholder scenarioer', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.risikopunkter).toHaveLength(1)
    expect(obj.risikopunkter[0].tema).toBe('Arbeid og rettigheter')
  })

  it('inneholder beslutningslogg', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.menneskeligVurdering.risikovurdering).toContain('anonyme')
    expect(obj.menneskeligVurdering.beslutning).toContain('sparringspartner')
  })

  it('inneholder ingen SR-koder eller tekniske termer', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    // Sjekk hele JSON-strengen
    expect(json).not.toMatch(/SR-\d+/)
    expect(json.toLowerCase()).not.toContain('separabilitet')
    expect(json.toLowerCase()).not.toContain('rolle_tak')
    expect(json.toLowerCase()).not.toContain('antioverreliance')
  })

  it('inneholder ingen forbudte begreper (fasit, godkjent, sertifikat)', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const lower = json.toLowerCase()

    expect(lower).not.toContain('fasit')
    expect(lower).not.toMatch(/\bgodkjent\b/)
    expect(lower).not.toContain('sertifikat')
    expect(lower).not.toMatch(/juridisk godkjenning/)
  })

  it('merkes som utkast', () => {
    const json = generateJsonExport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const obj = JSON.parse(json)
    expect(obj.status).toMatch(/utkast/i)
  })
})
