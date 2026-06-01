---
title: Kilderegister og strukturvalg
date: 2026-05-12
status: ready
tags: [kilderegister, struktur, provenance]
category: intake
---

# Kilderegister og strukturvalg

## Mottatte zip-filer

| Pakke | Lokal kilde | Bruk i workspace | Vurdering |
|---|---|---|---|
| Grunnfundament med bilder | `C:\Users\larse\Downloads\ki_beslutningsradar_grunnfundament_med_bilder.zip` | `archive/source_packages/grunnfundament_med_bilder/`, `concepts/`, `decision_model/`, `assets/images/` | Kanonisk grunnfundament fordi den inneholder samme struktur som grunnpakken pluss bildegrunnlag. |
| Grunnfundament uten bilder | `C:\Users\larse\Downloads\ki_beslutningsradar_grunnfundament.zip` | `archive/source_packages/grunnfundament_uten_bilder/` | Arkivert for sporbarhet, ikke brukt som kanonisk fordi bildepakkens innhold er mer komplett. |
| Runde 1 klargjøring | `C:\Users\larse\Downloads\ki_beslutningsradar_runde_1_klargjoring.zip` | `archive/source_packages/runde_1_klargjoring/`, `context_packets/` | Brukes for prosjektkontekst, use case-brief og opprinnelig klargjøringslogikk. |
| Runde 1 klar pakke | `C:\Users\larse\Downloads\ki_beslutningsradar_runde_1.zip` | `archive/source_packages/runde_1_ready/`, `research/runde_1/`, `decision_model/`, `sources/`, `missing/`, `handoff/`, `prompts/` | Kanonisk for runde 1 fordi README og manifest er `status: ready` og pakken inneholder datafangster, syntese og scoremodell. |
| Runde 1 arkivvariant | `C:\Users\larse\Downloads\ki_beslutningsradar_runde_1 (1).zip` | `archive/source_packages/runde_1_archive_variant/`, `intake/`, `quality/` | Brukes som arkiv- og kvalitetsreferanse. Ikke kanonisk for runde 1-innhold fordi den mangler flere ferdige datafangster. |

## Strukturvalg

Repo-roten brukes som workspace-rot. Anbefalingen i handoff-filene om `workspaces/ki_beslutningsradar_runde_1/` er tolket som logisk workspace-navn, fordi denne mappen allerede er et tomt Git-workspace.

## Kanonisk regel

Arbeidsfiler i toppstrukturen skal kunne leses uten å grave i råarkivene. Råarkivene bevares likevel urørt under `archive/source_packages/` slik at alle løftede filer kan spores tilbake til opprinnelig pakke.
