---
title: "Arbeidsflyt og beregningsmodell for HR Strategiradar"
date: 2026-05-13
status: draft-for-review
tags: [arbeidsflyt, beregningsmodell, kompass, hr-strategiradar]
category: app-spec
---

# Arbeidsflyt og beregningsmodell for HR Strategiradar

## Hvorfor denne filen finnes

PRD-en forklarer hva appen skal bygge. Denne filen presiserer hvordan selve informasjonen, inputene og vurderingene skal flyte gjennom appen.

Den viktigste avklaringen er:

> Appen vurderer ikke et helt HR-prosjekt som én klump. Den vurderer en konkret KI-bruksoppgave eller delbeslutning innenfor et HR-mikroprosjekt.

Eksempel:

```text
HR-mikroprosjekt:
Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk

Mulige KI-bruksoppgaver:
1. Strukturere anonymisert innsikt og tiltakshypoteser.
2. Lage rapportutkast til intern drøfting.
3. Prioritere hvilke ansatte som bør få tiltak.
4. Foreslå individuell tilrettelegging.
```

Oppgave 1 og 2 kan være aktuelle for utforskende støtte eller forsterket skjønn. Oppgave 3 og 4 vil normalt treffe arbeid, rettigheter, persondata, lokal praksis og skjønn, og må bremses hardt.

## Grunnmodell

Appen har fire lag:

```text
1. HR-kontekst
2. KI-bruksoppgave
3. Kompass og kontroll
4. Stoppregler, rolle-tak og rapport
```

HR-konteksten beskriver saken. KI-bruksoppgaven beskriver hva KI faktisk skal brukes til. Kompasset vurderer egnethet. Stoppreglene begrenser hva appen kan anbefale.

## Arbeidsflyt i appen

### Steg 1: HR-kontekst

Bruker fyller inn:

| Felt | Formål |
|---|---|
| `microproject_title` | Navn på HR-mikroprosjektet. |
| `strategy_area` | Livsfasepolitikk, rekruttering, HMS, omstilling osv. |
| `strategic_goal` | Hva prosjektet forsøker å oppnå. |
| `target_groups` | Hvilke grupper saken gjelder. Ikke personnavn. |
| `decision_owner` | Hvem som eier den menneskelige beslutningen. |
| `affected_parties` | Hvem som kan bli påvirket. |
| `known_facts` | Hva som er kjent og kan brukes. |
| `uncertainties` | Hva som må verifiseres lokalt. |

Systemet avleder:

- relevante HR-prosesser
- mulige HR-randsoner
- lokale verifikasjonskrav
- risikoindikatorer som arbeid, persondata, HMS, rettigheter og tillit

### Steg 2: KI-bruksoppgave

Bruker må velge eller beskrive hva KI skal gjøre.

Dette er vurderingsenheten for kompasset.

| Felt | Formål |
|---|---|
| `ai_task_title` | Kort navn på KI-bruksoppgaven. |
| `ai_task_type` | Strukturere, oppsummere, foreslå, klassifisere, rangere, beslutte, produsere utkast. |
| `input_data_type` | Anonymisert tekst, aggregerte data, HR-data, persondata, regelverk, fritekst. |
| `output_use` | Analysegrunnlag, møtenotat, anbefaling, prioritering, vedtak, kommunikasjon. |
| `human_decision_point` | Hvor mennesket faktisk tar stilling. |
| `direct_effect_on_people` | Om output kan påvirke arbeid, rettigheter, helse, økonomi eller vesentlige interesser. |

Systemet skal her skille tydelig mellom:

- KI som analyse- og strukturstøtte
- KI som forslag til menneskelig vurdering
- KI som prioritering/rangering
- KI som beslutning

### Steg 3: Verdivurderinger

Bruker svarer eksplisitt på menneskelige vurderinger som ikke bør late som de er ren matematikk.

| Felt | Type | Bruk |
|---|---|---|
| `relational_trust_important` | ja/nei | Trekker separabilitet ned og kan utløse SR-02. |
| `human_presence_part_of_value` | ja/nei | Trekker separabilitet ned. |
| `local_exceptions_matter` | ja/nei | Trekker separabilitet ned og øker verifikasjonskrav. |
| `value_conflict_present` | ja/nei | Kan utløse SR-06. |
| `error_reversible` | ja/nei | Nei kan utløse SR-07. |
| `rights_or_work_impact` | ja/nei | Kan utløse SR-01 og høy-risiko-logg. |
| `sensitive_or_personal_data_risk` | ja/nei | Kan utløse SR-08 og personvern-randsone. |

Disse feltene er ikke pynt. De er styringsinput til stoppregler, rolle-tak og kontrollkrav.

### Steg 4: Indikatorvurdering

Appen foreslår modulskårer ut fra indikatorer. Bruker kan overstyre med begrunnelse.

MVP kan starte deterministisk med faste indikatorer. Senere kan en LLM-adapter foreslå indikatorer, men domenelogikken skal fortsatt være deterministisk.

## Beregningsmodell

### Modul A: Målklarhet

Arbeidsspørsmål:

> Vet vi tydelig hva “god output” betyr for denne KI-bruksoppgaven?

Indikatorer:

| Indikator | Trekker opp når | Trekker ned når |
|---|---|---|
| `goal_specificity` | målet er konkret | målet er bredt eller strategisk uklart |
| `success_criteria_stability` | kriterier er stabile | kriterier avhenger av situasjon og verdier |
| `measurable_outcome` | output kan vurderes etterpå | det er uklart hva godt resultat betyr |
| `expert_agreement` | fagpersoner vil ofte være enige | flere legitime svar finnes |
| `repeatable_pattern` | saken har gjentakende mønstre | saken er unik eller sterkt kontekstuell |
| `value_conflict_absence` | lav verdikonflikt | politisk, etisk eller relasjonell konflikt |

Foreslått MVP-beregning:

```text
maalklarhet_score = vektet_snitt(maalklarhet_indikatorer)
```

Skala: 1-5.

### Modul B: Separabilitet

Arbeidsspørsmål:

> Kan KI-output brukes uten at mennesket må vurdere helheten, relasjonen og lokal kontekst?

Indikatorer:

| Indikator | Trekker opp når | Trekker ned når |
|---|---|---|
| `task_can_be_isolated` | KI-oppgaven er tydelig avgrenset | KI-output blander seg med helhetsvurdering |
| `low_discretion_need` | lite skjønn kreves | menneskelig skjønn er nødvendig |
| `low_relational_dependency` | tillit/nærvær betyr lite | relasjonell legitimitet er sentral |
| `low_local_context_dependency` | lokale unntak betyr lite | lokal praksis endrer vurderingen |
| `low_rights_impact` | liten påvirkning på arbeid/rettigheter | arbeid, rettigheter, helse eller økonomi påvirkes |
| `reversibility` | feil kan rettes | feil er vanskelige å oppdage eller reversere |
| `output_verifiable` | output kan sjekkes mot kilde/data | output bygger på tolkning eller uverifiserbar vurdering |

Foreslått MVP-beregning:

```text
separabilitet_score = vektet_snitt(separabilitet_indikatorer)
```

Skala: 1-5.

Separabilitet er det viktigste korrektivet mot falsk presisjon. En strategisk HR-sak kan ha høy målklarhet og likevel lav separabilitet.

### Modul C: Forklarbarhet og human oversight

Arbeidsspørsmål:

> Kan ansvarlig menneske forstå, kontrollere og overstyre KI-output?

Indikatorer:

| Indikator | Trekker opp når | Trekker ned når |
|---|---|---|
| `decision_owner_identified` | ansvarlig eier er tydelig | ansvar er uklart |
| `source_traceability` | output kan spores til kilde/data | grunnlaget er uklart |
| `override_realistic` | mennesket kan faktisk overstyre | tid, makt eller kompetanse mangler |
| `competence_available` | ansvarlig har faglig grunnlag | kontrollen er symbolsk |
| `explanation_quality` | output kan forklares forståelig | output er svart boks |

Foreslått MVP-beregning:

```text
forklarbarhet_oversight_score = vektet_snitt(oversight_indikatorer)
```

Skala: 1-5.

### Modul D: Anti-overreliance

Arbeidsspørsmål:

> Hindrer arbeidsflyten at bruker bare godtar KI-output?

Indikatorer:

| Indikator | Trekker opp når | Trekker ned når |
|---|---|---|
| `think_first_step` | bruker må vurdere før KI-output aksepteres | KI-output vises som første fasit |
| `counterargument_required` | motargument kreves | ingen friksjon mot gummistempel |
| `verification_required` | kilde/verifikasjon kreves | bruker kan hoppe rett til anbefaling |
| `uncertainty_visible` | usikkerhet vises tydelig | usikkerhet skjules |
| `acceptance_requires_reason` | aksept må begrunnes | aksept er ett klikk |

Foreslått MVP-beregning:

```text
anti_overreliance_score = vektet_snitt(overreliance_indikatorer)
```

Skala: 1-5.

## Samlet score

Scoremodell fra runde 1 brukes slik:

```text
kompass_score = (maalklarhet_score * 0.45) + (separabilitet_score * 0.55)

kontroll_score = (forklarbarhet_oversight_score * 0.55) + (anti_overreliance_score * 0.45)
```

Separabilitet vektes høyere enn målklarhet fordi et klart mål ikke hjelper hvis KI-output ikke kan skilles trygt ut fra menneskelig skjønn.

Forklarbarhet/human oversight vektes høyere enn anti-overreliance fordi reell kontroll er grunnmuren for ansvar.

## Rolleberegning før stoppregler

Dette gir bare `beregnet_rolle`.

| Kompass-score | Kontroll-score | `beregnet_rolle` |
|---:|---:|---|
| under 2,5 | uansett | `menneskelig_eller_utforskende` |
| 2,5-3,4 | under 3,5 | `utforskende_stotte` |
| 2,5-3,4 | 3,5+ | `forsterket_skjonn` |
| 3,5-4,2 | 3,5+ | `forsterket_skjonn_eller_delautomatisering` |
| 4,3+ | 4,0+ | `kandidat_for_automatisert_beslutning` |

Appen skal ikke presentere dette som anbefaling før stoppregler er vurdert.

## Stoppregler og rolle-tak

Stoppregler evalueres som deterministiske regler.

Eksempel:

```text
if rights_or_work_impact == true and forklarbarhet_oversight_score < 3:
  trigger SR-01

if separabilitet_score <= 2 or local_exceptions_matter == true or human_presence_part_of_value == true:
  trigger SR-02

if high_risk == true and decision_log_complete == false:
  trigger SR-05
```

Stoppregler setter `rolle_tak`.

```text
forelopig_tillatt_rolle = laveste_av(beregnet_rolle, rolle_tak)
```

For HR i første MVP betyr dette i praksis:

- arbeid/rettigheter + svak kontroll gir maks `utforskende_stotte`
- lav separabilitet gir maks `utforskende_stotte`
- manglende høy-risiko-logg gir maks `utforskende_stotte`
- persondata/sensitivitet uten verifikasjon gir maks `utforskende_stotte`
- verdikonflikt kan gi maks `utforskende_stotte` eller `forsterket_skjonn`

## Eksempel: seniorbevaring

### HR-kontekst

```text
Mikroprosjekt:
Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk

Strategisk mål:
Utvikle tiltak som kan bidra til at senioransatte står lenger i arbeid.
```

### KI-bruksoppgave som bør testes først

```text
KI-bruksoppgave:
Strukturere anonymisert innsikt og lage tiltakshypoteser til intern drøfting.

Output-use:
Analysegrunnlag og rapportutkast.
```

Forventet vurdering:

- Målklarhet: middels til høy, fordi målet kan beskrives.
- Separabilitet: lav til middels, fordi tiltak påvirker arbeidshverdag, tillit, lokal praksis og rettferdighet.
- Kontroll: må være høy hvis output skal brukes i konsulentnotat.
- Anti-overreliance: må kreve motargument og lokal verifikasjon.
- Tillatt rolle: normalt `utforskende_stotte` eller forsiktig `forsterket_skjonn`, ikke automatisering.

### KI-bruksoppgave som skal bremses

```text
KI-bruksoppgave:
Prioritere hvilke ansatte som bør få livsfase-/seniorordninger.
```

Forventet vurdering:

- SR-01: arbeid/rettigheter eller betydelig påvirkning
- SR-02: lav separabilitet
- SR-05: høy-risiko logg kreves
- SR-08: persondata/verifikasjon
- Foreløpig tillatt rolle: `utforskende_stotte`

## Pseudokode for appens domenelogikk

```text
input = collect_hr_context()
ai_task = collect_ai_use_task()
value_judgments = collect_value_judgments()

hr_context = derive_hr_processes_and_randsoner(input, ai_task)
risk_flags = derive_risk_flags(input, ai_task, value_judgments)

maalklarhet_score = score_maalklarhet(ai_task, value_judgments)
separabilitet_score = score_separabilitet(ai_task, risk_flags, value_judgments)
forklarbarhet_oversight_score = score_oversight(ai_task, controls)
anti_overreliance_score = score_anti_overreliance(workflow_controls)

kompass_score = maalklarhet_score * 0.45 + separabilitet_score * 0.55
kontroll_score = forklarbarhet_oversight_score * 0.55 + anti_overreliance_score * 0.45

stoppregler = evaluate_stop_rules(
  risk_flags,
  maalklarhet_score,
  separabilitet_score,
  forklarbarhet_oversight_score,
  anti_overreliance_score,
  decision_log_status
)

rolle_tak = derive_role_cap(stoppregler)
beregnet_rolle = derive_calculated_role(kompass_score, kontroll_score)
forelopig_tillatt_rolle = min_role(beregnet_rolle, rolle_tak)

report = build_report(
  input,
  ai_task,
  hr_context,
  scores,
  stoppregler,
  beregnet_rolle,
  forelopig_tillatt_rolle,
  decision_log
)
```

## Konsekvens for neste byggesteg

`HRSR-002` bør ikke bare lage `HrMicroproject`.

Det må også lage:

- `AiUseTask` eller `AssessmentSubject`
- `RiskFlags`
- `DimensionIndicators`
- `ModuleScores`
- `RoleResult`

Hvis ikke blir appen for grov og beregner på feil nivå.
