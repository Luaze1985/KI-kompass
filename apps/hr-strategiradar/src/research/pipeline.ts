import {
  ResearchFindingSchema,
  type ResearchFinding,
  type ResearchIndicator,
  type ResearchSourceType,
} from '../domain/researchSchemas'
import { langvakterQueryPack, type ResearchQuery } from './queryPack'
import type { SonarProvider } from './sonarAdapter'

type RawFinding = {
  source_type?: string
  title?: string
  url?: unknown
  published_date?: unknown
  claim?: string
  evidence_strength?: unknown
  relevant_case_field?: unknown
  affected_indicator?: unknown
  possible_risk_flag?: unknown
  possible_stop_rule?: unknown
  required_local_verification?: unknown
  short_excerpt?: unknown
}

export type ResearchImportResult =
  | {
      status: 'missing_api_key'
      checked: string[]
      findings: []
      errors: []
    }
  | {
      status: 'completed'
      findings: ResearchFinding[]
      errors: string[]
    }

export function buildResearchPrompt(query: ResearchQuery, policyText?: string): string {
  const lines = [
    `Tema: ${query.topic}`,
    `Sok: ${query.query}`,
    `Prioriter kildetyper: ${query.preferredSourceTypes.join(', ')}`,
    '',
    ...(policyText
      ? [
          'Prosjektspesifikt presisjonsfilter:',
          policyText,
          '',
        ]
      : []),
    'Returner en JSON-array. Hvert element skal ha feltene source_type, title, url, published_date, claim, evidence_strength, possible_risk_flag, possible_stop_rule, required_local_verification og short_excerpt.',
    'Bruk bare kildeankrede funn som passer presisjonsfilteret. Ikke konkluder med automatisering.',
  ]

  return lines.join('\n')
}

// Case-agnostisk import: kjorer en vilkarlig query-pakke mot Sonar-provideren.
export async function runResearchImport(options: {
  provider?: SonarProvider
  queryPack: ResearchQuery[]
  missingApiKey?: { checked: string[] }
  retrievedAt: string
  policyText?: string
}): Promise<ResearchImportResult> {
  if (!options.provider) {
    return {
      status: 'missing_api_key',
      checked: options.missingApiKey?.checked ?? ['PPLX_API_KEY', 'SONAR_API_KEY', 'PERPLEXITY_API_KEY'],
      findings: [],
      errors: [],
    }
  }

  const findings: ResearchFinding[] = []
  const errors: string[] = []
  const queryPack = options.queryPack

  for (const query of queryPack) {
    try {
      const response = await options.provider.search(query.queryId, buildResearchPrompt(query, options.policyText))
      const rawFindings = parseRawFindingArray(response.content)
      rawFindings.forEach((raw, index) => {
        findings.push(normalizeRawFinding(raw, query, index, options.retrievedAt))
      })
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `Unknown import error for ${query.queryId}`)
    }
  }

  return {
    status: 'completed',
    findings: dedupeFindings(findings),
    errors,
  }
}

// Bakoverkompatibel innpakning for HRR-07 (langvakter).
export async function runLangvakterResearchImport(options: {
  provider?: SonarProvider
  missingApiKey?: { checked: string[] }
  retrievedAt: string
  queryPack?: ResearchQuery[]
  policyText?: string
}): Promise<ResearchImportResult> {
  if (!options.provider) {
    return {
      status: 'missing_api_key',
      checked: options.missingApiKey?.checked ?? ['PPLX_API_KEY', 'SONAR_API_KEY', 'PERPLEXITY_API_KEY'],
      findings: [],
      errors: [],
    }
  }

  const findings: ResearchFinding[] = []
  const errors: string[] = []
  const queryPack = options.queryPack ?? langvakterQueryPack

  for (const query of queryPack) {
    try {
      const response = await options.provider.search(query.queryId, buildResearchPrompt(query, options.policyText))
      const rawFindings = parseRawFindingArray(response.content)
      rawFindings.forEach((raw, index) => {
        findings.push(normalizeRawFinding(raw, query, index, options.retrievedAt))
      })
    } catch (error) {
      errors.push(error instanceof Error ? error.message : `Unknown import error for ${query.queryId}`)
    }
  }

  return {
    status: 'completed',
    findings: dedupeFindings(findings),
    errors,
  }
}

export function parseRawFindingArray(content: string): RawFinding[] {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim()

  const jsonStart = cleaned.indexOf('[')
  const jsonEnd = cleaned.lastIndexOf(']')
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
    throw new Error('Sonar response did not contain a JSON array')
  }

  const parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1)) as unknown
  if (!Array.isArray(parsed)) {
    throw new Error('Sonar response JSON was not an array')
  }

  return parsed as RawFinding[]
}

export function normalizeRawFinding(
  raw: RawFinding,
  query: ResearchQuery,
  index: number,
  retrievedAt: string,
): ResearchFinding {
  const sourceType = normalizeSourceType(raw.source_type, query.preferredSourceTypes[0] ?? 'secondary')
  const url = typeof raw.url === 'string' && raw.url.startsWith('http') ? raw.url : `https://example.invalid/${query.queryId}/${index}`
  const publishedDate = typeof raw.published_date === 'string' && raw.published_date.trim() ? raw.published_date : undefined
  const shortExcerpt = typeof raw.short_excerpt === 'string' && raw.short_excerpt.trim() ? raw.short_excerpt : undefined
  const normalized = {
    source_id: buildSourceId(url, query.queryId, index),
    source_type: sourceType,
    title: raw.title ?? query.topic,
    url,
    published_date: publishedDate,
    retrieved_at: retrievedAt,
    claim: raw.claim ?? 'Ufullstendig funn fra API-sok krever manuell kontroll.',
    evidence_strength: clampEvidenceStrength(raw.evidence_strength, sourceType),
    relevant_case_field: mergeUnique([...toStringArray(raw.relevant_case_field), ...query.relevantCaseField]),
    affected_indicator: mergeUnique([
      ...toStringArray(raw.affected_indicator).filter(isResearchIndicator),
      ...query.affectedIndicators,
    ]),
    possible_risk_flag: toStringArray(raw.possible_risk_flag),
    possible_stop_rule: toStringArray(raw.possible_stop_rule),
    required_local_verification: toStringArray(raw.required_local_verification),
    short_excerpt: shortExcerpt,
    review_status: 'draft' as const,
  }

  return ResearchFindingSchema.parse(normalized)
}

export function dedupeFindings(findings: ResearchFinding[]): ResearchFinding[] {
  const seen = new Set<string>()
  const deduped: ResearchFinding[] = []

  for (const finding of findings) {
    const key = `${normalizeUrl(finding.url)}::${fingerprintClaim(finding.claim)}`
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(finding)
  }

  return deduped
}

function clampEvidenceStrength(value: unknown, sourceType: ResearchSourceType): 1 | 2 | 3 | 4 | 5 {
  const fallback = sourceType === 'official' || sourceType === 'agreement' ? 4 : sourceType === 'secondary' ? 2 : 3
  const numericValue = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : fallback
  const rounded = Number.isFinite(numericValue) ? Math.round(numericValue) : fallback
  return Math.min(5, Math.max(1, rounded)) as 1 | 2 | 3 | 4 | 5
}

function normalizeSourceType(value: string | undefined, fallback: ResearchSourceType): ResearchSourceType {
  const normalized = value?.trim().toLowerCase()
  if (
    normalized === 'official' ||
    normalized === 'agreement' ||
    normalized === 'research' ||
    normalized === 'review' ||
    normalized === 'secondary' ||
    normalized === 'local_required'
  ) {
    return normalized
  }

  return fallback
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()]
  }

  return []
}

function isResearchIndicator(value: string): value is ResearchIndicator {
  return value === 'malklarhet' || value === 'separabilitet' || value === 'kontrollkrav' || value === 'risiko' || value === 'lokal_forankring'
}

function buildSourceId(url: string, queryId: string, index: number): string {
  return `${queryId}-${simpleHash(normalizeUrl(url))}-${index + 1}`
}

function normalizeUrl(url: string): string {
  return url.trim().toLowerCase().replace(/\/+$/, '')
}

function fingerprintClaim(claim: string): string {
  return claim
    .toLowerCase()
    .replace(/[^a-z0-9æøå]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function mergeUnique<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}

function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0
  }
  return hash.toString(36)
}
