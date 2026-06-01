---
title: "Issues: HR Strategiradar MVP"
date: 2026-05-12
status: completed
tags: [issues, mvp, typescript, hr-strategiradar]
category: issues
source_prd: prd/hr_strategiradar_mvp_prd.md
---

# Issues: HR Strategiradar MVP

Denne listen bryter PRD-en ned i vertikale, testbare issues. Den er lokal og oppretter ikke GitHub-issues.

## Anbefalt rekkefølge og Status

1. `HRSR-001` låser appskjelett og testverktøy. -> **Status: `completed`**
2. `HRSR-002` bygger domenekontrakter og fixtures, inkludert konkret KI-bruksoppgave som vurderingsenhet. -> **Status: `completed`**
3. `HRSR-003` bygger score, stoppregler og rolle-tak. -> **Status: `completed`**
4. `HRSR-004` bygger HR-strategilag og randsoner. -> **Status: `completed`**
5. `HRSR-005` bygger rapport og eksport. -> **Status: `completed`**
6. `HRSR-006` bygger workbench-shell og wizard-state. -> **Status: `completed`**
7. `HRSR-007` bygger første tracer bullet-flyt. -> **Status: `completed`**
8. `HRSR-008` bygger beslutningslogg og høy-risiko-gate. -> **Status: `completed`**
9. `HRSR-009` bygger regresjons-/E2E-verifisering. -> **Status: `completed`**

---

## HRSR-001: Scaffold lokal TypeScript-workbench

Status: `completed`

### Mål

Opprette en lokal Vite + React + TypeScript-app med testverktøy, uten domenelogikk.

### Akseptansekriterier

- Appen ligger i `apps/hr-strategiradar/`.
- `npm run dev` starter lokal app.
- `npm test` kjører Vitest.
- `npm run test:e2e` er definert for Playwright.
- TypeScript kjører i strict mode.

---

## HRSR-002: Domenekontrakter og seed-fixtures

Status: `completed`

### Mål

Definere TypeScript-typer, Zod-schemas og første testfixtures for HR-mikroprosjekt, konkret KI-bruksoppgave, risikoflagg, indikatorer, modulskårer, vurderingsresultat, beslutningslogg og handover.

### Akseptansekriterier

- `HrMicroproject`, `AiUseTask`, `RiskFlags`, `DimensionIndicators`, `ModuleScores`, `ValueJudgments`, `AssessmentResult`, `DecisionLog` og `HandoverPacket` finnes som schemas og types.
- Seniorbevaring-casen finnes som fixture basert på HRR-01 i `testcases/hr_strategiradar_realistiske_caser.md`.
- Seniorbevaring-fixturen inneholder minst én anbefalt KI-bruksoppgave: strukturere anonymisert innsikt og tiltakshypoteser.
- Seniorbevaring-fixturen inneholder minst én bruksoppgave som skal bremses: prioritere ansatte eller foreslå individuell tilrettelegging.
- Schema kan representere flere KI-bruksoppgaver per HR-mikroprosjekt.
- Risikoflagg, forventet rolle, kildegrunnlag og stoppregler kan knyttes til hver KI-bruksoppgave.
- Minst fem HR-strategiområder finnes som enum/union (HrStrategyArea).
- Fixtures inneholder ingen persondata.
- Schema-test feiler på manglende tittel, mål, strategiområde, beslutningseier og KI-bruksoppgave.

---

## HRSR-003: Scoremodell, stoppregler og rolle-tak

Status: `completed`

### Mål

Implementere beslutningsradarens kjerne som rene TypeScript-funksjoner.

### Akseptansekriterier

- `calculateCompassScore` bruker målklarhet 0.45 og separabilitet 0.55.
- `calculateControlScore` bruker oversight 0.55 og anti-overreliance 0.45.
- Stoppregler vurderes før rolle.
- `beregnet_rolle` og `forelopig_tillatt_rolle` beregnes separat.
- HR-høyrisiko med lav separabilitet får ikke rolle over `utforskende_stotte`.
- Domenetester dekker høy målklarhet/lav separabilitet.

---

## HRSR-004: HR-strategilag, prosessvalg og randsoner

Status: `completed`

### Mål

Mappe HR-strategiområder og triggere to HR-prosesser, randsoner, lokal verifikasjon og handover-pakke.

### Akseptansekriterier

- Livsfasepolitikk kan aktivere strategi/analyse, HMS og personvern/sikkerhet ved relevante triggere.
- Strategisk rekruttering kan aktivere rekruttering/kompetanse og juridisk kontroll ved habilitet eller kvalifikasjonsrisiko.
- Omstilling kan aktivere lederstøtte, juss, HMS og politikk/administrasjon ved høy uro eller offentlig sensitivitet.
- `buildHandoverPacket` returnerer eier, randsoner, begrunnelse, lokal verifikasjon og neste kontrollpunkt.
- Tester dekker seniorbevaring-casen.

---

## HRSR-005: Rapportgenerator for Markdown og JSON

Status: `completed`

### Mål

Lage filbasert rapportoutput uten database.

### Akseptansekriterier

- `generateMarkdownReport` lager lesbart konsulentnotat.
- `generateJsonExport` lager maskinlesbar eksport.
- Rapporten viser HR-kontekst, stoppregler, rolle-tak, beregnet rolle, tillatt rolle, kontroller, loggkrav og lokal verifikasjon.
- Rapporten sier eksplisitt hva KI ikke bør gjøre.
- Tester dekker at høy-risiko-rapport ikke skjuler stoppregler.

---

## HRSR-006: Workbench-shell og wizard-state

Status: `completed`

### Mål

Bygge første React-arbeidsflate med steg, state og nedstrøms rekalkulering.

### Akseptansekriterier

- Appen viser steg: Strategikart, HR-prosess, KI-kompass, Stoppregler, Kontrollkrav, Rolle, Beslutningslogg, Rapport.
- Bruker kan gå frem og tilbake.
- Endring i tidligere steg rekalkulerer nedstrøms resultat.
- Høyre panel viser kompass, stoppregler, rolle-tak og randsoner.
- State bruker ingen database eller backend.

---

## HRSR-007: Første tracer bullet-flyt: seniorbevaring

Status: `completed`

### Mål

Gjøre seniorbevaring i hjemmetjenesten kjørbar fra strategikart til foreløpig rapport.

### Akseptansekriterier

- Bruker kan laste inn seniorbevaring-fixture.
- Appen foreslår livsfasepolitikk som strategiområde.
- Appen viser relevante HR-randsoner.
- Appen foreslår målklarhet og separabilitet med indikatorbegrunnelse.
- Appen begrenser KI-rolle hvis lav separabilitet, rettighets-/arbeidspåvirkning eller svak oversight utløses.

---

## HRSR-008: Beslutningslogg og høy-risiko-gate

Status: `completed`

### Mål

Implementere loggkrav for lavrisiko og høy-risiko med sperre for ufullstendig høy-risiko-rapport.

### Akseptansekriterier

- Høy-risiko saker krever forhåndsvurdering, motargument, verifikasjon, usikkerhet og sluttvurdering.
- Manglende høy-risiko-logg utløser `SR-05`.
- Lavrisiko-logg har enklere minimumsfelter.
- UI viser hvorfor rapport ikke er klar hvis logg mangler.
- Tester dekker at høy-risiko ikke kan fullføres uten logg.

---

## HRSR-009: Regresjon, E2E og MVP-godkjenning

Status: `completed`

### Mål

Verifisere at appen følger PRD og evalplan før videre bygging.

### Akseptansekriterier

- Vitest dekker score/stoppregler, HR-randsoner, beslutningslogg og rapport.
- Playwright/Vitest tester dekker de 5 krevde casetypene: lavrisiko standard, HR/høyrisiko, offentlig rettighetscase, strategisk beslutning og sårbar part.
- Test viser at stoppregler vises før rolle.
- Test viser at `beregnet_rolle` og `forelopig_tillatt_rolle` er separate.
- Test viser at høy-risiko logg ikke kan hoppes over.
- Evalresultat skrives til `evals/mvp_case_eval_report.md`.
