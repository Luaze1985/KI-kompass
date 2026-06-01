---
title: Produksjonsbase-oppsett for MVP
date: 2026-05-12
status: ready
tags: [mvp, produksjonsbase, harness, arkitektur]
category: architecture
---

# Produksjonsbase-oppsett for MVP

## Kilde

Denne strukturen bygger på funn i:

`C:\Users\larse\Documents\Produksjonsbase\Agenter og koder`

Relevante mønstre:

- `case_profiles/coding/profile.yml`
- `case_profiles/workflow_multi_agent/profile.yml`
- `docs/architecture/variation_model.md`
- `docs/workflows/agentisk_koding_gates.md`
- `docs/workflows/use_case_lifecycle.md`
- `templates/SPRINT_REQUIREMENTS_TEMPLATE.md`
- `templates/SPRINT_BLUEPRINT_TEMPLATE.md`
- `templates/SPRINT_ACCEPTANCE_CRITERIA_TEMPLATE.md`
- `templates/EVAL_PLAN_TEMPLATE.md`
- `templates/SMALLEST_ARTIFACT_CASE_FORM_TEMPLATE.md`

## Valgt oppsett

| Akse | Valg | Begrunnelse |
|---|---|---|
| Arbeidsprofil | `concept_context` nå, `coding` ved bygging | Prosjektet har fortsatt faglige avklaringer, men trenger nå en coding-klar sprintpakke. |
| Arkitekturvariant | `sequential_handoff` / passiv wizard | Claude-grillingen avviste `stateful_graph` som over-engineering for første MVP. |
| Agentpakke | `architect_builder_verifier` | Arkitektur, bygging og verifisering må holdes adskilt fordi modellen kan gi falsk trygghet. |
| Kodebaseprofil | `typescript_app` som kandidat | Første MVP er lokal webapp/prototype, men enklere prototype bør vurderes før framework låses. |
| Eval-modus | `case_regression` | Runde 1-casene skal bli regresjonstester for vurderingslogikken. |

## Hva dette betyr nå

Vi bygger ikke app ennå. Vi lager en sprintpakke som en fremtidig bygger kan bruke uten å gjette:

```text
config/
planning/
sprints/001-mvp-dimensjonering-vurdering/
evals/
app_spec/
handoff/
```

## Første MVP-artefakt

Det minste nyttige MVP-artefaktet er ikke en full app. Etter grill-me-runden er det en passiv wizard-prototype som kan:

1. samle kartfelt
2. skåre målklarhet og separabilitet
3. vurdere stoppregler
4. vurdere kontrollkrav
5. vise `beregnet_rolle` og `forelopig_tillatt_rolle`
6. kreve beslutningslogg når risikoen tilsier det
7. teste resultatet mot runde 1-casene

## Gates fra produksjonsbasen

MVP-arbeidet skal følge disse stoppunktene:

1. Requirements
2. Blueprint
3. Acceptance criteria
4. Handoff prompt
5. Godkjenning før bygging
6. Implementering innenfor sprintens filscope
7. Verifisering mot case-eval
8. Adversarial review
9. Handoff og kontekst-reset

## Grill-me-beslutninger

- Første bruker: prosjekteier selv som konsulent.
- Første beslutningstype: strategisk HR / livsfasepolitikk-mikroprosjekter.
- Arkitektur: enkel wizard, ikke stateful graph.
- Persistens: ingen database; eksport/filbasert er nok.
- Rapport: intern arbeidsrapport.

## Ikke bygg før dette er avklart

- indikator-mapping for testcasene
- verdivurderingspunkter i flyten
- om `typescript_app` er nødvendig eller om en enklere prototype holder
- hvordan case-regresjon skal kjøres når appkode finnes
