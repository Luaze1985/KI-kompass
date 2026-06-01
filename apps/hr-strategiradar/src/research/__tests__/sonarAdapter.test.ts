import { describe, expect, it, vi } from 'vitest'
import { createPerplexitySonarProvider, resolveSonarApiKey } from '../sonarAdapter'

describe('resolveSonarApiKey', () => {
  it('uses PPLX_API_KEY before other supported keys', () => {
    const result = resolveSonarApiKey({
      PPLX_API_KEY: 'pplx',
      SONAR_API_KEY: 'sonar',
      PERPLEXITY_API_KEY: 'perplexity',
    })

    expect(result).toEqual({ ok: true, apiKey: 'pplx' })
  })

  it('returns a clear missing_api_key error', () => {
    const result = resolveSonarApiKey({})

    expect(result).toEqual({
      ok: false,
      error: 'missing_api_key',
      checked: ['PPLX_API_KEY', 'SONAR_API_KEY', 'PERPLEXITY_API_KEY'],
    })
  })
})

describe('createPerplexitySonarProvider', () => {
  it('sends an authenticated Sonar request and returns content with citations', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '[{"claim":"ok"}]' } }],
        citations: ['https://example.com/source'],
        search_results: [{ url: 'https://example.com/search-result' }],
      }),
    })

    const provider = createPerplexitySonarProvider({
      apiKey: 'secret',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    })

    const result = await provider.search('LV-Q01', 'prompt')

    expect(fetchImpl).toHaveBeenCalledWith(
      'https://api.perplexity.ai/v1/sonar',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer secret',
          'Content-Type': 'application/json',
        }),
      }),
    )
    expect(result.content).toBe('[{"claim":"ok"}]')
    expect(result.citations).toEqual(['https://example.com/source', 'https://example.com/search-result'])
  })
})
