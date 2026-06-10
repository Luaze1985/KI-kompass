import { describe, it, expect, beforeEach } from 'vitest'
import { generateReport } from '../reportService'
import { getDiagnosisData, runCalculationEngine, INITIAL_VALUE_JUDGMENTS } from '../mockDiagnosisService'
import type { ValueJudgments } from '../mockDiagnosisService'
import type { AiUseTask } from '../../domain/schemas'
import type { Scenario } from '../../domain/schemas'

describe('generateReport — beslutningsnotat som Markdown', () => {
  let task: AiUseTask
  let projectTitle: string
  let projectGoal: string
  let decisionOwner: string
  let judgments: ValueJudgments
  let decisionLog: Record<string, string>
  let scenarios: Scenario[]

  beforeEach(() => {
    const data = getDiagnosisData('HRR-01')!
    const project = data.project

    projectTitle = project.title
    projectGoal = project.strategicGoal
    decisionOwner = project.decisionOwner

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
      judgments,
      true
    )

    decisionLog = {
      risikovurdering: 'Kun anonyme, aggregerte data. Sikre partsmedvirkning.',
      menneskeligKontroll: 'Leder og tillitsvalgte drøfter sammen.',
      endeligBeslutning: 'KI brukes kun som sparringspartner.',
    }

    scenarios = [
      {
        temaKey: 'arbeid_rettigheter',
        temaTittel: 'Arbeid og rettigheter',
        simulertHendelse: 'Tiltakshypotesene brukes til å peke ut senioransatte.',
        utfallstype: 'rettigheter',
        tidshorisont: '1-3 måneder',
        berørteParter: 'Senioransatte',
        utløsendeAntakelse: 'KI-output brukes direkte uten drøfting',
        tidligeSignaler: 'Ansatte reagerer på prioriteringer',
        konsekvensHvisIkkeHåndtert: 'Tillitsbrudd og mistro til prosessen',
        lokalVerifikasjon: 'Sjekk med tillitsvalgt',
        ansvarligEier: 'HR-leder',
        bekymringsniva: 'høy',
      },
    ]
  })

  it('inneholder HR-kontekst: tittel, mål og berørte', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toContain(projectTitle)
    expect(report).toContain(projectGoal)
    expect(report).toContain(decisionOwner)
  })

  it('inneholder KI-bruksoppgave med tydelig markering', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toContain(task.title)
    expect(report).toContain(task.outputUse)
  })

  it('viser røde flagg FØR anbefalt rolle i dokumentet', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    const flaggPos = report.indexOf('begrenser')
    const rollePos = report.indexOf('anbefaling etter gjennomgang')
    expect(flaggPos).toBeGreaterThan(-1)
    expect(rollePos).toBeGreaterThan(-1)
    expect(flaggPos).toBeLessThan(rollePos)
  })

  it('skiller modellforslag fra anbefaling etter gjennomgang', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toMatch(/modellen foreslår/i)
    expect(report).toMatch(/anbefaling etter gjennomgang/i)
  })

  it('inneholder hva KI ikke skal gjøre', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toMatch(/ikke skal/i)
  })

  it('inneholder lokal verifikasjon og ansvarlig eier', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toContain(task.requiredLocalVerification)
    expect(report).toContain(decisionOwner)
  })

  it('bruker presentasjonsspråk — ingen SR-koder eller tekniske termer', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    // Ingen SR-koder i brukervendt tekst
    expect(report).not.toMatch(/SR-\d+/)
    // Ingen tekniske termer
    expect(report.toLowerCase()).not.toContain('separabilitet')
    expect(report.toLowerCase()).not.toContain('rolle_tak')
    expect(report.toLowerCase()).not.toContain('deterministisk')
    expect(report.toLowerCase()).not.toContain('antioverreliance')
  })

  it('inneholder ingen forbudte begreper (fasit, godkjent, sertifikat)', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )
    const lower = report.toLowerCase()

    expect(lower).not.toContain('fasit')
    expect(lower).not.toMatch(/\bgodkjent\b/)
    expect(lower).not.toContain('sertifikat')
    expect(lower).not.toMatch(/juridisk godkjenning/)
  })

  it('merkes tydelig som utkast', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toMatch(/utkast/i)
  })

  it('inkluderer scenario-/ROS-punkter fra workshopen', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toContain('Arbeid og rettigheter')
    expect(report).toContain(scenarios[0].simulertHendelse)
  })

  it('inkluderer menneskelig vurdering fra beslutningsloggen', () => {
    const report = generateReport(
      getDiagnosisData('HRR-01')!.project,
      task, judgments, decisionLog, scenarios
    )

    expect(report).toContain(decisionLog.risikovurdering)
    expect(report).toContain(decisionLog.menneskeligKontroll)
    expect(report).toContain(decisionLog.endeligBeslutning)
  })
})
