---
title: Scoremodell runde 1
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Scoremodell runde 1

## 1. Formål

Denne scoremodellen skal gi en foreløpig prediksjon av KI-rolle. Den skal ikke automatisere dømmekraft.

## 2. Inndata

| Modul | Antall spørsmål | Skala |
|---|---:|---|
| Målklarhet | 7–15 | 1–5 |
| Separabilitet | 8–12 | 1–5 |
| Forklarbarhet/human oversight | 7–10 | 1–5 |
| Anti-overreliance | 7–10 | 1–5 |

## 3. Anbefalt MVP-modell

Bruk **gate + poeng**.

### Steg 1: Stoppregler

Hvis stoppregel er utløst: ikke automatiser.

### Steg 2: Kompass-score

```text
kompass_score = (målklarhet * 0.45) + (separabilitet * 0.55)
```

Separabilitet vektes litt høyere fordi klart mål ikke hjelper hvis beslutningen ikke kan skilles trygt ut.

### Steg 3: Kontroll-score

```text
kontroll_score = (forklarbarhet_oversight * 0.55) + (anti_overreliance * 0.45)
```

Human oversight/forklarbarhet vektes litt høyere fordi det avgjør om ansvarlig person faktisk kan kontrollere systemet.

### Steg 4: Foreløpig rolle

| Kompass-score | Kontroll-score | Rolle |
|---:|---:|---|
| under 2,5 | uansett | menneskelig / utforskende støtte |
| 2,5–3,4 | under 3,5 | utforskende støtte |
| 2,5–3,4 | 3,5+ | forsterket skjønn |
| 3,5–4,2 | 3,5+ | forsterket skjønn / delautomatisering |
| 4,3+ | 4,0+ | kandidat for automatisert beslutning |

## 4. Alternative vektingsmodeller

### A. Enkel gjennomsnittsskår

```text
total = snitt(målklarhet, separabilitet, forklarbarhet_oversight, anti_overreliance)
```

Brukes kun for tidlig test.

### B. Risikojustert modell

```text
kompass = målklarhet*0.4 + separabilitet*0.6
kontroll = forklarbarhet_oversight*0.5 + anti_overreliance*0.5
slutt = kompass*0.6 + kontroll*0.4
```

Passer når appen først skal gi generell anbefaling.

### C. Konservativ modell

```text
rolle styres av laveste modulskår
```

Passer for offentlig sektor, HR, helse, rettigheter og andre høy-risiko områder.

## 5. Prediksjonstekst i app

Appen bør ikke si: «Dette kan automatiseres.»

Den bør si:

> Foreløpig vurdering: Denne beslutningen er kandidat for [KI-rolle], gitt at stoppregler, ansvar, forklarbarhet og beslutningslogg er oppfylt.

## 6. Minimum for MVP

- Bruk gate + poeng.
- Vis alltid hvorfor rollen foreslås.
- Vis røde flagg før rolle.
- Ikke vis grønn anbefaling uten kontrollkrav.
- Lag manuell overstyring og kommentarlogg.
