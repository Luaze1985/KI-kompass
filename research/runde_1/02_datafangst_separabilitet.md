---
title: Datafangst: Separabilitet
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---


# Datafangst: Separabilitet

## 1. Kort sammendrag

Separabilitet beskriver om en beslutning kan deles i avgrensede, kontrollerbare deloppgaver som KI kan støtte eller utføre uten å miste nødvendig kontekst, ansvar og dømmekraft. Høy separabilitet foreligger når input, regler, vurderingskriterier, output og feilkonsekvenser kan avgrenses tydelig. Lav separabilitet foreligger når beslutningen krever helhetsforståelse, relasjonell tillit, etikk, lokal kontekst eller ansvarlig skjønn. Separabilitet må holdes adskilt fra målklarhet: et mål kan være klart, men beslutningen likevel lite separerbar.

## 2. Operativ definisjon

**Separabilitet** er graden av oppdelbarhet i en beslutning. I KI-beslutningsradaren betyr det: Kan KI håndtere en del av beslutningen som en tydelig, testbar og ansvarsmessig avgrenset oppgave, uten at helheten blir feil?

## 3. Viktigste kilder

| Kilde | Eier | Type | Hva kilden sier | Relevans | Forbehold |
|---|---|---|---|---|---|
| NIST AI RMF 1.0 | NIST | risikorammeverk | AI-risiko må vurderes etter kontekst, bruk, påvirkning og styring. | Brukes til å knytte separabilitet til kontekst og risiko. | Frivillig rammeverk, ikke skåringsmodell. |
| NIST AI RMF Playbook | NIST | praktisk veileder | Playbook støtter Govern, Map, Measure og Manage for operasjonell risikostyring. | Gir grunnlag for kartlegging før automasjon. | Ikke beslutningsradar-spesifikk. |
| Datatilsynet automatiserte avgjerder | Datatilsynet | regulatorisk veiledning | Helautomatiske avgjørelser med rettsvirkning eller betydelig påvirkning er som hovedregel forbudt uten særskilt grunnlag. | Sterk stoppregel ved lav separabilitet og høy påvirkning. | Personvernrettslig, ikke generell KI-metode. |
| MIT Sloan human capabilities | MIT Sloan | forskning/analyse | Oppgaver med empati, etikk, kreativitet og menneskelig dømmekraft er vanskeligere å automatisere. | Brukes til kriterier for skjønn og relasjon. | Arbeidsmarkedsvinkel. |
| OECD AI Principles | OECD | prinsipper | AI bør være menneskesentrert, transparent, robust og ansvarlig. | Brukes som normativ støtte for ansvar og tillit. | Overordnet prinsippnivå. |

## 4. Kriterier for separabilitet

| Kriterium | Lav separabilitet | Høy separabilitet | Mulig app-spørsmål | Kilde |
|---|---|---|---|---|
| Direkte handlingsverdi | KI-output må tolkes i bred kontekst før bruk. | KI-output kan brukes direkte eller som klart avgrenset beslutningsinput. | «Kan KI-output brukes direkte, eller må den tolkes av fagperson?» | NIST AI RMF |
| Behov for skjønn | Krever erfaring, helhetsvurdering, etikk eller lokal forståelse. | Kan vurderes ut fra faste kriterier og tydelige regler. | «Krever dette vesentlig menneskelig skjønn?» | MIT Sloan / OECD |
| Konsekvens ved feil | Feil kan gi alvorlig skade, rettighetstap eller tillitsbrudd. | Feil er små, avgrensede og håndterbare. | «Hva skjer hvis KI tar feil?» | NIST / Datatilsynet |
| Reversibilitet | Feil er vanskelige å oppdage eller rette. | Feil kan raskt oppdages, reverseres eller kompenseres. | «Kan feilen enkelt oppdages og omgjøres?» | NIST |
| Ansvarlighet | Det er uklart hvem som kan forklare og stå inne for beslutningen. | En navngitt rolle kan forklare, godkjenne og overstyre. | «Finnes det en ansvarlig person som kan stå inne for beslutningen?» | EU AI Act / OECD |
| Relasjon og tillit | Mottakerens tillit avhenger av menneskelig kontakt. | Mottaker aksepterer standardisert digital behandling. | «Betyr menneskelig nærvær noe for mottakerens tillit?» | OECD / MIT Sloan |
| Unntak og kontekst | Mange særtilfeller og lokal kunnskap. | Få unntak og tydelige standardtilfeller. | «Finnes det mange unntak som krever lokal forståelse?» | NIST |
| Rettigheter og legitimitet | Påvirker rettigheter, helse, økonomi, arbeidsforhold eller tilgang. | Har begrenset påvirkning på individets rettigheter eller livssituasjon. | «Påvirker beslutningen rettigheter eller vesentlige interesser?» | Datatilsynet |

## 5. Forslag til skåringsspørsmål

1. Hvor direkte kan KI-output brukes uten faglig tolking?
2. Hvor lite menneskelig skjønn krever beslutningen?
3. Hvor små er konsekvensene ved feil?
4. Hvor lett er feil å oppdage?
5. Hvor lett er feil å rette eller reversere?
6. Hvor klart er ansvar plassert hos en person eller rolle?
7. Hvor lite relasjonell tillit krever beslutningen?
8. Hvor få unntak og særtilfeller finnes?
9. Hvor lite påvirker beslutningen rettigheter, helse, økonomi eller arbeid?
10. Hvor standardisert er datagrunnlaget?
11. Hvor lett er delbeslutningen å teste isolert?
12. Hvor klart kan KI-avgrensningen forklares til bruker?

## 6. Foreløpig skåringslogikk

- **1–2 = lav separabilitet:** bruk KI kun som utforskende støtte.
- **3 = middels separabilitet:** KI kan støtte, men mennesket må tolke og beslutte.
- **4–5 = høy separabilitet:** delautomatisering kan vurderes, men bare hvis målklarhet er høy og kontrollkrav er oppfylt.

## 7. Røde flagg

Automatisering bør stoppes når beslutningen:

- påvirker rettigheter eller har rettsvirkning,
- krever moralsk eller relasjonelt skjønn,
- har feil som er vanskelige å oppdage,
- har uklart ansvar,
- har mange lokale unntak,
- ikke kan forklares til den som påvirkes.

## 8. Eksempler

- **HR lav:** vurdere hvem som bør sies opp ved nedbemanning.
- **HR høy:** kontrollere om obligatorisk HMS-kurs er fullført.
- **Offentlig lav:** skjønnsmessig vurdering av særlig behov.
- **Offentlig høy:** varsle at søknad mangler dokumentasjon.
- **SMB lav:** velge ny strategisk satsing basert på eierens risikovilje.
- **SMB høy:** foreslå reorder når lagerbeholdning er under terskel.
- **Strategi lav:** avgjøre om virksomheten bør endre forretningsmodell.
- **Kundedialog høy:** rute en henvendelse til riktig kategori.

## 9. Kildekontroll

- Primærkilder: Datatilsynet, EU AI Act.
- Rammeverk: NIST AI RMF, OECD AI Principles.
- Forskning/analyse: MIT Sloan.
- Svakere kilder: generelle konsulentartikler om automasjon bør ikke brukes som hovedgrunnlag.

## 10. Handoff til syntese

- Separabilitet må alltid vurderes etter målklarhet, ikke blandes med den.
- Høy målklarhet + lav separabilitet betyr ikke automatisering.
- Rettighetsvirkning bør fungere som stoppregel.
- Reversibilitet og konsekvens ved feil bør vektes tungt.
- Ansvarlighet må kobles til human oversight.
