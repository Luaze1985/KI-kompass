---
title: "ROS-eksempel: Individuell prioritering - STOPP"
date: 2026-06-09
status: draft
tags: [hr-strategiradar, ros, eksempel, sykefravær, høyrisiko, stopp]
category: examples
---

# ROS-eksempel: Individuell prioritering og risikoskåring (Høyrisiko — STOPP)

> [!NOTE]
> **Dette er et illustrativt, syntetisk eksempel på en ROS-analyse.**
> Det viser hvordan en prosjektgruppe kan bruke HR Strategiradar til å identifisere en høyrisiko KI-bruksoppgave som må stoppes eller snevres kraftig inn. Dette eksempelet er et arbeidsverktøy og en øvingsarena. Appen gir en foreløpig KI-diagnose, ikke et endelig resultat. Det inneholder ingen reelle personopplysninger og utgjør ikke en juridisk eller sikkerhetsfaglig verifikasjon eller endelig compliance-referanse.

---

## 1. Kontekst og Forankring

### 1.1 HR-mikroprosjekt (Kontekst)
* **Prosjektnavn:** Systematisk oppfølging av gradert sykefravær og tilrettelegging.
* **Formål og målsetting:** Redusere det samlede sykefraværet i hjemmetjenesten ved å sikre tidlig oppfølging og målrettete tilretteleggingstiltak for ansatte som står i fare for å gå over fra gradert til fullt sykefravær.

### 1.2 Konkret KI-bruksoppgave (Vurderingsenheten)
* **Beskrivelse av KI-oppgaven:** Utvikle eller ta i bruk en KI-algoritme som analyserer historiske fraværsdata, avdeling, alder, stillingstype og diagnosekoder (fra lukkede HR- og fagsystemer) for å **generere en individuell risikoskår** for hver enkelt ansatt. Systemet skal deretter automatisk **prioritere og foreslå hvilke ansatte lederen skal innkalle til oppfølging**, samt foreslå konkrete tiltak (f.eks. omplassering eller redusert vaktbelastning).
* **Forventet KI-rolle (foreløpig diagnose):** Delautomatisering eller Forsterket skjønn (KI foreslår en konkret prioritert liste av navngitte ansatte og tiltak som lederen forventes å agere på).

### 1.3 Roller og Ansvar
* **Beslutningseier (Ansvarlig leder):** Kommunaldirektør for HR og organisasjon.
* **Fasilitator/Rådgiver:** Organisasjonspsykolog / HR-rådgiver.
* **Deltakere i prosjektgruppen:** Hovedtillitsvalgte, verneombud, HR-systemansvarlig og to enhetsledere fra hjemmetjenesten.
* **Dato for vurdering:** 2026-06-09

---

## 2. Data- og Informasjonsgrunnlag

### 2.1 Datakilder
* **Inndata (Input):** Historiske sykefraværsdata (lengde, gradering), alder, kjønn, avdeling, stillingsbrøk, samt sensitive opplysninger som legemeldt fraværsårsak/diagnosekoder (ICPC-2/ICD-10) og notater fra tidligere oppfølgingssamtaler for 200 ansatte.
* **Utdata (Output):** En rangert liste over ansatte med en rød/gul/grønn risikoskår for langtidssykefravær, samt anbefalte tilretteleggingstiltak per person.

### 2.2 Håndtering av Personopplysninger
* **Behandles det personopplysninger (GDPR)?** Ja.
* **Inngår sensitive personopplysninger?** Ja, helseopplysninger (sykefraværsårsaker, medisinske oppfølgingsdata).
* *Konsekvens:* Behandlingen krever obligatorisk personvernkonsekvensvurdering (DPIA) i samarbeid med personvernombudet før oppstart.

---

## 3. Aktiverte HR-randsoner og Virksomhetskrav

- [x] **Arbeidsvilkår og partsforhold:** Svært høy påvirkning. Å bli satt på en "risikoliste" påvirker de ansattes arbeidsforhold, stillingsvern og karrieremuligheter.
- [x] **Helse, miljø og sikkerhet (HMS):** Høy påvirkning. Feilaktig risikoskåring eller manglende tilrettelegging kan forverre ansattes helse. Frykt for å bli overvåket eller skåret av en algoritme kan skape et helseskadelig psykososialt arbeidsmiljø (fryktkultur).
- [x] **Diskriminering og likebehandling (EU AI Act):** Høyrisiko-system. AI Act klassifiserer KI brukt til ansettelse, oppsigelse, oppgavefordeling eller evaluering av ansatte som høyrisiko. Det er stor fare for at historiske mønstre i fraværsdata diskriminerer (f.eks. kvinner i særskilte livsfaser eller eldre arbeidstakere).
- [x] **Lokal praksis og relasjonell tillit:** Kritisk berørt. Oppfølging av sykmeldte bygger på tillit, dialog og individuelt menneskelig skjønn som ikke kan settes bort til en matematisk modell.
- [x] **Lukket system og DPA (Offentlig KI-standard):** Usikkert. Modellen krever dyp integrasjon med HR-systemer, og leverandøren har ikke dokumentert tilstrekkelig lukkede API-er for helsedata.

---

## 4. Risikoscenarioer og Analyse

### Sannsynlighet (S) og Konsekvens (K) fra 1 (lav) til 5 (høy)

| ID | Risikoscenario | S (1-5) | K (1-5) | U (L/M/H) | Risikonivå (S x K) | Beskrivelse og berørte parter |
|---|---|---|---|---|---|---|
| R-01 | **Systematisk diskriminering (Bias):** Modellen skårer konsekvent ansatte med kroniske lidelser eller hyppige korttidsfravær (f.eks. småbarnsforeldre eller eldre ansatte) som "høy risiko", noe som fører til at de marginaliseres eller at ledere vegrer seg for å satse på dem. | 4 | 4 | M | **16 (Svært Høy)** | Alvorlig brudd på likestillings- og diskrimineringsloven. Berører sårbare ansatte. |
| R-02 | **Automation bias og tap av skjønn:** Ledere stoler blindt på "rødt flagg" fra KI-en, og innkaller ansatte uten å gjøre en egen faglig vurdering av den ansattes reelle situasjon. Den menneskelige kontrollen blir delvis illusorisk. | 4 | 4 | L | **16 (Svært Høy)** | Tap av rettssikkerhet for den ansatte, samt dårligere oppfølging. |
| R-03 | **Svekkket tillit og fryktkultur:** Ansatte opplever at HR bruker en "algoritme-spion" for å forutsi hvem som blir syke. Dette fører til at ansatte unngår å gradere sykmeldinger eller skjuler helseproblemer i frykt for å havne på risikolisten. | 4 | 5 | L | **20 (Svært Høy)** | Ødelegger partssamarbeidet og øker det reelle sykefraværet over tid. |
| R-04 | **Ulovlig behandling av helsedata:** Systemet lagrer eller behandler sensitive helsedata uten gyldig rettslig grunnlag eller tilstrekkelig informasjonssikkerhet. | 3 | 5 | H | **15 (Høy)** | GDPR-brudd med fare for store sanksjoner og omdømmetap. |
| R-05 | **Manglende reversibilitet:** En ansatt som feilaktig har fått merkelappen "høy risiko for langtidsfravær" i HR-systemet opplever at denne merkelappen henger ved og påvirker fremtidige karrieremuligheter, uten mulighet til å få den slettet. | 3 | 4 | M | **12 (Høy)** | Langvarig skade for den ansatte. |

---

## 5. Evaluering av Stoppregler (Rolle-tak)

*Gjennomgåelse av stoppregler fra beslutningsmodellen:*

| ID | Stoppregel | Status | Begrunnelse og konsekvens |
|---|---|---|---|
| **SR-01** | Rettigheter/betydelig påvirkning | **UTLØST** | Oppgaven påvirker ansattes rettigheter, helse og stillingsvern. Human oversight er i praksis svak eller ufullstendig på grunn av fare for automation bias hos travle linjeledere. *Tak settes til Utforskende støtte.* |
| **SR-02** | Lav separabilitet | **UTLØST** | Oppfølging og tilrettelegging er vevd sammen med relasjonell tillit, lokal kontekst og menneskelig skjønn. Dette kan ikke skilles ut til en algoritmisk risikoskår. *Tak settes to Utforskende støtte.* |
| **SR-03** | Svak forklarbarhet/oversight | **UTLØST** | Komplekse maskinlæringsmodeller er "svarte bokser". En leder vil ikke kunne forklare overfor en ansatt nøyaktig hvorfor algoritmen har plassert dem på en risikoliste. *Tak settes til Utforskende støtte.* |
| **SR-04** | Høy overreliance-risiko | **UTLØST** | Travle linjeledere har sterke insentiver til å bruke KI-listen som et udiskutabelt svar uten å gjøre egne tidkrevende undersøkelser. *Tak settes til Utforskende støtte.* |
| **SR-05** | Manglende beslutningslogg | **UTLØST** | Det foreligger ingen etablert eller testet struktur for å logge avvik, motargumenter og overstyring i denne typen sensitive saker. *Tak settes til Utforskende støtte.* |
| **SR-08** | Output kan ikke verifiseres | **UTLØST** | En "prediksjon" om fremtidig sykefravær er en hypotetisk antakelse som ikke kan verifiseres mot objektive fakta før hendelsen eventuelt inntreffer. *Tak settes til Utforskende støtte.* |

**Rolle-tak konklusjon:** Flere kritiske stoppregler er utløst. Foreløpig tillatt rolle er begrenset til **Utforskende støtte**. Individuell risikoskåring og prioritering er **strengt forbudt**.

---

## 6. Lokale Verifikasjonspunkter og Tiltak

### 6.1 Lokale verifikasjonskrav (Dersom prosjektet skulle vært omdefinert)
Dersom man i det hele tatt skal jobbe videre med dette feltet, må KI-bruksoppgaven endres fundamentalt:
1. **Aggregert nivå:** KI kan overhodet ikke behandle person-identifiserbare data. Oppgaven må avgrenses til utelukkende å analysere helt anonymiserte, aggregerte trender på tvers av hele kommunen (f.eks. "Hvilke måneder har høyest sykefravær i hjemmetjenesten generelt?").
2. **Fjerne helsedata:** Ingen diagnosekoder, sykefraværsårsaker eller personnotater kan mates inn i KI-verktøyet.
3. **PVO- og fagforeningsavklaring:** All bruk av KI på turnus- eller fraværsanalyser må avklares skriftlig med hovedtillitsvalgte og PVO etter en fullstendig DPIA.

### 6.2 Risikoreduserende tiltak
For den foreslåtte oppgaven (individuell risikoskåring) finnes det ingen tilstrekkelige risikoreduserende tiltak som gjør bruken forsvarlig.

---

## 7. Beslutningsnotat og Signering

### 7.1 Vurdering av Rest-risiko
* **Konklusjon rest-risiko:** Svært høy. Risikoen for diskriminering, personvernbrudd, rettstap og svekket tillit blant de ansatte er uakseptabel og i direkte strid med både likestillingsloven, arbeidsmiljøloven, GDPR og den kommende EU AI Act.

### 7.2 Endelig Beslutning (Beslutningseier)
- [x] **STOPP:** Den foreslåtte KI-bruksoppgaven (individuell risikoskåring og prioritering av ansatte) stoppes umiddelbart. KI skal **ikke** tas i bruk til dette formålet.

**Lederens begrunnelse for beslutningen:**
Som behandlingsansvarlig og beslutningseier kan jeg ikke akseptere en løsning som utsetter våre ansatte for algoritmisk profilering og potensell diskriminering i en sårbar sykefraværssituasjon. Vurderingen viser at dette verktøyet faller inn under høyrisikokategorien i EU AI Act og utløser alvorlige personvernmessige og etiske dilemmaer. Det er helt avgjørende at oppfølging av sykmeldte forblir en rent menneskelig oppgave preget av tillit, dialog og individuelt skjønn.

Prosjektgruppen oppfordres til å redefinere oppgaven. Hvis man ønsker å bruke KI, må det avgrenses til generelle, anonyme maler for samtalestruktur (lavrisiko), helt uten bruk av personopplysninger.

---

### Signaturer (Menneskelig ansvar)

________________________________________             ____________________
Kommunaldirektør for HR (Beslutningseier)             Dato

________________________________________             ____________________
Hovedtillitsvalgt (Representant for berørte parter)    Dato
