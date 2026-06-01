---
title: MVP dimensjonering og vurdering handoff prompt
date: 2026-05-12
status: post-grill-draft
tags: [sprint, handoff, mvp]
category: workflow
---

# Handoff Prompt

Du skal ikke bygge appen før indikator-mapping og brukerens verdivurderingspunkter er avklart.

Når bygging godkjennes, skal du lage et smalt, passivt wizard-MVP-snitt for KI-beslutningsradaren som følger:

```text
Kart -> Kompass -> Stoppregler -> Kontrollkrav -> Rolle-tak -> Foreløpig KI-rolle -> Beslutningslogg -> Rapport
```

Første bruker er prosjekteier selv som konsulent.

Første beslutningstype er strategisk HR: mikroprosjekter innenfor livsfasepolitikk.

Les først:

1. `app_spec/mvp_dimensjonering_og_vurdering.md`
2. `decision_model/lagskille_og_beslutningsflyt.md`
3. `decision_model/stoppregel_og_scorekontrakt.md`
4. `decision_model/beslutningslogg_kontrakt.md`
5. `testcases/runde_1_testcaser.md`
6. `evals/mvp_case_eval_plan.md`
7. `handoff/codex_post_grill_handoff.md`

Ikke gjør:

- ikke bygg database uten ny plan
- ikke bygg innlogging
- ikke gjør KI-rolle til fasit
- ikke gjør full AI Act-compliance
- ikke endre råresearch
- ikke bruk stateful_graph i første MVP
- ikke bygg sokratisk motpart eller linsesystem

Byggeren skal levere:

- smal vurderingsflyt
- tilbake-knapp med nedstrøms rekalkulering
- AI-score med indikatorbegrunnelse
- brukerens verdivurderingspunkter
- tydelig state for hvert steg
- rapportutkast
- tester mot runde 1-caser
- kort verifikasjonsnotat
