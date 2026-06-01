---
title: KI-beslutningsradar runde 1 README
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# KI-beslutningsradar runde 1

## Formål

Denne pakken samler første researchrunde for prosjektet KI-beslutningsradar.
Hovedspørsmålet er:

> Bør denne delen av beslutningen overlates til KI, støttes av KI, delautomatiseres med menneskelig kontroll, eller forbli menneskelig?

Pakken er ikke en ferdig app og ikke en endelig produktmodell. Den er et arbeidsgrunnlag for videre syntese, testcaser og eventuell senere MVP.

## Foreløpig modell

1. **Kart:** virksomhet, kunde/bruker, verdiforslag, strategiske mål, tiltak, risiko, ansvar og tillit.
2. **Kompass:** målklarhet og separabilitet.
3. **Kontrollkrav:** forklarbarhet, human oversight, anti-overreliance og beslutningslogg.
4. **Linser:** jurist, etiker, HR, risiko, personvern, service design, kritisk venn, dataanalytiker m.fl.

## Hvordan filene skal brukes

- Start med `00_ledertrad/00_ledertrad_runde_1.md`.
- Les deretter datafangstene i rekkefølge: målklarhet, separabilitet, forklarbarhet/human oversight og anti-overreliance.
- Bruk `05_syntese/scoremodell_runde_1.md` som foreløpig skåringsgrunnlag, ikke som endelig beslutningsmotor.
- Bruk `missing/mangelliste_og_neste_sok.md` før videre research.
- Bruk `handoff/codex_github_handoff.md` hvis materialet skal inn i et workspace eller GitHub.

## Hva som ikke er ferdig

- Vekting er ikke kalibrert med testdata.
- KI-rollene er foreløpige anbefalingskategorier, ikke automatiske konklusjoner.
- Beslutningslogg er bare skissert som kontrollkrav og må utvides.
- Linser er ikke gjort om til kompassdimensjoner.
- App/MVP skal ikke bygges før testcaser og stoppregler er kontrollert.
