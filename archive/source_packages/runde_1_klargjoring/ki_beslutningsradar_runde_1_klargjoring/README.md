---
title: KI-beslutningsradar runde 1 klargjøringspakke
date: 2026-05-12
status: draft
tags: [ki-beslutningsradar, runde-1]
---


# KI-beslutningsradar – runde 1 klargjøringspakke

Denne pakken samler arbeidsgrunnlaget for første runde i prosjektet **KI-beslutningsradar**.

Hovedspørsmål:

> Bør denne delen av beslutningen overlates til KI, støttes av KI, delautomatiseres med menneskelig kontroll, eller forbli menneskelig?

## Hva pakken inneholder

- styringsnotat for runde 1
- agentprompter for researchtrådene
- zip-/arkivprompten som styrer klargjøringen
- oversikt over manglende filer
- foreløpig kilde- og søkeleadoversikt
- handoff til Codex/GitHub
- prosjektklar kontekstpakke og use case-brief

## Hva pakken ikke inneholder ennå

Pakken inneholder ikke ferdige datafangster. Følgende filer er fortsatt forventet fra egne researchtråder:

- `01_datafangst_malklarhet.md`
- `02_datafangst_separabilitet.md`
- `03_datafangst_forklarbarhet_human_oversight.md`
- `04_datafangst_anti_overreliance.md`
- `05_syntese_ki_beslutningsradar_runde_1.md`

## Anbefalt bruk

1. Bruk promptene i `prompts/` til å kjøre researchtrådene.
2. Legg ferdige datafangster inn i tilsvarende mapper.
3. Oppdater `manifest.md` og `sources/kildeoversikt.md`.
4. Kjør syntesetråden.
5. Først deretter send pakken videre til Codex/GitHub.
