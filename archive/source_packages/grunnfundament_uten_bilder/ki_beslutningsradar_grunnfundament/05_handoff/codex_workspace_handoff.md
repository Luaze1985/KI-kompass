---
title: "Codex workspace handoff for KI-beslutningsradar"
date: 2026-05-12
status: draft
tags: [codex, github, handoff, workspace]
category: concept-context
chunk_type: handoff
---

# Codex workspace handoff

## Anbefalt workspace

```text
workspaces/ki_beslutningsradar/
```

## Anbefalt profil

```text
concept_context
```

Begrunnelse:

Arbeidet starter fra ideer, bilder, Notion/Drive-materiale, research og konseptuell struktur. Det bør derfor starte som konsept- og kontekstarbeid før eventuell koding.

## Foreslått første struktur

```text
workspaces/ki_beslutningsradar/
├── README.md
├── AGENTS.md
├── workspace.yml
├── intake/
│   └── nhh_bilder_og_grunnpremisser.md
├── concepts/
│   ├── kart_og_kompass.md
│   ├── dimensjoner.md
│   └── kvadranter_og_ki_roller.md
├── decision_model/
│   ├── kriterier.md
│   ├── stoppregler.md
│   └── datamodell.md
├── context_packets/
│   └── project_context_packet.md
├── app_spec/
│   └── mvp_notat.md
└── tasks/
    ├── active/
    └── archive/
```

## Første Codex-oppgave

1. Opprett workspace med `concept_context`.
2. Legg inn grunnfundamentfilene.
3. Opprett første active task: `samle_datafangster_runde_1.md`.
4. Ikke bygg app.
5. Ikke lag ny profil.
6. Ikke flytt dette til coding før syntese og testmodell finnes.

## Hva Codex ikke skal gjøre ennå

- ikke implementere frontend
- ikke lage database
- ikke lage agentpakke
- ikke lage endelig scoring
- ikke slette eller erstatte grunnfundamentet
