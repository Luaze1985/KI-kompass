export type SonarEnv = Record<string, string | undefined>

export type SonarSearchResult = {
  queryId: string
  content: string
  citations: string[]
  raw: unknown
}

export type SonarProvider = {
  search(queryId: string, prompt: string): Promise<SonarSearchResult>
}

type FetchLike = typeof fetch

type SonarAdapterOptions = {
  apiKey: string
  endpoint?: string
  model?: string
  timeoutMs?: number
  fetchImpl?: FetchLike
}

type SonarChatResponse = {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  citations?: string[]
  search_results?: Array<{ url?: string }>
}

export function resolveSonarApiKey(env: SonarEnv): { ok: true; apiKey: string } | { ok: false; error: 'missing_api_key'; checked: string[] } {
  const checked = ['PPLX_API_KEY', 'SONAR_API_KEY', 'PERPLEXITY_API_KEY']
  const apiKey = env.PPLX_API_KEY || env.SONAR_API_KEY || env.PERPLEXITY_API_KEY

  if (!apiKey) {
    return { ok: false, error: 'missing_api_key', checked }
  }

  return { ok: true, apiKey }
}

export function createPerplexitySonarProvider(options: SonarAdapterOptions): SonarProvider {
  const endpoint = options.endpoint ?? 'https://api.perplexity.ai/v1/sonar'
  const model = options.model ?? 'sonar'
  const fetchImpl = options.fetchImpl ?? fetch

  return {
    async search(queryId, prompt) {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 45_000)
      const response = await fetchImpl(endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content:
                'Return only JSON. Extract source-anchored HR research findings with claim, source metadata, risk flags, stop rules, and local verification needs.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      }).finally(() => clearTimeout(timeout))

      if (!response.ok) {
        throw new Error(`Sonar API request failed for ${queryId}: ${response.status} ${response.statusText}`)
      }

      const raw = (await response.json()) as SonarChatResponse
      const content = raw.choices?.[0]?.message?.content
      if (!content) {
        throw new Error(`Sonar API response for ${queryId} did not include message content`)
      }

      const citations = [
        ...(raw.citations ?? []),
        ...(raw.search_results?.map(result => result.url).filter((url): url is string => Boolean(url)) ?? []),
      ]

      return { queryId, content, citations, raw }
    },
  }
}
