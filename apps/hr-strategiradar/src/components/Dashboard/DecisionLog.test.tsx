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

    expect(screen.getByText('ROS og risikoreduserende tiltak')).toBeInTheDocument()
    expect(screen.getByText('54% utfylt')).toBeInTheDocument()
    expect(screen.getByLabelText('Lås vurderingen i denne økten')).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Autofyll' }))
    expect((screen.getByLabelText('Risikoreduserende tiltak') as HTMLTextAreaElement).value).toContain('personvernkonsekvensvurdering')

    fireEvent.click(screen.getByLabelText('Signer gjennomgått foreløpig notat'))
    fireEvent.change(screen.getByLabelText('Makker som har lest notatet'), {
      target: { value: 'Kari Kontroll' },
    })
    expect(screen.getByLabelText('Lås vurderingen i denne økten')).not.toBeDisabled()

    fireEvent.click(screen.getByLabelText('Lås vurderingen i denne økten'))

    expect(screen.getByRole('button', { name: 'Autofyll' })).toBeDisabled()
    expect(screen.getByLabelText('Risikovurdering')).toBeDisabled()
    expect(screen.getByLabelText('Menneskelig kontroll')).toBeDisabled()
    expect(screen.getByLabelText('Foreløpig vurdering og ansvar')).toBeDisabled()
    expect(screen.getByLabelText('Risikoreduserende tiltak')).toBeDisabled()
    expect(screen.getByLabelText('Makker som har lest notatet')).toBeDisabled()
  })
})
