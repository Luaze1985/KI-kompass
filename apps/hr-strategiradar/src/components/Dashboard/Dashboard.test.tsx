import { act, render, screen } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { useAppStore } from '../../store/store'
import { getDiagnosisData, calculateCompassPosition } from '../../services/mockDiagnosisService'
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
