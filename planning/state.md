---
title: MVP State
date: 2026-05-23
status: completed
tags: [planning, state, mvp]
category: planning
---

# MVP State

## Nåværende fase

**Første app-skall og domenekontrakter er fullført.**
Prosjektet har passert den grundige arkitektur- og subagentvurderingen og er nå godkjent for å gå videre (`continue`). Alle kjerneberegninger, stoppregler, enhetstester, seed-fixtures og wizard-UI er ferdigstilt og verifisert.

## Nåværende mål

Gjennomføre brukertester og samle tilbakemeldinger på wizarden for strategiske HR-mikroprosjekter (særlig livsfasepolitikk).

## Fullført og Verifisert (`completed`)

- **Appskall og UI-flyt** i `apps/hr-strategiradar/` (Vite, React, Zustand store med full rekalkulering).
- **Domeneskjemaer (schemas)** med strikte enums for strategiområder og oppgavetyper, samt kontrakter for `AssessmentResult`, `HandoverPacket` og `DimensionIndicators`.
- **Beregning og scoremotor** (målklarhet, separabilitet, anti-overreliance og forklarbarhet).
- **Stoppregler og rolletak** (SR-01 til SR-08, reaktiv evaluering og sperring av allowed role).
- **Beslutningslogg-gate** (SR-05-sperring for høyrisikosaker inntil loggen er fullført).
- **Rapportgenerator** (Markdown og JSON-eksport integrert direkte i klientsiden).
- **Realistisk testsett** (Fixtures for 8 HRR-caser komplett med oppgavevarianter).
- **Vitest enhetstester** (8 testfiler med 82 enhetstester, 100 % passert).
- **Evals** (Etablert regresjonsrapport `evals/mvp_case_eval_report.md` med 100 % oppfylte samsvarskrav).

## Ikke påbegynt / Fremtidig (`backlog`)

- **Ekstern backend og database** (bevisst utelatt for første MVP).
- **Innlogging og autentisering** (bevisst utelatt for første MVP).
- **Flerbrukerflyt** (bevisst utelatt for første MVP).

## Neste beslutninger

1. Distribuere wizarden til utvalgte HR-konsulenter for testing og evaluering.
2. Planlegge neste sprint (Sprint 002) for eventuell utvidelse med lokal backend/API-støtte eller integrasjon av anonymisert LLM-RAG.
