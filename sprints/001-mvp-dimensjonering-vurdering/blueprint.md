---
title: MVP dimensjonering og vurdering blueprint
date: 2026-05-12
status: post-grill-draft
tags: [sprint, blueprint, architecture, mvp]
category: workflow
---

# Blueprint

## Teknisk retning

Bygg senere et smalt, passivt wizard-snitt med eksplisitt steg-state og tilbake-knapp. Første sprint skal ikke bygge appen, men låse kontrakten for hvordan appen bør bygges etter grill-me-runden.

`stateful_graph` skal ikke brukes i første MVP.

## Berørte mapper

```text
app_spec/
decision_model/
evals/
sprints/001-mvp-dimensjonering-vurdering/
handoff/
planning/
```

## Filer som kan endres

- `app_spec/mvp_dimensjonering_og_vurdering.md`
- `evals/mvp_case_eval_plan.md`
- `testcases/runde_1_testcaser.md`
- `sprints/001-mvp-dimensjonering-vurdering/*`
- `handoff/*mvp*`
- `planning/*`

## Filer som ikke skal endres uten ny plan

- `archive/source_packages/**`
- `research/runde_1/**`
- `decision_model/scoremodell_runde_1.md`
- `archive/source_packages/**`

## Datamodell / typer

Konseptuelle typer for fremtidig app:

- `AssessmentContext`
- `WizardStep`
- `CompassScores`
- `IndicatorMapping`
- `UserValueJudgement`
- `StopRuleResult`
- `ControlScores`
- `RoleRecommendation`
- `DecisionLog`
- `AssessmentReport`

Disse er ikke tekniske TypeScript-typer ennå. De skal først brukes som konseptuelle kontrakter.

## API / kontrakter

Fremtidig app skal følge disse kontraktene:

- `decision_model/lagskille_og_beslutningsflyt.md`
- `decision_model/stoppregel_og_scorekontrakt.md`
- `decision_model/beslutningslogg_kontrakt.md`
- `testcases/runde_1_testcaser.md` for indikator-kalibrering

## Teststrategi

- Bruk `testcases/runde_1_testcaser.md` som case-regresjon.
- Bruk `evals/mvp_case_eval_plan.md` som evalrubrikk.
- Test at stoppregler begrenser rolle før score vises som anbefaling.
- Test at AI-scoring kan forklare hvilke målklarhet- og separabilitetsindikatorer som trigget.

## Risiko

- Appen kan bli for generisk hvis den utvides utover prosjekteier som konsulent.
- Beslutningslogg kan bli for tung.
- Bruker kan tolke rolle som fasit.
- Tekniske typer kan låse fagmodellen for tidlig.
- Wizard kan bli for tung hvis alle verdivurderinger spørres i alle steg.

## Rollback

Slett eller parker sprintpakken under `archive/parked/` hvis indikator-mapping eller verdivurderingspunkter viser at MVP-snittet må redefineres.

## Valideringskommandoer

```powershell
git status --short
```

Ingen app-tester finnes før kodebase er opprettet.
