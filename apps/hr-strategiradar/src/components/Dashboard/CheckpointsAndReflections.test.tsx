import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { getDiagnosisData } from '../../services/mockDiagnosisService'
import { useAppStore } from '../../store/store'
import CheckpointsAndReflections from './CheckpointsAndReflections'

function setup() {
  const data = getDiagnosisData('HRR-01')
  if (!data) throw new Error('Missing fixture for HRR-01')
  act(() => {
    useAppStore.getState().reset()
    useAppStore.setState({
      selectedCaseId: data.project.caseId,
      activeProject: data.project,
      activeTask: data.task,
    })
  })
}

afterEach(() => {
  act(() => { useAppStore.getState().reset() })
})

describe('CheckpointsAndReflections — aria-pressed på Felles vurdering (Syklus 2.1)', () => {
  it('reflekterer valgt verdi via aria-pressed', () => {
    setup()
    render(<CheckpointsAndReflections />)

    const ja = screen.getByRole('button', { name: 'Påvirker ansattes rettigheter? Ja' })
    const nei = screen.getByRole('button', { name: 'Påvirker ansattes rettigheter? Nei' })

    fireEvent.click(ja)

    expect(ja).toHaveAttribute('aria-pressed', 'true')
    expect(nei).toHaveAttribute('aria-pressed', 'false')
  })
})
