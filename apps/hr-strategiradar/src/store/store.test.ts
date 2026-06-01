import { act } from '@testing-library/react'
import { describe, expect, it, afterEach } from 'vitest'
import { calculateCompassPosition, getDiagnosisData } from '../services/mockDiagnosisService'
import { useAppStore } from './store'

function setupActiveCase(caseId = 'HRR-01') {
  const data = getDiagnosisData(caseId)
  expect(data).not.toBeNull()
  if (!data) throw new Error(`Missing fixture for ${caseId}`)

  act(() => {
    useAppStore.getState().reset()
    useAppStore.getState().setSelectedCaseId(data.project.caseId)
    useAppStore.getState().setActiveData(data.project, data.task, calculateCompassPosition(data.task))
  })

  return data
}

describe('maker-check revision lock', () => {
  afterEach(() => {
    act(() => {
      useAppStore.getState().reset()
    })
  })

  it('requires primary signing and maker name before locking', () => {
    setupActiveCase()

    act(() => {
      useAppStore.getState().setMakerChecked(true)
    })
    expect(useAppStore.getState().isMakerChecked).toBe(false)

    act(() => {
      useAppStore.setState({ isSigned: true, makerName: '   ' })
      useAppStore.getState().setMakerChecked(true)
    })
    expect(useAppStore.getState().isMakerChecked).toBe(false)

    act(() => {
      useAppStore.getState().setMakerName('Kari Kontroll')
      useAppStore.getState().setMakerChecked(true)
    })
    expect(useAppStore.getState().isMakerChecked).toBe(true)
  })

  it('prevents mutating actions after maker-check lock', () => {
    const data = setupActiveCase()
    const otherData = getDiagnosisData('HRR-02')
    expect(otherData).not.toBeNull()
    if (!otherData) throw new Error('Missing fixture for HRR-02')

    act(() => {
      useAppStore.setState({
        isDecisionLogComplete: true,
        decisionLogText: {
          risikovurdering: 'Risiko er vurdert.',
          menneskeligKontroll: 'Kontroll er vurdert.',
          endeligBeslutning: 'Beslutning er vurdert.',
          internkontrollTiltak: 'Tiltak er vurdert.',
        },
        isSigned: true,
        makerName: 'Kari Kontroll',
      })
      useAppStore.getState().setMakerChecked(true)
    })

    const before = useAppStore.getState()
    expect(before.isMakerChecked).toBe(true)

    act(() => {
      const state = useAppStore.getState()
      state.setCalculationModel('linear')
      state.setCheckpointAnswer(0, 'yes')
      state.updateDecisionLogField('endeligBeslutning', 'Endret etter lås.')
      state.simplifyDecisionLog()
      state.signDocument(false)
      state.setMakerName('Ny makker')
      state.setSelectedCaseId('HRR-02')
      state.setActiveData(
        otherData.project,
        otherData.task,
        calculateCompassPosition(otherData.task)
      )
      state.setMakerChecked(false)
    })

    const after = useAppStore.getState()
    expect(after.selectedCaseId).toBe(data.project.caseId)
    expect(after.activeTask?.taskId).toBe(data.task.taskId)
    expect(after.calculationModel).toBe('gmm')
    expect(after.checkpointAnswers).toEqual({})
    expect(after.decisionLogText.endeligBeslutning).toBe('Beslutning er vurdert.')
    expect(after.isSigned).toBe(true)
    expect(after.makerName).toBe('Kari Kontroll')
    expect(after.isMakerChecked).toBe(true)
  })

  it('manages userBlindTestAnswer state and respects maker-check lock', () => {
    setupActiveCase()
    const store = useAppStore.getState()

    // 1. Initial value is null
    expect(store.userBlindTestAnswer).toBeNull()

    // 2. Can set blindtest answer
    act(() => {
      useAppStore.getState().setUserBlindTestAnswer('forsterket_skjønn')
    })
    expect(useAppStore.getState().userBlindTestAnswer).toBe('forsterket_skjønn')

    // 3. Reset resets it to null
    act(() => {
      useAppStore.getState().reset()
    })
    expect(useAppStore.getState().userBlindTestAnswer).toBeNull()

    // 4. Test lock prevention
    setupActiveCase()
    act(() => {
      useAppStore.getState().setUserBlindTestAnswer('strategisk_autonomi')
      useAppStore.setState({
        isDecisionLogComplete: true,
        decisionLogText: {
          risikovurdering: 'Risiko er vurdert.',
          menneskeligKontroll: 'Kontroll er vurdert.',
          endeligBeslutning: 'Beslutning er vurdert.',
          internkontrollTiltak: 'Tiltak er vurdert.',
        },
        isSigned: true,
        makerName: 'Kari Kontroll',
      })
      useAppStore.getState().setMakerChecked(true)
    })

    expect(useAppStore.getState().isMakerChecked).toBe(true)

    // Attempting to change blindtest answer when locked should be blocked
    act(() => {
      useAppStore.getState().setUserBlindTestAnswer('utforskende_støtte')
    })
    expect(useAppStore.getState().userBlindTestAnswer).toBe('strategisk_autonomi')
  })
})
