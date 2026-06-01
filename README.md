---
title: KI-beslutningsradar workspace
date: 2026-05-12
status: structured
tags: [ki-beslutningsradar, concept_context, workspace]
category: workspace
---

# KI-beslutningsradar

Dette workspace-et samler grunnfundament, researchrunde 1, syntese, scoremodell, kilder og handoff for KI-beslutningsradaren.

Arbeidet er fortsatt `concept_context`. Det skal ikke bygges app, database, frontend eller endelig beslutningsmotor fra dette grunnlaget alene.

## Hovedspørsmål

> Bør denne delen av beslutningen overlates til KI, støttes av KI, delautomatiseres med menneskelig kontroll, eller forbli menneskelig?

## Kanonisk struktur

```text
.
├── intake/              # kildeinntak, grunnfundament og arkivkontroll
├── concepts/            # hovedpremiss, kart, kompass, dimensjoner og KI-roller
├── decision_model/      # konseptuell datamodell, syntese og foreløpig scoremodell
├── research/runde_1/    # datafangster fra komplett runde 1-pakke
├── context_packets/     # prosjektkontekst og use case-brief
├── app_spec/            # MVP-avgrensning, ikke appimplementering
├── prompts/             # researchprompter fra runde 1
├── sources/             # samlet kildeoversikt
├── missing/             # mangler, sluttkontroll og neste søk
├── handoff/             # Codex/GitHub-handoff fra kildematerialet
├── quality/             # kvalitetskontroll fra arkivvariant
├── testcases/           # neste arbeidsflate for case-testing
├── tasks/active/        # aktive arbeidsoppgaver
├── state/context/       # nåværende prosjektkontekst
├── assets/images/       # bildegrunnlag fra grunnfundamentet
└── archive/source_packages/ # urørte, utpakkede kildepakker
```

## Leserekkefølge

1. `state/context/current_context.md`
2. `archive/source_packages/ki_kompasset_komprimert_md/ki_kompasset_komprimert_md/README.md` (Det nye primære rammeverket)
3. `planning/sprint_plan_ki_kompass_alignment.md` (Integrasjonsplanen)
4. `concepts/hovedpremiss.md`
5. `concepts/kart_og_kompass.md`
6. `decision_model/syntese_runde_1.md`
7. `decision_model/scoremodell_runde_1.md`

## Neste anbefalte arbeid

Vi har lagt til det kanoniske rammeverket for KI-kompasset (Berge & Knudsen) under `archive/source_packages/ki_kompasset_komprimert_md/`.

Neste planlagte arbeid er beskrevet i **`planning/sprint_plan_ki_kompass_alignment.md`**, som omhandler samkjøring av kildekode og UI i `apps/hr-strategiradar/` med den offisielle teorien.
