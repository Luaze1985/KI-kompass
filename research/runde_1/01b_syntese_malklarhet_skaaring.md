---
title: Syntese målklarhet skåring
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Syntese: målklarhet, skåring og vekting

## Anbefalt MVP-kjerne

Første MVP bør bruke fire obligatoriske kriterier og tre støtte-kriterier.

| Type | Kriterium | Begrunnelse |
|---|---|---|
| Obligatorisk | målformulering | uten presist mål vet ikke systemet hva som skal optimaliseres |
| Obligatorisk | målbarhet | uten målbare utfall kan ikke kvalitet etterprøves |
| Obligatorisk | enighet | faglig uenighet betyr at målet krever skjønn |
| Obligatorisk | verdikonflikt | sterke verdikonflikter bør stoppe automatisering |
| Støtte | stabilitet | ustabile mål svekker gjenbruk og prediksjon |
| Støtte | regelmessighet | gjentakende mønstre styrker KI-egnethet |
| Støtte | feedback | uten feedback kan løsningen ikke forbedres trygt |

## Tre vektingsmodeller

### Modell A: Lik vekting

Alle syv kriterier teller likt.

- Styrke: enkel, forklarbar, lett å teste.
- Svakhet: verdikonflikt og målformulering blir for svake som stoppkriterier.
- Bruk: første manuelle test.

### Modell B: Risikojustert vekting

| Kriterium | Vekt |
|---|---:|
| målformulering | 20 % |
| målbarhet | 15 % |
| enighet | 15 % |
| stabilitet | 10 % |
| regelmessighet | 10 % |
| feedback | 10 % |
| verdikonflikt | 20 % |

- Styrke: fanger at uklare mål og verdikonflikt kan ødelegge hele vurderingen.
- Svakhet: krever forklaring til bruker.
- Bruk: beste kandidat for MVP.

### Modell C: Gate + poeng

1. Først kontrolleres røde flagg.
2. Hvis ingen stoppregel utløses, beregnes gjennomsnittsskår.
3. Skåren gir foreløpig KI-rolle.

- Styrke: hindrer at høy score på tekniske kriterier skjuler etisk risiko.
- Svakhet: mer kompleks enn ren gjennomsnittsskår.
- Bruk: anbefalt når beslutningen kan påvirke rettigheter, arbeid, helse, økonomi eller tillit.

## Foreløpig prediksjon av KI-rolle

| Målklarhet | Foreløpig betydning | Mulig KI-rolle |
|---|---|---|
| 1,0–2,4 | uklart, normativt eller ikke målbart | menneskelig beslutning / utforskende støtte |
| 2,5–3,4 | delvis klart, men krever tolking | forsterket skjønn |
| 3,5–4,2 | klart nok for strukturert støtte | forsterket skjønn / delautomatisering med kontroll |
| 4,3–5,0 | svært klart og målbart | kandidat for automatisering, men bare hvis separabilitet er høy og kontrollkrav er oppfylt |

## Viktig begrensning

Høy målklarhet alene gir ikke grønt lys for automatisering. Den sier bare at målet er tydelig. Separabilitet, konsekvens ved feil, rettigheter, forklarbarhet, human oversight og anti-overreliance må vurderes før KI-rollen kan fastsettes.
