---
title: 04 datafangst anti-overreliance
date: 2026-05-12
status: draft
tags: [datafangst, anti-overreliance, dømmekraft]
category: ki-beslutningsradar
---

# Datafangst: Anti‑overreliance og dømmekraft

## 1. Kort sammendrag
Anti‑overreliance handler om å hindre at brukere blir passive, overavhengige eller mindre kritiske når de bruker KI i beslutninger. Forskning viser at *automation bias* får brukere til å bruke systemets output som en snarvei og ignorere egne bevis【361569855847357†L19-L41】, mens *overreliance* og *deskilling* kan gjøre at fagfolk mister selvstendige ferdigheter og ansvarsfølelse【996846817652274†L758-L808】【933984647852457†L808-L850】. *Cognitive offloading* reduserer mental belastning men kan erodere introspeksjon og motivasjon【379503545690175†L423-L500】, og tidlig bruk av KI kan skape *metakognitiv blindhet*【580479406827238†L640-L672】. Regulering og standarder (NIST, EDPS, EU AI Act) peker på behovet for klar rolle‑ og ansvarsfordeling, forklarbarhet, treningsopplegg med feilscenarioer og menneskelig verifikasjon【473527924217663†L2524-L2643】【904284204289120†L535-L624】【941069410522597†L493-L570】. Kontrollmekanismer som “think‑first”, egen forklaring, motargumenter, verifikasjon, synliggjøring av usikkerhet og beslutningseierskap skal sikre at mennesket fortsatt tar eierskap til beslutningen.

## 2. Operative definisjoner

- **Automation bias:** tendens til å bruke systemets output som en heuristisk erstatning for grundig informasjonsinnhenting, noe som gjør at brukere ignorerer motstridende data【406006066855504†L276-L285】.
- **Overreliance:** tillit til KI‑anbefalinger som gjør at brukere ikke utøver eget skjønn; kan føre til at de aksepterer forslag uten kritisk refleksjon【996846817652274†L758-L808】【933984647852457†L808-L850】.
- **Cognitive offloading:** å delegere mentale oppgaver til KI for å redusere kognitiv belastning; effektivt på kort sikt, men kan svekke introspeksjon og egenmotivasjon【379503545690175†L423-L500】.
- **Metakognitiv blindhet:** når brukere ikke vurderer egen forståelse fordi KI gir svar for tidlig; fører til at de ikke oppdager hva de ikke forstår【580479406827238†L640-L672】【455266357992400†L558-L567】.
- **Deskilling:** ferdigheter forvitrer når oppgaver gjentatte ganger overlates til KI, slik at brukeren mister evnen til å analysere kontekst og etikk【933984647852457†L808-L850】.
- **Verification loop:** prosess hvor brukeren aktivt kontrollerer AI‑output mot pålitelige kilder, data eller fagpersoner for å bekrefte riktighet og fairness【996846817652274†L758-L808】.
- **Think‑first:** krav om at brukeren formulerer mål, premisser og hypotese før KI tas i bruk, for å hindre at AI styrer tankeprosessen【580479406827238†L640-L672】.

## 3. Viktigste kilder

| Kilde | Utgiver/eier | År / sist oppdatert | Type | Hva kilden sier (kort) | Relevans for anti‑overreliance | Svakheter/forbehold | Lenke |
|---|---|---|---|---|---|---|---|
| **AI Safety and Automation Bias (CSET)** | Center for Security and Emerging Technology (USA) | 2024 | Analyse/rapport | Forklarer automation bias som bruk av automatisert output som heuristisk erstatning for egen informasjonsinnhenting, noe som kan føre til at brukere ignorerer motstridende bevis【361569855847357†L19-L41】. Anbefaler opplæring, design som viser systemfeil og organisatoriske regler for å redusere bias. | Gir klar definisjon av automation bias og praktiske tiltak for å motvirke overreliance. | Tenketanksrapport; ikke regulatorisk, begrenset empirisk underbygging. | 【361569855847357†L19-L41】 |
| **Cognitive Offloading and Coping (Frontiers in Psychology)** | Frontiers Media (peer‑reviewed) | 2025 | Fagfellevurdert artikkel | Definerer cognitive offloading som å delegere kognitiv belastning for å spare mental energi; advarer om at offloading kan “erode introspection” og føre til outsourcing av motstandskraft【379503545690175†L423-L500】. | Viser hvorfor brukere må balansere effektivitet mot opprettholdt kritisk tenkning; støtter tiltak som think‑first og usikkerhetsrefleksjon. | General teori; beskriver coping bredt, ikke spesifikt for beslutningsstøtte. | 【379503545690175†L423-L500】 |
| **Clinical decision support for ADHD** | Journal/helseforskningsartikkel | 2025 | Fagfellevurdert studie | Påpeker at AI‑genererte anbefalinger kan lede klinikere til å akseptere forslag uten refleksjon, svekke autonomi og gjøre det uklart hvem som har ansvar【996846817652274†L758-L808】. | Illustrerer overreliance og behov for verifikasjon og beslutningseierskap i kritiske domener. | Studie i spesifikk medisinsk kontekst; generaliserbarhet kan være begrenset. | 【996846817652274†L758-L808】 |
| **NIST AI Risk Management Framework (AI RMF 1.0)** | NIST (USA) | 2023 | Regulatorisk/standard | Fremhever behovet for å definere menneskelige roller og ansvar i AI‑systemer, utvikle prosesser for human oversight og samle data om hvor ofte brukere overstyrer AI for å justere design【473527924217663†L1776-L1785】【473527924217663†L2524-L2643】. | Gir konkrete kontrollkrav som støtte til think‑first, egen forklaring, verifikasjonslogg og læringssløyfe. | Mer fokusert på organisasjon og risiko enn på konkrete app‑spørsmål; generelle anbefalinger. | 【473527924217663†L2524-L2643】 |
| **TechDispatch: Human Oversight of Automated Decision‑making (EDPS)** | European Data Protection Supervisor | 2025 | Veiledning | Advarer om at menneskelig tilstedeværelse ikke i seg selv fjerner automatisering; radiologer ble mindre nøyaktige når AI‑forslag var feil【904284204289120†L535-L624】. Introducerer begrepet *quasi‑automation*, der mennesker bare godkjenner KI‑output【904284204289120†L649-L684】. | Fremhever behovet for kontrollmekanismer som motargumenter, verifikasjon og beslutningseierskap. | Fokus på personvern; mindre om operativ implementering. | 【904284204289120†L535-L684】 |
| **EU AI Act artikkel 14** | EU-lovgivning | vedtatt 2024 (i kraft 2026) | Lovtekst | Krever at høy‑risiko‑systemer utformes slik at mennesker forstår kapasiteter og begrensninger, kan oppdage anomalier, unngå overreliance (automation bias) og tolke, overstyre eller stoppe systemet【941069410522597†L493-L570】. Inneholder to‑person‑regel for visse identifikasjonssystemer. | Lovfestet grunnlag for kontrollmekanismer; understøtter verifikasjon, beslutningseierskap og stopregler. | Lovtekst kan være generelt formulert; detaljer overlates til implementering. | 【941069410522597†L493-L570】 |
| **Metacognitive laziness (University of Auckland)** | University of Auckland | 2025 | Kommentar/opinion | Beskriver at bruk av KI for tidlig gjør elever metakognitivt late; de offloader ikke bare kognitivt men også metakognitivt ansvar, noe som hindrer læring og idéutvikling【580479406827238†L640-L672】. | Understreker viktigheten av think‑first og at brukeren må formulere egen vurdering. | Ikke en forskningsartikkel; subjektiv men tydelig illustrasjon. | 【580479406827238†L640-L672】 |
| **AI‑enabled decision support in targeting (International Review of the Red Cross)** | International Committee of the Red Cross | 2025 | Fagfellevurdert artikkel | Advarer om at overreliance på AI‑rangeringer kan føre til *deskilling* av militære beslutningstakere; de kan miste evnen til å tolke kontekst og etikk【933984647852457†L808-L850】. | Viser at gjentatt bruk av KI uten kritisk vurdering svekker ferdigheter (skillstap) og ansvar. | Kontekst er militær; relevansen for sivile domener må vurderes. | 【933984647852457†L808-L850】 |

## 4. Kontrollmekanismer

| Kontrollmekanisme | Hva den betyr | Mulig app‑spørsmål (ja/delvis/nei eller 1–5) | Mulig stoppregel | Kilde |
|---|---|---|---|---|
| **Think‑first** | Brukeren må formulere problem, mål og egne antakelser før KI tas i bruk; skal motvirke metakognitiv blindhet. | “Har du formulert mål og premisser før du brukte KI?” | Stopp hvis brukeren ikke kan beskrive oppgaven uten å referere til KI. | Universitetet i Auckland beskriver metakognitiv lathet【580479406827238†L640-L672】. |
| **Egen forklaring** | Brukeren skal kunne forklare beslutningen med egne ord, uten å gjenta KI‑output. | “Kan du forklare beslutningen med egne ord uten å lese KI‑svaret?” | Stopp hvis brukeren bare gjenforteller KI‑tekst eller ikke kan forklare. | EDPS påpeker at mennesket må være reell beslutningstaker【904284204289120†L649-L684】. |
| **Motargumenter** | Brukeren vurderer sterke alternative tolkninger eller motargumenter for å hindre automatisk aksept av AI‑forslag. | “Har du identifisert minst ett plausibelt motargument eller alternativ?” | Stopp hvis ingen motargumenter er vurdert i en høy‑risiko situasjon. | CSET definerer automation bias som ukritisk bruk av systemoutput【361569855847357†L19-L41】. |
| **Verifikasjon** | Brukeren kontrollerer premisser og output mot kilder, data eller fagpersoner (verification loop). | “Har du verifisert de viktigste antakelsene mot uavhengige kilder eller eksperter?” | Stopp hvis ingen verifikasjon er gjort for kritiske beslutninger. | Klinisk beslutningsstøtte krever at fagpersoner verifiserer AI‑anbefalinger【996846817652274†L758-L808】. |
| **Usikkerhet** | Brukeren synliggjør usikkerheter, antakelser og mulige feil i sin analyse. | “Har du eksplisitt angitt antakelser og usikkerheter i vurderingen?” | Stopp hvis brukeren hevder at alt er sikkert uten å identifisere usikkerhet. | Frontiers advarer om at offloading kan erodere introspeksjon【379503545690175†L470-L500】. |
| **Automation bias** | Risiko for at brukeren stoler for mye på KI fordi svaret virker ryddig og autoritativt. | “Er det elementer i KI‑forslaget som får deg til å akseptere det uten kontroll?” | Krever manuell gjennomgang hvis beslutningen baseres på at KI‑svaret “virker rett”. | Automation bias er definert som bruk av systemoutput som heuristisk erstatning【406006066855504†L276-L285】. |
| **Cognitive offloading** | Risiko for at brukeren lar KI gjøre tenkingen, i stedet for å støtte egen tenking; reduserer metakognisjon. | “Hvilke deler av prosessen har du selv tenkt gjennom, og hvilke har du overlatt til KI?” | Stopp hvis brukeren ikke kan identifisere egne bidrag. | Frontiers beskriver at offloading kan erodere introspeksjon【379503545690175†L470-L500】. |
| **Skillstap** | Fare for at gjentatt KI‑bruk svekker faglige ferdigheter og skjønn. | “Vil gjentatt bruk av KI i denne oppgaven svekke ferdigheter du bør opprettholde?” | Hvis svaret er ja, kreves opplæring eller begrensning av KI‑bruk. | ICRC advarer om deskilling av beslutningstakere【933984647852457†L808-L850】. |
| **Beslutningseierskap** | Det må være tydelig hvem som tar ansvar for beslutningen og hvorfor. | “Hvem tar ansvar for denne beslutningen, og hvordan dokumenteres det?” | Stopp hvis ingen identifiserbar person eier beslutningen; krever utpeking. | EU AI Act krever at operatører kan tolke, overstyre og stoppe systemet【941069410522597†L493-L570】. |
| **Læringssløyfe** | Etter avgjørelsen må brukeren reflektere over hva som ble lært, usikkerheter og forbedringspunkter; data skal logges. | “Hva lærte du av prosessen, hvilke usikkerheter gjenstår, og hva må forbedres?” | Ikke en stoppregel, men prosessen anses ufullstendig uten etterrefleksjon. | NIST anbefaler å samle data om overstyringer og justere design【473527924217663†L2524-L2643】. |

## 5. Før KI / under KI / etter KI

### Før KI
- **Formuler problem og mål:** Brukeren må beskrive mål, kriterier og antakelser uten KI (think‑first).
- **Innhent grunnleggende data:** Samle relevante fakta og kilder før KI‑analyse.
- **Identifiser risiko og etiske hensyn:** Vurder potensielle konsekvenser, konfidensialitet, rettigheter eller lovkrav.
- **Definer ansvar:** Avklar hvem som har beslutningseierskap og hvem som verifiserer resultatet.【941069410522597†L493-L570】

### Under KI
- **Bruk KI til støtte, ikke avgjørelse:** La KI analysere data, generere alternativer og strukturere informasjon, men ikke fatte endelige beslutninger.
- **Forklaring og transparens:** KI bør presentere begrunnelser og begrensninger for output.
- **Avdekk avvik:** Systemet må varsle om usikre resultater eller når det opererer utenfor definerte rammer.
- **Registrer interaksjoner:** Loggfør hvilke forslag som ble gitt, hvilke som ble akseptert eller avvist, og hvorfor【473527924217663†L2524-L2643】.

### Etter KI
- **Verifikasjon:** Kontroller KI‑resultatet mot eksterne kilder eller fagpersoner; for høyrisikobeslutninger kan to‑person‑regel gjelde【941069410522597†L493-L570】.
- **Egen forklaring:** Brukeren skriver en kort begrunnelse med egne ord og dokumenterer motargumenter og usikkerheter.
- **Refleksjon (læringssløyfe):** Oppsummer hva som fungerte, hvilke feil som ble oppdaget og hva som kan forbedres; del læring i teamet.
- **Oppdater regler og modell:** Bruk innsikt fra verifikasjon og loggføring til å justere prosedyrer og KI‑parametere.

## 6. Forslag til app‑spørsmål (ja/delvis/nei eller skåre 1–5)

1. **Har du formulert mål og kriterier før du brukte KI?** (1–5: helt uenig–helt enig).
2. **Kan du beskrive problemet uten å referere til KI‑output?** (ja/delvis/nei).
3. **Hvilke hovedantakelser la du til grunn?** (liste/tekstfelt).
4. **Har du identifisert et plausibelt motargument eller alternativ?** (ja/delvis/nei).
5. **Har du verifisert sentrale premisser med pålitelige kilder eller eksperter?** (ja/delvis/nei).
6. **Er usikkerheter og begrensninger eksplisitt dokumentert?** (ja/delvis/nei).
7. **Føler du at KI‑outputet påvirker deg til å akseptere svaret uten kontroll?** (1–5: ikke i det hele tatt – svært mye).
8. **Hvilke deler av arbeidet utførte du selv, og hvilke delte du med KI?** (tekstfelt).
9. **Ser du fare for at dine ferdigheter svekkes ved gjentatt KI‑bruk her?** (ja/delvis/nei).
10. **Har du klarhet i hvem som tar endelig beslutning?** (ja/delvis/nei).
11. **Ble andre personer involvert for to‑person‑verifikasjon?** (ja/delvis/nei).
12. **Har du dokumentert hvorfor du valgte å følge eller avvise KI‑forslaget?** (ja/delvis/nei).
13. **Hvilket tillitsnivå har du til KI‑forslaget, og hvorfor?** (1–5).
14. **Hva lærte du av prosessen, og hva bør forbedres?** (tekstfelt).
15. **Er du komfortabel med å signere som ansvarlig for beslutningen?** (ja/delvis/nei).

## 7. Røde flagg og stoppregler

- **Ingen egen problemformulering:** Brukeren kan ikke forklare oppgaven uten å se på AI. *Stopp* og be brukeren definere mål og kriterier.
- **Blind aksept av KI‑output:** Brukeren baserer avgjørelsen på at svaret “virker riktig” uten å kontrollere kilder. *Stopp* for verifikasjon og alternative vurderinger【406006066855504†L276-L285】.
- **Manglende motargumenter:** Ingen alternative tolkninger er vurdert; tyder på automation bias. *Stopp* i risikofylte saker.
- **Ingen verifikasjon:** Ingen kilder eller eksperter er kontaktet i områder som krever faglig innsikt【996846817652274†L758-L808】. *Stopp* og hent ekstern validering.
- **Usikkerhetsbenektelse:** Brukeren mener det ikke finnes usikkerhet; signaliserer for sterk tillit til KI. *Stopp* og gjennomgå antakelser.
- **Uklart ansvar:** Ingen vil signere for beslutningen; tyder på at ansvaret outsources til KI. *Stopp* til en ansvarshaver er definert【941069410522597†L493-L570】.
- **Gjentatt reliance uten læringssløyfe:** Ingen refleksjon eller justering; risiko for deskilling. *Stopp* for etterrefleksjon og opplæring【933984647852457†L808-L850】.

## 8. Beslutningslogg

For å vise at mennesket faktisk har tenkt, vurdert og tatt ansvar, bør loggen inneholde:

- **Problemformulering og mål** skrevet av brukeren før KI‑bruk.
- **Kilder og data** som danner grunnlaget for analysen.
- **AI‑forslag** som ble generert og tidspunkt/versjon av modellen.
- **Brukerens egen forklaring** på beslutningen, inkludert motargumenter og alternativer vurdert.
- **Verifikasjon**: hvilke eksterne kilder eller eksperter ble brukt og resultater av denne kontrollen.
- **Usikkerheter og antakelser** som ble identifisert.
- **Beslutningseierskap**: navn på personen som tok ansvar, eventuelt med to‑person‑signatur.
- **Læringssløyfe**: hva brukeren lærte, hva som var usikkert og forbedringspunkter.
- **Avvik og overstyringer**: når og hvorfor AI‑output ble overstyrt【473527924217663†L2524-L2643】.

## 9. Kildekontroll

- **Primærkilder / regulatoriske standarder:** NIST AI RMF【473527924217663†L2524-L2643】, EU AI Act art 14【941069410522597†L493-L570】, EDPS TechDispatch【904284204289120†L535-L684】. Gir normative krav og definisjoner; bør brukes som grunnlag for kontrollmekanismer.
- **Forskning:** Frontiers‑artikkelen om cognitive offloading【379503545690175†L423-L500】, klinisk beslutningsstøtte【996846817652274†L758-L808】, ICRC‑artikkelen om deskilling【933984647852457†L808-L850】. Belyser effekter på menneskelig dømmekraft; gir empirisk støtte for tiltak.
- **Praktiske verktøy/tenketanker:** CSET‑rapporten om automation bias【361569855847357†L19-L41】. Gir forklaringer og forslag, men er ikke regulatorisk.
- **Svake kilder:** Universitetet i Auckland‑kommentaren om metakognitiv lathet【580479406827238†L640-L672】 er en meningstekst; kan illustrere konseptet men bør støttes av forskning.

## 10. Handoff til syntesetråd

1. **Integrere think‑first i prosessen:** Brukeren må formulere problem og mål før KI‑bruk, eventuelt gjennom tvungne tekstfelt i appen.
2. **Etablere verification loops:** Systemet må kreve at sentrale antakelser verifiseres mot kilder eller eksperter, særlig i høy‑risiko domener【996846817652274†L758-L808】.
3. **Loggføre beslutningsprosessen:** Lag en standardisert beslutningslogg med egen forklaring, motargumenter, usikkerheter, kildeverifikasjon og signatur.
4. **Implementere stoppregler og røde flagg:** Definer klare situasjoner der prosessen skal pausere for manuell vurdering (manglende problemformulering, ingen verifikasjon, uklart ansvar).
5. **Design for to‑person‑verifikasjon:** For høyrisikobeslutninger skal to personer verifisere før avgjørelsen implementeres【941069410522597†L493-L570】.
6. **Fasilitere læringssløyfe:** Systemet skal be om refleksjon etter hver beslutning og oppsummere læringspunkter for kontinuerlig forbedring【473527924217663†L2524-L2643】.
7. **Opplæring og bevisstgjøring:** Gjennomfør trening som inkluderer feilscenarier for å redusere automation bias og overreliance【406006066855504†L276-L285】.
8. **Tydeliggjøre roller og ansvar:** Sett opp matriser som viser hvem som gjør hva i beslutningsprosessen, basert på NIST og EU AI Act【941069410522597†L493-L570】.



## Arkivnotat

Denne filen er mottatt som ferdig datafangst i runde 1. Kildehenvisninger i brødteksten er chat-citation-markører. Bruk `sources/kildeoversikt.md` for stabile URL-er.
