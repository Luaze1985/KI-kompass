import type { ResearchFinding } from '../domain/researchSchemas'

export type ResearchDiagnosisContext = {
  caseId: string
  approvedFindings: ResearchFinding[]
  stopRuleTriggers: string[]
  riskFlags: string[]
  requiredLocalVerification: string[]
}

export function getApprovedFindingsForCase(findings: ResearchFinding[], caseId: string): ResearchFinding[] {
  return findings.filter(
    finding =>
      finding.review_status === 'approved' &&
      finding.relevant_case_field.some(field => field.toLowerCase() === caseId.toLowerCase()),
  )
}

export function buildResearchDiagnosisContext(findings: ResearchFinding[], caseId: string): ResearchDiagnosisContext {
  const approvedFindings = getApprovedFindingsForCase(findings, caseId)

  return {
    caseId,
    approvedFindings,
    stopRuleTriggers: uniqueFlatMap(approvedFindings, finding => finding.possible_stop_rule),
    riskFlags: uniqueFlatMap(approvedFindings, finding => finding.possible_risk_flag),
    requiredLocalVerification: uniqueFlatMap(approvedFindings, finding => finding.required_local_verification),
  }
}

function uniqueFlatMap<T>(items: ResearchFinding[], selector: (finding: ResearchFinding) => T[]): T[] {
  return Array.from(new Set(items.flatMap(selector)))
}
