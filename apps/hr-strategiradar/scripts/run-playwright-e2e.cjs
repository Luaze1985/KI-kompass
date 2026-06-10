const { spawn, spawnSync } = require('node:child_process')
const http = require('node:http')
const path = require('node:path')

const rootDir = path.resolve(__dirname, '..')
const host = '127.0.0.1'
const port = process.env.E2E_PORT || '5173'
const baseURL = `http://${host}:${port}`
const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js')
const playwrightCli = path.join(rootDir, 'node_modules', '@playwright', 'test', 'cli.js')

let serverProcess
let cleanupDone = false

function isServerAvailable() {
  return new Promise((resolve) => {
    const request = http.get(baseURL, (response) => {
      response.resume()
      resolve(response.statusCode >= 200 && response.statusCode < 500)
    })

    request.setTimeout(1000, () => {
      request.destroy()
      resolve(false)
    })

    request.on('error', () => resolve(false))
  })
}

async function waitForServer(timeoutMs = 30000) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (await isServerAvailable()) return
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`Timed out waiting for ${baseURL}`)
}

function stopServer() {
  if (!serverProcess || cleanupDone) return
  cleanupDone = true

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(serverProcess.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    serverProcess.kill('SIGTERM')
  }
}

async function main() {
  const externalServerIsRunning = await isServerAvailable()

  if (!externalServerIsRunning) {
    serverProcess = spawn(
      process.execPath,
      [viteBin, '--host', host, '--port', port],
      {
        cwd: rootDir,
        env: { ...process.env, BROWSER: 'none' },
        stdio: 'ignore',
        windowsHide: true,
      },
    )

    serverProcess.unref()
    await waitForServer()
  }

  const testProcess = spawn(
    process.execPath,
    [playwrightCli, 'test', '--config', 'playwright.config.ts', ...process.argv.slice(2)],
    {
      cwd: rootDir,
      env: { ...process.env, PLAYWRIGHT_SKIP_WEBSERVER: '1' },
      stdio: 'inherit',
      windowsHide: true,
    },
  )

  const exitCode = await new Promise((resolve) => {
    testProcess.on('exit', (code, signal) => {
      if (signal) resolve(1)
      else resolve(code ?? 1)
    })
  })

  stopServer()
  process.exit(exitCode)
}

process.on('exit', stopServer)
process.on('SIGINT', () => {
  stopServer()
  process.exit(130)
})
process.on('SIGTERM', () => {
  stopServer()
  process.exit(143)
})

main().catch((error) => {
  stopServer()
  console.error(error)
  process.exit(1)
})
