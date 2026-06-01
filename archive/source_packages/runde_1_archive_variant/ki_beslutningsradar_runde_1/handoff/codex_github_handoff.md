---
title: Codex GitHub handoff
date: 2026-05-12
status: draft
tags: [handoff, codex, github]
category: ki-beslutningsradar
---


# Codex/GitHub-handoff

## Anbefalt workspace-navn
`ki_beslutningsradar_runde_1`

## Anbefalt profil
`concept_context`

Begrunnelse: Arbeidet er fortsatt konsept-, kilde- og kontekstpakking. Det er ikke appbygging, kodeimplementering eller MVP ennå.

## Foreslått plassering

```text
workspaces/ki_beslutningsradar_runde_1/
```

## Filer som skal inn først

```text
README.md
manifest.md
intake/inntakskontroll.md
quality/kvalitetskontroll_for_zip.md
04_anti_overreliance/04_datafangst_anti_overreliance.md
sources/kildeoversikt.md
missing/mangelliste_og_neste_sok.md
handoff/codex_github_handoff.md
```

## Hva Codex skal gjøre først

1. Opprette workspace med `concept_context`.
2. Legge inn zip-filene i riktig mappe.
3. Sikre at alle Markdown-filer har YAML-frontmatter.
4. Markere manglende datafangster som `status: missing`.
5. Ikke forsøke å lage app.
6. Lage første task i `tasks/active/`: `suppler_malklarhet_og_separabilitet.md`.
7. Lage `state/context/current_context.md` med prosjektets hovedspørsmål og avgrensninger.

## Hva Codex ikke skal gjøre

- Ikke bygge app.
- Ikke lage UI.
- Ikke lage database.
- Ikke endre hovedmodellen.
- Ikke slå sammen målklarhet og separabilitet.
- Ikke gjøre forklarbarhet til kompassakse.
- Ikke gjøre linser til kompassdimensjoner.
- Ikke automatisere dømmekraft.

## Neste nyttige Codex-pass

Codex bør kun strukturere workspace og legge inn filer. Neste faglige steg er en ny research-/datafangsttråd for målklarhet eller separabilitet.
