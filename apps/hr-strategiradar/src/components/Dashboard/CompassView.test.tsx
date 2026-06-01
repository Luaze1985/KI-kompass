import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { calculateCompassPosition, getDiagnosisData } from '../../services/mockDiagnosisService'
import { useAppStore } from '../../store/store'
import CompassView from './CompassView'

function renderCompassWithStopRules() {
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
        expectedStopRules: ['SR-05', 'SR-08'],
        expectedAllowedRole: 'utforskende_støtte',
        expectedTrafficLight: 'red',
      },
      compassPosition: calculateCompassPosition(data.task),
    })
  })

  return render(<CompassView />)
}

describe('CompassView language and order', () => {
  afterEach(() => {
    act(() => {
      useAppStore.getState().reset()
    })
  })

  it('shows stop conditions before allowed AI use without rule codes', () => {
    const { container } = renderCompassWithStopRules()

    expect(screen.getByRole('heading', { name: 'KI-Kompass' })).toBeInTheDocument()
    expect(screen.getByText('Stoppregler utløst:')).toBeInTheDocument()
    expect(screen.getByText('Foreløpig tillatt KI-bruk etter avklaringer:')).toBeInTheDocument()

    const text = container.textContent || ''
    expect(text.indexOf('Stoppregler utløst')).toBeLessThan(text.indexOf('Foreløpig tillatt KI-bruk etter avklaringer'))
    expect(text).not.toMatch(/SR-\d+/)
    expect(text).not.toContain('Sikkerhetskompass')
    expect(text).not.toContain('Tillatt KI-rolle')
  })
})
