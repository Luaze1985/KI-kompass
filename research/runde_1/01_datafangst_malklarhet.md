---
title: Datafangst: Målklarhet
date: 2026-05-12
status: ready
tags: [ki-beslutningsradar, runde-1]
category: ki-beslutningsradar
---

# Datafangst: Målklarhet

## 1. Kort sammendrag

Målklarhet beskriver hvor presist et beslutningsmål er definert og forstått. Uten klare mål kan KI‑systemer optimalisere feil størrelser eller forsterke skjevheter. Denne datafangsten samler operasjonelle definisjoner, nøkkelkilder, kriterier og skåringsspørsmål for å vurdere målklarhet i KI‑beslutningsradaren. De syv dimensjonene som undersøkes er målformulering, målbarhet, enighet, stabilitet, regelmessighet, feedback og verdikonflikt. Hver dimensjon beskriver både lav og høy grad av klarhet og foreslår et app‑spørsmål for å måle den. Dokumentet inkluderer også skåringslogikk, røde flagg for når automatisering bør unngås, praktiske eksempler fra ulike sektorer, kildekritikk og punkter som må tas videre i syntesen. Målet er å gi et komprimert, operativt grunnlag for å vurdere om en beslutning er klar nok til å automatiseres, delautomatiseres eller forbli menneskelig.

## 2. Operativ definisjon

I denne konteksten er **målklarhet** graden av presisjon og forutsigbarhet i et beslutningsmål. Høy målklarhet foreligger når målet er klart formulert, målbart, forstått likt av fagpersoner, stabilt over tid og situasjoner, forekommer regelmessig, gir mulighet for tilbakemeldingssløyfer og ikke er preget av etiske eller politiske verdikonflikter. Lav målklarhet kjennetegnes av vage målformuleringer, manglende måleindikatorer, stor faglig uenighet, hyppige endringer, engangssituasjoner, fravær av feedback og sterke verdikonflikter. Målklarhet er en forutsetning for at KI‑systemer skal kunne aligneres med menneskelige mål【389899583761595†L51-L56】 og levere konsistente, målbare beslutninger【162241366453357†L136-L160】.

## 3. Viktigste kilder

| Kilde | Utgiver/eier | År/sist oppdatert | Type kilde | Hva kilden faktisk sier | Relevans for målklarhet | Svakheter/forbehold | Lenke |
|---|---|---|---|---|---|---|---|
| **EU AI‑forordningen – Artikkel 14 (Human oversight)** | Future of Life Institute / EU | 2024 | Regulering | Høyrisiko‑KI skal designes slik at naturlige personer kan forstå systemets kapasiteter, unngå over‑reliance, tolke output og stanse systemet【300988383654951†L508-L570】. | Understreker at uklare mål og lite forklarbare systemer krever menneskelig tilsyn. | Teksten er en inoffisiell oversettelse; kravene gjelder primært høyrisiko‑systemer. | 【300988383654951†L508-L570】 |
| **EDPS TechDispatch – Explainable AI** | European Data Protection Supervisor | 2023 | Fagrapport | Definerer forklarbar KI som evnen til å gi klare og forståelige begrunnelser for beslutninger【795378249545835†L124-L133】 og skiller mellom transparens, interpretabilitet og forklarbarhet【795378249545835†L165-L207】. | Viser hvordan transparens og forklarbarhet gjør det mulig å kontrollere måloppnåelse, noe som støtter kriteriene for målformulering, feedback og enighet. | Generell rapport; omtaler ikke direkte målspesifikke problemstillinger. | 【795378249545835†L124-L133】 |
| **Stanford HAI – AI Alignment** | Stanford University | 2024 (online) | Definisjon | AI alignment sikrer at AI‑systemers mål og adferd samsvarer med menneskers intensjoner og verdier【389899583761595†L51-L56】. | Fremhever viktigheten av klare og godt spesifiserte mål for å unngå misalignment. | Høynivådefinisjon; ikke en operasjonell standard. | 【389899583761595†L51-L56】 |
| **MIT Sloan – Human capabilities complement AI’s shortcomings** | MIT Sloan School of Management | 2025 | Forskningsartikkel / analyse | Arbeid som avhenger av empati, etikk, kreativitet og håp er mindre sannsynlig å bli automatisert【747086488690856†L158-L176】. | Understreker at oppgaver med sterke verdikonflikter og subjektiv dømmekraft krever menneskelig involvering. | Fokuserer på arbeidsmarked og USA; ikke spesifikt om beslutningsmål. | 【747086488690856†L158-L176】 |
| **Teradata – AI Decision‑Making and Decision Engines** | Teradata | 2024 | Industriveileder | AI‑beslutningssystemer bruker data, modeller og regler for å levere konsekvente, målbare handlinger; beslutningsflyten involverer logging og feedback for kontinuerlig forbedring【162241366453357†L136-L160】. Høyvolums‑ og regelmessige beslutninger egner seg best for beslutningsmotorer【162241366453357†L146-L207】. | Gir grunnlag for kriteriene målbarhet, regelmessighet, stabilitet og feedback. | Kommersielt perspektiv; kan ha produktbias. | 【162241366453357†L136-L160】 |
| **Microsoft – Overreliance risk identification and mitigation framework** | Microsoft | 2026 | Teknisk veileder | Definerer overreliance som å akseptere feil eller ufullstendige KI‑utdata【914332460050748†L317-L327】. Beskriver rammeverk for å identifisere risikofaktorer og tiltak som realistiske mentale modeller og verifikasjonsstøtte【914332460050748†L345-L352】【914332460050748†L411-L432】. | Viser behovet for feedback og forståelse for å unngå blind tillit, relevant for målbarhet og feedback. | Mer fokus på brukeradferd enn på målspesifikasjon. | 【914332460050748†L317-L327】 |

## 4. Kriterier for målklarhet

| Kriterium | Lav målklarhet | Høy målklarhet | Mulig app‑spørsmål | Kilde |
|---|---|---|---|---|
| **Målformulering** | Vagt formulert, upresist, blandet med aktiviteter eller motstridende forventninger. | Klart formulert som et konkret resultat med avgrensning i hvem, hva og når; lett å forklare til andre【389899583761595†L51-L56】. | «Er målet formulert som et konkret resultat, ikke bare en aktivitet?» | AI alignment【389899583761595†L51-L56】 |
| **Målbarhet** | Resultatet kan ikke måles; ingen klare indikatorer eller data. | Klare måleparametere (KPIer) eller kvalitative indikatorer gjør det mulig å følge progresjon og utfallet【162241366453357†L136-L160】. | «Finnes det data eller indikatorer som viser om målet er nådd?» | Teradata – AI decision‑making【162241366453357†L136-L160】 |
| **Enighet** | Ulike fagpersoner vurderer hva som er et godt resultat ulikt; subjektiv eller normativ vurdering. | Brei faglig enighet om ønsket resultat; støttes av bransjestandarder eller lovverk. | «Vil et panel av fagpersoner være enige om hva som er et godt resultat?» | – |
| **Stabilitet** | Målet endres ofte over tid, mellom avdelinger eller prosjekter. | Målet er konsistent over tid og kontekster, slik at regler og modeller kan brukes konsekvent【162241366453357†L136-L160】. | «Forblir målet det samme over tid og på tvers av enheter?» | Teradata【162241366453357†L136-L160】 |
| **Regelmessighet** | Beslutningen er unik eller sjelden; lite historikk å lære av. | Beslutningen forekommer ofte med lignende forutsetninger; kan standardiseres og gjenbrukes【162241366453357†L146-L207】. | «Er denne typen beslutning sjelden eller gjentakende med lignende mønstre?» | Teradata【162241366453357†L146-L207】 |
| **Feedback** | Ingen strukturert tilbakemelding eller data om beslutningens effekt; vanskelig å lære og forbedre. | Utfallet logges og evalueres i lukkede sløyfer, slik at modellen kan justeres over tid【162241366453357†L136-L160】. | «Kan vi måle og evaluere utfallet i ettertid for å lære av det?» | Teradata【162241366453357†L136-L160】 |
| **Verdikonflikt** | Mål involverer etiske, politiske eller relasjonelle konflikter som krever skjønn; høy risiko for uenighet【747086488690856†L158-L176】. | Mål berører i liten grad etiske konflikter; beslutningen bygger på tekniske eller administrative kriterier. | «Reiser målet etiske, politiske eller relasjonelle dilemmaer som krever menneskelig dømmekraft?» | MIT Sloan【747086488690856†L158-L176】 |

## 5. Forslag til skåringsspørsmål

Bruk en 1–5 skala der 1 = svært lav klarhet og 5 = svært høy klarhet.

1. **Hvor presist er målet formulert?** (1 = vagt formulert, 5 = konkret definert)
2. **Hvor godt kan resultatene måles med objektive data eller indikatorer?** (1 = ingen måledata, 5 = klare KPIer)
3. **Hvor enig vil et ekspertpanel være om hva som er et godt resultat?** (1 = stor uenighet, 5 = bred enighet)
4. **Hvor stabilt er målet over tid og på tvers av avdelinger?** (1 = hyppige endringer, 5 = stabilt)
5. **Hvor ofte oppstår denne beslutningen med lignende forutsetninger?** (1 = engangssak, 5 = svært regelmessig)
6. **Hvor lett er det å samle feedback om beslutningens kvalitet?** (1 = ingen tilbakemelding, 5 = godt dokumentert feedback)
7. **I hvilken grad involverer målet etiske eller politiske verdikonflikter?** (1 = sterke konflikter, 5 = ingen eller minimale konflikter)
8. **Er det tydelig hvem som eier målet og hvem som påvirkes av beslutningen?** (1 = uklart eierskap, 5 = klart definert)
9. **Finnes det etablerte regelverk eller standarder som definerer ønsket resultat?** (1 = ingen standarder, 5 = klare standarder)
10. **Hvor lett er det å forklare formålet til en utenforstående?** (1 = svært vanskelig, 5 = svært lett)
11. **I hvilken grad kan delmål eller suksesskriterier brytes ned på forhånd?** (1 = ikke mulig, 5 = mulig)
12. **Hvor konsekvent er informasjonen man baserer beslutningen på?** (1 = sprikende kilder, 5 = konsistente kilder)
13. **Hvor stor påvirkning har usikre antagelser på måloppnåelsen?** (1 = svært stor, 5 = liten)
14. **Er målet koblet til overordnede strategiske mål?** (1 = nei, 5 = klart definert kobling)
15. **Vil gjennomføring av målet kunne evalueres og rapporteres på en standardisert måte?** (1 = nei, 5 = ja)

## 6. Foreløpig skåringslogikk

Skåringssystemet deler total vurdering av målklarhet inn i tre kategorier:

- **1–2 (Lav målklarhet):** Målene er vage, vanskelig å måle, ustabile eller preget av verdikonflikt. Her bør automatisering unngås; beslutningen bør i stedet håndteres manuelt med faglig skjønn og muligens støttes av KI som en utforskende assistent.
- **3 (Middels målklarhet):** Noen elementer er tydelige, men det er fortsatt usikkerhet eller uenighet. KI kan brukes som beslutningsstøtte, men det må være menneske i sløyfen for å tolke resultater og justere mål underveis.
- **4–5 (Høy målklarhet):** Målene er klart definert, målbare og stabile. Her kan KI levere automatisert beslutning eller delautomatisering, avhengig av andre faktorer som separabilitet og risiko. Menneskelig oversyn vil likevel være nødvendig for å sikre ansvarlighet.

Denne enkle kategoriseringen skal brukes som et utgangspunkt. Endelige terskler må kalibreres basert på erfaringsdata og risikonivå i de aktuelle prosessene.

## 7. Røde flagg

Lav målklarhet bør hindre automatisering når ett eller flere av følgende er til stede:

- **Høye innsatsverdier:** Beslutningen påvirker mennesker direkte (f.eks. ansettelser, helse, kreditt), og feil kan gi alvorlige konsekvenser.
- **Verdikonflikter:** Målene innebærer etiske dilemmaer eller politiske avveininger der ulikt syn mellom fagpersoner er sannsynlig【747086488690856†L158-L176】.
- **Manglende måledata:** Når det ikke finnes troverdige indikatorer for å validere utfallet, kan man ikke lære av feil, og AI kan drive feil retning【162241366453357†L136-L160】.
- **Engangssituasjoner:** Unike beslutninger uten historikk eller regelmessighet gjør modellering lite hensiktsmessig【162241366453357†L146-L207】.
- **Ustabilt mål:** Mål som endres hyppig eller underveis gir høy risiko for misalignment【162241366453357†L136-L160】.

I slike tilfeller bør prosjektet enten forbedre målformuleringen eller velge menneskelig beslutning med KI som støtte fremfor automatisering.

## 8. Eksempler

**HR**

- *Lav målklarhet:* «Skape et godt arbeidsmiljø.» Målformuleringen er vag, ingen klare indikatorer.
- *Høy målklarhet:* «Redusere turnover med 10 % innen 12 måneder, målt som andel ansatte som slutter i perioden.»

**Offentlig sektor**

- *Lav målklarhet:* «Forbedre innbyggeropplevelsen.» Uklart hva som skal forbedres, og resultatet er subjektivt.
- *Høy målklarhet:* «Redusere gjennomsnittlig saksbehandlingstid for byggesøknader med 20 % innen utgangen av året.»

**SMB**

- *Lav målklarhet:* «Øke omsetningen.» Uklart hvor mye, fra hvilke produkter og over hvilken tidsperiode.
- *Høy målklarhet:* «Øke omsetningen i nettbutikken med 15 % neste kvartal, målt i NOK.»

**Strategi**

- *Lav målklarhet:* «Bli markedsleder.» Uklart hva markedsleder betyr; ingen tidsramme.
- *Høy målklarhet:* «Oppnå 30 % markedsandel i segment X innen 2027, målt av uavhengig markedsanalyse.»

**Kundedialog**

- *Lav målklarhet:* «Svar raskere på henvendelser.» Mangler indikatorer og referansepunkt.
- *Høy målklarhet:* «Besvare 90 % av kundehenvendelser innen 5 minutter i chatkanalen, målt over en måned.»

## 9. Kildekontroll

- **Primærkilder:** EU AI‑forordningen (artikler og annexer). Dette er bindende regulering som bør benyttes som primærreferanse for krav til tilsyn og transparens【300988383654951†L508-L570】.
- **Forskning:** EDPS TechDispatch og MIT Sloan gir faglige definisjoner og empiriske funn om forklarbarhet, verdikonflikter og menneskelige kapabiliteter【795378249545835†L124-L133】【747086488690856†L158-L176】.
- **Praktiske verktøy:** Teradata‑guiden gir praktiske modeller for måling, logging og feedback i AI‑beslutninger【162241366453357†L136-L160】. Microsofts rammeverk beskriver risikovurdering og tiltak mot overreliance【914332460050748†L345-L352】.
- **Svake kilder:** Blogginnlegg uten kildehenvisninger og kommersielle markedsføringsartikler uten faglig dybde bør ikke brukes videre. Disse er utelatt fra tabellen over.

## 10. Handoff til syntesetråd

1. Verifiser at de syv kriteriene dekker alle vesentlige aspekter av målklarhet; vurder om noen bør vektes tyngre enn andre.
2. Utforsk hvordan målklarhet samvirker med separabilitet og andre dimensjoner i kompasset.
3. Kalibrer skåringsgrensene basert på testdata og risikoklassifisering; vurder om flere nivåer er nødvendig.
4. Foreslå prosedyrer for å samle inn feedback fra brukere som svarer på app‑spørsmålene, slik at verktøyet kan forbedres over tid.
5. Undersøk hvordan verdikonflikt påvirker tolking av de andre kriteriene og om denne bør ha en separat stoppregel.
6. Standardiser ordlyden i skåringsspørsmålene for å sikre konsistent tolkning på tvers av domener.
7. Involver domeneeksperter (HR, offentlig sektor, SMB, strategi, kundeservice) i validering av kriterier og eksempler.
8. Planlegg hvordan målklarhet skal integreres med kontrollkravene (forklarbarhet, human oversight, anti‑overreliance) i den samlede KI‑beslutningsradaren.
