---
title: MVP case eval plan
date: 2026-05-12
status: post-grill-ready
tags: [eval, mvp, case-regression]
category: eval
---

# MVP Case Eval Plan

## Objective

Måle om MVP-wizarden vurderer strategiske HR-/livsfasepolitikkbeslutninger i riktig rekkefølge og ikke gir falsk trygghet.

## Scenarios

Bruk `testcases/hr_strategiradar_realistiske_caser.md` som primært MVP-grunnlag for HR Strategiradar.

Første byggesløyfe skal bruke 4 realistiske HR-caser:

- HRR-01 Seniorbevaring i hjemmetjenesten.
- HRR-02 Gradert sykefravær og tilrettelegging i turnus.
- HRR-04 Rekruttering av kritisk helsefagkompetanse.
- HRR-07 Langvakter i helsesektoren.

Full MVP-regresjon skal bruke alle 8 HRR-casene i det realistiske settet. De gamle 10 casene i `testcases/runde_1_testcaser.md` beholdes som sekundært kontrollsett for å sjekke at kompasset ikke bare fungerer i HR.

Evalen skal særlig teste at samme HR-mikroprosjekt kan gi ulike roller for ulike KI-bruksoppgaver:

- strukturering, oppsummering og møteforberedelse som mulig støtte
- rangering, individuell prioritering, tilrettelegging eller arbeidstakerscore som bremses av stoppregler
- aggregerte scenarioer som skilles fra beslutninger om enkeltpersoner

## Rubric

Pass:

- kart kommer før score
- stoppregler vises før rolle
- `beregnet_rolle` og `forelopig_tillatt_rolle` skilles tydelig
- høy-risiko saker krever beslutningslogg
- lav separabilitet setter rolle-tak
- svak human oversight setter rolle-tak
- ingen case sier at KI kan fatte beslutningen alene
- AI-score viser indikatorene som trigget
- wizarden kan gå tilbake og rekalkulere nedstrøms vurderinger

Fail:

- score vises som fasit
- høy målklarhet gir grønt lys uten separabilitet
- stoppregler vises bare som etterfølgende advarsel
- beslutningslogg kan hoppes over i høy-risiko sak
- appen blander linser inn i kompass-score
- appen krever database eller flerbrukerflyt i første MVP
- appen bruker stateful graph eller sokratisk motpart i første MVP

## Evidence

- raw results: senere testkjøring mot app eller prototype
- summary report: `evals/mvp_case_eval_report.md`
