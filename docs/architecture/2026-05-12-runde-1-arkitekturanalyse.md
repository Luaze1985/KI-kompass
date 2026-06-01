---
title: Arkitekturanalyse runde 1
date: 2026-05-12
status: ready
tags: [arkitektur, ki-beslutningsradar, runde-1]
category: architecture
---

# Arkitekturanalyse runde 1

## Kort konklusjon

Workspace-et er riktig plassert som `concept_context`. Det finnes ikke grunnlag for app, database, frontend eller scoringmotor ennå.

Før MVP må tre arkitekturflater stabiliseres:

1. stoppregel- og scoremodellkontrakt
2. lagskille mellom kart, kompass, kontrollkrav, linser og KI-rolle
3. beslutningslogg som kontrollkontrakt

Neste stabile artefakt bør være `testcases/runde_1_testcaser.md`, fordi casene kan teste om scoremodellen gir nyttige anbefalinger uten å skjule røde flagg.

## Må løses før MVP

### 1. Stoppregel- og scoremodellkontrakt

Problem:

`decision_model/scoremodell_runde_1.md` har konkrete vekter, terskler og en anbefalt MVP-modell, mens `tasks/active/test_scoremodell_mot_caser.md` sier at vekting, stoppregler og appflyt ikke skal låses før modellen er testet.

Hvorfor det betyr noe:

Hvis tersklene brukes for tidlig, kan modellen gi falsk presisjon. En høy samlet score kan skjule rettighetsvirkning, lav reversibilitet, manglende forklarbarhet eller svak human oversight.

Neste artefakt:

`testcases/runde_1_testcaser.md` må fungere som testflate for stoppregler før en egen modellkontrakt skrives.

Testimplikasjon:

Hver case må vurdere stoppregler før foreløpig KI-rolle. Minst to caser må vise høy målklarhet, men lav automatiserbarhet på grunn av separabilitet eller kontrollkrav.

### 2. Lagskille mellom kart, kompass, kontrollkrav, linser og KI-rolle

Problem:

Grensene er godt formulert i konseptfilene, men ikke gjort til en stabil kontrakt. `decision_model/datamodell.md` flater kart, kompass, kontrollkrav, beslutningslogg og rapportoutput ut i ett feltsett.

Hvorfor det betyr noe:

Uten eksplisitte laggrenser kan appflyt eller videre modellarbeid gjøre kontrollkrav til skjulte kompassakser, gjøre linser til dimensjoner, eller vise KI-rolle før kontrollkrav og stoppregler er vurdert.

Neste artefakt:

Et kort notat bør senere etableres som `decision_model/lagskille_og_beslutningsflyt.md`.

Testimplikasjon:

Casetester må avsløre hvis kart mangler før skåring, hvis linser inngår i score, eller hvis KI-rolle formuleres før kontrollkrav.

### 3. Beslutningslogg som kontrollkontrakt

Problem:

Beslutningslogg er identifisert som nødvendig, men finnes foreløpig bare som feltliste i `decision_model/datamodell.md`.

Hvorfor det betyr noe:

Uten logg kan ikke høy-risiko vurderinger etterprøves. Human oversight kan bli en formell godkjenning uten reell kontroll.

Neste artefakt:

Et senere notat bør etableres som `decision_model/beslutningslogg_kontrakt.md`.

Testimplikasjon:

Casene må angi forventede loggkrav: ansvarlig person, menneskelig vurdering, motargument, verifikasjon, usikkerhet, overstyring og endelig ansvar.

## Kan vente

- Eksakte vekter og terskler i scoremodellen.
- Full linsetaksonomi for juridisk, HR, etikk, risiko, personvern og service design.
- Appflyt, UI-tekst og rapportformat utover manuell testmal.

## Skal ikke gjøres nå

- Ikke bygg frontend, backend, database eller scoringmotor.
- Ikke gjør linser til kompassdimensjoner.
- Ikke gjør forklarbarhet til tredje kompassakse.
- Ikke behandle KI-rolle som fasit eller automatisert beslutning.

## Anbefaling

Prioriter `testcases/runde_1_testcaser.md` først. Bruk resultatene til å avgjøre om neste arkitekturartefakt skal være:

1. `decision_model/stoppregel_og_scorekontrakt.md`
2. `decision_model/lagskille_og_beslutningsflyt.md`
3. `decision_model/beslutningslogg_kontrakt.md`
