import type { ResearchFinding } from '../domain/researchSchemas'
import { buildResearchDiagnosisContext } from '../research/researchRepository'

export type ResearchBackedDiagnosis = {
  caseId: string
  preliminaryLabel: 'Forelopig KI-diagnose'
  sourceAnchoredClaims: string[]
  stopRulesBeforeRole: string[]
  localVerificationRequired: string[]
  automationConclusionAllowed: false
}

export function buildResearchBackedDiagnosis(caseId: string, findings: ResearchFinding[]): ResearchBackedDiagnosis {
  const context = buildResearchDiagnosisContext(findings, caseId)

  return {
    caseId,
    preliminaryLabel: 'Forelopig KI-diagnose',
    sourceAnchoredClaims: context.approvedFindings.map(finding => finding.claim),
    stopRulesBeforeRole: context.stopRuleTriggers,
    localVerificationRequired: context.requiredLocalVerification,
    automationConclusionAllowed: false,
  }
}
