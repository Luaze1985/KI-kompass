Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")

function Get-StagedPaths {
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) { return @() }
    $inside = & git rev-parse --is-inside-work-tree 2>$null
    if ($LASTEXITCODE -ne 0 -or $inside.Trim() -ne "true") { return @() }
    return @(& git diff --cached --name-only --diff-filter=ACMR)
}

Push-Location $repoRoot
try {
    Write-Host "ki-beslutningsradar pre-commit: app/docs consistency"
    & git diff --check --cached
    if ($LASTEXITCODE -ne 0) { throw "git diff whitespace check failed" }

    foreach ($path in @("README.md", "AGENTS.md", "CONTEXT.md", "CLAUDE.md", "tasks\active\hrsr_002_domain_schemas_and_fixtures.md", "state\context\current_context.md", "docs\agents\hooks-and-rig.md")) {
        if (-not (Test-Path $path)) { throw "Missing required path: $path" }
    }

    $staged = @(Get-StagedPaths | ForEach-Object { $_ -replace "/", "\" })
    $appChanged = @($staged | Where-Object { $_ -match "^apps\\hr-strategiradar\\" })
    if ($appChanged.Count -gt 0) {
        if (-not (Test-Path "apps\hr-strategiradar\package.json")) { throw "apps/hr-strategiradar/package.json not found" }
        & npm --prefix apps/hr-strategiradar run lint
        if ($LASTEXITCODE -ne 0) { throw "hr-strategiradar lint failed" }
    }

    $decisionChanged = @($staged | Where-Object { $_ -match "^(decision_model\\|testcases\\)" })
    $contextChanged = @($staged | Where-Object { $_ -match "^state\\context\\" })
    if ($decisionChanged.Count -gt 0 -and $contextChanged.Count -eq 0) {
        Write-Warning "decision_model/testcases changed without a staged state/context update."
    }
}
finally {
    Pop-Location
}
