---
title: Beslutningsloggkontrakt
date: 2026-05-12
status: ready
tags: [beslutningslogg, human-oversight, anti-overreliance, runde-1]
category: decision-model
---

# Beslutningsloggkontrakt

## Formål

Beslutningsloggen skal dokumentere menneskelig vurdering, KI-bruk, kontroll, overstyring og ansvar.

Kontrakten låser ikke database, UI eller teknisk schema. Den definerer minimumskrav til hva som må kunne dokumenteres før appflyt eller MVP-spesifikasjon.

## Når logg er obligatorisk

Beslutningslogg er obligatorisk når ett eller flere punkter gjelder:

- saken har høy eller svært høy risiko
- beslutningen påvirker arbeid, helse, rettigheter, økonomi eller vesentlige interesser
- berørt part er sårbar
- KI-output brukes som grunnlag for anbefaling, avslag, prioritering eller rangering
- foreløpig tillatt rolle er over `utforskende støtte`
- ansvarlig person overstyrer, aksepterer eller avviser KI-output i en sak med betydelig påvirkning
- stoppregel er utløst, men KI fortsatt brukes som støtte

## Lavrisiko-logg

Lavrisiko-logg brukes for standardiserte, reversible og lite inngripende oppgaver.

Minimumsfelter:

| Felt | Krav |
|---|---|
| `beslutning_id` | Entydig referanse. |
| `beslutning_tittel` | Kort beskrivelse. |
| `beslutningseier` | Rolle eller person som eier beslutningen. |
| `ki_output_brukt` | Hva KI foreslo eller gjorde. |
| `kilde_eller_datagrunnlag` | Hvilket grunnlag output bygget på. |
| `forelopig_tillatt_rolle` | Rollen etter stoppregler og rolle-tak. |
| `endelig_handling` | Akseptert, avvist, endret eller eskalert. |
| `endelig_ansvarlig` | Hvem som står ansvarlig. |
| `dato` | Når vurderingen ble gjort. |

## Høy-risiko-logg

Høy-risiko-logg brukes når saken kan påvirke rettigheter, arbeid, helse, økonomi, sårbare personer, tillit eller legitimitet.

Minimumsfelter:

| Felt | Krav |
|---|---|
| `beslutning_id` | Entydig referanse. |
| `beslutning_tittel` | Kort beskrivelse. |
| `beslutningseier` | Rolle eller person som eier beslutningen. |
| `berorte_parter` | Hvem beslutningen påvirker. |
| `risikoniva` | Lav, middels, høy eller svært høy. |
| `stoppregler_utloest` | Liste med SR-ID og begrunnelse. |
| `rolle_tak` | Maksimal rolle etter stoppregler. |
| `beregnet_rolle` | Rollen scoremodellen ville gitt uten rolle-tak. |
| `forelopig_tillatt_rolle` | Rollen som faktisk kan foreslås. |
| `ki_output_brukt` | Hva KI foreslo, oppsummerte eller klassifiserte. |
| `menneskelig_forhandsvurdering` | Ansvarlig persons vurdering før KI-output aksepteres. |
| `menneskelig_sluttvurdering` | Ansvarlig persons vurdering etter kontroll. |
| `motargumenter_vurdert` | Minst ett relevant motargument eller alternativ forklaring. |
| `verifikasjon` | Hvilke kilder, regler eller data KI-output er sjekket mot. |
| `usikkerhet` | Kjente usikkerheter, mangler eller feilrisiko. |
| `overstyring` | Om KI-output ble akseptert, endret, avvist eller eskalert. |
| `begrunnelse_for_overstyring` | Hvorfor ansvarlig person valgte handlingen. |
| `endelig_beslutning` | Hva som faktisk ble besluttet. |
| `endelig_ansvarlig` | Navngitt rolle eller person som eier beslutningen. |
| `dato` | Når vurderingen ble gjort. |

## Hvordan loggen hindrer gummistempel

Loggen skal tvinge frem aktiv menneskelig vurdering.

Minstekrav i høy-risiko saker:

- mennesket må skrive egen forhåndsvurdering før KI-output aksepteres
- KI-output må verifiseres mot kilde, regel eller data
- minst ett motargument må vurderes
- usikkerhet må dokumenteres
- aksept av KI-output må begrunnes like tydelig som avvisning
- overstyring må kunne spores til ansvarlig person

Hvis disse kravene ikke kan oppfylles, skal `SR-05` fra stoppregelkontrakten utløses.

## Hvordan loggen hindrer overreliance

Loggen skal gjøre blind tillit synlig.

Røde flagg:

- KI-output aksepteres uten egen menneskelig vurdering
- kilder er ikke sjekket
- ansvarlig person kan ikke forklare anbefalingen
- usikkerhet er ikke dokumentert
- avvik fra KI-output blir sjeldent eller aldri registrert
- brukeren mangler tid eller kompetanse til å kontrollere output

Ved røde flagg skal rollen begrenses til `utforskende støtte` inntil kontrollkravene er oppfylt.

## Forhold til stoppregel- og scorekontrakt

Beslutningsloggen er koblet til disse stoppreglene:

| Stoppregel | Loggkonsekvens |
|---|---|
| SR-01 | Dokumenter reell menneskelig kontroll og ansvar. |
| SR-03 | Dokumenter kompetanse, myndighet og overstyringsmulighet. |
| SR-04 | Dokumenter think-first, motargument og verifikasjon. |
| SR-05 | Utløses hvis høy-risiko logg mangler. |
| SR-08 | Dokumenter hvilke kilder, regler eller data output er verifisert mot. |

## Test mot runde 1-caser

| Case | Loggnivå | Begrunnelse |
|---|---|---|
| HMS-kurs fullført | Lavrisiko-logg | Standardisert og reversibel, men retting må spores. |
| Rangere jobbsøkere | Høy-risiko-logg | Arbeid og diskrimineringsrisiko. |
| Nedbemanning | Høy-risiko-logg | Arbeid, livssituasjon, juss og relasjonell tillit. |
| Manglende byggesøknadsdokumentasjon | Lavrisiko-logg eller høy-risiko-logg ved avslag | Varsel er lavere risiko; avslag krever høy-risiko-logg. |
| Avslag på sosialhjelp | Høy-risiko-logg | Rettigheter og sårbar situasjon. |
| Lagerpåfyll under terskel | Lavrisiko-logg | Standardisert, økonomisk avgrenset og reversibel. |
| Lavverdi leverandørvalg | Lavrisiko-logg, høy-risiko ved habilitet/høy verdi | Avhenger av verdi, avtaler og habilitet. |
| Ny markedsstrategi | Høy-risiko-logg for beslutning, analyse-logg for KI-sparring | Strategisk ansvar må dokumenteres. |
| Ruting av kundehenvendelse | Lavrisiko-logg | Standardruting, men eskalering må spores. |
| Kompensasjon i sårbar klagesak | Høy-risiko-logg | Sårbar kunde, relasjonell tillit og mulig rettslig påvirkning. |

## Hva denne kontrakten låser

- Høy-risiko saker må ha beslutningslogg.
- Logg må dokumentere menneskelig vurdering, ikke bare KI-output.
- Aksept av KI-output må begrunnes.
- Motargument, verifikasjon, usikkerhet og ansvar må inngå i høy-risiko logg.
- Manglende logg kan stoppe rolle over `utforskende støtte`.

## Hva denne kontrakten ikke låser

- Databasefelter.
- UI-komponenter.
- Eksakt rapportformat.
- Retensjonstid, tilgangsstyring eller revisjonsteknologi.
- Juridisk fullstendig compliance-modell.

## Neste anbefalte arbeid

Neste arbeid bør være ekstern grilling av mål, scope, edge cases og testbarhet før MVP-spesifikasjon.
