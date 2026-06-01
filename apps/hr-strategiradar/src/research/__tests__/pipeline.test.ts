import { describe, expect, it, vi } from 'vitest'
import { ResearchFindingListSchema } from '../../domain/researchSchemas'
import {
  buildResearchPrompt,
  dedupeFindings,
  parseRawFindingArray,
  runLangvakterResearchImport,
} from '../pipeline'
import type { ResearchQuery } from '../queryPack'
import type { SonarProvider } from '../sonarAdapter'

const testQuery: ResearchQuery = {
  queryId: 'LV-QTEST',
  topic: 'Testtema',
  query: 'test',
  preferredSourceTypes: ['official'],
  relevantCaseField: ['HRR-07'],
  affectedIndicators: ['kontrollkrav'],
}

describe('runLangvakterResearchImport', () => {
  it('adds the project precision policy to Sonar prompts', () => {
    const prompt = buildResearchPrompt(testQuery, 'Kildeprioritet: bruk Arbeidstilsynet for HMS.')

    expect(prompt).toContain('Prosjektspesifikt presisjonsfilter')
    expect(prompt).toContain('Kildeprioritet: bruk Arbeidstilsynet for HMS.')
    expect(prompt).toContain('Bruk bare kildeankrede funn som passer presisjonsfilteret')
  })

  it('returns missing_api_key when no provider is configured', async () => {
    const result = await runLangvakterResearchImport({
      missingApiKey: { checked: ['PPLX_API_KEY', 'SONAR_API_KEY'] },
      retrievedAt: '2026-05-18',
      queryPack: [testQuery],
    })

    expect(result.status).toBe('missing_api_key')
    expect(result.findings).toEqual([])
    if (result.status === 'missing_api_key') {
      expect(result.checked).toEqual(['PPLX_API_KEY', 'SONAR_API_KEY'])
    }
  })

  it('normalizes API findings as draft findings', async () => {
    const provider: SonarProvider = {
      search: vi.fn().mockResolvedValue({
        queryId: 'LV-QTEST',
        content: JSON.stringify([
          {
            source_type: 'official',
            title: 'Arbeidstid',
            url: 'https://www.arbeidstilsynet.no/arbeidsforhold/arbeidstid/',
            claim: 'Langvakter krever lokal forsvarlighetsvurdering.',
            evidence_strength: 5,
            possible_risk_flag: ['healthSafetyEnvironment'],
            possible_stop_rule: ['SR-05'],
            required_local_verification: ['lokal risikovurdering'],
          },
        ]),
        citations: [],
        raw: {},
      }),
    }

    const result = await runLangvakterResearchImport({
      provider,
      retrievedAt: '2026-05-18',
      queryPack: [testQuery],
    })

    expect(result.status).toBe('completed')
    if (result.status === 'completed') {
      expect(result.findings).toHaveLength(1)
      expect(result.findings[0].review_status).toBe('draft')
      expect(result.findings[0].relevant_case_field).toContain('HRR-07')
      expect(ResearchFindingListSchema.safeParse(result.findings).success).toBe(true)
    }
  })

  it('deduplicates findings by URL and claim fingerprint', () => {
    const parsed = ResearchFindingListSchema.parse([
      {
        source_id: 'A',
        source_type: 'official',
        title: 'Arbeidstid',
        url: 'https://www.arbeidstilsynet.no/arbeidsforhold/arbeidstid/',
        retrieved_at: '2026-05-18',
        claim: 'Langvakter krever lokal forsvarlighetsvurdering.',
        evidence_strength: 5,
        relevant_case_field: ['HRR-07'],
        affected_indicator: ['kontrollkrav'],
        possible_risk_flag: [],
        possible_stop_rule: ['SR-05'],
        required_local_verification: [],
        review_status: 'draft',
      },
      {
        source_id: 'B',
        source_type: 'official',
        title: 'Arbeidstid',
        url: 'https://www.arbeidstilsynet.no/arbeidsforhold/arbeidstid',
        retrieved_at: '2026-05-18',
        claim: 'Langvakter krever lokal forsvarlighetsvurdering!',
        evidence_strength: 5,
        relevant_case_field: ['HRR-07'],
        affected_indicator: ['kontrollkrav'],
        possible_risk_flag: [],
        possible_stop_rule: ['SR-05'],
        required_local_verification: [],
        review_status: 'draft',
      },
    ])

    expect(dedupeFindings(parsed)).toHaveLength(1)
  })

  it('parses JSON arrays wrapped in markdown fences', () => {
    const parsed = parseRawFindingArray('```json\n[{"claim":"ok"}]\n```')
    expect(parsed).toEqual([{ claim: 'ok' }])
  })
})
