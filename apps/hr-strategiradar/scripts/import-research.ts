import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { runResearchImport } from '../src/research/pipeline'
import { RESEARCH_QUERY_PACKS, getQueryPack } from '../src/research/queryPack'
import { createPerplexitySonarProvider, resolveSonarApiKey } from '../src/research/sonarAdapter'

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  if (index === -1) return undefined
  return process.argv[index + 1]
}

function hasFlag(name: string): boolean {
  return process.argv.includes(name)
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

// Hvilke saker skal kjores: --all, eller --case HRR-03 (kan gjentas), ellers feil.
const caseArgs = process.argv.flatMap((arg, i) => (arg === '--case' ? [process.argv[i + 1]] : [])).filter(Boolean) as string[]
const runAll = hasFlag('--all')
const caseIds = runAll ? Object.keys(RESEARCH_QUERY_PACKS) : caseArgs

if (caseIds.length === 0) {
  console.error('Bruk: npm run research -- --case HRR-03 [--case HRR-05] | --all')
  console.error(`Tilgjengelige saker: ${Object.keys(RESEARCH_QUERY_PACKS).join(', ')}`)
  process.exitCode = 2
} else {
  const retrievedAt = new Date().toISOString()
  const apiKey = resolveSonarApiKey(process.env)
  const model = getArgValue('--model') ?? process.env.SONAR_MODEL ?? 'sonar'
  const timeoutMs = Number(getArgValue('--timeout-ms') ?? process.env.SONAR_TIMEOUT_MS ?? 45_000)
  const outputDir = resolve(process.cwd(), '..', '..', 'data', 'research')

  if (!apiKey.ok) {
    console.error(`missing_api_key: sett en av ${apiKey.checked.join(', ')} (miljovariabel eller --env-file)`)
    process.exitCode = 2
  } else {
    await mkdir(outputDir, { recursive: true })
    let totalFindings = 0
    let totalErrors = 0

    for (const caseId of caseIds) {
      const queryPack = getQueryPack(caseId)
      if (!queryPack) {
        console.error(`Ukjent sak '${caseId}' — hopper over. Tilgjengelige: ${Object.keys(RESEARCH_QUERY_PACKS).join(', ')}`)
        process.exitCode = 1
        continue
      }

      // Valgfritt per-sak presisjonsfilter: research/generated/<caseId>_api_presisjonsfilter.md
      const policyFile =
        getArgValue('--policy-file') ??
        process.env.RESEARCH_POLICY_FILE ??
        resolve(process.cwd(), '..', '..', 'research', 'generated', `${caseId}_api_presisjonsfilter.md`)
      const policyText = await readFile(policyFile, 'utf8').catch(() => undefined)

      const result = await runResearchImport({
        provider: createPerplexitySonarProvider({ apiKey: apiKey.apiKey, model, timeoutMs }),
        queryPack,
        retrievedAt,
        policyText,
      })

      if (result.status === 'completed') {
        const base = caseId.toLowerCase()
        await writeFile(
          resolve(outputDir, `${base}_findings.api-draft.json`),
          `${JSON.stringify(result.findings, null, 2)}\n`,
          'utf8',
        )
        await writeFile(
          resolve(outputDir, `${base}_findings.api-errors.json`),
          `${JSON.stringify(result.errors, null, 2)}\n`,
          'utf8',
        )
        totalFindings += result.findings.length
        totalErrors += result.errors.length
        console.log(`${caseId}: ${result.findings.length} draft-funn, ${result.errors.length} feil`)
      }
    }

    console.log(`Ferdig. Totalt ${totalFindings} draft-funn, ${totalErrors} feil. Skrevet til ${outputDir}`)
    if (totalErrors > 0) {
      process.exitCode = 1
    }
  }
}
