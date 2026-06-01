---
title: Stoppregel- og scorekontrakt
date: 2026-05-12
status: ready
tags: [stoppregler, scoremodell, kontrakt, runde-1]
category: decision-model
---

# Stoppregel- og scorekontrakt

## Formål

Denne kontrakten presiserer hvordan stoppregler, modulskårer og foreløpig KI-rolle skal tolkes etter case-testen i `testcases/runde_1_testcaser.md`.

Kontrakten er ikke en scoringmotor. Den er en faglig og arkitektonisk regel for videre modellarbeid.

## Styrende prinsipp

```text
Stoppregler begrenser hva skåring kan anbefale.
Skåring kan aldri overstyre en stoppregel.
Foreløpig KI-rolle er en anbefaling, ikke en beslutning.
```

## Tre mulige designretninger

| Retning | Beskrivelse | Testkonsekvens | Vurdering |
|---|---|---|---|
| A. Score først, advarsel etterpå | Beregn total score og vis røde flagg som tillegg. | En høy score kan fortsatt dominere brukerens tolkning. Testcaser med HR og rettigheter får for svak brems. | Avvises for runde 1. |
| B. Gate + poeng | Vurder stoppregler først, beregn deretter kompass- og kontrollscore, og sett tak på mulig rolle. | Tester kan skille mellom beregnet rolle og tillatt rolle. Røde flagg får reell effekt. | Anbefalt. |
| C. Laveste modul styrer | Rollen styres av laveste modulskår, særlig i høy-risiko domener. | Gir konservative utfall og er lett å teste, men kan bli for grov for lavrisiko caser. | Brukes som høy-risiko fallback. |

## Anbefalt kontrakt

Runde 1 bruker retning B: **gate + poeng med rolle-tak**.

Retning C brukes som fallback når saken gjelder:

- arbeid
- helse
- rettigheter
- offentlig myndighetsutøvelse
- økonomisk betydelig påvirkning
- sårbare personer
- irreversibel eller vanskelig reverserbar feil

## Minimumsinndata

En vurdering skal ikke skåres før disse feltene er kjent:

| Felt | Betydning |
|---|---|
| `beslutning_tittel` | Kort navn på beslutningen eller delbeslutningen. |
| `beslutningseier` | Rollen eller personen som eier beslutningen. |
| `berorte_parter` | Hvem beslutningen påvirker. |
| `risikoniva` | Lav, middels, høy eller svært høy. |
| `rettigheter_eller_betydelig_pavirking` | Om beslutningen kan påvirke rettigheter, arbeid, helse, økonomi eller vesentlige interesser. |
| `saarbar_part` | Om berørt part er i en sårbar situasjon. |
| `reversibilitet` | Om feil lett kan oppdages, rettes eller kompenseres. |
| `relasjonell_tillit` | Om menneskelig nærvær er del av verdien eller legitimiteten. |
| `beslutningslogg_kreves` | Om saken må logges før rolle over utforskende støtte kan foreslås. |

## Modulskårer

Modulene beholder skala 1-5:

| Modul | Bruk |
|---|---|
| `maalklarhet` | Viser om målet er klart nok til strukturert vurdering. |
| `separabilitet` | Viser om delbeslutningen kan skilles trygt ut. |
| `forklarbarhet_oversight` | Viser om output kan forstås, overstyres og kontrolleres. |
| `anti_overreliance` | Viser om arbeidsflyten hindrer blind tillit. |

Skårer er diagnostikk. De er ikke alene nok til å gi grønt lys.

## Stoppregler

En stoppregel betyr at automatisering ikke skal anbefales i denne runden. KI kan fortsatt brukes som utforskende støtte eller dokumentasjonsstøtte hvis det ikke undergraver menneskelig ansvar.

| ID | Stoppregel | Utløses når | Effekt |
|---|---|---|---|
| SR-01 | Rettigheter eller betydelig påvirkning uten reell kontroll | Beslutningen påvirker rettigheter, arbeid, helse, økonomi eller vesentlige interesser, og human oversight er svak eller uklar. | Tak: utforskende støtte. |
| SR-02 | Lav separabilitet | `separabilitet` er 1-2, eller delbeslutningen ikke kan skilles fra helhet, relasjon, skjønn eller lokal kontekst. | Tak: utforskende støtte. |
| SR-03 | Svak forklarbarhet/human oversight | `forklarbarhet_oversight` er 1-2, ansvarlig person mangler tid, kompetanse eller myndighet, eller overstyring ikke er reell. | Tak: utforskende støtte. |
| SR-04 | Høy overreliance-risiko | `anti_overreliance` er 1-2, eller bruker kan akseptere KI-output uten egen vurdering, motargument eller verifikasjon. | Tak: utforskende støtte. |
| SR-05 | Manglende beslutningslogg i høy-risiko sak | Saken er høy risiko og logg for vurdering, verifikasjon, overstyring og ansvar mangler. | Tak: utforskende støtte. |
| SR-06 | Sterk verdikonflikt | Målet er tydelig, men krever politisk, etisk, relasjonell eller strategisk avveining. | Tak: utforskende støtte eller forsterket skjønn. |
| SR-07 | Feil er vanskelige å oppdage eller reversere | Feil kan ikke enkelt oppdages, rettes eller kompenseres. | Tak: forsterket skjønn, ofte utforskende støtte. |
| SR-08 | Output kan ikke verifiseres | KI-output kan ikke sjekkes mot kilde, regel, data eller faglig vurdering. | Tak: utforskende støtte. |

## Rolle-tak

Stoppregler setter øvre grense for rolle før poeng vurderes.

| Tilstand | Maksimal foreløpig rolle |
|---|---|
| Kritisk stoppregel utløst: SR-01, SR-02, SR-03, SR-04, SR-05 eller SR-08 | Utforskende støtte |
| SR-06 utløst uten høy individuell påvirkning | Utforskende støtte eller forsterket skjønn |
| SR-07 utløst, men konsekvensen er middels og kontrollkrav er sterke | Forsterket skjønn |
| Ingen stoppregel, men en modul er under 2,5 | Utforskende støtte |
| Ingen stoppregel, alle moduler minst 3,5 | Rolle kan vurderes fra scoretabell |
| Lavrisiko, reversibel, standardisert sak med alle moduler minst 4,0 | Delautomatisering kan vurderes |
| Automatisert beslutning | Bare kandidatstatus, og bare for lavrisiko, standardiserte, reversible saker med sterk logg og overstyring |

## Scoreberegning

Scoreberegningen fra `scoremodell_runde_1.md` kan fortsatt brukes som diagnostisk modell:

```text
kompass_score = (maalklarhet * 0.45) + (separabilitet * 0.55)
kontroll_score = (forklarbarhet_oversight * 0.55) + (anti_overreliance * 0.45)
```

Men resultatet skal omtales som `beregnet_rolle`, ikke endelig anbefaling.

## Beslutningsrekkefølge

```text
1. Kartlegg beslutningen.
2. Vurder om saken har høy-risiko domene eller sårbar part.
3. Vurder stoppregler.
4. Sett rolle-tak.
5. Beregn kompass-score og kontroll-score.
6. Foreslå beregnet rolle.
7. Sammenlign beregnet rolle med rolle-tak.
8. Presenter foreløpig tillatt rolle.
9. Angi nødvendige kontrollkrav og loggkrav.
```

## Outputkontrakt

En vurdering skal gi disse resultatfeltene:

| Felt | Betydning |
|---|---|
| `stoppregler_utloest` | Liste med SR-ID-er og kort begrunnelse. |
| `rolle_tak` | Høyeste rolle som kan foreslås etter stoppregler. |
| `kompass_score` | Diagnostisk score for målklarhet og separabilitet. |
| `kontroll_score` | Diagnostisk score for forklarbarhet/human oversight og anti-overreliance. |
| `beregnet_rolle` | Rollen scoremodellen ville foreslå uten rolle-tak. |
| `forelopig_tillatt_rolle` | Rollen etter stoppregler og rolle-tak. |
| `begrunnelse` | Kort forklaring på hvorfor rollen er tillatt eller begrenset. |
| `pakrevde_kontroller` | Kontrollkrav som må være på plass før videre bruk. |
| `beslutningslogg_kreves` | Ja/nei og hvorfor. |

## Test mot runde 1-caser

| Case | Forventet stoppregel | Forventet effekt |
|---|---|---|
| HMS-kurs fullført | Ingen hvis kildesystem og retting finnes. | Delautomatisering kan vurderes. |
| Rangere jobbsøkere | SR-01, SR-02, SR-03, SR-04 | Tak: utforskende støtte. |
| Nedbemanning | SR-01, SR-02, SR-04, SR-06, SR-07 | Tak: utforskende støtte. |
| Manglende byggesøknadsdokumentasjon | Ingen hvis bare mangler varsles. | Delautomatisering med saksbehandlerkontroll kan vurderes. |
| Avslag på sosialhjelp | SR-01, SR-02, SR-03, SR-05 | Tak: utforskende støtte. |
| Lagerpåfyll under terskel | Ingen hvis beløpsgrenser og avviksstopp finnes. | Automatisert forslag kan vurderes. |
| Lavverdi leverandørvalg | Domeneavhengig, stopp ved habilitet eller høy verdi. | Forsterket skjønn / delautomatisering. |
| Ny markedsstrategi | SR-02, SR-06 | Tak: utforskende støtte. |
| Ruting av kundehenvendelse | Ingen for standardhenvendelser, stopp ved sårbarhet eller juridisk tema. | Delautomatisering med eskalering. |
| Kompensasjon i sårbar klagesak | SR-01, SR-02, SR-03, SR-04 | Tak: utforskende støtte eller forsterket skjønn. |

## Hva denne kontrakten låser

- Stoppregler vurderes før score.
- Score gir bare beregnet rolle.
- Stoppregler setter rolle-tak.
- Høy-risiko saker krever beslutningslogg før rolle over utforskende støtte.
- Automatisert beslutning er ikke et MVP-mål i runde 1.

## Hva denne kontrakten ikke låser

- Endelig vekting mellom målklarhet og separabilitet.
- Endelig terskel for automatisert beslutning.
- Appflyt, UI eller database.
- Full beslutningslogg-schema.
- Linser for jurist, HR, etikk, risiko, personvern og service design.

## Neste anbefalte artefakt

Neste artefakt bør være `decision_model/beslutningslogg_kontrakt.md`.

Den bør definere minimumsfelter, når logg er obligatorisk, og hva som må dokumenteres ved aksept, avvisning og overstyring av KI-output.
