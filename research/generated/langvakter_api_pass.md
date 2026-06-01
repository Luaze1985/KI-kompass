---
title: API-pass for langvakter i helsesektoren
date: 2026-05-18
status: draft
tags:
  - HRR-07
  - datainnhenting
  - langvakter
  - sonar
category: research
---

# API-pass for langvakter i helsesektoren

Dette dokumentet beskriver forste implementerte innhentingspass for `HRR-07 langvakter i helsesektoren`.

## Status

- Sonar/Perplexity-adapter er lagt bak en egen importpipeline.
- API-nokkel leses fra `PPLX_API_KEY`, `SONAR_API_KEY` eller `PERPLEXITY_API_KEY`.
- API-prompten leser presisjonsfilter fra `research/generated/langvakter_api_presisjonsfilter.md`.
- Importerte API-funn skal starte som `review_status: draft`.
- Backend-/diagnosefunksjoner skal bare bruke funn med `review_status: approved`.

## Seedet grunnlag

Det forelopige datasettet i `data/research/langvakter_findings.json` bygger pa eksisterende researchgrunnlag i prosjektet og dekker:

- forsvarlig arbeidstid, hvile, pauser og HMS
- avtaleverk, tillitsvalgte, verneombud og lokal godkjenning
- forskning pa belastning, restitusjon og samlet arbeidsmiljorisiko
- organisatoriske vilkar som bemanning, kompetanse, kontinuitet og frivillighet

## Bruk i MVP

Funnene skal brukes som kildeankret kontekst for forelopig KI-diagnose. De skal ikke endre scoremodell, kompassakse eller stoppregler automatisk.

Stoppregler og lokal verifikasjon skal vurderes for KI-rolle. Ingen vurdering skal ende i et uforbeholdent svar om at saken kan automatiseres.

## Presisjonsregel

API-draft skal kurateres mot `langvakter_api_presisjonsfilter.md` før funn kan flyttes til godkjent datasett. Målet er ikke flest mulig funn, men et lite sett med presise funn som dekker regel/avtale, HMS/forsvarlighet, pasient-/brukersikkerhet og lokal verifikasjon.
