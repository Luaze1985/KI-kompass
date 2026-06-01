---
title: "Codex project understanding"
date: 2026-05-13
status: canonical-understanding
tags: [codex, project-understanding, hr-strategiradar]
category: agent-context
---

# Codex Project Understanding

## Read first

1. `AGENTS.md`
2. `state/context/current_context.md`
3. `app_spec/brukerreise_hr_strategiradar.md`
4. `app_spec/arbeidsflyt_og_beregningsmodell.md`
5. `testcases/hr_strategiradar_realistiske_caser.md`
6. `tasks/active/hrsr_002_domain_schemas_and_fixtures.md`

## Current state

`HRSR-001` is complete. The local Vite + React + TypeScript scaffold exists at `apps/hr-strategiradar/`.

Do not continue app implementation by guessing schemas from the old PRD alone. Use the corrected user journey and calculation model.

## Product understanding

The app is not a score form. It is a guided diagnostic workbench.

Canonical journey:

```text
Forstå situasjonen
-> bygg kartet
-> velg KI-bruksoppgave
-> still to kompass-spørsmål
-> gjør verdivurderinger
-> se kompassplassering
-> vurder stoppregler
-> skill beregnet rolle fra tillatt rolle
-> dokumenter ansvar
-> lag beslutningsklart notat
```

## Critical modeling rule

> The HR microproject is context. The AI use task is the assessment subject.

Do not calculate directly on the whole HR case. Model the concrete KI-bruksoppgave first.

## Calculation order

```text
HR-kontekst
-> KI-bruksoppgave
-> verdivurderinger
-> indikatorer
-> modulskårer
-> kompass_score
-> kontroll_score
-> beregnet_rolle
-> stoppregler
-> rolle_tak
-> forelopig_tillatt_rolle
-> beslutningslogg
-> rapport
```

## Case foundation

Primary MVP case set: `testcases/hr_strategiradar_realistiske_caser.md`.

First tracer bullet: HRR-01 Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

Test both:

- a support task: structure anonymized insight and generate tiltakshypoteser
- a risky task: prioritize employees or suggest individual accommodation

First build loop should also keep HRR-02, HRR-04 and HRR-07 Langvakter i helsesektoren visible as regression pressure so the schema does not become too narrow.

## HRSR-002 must model

- `HrMicroproject`
- `AiUseTask`
- `RiskFlags`
- `DimensionIndicators`
- `ModuleScores`
- `ValueJudgments`
- `AssessmentResult`
- `DecisionLog`
- `HandoverPacket`

## Guardrail

If the app jumps straight from HR-situasjon to score, the model is wrong.

## Latest UI direction from grill session

Use `app_spec/ui_3_stegs_startflyt_og_kanban.md` before revising MVP plans.

The user wants a compressed UI with maximum three visible phases:

```text
1. Beskriv saken
2. Se foreløpig KI-diagnose
3. Tweak og lag notat
```

Start intake should use relevant dropdowns, max 2-3 questions, one free-text field, and clickable confirmation choices. The chatbot may assume and draft structure, but the user must actively confirm with yes/no/change before assumptions are used.

Several KI-spor are useful after the first diagnosis, not as the first screen.
