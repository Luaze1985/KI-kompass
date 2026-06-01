---
title: Claude handoff for datainnhenting og modellkalibrering
date: 2026-05-13
status: ready
tags: [handoff, claude, deep-research, datainnhenting, hr-strategiradar]
category: handoff
---

# Claude handoff for datainnhenting og modellkalibrering

## Rolle

Du er Claude og skal vurdere om HR Strategiradar har nok grunnlagsdata til å bygge logikk, beregninger og vurderinger bak hvert appsteg.

Din jobb er ikke å bygge appen. Din jobb er å grille datagrunnlaget og, ved behov, foreslå eller gjennomføre dypere datainnhenting som kan kalibrere modellen.

## Kort status

Codex har vurdert at prosjektet har nok grunnlag til en deterministisk MVP, men ikke nok til å hevde at modellen er faglig kalibrert.

Arbeidsvurdering:

```text
75-80 % nok grunnlag for deterministisk MVP-logikk.
50-60 % nok grunnlag for kalibrert/faglig robust vurderingsmodell.
```

Det største gapet er ikke mer teori. Det største gapet er å gjøre indikatorer, stoppregler og caseforventninger maskinlesbare.

## Les først

Les i denne rekkefølgen:

1. `CLAUDE.md`
2. `AGENTS.md`
3. `app_spec/brukerreise_hr_strategiradar.md`
4. `app_spec/arbeidsflyt_og_beregningsmodell.md`
5. `testcases/hr_strategiradar_realistiske_caser.md`
6. `decision_model/stoppregel_og_scorekontrakt.md`
7. `decision_model/scoremodell_runde_1.md`
8. `decision_model/beslutningslogg_kontrakt.md`
9. `tasks/active/hrsr_002_domain_schemas_and_fixtures.md`
10. `issues/hr_strategiradar_mvp_issues.md`

Bruk `archive/source_packages/` kun for proveniens. Ikke endre råpakkene.

## Kanonisk produktforståelse

HR Strategiradar er ikke et score-skjema. Det er en veiledet diagnose.

Kanonisk flyt:

```text
Forstå situasjonen
-> bygg kartet
-> velg KI-bruksoppgave
-> still to kompass-spørsmål
-> gjør verdivurderinger
-> se kompassplassering
-> vurder stoppregler
-> skill beregnet rolle fra tillatt rolle
-> dokumenter ansvar
-> lag beslutningsklart notat
```

Viktigste modellregel:

> HR-mikroprosjektet er kontekst. KI-bruksoppgaven er vurderingsenheten.

Claude skal ikke vurdere hele HR-prosjektet som én score. Hver konkret KI-bruksoppgave må vurderes separat.

## Hva vi allerede har

Prosjektet har:

- brukerreise for appen
- arbeidsflyt og beregningsmodell
- scoreformler for kompass og kontroll
- stoppregelkontrakt med rolle-tak
- beslutningsloggkontrakt
- realistiske HR-caser
- PRD og issue-plan
- lokal React/TypeScript-appskall

Primært casegrunnlag:

- `testcases/hr_strategiradar_realistiske_caser.md`

Første research- og byggesløyfe:

1. HRR-01 Seniorbevaring i hjemmetjenesten
2. HRR-02 Gradert sykefravær og tilrettelegging i turnus
3. HRR-04 Rekruttering av kritisk helsefagkompetanse
4. Langvakter i helsesektoren

Fullt realistisk MVP-regresjonssett:

- alle 8 HRR-caser

Sekundært kontrollsett:

- `testcases/runde_1_testcaser.md`

## Foreløpig datagap

Dette er Codex sin nåværende vurdering av hva som mangler:

| Område | Dekning nå | Gap |
|---|---:|---|
| HR-kontekst/kart | 80 % | Fast mapping fra strategiområde/triggere til HR-prosess, randsoner og risikoflagg |
| KI-bruksoppgave | 85 % | Flere KI-bruksoppgaver per HR-case må støttes maskinelt |
| Verdivurderinger | 75 % | Presise spørsmålstekster og effekt på separabilitet/stoppregler |
| Målklarhet | 65 % | 1-5 scoring-rubrikk per indikator |
| Separabilitet | 60 % | Tydeligere regler for lokal praksis, skjønn, rettigheter og relasjon |
| Forklarbarhet/oversight | 70 % | Kriterier for reell menneskelig kontroll |
| Anti-overreliance | 65 % | Konkrete UI-/loggkrav som hindrer gummistempel |
| Scoreberegning | 90 % | Formlene finnes; trenger implementering og tester |
| Stoppregler/rolle-tak | 80 % | Maskinlesbar trigger-matrise og prioritet ved flere stoppregler |
| Beslutningslogg | 75 % | Schema for lavrisiko/høyrisiko og rapport-blokkering |
| Rapport/handover | 70 % | Endelig rapportmal og lokal verifikasjon |
| Case-regresjon | 65 % | Forventet output må struktureres som fixtures/test-orakler |

## Din oppgave

Lever én av to ting, avhengig av hva du finner:

### Alternativ A: Datagrunnlaget er nok til HRSR-002 og HRSR-003

Da skal du levere:

1. Kort begrunnelse for hvorfor vi kan bygge videre nå.
2. Eksakt minimumsdata som må inn i fixtures.
3. Hvilke datagap som kan vente til etter første kjørbare MVP.

### Alternativ B: Det trengs deep research før logikken bygges

Da skal du levere:

1. Prioritert researchplan med maks 5 researchspor.
2. Hvilke konkrete data hvert spor skal gi appmodellen.
3. Kildekandidater og søketermer.
4. Hvilke HRSR-issues som må pauses eller justeres.

Ikke foreslå research som ikke påvirker schema, scoring, stoppregler, beslutningslogg eller eval.

## Hvis du gjør deep research

Prioriter disse sporene:

### Spor 1: HR-senior og livsfasepolitikk

Mål:

- kalibrere HRR-01
- finne realistiske tiltakstyper, beslutningseiere, verifikasjonskrav og rettferdighetskonflikter

Kildekandidater:

- KS om lengre arbeidsliv i kommunesektoren
- Arbeidstilsynet om senior i arbeidslivet
- Senter for seniorpolitikk
- relevante kommunale arbeidsgiverstrategier

Output til appen:

- casefelt for `knownFacts`, `uncertainties`, `riskFlags`
- indikatorrubrikk for separabilitet
- stoppregler som typisk skal slå inn

### Spor 2: Sykefravær, tilrettelegging og HMS

Mål:

- kalibrere HRR-02
- skille møte-/oppfølgingsstruktur fra individuell tilrettelegging

Kildekandidater:

- Arbeidstilsynet om oppfølging av sykmeldte
- NAV om sykefraværsoppfølging
- relevante IA-/HMS-veiledere
- SSB sykefravær

Output til appen:

- felter for kollegabelastning, HMS-effekt og persondata-risiko
- regler for når `SR-01`, `SR-02`, `SR-05` og `SR-08` skal trigges

### Spor 3: Rekruttering og kandidatvurdering

Mål:

- kalibrere HRR-04
- skille kravprofil/intervjuguide fra kandidat-rangering

Kildekandidater:

- EU AI Act om arbeid, rekruttering og arbeidstakerstyring
- Datatilsynet om KI, personvern og arbeidsliv
- offentlige veiledere om kvalifikasjonsprinsipp og diskriminering

Output til appen:

- høyrisiko-flagg for rekruttering
- rolle-tak for rangering, scoring og match-score
- forventet stoppregelsett

### Spor 4: Langvakter i helsesektoren

Mål:

- kalibrere en konkret arbeidstids-/turnuscase
- skille KI-støtte til analyse og scenarioarbeid fra individuell turnustildeling
- fange HMS, hviletid, bemanning, kontinuitet, rettferdighet, frivillighet og lokal gjennomførbarhet

Kildekandidater:

- Arbeidstilsynet om arbeidstid, turnus, hviletid og HMS
- KS om heltidskultur og kommunal helse- og omsorgstjeneste
- Helsedirektoratet der bemanning/kvalitet er relevant
- FAFO, STAMI eller andre forskningsrapporter om langvakter, turnus, helse og arbeidsmiljø
- partskilder som KS, Fagforbundet, NSF og Spekter når de belyser lokale avtaler og gjennomføring

Output til appen:

- risikoflagg for arbeidstid, HMS, bruker-/pasientsikkerhet, lokal avtale og rettferdig fordeling
- indikatorrubrikk for målklarhet og separabilitet i arbeidstidsprosjekter
- stoppregler for individuell tildeling, lav separabilitet, manglende lokal verifikasjon og manglende beslutningslogg
- lokale verifikasjonskrav før rapport
- skille mellom aggregert scenarioanalyse og personrettet turnusbeslutning

### Spor 5: Ikke prioritert i denne runden

Arbeidsplasspersonvern/overvåking og generelt spor om human oversight / automation bias er parkert for denne datainnhentingen.

Ikke bruk researchkapasitet på disse med mindre funnene er direkte nødvendige for langvakt-casen.

## Minimumsdata som bør finnes per case

For hver realistiske HR-case bør appen etter hvert ha dette maskinlesbart:

```text
case_id
case_title
strategy_area
strategic_goal
target_groups
affected_parties
decision_owner
known_facts
uncertainties
source_basis

ai_use_tasks[]
  task_id
  title
  task_type
  input_data_type
  output_use
  human_decision_point
  direct_effect_on_people
  uses_personal_or_sensitive_data
  expected_risk_flags
  expected_value_judgments
  expected_indicator_scores
  expected_stop_rules
  expected_calculated_role
  expected_allowed_role
  required_controls
  required_local_verification
```

Minimum for HRSR-002:

- HRR-01 som fixture
- minst to KI-bruksoppgaver:
  - strukturere anonymisert innsikt og tiltakshypoteser
  - prioritere ansatte for senior-/livsfasetiltak
- risikoflagg per KI-bruksoppgave
- forventet rolle per KI-bruksoppgave
- kildegrunnlag per case
- stoppregler per KI-bruksoppgave

Minimum for HRSR-003:

- scoreformler
- role thresholds
- stoppregel-evaluering
- rolle-tak
- tester for høy målklarhet + lav separabilitet
- tester for svak oversight + arbeid/rettigheter
- tester for manglende beslutningslogg i høyrisiko

## Spørsmål du skal presse på

Start med disse, maks to om gangen:

1. Skal MVP-en først være en faglig prototype for eier/konsulent, eller skal den tåle demo for kunde?
2. Hva er terskelen for at en case er “god nok” som kalibreringsgrunnlag: realistisk scenario, kildeankret scenario, eller faktisk kundedata?

Deretter press på:

- Kan vi akseptere manuelle ekspertvurderte score-orakler i MVP?
- Må alle 8 HRR-caser være maskinlesbare før scoring bygges, eller holder HRR-01 + regresjonspress fra HRR-02/04/07?
- Hvilke vurderinger må appen aldri late som er objektive?
- Hvor mye juridisk/personvern-presisjon er nødvendig før intern prototype?

## Ting du ikke skal gjøre

- Ikke bygg app.
- Ikke endre scoreformlene uten å foreslå det som eksplisitt beslutning.
- Ikke gjøre full AI Act-compliance til MVP.
- Ikke gjøre “automatisert beslutning” til mål for HR-casene.
- Ikke slå sammen målklarhet og separabilitet.
- Ikke behandle forklarbarhet/human oversight som kompassakse.
- Ikke endre råpakker i `archive/source_packages/`.

## Ønsket output

Lever en kort rapport med disse seksjonene:

1. `Konklusjon`: Bygg nå eller research først.
2. `Datagap`: Maks fem gap, prioritert.
3. `MVP-minimum`: Nøyaktig hva som må være maskinlesbart før HRSR-002/HRSR-003.
4. `Deep research-plan`: Bare hvis nødvendig.
5. `Risiko hvis vi bygger nå`: Hva kan bli feil.
6. `Anbefalt neste handling`: Én tydelig anbefaling.

Vær streng. Hvis grunnlaget er nok til å bygge deterministisk MVP, si det tydelig og ikke foreslå research som utsetter bygging uten reell nytte.
