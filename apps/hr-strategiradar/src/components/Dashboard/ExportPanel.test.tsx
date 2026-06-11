import { act, fireEvent, render, screen } from '@testing-library/react'
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
    expect(screen.getByRole('button', { name: /tekstfil/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /datafil/i })).toBeTruthy()
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
    expect(screen.queryByRole('button', { name: /tekstfil/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /datafil/i })).toBeNull()
  })

  it('viser advarsel når ingen scenarioer har innhold', () => {
    setupStore()
    act(() => {
      useAppStore.setState({ scenarios: { 'HRR-01': [] } })
    })
    render(<ExportPanel />)
    expect(screen.getAllByText(/ingen risikoer er beskrevet/i).length).toBeGreaterThanOrEqual(1)
  })

  it('viser "Gå tilbake til steg 3"-knapp i advarselen og navigerer til steg 3', () => {
    setupStore()
    act(() => {
      useAppStore.setState({ scenarios: { 'HRR-01': [] }, currentStep: 4 })
    })
    render(<ExportPanel />)
    const backBtn = screen.getByRole('button', { name: /tilbake til steg 3/i })
    expect(backBtn).toBeTruthy()
    fireEvent.click(backBtn)
    expect(useAppStore.getState().currentStep).toBe(3)
  })

  it('skjuler advarsel når scenarioer har innhold', () => {
    setupStore()
    act(() => {
      useAppStore.setState({
        scenarios: {
          'HRR-01': [{
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
          }],
        },
      })
    })
    render(<ExportPanel />)
    expect(screen.queryByText(/ingen risikoer er beskrevet/i)).toBeNull()
  })
})
