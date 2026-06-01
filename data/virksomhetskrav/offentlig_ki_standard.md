---
title: Offentlig KI-standard (Best Practice)
date: 2026-05-21
status: approved
tags: [offentlig sektor, best practice, retningslinjer, personvern, EU AI Act, ROS, DPIA]
category: Virksomhetskrav
---

# Offentlig KI-standard (Best Practice) for virksomheter

Dette dokumentet definerer den felles, harmoniserte virksomhetsstandarden for bruk av kunstig intelligens (KI) i offentlig og privat sektor. Standarden er utarbeidet ved å kombinere de strengeste og mest velfungerende kravene fra **Digitaliseringsdirektoratet (Digdir)**, **NAV**, **Oslo kommune** og **Trondheim kommune**.

Målet med denne standarden er å sikre en etisk, lovmessig og trygg innføring av KI, samtidig som man opprettholder en reell *Human-in-the-loop* (menneskelig kontroll) og motvirker blind tillit (automation bias).

---

## 📋 De 4 kjerneområdene for etterlevelse

Før en KI-oppgave godkjennes og tas i bruk i virksomheten, må saksbehandler og ansvarlig leder gå igjennom og verifisere følgende fire sjekkpunkter:

### 1. 🤝 Lokal forankring og ROS-analyse
* **Krav:** Det må gjennomføres en lokal risiko- og sårbarhetsanalyse (ROS) som spesifikt vurderer informasjonssikkerhet, etiske dilemmaer og personvern for denne bestemte oppgaven.
* **Hensikt:** Sikre at lokale forhold og nyanser er vurdert, og at løsningen er forankret hos ledelsen og berørte parter.

### 2. 🔒 Lukket og godkjent verktøy (DPA)
* **Krav:** Oppgaven skal utelukkende utføres i en lukket og godkjent instans der dataene ikke lagres eller brukes av eksterne leverandører til å trene modeller. Det må foreligge en gyldig og signert databehandleravtale (DPA).
* **Hensikt:** Forhindre utilsiktet deling av sensitive personopplysninger, forretningshemmeligheter eller virksomhetskritiske data.

### 3. 👁️ Menneskelig overoppsyn og kildekritikk (Human-in-the-loop)
* **Krav:** Saksbehandlere må ha reell mulighet til å overvåke, forstå og overstyre modellens svar. Ansatte må ha opplæring i kildekritikk og verifisere fakta for å hindre blind tillit til KI-genererte svar («hallusinering»).
* **Hensikt:** Bevare det menneskelige faglige skjønnet og rettssikkerheten. Algoritmen skal aldri fatte endelige beslutninger alene.

### 4. 📣 Transparens og partsmedvirkning
* **Krav:** Tillitsvalgte, verneombud og berørte ansatte skal involveres i prosessen. Det skal være åpent og tydelig merket for både ansatte og innbyggere når de samhandler med eller mottar innhold fra et KI-system.
* **Hensikt:** Sikre medvirkning, motvirke diskriminering (bias) og bygge tillit til virksomhetens tjenester.

---

## 🚨 Dynamiske risikoutløsere og særskilte tiltak

Visse egenskaper ved saken utløser umiddelbart strengere lovmessige krav som må dokumenteres i saksnotatet:

### A. Behandling av sensitive personopplysninger (GDPR art. 35)
* **Trigger:** Hvis oppgaven behandler helsedata, sykefraværshistorikk, fagforeningsmedlemskap eller sårbare personlige forhold.
* **Særlig krav:** Utløser et ufravikelig krav om formell **Personvernkonsekvensvurdering (DPIA)** i samarbeid med personvernombudet, samt sperre mot bruk av eksterne, åpne verktøy.

### B. Høyrisiko-systemer (EU AI Act)
* **Trigger:** Hvis oppgaven har direkte påvirkning på ansattes rettigheter, stillingsvern, karrieremuligheter, fysisk helse og sikkerhet (HMS), eller innebærer overvåking/kontroll.
* **Særlig krav:** Utløser krav om formell **Fundamentalrettighetsvurdering (FRIA)**, sporbar automatisk logging, samsvarsvurdering og løpende overvåking av modellavvik over tid for å forhindre diskriminering.
