---
title: "DPIA-eksempel: Sykefravær og tilrettelegging - KI-støtte"
date: 2026-06-09
status: draft
tags: [hr-strategiradar, dpia, eksempel, sykefravær, helseopplysninger]
category: examples
---

# DPIA-eksempel: Sykefravær og tilrettelegging (Middels/Høy risiko — Igangsettes med vilkår)

> [!NOTE]
> **Dette er et illustrativt, syntetisk eksempel på en personvernkonsekvensvurdering (DPIA).**
> Det viser hvordan en prosjektgruppe i samarbeid med personvernombudet (PVO) kan vurdere en KI-bruksoppgave som behandler sensitive helseopplysninger. Dette eksempelet er et arbeidsverktøy og en øvingsarena. Appen gir en foreløpig KI-diagnose, ikke et endelig resultat. Det inneholder ingen reelle personopplysninger og utgjør ikke en juridisk eller sikkerhetsfaglig verifikasjon eller endelig compliance-referanse.

---

## 1. Behandlingsansvarlig og Administrative Detaljer

* **Virksomhet (Behandlingsansvarlig):** Lillevik kommune (Kommunalområde Helse og omsorg)
* **Ansvarlig leder (Beslutningstaker):** Helse- og omsorgssjef Kari Vika
* **Kontaktperson for prosjektet:** HR-rådgiver Ola Nordmann
* **Dato for påbegynt DPIA:** 2026-06-03
* **Dato for rådføring med Personvernombudet (PVO):** 2026-06-08

---

## 2. Beskrivelse av Behandlingen og Formål

### 2.1 HR-mikroprosjekt (Kontekst)
* **Prosjektnavn:** Gradert sykefravær og tilrettelegging i turnus (HRR-02).
* **HR-kontekst:** Oppfølging av sykmeldte medarbeidere i hjemmetjenesten for å tilrettelegge arbeidshverdagen, slik at de kan forbli delvis i arbeid fremfor å bli 100 % sykmeldt. Målet er å sikre god dialog og koordinere tilretteleggingstiltak uten at arbeidsbelastningen skyves over på kolleger.

### 2.2 Konkret KI-bruksoppgave (Vurderingsenheten)
* **Beskrivelse av KI-oppgaven:** Bruke en lukket KI-modell til å **strukturere og oppsummere ustrukturerte møtenotater** fra dialogmøter med den sykmeldte, samt **foreslå en samtaleagenda og relevante temaer** (f.eks. tilrettelegging av turnus, pausebehov, skjerming) til neste oppfølgingsmøte.
* **Hvorfor er det nødvendig å bruke KI til denne oppgaven?** Lederne opplever at oppfølgingsarbeidet krever mye dokumentasjon og at det er utfordrende å raskt trekke ut essensen av lange samtaler og koble dette til konkrete tilretteleggingsmuligheter. KI brukes for å spare tid og sikre at oppfølgingsstrukturen blir systematisk.

### 2.3 System, Leverandør og Infrastruktur
* **Navn på KI-system/modell:** *Lillevik KI-assistent* (en lukket instans av GPT-4o levert via Microsoft Azure i et sikkert kommunalt skyområde).
* **Leverandør:** Atea / Microsoft Norge.
* **Databehandleravtale (DPA):** Ja, det foreligger en gyldig, sentralt signert DPA som eksplisitt dekker bruk av Azure OpenAI-tjenester for sensitive data.
* **Systemegenskaper:** Modellen er lukket. Ingen data som sendes inn (prompts) eller lagres midlertidig blir brukt av Microsoft eller tredjeparter til å trene modeller.

---

## 3. Informasjonskategorier og Dataflyt

### 3.1 Kategorier av Registrerte
- [x] Ansatte i Lillevik kommune (sykmeldte medarbeidere under oppfølging).

### 3.2 Kategorier av Personopplysninger
* **Alminnelige personopplysninger (GDPR art. 6):**
  - [x] Navn, stillingstittel, avdeling.
  - [x] Stillingsbrøk, turnusinformasjon.
  - [x] Fritekstnotater fra samtaler (hvor den ansattes uttalelser om arbeidssituasjonen inngår).
* **Særlige kategorier av personopplysninger / Sensitive data (GDPR art. 9):**
  - [x] Helseopplysninger (opplysninger om funksjonsevne, slitasje, stressreaksjoner, legens anbefalinger for tilrettelegging, samt gradert sykmeldingsprosent).
  - *Merk: Medisinske diagnoser (diagnosekoder) skal konsekvent IKKE legges inn i systemet.*

### 3.3 Dataflyt og Dataminimering
1. Saksbehandler (leder) logger inn på den lukkede kommunale KI-portalen via tofaktorautentisering.
2. Leder limer inn sine rånotater fra dialogmøtet. Leder skal foreta en manuell rensing (fjerne irrelevante personopplysninger, private forhold som ikke angår arbeidsforholdet, samt diagnosenavn).
3. KI-en prosesserer teksten kryptert (HTTPS), genererer et strukturert sammendrag og en agenda, og viser dette i nettleseren.
4. Leder kopierer utkastet over i det offisielle, etablerte HR-arkivsystemet (Compendia/Elements).
5. KI-portalen sletter automatisk innholdet i prompten og historikken så snart lederen lukker nettleserfanen (ingen lagring i KI-systemet).

---

## 4. Rettslig Grunnlag

### 4.1 Rettslig grunnlag for alminnelige opplysninger (GDPR art. 6)
- [x] **Art. 6 (1) (c) - Rettslig forpliktelse:** Behandlingen er nødvendig for å oppfylle arbeidsgivers lovpålagte plikt til å følge opp sykmeldte ansatte etter **Arbeidsmiljøloven § 4-6** og **Folketrygdloven § 25-2**.

### 4.2 Behandlingsgrunnlag for særlige kategorier (GDPR art. 9)
- [x] **Art. 9 (2) (b) - Arbeidsrettslige forpliktelser:** Behandlingen er nødvendig for at arbeidsgiver skal kunne oppfylle sine forpliktelser på området arbeidsrett (arbeidsmiljøloven § 4-6 om plikt til å tilrettelegge arbeidet for ansatte med redusert arbeidsevne).
- [x] **Art. 9 (2) (h) - Helse- og sosialtjenester:** Nødvendig for å vurdere arbeidstakerens arbeidsevne.

---

## 5. Nødvendighet og Forholdsmessighet (Proporsjonalitet)

1. **Egnethet:** Verktøyet er egnet til å strukturere ustrukturerte notater, noe som hjelper lederen med å holde oversikt over avtalte tiltak og forberede møter.
2. **Nødvendighet:** Å strukturere notater *kan* gjøres manuelt, men KI-verktøyet reduserer tidsbruken per sak betydelig, noe som frigjør tid til reell oppfølging og dialog med den ansatte.
3. **Forholdsmessighet:** Behandlingen gjelder sensitive helseopplysninger i et asymmetrisk maktforhold (arbeidsgiver/arbeidstaker). Inngrepet i personvernet er imidlertid begrenset fordi:
   - Dataene behandles i et lukket kommunalt miljø.
   - Det gjøres ingen automatisert beslutning eller profilering; verktøyet fungerer utelukkende som en administrativ skrive- og struktureringsstøtte for lederen.
   - Diagnoser og irrelevante private detaljer utelates.
   - Nytten (bedre og raskere tilrettelegging for den sykmeldte) veier opp for den begrensede risikoen ved at dataene prosesseres i en lukket KI-modell.

---

## 6. Risikovurdering for de Registrertes Rettigheter og Friheter

| ID | Risikobeskrivelse | K (1-5) | S (1-5) | Risiko (Uten tiltak) | Beskrivelse av konsekvens for den registrerte |
|---|---|---|---|---|---|
| PR-01 | **Automation Bias og manglende rettssikkerhet:** Leder overprøver ikke KI-ens sammendrag. KI-en kan ha utelatt kritiske begrensninger den ansatte nevnte, eller mistolket alvorlighetsgraden av et tilretteleggingsbehov. | 3 | 3 | **9 (Middels)** | Den ansatte kan få mangelfull eller direkte helseskadelig tilrettelegging på arbeidsplassen. |
| PR-02 | **Utilsiktet lagring av sensitive data:** Modellen lagrer ved en feil helseopplysninger i en historikklogg som andre ledere eller systemadministratorer har tilgang til. | 3 | 2 | **6 (Lav)** | Brudd på konfidensialitet og uautorisert innsyn i sensitive helsedata. |
| PR-03 | **Manglende transparens:** Den ansatte vet ikke at KI har oppsummert møtenotatene og opplever en fremmedgjøring i prosessen. | 2 | 3 | **6 (Lav)** | Den ansatte mister følelsen av kontroll over egne opplysninger og opplever prosessen som utrygg. |

---

## 7. Planlagte Tiltak og Human-in-the-loop

### 7.1 Menneskelig overoppsyn (Human-in-the-loop)
* **Obligatorisk menneskelig verifikasjon:** Leder skal alltid lese gjennom KI-genererte sammendrag og sammenligne dem med sine egne rånotater før sammendraget lagres i HR-systemet eller deles med den ansatte. Eventuelle avvik eller feiltolkninger skal korrigeres manuelt.
* **Ingen "copy-paste"-kultur:** Det skal utarbeides en retningslinje som slår fast at KI kun leverer et *utkast*. Lederen har det fulle faglige og juridiske ansvaret for innholdet i den endelige oppfølgingsplanen.

### 7.2 Tekniske og organisatoriske tiltak
* **For PR-02 (Lagring):** IT-avdelingen har konfigurert KI-portalen slik at historikk og logger automatisk slettes ved sesjonsavslutning. Det er verifisert at leverandørens API ikke logger data til modelltrening.
* **For PR-03 (Transparens):** Ved oppstart av oppfølgingsløpet skal lederen informere den ansatte muntlig og skriftlig om at KI brukes som et verktøy for å strukturere notatene, og at den ansatte når som helst kan reservere seg mot dette. Hvis den ansatte reserverer seg, skal alt arbeid gjøres rent manuelt. Den ansatte skal alltid få tilsendt det ferdige sammendraget til gjennomlesning og aksept.

---

## 8. PVOs Rådgivende Uttalelse og Rest-risiko

### 8.1 Personvernombudets (PVO) vurdering
> **PVOs uttalelse (2026-06-08):**
> *PVO har vurdert prosjektet og DPIA-utkastet. Behandlingen av helseopplysninger i forbindelse med sykefraværsoppfølging er sensitiv, men det rettslige grunnlaget i GDPR art. 6 nr. 1 bokstav c og art. 9 nr. 2 bokstav b er til stede gitt arbeidsmiljølovens krav. PVO støtter at dette verktøyet utelukkende skal fungere som administrativ skrivestøtte for leder.*
>
> *Bruk av den lukkede Azure-instansen sikrer at data ikke spres til eksterne. De foreslåtte tiltakene for sletting av sesjonshistorikk og mulighet for ansatte til å reservere seg (opt-out) er kritiske for å minimere risikoen.*
>
> *PVO anbefaler at det gjennomføres stikkprøver av at slettemekanismene i KI-portalen faktisk fungerer som forutsatt, og at det gis tydelig opplæring til ledere om faren for automation bias. Under disse forutsetningene vurderer PVO at behandlingen kan gjennomføres med akseptabel risiko.*

### 8.2 Endelig vurdering av Rest-risiko
* **Rest-risiko:** Lav (forutsatt at vilkårene i punkt 7 og PVOs anbefalinger følges).

---

## 9. Behandlingsansvarliges Beslutning

- [x] **Igangsettes med vilkår:** Behandlingen kan igangsettes under forutsetning av at følgende vilkår er oppfylt:

### Vilkår for igangsetting:
1. **Teknisk verifisering:** IT-avdelingen must skriftlig bekrefte at automatisk sletting av sesjonshistorikk er aktivert i produksjonsmiljøet.
2. **Lederretningslinje:** Det skal distribueres en kort instruks til alle ledere som tar verktøyet i bruk. Instruksen skal presisere plikten til manuell verifikasjon (anti-automation bias), forbudet mot å lime inn diagnosekoder, og kravet om å informere den ansatte samt respektere eventuelle reservasjoner.
3. **Innsynsrett:** Den ansatte skal alltid få partinnsyn og akseptere det endelige referatet i HR-arkivet.

**Lederens begrunnelse for beslutningen:**
Jeg vurderer at de personvernmessige konsekvensene er tilstrekkelig utredet og minimert gjennom denne DPIA-prosessen. Tidsbesparelsen for våre ledere er vesentlig, og tiltakene sikrer at de ansattes personvern og rettigheter ivaretas på en trygg måte, spesielt gjennom den lukkede infrastrukturen og kravet om reell human-in-the-loop.

---

### Signaturer

________________________________________             ____________________
Kari Vika, Helse- og omsorgssjef                      Dato

________________________________________             ____________________
Ola Nordmann, PVO (Rådgivende rolle)                  Dato
*(Signert for rådgivning)*
