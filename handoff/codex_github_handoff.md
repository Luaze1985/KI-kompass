---
title: Codex GitHub handoff
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Codex/GitHub-handoff

## Anbefalt workspace-navn

`ki_beslutningsradar_runde_1`

## Anbefalt profil

`concept_context`

Begrunnelse: Arbeidet er foreløpig konsept-, research- og kontekstpakking. Det skal ikke kodes ennå.

## Foreslått plassering

```text
workspaces/ki_beslutningsradar_runde_1/
```

## Filer som skal inn

- `README.md`
- `manifest.md`
- alle mapper fra denne zip-pakken
- `sources/kildeoversikt.md`
- `missing/mangelliste_og_neste_sok.md`
- `handoff/codex_github_handoff.md`

## Hva Codex skal gjøre først

1. Opprette workspace med `concept_context`.
2. Legge inn filene i tilsvarende struktur.
3. Lage `workspace.yml` og lokal `AGENTS.md`.
4. Legge første oppgave i `tasks/active/`:
   - teste scoremodell mot 8–12 caser.
5. Ikke bygge app.

## Hva Codex ikke skal gjøre

- Ikke lage React-app eller backend.
- Ikke låse vekting.
- Ikke gjøre linser til kompassakser.
- Ikke automatisere dømmekraft.
- Ikke slette eller overskrive researchfiler uten arkivnotat.

## Første anbefalte Codex-oppgave

Lag `testcases/runde_1_testcaser.md` med 8–12 caser fordelt på HR, offentlig sektor, SMB, strategi og kundedialog. Skår hver case manuelt mot målklarhet, separabilitet, kontrollkrav og overreliance-risiko.
