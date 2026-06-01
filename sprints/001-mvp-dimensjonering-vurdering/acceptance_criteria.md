---
title: MVP dimensjonering og vurdering acceptance criteria
date: 2026-05-12
status: prd-ready
tags: [sprint, acceptance-criteria, validation, mvp]
category: workflow
---

# Acceptance Criteria

## Ferdig betyr

- [x] Første bruker er valgt: prosjekteier som konsulent.
- [x] Første harde beslutningstype er valgt: strategisk HR / livsfasepolitikk.
- [x] MVP-flyten følger kart -> kompass -> stoppregler -> kontrollkrav -> rolle -> logg.
- [x] `beregnet_rolle` og `forelopig_tillatt_rolle` er separate.
- [x] Høy-risiko saker krever beslutningslogg.
- [ ] Runde 1-casene kan brukes som regresjonssett.
- [ ] Runde 1-casene har indikator-mapping for målklarhet og separabilitet.
- [x] Brukerens verdivurderingspunkter er valgt.
- [x] Handoff til bygger er skrevet og filbasert.
- [x] PRD er skrevet.
- [x] PRD er delt opp i lokale issues.
- [x] Superpowers-implementeringsplan er skrevet.

## Tester

- [ ] Test for lavrisiko standardoppgave.
- [ ] Test for HR/høy-risiko.
- [ ] Test for offentlig rettighetscase.
- [ ] Test for strategisk beslutning.
- [ ] Test for sårbar kunde.
- [x] Test for strategisk HR/livsfasepolitikk-mikroprosjekt er definert som seniorbevaring tracer bullet.

## Validering

- [ ] Evalrubrikken i `evals/mvp_case_eval_plan.md` er dekket.
- [ ] Ingen appkode er skrevet før godkjenning.
- [ ] Ingen råkilder under `archive/source_packages/` er endret.
- [ ] `stateful_graph` er ikke brukt som første MVP-arkitektur.

## Skal ikke godkjennes hvis

- [ ] Appen viser score som fasit.
- [ ] Stoppregler kommer etter rolle.
- [ ] Forklarbarhet behandles som kompassakse.
- [ ] Linser inngår i score uten egen operasjonalisering.
- [ ] Høy-risiko beslutningslogg kan hoppes over.
- [ ] Wizarden krever database, innlogging eller flerbrukerflyt.
