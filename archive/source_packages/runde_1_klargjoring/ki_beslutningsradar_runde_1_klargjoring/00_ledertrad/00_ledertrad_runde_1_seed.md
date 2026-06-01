---
title: Ledertråd runde 1 seed
date: 2026-05-12
status: draft
tags: [ki-beslutningsradar, runde-1]
---


# Ledertråd – Runde 1

## 1. Prosjektformål

KI-beslutningsradaren skal hjelpe en rådgiver, prosjektgruppe eller ledergruppe å vurdere hvilken rolle KI bør ha i en konkret beslutningsprosess.

Den skal ikke maksimere automatisering. Den skal beskytte menneskelig dømmekraft der ansvar, tillit, rettigheter, verdier eller skjønn står på spill.

## 2. Hovedspørsmål

> Bør denne delen av beslutningen overlates til KI, støttes av KI, delautomatiseres med menneskelig kontroll, eller forbli menneskelig?

## 3. Foreløpig modell

### Kart

Avklarer terrenget før kompasset brukes:

- virksomhet
- kunde/bruker
- verdiforslag
- strategiske mål
- tiltak
- risiko
- ansvar
- tillit

### Kompass

Består av to dimensjoner:

- målklarhet
- separabilitet

Gir fire KI-roller:

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

Faglige perspektiver som kan kobles på etter kompasset, for eksempel jurist, etiker, HR, risiko, personvern, service design, kritisk venn og dataanalytiker.

## 4. Runde 1: Spor

| Nr. | Spor | Formål | Outputfil | Maks kilder | Ferdig-kriterium |
|---|---|---|---|---:|---|
| 1 | Målklarhet | Finne kriterier for klare/uklare mål | `01_datafangst_malklarhet.md` | 8 | kriterier, spørsmål, røde flagg |
| 2 | Separabilitet | Finne kriterier for om KI-output kan brukes direkte | `02_datafangst_separabilitet.md` | 8 | kriterier, spørsmål, røde flagg |
| 3 | Forklarbarhet + human oversight | Finne kontrollkrav | `03_datafangst_forklarbarhet_human_oversight.md` | 8 | kontrollkrav og stoppregler |
| 4 | Anti-overreliance | Finne mekanismer som beskytter dømmekraft | `04_datafangst_anti_overreliance.md` | 8 | tiltak før/under/etter KI |
| 5 | Syntese/kritikk | Samle første testbare modell | `05_syntese_ki_beslutningsradar_runde_1.md` | bruker 1–4 | enkel modell + kritisk review |

## 5. Felles kildekrav

Prioriter:

1. offentlige primærkilder, myndigheter, regulatører og standardiseringsorganer
2. NIST, OECD, EU, Canada, UK, ISO, Digdir, Datatilsynet eller tilsvarende
3. fagfellevurdert forskning eller anerkjente akademiske kilder
4. praktiske veiledere fra seriøse fagmiljøer
5. GitHub kun ved faktisk skjema, scoring, kode, sjekkliste eller metodikk

Unngå generiske AI-artikler, leverandørmarkedsføring og kilder som bare nevner temaet overfladisk.

## 6. Hva som ikke skal gjøres ennå

- ikke bygge app
- ikke lage full produktmodell
- ikke gjøre forklarbarhet til tredje kompassakse
- ikke gjøre linser til kompassdimensjoner
- ikke automatisere dømmekraft
- ikke starte nytt GitHub-repo før workspace-grunnlaget er klart

## 7. Stoppregel for runde 1

Gå til syntese når fire datafangster finnes og hver har:

- maks 8 sterke kilder
- operativ definisjon
- kriterier/kontrollkrav
- app-spørsmål
- røde flagg/stoppregler
- kildekontroll
- handoff til syntese
