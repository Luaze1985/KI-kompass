---
title: "TOC for datainnhenting: langvakter i helsesektoren"
date: 2026-05-17
status: ready-for-research-agent
tags: [datainnhenting, research, langvakter, helsesektor, hr-strategiradar]
category: research-plan
---

# TOC for datainnhenting: langvakter i helsesektoren

## 1. Formål

Datainnhentingen skal gi kildeankret grunnlag for å vurdere KI-bruk i HR-/arbeidstidsprosjekter der virksomheten vurderer langvakter i helse- og omsorgstjenesten.

Målet er ikke å avgjøre om langvakter er riktig. Målet er å finne hvilke faktorer appen må spørre om, vekte, stoppe på og dokumentere.

## 2. Avgrensning

In scope:

- langvakter i kommunal helse- og omsorgstjeneste
- sykehjem, hjemmetjeneste, heldøgns omsorg, bofellesskap og lignende turnusmiljøer
- arbeidstid, hvile, belastning, bemanning, kontinuitet, kompetansesammensetning og frivillighet
- vurdering av KI som støtte til analyse, scenarioarbeid, turnusdrøfting og beslutningsnotat

Out of scope:

- individuell arbeidstakerscore
- automatisk turnustildeling
- kontroll/overvåking av ansatte
- generell human oversight / automation bias som eget researchspor
- full juridisk compliance-modell

## 3. Primær app-case

Arbeidstittel:

```text
Langvakter i helsesektoren: vurdering av om KI kan støtte analyse og beslutningsgrunnlag for arbeidstidsordning.
```

Eksempel på HR-mikroprosjekt:

```text
En kommunal helse- og omsorgsenhet vurderer langvakter for å styrke kontinuitet, redusere uønsket deltid og bedre helgebemanning, men er usikker på konsekvenser for arbeidsmiljø, restitusjon, pasientsikkerhet, rettferdighet og lokal gjennomførbarhet.
```

## 4. KI-bruksoppgaver som må skilles

### 4.1 Tryggere støtteoppgave

KI strukturerer anonymiserte innspill, aggregerte bemanningsdata og kjente risikofaktorer til et beslutningsnotat.

Forventet rolle:

- utforskende støtte
- eventuelt forsterket skjønn hvis grunnlaget er aggregert, etterprøvbart og lokalt verifisert

### 4.2 Scenario- og konsekvensanalyse

KI lager scenarioer for bemanning, helgebelastning, kompetansedekning, kontinuitet og restitusjonsrisiko.

Forventet rolle:

- forsterket skjønn med tydelig beslutningslogg
- ikke automatisk anbefaling

### 4.3 Risikabel individoppgave

KI foreslår hvem som bør gå langvakter, hvem som bør unntas, eller hvordan konkrete ansatte bør fordeles i turnus.

Forventet rolle:

- stopp eller utforskende støtte for risikovurdering
- ikke individuell tildeling eller prioritering

## 5. Researchspørsmål

### 5.1 Hva menes med langvakter i praksis?

- Hvilke arbeidstidsordninger omtales som langvakter?
- Hvilke varianter finnes i helse- og omsorgstjenesten?
- Hvilke lokale forutsetninger går igjen?
- Hvordan skiller langvakter seg fra ordinær turnus, helgevakter og alternative arbeidstidsordninger?

### 5.2 Hvilke formål brukes langvakter for?

- bedre kontinuitet for brukere/pasienter
- redusere uønsket deltid
- styrke heltidskultur
- redusere antall oppmøter eller vaktskifter
- bedre helgebemanning
- øke forutsigbarhet for ansatte

### 5.3 Hvilke HMS- og arbeidsmiljøfaktorer må vurderes?

- belastning over lang vakt
- restitusjon og hviletid
- natt/helg-effekter
- sykefravær og helsebelastning
- ergonomi, emosjonelt arbeid og kognitiv belastning
- risiko for feil, uønskede hendelser eller redusert oppmerksomhet
- om belastningen varierer mellom tjenestesteder og brukergrupper

### 5.4 Hvilke driftseffekter må vurderes?

- kontinuitet for brukere/pasienter
- kompetansedekning gjennom hele vakten
- behov for vikarer
- helgebelastning
- overlapper, rapportering og vaktskifter
- robusthet ved fravær
- om ordningen løser eller flytter bemanningsproblemet

### 5.5 Hvilke arbeidstaker- og rettferdighetsfaktorer må vurderes?

- frivillighet
- medvirkning og partssamarbeid
- livsfase, helse og omsorgsansvar
- opplevd rettferdighet mellom ansatte
- mulighet for individuell tilpasning uten usaklig forskjellsbehandling
- hvordan belastning fordeles mellom grupper

### 5.6 Hvilke juridiske og avtalemessige rammer må sjekkes?

- arbeidsmiljølovens arbeidstidsregler
- hviletid og ukentlig fritid
- avtaleadgang og lokale avtaler
- tariff-/partsforhold
- krav til forsvarlig arbeidsmiljø
- krav til risikovurdering og dokumentasjon

### 5.7 Hvilke data kan brukes uten personvern- eller individrisiko?

- aggregerte turnusdata
- anonymiserte innspill
- fraværsnivå på gruppenivå
- kompetansedekning på enhetsnivå
- vaktlengder, helgefrekvens og bemanningsmønstre
- uønskede hendelser på aggregert nivå

### 5.8 Hvilke data bør appen advare mot?

- helseopplysninger om ansatte
- individuelle preferanser brukt som automatisk tildelingsgrunnlag
- individuell sykefraværshistorikk
- individuelle prestasjons- eller belastningsscore
- sensitive fritekstinnspill som kan identifisere ansatte

## 6. Kildekandidater

Research-agenten bør prioritere primær- og veiledningskilder:

- Arbeidstilsynet: arbeidstid, hviletid, turnus, risikovurdering, HMS
- Helsedirektoratet: helse- og omsorgstjenester, kvalitet og bemanning der relevant
- KS: heltidskultur, arbeidsgiverstrategi, kommunal helse og omsorg
- FAFO / STAMI / forskningsrapporter om arbeidstid, turnus og helse
- partskilder der relevant: Spekter, KS, Fagforbundet, NSF
- kommunale evalueringer av langvakter hvis de finnes med tydelig metode
- lovdata eller offisielle lov-/forskriftskilder for arbeidstid

## 7. Søketermer

Bruk norske søk først:

```text
langvakter helse og omsorg arbeidstid forskning
langvakter sykehjem arbeidsmiljø
langvakter hjemmetjeneste evaluering
langvakter turnus helsepersonell
langvakter heltid deltid kommunal helse omsorg
langvakter hviletid arbeidsmiljøloven
langvakter pasientsikkerhet
langvakter sykefravær helsepersonell
alternative arbeidstidsordninger langvakter helse
```

Suppler med engelske søk hvis nødvendig:

```text
long shifts healthcare workers fatigue patient safety
extended shifts nursing homes occupational health
12-hour shifts healthcare staff wellbeing
long shifts healthcare work environment risk assessment
```

## 8. Data som skal ut av researchen

Research-agenten skal levere data som kan mappes direkte til appmodellen:

```text
source_id
source_type
claim
evidence_strength
relevant_case_field
affected_indicator
possible_risk_flag
possible_stop_rule
required_local_verification
quote_or_short_excerpt
url_or_source_reference
```

## 9. Mapping til HR Strategiradar

### 9.1 Mulige `RiskFlags`

- `workOrRightsImpact`
- `healthOrHmsImpact`
- `personalDataRisk`
- `vulnerableGroup`
- `localPracticeDependency`
- `relationalTrustDependency`
- `irreversibleOrHardToCorrect`
- `collectiveAgreementOrLocalAgreementDependency`
- `staffingContinuityImpact`
- `patientOrUserSafetyImpact`

### 9.2 Mulige indikatorer for målklarhet

- formålet med langvaktordningen er konkret
- suksesskriterier er definert
- ønsket effekt kan måles på gruppenivå
- interessenter er enige om hva et godt resultat er
- ordningen kan evalueres etter en prøveperiode

### 9.3 Mulige indikatorer for separabilitet

- KI-output er bare beslutningsgrunnlag, ikke turnusvedtak
- vurderingen krever lokal kunnskap om drift og brukerbehov
- arbeidsmiljø og helsebelastning kan ikke reduseres til score
- partssamarbeid og medvirkning er nødvendig
- individuelle hensyn må håndteres uten automatisert utvelgelse
- feil kan gi arbeidsmiljø- eller tjenestekvalitetskonsekvenser

### 9.4 Mulige stoppregler

- `SR-01`: arbeid, helse eller rettigheter påvirkes uten reell kontroll
- `SR-02`: lav separabilitet ved individuell turnustildeling
- `SR-05`: høy-risiko beslutningslogg mangler
- `SR-06`: sterk verdikonflikt mellom drift, helse, frivillighet og rettferdighet
- `SR-07`: feil er vanskelig å reversere hvis ordningen innføres uten pilot/evaluering
- `SR-08`: KI-output kan ikke verifiseres mot lokale data, avtaler eller HMS-vurdering

## 10. Forventet output fra research-agent

Research-agenten skal levere:

1. Kildeliste med korte notater.
2. 10-20 kildeankrede funn.
3. Forslag til maskinlesbare casefelt for langvakt-casen.
4. Forslag til indikatorrubrikk 1-5 for målklarhet og separabilitet.
5. Forslag til stoppregeltrigger per KI-bruksoppgave.
6. Forslag til beslutningsloggkrav.
7. Liste over hva som må verifiseres lokalt før appen kan gi rapport.

## 11. Sonar API-vurdering

Sonar API er ikke nødvendig for å lage TOC eller første manuelle researchpass.

Sonar API kan være nyttig hvis researchen skal kjøres som repeterbar pipeline med:

- flere automatiske kildesøk
- kildebaserte sammendrag med URL-er
- sammenligning av mange kilder
- rask oppdatering av researchgrunnlag senere

Anbefaling:

```text
Ikke gjør Sonar API til blokkering.
Kjør først et manuelt/agentisk researchpass mot offisielle kilder.
Vurder Sonar API hvis datainnhenting skal repeteres på mange HR-temaer.
```

## 12. Akseptansekriterier for datainnhenting

Researchen er god nok når den kan svare på:

- Hvilke langvakt-bruksoppgaver kan KI støtte?
- Hvilke bruksoppgaver skal appen bremse?
- Hvilke risikoflagg må settes?
- Hvilke stoppregler forventes?
- Hvilke lokale data må verifiseres?
- Hvilken rolle bør appen foreslå før og etter stoppregler?

Hvis researchen ikke gir direkte svar på disse, er den ikke nyttig for MVP-logikken.
