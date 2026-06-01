---
title: KI-beslutningsradar runde 1 README
date: 2026-05-12
status: draft
tags: [readme, archive, runde-1]
category: ki-beslutningsradar
---


# KI-beslutningsradar – runde 1

## Hva prosjektet er
KI-beslutningsradaren skal hjelpe til å vurdere om en del av en beslutning bør:

1. overlates til KI,
2. støttes av KI,
3. delautomatiseres med menneskelig kontroll, eller
4. forbli menneskelig.

Arbeidet er foreløpig konsept- og kontekstpakking. Det skal ikke bygges app eller endelig produktmodell fra denne pakken alene.

## Foreløpig modell

### Kart
- virksomhet
- kunde/bruker
- verdiforslag
- strategiske mål
- tiltak
- risiko
- ansvar
- tillit

### Kompass
- målklarhet
- separabilitet

### Fire KI-roller
- utforskende støtte
- forsterket skjønn
- automatisert beslutning
- strategisk autonomi

### Kontrollkrav
- forklarbarhet
- human oversight
- anti-overreliance
- beslutningslogg

### Linser
Faglige vurderingsperspektiver som kan kobles på etter kompasset: jurist, etiker, HR, risiko, personvern, service design, kritisk venn, dataanalytiker osv.

## Hva pakken inneholder
Pakken inneholder:
- ferdig datafangst for anti-overreliance,
- inntakskontroll,
- kvalitetskontroll,
- mangelliste,
- kildeoversikt for anti-overreliance,
- foreløpig manifest,
- prompts/startere for manglende tråder,
- Codex/GitHub-handoff.

## Hva som ikke er ferdig
Følgende deler er ikke mottatt som ferdige filer i denne pakken:
- ledertråd,
- målklarhet,
- separabilitet,
- forklarbarhet + human oversight,
- samlet syntese/kritikk.

Disse ligger som tomme eller delvis utfylte arbeidsfiler for å gjøre strukturen zip-klar, men de skal ikke behandles som ferdige datafangster.

## Hvordan filene skal brukes
1. Start med `manifest.md`.
2. Les `intake/inntakskontroll.md` og `quality/kvalitetskontroll_for_zip.md`.
3. Bruk `04_anti_overreliance/04_datafangst_anti_overreliance.md` som ferdig datafangst.
4. Bruk `missing/mangelliste_og_neste_sok.md` til å styre neste researchrunde.
5. Send `handoff/codex_github_handoff.md` til Codex når workspace skal opprettes.

## Viktige avgrensninger
- Ikke bygg app ennå.
- Ikke lag endelig modell før alle datafangster er kontrollert.
- Ikke bland målklarhet og separabilitet.
- Ikke gjør forklarbarhet til tredje kompassakse.
- Ikke gjør faglinser til kompassdimensjoner.
- Ikke automatiser dømmekraft.
