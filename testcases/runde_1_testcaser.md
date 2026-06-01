---
title: Runde 1 testcaser
date: 2026-05-12
status: ready
tags: [testcaser, scoremodell, runde-1, arkitektur]
category: testcases
---

# Runde 1 testcaser

## Formål

Dette dokumentet tester `decision_model/scoremodell_runde_1.md` mot realistiske caser før vekting, stoppregler eller appflyt låses.

Alle roller under er foreløpige vurderinger. De skal ikke leses som endelig beslutning eller som automatisk godkjenning av KI-bruk.

Merk: For HR Strategiradar MVP er `testcases/hr_strategiradar_realistiske_caser.md` nå primært casegrunnlag. Dette dokumentet beholdes som bredt sekundært kontrollsett på tvers av domener.

## Testregel

Rekkefølgen i alle caser er:

```text
Kart -> stoppregler -> målklarhet -> separabilitet -> kontrollkrav -> foreløpig KI-rolle -> beslutningslogg
```

Skala:

- 1-2 = lav
- 3 = middels
- 4-5 = høy

Forkortelser:

- MK = målklarhet
- SEP = separabilitet
- FHO = forklarbarhet/human oversight
- AOR = anti-overreliance

## Samlet resultat

| # | Case | Domene | MK | SEP | FHO | AOR | Stoppregel før rolle | Foreløpig KI-rolle |
|---:|---|---|---:|---:|---:|---:|---|---|
| 1 | HMS-kurs fullført | HR / lavrisiko administrasjon | 5 | 5 | 4 | 4 | Nei | Kandidat for delautomatisering |
| 2 | Rangere jobbsøkere | HR / høy risiko | 4 | 2 | 2 | 2 | Ja | Utforskende støtte, ikke rangering |
| 3 | Nedbemanning | HR / høy risiko | 4 | 1 | 2 | 2 | Ja | Menneskelig beslutning, KI kun som sparring |
| 4 | Manglende byggesøknadsdokumentasjon | Offentlig sektor | 5 | 4 | 4 | 4 | Nei | Delautomatisering med saksbehandlerkontroll |
| 5 | Avslag på sosialhjelp | Offentlig sektor / rettigheter | 3 | 1 | 2 | 2 | Ja | Menneskelig beslutning med dokumentasjonsstøtte |
| 6 | Lagerpåfyll under terskel | SMB / lavrisiko drift | 5 | 5 | 4 | 4 | Nei | Kandidat for automatisert forslag med logg |
| 7 | Lavverdi leverandørvalg | SMB / innkjøp | 4 | 4 | 3 | 3 | Nei | Forsterket skjønn / delautomatisering |
| 8 | Ny markedsstrategi | Strategi | 3 | 1 | 3 | 2 | Ja | Utforskende støtte |
| 9 | Ruting av kundehenvendelse | Kundedialog | 5 | 5 | 4 | 4 | Nei | Delautomatisering med eskalering |
| 10 | Kompensasjon i sårbar klagesak | Kundedialog / høy påvirkning | 4 | 2 | 2 | 2 | Ja | Forsterket skjønn, ikke automatisert avgjørelse |

## Caser

### 1. HMS-kurs fullført

Beskrivelse:

En virksomhet vil bruke KI eller automatiserte regler til å kontrollere om ansatte har fullført obligatorisk HMS-kurs før de får tilgang til et internt system.

Kart:

- Beslutningseier: HR/driftsansvarlig.
- Berørte parter: ansatte.
- Risiko: lav til middels.
- Verdi: rask kontroll av et objektivt krav.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 5 | Målet er presist: kurs fullført eller ikke fullført. |
| SEP | 5 | Deloppgaven er isolert, standardisert og reversibel. |
| FHO | 4 | Ansvarlig kan forklare og rette feil hvis kursstatus er feil. |
| AOR | 4 | Lav risiko for blind tillit hvis kildesystem og logg vises. |

Stoppregel:

Ingen stoppregel utløses hvis kildesystemet er synlig og feil kan korrigeres.

Foreløpig rolle:

Kandidat for delautomatisering. Automatisk sperre bør bare brukes hvis den ansatte får varsel, forklaring og enkel klage-/rettemulighet.

Beslutningslogg:

Logg kursstatus, kilde, tidspunkt, varsel og eventuell manuell overstyring.

### 2. Rangere jobbsøkere

Beskrivelse:

HR vil bruke KI til å rangere søkere før intervju.

Kart:

- Beslutningseier: HR-leder.
- Berørte parter: jobbsøkere.
- Risiko: høy, fordi arbeid, diskriminering og rettferdighet påvirkes.
- Verdi: raskere sortering, men betydelig tillits- og rettferdighetsrisiko.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 4 | Målet kan formuleres tydelig, men kriteriene er ofte normative. |
| SEP | 2 | Kandidatvurdering krever skjønn, kontekst og diskrimineringskontroll. |
| FHO | 2 | Kontroll kan lett bli gummistempel hvis HR bare godkjenner KI-rangering. |
| AOR | 2 | Høy risiko for at rangering oppfattes som objektiv fasit. |

Stoppregel:

Ja. Beslutningen påvirker arbeid, rettigheter og likebehandling. Human oversight er ikke reell hvis KI-rangeringen brukes som startfasit.

Foreløpig rolle:

Utforskende støtte. KI kan hjelpe med å strukturere kvalifikasjonskrav eller foreslå intervjuspørsmål, men skal ikke rangere kandidater.

Beslutningslogg:

Logg menneskelig vurdering, kriterier, avvik fra KI-forslag, diskrimineringskontroll og hvem som tok endelig beslutning.

### 3. Nedbemanning

Beskrivelse:

En ledergruppe vurderer om KI kan støtte valg av hvilke roller eller ansatte som skal omfattes av nedbemanning.

Kart:

- Beslutningseier: ledergruppe med HR og juridisk støtte.
- Berørte parter: ansatte, tillitsvalgte, virksomhet.
- Risiko: svært høy.
- Verdi: struktur, men beslutningen krever ansvarlig menneskelig skjønn.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 4 | Målet kan være klart: redusere kostnader eller kapasitet. |
| SEP | 1 | Beslutningen er ikke trygt separerbar fra kontekst, juss, relasjon og etikk. |
| FHO | 2 | Forklaring og overstyring er krevende, og kontroll kan bli formell. |
| AOR | 2 | Høy risiko for at tallgrunnlag og KI-forslag skjuler verdikonflikt. |

Stoppregel:

Ja. Beslutningen påvirker arbeid og livssituasjon, krever relasjonelt og juridisk skjønn, og feil kan være vanskelig å reparere.

Foreløpig rolle:

Menneskelig beslutning. KI kan kun brukes som sparring for scenarioer, dokumentasjonsstruktur eller risikospørsmål.

Beslutningslogg:

Logg menneskelig begrunnelse, vurderte alternativer, motargumenter, juridiske vurderinger, usikkerhet og endelig ansvarlig.

### 4. Manglende byggesøknadsdokumentasjon

Beskrivelse:

En kommune vil bruke KI til å varsle at en byggesøknad mangler obligatoriske vedlegg før saksbehandling starter.

Kart:

- Beslutningseier: byggesaksenhet.
- Berørte parter: søker og saksbehandler.
- Risiko: middels.
- Verdi: raskere avklaring og færre ufullstendige saker.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 5 | Kravet er tydelig: bestemte dokumenter må være levert. |
| SEP | 4 | Oppgaven kan skilles fra den skjønnsmessige byggesaksavgjørelsen. |
| FHO | 4 | Saksbehandler og søker kan se hva som mangler. |
| AOR | 4 | Lavere overreliance hvis systemet viser kildekrav og lar bruker rette. |

Stoppregel:

Ingen stoppregel hvis løsningen bare varsler mangler og ikke avslår søknaden.

Foreløpig rolle:

Delautomatisering med saksbehandlerkontroll. KI kan foreslå mangelliste, men ikke fatte avslag.

Beslutningslogg:

Logg dokumentkrav, funn, varseltekst, retting og eventuell manuell endring.

### 5. Avslag på sosialhjelp

Beskrivelse:

En offentlig virksomhet vurderer KI-støtte til å foreslå avslag på sosialhjelp.

Kart:

- Beslutningseier: saksbehandler og tjenesteleder.
- Berørte parter: innbygger i sårbar situasjon.
- Risiko: svært høy.
- Verdi: raskere saksforberedelse, men stor rettighets- og tillitsrisiko.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 3 | Regelverk finnes, men faktum, skjønn og individuelle forhold er komplekse. |
| SEP | 1 | Beslutningen er tett koblet til helhetlig livssituasjon og rettigheter. |
| FHO | 2 | Forklaring må være juridisk og individuelt forståelig. Gummistempelrisiko er høy. |
| AOR | 2 | Saksbehandler kan lene seg for tungt på KI-forslag under tidspress. |

Stoppregel:

Ja. Beslutningen har betydelig påvirkning og krever reell menneskelig kontroll, begrunnelse og etterprøvbarhet.

Foreløpig rolle:

Menneskelig beslutning med dokumentasjonsstøtte. KI kan hjelpe med sjekkliste, manglende informasjon og forslag til spørsmål.

Beslutningslogg:

Logg rettsgrunnlag, individuell vurdering, menneskelig begrunnelse, motargumenter, verifikasjon, overstyring og klagemulighet.

### 6. Lagerpåfyll under terskel

Beskrivelse:

En SMB vil bruke KI eller regler til å foreslå bestilling når lagerbeholdningen går under et fast nivå.

Kart:

- Beslutningseier: innkjøpsansvarlig.
- Berørte parter: drift og økonomi.
- Risiko: lav.
- Verdi: mindre manuelt arbeid og færre utsolgte varer.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 5 | Målet er tydelig: unngå lagerbrudd og holde ønsket beholdning. |
| SEP | 5 | Oppgaven er avgrenset, testbar og reversibel. |
| FHO | 4 | Ansvarlig kan se beholdning, historikk og bestillingsgrunnlag. |
| AOR | 4 | Lav risiko hvis forslag kan avvises og avvik flagges. |

Stoppregel:

Ingen stoppregel hvis beløpsgrenser, avviksvarsling og manuell overstyring finnes.

Foreløpig rolle:

Kandidat for automatisert forslag med logg. Automatisk ordre bør ha terskelgrenser og avviksstopp.

Beslutningslogg:

Logg beholdning, terskel, foreslått ordre, avvik, godkjenning og overstyring.

### 7. Lavverdi leverandørvalg

Beskrivelse:

En virksomhet vil bruke KI til å foreslå leverandør for gjentakende lavverdiinnkjøp.

Kart:

- Beslutningseier: innkjøpsansvarlig.
- Berørte parter: virksomhet og leverandører.
- Risiko: lav til middels.
- Verdi: raskere innkjøp og bedre dokumentasjon.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 4 | Pris, leveringstid og kvalitet kan defineres. |
| SEP | 4 | Lavverdi og gjentakende kjøp er relativt separerbare. |
| FHO | 3 | Forklaring må vise pris, vilkår, avvik og habilitetsrisiko. |
| AOR | 3 | Risiko for å følge anbefaling uten å sjekke alternativer. |

Stoppregel:

Ingen generell stoppregel, men stopp ved habilitet, rammeavtaler, høy verdi eller strategisk leverandørrisiko.

Foreløpig rolle:

Forsterket skjønn / delautomatisering. KI kan foreslå leverandør, men ansvarlig må godkjenne og kunne forklare valget.

Beslutningslogg:

Logg vurderte alternativer, kriterier, pris, avvik, godkjenning og eventuell overstyring.

### 8. Ny markedsstrategi

Beskrivelse:

Ledergruppen vil bruke KI til å anbefale om virksomheten skal gå inn i et nytt marked.

Kart:

- Beslutningseier: ledergruppe/styre.
- Berørte parter: eiere, ansatte, kunder og partnere.
- Risiko: høy strategisk risiko.
- Verdi: bedre analysegrunnlag, men beslutningen er ikke isolerbar.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 3 | Mål kan defineres, men verdikonflikt og usikkerhet er høy. |
| SEP | 1 | Beslutningen er helhetlig, kontekstuell og strategisk. |
| FHO | 3 | KI kan forklare antakelser, men ikke eie konsekvensene. |
| AOR | 2 | Høy risiko for at en overbevisende analyse blir behandlet som fasit. |

Stoppregel:

Ja. Strategisk autonomi uten menneskelig ansvar vil automatisere dømmekraft.

Foreløpig rolle:

Utforskende støtte. KI kan brukes til scenarioer, motargumenter, markedssøk og sensitivitetsanalyse.

Beslutningslogg:

Logg antakelser, kilder, scenarioer, usikkerhet, motargumenter og styrets menneskelige beslutning.

### 9. Ruting av kundehenvendelse

Beskrivelse:

Kundeservice vil bruke KI til å kategorisere og rute henvendelser til riktig kø.

Kart:

- Beslutningseier: kundeservicesjef.
- Berørte parter: kunder og kundebehandlere.
- Risiko: lav til middels.
- Verdi: raskere respons og bedre ressursbruk.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 5 | Målet er tydelig: riktig kategori og rask ruting. |
| SEP | 5 | Oppgaven er avgrenset og lett å korrigere. |
| FHO | 4 | Feil kan oppdages av kundebehandler eller kunde. |
| AOR | 4 | Lav risiko hvis eskalering og manuell omruting er lett. |

Stoppregel:

Ingen stoppregel for standardhenvendelser. Stopp eller eskaler ved klage, sårbar kunde, juridisk tema eller høy økonomisk verdi.

Foreløpig rolle:

Delautomatisering med eskalering. KI kan rute, men ikke avgjøre kundens krav.

Beslutningslogg:

Logg kategori, tillit/usikkerhet, eskalering og manuell omruting.

### 10. Kompensasjon i sårbar klagesak

Beskrivelse:

Kundeservice vurderer KI-støtte til å foreslå kompensasjon i en klagesak der kunden er sårbar og saken har mulig rettslig eller omdømmemessig betydning.

Kart:

- Beslutningseier: kundeserviceleder eller fagansvarlig.
- Berørte parter: kunde, virksomhet og eventuelt regulatorisk tilsyn.
- Risiko: høy.
- Verdi: bedre oversikt og konsistent dokumentasjon.

Vurdering:

| Modul | Skår | Begrunnelse |
|---|---:|---|
| MK | 4 | Mål som responstid og kompensasjonsramme kan være klart. |
| SEP | 2 | Relasjonell tillit, rimelighet og kontekst er sentralt. |
| FHO | 2 | Kontroll kan bli gummistempel hvis anbefalt beløp presenteres først. |
| AOR | 2 | Høy risiko for å akseptere KI-forslag fordi saken er tidkrevende. |

Stoppregel:

Ja. Sårbar kunde, mulig rettslig påvirkning og relasjonell tillit krever menneskelig vurdering før KI-forslag.

Foreløpig rolle:

Forsterket skjønn. KI kan oppsummere saken, hente policy og vise sammenlignbare saker, men ikke fastsette kompensasjon.

Beslutningslogg:

Logg menneskelig vurdering før KI-output, policygrunnlag, motargumenter, kundens situasjon, overstyring og endelig ansvarlig.

## Hva scoremodellen ser ut til å fungere for

- Den skiller godt mellom lavrisiko, standardiserte oppgaver og skjønnstunge beslutninger.
- Gate + poeng virker bedre enn rent gjennomsnitt fordi stoppregler fanger HR, rettigheter og strategisk dømmekraft.
- Separabilitet fungerer som sterk korreksjon mot høy målklarhet. Case 2, 3 og 10 viser at klart mål ikke betyr at delbeslutningen kan automatiseres.

## Hvor stoppregler bør overstyre poeng

- Arbeid, rettigheter, sårbare personer eller betydelig påvirkning bør stoppe automatisering selv ved middels eller høy målklarhet.
- Lav reell human oversight bør stoppe automatisering selv hvis kompass-score er høy.
- Manglende beslutningslogg bør stoppe automatisering i høy-risiko saker.
- Strategiske beslutninger bør ikke få høy KI-rolle selv om KI kan lage overbevisende analyse.

## Risiko for gummistempel

Case 2, 5 og 10 viser at human oversight kan bli gummistempel når:

- KI-output presenteres før mennesket har skrevet egen vurdering
- kontrollør mangler tid, kompetanse eller myndighet
- anbefalingen fremstår objektiv uten usikkerhet
- beslutningslogg ikke krever begrunnelse ved aksept eller overstyring

## Justeringsforslag til scoremodellen

1. Skill tydeligere mellom `beregnet rolle` og `tillatt rolle etter stoppregler`.
2. Innfør eksplisitt stoppregel for rettigheter, arbeid, helse, økonomisk betydelig påvirkning og sårbare personer.
3. La lav separabilitet eller lav kontroll-score sette et tak på mulig KI-rolle.
4. Krev beslutningslogg for alle høy-risiko caser før en rolle over `utforskende støtte` kan foreslås.
5. Bruk konservativ modell for HR, offentlig sektor, helse, rettigheter og sårbare kunder.

## Indikator-mapping for AI-kalibrering

Denne mappingen er lagt til etter grill-me-runden. Formålet er å kalibrere AI-scoring slik at modellen ikke overvurderer separabilitet eller lar høy målklarhet dominere stoppregler.

### Indikatorliste

Målklarhet høy:

- MK-H1: målet er konkret
- MK-H2: utfallet kan måles
- MK-H3: kriteriene er relativt stabile
- MK-H4: fagpersoner vil ofte være enige
- MK-H5: det finnes gjentakende mønstre
- MK-H6: man kan vite etterpå om beslutningen var god

Målklarhet lav:

- MK-L1: målet er sammensatt eller strategisk
- MK-L2: verdier og kontekst betyr mye
- MK-L3: flere gode svar kan finnes
- MK-L4: politisk, etisk eller relasjonell konflikt kan finnes
- MK-L5: målet endres med situasjonen
- MK-L6: det er vanskelig å vite sikkert hva som var riktig

Separabilitet høy:

- SEP-H1: KI-output kan brukes direkte
- SEP-H2: beslutningen er teknisk eller operasjonell
- SEP-H3: konsekvens ved feil er begrenset eller reversibel
- SEP-H4: mottakerens tillit avhenger lite av menneskelig nærvær
- SEP-H5: ansvar kan ligge i en regelstyrt prosess

Separabilitet lav:

- SEP-L1: KI-output må tolkes
- SEP-L2: menneskelig skjønn er nødvendig
- SEP-L3: legitimitet og tillit betyr mye
- SEP-L4: noen må kunne stå personlig ansvarlig
- SEP-L5: feil kan påvirke rettigheter, helse, økonomi, arbeidsforhold eller tillit
- SEP-L6: lokale unntak og kontekst betyr mye

### 1. HMS-kurs fullført

Målklarhet = 5 fordi:

- MK-H1 trigger: kravet er konkret, kurs fullført eller ikke fullført.
- MK-H2 trigger: utfallet kan måles i kurs-/LMS-system.
- MK-H3 trigger: kriteriet er stabilt på tvers av situasjoner.
- MK-H4 trigger: fagpersoner vil normalt være enige om status.
- MK-H5 trigger: kontrollen er gjentakende.
- MK-H6 trigger: man kan vite etterpå om status var korrekt.
- Lav-målklarhet-indikatorer: 0 av 6 trigger.

Separabilitet = 5 fordi:

- SEP-H1 trigger: output kan brukes direkte som kontrollsignal.
- SEP-H2 trigger: beslutningen er operasjonell.
- SEP-H3 trigger: feil kan rettes ved å oppdatere kursstatus.
- SEP-H4 trigger: tillit avhenger lite av menneskelig nærvær.
- SEP-H5 trigger: ansvar kan ligge i en regelstyrt prosess.
- Lav-separabilitet-indikatorer: 0 av 6 trigger.

### 2. Rangere jobbsøkere

Målklarhet = 4 fordi:

- MK-H1 trigger delvis: ønsket kompetanse kan beskrives.
- MK-H2 trigger delvis: noen kvalifikasjoner kan måles.
- MK-H5 trigger delvis: rekruttering har mønstre.
- MK-L2 trigger: verdier og kontekst betyr mye.
- MK-L3 trigger: flere kandidater kan være gode på ulike måter.
- MK-L4 trigger: etisk og relasjonell konflikt kan finnes.
- Lav-målklarhet-indikatorer: 3 av 6 trigger.

Separabilitet = 2 fordi:

- SEP-L1 trigger: KI-output må tolkes av HR/fagperson.
- SEP-L2 trigger: menneskelig skjønn er nødvendig.
- SEP-L3 trigger: legitimitet og tillit betyr mye.
- SEP-L4 trigger: noen må kunne stå personlig ansvarlig.
- SEP-L5 trigger: feil kan påvirke arbeidsforhold og rettferdighet.
- SEP-L6 trigger: lokale unntak og kontekst betyr mye.
- Lav-separabilitet-indikatorer: 6 av 6 trigger.

### 3. Nedbemanning

Målklarhet = 4 fordi:

- MK-H1 trigger delvis: mål som kostnadsreduksjon kan formuleres.
- MK-H2 trigger delvis: økonomisk effekt kan måles.
- MK-L1 trigger: målet er sammensatt og strategisk.
- MK-L2 trigger: verdier, juss og kontekst betyr mye.
- MK-L3 trigger: flere legitime løsninger kan finnes.
- MK-L4 trigger: etisk og relasjonell konflikt er høy.
- MK-L5 trigger: målet endres med virksomhetens situasjon.
- Lav-målklarhet-indikatorer: 5 av 6 trigger.

Separabilitet = 1 fordi:

- SEP-L1 trigger: KI-output må tolkes.
- SEP-L2 trigger: menneskelig skjønn er nødvendig.
- SEP-L3 trigger: legitimitet og tillit betyr mye.
- SEP-L4 trigger: noen må stå personlig ansvarlig.
- SEP-L5 trigger: feil påvirker arbeidsforhold, økonomi og tillit.
- SEP-L6 trigger: lokale unntak og kontekst betyr mye.
- Lav-separabilitet-indikatorer: 6 av 6 trigger.

### 4. Manglende byggesøknadsdokumentasjon

Målklarhet = 5 fordi:

- MK-H1 trigger: obligatoriske vedlegg kan defineres konkret.
- MK-H2 trigger: mangler kan måles.
- MK-H3 trigger: kravlisten er relativt stabil.
- MK-H4 trigger: saksbehandlere vil normalt være enige om mangler.
- MK-H5 trigger: situasjonen er gjentakende.
- MK-H6 trigger: man kan vite etterpå om dokumentasjon manglet.
- Lav-målklarhet-indikatorer: 0 av 6 trigger når flyten bare varsler mangler.

Separabilitet = 4 fordi:

- SEP-H1 trigger: output kan brukes som mangelliste.
- SEP-H2 trigger: oppgaven er operasjonell.
- SEP-H3 trigger: feil kan rettes ved innsending eller manuell korrigering.
- SEP-H5 trigger: ansvar kan ligge i regelstyrt prosess.
- SEP-L5 trigger delvis: feil kan forsinke rettighetsrelatert saksbehandling.
- Lav-separabilitet-indikatorer: 1 av 6 trigger.

### 5. Avslag på sosialhjelp

Målklarhet = 3 fordi:

- MK-H1 trigger delvis: regelverk og vilkår finnes.
- MK-H2 trigger delvis: enkelte økonomiske vilkår kan måles.
- MK-L1 trigger: målet er sammensatt.
- MK-L2 trigger: verdier, kontekst og livssituasjon betyr mye.
- MK-L3 trigger: flere vurderinger kan være legitime.
- MK-L4 trigger: etisk og rettslig konflikt kan finnes.
- MK-L5 trigger: situasjonen endres med individets faktum.
- MK-L6 trigger: det kan være vanskelig å vite hva som var riktig.
- Lav-målklarhet-indikatorer: 6 av 6 trigger.

Separabilitet = 1 fordi:

- SEP-L1 trigger: KI-output må tolkes juridisk og sosialfaglig.
- SEP-L2 trigger: menneskelig skjønn er nødvendig.
- SEP-L3 trigger: legitimitet og tillit betyr mye.
- SEP-L4 trigger: saksbehandler må stå ansvarlig.
- SEP-L5 trigger: feil påvirker rettigheter, økonomi og tillit.
- SEP-L6 trigger: lokale unntak og individuell kontekst betyr mye.
- Lav-separabilitet-indikatorer: 6 av 6 trigger.

### 6. Lagerpåfyll under terskel

Målklarhet = 5 fordi:

- MK-H1 trigger: ønsket beholdning kan formuleres konkret.
- MK-H2 trigger: beholdning og terskel kan måles.
- MK-H3 trigger: kriteriene er relativt stabile.
- MK-H4 trigger: fagpersoner vil ofte være enige.
- MK-H5 trigger: mønsteret er gjentakende.
- MK-H6 trigger: man kan vite etterpå om ordre var riktig.
- Lav-målklarhet-indikatorer: 0 av 6 trigger.

Separabilitet = 5 fordi:

- SEP-H1 trigger: output kan brukes direkte som bestillingsforslag.
- SEP-H2 trigger: beslutningen er operasjonell.
- SEP-H3 trigger: feil er begrenset og ofte reversibel.
- SEP-H4 trigger: tillit avhenger lite av menneskelig nærvær.
- SEP-H5 trigger: ansvar kan ligge i regelstyrt prosess med beløpsgrenser.
- Lav-separabilitet-indikatorer: 0 av 6 trigger.

### 7. Lavverdi leverandørvalg

Målklarhet = 4 fordi:

- MK-H1 trigger: kriterier som pris og leveringstid kan konkretiseres.
- MK-H2 trigger: flere utfall kan måles.
- MK-H3 trigger delvis: kriteriene kan være stabile for gjentakende kjøp.
- MK-H5 trigger: innkjøp kan være gjentakende.
- MK-H6 trigger delvis: man kan evaluere leveranse i etterkant.
- MK-L2 trigger delvis: kontekst som habilitet og relasjon kan bety noe.
- Lav-målklarhet-indikatorer: 1 av 6 trigger.

Separabilitet = 4 fordi:

- SEP-H1 trigger delvis: output kan brukes som forslag.
- SEP-H2 trigger: beslutningen er operasjonell ved lav verdi.
- SEP-H3 trigger: feil er ofte begrenset.
- SEP-H5 trigger delvis: ansvar kan ligge i innkjøpsregel.
- SEP-L1 trigger: output bør tolkes av ansvarlig.
- SEP-L4 trigger delvis: noen må stå ansvarlig ved habilitet/avvik.
- Lav-separabilitet-indikatorer: 2 av 6 trigger.

### 8. Ny markedsstrategi

Målklarhet = 3 fordi:

- MK-H1 trigger delvis: mål kan formuleres.
- MK-H2 trigger delvis: noen markedsindikatorer kan måles.
- MK-L1 trigger: målet er strategisk og sammensatt.
- MK-L2 trigger: verdier og kontekst betyr mye.
- MK-L3 trigger: flere gode strategier kan finnes.
- MK-L4 trigger: politisk, etisk eller relasjonell konflikt kan finnes.
- MK-L5 trigger: målet endres med marked og virksomhet.
- MK-L6 trigger: det er vanskelig å vite sikkert hva som var riktig.
- Lav-målklarhet-indikatorer: 6 av 6 trigger.

Separabilitet = 1 fordi:

- SEP-L1 trigger: KI-output må tolkes.
- SEP-L2 trigger: menneskelig skjønn er nødvendig.
- SEP-L3 trigger: legitimitet og tillit betyr mye.
- SEP-L4 trigger: ledelse/styre må stå ansvarlig.
- SEP-L5 trigger: feil påvirker økonomi, arbeid og tillit.
- SEP-L6 trigger: lokal kontekst og unntak betyr mye.
- Lav-separabilitet-indikatorer: 6 av 6 trigger.

### 9. Ruting av kundehenvendelse

Målklarhet = 5 fordi:

- MK-H1 trigger: riktig kategori kan defineres.
- MK-H2 trigger: ruting kan måles mot faktisk kø/utfall.
- MK-H3 trigger: kategorier er relativt stabile.
- MK-H4 trigger: kundebehandlere vil ofte være enige.
- MK-H5 trigger: henvendelser er gjentakende.
- MK-H6 trigger: man kan vite etterpå om ruting var riktig.
- Lav-målklarhet-indikatorer: 0 av 6 trigger for standardhenvendelser.

Separabilitet = 5 fordi:

- SEP-H1 trigger: output kan brukes direkte til ruting.
- SEP-H2 trigger: oppgaven er operasjonell.
- SEP-H3 trigger: feil kan rettes ved omruting.
- SEP-H4 trigger: tillit avhenger lite av menneskelig nærvær i standardruting.
- SEP-H5 trigger: ansvar kan ligge i regelstyrt prosess med eskalering.
- Lav-separabilitet-indikatorer: 0 av 6 trigger for standardhenvendelser.

### 10. Kompensasjon i sårbar klagesak

Målklarhet = 4 fordi:

- MK-H1 trigger delvis: kompensasjonsrammer kan defineres.
- MK-H2 trigger delvis: beløp og responstid kan måles.
- MK-L1 trigger: målet er sammensatt.
- MK-L2 trigger: verdier, kontekst og kundens situasjon betyr mye.
- MK-L3 trigger: flere rimelige løsninger kan finnes.
- MK-L4 trigger: relasjonell og etisk konflikt kan finnes.
- MK-L5 trigger: målet endres med situasjonen.
- MK-L6 trigger: det kan være vanskelig å vite sikkert hva som var riktig.
- Lav-målklarhet-indikatorer: 6 av 6 trigger.

Separabilitet = 2 fordi:

- SEP-L1 trigger: KI-output må tolkes av fagansvarlig.
- SEP-L2 trigger: menneskelig skjønn er nødvendig.
- SEP-L3 trigger: legitimitet og tillit betyr mye.
- SEP-L4 trigger: noen må kunne stå personlig ansvarlig.
- SEP-L5 trigger: feil kan påvirke økonomi, tillit og mulig rettslig posisjon.
- SEP-L6 trigger: lokal kontekst og kundens situasjon betyr mye.
- Lav-separabilitet-indikatorer: 6 av 6 trigger.

## Neste arbeid etter post-grill

Før appkode bør testgrunnlaget suppleres med 2-3 strategisk HR-/livsfasepolitikk-caser.

Disse casene bør bruke samme indikator-mapping, men være tettere på første MVP-bruk:

- mikroprosjekt for seniorpolitikk
- mikroprosjekt for fleksibel arbeidstid/livsfase
- mikroprosjekt for kompetanseutvikling eller intern mobilitet
