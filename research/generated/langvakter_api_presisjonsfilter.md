---
title: API-presisjonsfilter for langvakter i helsesektoren
date: 2026-05-19
status: active
tags:
  - HRR-07
  - datainnhenting
  - API
  - presisjon
  - langvakter
category: research_policy
---

# API-presisjonsfilter for langvakter i helsesektoren

Dette filteret skal brukes av API-innhentingen for `HRR-07 langvakter i helsesektoren`.
Formålet er å redusere støy før funn havner i `data/research/langvakter_findings.api-draft.json`.

API-funn er alltid kandidater. De skal ikke brukes i diagnose før de er manuelt vurdert og satt til `review_status: approved`.

## Kildeprioritet

### 1. Kan påvirke app-logikk etter manuell godkjenning

Bruk disse som primærkilder for stoppregler, lokal verifikasjon og risikoflagg:

- Arbeidstilsynet: arbeidstid, forsvarlig arbeidstidsordning, gjennomsnittsberegning.
- KS/SFS 2310: avtaletekst, veileder, B-rundskriv eller annen sentral avtaledokumentasjon.
- STAMI/NOA: arbeidstid, søvn, fatigue, helse og sikkerhet.
- FHI/Helsebiblioteket: forskningsomtaler eller systematiske oversikter om langvakter og pasientsikkerhet.
- Helsedirektoratet: forsvarlighet, kvalitet, pasient- og brukersikkerhet der kilden faktisk gjelder ansvar eller kvalitetskrav.
- NOU-er og offentlige utredninger der de direkte omtaler arbeidstid, arbeidshelse, turnus eller helsepersonellkapasitet.
- Fagfellevurderte studier eller systematiske reviews med tydelig metode og relevans for helse-/omsorgstjenester.

### 2. Kan brukes som støtte, men ikke alene som logikk

Disse skal normalt merkes som partskilde eller sekundær støtte:

- NSF, Fagforbundet, Delta og andre arbeidstakerorganisasjoner.
- Arbeidsgiver-/partsnyheter som forklarer avtaler, men ikke er selve avtaleteksten.
- Kommunale eller regionale eksempler på piloter og evalueringer.
- Nyhetsartikler eller forskningsformidling som peker videre til primærstudier.

Partskilder kan brukes til å identifisere relevante kontrollspørsmål, men de skal ikke alene definere score, stoppregel eller rettslig ramme.

### 3. Skal parkeres eller avvises

Ikke bruk disse til kjernelogikk for langvakter:

- Generelle helseplaner uten eksplisitt kobling til langvakter, arbeidstid, HMS eller pasient-/brukersikkerhet.
- Lokale høringssvar, revisjonsrapporter eller workshopnotater fra én kommune/enhet, med mindre de bare brukes som lokal eksempelcase.
- Dokumenter om frivillighet, samarbeid eller organisering som ikke sier noe konkret om arbeidstid, turnus, langvakter, forsvarlighet eller sikkerhet.
- Kilder der URL, tittel eller claim ikke kan spores til en konkret publikasjon.

## Presisjonskrav per funn

Hvert API-funn skal prøve å returnere:

- én konkret påstand, ikke en generell oppsummering
- kilde-URL til primærkilde der det finnes
- kort utdrag eller parafrase som støtter påstanden
- om funnet gjelder regel/avtale, HMS/forsvarlighet, pasient-/brukersikkerhet eller lokal verifikasjon
- hvilken stoppregel funnet kan utløse, hvis relevant
- hva bruker må verifisere lokalt
- usikkerhet eller begrensning ved kilden

Hvis funnet ikke kan knyttes til minst ett av disse feltene, skal det ikke returneres.

## Kunnskapsblokker

API-funn skal grupperes mentalt i fire blokker:

1. `regel_avtale`: definisjon av langvakt, vaktlengde, hjemmel, avtale, frivillighet, pauser, hvile og lokal særavtale.
2. `hms_forsvarlighet`: arbeidsgivers forsvarlighetsvurdering, belastning, pausepraksis, nattarbeid, hvile og restitusjon.
3. `pasient_brukersikkerhet`: uønskede hendelser, kvalitet, kontinuitet, bemanning og faglig forsvarlighet.
4. `lokal_verifikasjon`: tillitsvalgte, verneombud, risikovurdering, pilot/evaluering, lokale vilkår og faktisk gjennomføring.

## API-kobling

Importscriptet skal lese denne filen som policytekst og legge den inn i Sonar-prompten.

Standardkobling:

```powershell
npm run research:langvakter -- --env-file "C:\Users\larse\Documents\Interne prosjekter\learning lab\engines\kommuneinnsikt_rag\.env"
```

Eksplisitt policyfil:

```powershell
npm run research:langvakter -- --policy-file "C:\Users\larse\Documents\New project 2\research\generated\langvakter_api_presisjonsfilter.md"
```

## Godkjenningsregel

Et funn kan først flyttes fra `api-draft` til godkjent datasett når det har:

- riktig kildeklasse
- relevant og sporbar kilde
- claim som faktisk støttes av kilden
- tydelig lokal verifikasjon
- begrensning/usikkerhet formulert
- ingen direkte konklusjon om at KI kan automatisere beslutningen

Målbildet er ikke flest mulig funn. Målbildet er 10-14 presise funn som dekker regel/avtale, HMS/forsvarlighet, pasient-/brukersikkerhet og lokal verifikasjon uten å blande partskilder, forskning og myndighetskilder.
