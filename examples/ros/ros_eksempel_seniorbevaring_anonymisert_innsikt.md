---
title: "ROS-eksempel: Seniorbevaring - Anonymisert innsikt"
date: 2026-06-09
status: draft
tags: [hr-strategiradar, ros, eksempel, seniorbevaring, lavrisiko]
category: examples
---

# ROS-eksempel: Seniorbevaring — Anonymisert innsikt (Lavrisiko)

> [!NOTE]
> **Dette er et illustrativt, syntetisk eksempel på en ROS-analyse.**
> Det er utarbeidet for å vise hvordan en prosjektgruppe kan gjennomføre en strukturert vurdering av en lavrisiko KI-bruksoppgave. Dette eksempelet er et arbeidsverktøy og en øvingsarena. Appen gir en foreløpig KI-diagnose, ikke et endelig resultat. Det inneholder ingen reelle personopplysninger og utgjør ikke en juridisk eller sikkerhetsfaglig verifikasjon eller endelig compliance-referanse.

---

## 1. Kontekst og Forankring

### 1.1 HR-mikroprosjekt (Kontekst)
* **Prosjektnavn:** Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.
* **Formål og målsetting:** Kommunen ønsker å beholde senioransatte (sykepleiere og helsefagarbeidere) lenger i jobb i hjemmetjenesten. Målet er å identifisere hvilke felles utfordringer seniorene opplever, og utvikle en tilpasset livsfasepolitikk som kan redusere avgang og sykefravær.

### 1.2 Konkret KI-bruksoppgave (Vurderingsenheten)
* **Beskrivelse av KI-oppgaven:** Bruke en lukket KI-modell til å strukturere og kategorisere anonymiserte fritekstinnspill fra medarbeidersamtaler og workshops med senioransatte, samt generere overordnede tiltakshypoteser til intern drøfting.
* **Forventet KI-rolle (foreløpig diagnose):** Utforskende støtte (KI fungerer som en sparringspartner for å sortere mønstre, men tar ingen beslutninger og har ingen direkte påvirkning på enkeltpersoner).

### 1.3 Roller og Ansvar
* **Beslutningseier (Ansvarlig leder):** HR-sjef i Helse og velferd.
* **Fasilitator/Rådgiver:** Senior HR-rådgiver.
* **Deltakere i prosjektgruppen:** Avdelingsledere i hjemmetjenesten, hovedtillitsvalgt (NSF/Fagforbundet) og hovedverneombud.
* **Dato for vurdering:** 2026-06-09

---

## 2. Data- og Informasjonsgrunnlag

### 2.1 Datakilder
* **Inndata (Input):** Tekstnotater fra 45 anonymiserte intervjuer og gruppediskusjoner med ansatte over 55 år. Alle navn, avdelingsnavn og spesifikke personreferanser er manuelt fjernet før innsending.
* **Utdata (Output):** En liste over de 5 mest siterte utfordringene (f.eks. tunge løft, helgevakter, mangel på faglig utvikling) og 3-4 forslag til generelle tiltak (f.eks. tilpasset turnus, ergonomisk utstyr).

### 2.2 Håndtering av Personopplysninger
* **Behandles det personopplysninger (GDPR)?** Nei, datagrunnlaget skal være reelt anonymisert.
* **Inngår sensitive personopplysninger?** Nei.
* *Sikkerhetsforanstaltning:* Prosjektgruppen har etablert en streng manuell sjekkliste for å sikre at ingen indirekte identifiserbare opplysninger (f.eks. "den eneste mannlige sykepleieren på natt på sone X") sendes til KI-systemet.

---

## 3. Aktiverte HR-randsoner og Virksomhetskrav

- [x] **Arbeidsvilkår og partsforhold:** De foreslåtte tiltakene kan berøre turnus og livsfasegoder. Tillitsvalgte og verneombud deltar i prosjektgruppen.
- [ ] **Helse, miljø og sikkerhet (HMS):** Ingen direkte HMS-påvirkning av selve KI-oppgaven (men tiltakene som drøftes kan ha positiv HMS-effekt).
- [ ] **Diskriminering og likebehandling (EU AI Act):** Lav risiko. Ingen ansettelse, rangering eller individuell oppgavefordeling.
- [x] **Lokal praksis og relasjonell tillit:** Viktig. De ansatte må ha tillit til at innspillene behandles konfidensielt og at KI ikke brukes til å "overvåke" eller tolke enkeltpersoner.
- [x] **Lukket system og DPA (Offentlig KI-standard):** Ja, det brukes en intern instans av virksomhetens tilrettelagte KI-løsning med signert DPA.

---

## 4. Risikoscenarioer og Analyse

### Sannsynlighet (S) og Konsekvens (K) fra 1 (lav) til 5 (høy)

| ID | Risikoscenario | S (1-5) | K (1-5) | U (L/M/H) | Risikonivå (S x K) | Beskrivelse og berørte parter |
|---|---|---|---|---|---|---|
| R-01 | **Automation bias (blind tillit):** HR-gruppen stoler blindt på KI-ens oppsummering av årsakene til avgang, og overser mer subtile, men viktige lokale problemer (f.eks. dårlig ledelseskultur på en spesifikk avdeling). | 3 | 2 | L | **6 (Lav)** | Kan føre til at vi retter tiltakene mot feil problemer (feildiagnose). Berører senioransatte og ledergruppen. |
| R-02 | **Feilaktig kategorisering:** KI-en mistolker eller overforenkler fritekstinnspillene (hallusinerer eller mister kontekst). | 2 | 2 | L | **4 (Lav)** | Genererer svake tiltakshypoteser. Berører prosjektet. |
| R-03 | **Indirekte re-identifisering:** Enkeltansatte skriver så detaljert om egne helse- eller livsforhold at de gjenkjennes i oppsummeringen som KI-en lager. | 2 | 3 | M | **6 (Lav)** | Brudd på anonymitet og personvern. Berører den ansatte. |
| R-04 | **Svekket tillit:** Ansatte får vite at "en maskin" har analysert medarbeidersamtalene deres, noe som skaper frykt for overvåking og reduserer viljen til å gi ærlige innspill i fremtiden. | 2 | 3 | L | **6 (Lav)** | Ødelegger medvirkningskulturen. Berører hele organisasjonen. |

---

## 5. Evaluering av Stoppregler (Rolle-tak)

| ID | Stoppregel | Status | Begrunnelse og konsekvens |
|---|---|---|---|
| **SR-01** | Rettigheter/betydelig påvirkning | **Ikke utløst** | Oppgaven påvirker ikke rettigheter direkte. Den lager kun generelle tiltakshypoteser. |
| **SR-02** | Lav separabilitet | **Ikke utløst** | Å strukturere tekst er en oppgave som fint kan skilles ut. Selve den etiske og faglige vurderingen av tiltakene beholdes hos prosjektgruppen. |
| **SR-03** | Svak forklarbarhet/oversight | **Ikke utløst** | Det er full transparens. Prosjektgruppen har tilgang til de originale anonymiserte innspillene og kan enkelt kryssjekke KI-ens oppsummeringer. |
| **SR-04** | Høy overreliance-risiko | **Ikke utløst** | Gruppen er bevisst på faren og har lagt opp til manuell evaluering av alle hypoteser. |
| **SR-05** | Manglende beslutningslogg | **Ikke utløst** | Det føres et beslutningsnotat (dette dokumentet) som logger prosessen. |
| **SR-06** | Sterk verdikonflikt | **Ikke utløst** | Det er bred enighet om målet (å beholde seniorene). Eventuelle ressurskonflikter løses manuelt i drøftingen av tiltakene. |
| **SR-07** | Vanskelig å oppdage/reversere feil | **Ikke utløst** | Feil i oppsummeringen vil raskt oppdages i drøftingsmøtene og har ingen direkte negative konsekvenser for enkeltansatte. |
| **SR-08** | Output kan ikke verifiseres | **Ikke utløst** | Output kan enkelt kryssjekkes mot de opprinnelige tekstnotatene. |

**Rolle-tak konklusjon:** Ingen stoppregler er utløst. Foreløpig tillatt rolle er **Utforskende støtte**.

---

## 6. Lokale Verifikasjonspunkter og Tiltak

### 6.1 Lokale verifikasjonskrav
1. **To-stegs anonymiseringskontroll:** To HR-rådgivere skal uavhengig av hverandre lese gjennom fritekstene og fjerne direkte og indirekte identifikatorer (f.eks. referanser til unike prosjekter eller spesielle hendelser) før dataene mates inn i KI-verktøyet.
2. **Kvalitetssjekk mot rådata:** Prosjektgruppen skal stikkprøvekontrollere minst 10 % av KI-kategoriene mot rådataene for å verifisere at oppsummeringen er representativ.
3. **Transparens og informasjon:** Det skal sendes ut informasjon til alle deltakere på forhånd om hvordan innspillene samles inn, anonymiseres, og at KI utelukkende brukes som et verktøy for å strukturere tekst.

### 6.2 Risikoreduserende tiltak
* **For R-01 (Automation Bias):** Etablere en fast spilleregel i workshop-møtene: *"Vi drøfter aldri et KI-generert tiltak uten at vi først har spurt om det finnes andre, lokale forklaringer som KI-en ikke kunne fange opp."*
* **For R-04 (Svekket tillit):** Sikre at de tillitsvalgte og verneombudet er med på å kvalitetssikre informasjonsskrivet som sendes ut til de ansatte.

---

## 7. Beslutningsnotat og Signering

### 7.1 Vurdering av Rest-risiko
* **Konklusjon rest-risiko:** Lav. Gjennom grundig manuell anonymisering og aktiv menneskelig kontroll i drøftingsfasen anses risikoen for de registrertes rettigheter og friheter som minimal.

### 7.2 Endelig Beslutning
- [x] **Aksepter:** Oppgaven aksepteres utført som **Utforskende støtte** under forutsetning av at verifikasjonspunktene i punkt 6 følges.

**Begrunnelse for beslutning:**
Bruk av KI til å strukturere tekst sparer betydelig tid for HR, og gjør det lettere å finne fellesnevnere i et stort tekstmateriale. Siden systemet kjører i et lukket miljø og dataene er strengt anonymisert, og KI-en kun brukes som strukturstøtte i en prosess der mennesker tar alle beslutninger, vurderes dette som en trygg og hensiktsmessig bruk av ny teknologi.

---

### Signaturer (Menneskelig ansvar)

________________________________________             ____________________
HR-sjef (Beslutningseier)                             Dato

________________________________________             ____________________
Hovedtillitsvalgt (Representant for berørte parter)    Dato
