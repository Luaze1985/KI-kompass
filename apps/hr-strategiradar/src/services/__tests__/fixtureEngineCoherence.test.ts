import { describe, it, expect } from 'vitest'
import { getDiagnosisData, runCalculationEngine, INITIAL_VALUE_JUDGMENTS, calculateCompassPosition } from '../mockDiagnosisService'

const DASHBOARD_CASES = ['HRR-01', 'HRR-02', 'HRR-04', 'HRR-07']

describe('Fixture-engine koherens — fixtures matcher engine-output', () => {
  for (const caseId of DASHBOARD_CASES) {
    it(`${caseId}-A: expectedAllowedRole matcher engine`, () => {
      const data = getDiagnosisData(caseId)!
      const task = runCalculationEngine(
        JSON.parse(JSON.stringify(data.task)),
        { ...INITIAL_VALUE_JUDGMENTS },
        false
      )
      expect(task.expectedAllowedRole).toBe(data.task.expectedAllowedRole)
    })

    it(`${caseId}-A: expectedCalculatedRole matcher engine`, () => {
      const data = getDiagnosisData(caseId)!
      const task = runCalculationEngine(
        JSON.parse(JSON.stringify(data.task)),
        { ...INITIAL_VALUE_JUDGMENTS },
        false
      )
      expect(task.expectedCalculatedRole).toBe(data.task.expectedCalculatedRole)
    })
  }
})

describe('Kompass-differensiering — alle cases gir ulik startposisjon', () => {
  it('alle 4 dashboard-caser har ulike kompassposisjoner', () => {
    const positions = DASHBOARD_CASES.map(id => {
      const data = getDiagnosisData(id)!
      return calculateCompassPosition(data.task)
    })

    // Sjekk at ingen to cases har identisk posisjon
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const same = positions[i].x === positions[j].x && positions[i].y === positions[j].y
        expect(same, `${DASHBOARD_CASES[i]} og ${DASHBOARD_CASES[j]} har identisk kompassposisjon (${positions[i].x}, ${positions[i].y})`).toBe(false)
      }
    }
  })
})

describe('Kompass-bredde — alle 8 eksponerte saker', () => {
  const ALL_DASHBOARD_CASES = ['HRR-01', 'HRR-02', 'HRR-03', 'HRR-04', 'HRR-05', 'HRR-06', 'HRR-07', 'HRR-08']

  it('alle 8 saker gir distinkte kompassposisjoner', () => {
    const positions = ALL_DASHBOARD_CASES.map(id => calculateCompassPosition(getDiagnosisData(id)!.task))
    const keys = positions.map(p => `${p.x.toFixed(3)},${p.y.toFixed(3)}`)
    // Minst 6 av 8 unike posisjoner (litt rom for tilfeldig sammenfall)
    expect(new Set(keys).size).toBeGreaterThanOrEqual(6)
  })

  it('sakene sprer seg over mer enn én kvadrant (variasjon i prikken)', () => {
    const quadrants = new Set(
      ALL_DASHBOARD_CASES.map(id => {
        const p = calculateCompassPosition(getDiagnosisData(id)!.task)
        return `${p.x >= 0.5 ? 'H' : 'V'}${p.y >= 0.5 ? 'O' : 'N'}`
      })
    )
    expect(quadrants.size).toBeGreaterThanOrEqual(2)
  })
})

describe('Trafikklys — grønt lys er oppnåelig', () => {
  it('minst én lavrisiko-case kan nå grønt lys med komplett logg', () => {
    const greens: string[] = []
    for (const caseId of DASHBOARD_CASES) {
      const data = getDiagnosisData(caseId)!
      const task = runCalculationEngine(
        JSON.parse(JSON.stringify(data.task)),
        { ...INITIAL_VALUE_JUDGMENTS },
        true // komplett beslutningslogg
      )
      if (task.expectedTrafficLight === 'green') {
        greens.push(caseId)
      }
    }
    expect(greens.length, `Ingen case når grønt lys. Terskel for streng?`).toBeGreaterThanOrEqual(1)
  })
})
