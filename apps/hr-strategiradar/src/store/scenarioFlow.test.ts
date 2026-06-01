import { act } from '@testing-library/react'
import { describe, expect, it, afterEach } from 'vitest'
import { useAppStore } from './store'
import { getDiagnosisData } from '../services/mockDiagnosisService'

function setupActiveCase(caseId = 'HRR-01') {
  const data = getDiagnosisData(caseId)
  expect(data).not.toBeNull()
  if (!data) throw new Error(`Missing fixture for ${caseId}`)

  act(() => {
    useAppStore.getState().reset()
    useAppStore.getState().setSelectedCaseId(data.project.caseId)
    useAppStore.getState().setActiveData(data.project, data.task, { x: 0.5, y: 0.5 })
  })

  return data
}

describe('HR-Radar: Scenario and ROS Information Flow Test (AGENTS.md)', () => {
  afterEach(() => {
    act(() => {
      useAppStore.getState().reset()
    })
  })

  it('loads default scenarios on case selection and maintains layer separation', () => {
    setupActiveCase('HRR-01')
    const state = useAppStore.getState()

    // 1. Verify scenarios are loaded for the active case
    const caseScenarios = state.scenarios['HRR-01']
    expect(caseScenarios).toBeDefined()
    expect(caseScenarios.length).toBeGreaterThan(0)

    // 2. Verify specific schema structure of loaded scenarios
    const firstScenario = caseScenarios[0]
    expect(firstScenario.temaKey).toBeDefined()
    expect(firstScenario.simulertHendelse).toContain('Hvis dette blir utfallet:')
    expect(firstScenario.bekymringsniva).toBeDefined()

    // 3. Verify they are kept separate from the compass scores (layer separation)
    expect(state.activeTask?.expectedModuleScores).toBeDefined()
  })

  it('updates scenario fields correctly in the store state', () => {
    setupActiveCase('HRR-01')

    // Modify a scenario field
    act(() => {
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'arbeid_rettigheter',
        'simulertHendelse',
        'Hvis dette blir utfallet: Endret testhendelse'
      )
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'arbeid_rettigheter',
        'bekymringsniva',
        'høy'
      )
    })

    const updatedState = useAppStore.getState()
    const targetScenario = updatedState.scenarios['HRR-01'].find(s => s.temaKey === 'arbeid_rettigheter')

    expect(targetScenario).toBeDefined()
    expect(targetScenario?.simulertHendelse).toBe('Hvis dette blir utfallet: Endret testhendelse')
    expect(targetScenario?.bekymringsniva).toBe('høy')
  })

  it('does NOT affect compass position or allowed role when scenario concern level is toggled (no automated judgment)', () => {
    setupActiveCase('HRR-01')

    const stateBefore = useAppStore.getState()
    const compassBefore = stateBefore.compassPosition
    const roleBefore = stateBefore.activeTask?.expectedAllowedRole

    // Toggle concern level from default (middels) to høy
    act(() => {
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'relasjonell_tillit',
        'bekymringsniva',
        'høy'
      )
    })

    const stateAfter = useAppStore.getState()
    const compassAfter = stateAfter.compassPosition
    const roleAfter = stateAfter.activeTask?.expectedAllowedRole

    // Assert that the compass position and role remain completely identical (isolated layers!)
    expect(compassAfter).toEqual(compassBefore)
    expect(roleAfter).toBe(roleBefore)
  })

  it('integrates active scenarios into the generated decision log during autofill', () => {
    setupActiveCase('HRR-01')

    // Pre-edit a specific scenario local verification and owner
    act(() => {
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'personvern_system',
        'simulertHendelse',
        'Hvis dette blir utfallet: Personvernlekkasje simulert'
      )
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'personvern_system',
        'lokalVerifikasjon',
        'Manuelt sjekke alle logger'
      )
      useAppStore.getState().updateScenarioField(
        'HRR-01',
        'personvern_system',
        'ansvarligEier',
        'Sikkerhetssjef'
      )
    })

    // Trigger simplify / autofill
    act(() => {
      useAppStore.getState().simplifyDecisionLog()
    })

    const state = useAppStore.getState()
    const logText = state.decisionLogText.internkontrollTiltak

    // Verify that the scenarios and their ROS fields are woven into the internal control measures text
    expect(logText).toContain('LOKALE SCENARIER (ROS):')
    expect(logText).toContain('Hvis dette blir utfallet (Personvern og system): Hvis dette blir utfallet: Personvernlekkasje simulert')
    expect(logText).toContain('Verifikasjon: Manuelt sjekke alle logger')
    expect(logText).toContain('Ansvarlig: Sikkerhetssjef')
  })
})
