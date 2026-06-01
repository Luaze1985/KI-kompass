import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ResearchFindingListSchema, ResearchSourceListSchema } from '../../domain/researchSchemas'
import { buildResearchDiagnosisContext } from '../../research/researchRepository'
import { buildResearchBackedDiagnosis } from '../researchDiagnosisService'

function readResearchJson(fileName: string): unknown {
  return JSON.parse(readFileSync(resolve(process.cwd(), '..', '..', 'data', 'research', fileName), 'utf8'))
}

describe('langvakter research dataset', () => {
  it('validates canonical source and finding files', () => {
    expect(ResearchSourceListSchema.safeParse(readResearchJson('langvakter_sources.json')).success).toBe(true)
    expect(ResearchFindingListSchema.safeParse(readResearchJson('langvakter_findings.json')).success).toBe(true)
  })

  it('validates API draft findings but keeps them out of approved diagnosis', () => {
    const draftFindings = ResearchFindingListSchema.parse(readResearchJson('langvakter_findings.api-draft.json'))
    const draftContext = buildResearchDiagnosisContext(draftFindings, 'HRR-07')

    expect(draftFindings.length).toBeGreaterThan(0)
    expect(draftFindings.every(finding => finding.review_status === 'draft')).toBe(true)
    expect(draftContext.approvedFindings).toHaveLength(0)
  })

  it('does not let draft findings into diagnosis context', () => {
    const findings = ResearchFindingListSchema.parse(readResearchJson('langvakter_findings.json'))
    const context = buildResearchDiagnosisContext(findings, 'HRR-07')

    expect(findings.some(finding => finding.review_status === 'draft')).toBe(true)
    expect(context.approvedFindings.length).toBeGreaterThan(0)
    expect(context.approvedFindings.every(finding => finding.review_status === 'approved')).toBe(true)
    expect(context.riskFlags).not.toContain('draftShouldNotBeUsed')
  })

  it('keeps stop rules before KI role and blocks automation conclusions', () => {
    const findings = ResearchFindingListSchema.parse(readResearchJson('langvakter_findings.json'))
    const diagnosis = buildResearchBackedDiagnosis('HRR-07', findings)

    expect(diagnosis.preliminaryLabel).toBe('Forelopig KI-diagnose')
    expect(diagnosis.stopRulesBeforeRole.length).toBeGreaterThan(0)
    expect(diagnosis.stopRulesBeforeRole).toContain('SR-05')
    expect(diagnosis.automationConclusionAllowed).toBe(false)
    expect(diagnosis.localVerificationRequired.length).toBeGreaterThan(0)
  })
})
