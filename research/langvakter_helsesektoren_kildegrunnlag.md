---
title: "Kildegrunnlag: langvakter i helsesektoren"
date: 2026-05-17
status: research-pass-1
tags: [research, langvakter, helsesektor, arbeidstid, hms, hr-strategiradar]
category: research
source_toc: research/datainnhenting_toc_langvakter_helsesektoren.md
---

# Kildegrunnlag: langvakter i helsesektoren

## Konklusjon

Det finnes nok kildegrunnlag til å lage en realistisk HR Strategiradar-case for langvakter i helsesektoren og bruke den som regresjonspress i MVP.

Casen bør ikke brukes til å avgjøre om langvakter er riktig. Den bør brukes til å teste om appen skiller mellom:

- KI som støtte til aggregert analyse, scenarioarbeid og beslutningsnotat
- KI som risikabel støtte til individuell turnustildeling eller utvelgelse

Sonar API er ikke nødvendig for dette første passet.

## Kilder brukt

| Kilde | Type | Apprelevans |
|---|---|---|
| Arbeidstilsynet: arbeidstid | Offisiell veiledning | Forsvarlighet, hvile, kompensasjon, arbeidsgiveransvar |
| Arbeidstilsynet: gjennomsnittsberegning | Offisiell veiledning | 13-timersgrense, søknad, drøfting med tillitsvalgte |
| Arbeidstilsynet: forsvarlig arbeidstidsordning | Offisiell veiledning | Krav til vurdering ved turnus, gjennomsnittsberegning og nye ordninger |
| KS: SFS 2310-veileder | Partssammensatt veileder | Langvakter over 12,5 til 15 timer, frivillighet, lokal særavtale, hvile, pauser |
| KS: SFS 2310 avtaletekst | Partsdokument | Frivillighet, alternativer, overtid, evaluering og formelle rammer |
| KS: B-rundskriv SFS 2310 | Partsdokument | Ny særavtale fra 2026, ytre rammer og overgang |
| KS: Heltid | Arbeidsgiver-/partskilde | Heltidskultur, arbeidsmiljø, kompetanse og tjenestekvalitet |
| Agenda Kaupang/Fafo for KS | Kunnskapsoppsummering | Heltidskultur, langvakter, lokale forutsetninger og begrenset kunnskapsgrunnlag |
| STAMI faktaark arbeidstid | Forskningsformidling | Søvn, fatigue, kort hvile, sikkerhet og kombinerte arbeidsmiljøfaktorer |
| OsloMet COMPRESSED | Forskningsprosjekt | Norsk pågående forskning om langvakter i kommunal helse og omsorg |
| OsloMet nyhet om vekst i langvakter | Forskningsformidling | Omfang, mangelfull forskning, pausepraksis og organisering |
| FHI/Helsebiblioteket forskningsomtale | Oppsummert forskning | Mulig sammenheng mellom skift over 12 timer og uønskede hendelser |
| Helsedirektoratet § 4-2 | Offisiell lovkommentar | Systematisk kvalitetsforbedring og pasient-/brukersikkerhet |
| BMC Health Services Research | Systematisk review | Kobling mellom arbeidstid, ansatthelse og pasientsikkerhet |
| NOU 2025:5 | Offentlig utredning | Lang arbeidstid, kort hvile, ulykker, sykefravær og helse |
| Fafo 2022:13 | Forskningsrapport | Tillitsvalgtes vurdering av turnus/langvakter, fordeler og ulemper |

Kildepeker:

- Arbeidstilsynet arbeidstid: `https://www.arbeidstilsynet.no/arbeidstid-og-organisering/arbeidstid/`
- Arbeidstilsynet gjennomsnittsberegning: `https://prod.arbeidstilsynet.no/arbeidstid-og-organisering/arbeidstid/gjennomsnittsberegning/`
- Arbeidstilsynet forsvarlighet: `https://inte.arbeidstilsynet.no/arbeidstid-og-organisering/arbeidstid/er-arbeidstidsordningen-forsvarlig/`
- KS SFS 2310-veileder: `https://www.ks.no/contentassets/3c2faeefa6bc4520acd0028dba07d29c/veileder-til-sfs-2310-langvakter-i-helse-og-omsorgstjenesten-og-barneverntjenesten.pdf`
- KS SFS 2310 avtaletekst: `https://www.ks.no/contentassets/cf93d8cf3e5d43fb90a3193368385495/sfs-2310-langvakter-i-helse--og-omsorgstjenesten-og-barneverntjenesten.pdf`
- KS B-rundskriv SFS 2310: `https://www.ks.no/contentassets/a198d23e02674882abc676175d2e5e9c/b-rundskriv-sfs-2310-langvakter-i-helse-og-omsorgstjenesten-og-barnverntjenesten.pdf`
- KS heltid: `https://www.ks.no/heltid`
- Agenda Kaupang/Fafo kunnskapsoppsummering: `https://www.ks.no/contentassets/9a94c1f1545543ae8f2ac39b291092bd/Kunnskapsoppsummering-Agenda-Kaupang-FAFO-19-04-2021-endelig-versjon.pdf`
- STAMI faktaark arbeidstid: `https://stami.no/wp-content/uploads/2025/01/faktaark_arbeidstid_2025.pdf`
- OsloMet COMPRESSED: `https://www.oslomet.no/forskning/forskningsprosjekter/compressed`
- OsloMet om vekst i langvakter: `https://www.oslomet.no/om/nyheter/sterk-auke-langvakter`
- Helsebiblioteket/FHI forskningsomtale: `https://www.helsebiblioteket.no/innhold/lenker/kommunestotte/forskningsomtale/hva-er-sammenhengen-mellom-langvakter-for-sykepleiere-og-uonskede-hendelser-for-pasientene`
- Helsedirektoratet § 4-2: `https://www.helsedirektoratet.no/rundskriv/helse-og-omsorgstjenesteloven-med-kommentarer/krav-til-forsvarlighet-pasientsikkerhet-og-kvalitet/-4-2-kvalitetsforbedring-og-pasient-og-brukersikkerhet`
- BMC review: `https://link.springer.com/article/10.1186/s12913-019-3993-5`
- NOU 2025:5: `https://www.regjeringen.no/no/dokumenter/nou-2025-5/id3094205/?ch=4`
- Fafo 2022:13: `https://fafo.no/publikasjoner/fafo-publikasjoner/arbeidstidsordninger-pa-fos-organisasjonsomrade`

## Kildeankrede funn

| ID | Funn | Appfelt som påvirkes |
|---|---|---|
| LV-F01 | Langvakter i KS/SFS 2310 forstås som alminnelig arbeidstid over 12,5 timer og til og med 15 timer. | `aiUseTask`, `knownFacts`, `sourceBasis` |
| LV-F02 | Ny SFS 2310 gir lokale parter hjemmel til lokal særavtale innen ytre rammer, men ordningen er ikke bare et ledelsesvedtak. | `localPracticeDependency`, `collectiveAgreementOrLocalAgreementDependency`, `requiredLocalVerification` |
| LV-F03 | Deltakelse skal være frivillig for den enkelte arbeidstaker etter SFS 2310-veilederen. | `workOrRightsImpact`, `fairnessImpact`, `SR-01`, `SR-06` |
| LV-F04 | Hovedregelen er minst 11 timer hvile mellom langvakter; lokale parter kan avtale ned til 9 timer med kompenserende hvile. | `healthOrHmsImpact`, `restAndRecoveryRisk`, `SR-08` |
| LV-F05 | Pauser er en kjerneforutsetning: veilederen skiller mellom langvakter til og med 13,5 timer og over 13,5 timer til 15 timer. | `hmsControls`, `sourceTraceability`, `requiredControls` |
| LV-F06 | Arbeidstilsynet legger ansvar på arbeidsgiver for konkret forsvarlighetsvurdering av arbeidstidsordningen. | `decisionOwner`, `humanDecisionPoint`, `DecisionLog` |
| LV-F07 | Forsvarlighetsvurderingen skal gjøres ved etablering eller endring av ordning og bør evalueres regelmessig. | `requiredLocalVerification`, `DecisionLog`, `SR-05` |
| LV-F08 | Vurderingen skal skje i samarbeid med verneombud, arbeidstakere og tillitsvalgte. | `relationalTrustDependency`, `localPracticeDependency`, `SR-06` |
| LV-F09 | Arbeidstilsynet peker på turnus, gjennomsnittsberegning, nattarbeid og avvik fra normal døgnrytme som ordninger som krever nærmere vurdering. | `riskFlags`, `separabilitet` |
| LV-F10 | OsloMet beskriver kraftig vekst i langvakter i kommunal helse og omsorg og samtidig mangelfull kunnskap om helseeffekter. | `uncertainties`, `evidenceStrength`, `DecisionLog` |
| LV-F11 | OsloMet peker på stor variasjon i pausepraksis, fra avbrutte pauser til reell hvile. | `localVerification`, `outputVerifiable`, `separabilitet` |
| LV-F12 | Forskningen peker i begge retninger: mulige gevinster for balanse, kontinuitet og stillingsstørrelse, men også mulig helse- og sikkerhetsrisiko. | `valueConflictPresent`, `SR-06` |
| LV-F13 | FHI/Helsebiblioteket omtaler at skiftlengde over 12 timer kan øke uønskede hendelser noe, men med svært lav tillit til resultatene. | `patientOrUserSafetyImpact`, `uncertainty`, `DecisionLog` |
| LV-F14 | BMC-reviewen peker på at arbeidstid som skader ansatthelse ofte også henger sammen med pasientsikkerhetsrisiko, særlig via fatigue, søvn og burnout. | `healthOrHmsImpact`, `patientOrUserSafetyImpact`, `SR-01` |
| LV-F15 | NOU 2025:5 peker på sammenhenger mellom forlengede arbeidstider, kort hvile, ulykker/uønskede hendelser, sykefravær og helse. | `healthOrHmsImpact`, `restAndRecoveryRisk`, `SR-07` |
| LV-F16 | SFS 2310-avtaleteksten krever evaluering minst årlig i samarbeid med tillitsvalgte og vernetjeneste, med tema som helse, frivillighet, pauser, stillingsstørrelse, ekstravakter/vikarer, arbeidsmiljø, forsvarlighet, kvalitet og kontinuitet. | `DecisionLog`, `requiredLocalVerification`, `SR-05` |
| LV-F17 | STAMI peker på at risiko ved arbeidstid må vurderes samlet: tid på døgnet, påfølgende skift, skiftlengde, antall pauser og varighet av pauser. | `DimensionIndicators`, `healthOrHmsImpact`, `SR-08` |
| LV-F18 | Helsedirektoratet knytter pasient- og brukersikkerhet til systematisk arbeid for å verne brukere mot skade eller risiko for skade. | `patientOrUserSafetyImpact`, `requiredControls`, `DecisionLog` |
| LV-F19 | Fafo 2022 viser at tillitsvalgte ser mulige gevinster for stillingsstørrelse og tjenestekvalitet, men også ulemper for arbeidsbelastning, helse, sosialt liv og langsiktig slitasje. | `valueConflictPresent`, `relationalTrustDependency`, `SR-06` |

## Foreslått case for appen

```text
case_id: HRR-07
case_title: Langvakter i helsesektoren
strategy_area: arbeidstid_og_heltidskultur
strategic_goal: Vurdere om langvakter kan bidra til kontinuitet, helgebemanning og større stillinger uten å svekke arbeidsmiljø, restitusjon, faglig forsvarlighet eller rettferdighet.
target_groups:
  - ansatte i kommunal helse- og omsorgstjeneste
  - ledere
  - tillitsvalgte
  - verneombud
  - brukere/pasienter
affected_parties:
  - ansatte som kan få endret arbeidstid
  - kolleger som ikke ønsker eller tåler langvakter
  - brukere/pasienter som påvirkes av kontinuitet og bemanning
decision_owner: linjeleder/kommunalsjef med HR, tillitsvalgte og vernetjeneste
known_facts:
  - langvakter kan være virkemiddel for heltid, kontinuitet og helgebemanning
  - arbeidstidsordningen krever lokal forsvarlighetsvurdering
  - langvakter over 12,5 timer har egne avtale-/partskrav
uncertainties:
  - lokal belastning og pausepraksis
  - frivillighet og opplevd rettferdighet
  - effekt på sykefravær, pasient-/brukersikkerhet og kvalitet
  - om ordningen løser eller flytter bemanningsproblemet
```

## KI-bruksoppgaver

### A. Strukturere beslutningsgrunnlag

```text
task_id: hrr-07-a
title: Strukturere anonymisert innsikt og lokale risikofaktorer
task_type: strukturere
input_data_type: anonymiserte innspill, aggregerte turnusdata, lokale fakta, kildeutdrag
output_use: analysegrunnlag
direct_effect_on_people: false
uses_personal_or_sensitive_data: false
expected_allowed_role: utforskende_stotte
expected_stop_rules: SR-05 hvis rapport brukes som anbefaling uten logg, SR-08 hvis kildene ikke kan verifiseres
```

Vurdering:

- Målklarhet: 4
- Separabilitet: 3
- Forklarbarhet/human oversight: 4
- Anti-overreliance: 3

### B. Lage scenario- og konsekvensanalyse

```text
task_id: hrr-07-b
title: Lage scenarioer for bemanning, helg, kompetanse, hvile og pausepraksis
task_type: foresla
input_data_type: aggregerte turnusdata, bemanningsmønster, lokale rammer
output_use: anbefaling
direct_effect_on_people: true
uses_personal_or_sensitive_data: false
expected_allowed_role: forsterket_skjonn med beslutningslogg
expected_stop_rules: SR-05, SR-06, SR-08
```

Vurdering:

- Målklarhet: 4
- Separabilitet: 2-3
- Forklarbarhet/human oversight: 3-4
- Anti-overreliance: 3

### C. Foreslå hvem som skal gå langvakter

```text
task_id: hrr-07-c
title: Foreslå hvilke ansatte som bør gå langvakter eller unntas
task_type: rangere
input_data_type: ansattdata, preferanser, helse-/fraværsnære signaler, turnusdata
output_use: prioritering
direct_effect_on_people: true
uses_personal_or_sensitive_data: true
expected_allowed_role: utforskende_stotte / stopp for individtildeling
expected_stop_rules: SR-01, SR-02, SR-03, SR-05, SR-06, SR-08
```

Vurdering:

- Målklarhet: 3
- Separabilitet: 1-2
- Forklarbarhet/human oversight: 2
- Anti-overreliance: 2

## Indikatorrubrikk

### Målklarhet

| Score | Kjennetegn |
|---:|---|
| 1 | Formålet er uklart eller blandet med flere motstridende mål uten prioritering. |
| 2 | Målet er beskrevet, men suksesskriterier, berørte grupper eller målepunkt er uklare. |
| 3 | Formålet er kjent, men gevinster og risiko må fortsatt avveies lokalt. |
| 4 | Formålet er konkret, og effekter kan måles på gruppenivå før/etter pilot. |
| 5 | Formålet er smalt, målbart og lite verdikonfliktfylt. Sjelden i langvakt-saker. |

### Separabilitet

| Score | Kjennetegn |
|---:|---|
| 1 | KI-output brukes til individuell tildeling, unntak, prioritering eller vurdering av ansatte. |
| 2 | KI-output påvirker arbeidstid og arbeidsmiljø direkte og krever skjønn, partssamarbeid eller individuell tilpasning. |
| 3 | KI-output er aggregert scenarioanalyse, men må vurderes mot lokal drift, HMS, avtaler og brukersikkerhet. |
| 4 | KI-output er ren strukturering av anonymisert og aggregert grunnlag. |
| 5 | KI-output gjelder bare teknisk oppsummering uten arbeidsmiljø-, rettighets- eller personpåvirkning. Sjelden i denne casen. |

## Forventede stoppregler

| KI-bruksoppgave | Forventede stoppregler | Effekt |
|---|---|---|
| Strukturere anonymisert innsikt | SR-08 ved svakt kildegrunnlag, SR-05 hvis rapport brukes som anbefaling | Maks utforskende støtte til logg/verifikasjon er på plass |
| Scenarioanalyse | SR-05, SR-06, ofte SR-08 | Forsterket skjønn kan vurderes, men ikke automatisk anbefaling |
| Individuell turnustildeling | SR-01, SR-02, SR-03, SR-05, SR-06, SR-08 | Tak: utforskende støtte/stopp for tildeling |

## Lokal verifikasjon appen må kreve

- Hvilken vaktlengde vurderes: inntil 12,5 timer, over 12,5 timer, eller inntil 15 timer?
- Hvilken avtalehjemmel gjelder lokalt?
- Er deltakelse frivillig?
- Har tillitsvalgte og verneombud vært involvert?
- Foreligger forsvarlighetsvurdering?
- Hvordan er pauser planlagt og hvordan gjennomføres de faktisk?
- Hvordan sikres hvile og eventuell kompenserende hvile?
- Hvilke enheter, brukergrupper og belastningsprofiler gjelder ordningen?
- Hvilke data skal brukes, og er de aggregert/anonymisert?
- Hvordan skal ordningen evalueres, og når skal den stoppes eller justeres?

## Konsekvens for HR Strategiradar

Langvakt-casen bør erstatte arbeidsplassovervåking som fjerde primærcase i første research- og byggeløp.

Den tester bedre:

- høy målklarhet kombinert med lav/middels separabilitet
- forskjell på aggregert analyse og individrettet beslutning
- arbeidstid/HMS som stoppregelområde
- lokal verifikasjon og partssamarbeid
- beslutningslogg før rapport

## Sonar API

Ikke nødvendig for første pass.

Sonar API kan vurderes senere hvis prosjektet skal hente og oppdatere kilder systematisk for mange HR-temaer. For langvakt-casen er det nok grunnlag i offisielle kilder, partskilder og forskningsoppsummeringer til å lage første fixture og tester.
