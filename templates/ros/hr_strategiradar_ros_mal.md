---
title: "ROS-mal for KI-bruksoppgaver i HR-mikroprosjekter"
date: 2026-06-09
status: draft
tags: [hr-strategiradar, ros, mal, risikovurdering, workshop]
category: templates
---

# ROS-mal for KI-bruksoppgaver i HR

> [!WARNING]
> **UTKAST FOR WORKSHOP-BRUK — IKKE EN ENDELIG JURIDISK VURDERING**
> Dette dokumentet er et arbeidsverktøy og en øvingsarena for prosjektgrupper. Appen gir en foreløpig KI-diagnose, ikke et endelig resultat. Det utgjør ikke en rettslig beslutning, sikkerhetsvurdering eller endelig compliance-erklæring. Alle vurderinger er kontekstavhengige og må verifiseres lokalt av virksomhetens ansvarlige leder, personvernombud (PVO) og sikkerhetsansvarlige.
>
> *Merk: Det må aldri legges inn reelle personopplysninger eller sensitive data i denne malen under utfylling i uisolerte systemer.*

---

## 1. Kontekst og Forankring

### 1.1 HR-mikroprosjekt (Kontekst)
*Beskriv den overordnede HR-saken eller initiativet som rammer inn denne vurderingen (f.eks. seniorbevaring, sykefraværsoppfølging, heltidskultur).*
* **Prosjektnavn:** [Skriv inn]
* **Formål og målsetting:** [Hva ønsker virksomheten å oppnå?]

### 1.2 Konkret KI-bruksoppgave (Vurderingsenheten)
*Definer nøyaktig hva KI-systemet skal gjøre. Dette er den spesifikke oppgaven som risikovurderes (ikke hele HR-prosjektet).*
* **Beskrivelse av KI-oppgaven:** [F.eks. strukturere anonymiserte fritekstinnspill, lage forslag til intervjuguide, osv.]
* **Forventet KI-rolle (foreløpig KI-diagnose):** [Utforskende støtte / Forsterket skjønn / Delautomatisering]

### 1.3 Roller og Ansvar
* **Beslutningseier (Ansvarlig leder):** [Rolle/tittel på den som eier beslutningen og står juridisk/faglig ansvarlig for utfallet]
* **Fasilitator/Rådgiver:** [Navn/rolle]
* **Deltakere i prosjektgruppen:** [Roller, f.eks. tillitsvalgt, verneombud, HR-rådgiver, linjeleder]
* **Dato for vurdering:** [Dato]

---

## 2. Data- og Informasjonsgrunnlag

### 2.1 Datakilder
*Hvilke data skal KI-systemet behandle eller trene på?*
* **Inndata (Input):** [Hva mates inn i verktøyet? F.eks. anonyme svar, statistikk, dokumentmaler]
* **Utdata (Output):** [Hva genererer verktøyet? F.eks. oppsummeringer, kategorier, utkast to tekst]

### 2.2 Håndtering av Personopplysninger
* **Behandles det personopplysninger (GDPR)?** [Ja / Nei]
* **Inngår sensitive personopplysninger (f.eks. helsedata, fagforeningsmedlemskap)?** [Ja / Nei]
* *Merk: Hvis JA på sensitive personopplysninger, utløses det som hovedregel krav om DPIA.*

---

## 3. Aktiverte HR-randsoner og Virksomhetskrav

*Kryss av for hvilke randsoner og krav som er berørt av denne KI-bruksoppgaven:*

- [ ] **Arbeidsvilkår og partsforhold:** Påvirker oppgaven turnus, belastning eller rettigheter der tillitsvalgte og verneombud må involveres etter Hovedavtalen?
- [ ] **Helse, miljø og sikkerhet (HMS):** Kan oppgaven påvirke ansattes fysiske eller psykososiale arbeidsmiljø?
- [ ] **Diskriminering og likebehandling (EU AI Act):** Kan oppgaven føre til utilsiktet forskjellsbehandling (bias) ved ansettelse, opprykk eller oppgavefordeling?
- [ ] **Lokal praksis og relasjonell tillit:** Er menneskelig nærvær, faglig skjønn og tillit en kritisk del av oppgaven?
- [ ] **Lukket system og DPA (Offentlig KI-standard):** Kjører verktøyet i et lukket miljø med gyldig databehandleravtale?

---

## 4. Risikoscenarioer og Analyse

*Vurder potensielle hendelser som kan inntreffe under utførelsen av KI-bruksoppgavens livssyklus.*

### Sannsynlighet og Konsekvens (Skala 1-5):
* **Sannsynlighet (S):** 1 (Urealistisk) til 5 (Svært sannsynlig)
* **Konsekvens (K):** 1 (Uvesentlig) til 5 (Katastrofal for ansatte/virksomheten)
* **Usikkerhet (U):** Lav, Middels, Høy (Beskriv kunnskapsgrunnlaget)

| ID | Risikoscenario (Hva kan gå galt?) | S (1-5) | K (1-5) | U (L/M/H) | Risikonivå (S x K) | Beskrivelse og berørte parter |
|---|---|---|---|---|---|---|
| R-01 | **Automation bias (blind tillit):** Leder/saksbehandler antar at KI-analysen er feilfri og gjør tiltak uten verifikasjon. | | | | | |
| R-02 | **Feilaktig kategorisering (Hallusinering):** Modellen feiltolker data eller dikter opp sammenhenger som fører til feil tiltak. | | | | | |
| R-03 | **Utilsiktet re-identifisering:** Anonymiserte fritekstfelt inneholder indirekte identifiserbare opplysninger som avslører enkeltpersoner. | | | | | |
| R-04 | **Svekket tillit og medvirkning:** Ansatte opplever prosessen som ugjennomsiktig ("svart boks") og mister tillit til HR. | | | | | |
| R-05 | [Eget scenario basert på lokal kontekst] | | | | | |

---

## 5. Evaluering av Stoppregler (Rolle-tak)

*Gjennomgå stoppreglene for å avgjøre om den planlagte bruken må begrenses. Skåring kan aldri overstyre en stoppregel.*

| ID | Stoppregel | Status (Utløst / Ikke utløst) | Begrunnelse og konsekvens for KI-rolle |
|---|---|---|---|
| **SR-01** | **Rettigheter/betydelig påvirkning uten reell kontroll:** Påvirker oppgaven rettigheter, arbeid eller helse, og human oversight er svak? *Tak: Utforskende støtte.* | | |
| **SR-02** | **Lav separabilitet:** Oppgaven kan ikke skilles fra helhetlig menneskelig skjønn, relasjon eller lokal kontekst. *Tak: Utforskende støtte.* | | |
| **SR-03** | **Svak forklarbarhet/human oversight:** Saksbehandler mangler tid, kompetanse eller myndighet til å overstyre systemet. *Tak: Utforskende støtte.* | | |
| **SR-04** | **Høy overreliance-risiko:** Arbeidsflyten legger opp til automatisk aksept uten manuell verifikasjon eller motargumenter. *Tak: Utforskende støtte.* | | |
| **SR-05** | **Manglende beslutningslogg i høyrisiko-sak:** Saken har høy risiko og logg for vurdering, verifikasjon og ansvar mangler. *Tak: Utforskende støtte.* | | |
| **SR-06** | **Sterk verdikonflikt:** Tydelig mål, men krever etiske, politiske eller relasjonelle avveininger. *Tak: Utforskende støtte / Forsterket skjønn.* | | |
| **SR-07** | **Vanskelig å oppdage/reversere feil:** Feil in KI-output kan ikke lett rettes før det får konsekvenser. *Tak: Forsterket skjønn / Utforskende støtte.* | | |
| **SR-08** | **Output kan ikke verifiseres:** KI-output kan ikke kryssjekkes mot kilde, regel eller rådata. *Tak: Utforskende støtte.* | | |

---

## 6. Lokale Verifikasjonspunkter og Tiltak

### 6.1 Lokale verifikasjonskrav (Må sjekkes før bruk av KI-output)
1. **Kildekritikk:** Hvordan skal saksbehandler kontrollere at KI-oppsummeringen stemmer overens med rådataene?
2. **Grensesnitt mot tillitsvalgte:** Hvordan sikres reell partsmedvirkning og informasjon før oppstart?
3. **Teknisk sikring:** Er det verifisert at databehandleravtalen (DPA) dekker denne spesifikke bruken?

### 6.2 Risikoreduserende tiltak
*Beskriv tiltakene som skal iverksettes for å redusere risikoen før oppstart.*

| Scenario ID | Beskrivelse av tiltak | Ansvarlig eier | Tidsfrist | Status |
|---|---|---|---|---|
| F.eks. R-01 | Etablere obligatorisk "makkersjekk" av KI-genererte tiltakshypoteser. | HR-sjef | Før pilotering | Planlagt |
| | | | | |
| | | | | |

---

## 7. Beslutningsnotat og Signering

### 7.1 Vurdering av Rest-risiko
*Er risikoen akseptabel etter at tiltakene er gjennomført? Beskriv eventuell gjenværende usikkerhet.*
* **Konklusjon rest-risiko:** [Lav / Middels (krever løpende oppfølging) / Høy (kan ikke besluttes uten eskalering)]

### 7.2 Endelig Beslutning (Fylles ut av beslutningseier)
- [ ] **Aksepter:** Oppgaven kan utføres innenfor rammen av foreløpig tillatt rolle (f.eks. utforskende støtte) med avtalte tiltak.
- [ ] **Avgrens:** Oppgaven må snevres inn (f.eks. kun bruke syntetiske data, eller fjerne visse fritekstfelt).
- [ ] **Eskaler:** Saken må forelegges PVO, jurist eller ledergruppen før beslutning tas.
- [ ] **Stopp:** Risikoen er for høy eller i strid med virksomhetskrav/stoppregler. KI skal ikke brukes til denne oppgaven.

**Begrunnelse for beslutning:**
*[Skriv en kort oppsummering av den faglige vurderingen bak valget. Hvorfor er denne bruken forsvarlig eller ikke forsvarlig i vår lokale kontekst?]*

---

### Signaturer (Menneskelig ansvar)

Ved å signere bekrefter beslutningseier at vurderingen er reell, at tiltakene vil bli fulgt opp, og at ansvaret for beslutningen forblir hos mennesket (human-in-the-loop).

________________________________________             ____________________
Beslutningseier (Ansvarlig leder)                     Dato

________________________________________             ____________________
Representant for berørte parter / Tillitsvalgt        Dato
