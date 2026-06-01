import { describe, it, expect } from 'vitest'
import { HrMicroprojectSchema } from '../schemas'
import { allCases } from '../../fixtures/all-cases'

describe('All 8 HRR fixtures validate against schema', () => {
  it('has exactly 8 cases', () => {
    expect(allCases).toHaveLength(8)
  })

  allCases.forEach((fixture) => {
    describe(`${fixture.caseId}: ${fixture.title}`, () => {
      it('validates against HrMicroprojectSchema', () => {
        const result = HrMicroprojectSchema.safeParse(fixture)
        if (!result.success) {
          console.error(fixture.caseId, result.error.format())
        }
        expect(result.success).toBe(true)
      })

      it('has at least two AI use tasks', () => {
        expect(fixture.aiUseTasks.length).toBeGreaterThanOrEqual(2)
      })

      it('has no personal data in fixture content', () => {
        const json = JSON.stringify(fixture)
        // Should not contain typical personal identifiers
        expect(json).not.toMatch(/\d{11}/) // Norwegian fødselsnummer
        expect(json).not.toMatch(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) // email
      })

      it('has justified scores for every module', () => {
        for (const task of fixture.aiUseTasks) {
          const scores = task.expectedModuleScores
          expect(scores.målklarhet.justification.length).toBeGreaterThan(5)
          expect(scores.separabilitet.justification.length).toBeGreaterThan(5)
          expect(scores.forklarbarhet.justification.length).toBeGreaterThan(5)
          expect(scores.antiOverreliance.justification.length).toBeGreaterThan(5)
        }
      })

      it('has separabilitet justification marked as value judgment', () => {
        for (const task of fixture.aiUseTasks) {
          expect(task.expectedModuleScores.separabilitet.justification.toLowerCase()).toMatch(
            /verdivalg|skjønn|lokal|tillit|relasjon/
          )
        }
      })
    })
  })
})
