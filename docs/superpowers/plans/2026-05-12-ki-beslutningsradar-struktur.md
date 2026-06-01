# KI-beslutningsradar Struktur Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Etabler et `concept_context`-workspace for KI-beslutningsradaren som bevarer råkilder, løfter kanoniske filer til en ryddig arbeidsstruktur og peker på neste testbare oppgave.

**Architecture:** Råpakker bevares uendret under `archive/source_packages/`. Kanoniske arbeidsfiler løftes til fokuserte mapper for intake, konsepter, decision model, research, kilder, handoff, state og tasks. App- og MVP-arbeid holdes utenfor til scoremodell, stoppregler og beslutningslogg er testet mot caser.

**Tech Stack:** Markdown, YAML-frontmatter, Git, PowerShell.

---

## File Structure

| Path | Responsibility |
|---|---|
| `README.md` | Workspace-orientering, leserekkefølge og neste anbefalte arbeid. |
| `AGENTS.md` | Lokale prosjektregler for Codex/agenter. |
| `workspace.yml` | Maskinlesbar workspace-identitet, profil, guardrails og neste task. |
| `intake/source_register.md` | Beslutning om hvilke zip-pakker som er kanoniske, arkiv eller støtte. |
| `archive/source_packages/` | Utpakkede råpakker for sporbarhet. |
| `concepts/` | Grunnpremisser, kart, kompass, dimensjoner og KI-roller. |
| `decision_model/` | Datamodell, kontrollkrav, syntese og scoremodell. |
| `research/runde_1/` | Runde 1-datafangster og manifest. |
| `context_packets/` | Prosjektkontekst og use case-brief fra klargjøringspakken. |
| `app_spec/` | MVP-avgrensning uten appimplementering. |
| `prompts/` | Researchprompter fra kanonisk runde 1. |
| `sources/` | Samlet kildeoversikt. |
| `missing/` | Mangelliste, sluttkontroll og neste søk. |
| `handoff/` | Codex/GitHub-handoff fra kildematerialet. |
| `quality/` | Kvalitetskontroll fra arkivvariant. |
| `state/context/current_context.md` | Nåværende prosjektstatus, modell og neste oppgave. |
| `tasks/active/test_scoremodell_mot_caser.md` | Første aktive oppgave etter strukturering. |
| `testcases/` | Arbeidsflate for manuell case-testing. |
| `assets/images/` | Bilder fra grunnfundamentpakken. |

### Task 1: Preserve Source Packages

**Files:**
- Create: `archive/source_packages/grunnfundament_med_bilder/`
- Create: `archive/source_packages/grunnfundament_uten_bilder/`
- Create: `archive/source_packages/runde_1_klargjoring/`
- Create: `archive/source_packages/runde_1_ready/`
- Create: `archive/source_packages/runde_1_archive_variant/`

- [x] **Step 1: Extract all provided zip files**

Run:

```powershell
Expand-Archive -LiteralPath 'C:\Users\larse\Downloads\ki_beslutningsradar_grunnfundament_med_bilder.zip' -DestinationPath 'archive/source_packages/grunnfundament_med_bilder'
Expand-Archive -LiteralPath 'C:\Users\larse\Downloads\ki_beslutningsradar_grunnfundament.zip' -DestinationPath 'archive/source_packages/grunnfundament_uten_bilder'
Expand-Archive -LiteralPath 'C:\Users\larse\Downloads\ki_beslutningsradar_runde_1_klargjoring.zip' -DestinationPath 'archive/source_packages/runde_1_klargjoring'
Expand-Archive -LiteralPath 'C:\Users\larse\Downloads\ki_beslutningsradar_runde_1.zip' -DestinationPath 'archive/source_packages/runde_1_ready'
Expand-Archive -LiteralPath 'C:\Users\larse\Downloads\ki_beslutningsradar_runde_1 (1).zip' -DestinationPath 'archive/source_packages/runde_1_archive_variant'
```

Expected: five source package directories exist under `archive/source_packages/`.

- [x] **Step 2: Record canonical source choice**

Create `intake/source_register.md` with the rule that `runde_1_ready` is canonical for runde 1, `grunnfundament_med_bilder` is canonical for foundation, and the other packages are archive/context references.

### Task 2: Create Workspace Identity

**Files:**
- Create: `README.md`
- Create: `AGENTS.md`
- Create: `workspace.yml`
- Create: `state/context/current_context.md`

- [x] **Step 1: Add workspace README**

Create `README.md` with project purpose, main question, folder map, read order and next recommended task.

- [x] **Step 2: Add local agent rules**

Create `AGENTS.md` with guardrails: do not build app yet, keep kart/kompass/kontrollkrav/linser separate, do not automate judgement, preserve source material.

- [x] **Step 3: Add machine-readable workspace metadata**

Create `workspace.yml` with:

```yaml
name: ki_beslutningsradar_runde_1
profile: concept_context
status: structured
created: 2026-05-12
language: nb
```

- [x] **Step 4: Add current context**

Create `state/context/current_context.md` with the current status, main question, working model and canonical next task.

### Task 3: Promote Canonical Files

**Files:**
- Create: `concepts/*.md`
- Create: `decision_model/*.md`
- Create: `research/runde_1/*.md`
- Create: `context_packets/*.md`
- Create: `app_spec/mvp_notat.md`
- Create: `sources/kildeoversikt.md`
- Create: `missing/*.md`
- Create: `handoff/codex_github_handoff.md`
- Create: `quality/kvalitetskontroll_for_zip_archive_variant.md`
- Create: `assets/images/*`

- [x] **Step 1: Promote foundation files**

Copy foundation files from `archive/source_packages/grunnfundament_med_bilder/ki_beslutningsradar_grunnfundament/` into `intake/`, `concepts/`, `decision_model/`, `app_spec/` and `assets/images/`.

- [x] **Step 2: Promote runde 1 files**

Copy files from `archive/source_packages/runde_1_ready/ki_beslutningsradar_runde_1/` into `research/runde_1/`, `decision_model/`, `sources/`, `missing/`, `handoff/` and `prompts/`.

- [x] **Step 3: Promote context and quality references**

Copy `context/project_context_packet.md` and `context/use_case_brief.md` from the klargjøring package into `context_packets/`. Copy intake and quality checks from the archive variant into `intake/` and `quality/`.

### Task 4: Add Next Testable Task

**Files:**
- Create: `tasks/active/test_scoremodell_mot_caser.md`
- Create: `testcases/README.md`

- [x] **Step 1: Create active task**

Create `tasks/active/test_scoremodell_mot_caser.md` with purpose, input files, deliverable and acceptance criteria for testing the scoremodell against 8-12 caser.

- [x] **Step 2: Create testcases folder note**

Create `testcases/README.md` explaining that `runde_1_testcaser.md` is the first recommended artifact.

### Task 5: Verify Structure

**Files:**
- Read: all workspace files

- [x] **Step 1: List files**

Run:

```powershell
Get-ChildItem -Recurse -File | Select-Object FullName,Length | Sort-Object FullName
```

Expected: root identity files, canonical folders, source package archive and active task are present.

- [x] **Step 2: Check Git status**

Run:

```powershell
git status --short
```

Expected: newly created workspace files are untracked and no unexpected modified tracked files exist.

- [x] **Step 3: Review next-task coherence**

Read `decision_model/scoremodell_runde_1.md` and `tasks/active/test_scoremodell_mot_caser.md`.

Expected: the active task tests gate + poeng, checks stoppregler before KI-rolle and avoids treating the role as a final decision.

## Self-Review

Spec coverage: The structure follows the source recommendations: `concept_context`, no app build, raw source preservation, canonical runde 1, foundation concepts, decision model, sources, missing, handoff, state and first active task.

Placeholder scan: The plan contains no unresolved placeholder phrases or unresolved file names.

Type consistency: Folder and file names match the created workspace files and source package names.
