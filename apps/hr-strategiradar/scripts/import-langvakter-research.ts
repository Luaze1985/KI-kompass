import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { runLangvakterResearchImport } from '../src/research/pipeline'
import { createPerplexitySonarProvider, resolveSonarApiKey } from '../src/research/sonarAdapter'

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

async function loadEnvFile(path: string): Promise<void> {
  const content = await readFile(path, 'utf8')
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#') || !line.includes('=')) continue
    const [key, ...valueParts] = line.split('=')
    const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
    if (!process.env[key.trim()]) {
      process.env[key.trim()] = value
    }
  }
}

const envFile = getArgValue('--env-file') ?? process.env.PERPLEXITY_ENV_FILE
if (envFile) {
  await loadEnvFile(envFile)
}

const retrievedAt = new Date().toISOString()
const apiKey = resolveSonarApiKey(process.env)
const model = getArgValue('--model') ?? process.env.SONAR_MODEL ?? 'sonar'
const timeoutMs = Number(getArgValue('--timeout-ms') ?? process.env.SONAR_TIMEOUT_MS ?? 45_000)
const outputDir = resolve(process.cwd(), '..', '..', 'data', 'research')
const defaultPolicyFile = resolve(process.cwd(), '..', '..', 'research', 'generated', 'langvakter_api_presisjonsfilter.md')
const policyFile = getArgValue('--policy-file') ?? process.env.RESEARCH_POLICY_FILE ?? defaultPolicyFile
const policyText = await readFile(policyFile, 'utf8').catch(() => undefined)

const result = await runLangvakterResearchImport({
  provider: apiKey.ok ? createPerplexitySonarProvider({ apiKey: apiKey.apiKey, model, timeoutMs }) : undefined,
  missingApiKey: apiKey.ok ? undefined : { checked: apiKey.checked },
  retrievedAt,
  policyText,
})

if (result.status === 'missing_api_key') {
  console.error(`missing_api_key: set one of ${result.checked.join(', ')}`)
  process.exitCode = 2
} else {
  await mkdir(outputDir, { recursive: true })
  await writeFile(
    resolve(outputDir, 'langvakter_findings.api-draft.json'),
    `${JSON.stringify(result.findings, null, 2)}\n`,
    'utf8',
  )
  await writeFile(
    resolve(outputDir, 'langvakter_findings.api-errors.json'),
    `${JSON.stringify(result.errors, null, 2)}\n`,
    'utf8',
  )
  console.log(`Wrote ${result.findings.length} draft findings. Errors: ${result.errors.length}`)

  if (result.errors.length > 0) {
    process.exitCode = 1
  }
}
