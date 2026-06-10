import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { getDiagnosisData, calculateCompassPosition } from '../../services/mockDiagnosisService'
import { useAppStore } from '../../store/store'
import ExportPanel from './ExportPanel'

function setupStore() {
  const data = getDiagnosisData('HRR-01')
  if (!data) throw new Error('Missing fixture for HRR-01')

  act(() => {
    useAppStore.getState().reset()
    useAppStore.setState({
      selectedCaseId: data.project.caseId,
      activeProject: data.project,
      activeTask: {
        ...data.task,
        expectedStopRules: ['SR-01', 'SR-02'],
        expectedCalculatedRole: 'forsterket_skjønn',
        expectedAllowedRole: 'utforskende_støtte',
        expectedTrafficLight: 'red',
      },
      compassPosition: calculateCompassPosition(data.task),
      isDecisionLogComplete: true,
      decisionLogText: {
        risikovurdering: 'Kun anonyme data.',
        menneskeligKontroll: 'Leder drøfter.',
        endeligBeslutning: 'KI brukes kun som sparring.',
        internkontrollTiltak: '',
      },
      valueJudgments: {
        relationalTrustImportant: true,
        humanPresencePartOfValue: false,
        localExceptionsMatter: true,
        valueConflictPresent: false,
        errorReversible: false,
        rightsOrWorkImpact: true,
        sensitiveOrPersonalDataRisk: false,
      },
    })
  })
}

afterEach(() => {
  act(() => { useAppStore.getState().reset() })
})

describe('ExportPanel — nedlasting av beslutningsnotat', () => {
  it('viser nedlastingsknapper for Markdown og JSON', () => {
    setupStore()
    render(<ExportPanel />)
    expect(screen.getByRole('button', { name: /markdown/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /json/i })).toBeTruthy()
  })

  it('viser utkast-advarsel', () => {
    setupStore()
    render(<ExportPanel />)
    const warnings = screen.getAllByText(/utkast/i)
    expect(warnings.length).toBeGreaterThanOrEqual(1)
  })

  it('viser ikke eksportknapper når data mangler', () => {
    act(() => { useAppStore.getState().reset() })
    render(<ExportPanel />)
    expect(screen.queryByRole('button', { name: /markdown/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /json/i })).toBeNull()
  })
})
