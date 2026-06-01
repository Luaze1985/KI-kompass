---
title: Claude handoff for grill-me-runde
date: 2026-05-12
status: ready
tags: [handoff, claude, grill-me, arkitektur]
category: handoff
---

# Claude handoff for grill-me-runde

## Rolle

Du er Claude og skal grille prosjektideen før videre MVP- eller apparbeid.

Din jobb er ikke å være enig. Din jobb er å avdekke uklare krav, svake antakelser, edge cases, feilslutninger, datamodellrisiko, testsvakheter og steder der modellen kan gi falsk trygghet.

Still maksimalt ett til to spørsmål om gangen og vent på svar.

## Prosjekt

Prosjektet heter KI-beslutningsradar.

Hovedspørsmål:

> Bør denne delen av beslutningen overlates til KI, støttes av KI, delautomatiseres med menneskelig kontroll, eller forbli menneskelig?

Status:

- Workspace-et er `concept_context`.
- Det skal ikke bygges app ennå.
- Det skal ikke bygges database, frontend, backend eller scoringmotor ennå.
- Runde 1 har grunnfundament, datafangster, syntese, scoremodell, arkitekturanalyse, testcaser, stoppregelkontrakt, lagskille og beslutningsloggkontrakt.
- Det finnes nå en MVP-forberedende struktur basert på produksjonsbasens harness-mønster.

## Les først

Les disse filene i denne rekkefølgen:

1. `state/context/current_context.md`
2. `docs/architecture/2026-05-12-runde-1-arkitekturanalyse.md`
3. `testcases/runde_1_testcaser.md`
4. `decision_model/stoppregel_og_scorekontrakt.md`
5. `decision_model/lagskille_og_beslutningsflyt.md`
6. `decision_model/beslutningslogg_kontrakt.md`
7. `decision_model/scoremodell_runde_1.md`
8. `decision_model/syntese_runde_1.md`
9. `docs/architecture/2026-05-12-produksjonsbase-mvp-oppsett.md`
10. `app_spec/mvp_dimensjonering_og_vurdering.md`
11. `evals/mvp_case_eval_plan.md`
12. `sprints/001-mvp-dimensjonering-vurdering/requirements.md`
13. `sprints/001-mvp-dimensjonering-vurdering/blueprint.md`
14. `sprints/001-mvp-dimensjonering-vurdering/acceptance_criteria.md`
15. `reviews/claude/001_mvp_setup_review_packet.md`

Bruk råpakkene under `archive/source_packages/` kun hvis du trenger proveniens.

## Det som er besluttet så langt

- Kart skal komme før kompass.
- Kompass består av målklarhet og separabilitet.
- Forklarbarhet, human oversight og anti-overreliance er kontrollkrav, ikke kompassakser.
- Linser skal ikke gjøres til kompassdimensjoner i runde 1.
- Stoppregler skal vurderes før score.
- Score gir bare `beregnet_rolle`.
- Stoppregler gir `rolle_tak`.
- Sluttresultatet er `forelopig_tillatt_rolle`, ikke fasit.
- Beslutningslogg er obligatorisk i høy-risiko saker.
- Automatisert beslutning er ikke et MVP-mål i runde 1.
- Foreløpig MVP-oppsett bruker `stateful_graph`, `architect_builder_verifier` og `typescript_app` som kandidatvalg, ikke endelige tekniske beslutninger.

## Grillingmål

Press spesielt på disse punktene:

1. Er hovedspørsmålet presist nok til å styre et faktisk verktøy?
2. Er skillet mellom målklarhet og separabilitet forståelig nok for en rådgiver eller kunde?
3. Er stoppreglene for grove, for mange eller for svake?
4. Kan `rolle_tak` skape falsk trygghet selv om vi sier at rollen er foreløpig?
5. Er beslutningsloggen for tung til å bli brukt i praksis?
6. Er case-settet representativt nok, eller mangler det kritiske moteksempler?
7. Hvor kan brukeren fremdeles misforstå output som en anbefaling om automatisering?
8. Hva må avklares før MVP-scope kan skrives?
9. Er `stateful_graph` riktig modell for første MVP, eller er en enkel wizard nok?
10. Er sprintpakken konkret nok til at en bygger ikke må gjette?
11. Er `typescript_app` riktig første kodebaseprofil, eller bør første prototype være enklere?

## Første spørsmål du bør stille brukeren

Start med disse to, og vent på svar:

1. Hvem er første reelle bruker: rådgiver/konsulent, intern ledergruppe, offentlig saksbehandler, eller selvbetjent kunde?
2. Hvilken beslutningstype skal være første harde test: HR, offentlig sektor, SMB-drift, strategi eller kundedialog?

Deretter bør du utfordre MVP-oppsettet:

1. Er dette fortsatt en konseptpakke, eller er den moden nok til coding-sprint?
2. Hvilket krav må fjernes eller forenkles for at første MVP ikke blir for tung?

## Ting du ikke skal gjøre

- Ikke foreslå appdesign før målgruppe og første beslutningstype er låst.
- Ikke godta "KI-rolle" som endelig anbefaling.
- Ikke la høy score overstyre stoppregler.
- Ikke gjøre dette til en generell AI-readiness-test.
- Ikke gjøre full AI Act-compliance til MVP-scope.
- Ikke foreslå automatisert beslutning som første produktmål.
- Ikke godta `stateful_graph` eller `typescript_app` uten å teste om enklere oppsett er bedre.

## Ønsket output fra grillingen

Etter grillingen skal du levere:

- avklarte suksesskriterier
- tydelig in/out of scope
- prioriterte edge cases
- svakeste antakelser
- hvilke caser som må legges til
- om neste steg bør være PRD, flere testcaser eller MVP-avgrensning
- om sprintpakken bør godkjennes, endres eller parkeres
