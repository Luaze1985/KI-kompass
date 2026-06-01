---
title: Syntese KI-beslutningsradar runde 1
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Syntese: KI-beslutningsradar runde 1

## 1. Kort konklusjon

Runde 1 gir et brukbart grunnlag for en enkel vurderingsmodell, men ikke for ferdig app eller automatisert beslutningsmotor. Den sterkeste modellen er:

1. Kartlegg kontekst.
2. Skår målklarhet.
3. Skår separabilitet.
4. Bruk stoppregler.
5. Vurder kontrollkrav.
6. Foreslå foreløpig KI-rolle.

## 2. Kjernefunn

| Del | Funn | Konsekvens |
|---|---|---|
| Kart | Kontekst må komme før skåring. | Uten kart blir appen for generell. |
| Målklarhet | Klare mål er nødvendig, men ikke nok. | Høy målklarhet kan bare gi kandidatstatus. |
| Separabilitet | Avgjør om KI kan håndtere deloppgaven uten å miste helhet. | Lav separabilitet stopper automatisering. |
| Forklarbarhet | Må være kontrollkrav, ikke akse. | Brukes etter kompasset. |
| Human oversight | Må være reell kontroll. | Gummistempel skal ikke telle. |
| Anti-overreliance | Må bygges inn i arbeidsflyten. | Think-first og verifikasjon bør testes. |
| Beslutningslogg | Må inn før MVP i høy-risiko saker. | Uten logg ingen etterkontroll. |

## 3. Foreløpig beslutningslogikk

| Målklarhet | Separabilitet | Kontrollkrav | Foreløpig KI-rolle |
|---|---|---|---|
| lav | lav/middels/høy | uansett | utforskende støtte eller menneskelig |
| middels | lav | uansett | utforskende støtte |
| middels | middels | middels/høy | forsterket skjønn |
| høy | middels | høy | forsterket skjønn / delautomatisering |
| høy | høy | høy | kandidat for automatisert beslutning |
| høy | høy | lav | ikke automatiser før kontrollkrav er løst |

## 4. Stoppregler

Automatisering skal stoppes hvis ett av disse punktene gjelder:

- Beslutningen har rettsvirkning eller betydelig påvirkning og mangler reell menneskelig kontroll.
- Målet er preget av sterk verdikonflikt.
- Beslutningen krever relasjonell tillit eller moralsk skjønn.
- Feil er vanskelige å oppdage eller reversere.
- Ansvarlig person kan ikke forklare beslutningen.
- KI-output kan ikke verifiseres.
- Beslutningslogg mangler i høy-risiko sak.

## 5. Anbefalt MVP-avgrensning

MVP bør ikke forsøke å avgjøre alt. Den bør bare gjøre tre ting:

1. Stille gode vurderingsspørsmål.
2. Varsle røde flagg.
3. Foreslå foreløpig KI-rolle med begrunnelse.

MVP bør ikke fatte beslutningen.

## 6. Modellrisiko

- Vekting kan gi falsk presisjon.
- Høy gjennomsnittsskår kan skjule alvorlig stoppregel.
- Brukere kan oppfatte KI-rolle som fasit.
- Forklarbarhet kan bli pynt hvis den ikke kobles til reell kontroll.
- Faglinser kan utvanne modellen hvis de blir egne akser.

## 7. Neste beslutning

Neste runde bør teste modellen på 8–12 caser. Først etter test bør vekting låses og appflyt skisseres.
