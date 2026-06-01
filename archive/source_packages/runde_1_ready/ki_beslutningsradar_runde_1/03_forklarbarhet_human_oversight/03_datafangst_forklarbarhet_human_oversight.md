---
title: Datafangst: Forklarbarhet og human oversight
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Datafangst: Forklarbarhet + human oversight

## 1. Kort sammendrag

Forklarbarhet og human oversight er kontrollkrav, ikke kompassakser. De avgjør om en KI-støttet beslutning kan forstås, kontrolleres, overstyres og dokumenteres. Forklarbarhet handler om at mennesker får nok forståelig informasjon til å vurdere output, begrunnelse, begrensninger og datagrunnlag. Human oversight handler om reell menneskelig kontroll: en kompetent person må kunne overvåke, gripe inn, ignorere, overstyre eller stoppe systemet.

## 2. Operativ definisjon

**Forklarbarhet:** KI-output må kunne forklares på en måte som er forståelig for den rollen som skal kontrollere eller bruke beslutningen.

**Human oversight:** Menneskelig tilsyn er reelt bare når et menneske har kompetanse, tid, myndighet og systemstøtte til å forstå, stoppe, overstyre eller reversere KI-output.

## 3. Viktigste kilder

| Kilde | Eier | Type | Hva kilden sier | Relevans | Forbehold |
|---|---|---|---|---|---|
| EU AI Act artikkel 14 | EU | regulering | Høyrisiko-KI skal kunne overvåkes av mennesker; mennesker skal kunne forstå begrensninger, tolke output, unngå over-reliance, overstyre og stoppe systemet. | Sterk hovedkilde for human oversight. | Gjelder primært høyrisiko-systemer. |
| EDPS TechDispatch XAI | EDPS | fagrapport | XAI handler om klare og forståelige forklaringer; skiller transparens, interpretabilitet og forklarbarhet. | Hovedkilde for forklarbarhet. | Kort rapport, ikke komplett standard. |
| Datatilsynet NAV sandkasse | Datatilsynet | regulatorisk veiledning | Menneskelig involvering må være reell, ikke fingert eller illusorisk. | Viktig for norsk offentlig kontekst. | Veiledende sandkasse, ikke rettsavgjørelse. |
| NIST AI RMF | NIST | risikorammeverk | Risikostyring må inkludere kartlegging, måling, styring og oppfølging. | Brukes til kontrollstruktur. | Frivillig rammeverk. |
| ISO/IEC 42001 | ISO/IEC | standard | AI-ledelsessystem skal etablere styring, ansvar, dokumentasjon og kontinuerlig forbedring. | Relevant for governance og drift. | Betalt standard; offentlig side gir bare sammendrag. |

## 4. Kontrollkriterier

| Kriterium | Lav kontroll | Høy kontroll | Mulig app-spørsmål | Kilde |
|---|---|---|---|---|
| Forståelig output | Output er uklart eller teknisk. | Output er forklart i vanlig fagspråk. | «Forstår kontrolløren hva KI anbefaler?» | EDPS |
| Begrunnelse | Systemet gir ingen begrunnelse eller bare generiske svar. | Systemet viser hovedgrunner og relevante faktorer. | «Viser KI hvorfor den anbefaler dette?» | EDPS |
| Datagrunnlag | Kildene er skjult eller usikre. | Bruker ser hvilke data/kilder som er brukt. | «Er datagrunnlaget synlig og kontrollerbart?» | EDPS / NIST |
| Begrensninger | Systemet fremstår sikrere enn det er. | Systemet viser usikkerhet, begrensninger og mulig feiltype. | «Vises systemets usikkerhet og begrensninger?» | EU AI Act / Microsoft |
| Overstyring | Mennesket kan ikke reelt overstyre. | Mennesket kan ignorere, reversere eller stoppe output. | «Kan en ansvarlig person stoppe eller overstyre?» | EU AI Act |
| Kompetanse | Kontrollør mangler tid eller fagkunnskap. | Kontrollør har kompetanse, rolle og tid. | «Har kontrolløren kompetanse og myndighet?» | EU AI Act / Datatilsynet |
| Logg | Ingen sporbar beslutningshistorikk. | Input, output, begrunnelse og menneskelig handling logges. | «Logges beslutningen godt nok for etterkontroll?» | NIST / ISO |

## 5. Forslag til skåringsspørsmål

1. Hvor forståelig er KI-output for ansvarlig fagperson?
2. Hvor tydelig er KI-begrunnelsen?
3. Hvor synlig er datagrunnlaget?
4. Hvor godt viser systemet usikkerhet og begrensninger?
5. Hvor lett er det å oppdage feil i output?
6. Hvor reell er menneskets mulighet til å overstyre?
7. Hvor lett kan systemet stoppes eller reverseres?
8. Hvor klart er ansvar plassert?
9. Hvor kompetent er personen som skal føre tilsyn?
10. Hvor godt logges beslutningsprosessen?

## 6. Foreløpig skåringslogikk

- **1–2 = svak kontroll:** KI kan ikke brukes til automatisering.
- **3 = moderat kontroll:** KI kan brukes som beslutningsstøtte med eksplisitt menneskelig vurdering.
- **4–5 = sterk kontroll:** delautomatisering kan vurderes hvis kompasset og risikovurderingen også støtter det.

## 7. Røde flagg

- Human oversight er bare en knapp eller formell godkjenning.
- Kontrollør mangler tid, myndighet eller kompetanse.
- KI-output kan ikke forklares til den som påvirkes.
- Systemet kan ikke stoppes eller reverseres.
- Beslutningen påvirker rettigheter, men mangler logg.
- Brukere forventes å stole på output uten verifikasjon.

## 8. Eksempler

- **Lav kontroll:** KI foreslår avslag på tjeneste uten begrunnelse eller synlig datagrunnlag.
- **Høy kontroll:** KI peker på manglende dokumentasjon, viser kilder og lar saksbehandler godkjenne eller avvise forslaget.

## 9. Kildekontroll

- Primærkilder: EU AI Act, Datatilsynet.
- Fagkilder: EDPS, NIST.
- Praktiske standarder: ISO/IEC 42001.
- Svake kilder: leverandørpåstander om «human in the loop» uten konkret kontrollbeskrivelse.

## 10. Handoff til syntese

- Forklarbarhet skal ikke bli tredje kompassakse.
- Human oversight skal være stoppregel og kontrollkrav.
- Reell overstyring krever kompetanse, tid, myndighet og logg.
- Forklaring må være rollebasert: jurist, HR, leder og bruker trenger ulike forklaringer.
- Beslutningslogg må inn som egen minimumskontroll i senere runde.
