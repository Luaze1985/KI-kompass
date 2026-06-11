import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { useAppStore } from '../../store/store'
import { getDiagnosisData, calculateCompassPosition, runCalculationEngine, INITIAL_VALUE_JUDGMENTS } from '../../services/mockDiagnosisService'
import Dashboard from './Dashboard'

afterEach(() => {
  act(() => { useAppStore.getState().reset() })
})

function setupWithCase() {
  const data = getDiagnosisData('HRR-01')
  if (!data) throw new Error('Missing fixture')
  act(() => {
    useAppStore.getState().reset()
    useAppStore.setState({
      selectedCaseId: data.project.caseId,
      activeProject: data.project,
      activeTask: data.task,
      compassPosition: calculateCompassPosition(data.task),
    })
  })
}

describe('Dashboard — rapporteksport i steg 4', () => {
  it('viser eksportknapper for Markdown og JSON i steg 4', () => {
    setupWithCase()
    act(() => {
      useAppStore.setState({
        isAssumptionsConfirmed: true,
        currentStep: 4,
        userBlindTestAnswer: 'utforskende_støtte',
        isDecisionLogComplete: true,
        decisionLogText: {
          risikovurdering: 'Test',
          menneskeligKontroll: 'Test',
          endeligBeslutning: 'Test',
          internkontrollTiltak: '',
        },
      })
    })
    render(<Dashboard />)
    expect(screen.getByRole('button', { name: /tekstfil/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /datafil/i })).toBeTruthy()
  })
})

describe('Dashboard — randsone-badges i steg 1 (Feature 2)', () => {
  it('viser "Områder denne oppgaven berører" med Arbeidsvilkår-badge for HRR-01', () => {
    // HRR-01-A har expectedRiskFlags.workConditionsImpact: true → skal gi "Arbeidsvilkår"-badge
    setupWithCase()
    render(<Dashboard />)
    expect(screen.getByText('Områder denne oppgaven berører:')).toBeTruthy()
    expect(screen.getByText('Arbeidsvilkår')).toBeTruthy()
  })
})

describe('Dashboard — AssessmentStatusBar (C1–C4)', () => {
  function setupStep2(isDecisionLogComplete = false) {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture')
    const task = runCalculationEngine(data.task, INITIAL_VALUE_JUDGMENTS, isDecisionLogComplete, 'linear', false)
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: task,
        compassPosition: calculateCompassPosition(task),
        isAssumptionsConfirmed: true,
        currentStep: 2,
        userBlindTestAnswer: 'utforskende_støtte',
        isDecisionLogComplete,
      })
    })
  }

  it('C1: steg 2 viser risikonivå-indikator', () => {
    setupStep2()
    render(<Dashboard />)
    expect(screen.getByText(/Risikonivå:/i)).toBeTruthy()
  })

  it('C2: steg 2 viser "Notatet er ikke ferdig utfylt" når assessmentComplete=false', () => {
    setupStep2(false)
    render(<Dashboard />)
    expect(screen.getByText(/Notatet er ikke ferdig utfylt/i)).toBeTruthy()
  })

  it('C3: steg 2 viser "Vurderingen er ferdig" når assessmentComplete=true', () => {
    setupStep2(true)
    render(<Dashboard />)
    expect(screen.getByText(/Vurderingen er ferdig/i)).toBeTruthy()
  })

  it('C4: steg 4 viser også risikonivå- og ferdigstatus-indikatorer', () => {
    setupStep2(false)
    act(() => useAppStore.setState({ currentStep: 4 }))
    render(<Dashboard />)
    expect(screen.getByText(/Risikonivå:/i)).toBeTruthy()
    expect(screen.getByText(/Notatet er ikke ferdig utfylt/i)).toBeTruthy()
  })
})

describe('Dashboard — progresjonsvalidering steg 2 (Syklus 1.1)', () => {
  function setupStep2Gating(allDiscussed: boolean) {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture')
    const task = runCalculationEngine(data.task, INITIAL_VALUE_JUDGMENTS, false, 'linear', false)
    const discussed: Record<string, boolean> = {}
    if (allDiscussed) {
      for (const sr of task.expectedStopRules) discussed[sr] = true
    }
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: task,
        compassPosition: calculateCompassPosition(task),
        isAssumptionsConfirmed: true,
        currentStep: 2,
        userBlindTestAnswer: 'utforskende_støtte',
        stopRuleDiscussed: discussed,
      })
    })
    return task
  }

  it('deaktiverer "Gå til risikovurdering" når ikke alle stoppregler er diskutert', () => {
    const task = setupStep2Gating(false)
    expect(task.expectedStopRules.length).toBeGreaterThan(0)
    render(<Dashboard />)
    expect(screen.getByRole('button', { name: /Gå til risikovurdering/ })).toBeDisabled()
  })

  it('aktiverer "Gå til risikovurdering" når alle stoppregler er diskutert', () => {
    setupStep2Gating(true)
    render(<Dashboard />)
    expect(screen.getByRole('button', { name: /Gå til risikovurdering/ })).not.toBeDisabled()
  })
})

describe('Dashboard — progresjonsvalidering steg 3 (Syklus 1.2)', () => {
  function setupStep3(withScenarioContent: boolean) {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture')
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: data.task,
        compassPosition: calculateCompassPosition(data.task),
        isAssumptionsConfirmed: true,
        currentStep: 3,
        userBlindTestAnswer: 'utforskende_støtte',
        scenarios: {
          'HRR-01': withScenarioContent
            ? [{
                temaKey: 'test',
                temaTittel: 'Test',
                simulertHendelse: 'Noe kan gå galt',
                utløsendeAntakelse: '',
                berørteParter: '',
                tidligeSignaler: '',
                konsekvensHvisIkkeHåndtert: '',
                lokalVerifikasjon: '',
                ansvarligEier: '',
                bekymringsniva: 'middels' as const,
                utfallstype: 'operasjonell' as const,
                tidshorisont: '1-3 mnd',
              }]
            : [],
        },
      })
    })
  }

  it('deaktiverer "Gå til beslutningsnotat" når ingen scenarier har innhold', () => {
    setupStep3(false)
    render(<Dashboard />)
    expect(screen.getByRole('button', { name: /Gå til beslutningsnotat/ })).toBeDisabled()
  })

  it('aktiverer "Gå til beslutningsnotat" når minst ett scenario har innhold', () => {
    setupStep3(true)
    render(<Dashboard />)
    expect(screen.getByRole('button', { name: /Gå til beslutningsnotat/ })).not.toBeDisabled()
  })
})

describe('Dashboard — klikkbare manglende-felt (Syklus 3.1)', () => {
  it('setter fokus på riktig felt når man klikker et manglende-felt', () => {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture')
    const task = runCalculationEngine(data.task, INITIAL_VALUE_JUDGMENTS, false, 'linear', false)
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: task,
        compassPosition: calculateCompassPosition(task),
        isAssumptionsConfirmed: true,
        currentStep: 4,
        userBlindTestAnswer: 'utforskende_støtte',
        isDecisionLogComplete: false,
        decisionLogText: {
          risikovurdering: '',
          menneskeligKontroll: 'Fylt.',
          endeligBeslutning: 'Fylt.',
          internkontrollTiltak: 'Fylt.',
        },
      })
    })
    render(<Dashboard />)

    // Åpne "mangler"-lista via chipen
    fireEvent.click(screen.getByRole('button', { name: /Notatet er ikke ferdig utfylt/ }))

    // Klikk manglende-feltet → fokus skal flyttes til tekstfeltet
    fireEvent.click(screen.getByRole('button', { name: 'Risikovurdering' }))

    const textarea = document.getElementById('risikovurdering')
    expect(textarea).not.toBeNull()
    expect(document.activeElement).toBe(textarea)
  })
})

describe('Dashboard — regelverk-faner i steg 1', () => {
  it('viser egen fane for "Virksomhetens etiske retningslinjer"', () => {
    setupWithCase()
    render(<Dashboard />)
    expect(screen.getByText('Virksomhetens etiske retningslinjer')).toBeTruthy()
  })
})

describe('Dashboard — responsiv layout', () => {
  it('steg 1 bruker responsive grid-klasse', () => {
    setupWithCase()
    const { container } = render(<Dashboard />)
    const grid = container.querySelector('.dashboard-grid')
    expect(grid).toBeTruthy()
  })

  it('steg 2 bruker responsive grid-klasse med sidebar', () => {
    setupWithCase()
    act(() => {
      useAppStore.setState({
        isAssumptionsConfirmed: true,
        currentStep: 2,
        userBlindTestAnswer: 'utforskende_støtte',
      })
    })
    const { container } = render(<Dashboard />)
    const grid = container.querySelector('.dashboard-grid-sidebar')
    expect(grid).toBeTruthy()
  })

  it('header bruker responsive flex-wrap', () => {
    const { container } = render(<Dashboard />)
    const header = container.querySelector('.dashboard-header')
    expect(header).toBeTruthy()
  })
})
