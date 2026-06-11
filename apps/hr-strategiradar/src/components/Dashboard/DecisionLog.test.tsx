import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { calculateCompassPosition, getDiagnosisData } from '../../services/mockDiagnosisService'
import { useAppStore } from '../../store/store'
import DecisionLog from './DecisionLog'

function renderDecisionLog() {
  const data = getDiagnosisData('HRR-01')
  expect(data).not.toBeNull()
  if (!data) throw new Error('Missing fixture for HRR-01')

  act(() => {
    useAppStore.getState().reset()
    useAppStore.setState({
      selectedCaseId: data.project.caseId,
      activeProject: data.project,
      activeTask: {
        ...data.task,
        expectedTrafficLight: 'red',
        expectedComplianceScore: 54,
        expectedStopRules: ['SR-05', 'SR-08'],
      },
      compassPosition: calculateCompassPosition(data.task),
      isDecisionLogComplete: true,
      decisionLogText: {
        risikovurdering: 'Risiko er vurdert.',
        menneskeligKontroll: 'Kontroll er vurdert.',
        endeligBeslutning: 'Beslutning er vurdert.',
        internkontrollTiltak: '',
      },
    })
  })

  render(<DecisionLog />)
}

describe('DecisionLog Step 3 and maker-check', () => {
  afterEach(() => {
    act(() => {
      useAppStore.getState().reset()
    })
  })

  it('prefills Step 3 measures and locks fields after maker-check', () => {
    renderDecisionLog()

    expect(screen.getByRole('heading', { name: 'Risikoreduserende tiltak' })).toBeInTheDocument()
    expect(screen.getByText('54% utfylt')).toBeInTheDocument()
    expect(screen.getByLabelText('Lås vurderingen')).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Fyll inn automatisk' }))
    expect((screen.getByLabelText('Risikoreduserende tiltak') as HTMLTextAreaElement).value).toContain('personvernvurdering')

    fireEvent.click(screen.getByLabelText('Signer at notatet er gjennomgått'))
    fireEvent.change(screen.getByLabelText('Kollega som har lest notatet'), {
      target: { value: 'Kari Kontroll' },
    })
    expect(screen.getByLabelText('Lås vurderingen')).not.toBeDisabled()

    fireEvent.click(screen.getByLabelText('Lås vurderingen'))

    expect(screen.getByRole('button', { name: 'Fyll inn automatisk' })).toBeDisabled()
    expect(screen.getByLabelText('Risikovurdering')).toBeDisabled()
    expect(screen.getByLabelText('Menneskelig kontroll')).toBeDisabled()
    expect(screen.getByLabelText('Foreløpig vurdering og ansvar')).toBeDisabled()
    expect(screen.getByLabelText('Risikoreduserende tiltak')).toBeDisabled()
    expect(screen.getByLabelText('Kollega som har lest notatet')).toBeDisabled()
  })
})

describe('DecisionLog — lås er endelig (AC2)', () => {
  afterEach(() => {
    act(() => { useAppStore.getState().reset() })
  })

  it('viser lås-checkboxen som avhuket og deaktivert når vurderingen er låst', () => {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture for HRR-01')
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: { ...data.task, expectedStopRules: ['SR-08'], expectedTrafficLight: 'red' },
        compassPosition: calculateCompassPosition(data.task),
        isDecisionLogComplete: true,
        decisionLogText: {
          risikovurdering: 'Vurdert.',
          menneskeligKontroll: 'Kontroll.',
          endeligBeslutning: 'Beslutning.',
          internkontrollTiltak: 'Tiltak.',
        },
        isSigned: true,
        makerName: 'Kari Kontroll',
        isMakerChecked: true,
      })
    })
    render(<DecisionLog />)
    const lock = screen.getByLabelText('Lås vurderingen') as HTMLInputElement
    expect(lock.checked).toBe(true)
    expect(lock).toBeDisabled()
  })
})

describe('DecisionLog — låsing krever alle påkrevde felt (Syklus 1.3 regresjon)', () => {
  afterEach(() => {
    act(() => { useAppStore.getState().reset() })
  })

  function setupHighRisk() {
    const data = getDiagnosisData('HRR-01')
    if (!data) throw new Error('Missing fixture for HRR-01')
    act(() => {
      useAppStore.getState().reset()
      useAppStore.setState({
        selectedCaseId: data.project.caseId,
        activeProject: data.project,
        activeTask: { ...data.task, expectedStopRules: ['SR-08'], expectedTrafficLight: 'red' },
        compassPosition: calculateCompassPosition(data.task),
        valueJudgments: {
          relationalTrustImportant: true,
          humanPresencePartOfValue: false,
          localExceptionsMatter: true,
          valueConflictPresent: false,
          errorReversible: false,
          rightsOrWorkImpact: true,
          sensitiveOrPersonalDataRisk: false,
        },
        decisionLogText: {
          risikovurdering: 'Vurdert.',
          menneskeligKontroll: 'Kontroll.',
          endeligBeslutning: 'Beslutning.',
          internkontrollTiltak: 'Tiltak.',
        },
        isDecisionLogComplete: true,
      })
    })
  }

  it('deaktiverer signering når et påkrevd felt er tomt, og aktiverer når alle er fylt', () => {
    setupHighRisk()
    render(<DecisionLog />)

    // Tøm ett påkrevd felt via store-action (rekalkulerer isDecisionLogReady)
    act(() => { useAppStore.getState().updateDecisionLogField('risikovurdering', '') })
    expect(screen.getByLabelText('Signer at notatet er gjennomgått')).toBeDisabled()

    // Fyll det igjen → signering blir mulig
    act(() => { useAppStore.getState().updateDecisionLogField('risikovurdering', 'Vurdert igjen.') })
    expect(screen.getByLabelText('Signer at notatet er gjennomgått')).not.toBeDisabled()
  })
})
