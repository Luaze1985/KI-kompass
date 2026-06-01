---
title: data_capture supersedert
date: 2026-05-12
status: archive
tags: [archive, supersedert, anti-overreliance]
category: ki-beslutningsradar
---

# Supersedert arbeidsutkast

Denne filen er et tidligere arbeidsutkast for anti-overreliance. Hovedfilen er:

`04_anti_overreliance/04_datafangst_anti_overreliance.md`

---

# Datafangst: Anti-overreliance i KI‑beslutningsradaren – hovedfunn

## Definisjoner og fenomen

| Fenomen | Beskrivelse med kilder |
|---|---|
| **Automation bias** | Tendens til at brukere stoler for mye på automatiserte anbefalinger og bruker dem som en *heuristisk erstatning* for grundig informasjonsinnhenting og kontroll【406006066855504†L276-L285】. CSET beskriver automation bias som at mennesker overvurderer KI‑systemets evne og ignorerer motstridende bevis; biasen kan føre til at man ukritisk følger systemet og overser feil【361569855847357†L19-L41】. EDPS påpeker at radiologer som fikk KI‑forslag ble *mindre* treffsikre hvis KI‑forslaget var feil, fordi de ikke søkte egne bevis【904284204289120†L535-L624】. |
| **Overreliance (overavhengighet)** | Sterk tillit til KI eller digitale beslutningsstøttesystemer slik at mennesker slutter å ta egne vurderinger. Kliniske beslutningsstøttesystemer viser at leger kan akseptere genererte anbefalinger uten kritisk refleksjon, noe som svekker autonomi og ferdigheter【996846817652274†L758-L808】. I militær målutvelgelse advarer Røde Kors om at overdrevent behov for «høyere tempo» og blind tillit til maskinell rangering kan føre til *deskilling* – mennesker stoler blindt på systemet og mister evnen til å vurdere kontekst og etikk【933984647852457†L808-L850】. |
| **Cognitive offloading (kognitiv avlastning)** | Å outsource mentale oppgaver til eksterne verktøy. Frontiers‑artikkelen beskriver offloading som å bruke KI til å redusere mental belastning, spare energi og unngå beslutningstretthet【379503545690175†L423-L468】. Offloading gir effektivitet men innebærer risiko for «erosion of introspection» og at brukere outsourcer motstandskraft og kritisk vurdering【379503545690175†L470-L500】. |
| **Metakognitiv blindhet (metacognitive laziness)** | Personer bruker KI‑verktøy så tidlig at de ikke utøver egen metakognisjon – de tenker ikke over hva de egentlig forstår eller hva de ikke forstår. Universitetet i Auckland advarer mot «metacognitive laziness»: ved å la KI levere ideer før man selv har tenkt, avlastes både kognitive *og* metakognitive prosesser; det hindrer læring og evne til å brainstorme eller løse problemer【580479406827238†L640-L672】. Frontiers education beskriver «inhibited metacognitive monitoring»: når AI gir løsninger før brukeren har forklart sin forståelse, svekkes selv‑evaluering og kalibrering【455266357992400†L558-L567】. |
| **Når svekkes menneskelig dømmekraft?** | Dømmekraften svekkes når systemet oppfattes som svært pålitelig, når arbeidsbelastningen er høy, eller når det er lite tid/ressurser til å kontrollere output. EDPS viser at selv med en menneske «i sløyfen» kan resultatet i praksis bli automatisert fordi brukeren bare rubber‑stamper KI‑forslaget【904284204289120†L649-L684】. NIST peker på at uklare roller og mangel på verktøy som hjelper mennesker å utfordre systemet gjør at de ikke klarer å identifisere feil【473527924217663†L2524-L2643】. Frontiers offloading beskriver at overbruk av KI kan føre til outsourcing av motstandskraft og dermed redusert evne til selvregulering og beslutning【379503545690175†L470-L500】. |

## Arbeidsregler og tiltak for å motvirke passiv KI‑bruk

| Tiltak/regel | Begrunnelse og kilder |
|---|---|
| **Tydeliggjør roller og ansvar** | NIST AI RMF anbefaler å definere menneskelige roller, ansvar og kompetansekrav for AI‑systemer samt prosesser for human oversight【473527924217663†L1776-L1785】. Klare roller motvirker at brukeren antar at «systemet gjør jobben». |
| **Trening på feil og begrensninger** | NIST og CSET foreslår opplæring som viser både riktige og feilaktige KI‑anbefalinger. Trening som konfronterer brukere med feil øker bevisstheten om feil og forbedrer sensitivitet【406006066855504†L933-L955】. |
| **Design for å utfordre** | NIST anbefaler at systemer registrerer hvor ofte brukere overstyrer AI og hvorfor, slik at design kan justeres for å støtte mennesker i å utfordre output【473527924217663†L2524-L2643】. EDPS sier at verktøy bør bevisst stimulere kritisk tenkning og advare brukere om at de ikke skal ukritisk akseptere anbefalingene【904284204289120†L535-L624】. |
| **Transparente begrunnelser og forklarbarhet** | Overreliance reduseres når systemet forklarer sine begrunnelser. EU AI Act art 14 krever at høy‑risiko‑systemer gir forståelig informasjon om kapasitet, begrensninger, og at operatøren kan tolke og kontrollere output【941069410522597†L493-L570】. |
| **Tidlig egenanalyse (“think first”) før AI** | Universitetet i Auckland anbefaler at brukere skriver ut sine ideer eller analyse før de konsulterer KI for å unngå metakognitiv lathet【580479406827238†L640-L672】. Frontiers education foreslår å la AI fungere som «speil» som bare vurderer brukerens forklaring, i stedet for å levere svar; dette tvinger brukeren til å forklare og dermed opprettholder metakognitiv kontroll【455266357992400†L558-L617】. |
| **Obligatorisk verifikasjon** | Kliniske beslutningssystemer understreker behovet for at fagpersoner vurderer og dokumenterer hvorfor de følger eller avviker fra KI‑anbefalingen【996846817652274†L758-L808】. Røde Kors påpeker at militære operatører må verifisere rangeringer med egen juridisk og etisk vurdering【933984647852457†L808-L850】. |
| **Loggføring av menneskelig vurdering** | NIST fremhever behov for å samle data om hvor ofte mennesker overprøver AI og begrunnelsene deres【473527924217663†L2524-L2643】. Dette gir innsikt i om operatørene faktisk tar selvstendige beslutninger og kan fungere som revisjonsspor for etterlevelse av EU AI‑krav【941069410522597†L493-L570】. |
| **Design for human fallback (two‑person rule)** | EU AI Act krever at enkelte identifikasjonssystemer får beslutningen verifisert av minst to personer【941069410522597†L493-L570】. Dette gir en ekstra barriere mot at én person ukritisk følger KI‑output. |

## Mulige app‑spørsmål (maks 15)

1. **Hva er problemstillingen eller målet ditt uten å se på KI‑forslaget?** (tvinger til å formulere selvstendig mål).
2. **Hvilke faktorer mener du er viktigst for denne beslutningen?** (får frem brukerens egne kriterier).
3. **Hvordan vil du begrunne en beslutning hvis KI var utilgjengelig?** (stimulerer metakognitiv refleksjon).
4. **Beskriv potensielle risikoer ved å følge KI‑forslaget uendret.** (gjør brukeren bevisst på feil og begrensninger【361569855847357†L19-L41】).
5. **Hvilke alternativer har du vurdert, og hvorfor?** (reduserer automation bias).
6. **Har du verifisert opplysningene fra andre kilder? Hvilke?** (skaper verifikasjonsloop【996846817652274†L758-L808】).
7. **Hva er KI‑modellens begrensninger i denne konteksten?** (oppfyller EU AI‑Act‑kravet om forståelse av kapasitet og begrensninger【941069410522597†L493-L570】).
8. **Hvilke konsekvenser kan en feilaktig beslutning ha?** (øker sensitivitet for risiko).
9. **Hvordan vil du oppdage at KI‑anbefalingen er feil?** (stimulerer til aktive kontrollmekanismer).
10. **Har du fått tilsvarende anbefalinger fra andre eksperter?** (sikrer menneskelig innspill).
11. **Kan bias eller etiske hensyn påvirke denne avgjørelsen?** (minimerer fairness‑problemer).
12. **Hvorfor valgte du å følge/ikke følge KI‑forslaget?** (skal loggføres for revisjon【473527924217663†L2524-L2643】).
13. **Hvordan ville du forklart beslutningen til en kollega?** (øker ansvarsfølelse).
14. **Hvilket nivå av tillit har du til KI‑forslaget, og hvorfor?** (avdekker over/undertillit【406006066855504†L276-L285】).
15. **Behøver denne beslutningen en ekstra gjennomgang av en annen person?** (implementerer to‑person‑regel【941069410522597†L493-L570】).

## Handoff‑punkter (maks 8)

1. **Utilstrekkelig input/kontekst** – hvis brukeren ikke kan forklare problemet eller kriteriene, skal prosessen stoppe og beslutningen overtas av en menneskelig ekspert.
2. **Høy risiko for liv, helse eller grunnleggende rettigheter** – for slike områder (medisinske diagnoser, rettslig bedømmelse, militære mål) må anbefalinger alltid vurderes av relevante fagpersoner og/eller to‑person‑regel【941069410522597†L493-L570】【933984647852457†L808-L850】.
3. **Konflikt mellom KI‑output og dokumentert regelverk/etiske prinsipper** – menneske må overstyre.
4. **KI‑output viser lav sikkerhet eller usikker datagrunnlag** – overlat til eksperter.
5. **Manglende enighet mellom KI og andre ekspertkilder** – krever manuelt skjønn og verifikasjon【996846817652274†L758-L808】.
6. **Uidentifiserte bias eller diskriminering i data** – pause beslutningen og involver etisk rådgiver【904284204289120†L535-L624】.
7. **Vedlikeholdsfeil eller signaler om at modellen presterer dårlig** – brukeren skal stoppe prosessen og rapportere til ansvarlig avdeling【473527924217663†L2524-L2643】.
8. **Alle tilfeller der konsekvensene er irreversible eller påvirker tredjepart betydelig** – krever full manuell beslutning og dokumentert begrunnelse.

## Notater

- Kilder er begrenset til åtte. Valgte kilder representerer regulatoriske tekster (NIST AI RMF【473527924217663†L2524-L2643】, EU AI Act【941069410522597†L493-L570】, EDPS TechDispatch【904284204289120†L535-L624】), fagfellevurderte forskningsartikler om cognitive offloading【379503545690175†L423-L500】, klinisk beslutningsstøtte【996846817652274†L758-L808】 og militær kontekst【933984647852457†L808-L850】, samt CSET‑rapporten om automation bias【361569855847357†L19-L41】 og populærvitenskapelige vurderinger av metakognitiv blindhet【580479406827238†L640-L672】.
- Tabellen og listene gir en «rådata‑fangst» som skal brukes for videre modellering; de er ikke en ferdig modell eller anbefaling.
