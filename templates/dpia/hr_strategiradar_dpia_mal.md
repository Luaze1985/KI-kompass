---
title: "DPIA-mal for KI-bruksoppgaver i HR-mikroprosjekter"
date: 2026-06-09
status: draft
tags: [hr-strategiradar, dpia, mal, personvern, gdpr, workshop]
category: templates
---

# DPIA-mal for KI-bruksoppgaver i HR

> [!WARNING]
> **UTKAST FOR WORKSHOP-BRUK — IKKE EN ENDELIG JURIDISK VURDERING**
> Dette dokumentet er et arbeidsverktøy og en øvingsarena for prosjektgrupper for å forberede en vurdering av personvernkonsekvenser (DPIA - Data Protection Impact Assessment) etter GDPR artikkel 35. Appen gir en foreløpig KI-diagnose, ikke et endelig resultat.
>
> **PVOs rolle:** Personvernombudet (PVO) har en rådgivende og konsulterende rolle under utarbeidelsen, men det er virksomhetens ledelse (behandlingsansvarlig) som står juridisk ansvarlig og fatter den endelige beslutningen. Dette verktøyet kan ikke erstatte eller automatisere PVOs eller behandlingsansvarliges selvstendige vurdering og konklusjon.
>
> *Merk: Det må aldri legges inn reelle personopplysninger eller sensitive data i denne malen under utfylling i uisolerte systemer.*

---

## 1. Behandlingsansvarlig og Administrative Detaljer

* **Virksomhet (Behandlingsansvarlig):** [Skriv inn, f.eks. Oslo kommune, Bergen kommune, etc.]
* **Ansvarlig leder (Beslutningstaker):** [Navn og stillingstittel]
* **Kontaktperson for prosjektet:** [Navn og stillingstittel]
* **Dato for påbegynt DPIA:** [Dato]
* **Dato for rådføring med Personvernombudet (PVO):** [Dato]

---

## 2. Beskrivelse av Behandlingen og Formål

### 2.1 HR-mikroprosjekt (Kontekst)
*Beskriv den overordnede HR-konteksten (f.eks. sykefraværsoppfølging, medarbeiderundersøkelser, kompetansekartlegging).*
* **Prosjektnavn:** [Skriv inn]
* **HR-kontekst:** [Kort beskrivelse av formålet med HR-initiativet]

### 2.2 Konkret KI-bruksoppgave (Vurderingsenheten)
*Beskriv nøyaktig hva KI-systemet skal brukes til i denne behandlingen.*
* **Beskrivelse av KI-oppgaven:** [F.eks. oppsummere møtenotater, analysere strukturerte fritekstfelt, foreslå oppfølgingstemaer]
* **Hvorfor er det nødvendig å bruke KI til denne oppgaven?** [Begrunn hvorfor man bruker KI fremfor tradisjonelle verktøy]

### 2.3 System, Leverandør og Infrastruktur
* **Navn på KI-system/modell:** [F.eks. lukket GPT-instans via virksomhetens skyløsning]
* **Leverandør:** [Navn på leverandør]
* **Databehandleravtale (DPA):**
  - [ ] Ja, gyldig og signert DPA foreligger.
  - [ ] Nei (behandlingen kan ikke igangsettes før dette er på plass).
* **Systemegenskaper:** Kjører systemet i et lukket miljø der inndata ikke brukes til å trene leverandørens modeller? [Ja / Nei]

---

## 3. Informasjonskategorier og Dataflyt

### 3.1 Kategorier av Registrerte
*Hvem behandles det opplysninger om? (Sett kryss)*
- [ ] Ansatte (inkludert midlertidige og deltid)
- [ ] Jobbsøkere
- [ ] Lærlinger / Praktikanter
- [ ] Tidligere ansatte
- [ ] Annet: [Beskriv]

### 3.2 Kategorier av Personopplysninger
*Hvilke opplysninger mates inn i KI-verktøyet? (Sett kryss)*
* **Alminnelige personopplysninger (GDPR art. 6):**
  - [ ] Navn, ansattnummer, e-post
  - [ ] Stilling, avdeling, stillingsbrøk
  - [ ] Turnusdata, arbeidstid, historikk
  - [ ] Fritekstnotater fra samtaler/møter
  - [ ] Kompetanse, utdanning, kurs
* **Særlige kategorier av personopplysninger / Sensitive data (GDPR art. 9):**
  - [ ] Helseopplysninger (f.eks. sykefraværsårsaker, tilretteleggingsbehov, funksjonsevne)
  - [ ] Fagforeningsmedlemskap
  - [ ] Etnisk opprinnelse, religion eller filosofisk overbevisning
  - [ ] Biometriske eller genetiske data
  - [ ] Annet: [Beskriv]

### 3.3 Dataflyt og Dataminimering
* Beskriv hvordan data flyter fra kildesystemet, inn i KI-verktøyet, og hvor resultatene lagres.
* Hvilke tiltak gjøres for å begrense mengden personopplysninger (dataminimering)? (F.eks. fjerning av navn, maskering av sensitive ord før innsending).

---

## 4. Rettslig Grunnlag (Må avklares av virksomheten)

*Merk: Virksomheten må selv fastsette det rettslige grunnlaget. PVO kan gi råd.*

### 4.1 Rettslig grunnlag for alminnelige opplysninger (GDPR art. 6)
- [ ] **Art. 6 (1) (c) - Rettslig forpliktelse:** Behandlingen er nødvendig for å oppfylle en rettslig plikt som påhviler behandlingsansvarlig (f.eks. oppfølgingsplikt etter arbeidsmiljøloven).
- [ ] **Art. 6 (1) (e) - Offentlig myndighetsutøvelse/allmennhetens interesse:** Behandlingen er nødvendig for å utføre en oppgave i allmennhetens interesse eller utøve offentlig myndighet.
- [ ] **Art. 6 (1) (f) - Berettiget interesse:** Behandlingen er nødvendig for formål knyttet til berettigede interesser (krever en egen avveiningstest).
- [ ] **Annet:** [Beskriv]

### 4.2 Behandlingsgrunnlag for særlige kategorier (GDPR art. 9)
*Hvis sensitive opplysninger behandles, må det også foreligge et unntak fra forbudet i art. 9 (1):*
- [ ] **Art. 9 (2) (b) - Arbeidsrettslige forpliktelser:** Nødvendig for at behandlingsansvarlig eller den registrerte skal kunne oppfylle sine forpliktelser og utøve sine særlige rettigheter på området arbeidsrett, trygderett og sosialrett.
- [ ] **Art. 9 (2) (h) - Helse- og sosialtjenester:** Nødvendig i forbindelse med forebyggende medisin eller arbeidsmedisin, for å vurdere arbeidstakerens arbeidsevne.
- [ ] **Annet:** [Beskriv]

---

## 5. Nødvendighet og Forholdsmessighet (Proporsjonalitet)

1. **Egnethet:** Er bruken av KI et egnet middel til å oppnå det definerte formålet?
2. **Nødvendighet:** Kan formålet oppnås med andre, mindre inngripende midler (f.eks. tradisjonell saksbehandling eller manuelle verktøy)?
3. **Forholdsmessighet:** Står nytten av KI-bruken i et rimelig forhold til inngrepet i de ansattes personvern? *Vurder maktforholdet mellom arbeidsgiver og ansatt.*

---

## 6. Risikovurdering for de Registrertes Rettigheter og Friheter

*Vurder risikoen for de berørte ansatte/jobbsøkerne (f.eks. tap av kontroll over egne data, forskjellsbehandling, urimelig overvåking, uriktige beslutninger).*

### Risikokategorier:
* **Konsekvens (K):** 1 (Uvesentlig) til 5 (Katastrofal for den registrerte)
* **Sannsynlighet (S):** 1 (Svært usannsynlig) til 5 (Svært sannsynlig)
* **Risiko uten tiltak (K x S)**

| ID | Risikobeskrivelse | K (1-5) | S (1-5) | Risiko (Uten tiltak) | Beskrivelse av konsekvens for den registrerte |
|---|---|---|---|---|---|
| PR-01 | **Automation Bias og manglende rettssikkerhet:** Saksbehandler stoler blindt på KI-sammendraget av sykefraværet, og går glipp av viktige medisinske nyanser, noe som fører til uegnet eller mangelfull tilrettelegging. | | | | |
| PR-02 | **Feilaktig profilering/diskriminering:** Systemet avdekker mønstre på en måte som fører til at visse ansatte eller grupper ubevisst forskjellsbehandles (f.eks. basert på fraværsmønster). | | | | |
| PR-03 | **Lekkasje eller uautorisert innsyn:** Sensitive helseopplysninger lagres i en usikret KI-logg eller sendes ut av virksomhetens kontrollerte sone. | | | | |
| PR-04 | **Manglende transparens og etterprøvbarhet:** Den ansatte får ikke vite at KI har vært brukt i prosessen, eller klarer ikke å korrigere eventuelle feilaktige antakelser systemet har gjort. | | | | |

---

## 7. Planlagte Tiltak og Human-in-the-loop

*Beskriv tiltakene for å minimere personvernrisikoen. Menneskelig kontroll skal være reell og aktiv.*

### 7.1 Menneskelig overoppsyn (Human-in-the-loop)
* **Hvordan skal human-in-the-loop sikres i praksis?** [F.eks. saksbehandler må alltid lese rådataene og skrive sin egen vurdering før oppfølgingsmøtet. KI-generert innhold skal aldri kopieres rått.]
* **Hvordan unngås automation bias?** [Beskriv opplæring, retningslinjer eller systemfriksjon.]

### 7.2 Tekniske og organisatoriske tiltak
| Risiko ID | Planlagt tiltak | Ansvarlig | Tidsfrist |
|---|---|---|---|
| F.eks. PR-03 | Automatisk sletting av inndata fra KI-loggen etter 30 dager. | IT-sikkerhet | Før oppstart |
| F.eks. PR-04 | Tydelig merking i møteinnkallingen om at KI brukes som strukturstøtte for leder. | HR-rådgiver | Ved oppstart |
| | | | |

---

## 8. PVOs Rådgivende Uttalelse og Rest-risiko

### 8.1 Personvernombudets (PVO) vurdering (Fylles ut etter rådføring med PVO)
*PVOs kommentarer til DPIA-utkastet, rettslig grunnlag, risiko og foreslåtte tiltak:*
* **PVOs uttalelse:** [PVO fyller inn sine råd og anbefalinger her]
* **Er PVO enig i risikovurderingen?** [Ja / Nei / Delvis]

### 8.2 Endelig vurdering av Rest-risiko
*Etter at alle tiltak er iverksatt, er risikoen redusert til et akseptabelt nivå?*
* **Rest-risiko:** [Lav / Middels (akseptabel med løpende kontroll) / Høy]
* *Viktig: Hvis rest-risikoen forblir HØY, er virksomheten rettslig forpliktet til å rådføre seg med Datatilsynet før behandlingen kan starte (GDPR art. 36).*

---

## 9. Behandlingsansvarliges Beslutning

*Fylles ut av ansvarlig leder på vegne av behandlingsansvarlig virksomhet, basert på ROS, DPIA og råd fra PVO.*

- [ ] **Igangsettes:** Behandlingen startes med de beskrevne tiltakene. Rest-risiko anses som akseptabel.
- [ ] **Igangsettes med vilkår:** Behandlingen kan starte, men ytterligere tiltak må være implementert innen [Dato].
- [ ] **Stoppet / Avvist:** Behandlingen kan ikke igangsettes. Risikoen er for høy for de ansatte, eller behandlingen mangler tilstrekkelig rettslig grunnlag.

**Lederens begrunnelse for beslutningen:**
*[Her dokumenterer lederen sin selvstendige faglige og juridiske avveining. Hvorfor velger man å gå videre, avgrense eller stoppe oppgaven?]*

---

### Signaturer

________________________________________             ____________________
Ansvarlig leder (Behandlingsansvarlig)                Dato

________________________________________             ____________________
Personvernombud (PVO) - Rådgivende rolle              Dato
*Merk: PVO signerer for å bekrefte at rådgivning har funnet sted, ikke for å bekrefte eller overta behandlingsansvarliges lederansvar.*
