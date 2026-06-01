---
title: "Realistiske HR-caser for HR Strategiradar"
date: 2026-05-13
status: ready-for-review
tags: [testcaser, hr-strategiradar, livsfasepolitikk, realistiske-caser]
category: testcases
---

# Realistiske HR-caser for HR Strategiradar

## Formål

Dette dokumentet erstatter ikke `testcases/runde_1_testcaser.md` som bredt regresjonssett. Det gir et mer realistisk, HR-nært casegrunnlag for selve appen.

Casene er laget for å teste brukerreisen:

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

## Hvor mange caser bør vi bruke?

Anbefaling:

```text
4 caser i første byggesløyfe.
8 caser som realistisk MVP-regresjonssett.
De gamle 10 generiske casene beholdes som sekundært kontrollsett.
```

Begrunnelse:

- 4 caser er nok til å teste første appflyt uten å drukne HRSR-002 i modellering.
- 8 caser dekker livsfase, sykefravær, heltid/deltid, rekruttering, kompetanse, lærling, langvakter/arbeidstid og omstilling.
- De gamle casene er fortsatt nyttige for å teste at kompasset ikke bare fungerer i HR.

## Kilder brukt for realisme

Casene er ikke personhistorier. De er syntetiske, men bygget på reelle temaer fra norske og europeiske kilder:

- KS-rapport om tiltak for lengre arbeidsliv i kommunesektoren.
- Arbeidstilsynet om senior i arbeidslivet.
- Arbeidstilsynet og NAV om sykefraværsoppfølging og tilrettelegging.
- SSB sykefraværsstatistikk, særlig helse- og sosialtjenester.
- KS arbeidsgivermonitor og heltidskulturtema.
- Helsedirektoratet om heltidsansatte i kommunale helse- og omsorgstjenester.
- Arbeidstilsynet, KS/SFS 2310, STAMI, OsloMet/AFI, FHI/Helsebiblioteket, Fafo og Helsedirektoratet om arbeidstid, langvakter, HMS, pasient-/brukersikkerhet og heltidskultur.
- EU AI Act-kilder om høy risiko i arbeidsliv og rekruttering.
- Learning Lab HR-testsett og HR-randsoner.

## Caseoversikt

| ID | Case | Første KI-bruksoppgave | Hovedrisiko | Forventet rolle |
|---|---|---|---|---|
| HRR-01 | Seniorbevaring i hjemmetjenesten | Strukturere anonymisert innsikt og tiltakshypoteser | Arbeid, lokal praksis, tillit | Utforskende støtte / forsiktig forsterket skjønn |
| HRR-02 | Gradert sykefravær og tilrettelegging i turnus | Lage møte- og oppfølgingsstruktur | Persondata, helse, tilrettelegging, kollegabelastning | Utforskende støtte |
| HRR-03 | Heltidskultur og helgebemanning | Analysere aggregert bemanning og scenarioer | Arbeidsvilkår, turnus, rettferdighet | Forsterket skjønn, ikke individuell tildeling |
| HRR-04 | Rekruttering av kritisk helsefagkompetanse | Lage kravprofil og intervjuguide | Diskriminering, arbeid, kvalifikasjonsprinsipp | Utforskende støtte, ikke rangering |
| HRR-05 | Kompetanseutvikling og intern mobilitet | Kartlegge aggregerte kompetansegap | Karriere, rettferdighet, lederansvar | Forsterket skjønn med logg |
| HRR-06 | Lærling med fare for frafall | Lage oppfølgingsplan-mal | Sårbar ung arbeidstaker, persondata | Utforskende støtte |
| HRR-07 | Langvakter i helsesektoren | Strukturere beslutningsgrunnlag og scenarioer | Arbeidstid, HMS, hvile, pasient-/brukersikkerhet, rettferdighet | Utforskende støtte / forsterket skjønn med logg |
| HRR-08 | Omstilling og naturlig avgang | Lage scenario- og risikokart | Arbeid, rettigheter, medvirkning | Utforskende støtte |

## HRR-01: Seniorbevaring i hjemmetjenesten

### Situasjon

Kommunen ønsker å utvikle livsfasepolitikk som kan bidra til at senioransatte i hjemmetjenesten står lenger i arbeid.

### Hvorfor casen er realistisk

Kommunesektoren har behov for arbeidskraft, og selv små forbedringer i muligheten til at seniorer står lenger i jobb kan ha betydning for bemanning og tjenestetilbud. Seniorpolitikk må samtidig vurderes opp mot kostnader, andre ansatte og lokale rammer.

### Kart

- Strategiområde: livsfasepolitikk.
- Målgruppe: senioransatte, ledere, HR, vernetjeneste.
- Berørte parter: ansatte i ulike livsfaser, brukere av hjemmetjenesten, lederlinje.
- Beslutningseier: HR-sjef eller delegert HR-prosjekteier.
- Usikkerhet: lokale data, årsaker til avgang, arbeidstidsbelastning, opplevd rettferdighet.

### KI-bruksoppgave A: Strukturere anonymisert innsikt

KI skal strukturere anonymiserte innspill, aggregerte indikatorer og tiltakshypoteser til intern drøfting.

Vurdering:

- Målklarhet: 3-4.
- Separabilitet: 2-3.
- Forklarbarhet/human oversight: 3-4.
- Anti-overreliance: 3.
- Stoppregler: SR-02 og ofte SR-05 hvis grunnlaget brukes som anbefaling.
- Foreløpig rolle: utforskende støtte eller forsiktig forsterket skjønn.

### KI-bruksoppgave B: Prioritere ansatte for tiltak

KI skal foreslå hvilke ansatte som bør få senior-/livsfasetiltak.

Vurdering:

- Målklarhet: 3.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte, ikke prioritering.

### Appen må teste

- At samme HR-situasjon gir ulike roller for ulike KI-bruksoppgaver.
- At appen ikke lar strategisk mål bli automatisk individprioritering.
- At lokal verifikasjon og beslutningslogg kreves før rapport.

## HRR-02: Gradert sykefravær og tilrettelegging i turnus

### Situasjon

En hjemmetjenesteenhet har flere gradert sykmeldte ansatte. Leder ønsker støtte til å forberede oppfølgingsmøter og vurdere tilrettelegging uten at belastningen skyves over på kolleger.

### Hvorfor casen er realistisk

Sykefraværsoppfølging krever dialog mellom arbeidsgiver, arbeidstaker, tillitsvalgte, verneombud, NAV, lege og BHT. Tilrettelegging for én arbeidstaker kan ikke gå så langt at andre arbeidstakeres arbeidsforhold eller arbeidsmiljø forverres.

### Kart

- Strategiområde: nærvær, sykefravær og HMS.
- Målgruppe: leder, sykmeldt arbeidstaker, kolleger, HR/IA.
- Berørte parter: arbeidstaker i sårbar situasjon, kolleger, brukere.
- Beslutningseier: linjeleder med HR/IA-støtte.
- Usikkerhet: medisinske forhold skal ikke inn i appen; lokal oppfølgingsstatus må verifiseres.

### KI-bruksoppgave A: Lage oppfølgingsstruktur

KI skal lage anonymisert agenda, kontrollspørsmål og oppfølgingsplan-mal for leder.

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: SR-05 ved høy risiko; SR-08 hvis persondata inngår.
- Foreløpig rolle: utforskende støtte.

### KI-bruksoppgave B: Foreslå konkret tilrettelegging for navngitt ansatt

Vurdering:

- Målklarhet: 3.
- Separabilitet: 1.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte; appen må stoppe personspesifikke anbefalinger.

### Appen må teste

- Skille mellom møtestruktur og individuell helse-/arbeidstilrettelegging.
- Varsel mot persondata.
- Kontroll av kollegabelastning og arbeidsmiljøeffekt.

## HRR-03: Heltidskultur og helgebemanning

### Situasjon

Kommunen vil redusere uønsket deltid og styrke kontinuiteten i helse- og omsorgstjenesten. Ledergruppen vurderer om KI kan støtte analyse av turnus, helgebelastning og scenarioer.

### Hvorfor casen er realistisk

Heltidskultur trekkes frem som viktig for tilhørighet, kontinuitet, rekruttering og redusert vikarbruk. Samtidig påvirker slike tiltak arbeidsvilkår, turnusbelastning, helg, fleksibilitet og opplevd rettferdighet.

### Kart

- Strategiområde: heltidskultur, bemanning, livsfasepolitikk.
- Målgruppe: deltidsansatte, heltidsansatte, ledere, tillitsvalgte.
- Berørte parter: ansatte, tjenestemottakere, vikarer.
- Beslutningseier: kommunalsjef/HR/prosjektleder.
- Usikkerhet: lokale avtaler, partssamarbeid, turnusregler, preferanser.

### KI-bruksoppgave A: Analysere aggregert bemanning

KI skal analysere aggregerte data og lage scenarioer for helgebemanning, stillingsstørrelser og kompetansedekning.

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: SR-06 ved verdikonflikt; SR-05 hvis scenario blir anbefaling.
- Foreløpig rolle: forsterket skjønn med tydelig logg.

### KI-bruksoppgave B: Tildele turnus eller helgebelastning til enkeltansatte

Vurdering:

- Målklarhet: 4.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte, ikke individuell tildeling.

### Appen må teste

- At aggregerte scenarioer og individuell arbeidstidsfordeling får ulik rolle.
- At verdikonflikt mellom drift, rettferdighet og livsfase blir eksplisitt.

## HRR-04: Rekruttering av kritisk helsefagkompetanse

### Situasjon

Kommunen sliter med å rekruttere sykepleiere og helsefagarbeidere. HR vurderer KI-støtte i behovsavklaring, kravprofil, utlysning, intervjuguide og kandidatvurdering.

### Hvorfor casen er realistisk

Kommuner rapporterer rekrutteringsutfordringer i helse- og omsorg, og EU AI Act klassifiserer AI brukt i arbeid, rekruttering og arbeidstakerstyring som høy risiko når systemene kan påvirke karriere, levebrød og arbeidstakerrettigheter.

### Kart

- Strategiområde: strategisk rekruttering.
- Målgruppe: søkere, ansettende leder, HR, tillitsvalgte.
- Berørte parter: jobbsøkere og tjenesten.
- Beslutningseier: ansettende leder med HR-støtte.
- Usikkerhet: kandidatmarked, kvalifikasjonskrav, lokal lønnspolitikk, likebehandling.

### KI-bruksoppgave A: Lage kravprofil og intervjuguide

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: ingen for ren utkaststøtte, men kontrollkrav.
- Foreløpig rolle: utforskende støtte / forsterket skjønn.

### KI-bruksoppgave B: Rangere kandidater før intervju

Vurdering:

- Målklarhet: 4.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-03, SR-04, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte, ikke rangering.

### Appen må teste

- At rekrutteringsstøtte ikke glir over i kandidat-rangering.
- At “match score” og rangering behandles som høyrisiko.

## HRR-05: Kompetanseutvikling og intern mobilitet

### Situasjon

Kommunen vil bruke kompetansedata og medarbeiderinnsikt til å prioritere opplæring, intern mobilitet og lederutvikling i helse- og omsorgstjenesten.

### Hvorfor casen er realistisk

Kommunale tjenester har behov for rett kompetanse, kontinuitet og læringsmiljøer. Kompetansetiltak er strategisk viktige, men kan påvirke karriere, prioriteringer og opplevd rettferdighet.

### Kart

- Strategiområde: kompetanse og lederutvikling.
- Målgruppe: ansatte, ledere, HR/kompetanse.
- Berørte parter: ansatte som får eller ikke får utviklingsmuligheter.
- Beslutningseier: kompetanseansvarlig/HR.
- Usikkerhet: datakvalitet, lokale behov, ledervurderinger.

### KI-bruksoppgave A: Kartlegge aggregerte kompetansegap

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: SR-05 hvis brukt til prioritering.
- Foreløpig rolle: forsterket skjønn.

### KI-bruksoppgave B: Score ansatte for intern mobilitet eller opprykk

Vurdering:

- Målklarhet: 3-4.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte.

### Appen må teste

- At appen skiller mellom kompetansegap på gruppenivå og vurdering av enkeltansatte.
- At karrierepåvirkning behandles som arbeidstakerpåvirkning.

## HRR-06: Lærling med fare for frafall

### Situasjon

En lærlingkoordinator ønsker å strukturere oppfølging for lærlinger med risiko for frafall, uten å bruke sensitive personopplysninger i appen.

### Hvorfor casen er realistisk

Learning Lab har lærlingoppfølging som HR-pilotcase. Slike saker krever oppfølging, samtalestruktur, lokal kapasitet og tydelig ansvar mellom veileder, lærling og koordinator.

### Kart

- Strategiområde: lærling og tidlig karriere.
- Målgruppe: lærlinger, veiledere, koordinator.
- Berørte parter: unge arbeidstakere/lærlinger i sårbar overgang.
- Beslutningseier: lærlingkoordinator og leder.
- Usikkerhet: kapasitet hos lærested, status i fagløp, individuelle forhold som ikke skal inn i appen.

### KI-bruksoppgave A: Lage oppfølgingsplan-mal

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: SR-05 ved individuell risikovurdering; SR-08 hvis persondata.
- Foreløpig rolle: utforskende støtte.

### KI-bruksoppgave B: Risikoscore lærlinger for frafall

Vurdering:

- Målklarhet: 3.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-08.
- Foreløpig rolle: utforskende støtte, ikke risikoscore.

### Appen må teste

- At oppfølgingsstruktur er lov, men prediksjon om enkeltperson må bremses.
- At sårbarhet og persondata slår inn.

## HRR-07: Langvakter i helsesektoren

### Situasjon

En kommunal helse- og omsorgsenhet vurderer langvakter for å styrke kontinuitet, redusere uønsket deltid og bedre helgebemanning. Ledergruppen er samtidig usikker på konsekvenser for arbeidsmiljø, restitusjon, pauser, pasient-/brukersikkerhet, rettferdighet og lokal gjennomførbarhet.

### Hvorfor casen er realistisk

Langvakter er et aktuelt arbeidstids- og heltidskulturtema i kommunal helse- og omsorgstjeneste. Det finnes nye partsrammer for langvakter over 12,5 timer i KS-området, samtidig som Arbeidstilsynet, STAMI, OsloMet/AFI, FHI/Helsebiblioteket og Fafo peker på at virkningen av lange vakter er kontekstavhengig og må vurderes lokalt.

### Kart

- Strategiområde: arbeidstid, heltidskultur og HMS.
- Målgruppe: ansatte i turnus, ledere, HR, tillitsvalgte, verneombud.
- Berørte parter: ansatte som kan få endret arbeidstid, kolleger som ikke ønsker langvakter, brukere/pasienter og pårørende.
- Beslutningseier: linjeleder/kommunalsjef med HR, tillitsvalgte og vernetjeneste.
- Usikkerhet: lokal belastning, pausepraksis, hvile, frivillighet, kompetansedekning, sykefravær, bruker-/pasientsikkerhet og om ordningen faktisk løser bemanningsproblemet.

### KI-bruksoppgave A: Strukturere beslutningsgrunnlag

KI skal strukturere anonymiserte innspill, aggregerte turnusdata, kjente risikofaktorer og kildegrunnlag til et beslutningsnotat.

Vurdering:

- Målklarhet: 4.
- Separabilitet: 3.
- Forklarbarhet/human oversight: 4.
- Anti-overreliance: 3.
- Stoppregler: SR-08 ved svakt kildegrunnlag; SR-05 hvis notatet brukes som anbefaling uten beslutningslogg.
- Foreløpig rolle: utforskende støtte.

### KI-bruksoppgave B: Lage scenario- og konsekvensanalyse

KI skal lage scenarioer for bemanning, helgebelastning, kompetansedekning, hvile, pauser, kontinuitet og mulig HMS-/kvalitetsrisiko.

Vurdering:

- Målklarhet: 4.
- Separabilitet: 2-3.
- Forklarbarhet/human oversight: 3-4.
- Anti-overreliance: 3.
- Stoppregler: SR-05, SR-06 og SR-08.
- Foreløpig rolle: forsterket skjønn med tydelig beslutningslogg, ikke automatisk anbefaling.

### KI-bruksoppgave C: Foreslå hvem som skal gå langvakter

KI skal foreslå hvilke ansatte som bør gå langvakter, hvem som bør unntas, eller hvordan konkrete ansatte bør fordeles i turnus.

Vurdering:

- Målklarhet: 3.
- Separabilitet: 1-2.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-03, SR-05, SR-06, SR-08.
- Foreløpig rolle: utforskende støtte / stopp for individrettet turnustildeling.

### Appen må teste

- At aggregert analyse og individuell turnustildeling får ulik rolle.
- At høy målklarhet ikke gir grønt lys når arbeidstid, HMS, hvile, partssamarbeid og lokal forsvarlighet må vurderes.
- At appen krever lokal verifikasjon av avtalegrunnlag, frivillighet, hvile, pauser, kompetansedekning og evalueringsplan.
- At scenarioanalyse ikke presenteres som fasit eller automatisk anbefaling.

## HRR-08: Omstilling og naturlig avgang

### Situasjon

En kommune må redusere kostnader og vurderer om bemanning kan tilpasses gjennom naturlig avgang, intern mobilitet og endret oppgavefordeling.

### Hvorfor casen er realistisk

Kommunesektoren står i omstilling med knappe ressurser. Arbeidslivsrelaterte AI-systemer som påvirker arbeidsforhold, oppgavefordeling, forfremmelse eller opphør av arbeidsforhold er høyrisiko.

### Kart

- Strategiområde: omstilling og organisasjonsutvikling.
- Målgruppe: ansatte, ledere, tillitsvalgte, innbyggere.
- Berørte parter: ansatte som kan få endrede oppgaver eller arbeidsforhold.
- Beslutningseier: toppledelse/HR med partsinvolvering.
- Usikkerhet: mandat, medvirkning, juss, tjenestekvalitet, arbeidsmiljø.

### KI-bruksoppgave A: Lage scenario- og risikokart

Vurdering:

- Målklarhet: 3-4.
- Separabilitet: 2-3.
- Forklarbarhet/human oversight: 3.
- Anti-overreliance: 3.
- Stoppregler: SR-06 og SR-05.
- Foreløpig rolle: utforskende støtte.

### KI-bruksoppgave B: Foreslå hvilke roller eller ansatte som bør tas ut

Vurdering:

- Målklarhet: 4.
- Separabilitet: 1.
- Forklarbarhet/human oversight: 2.
- Anti-overreliance: 2.
- Stoppregler: SR-01, SR-02, SR-05, SR-07, SR-08.
- Foreløpig rolle: utforskende støtte, ikke utvelgelse.

### Appen må teste

- At scenarioanalyse er støtte, mens person-/rolleutvelgelse bremses.
- At partsinvolvering og medvirkning blir kontrollkrav.

## Primærsett for første MVP

Første bygging og validering bør bruke disse fire:

1. HRR-01 Seniorbevaring i hjemmetjenesten.
2. HRR-02 Gradert sykefravær og tilrettelegging i turnus.
3. HRR-04 Rekruttering av kritisk helsefagkompetanse.
4. HRR-07 Langvakter i helsesektoren.

Disse fire dekker:

- livsfasepolitikk
- sykefravær/tilrettelegging
- rekruttering
- arbeidstid/HMS/langvakter
- støtteoppgave vs farlig individoppgave

## Konsekvens for HRSR-002

`HRSR-002` bør seedes med HRR-01 først, men schemaene må kunne representere alle 8 caser:

- ett HR-mikroprosjekt
- flere KI-bruksoppgaver per mikroprosjekt
- risikoflagg per KI-bruksoppgave
- forventet rolle per KI-bruksoppgave
- kildegrunnlag per case
- stoppregler per KI-bruksoppgave

## Kildepeker

- KS: `https://www.ks.no/contentassets/931ba808c8a1473d863efe7f0cfd56b9/Rapport-Tiltak-for-lengre-arbeidsliv-i-kommunesektoren-status-eksempler-og-vurderinger.pdf`
- Arbeidstilsynet senior: `https://www.arbeidstilsynet.no/arbeidstid-og-organisering/tilrettelegging/senior-i-arbeidslivet/`
- Arbeidstilsynet sykefravær: `https://www.arbeidstilsynet.no/arbeidstid-og-organisering/tilrettelegging/oppfolging-av-sykmeldte/`
- SSB sykefravær: `https://www.ssb.no/arbeid-og-lonn/arbeidsmiljo-sykefravaer-og-arbeidskonflikter/statistikk/sykefravaer`
- KS Arbeidsgivermonitoren: `https://www.ks.no/fagomrader/statistikk-og-analyse/arbeidsgivermonitoren/`
- Helsedirektoratet heltid: `https://www.helsedirektoratet.no/statistikk/kvalitetsindikatorer/kommunale-helse-og-omsorgstjenester/heltidsansatte-ved-kommunale-helse-og-omsorgstjenester-i-institusjon`
- EU AI Act oversikt: `https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai`
- AI Act Recital 57: `https://ai-act-service-desk.ec.europa.eu/en/ai-act/recital-57`
- Langvakter kildegrunnlag: `research/langvakter_helsesektoren_kildegrunnlag.md`
