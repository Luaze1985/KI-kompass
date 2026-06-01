---
title: Codex GitHub handoff for KI-beslutningsradar
date: 2026-05-12
status: draft
tags: [handoff, codex, github, concept_context]
---


# Codex/GitHub handoff

## Anbefalt workspace-navn

`workspaces/ki_beslutningsradar/`

## Anbefalt profil

`concept_context`

## Begrunnelse

Dette er foreløpig konsept-, research- og kontekstpakking. Det er ikke klart for appkoding.

## Foreslått mappeplassering

```text
workspaces/ki_beslutningsradar/
├── README.md
├── AGENTS.md
├── workspace.yml
├── intake/
├── concepts/
├── context_packets/
├── decision_model/
├── prompts/
├── sources/
├── missing/
├── handoff/
└── tasks/
```

## Filer som bør inn først

- `context/project_context_packet.md`
- `context/use_case_brief.md`
- `00_ledertrad/00_ledertrad_runde_1_seed.md`
- `prompts/`
- `missing/expected_files_not_yet_received.md`
- `sources/kildeoversikt.md`

## Hva Codex skal gjøre først

1. Opprett workspace fra `concept_context`.
2. Legg inn identity-filer.
3. Legg inn første aktive task: fullfør datafangster runde 1.
4. Ikke implementer app.
5. Ikke opprett nytt repo.

## Hva Codex ikke skal gjøre

- ikke bygge frontend
- ikke lage scoringmotor
- ikke lage database
- ikke slette eller overskrive eksisterende prosjektstruktur
- ikke promotere til ny case profile
