---
title: "Codex handoff: KI-kompass decision baseline"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [codex, handoff, sprint]
---


# Codex handoff: KI-kompass decision baseline

Du er bygger for en ny avgrenset sprint: `ki-kompass-decision-baseline`.

## Les først

- `workspaces/vibekode_til_solid_kodebase/AGENTS.md`
- `workspaces/vibekode_til_solid_kodebase/CONTEXT.md`
- `workspaces/vibekode_til_solid_kodebase/docs/product_decisions.md`
- Denne pakken: `docs/source_packs/ki_kompasset_compressed/`

## Mål

Lag en filbasert sprintpakke for en første lokal prototype som registrerer beslutningscase og bruker KI-kompasset til diagnose.

## Sprinten skal lage

```text
sprints/002-ki-kompass-decision-baseline/
  requirements.md
  blueprint.md
  acceptance_criteria.md
  handoff_prompt.md
  adversarial_review.md
```

## Scope

Sprinten skal beskrive, men ikke nødvendigvis implementere, en lokal decision-case baseline med:

- domain
- role
- task
- incident_type
- decision_case
- audit_log
- målklarhet
- separabilitet
- anbefalt KI-rolle
- menneskelig vurdering

## Ikke bygg dette i første omgang

- ekte HR-persondata
- individuelle kompetanseprofiler
- ekstern LLM-integrasjon
- automatisk beslutning
- kobling mot interne fagsystemer
- full workforce planning

## Akseptansekriterier for sprintpakken

- Må forklare hvorfor KI-kompasset er kvalitetsport.
- Må skille deterministisk logikk, språkmodellstøtte og menneskelig beslutning.
- Må ha testbar datamodell.
- Må ha stoppunkter for persondata, lav målklarhet, lav separabilitet og manglende ansvarlig menneske.
- Må bruke enkelt språk.

## Ferdigmelding

Svar med:

- endrede filer
- hva som ble avgrenset bort
- åpne spørsmål
- anbefalt neste trygge steg
