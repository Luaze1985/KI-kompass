/**
 * screenshot-walkthrough.cjs
 * Tar skjermbilder av alle 4 steg i HR Strategiradar og lagrer dem.
 */
const { chromium } = require('@playwright/test')
const path = require('node:path')
const fs = require('node:fs')
const http = require('node:http')
const { spawn, spawnSync } = require('node:child_process')

const rootDir = path.resolve(__dirname, '..')
const host = '127.0.0.1'
const port = '5173'
const baseURL = `http://${host}:${port}`
const outDir = path.join(rootDir, 'screenshots')
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

function isServerAvailable() {
  return new Promise((resolve) => {
    const req = http.get(baseURL, (res) => { res.resume(); resolve(res.statusCode >= 200 && res.statusCode < 500) })
    req.setTimeout(1000, () => { req.destroy(); resolve(false) })
    req.on('error', () => resolve(false))
  })
}

async function waitForServer(timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    if (await isServerAvailable()) return
    await new Promise(r => setTimeout(r, 300))
  }
  throw new Error(`Timed out waiting for ${baseURL}`)
}

async function main() {
  let serverProcess
  const externalRunning = await isServerAvailable()
  if (!externalRunning) {
    serverProcess = spawn(process.execPath, [viteBin, '--host', host, '--port', port], {
      cwd: rootDir, env: { ...process.env, BROWSER: 'none' }, stdio: 'ignore', windowsHide: true
    })
    serverProcess.unref()
    await waitForServer()
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } })
  const page = await context.newPage()

  const shot = async (name, label) => {
    const file = path.join(outDir, `${name}.png`)
    await page.screenshot({ path: file, fullPage: false })
    console.log(`📸 ${label} -> screenshots/${name}.png`)
    return file
  }

  const delay = (ms) => new Promise(r => setTimeout(r, ms))

  console.log('\n🚀 HR Strategiradar – Visuell gjennomgang\n')
  await page.goto(baseURL)
  await page.waitForLoadState('networkidle')
  await shot('00_start', 'Startside')

  // ----- STEG 1 -----
  console.log('\n📋 STEG 1: Beskriv saken')
  await page.getByLabel('Velg fagområde:').selectOption({ label: 'Seniorbevaring i hjemmetjenesten' })
  await delay(400)
  await shot('01_case_selected', 'Steg 1 – Case valgt')

  // Sjekk: ingen fritekstfelt?
  const fritekst = await page.locator('textarea').count()
  console.log(`   Fritekstfelt i steg 1: ${fritekst} (skal være 0)`)

  // Sjekk forbidden words
  const pageText = await page.locator('body').innerText()
  const forbidden = ['separabilitet', 'målklarhet', 'stoppregler', 'overreliance', 'FRIA', 'samsvarsgrad', 'compliance', 'SR-01', 'SR-05']
  for (const word of forbidden) {
    if (pageText.toLowerCase().includes(word.toLowerCase())) {
      console.log(`   ⚠️  FUNNET forbudt ord: "${word}"`)
    }
  }

  await page.getByRole('button', { name: 'Stemmer — gå videre →' }).click()
  await delay(600)

  // ----- STEG 2 -----
  console.log('\n🧭 STEG 2: Foreløpig KI-diagnose')
  await shot('02_blindtest', 'Steg 2 – Blindtest')

  // Svar på blindtest
  await page.getByRole('button', { name: 'KI som idégiver (Lav risiko)' }).click()
  await delay(500)
  await shot('03_compass', 'Steg 2 – KI-Kompass')

  // Sjekk tekster i steg 2
  const step2Text = await page.locator('body').innerText()
  const checks2 = [
    ['Hvor tydelige er målene', 'Y-akse label'],
    ['Kan det løses med faste regler', 'X-akse label'],
    ['Forhold som må avklares', 'Stoppregel-label (IKKE "Stoppregler utløst")'],
    ['Foreløpig anbefalt KI-rolle', 'KI-rolle label'],
    ['Faste regler:', 'Score-label X'],
    ['Tydelige mål:', 'Score-label Y'],
  ]
  for (const [text, label] of checks2) {
    const found = step2Text.includes(text)
    console.log(`   ${found ? '✅' : '❌'} ${label}: "${text}"`)
  }

  // Sjekk IKKE-tekster
  const forbidden2 = ['Stoppregler utløst', 'Foreløpig tillatt KI-bruk etter avklaringer']
  for (const word of forbidden2) {
    if (step2Text.includes(word)) console.log(`   ⚠️  FUNNET uønsket tekst: "${word}"`)
  }

  await page.getByRole('button', { name: 'Gå til risikovurdering →' }).click()
  await delay(500)

  // ----- STEG 3 -----
  console.log('\n⚠️  STEG 3: Risikovurdering')
  await shot('04_risk', 'Steg 3 – Risikovurdering')

  const step3Text = await page.locator('body').innerText()
  const checks3 = [
    ['Tenk gjennom risiko', 'Overskrift'],
    ['Påvirker ansattes rettigheter', 'Toggle 1'],
    ['Brukes personlige eller sensitive opplysninger', 'Toggle 2'],
    ['Må du kjenne lokale forhold', 'Toggle 3'],
    ['Kan feil rettes opp', 'Toggle 4'],
    ['Dette må dere avklare', 'Avklaring-label'],
  ]
  for (const [text, label] of checks3) {
    const found = step3Text.includes(text)
    console.log(`   ${found ? '✅' : '❌'} ${label}: "${text}"`)
  }

  // Svar på toggles
  await page.getByRole('button', { name: 'Påvirker ansattes rettigheter? Nei' }).click()
  await page.getByRole('button', { name: 'Brukes personlige eller sensitive opplysninger? Nei' }).click()
  await page.getByRole('button', { name: 'Må du kjenne lokale forhold? Nei' }).click()
  await page.getByRole('button', { name: 'Kan feil rettes opp? Ja' }).click()
  await delay(400)
  await shot('05_risk_filled', 'Steg 3 – Toggles besvart')

  await page.getByRole('button', { name: 'Gå til beslutningsnotat →' }).click()
  await delay(500)

  // ----- STEG 4 -----
  console.log('\n📄 STEG 4: Beslutningsnotat')
  await shot('06_decision_log', 'Steg 4 – Beslutningsnotat')

  const step4Text = await page.locator('body').innerText()
  const checks4 = [
    ['Foreløpig beslutningsnotat', 'Overskrift'],
    ['Fyll inn automatisk', 'Autofyll-knapp'],
    ['Teknisk rapport', 'Rapport-knapp'],
    ['Signer at notatet er gjennomgått', 'Signering'],
    ['Kollega som har lest notatet', 'Kollega-felt'],
    ['Lås vurderingen', 'Lås-knapp'],
    ['Dette er et utkast fra workshopen', 'Disclaimer'],
  ]
  for (const [text, label] of checks4) {
    const found = step4Text.includes(text)
    console.log(`   ${found ? '✅' : '❌'} ${label}: "${text}"`)
  }

  // Uønsket tekst i steg 4
  const forbidden4 = ['Autofyll', 'IT-Dokumentasjon', 'ROS og risikoreduserende', 'Makker som har lest', 'Lås vurderingen i denne']
  for (const word of forbidden4) {
    if (step4Text.includes(word)) console.log(`   ⚠️  FUNNET uønsket tekst: "${word}"`)
  }

  await page.getByRole('button', { name: 'Fyll inn automatisk' }).click()
  await delay(500)
  await shot('07_decision_log_filled', 'Steg 4 – Notat utfylt')

  await browser.close()

  if (serverProcess) {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/pid', String(serverProcess.pid), '/T', '/F'], { stdio: 'ignore' })
    } else {
      serverProcess.kill('SIGTERM')
    }
  }

  console.log(`\n✅ Ferdig! Skjermbilder lagret i: ${outDir}\n`)
}

main().catch(err => { console.error(err); process.exit(1) })
