---
title: Handoff og Kanban for neste byggefase - Internkontroll og Makkersjekk
date: 2026-05-23
status: superseded_by_context_correction
tags: [handoff, kanban, internkontroll, makkersjekk, steg-3, gmm, trafikklys]
category: Handoff
---

# Handoff og Kanban for neste byggefase: Steg 3 – Internkontroll og Makkersjekk

## Kontekstkorreksjon 2026-05-23

Dette handoff-dokumentet er overstyrt som produktretning. Det kan brukes som teknisk historikk for UI-, beregnings- og Steg 3-arbeid, men det overvekter compliance-score, revisjonssikker låsing og appmekanikk.

Kanonisk forståelse er nå at HR Strategiradar er et arbeidsverktøy og en øvingsarena for reelle prosjektvurderinger i en fasilitert prosjektgruppe. Prosjektgruppen skal kunne sjekke en konkret KI-bruksoppgave mot radaren, arbeide gjennom ROS-punkter, dokumentere lokal verifikasjon og bevare human-in-the-loop. Trafikklys, samsvarsgrad og makkersjekk er støtte for prioritering og etterspor, ikke juridisk fasit, revisjonssertifikat eller erstatning for menneskelig skjønn.

Les `CONTEXT.md`, `CLAUDE.md` og `state/context/current_context.md` før dette dokumentet brukes videre.

Dette dokumentet oppsummerer arbeidet som er fullført i denne tråden, og etablerer et strukturert handoff-grunnlag med et **Kanban-brett** for neste agent. Formålet er å starte den neste tråden med full arkitektonisk og forretningsmessig kontinuitet, spesielt rettet mot å bygge ut **Steg 3 (Internkontroll, risikovurdering av tiltak og sidemannskontroll)**.

---

## 📋 Kanban-brett for KI-Beslutningsradaren

### 🟢 UTFØRT (Done)
- **Felles UI i CompassView:** Samlet Sikkerhetskompasset og Trafikklyset i én visuell og funksjonell enhet ([CompassView.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/CompassView.tsx)) med en tynn, solid, farget rammelinje (grønn/gul/rød) basert på risiko.
- **Tre beregningsmodeller:** Implementert live veksling mellom tre kalkulasjonsmodeller i [mockDiagnosisService.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/services/mockDiagnosisService.ts):
  * **GMM (Geometrisk Standard - default):** Ikke-kompensatorisk formel med polariseringsstraff: $K_{score} = \sqrt{M \times S} \times \left(1 - \frac{|M - S|}{10}\right)$. Korrigerer også kompass-prikken live mot origin ved ubalanse.
  * **Kompensatorisk (Lineær 45/55):** Baseline-modell for sammenligning.
  * **Konservativ:** Låser scoren til den svakeste aksen ($\min(M, S)$).
- **Diskret Modellvelger:** Tannhjul-knapp (ren SVG uten emoji) øverst til høyre på kompasskortet toggler et skjult valgpanel.
- **Kollapsbare Stoppregler:** Eventuelle utløste stoppregler (`SR-01` til `SR-08`) vises kun når brukeren utvider en ren tekstlenke.
- **Trippelsjekk-indeks ($I_C$):** Implementert en matematisk samsvarsindeks (0–100%) basert på 12 Digdir-, Datatilsynet- og ISO-indikatorer.
- **Emoji-opprydding:** Renset absolutt alle emojier fra knapper, etiketter, statuser, store-actions og service-generert tekst (Autofyll) for et stramt og profesjonelt design.
- **Enhetstester:** Utvidet `mockDiagnosisService.test.ts` med tester for alle tre beregningsmodeller. Alle 83 enhetstester passerer grønt!
- **Byggeprosess:** Verifisert at hele prosjektet bygger feilfritt for produksjon.

### 🟡 UNDER ARBEID (In Progress)
- **Tråd-skifte:** Lukke gjeldende tråd, lagre denne handoff-filen og klargjøre kontekst for neste tråd.

### 🔴 NESTE SPRINT (Backlog - Steg 3 & Internkontroll)
- **Steg 3: Internkontroll og Risikovurdering av Tiltak:**
  * Bygge et eget panel/skjema for **Steg 3** under saksnotatet som integrerer trafikklysstatusen (grønn/gul/rød).
  * Tilrettelegge dokumentasjon for ettersyn, internkontrollstøtte og lokal ROS-oppfølging i prototype.
  * **Ferdig pre-fill for Steg 3:** Automatisk generering av standardiserte risikoreduserende tiltak basert på utløste stoppregler (f.eks. ved `SR-08` foreslås automatisk DPA/DPIA-oppfølging, ved `SR-01` foreslås Human-in-the-loop-kontrollmønster).
- **Sidemannskontroll (Makker-sjekk / "4-eyes principle"):**
  * Etablere et "sidemanns-signaturnivå" i [store.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/store/store.ts) og [DecisionLog.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx).
  * Muliggjøre at en kollega/makker (sidemann) logger på eller signerer saksnotatet i siste instans.
  * Når makker-sjekken er krysset av, **låses** saksnotatet fullstendig for endringer for å sikre dokumentintegritet.

---

## 🔍 Gjennomgang av våre iterasjoner

I løpet av denne tråden har vi jobbet målrettet for å gjøre applikasjonen robust, matematisk forsvarlig og estetisk premium:
1. **Forenkling:** Vi startet med å redusere saksnotatet til 3 kjernefelt, slette unødvendige drawers, chatpaneler og walls-of-text, og la alt flyte minimalistisk på én side.
2. **Research på standarder:** Vi kjørte subagenter som samlet krav fra Digdir, Datatilsynet og Norsk Standard (ISO 31000 og ISO/IEC 42001). Dette ble levert i rapporten [ki_risikovurdering_forslag.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/research/ki_risikovurdering_forslag.md).
3. **Koding:** Vi tok steget fra research til faktisk implementering! Vi endret Zod-skjemaer, Zustand-store, beregningsmotor og Compass-grensesnittet. Trafikklyset og kompasset snakker nå sammen live.
4. **Emoji-avvenning:** Vi renset alle "billige" emojier og erstattet dem med ren, stram tekst og profesjonelle SVG-symboler for å heve omdømmet og troverdigheten til verktøyet.

---

## 🚀 Plan for neste byggefase: Steg 3, Internkontroll og Makkersjekk

For neste agent foreslår vi følgende konkrete implementeringsmønster for å fullføre Steg 3:

### 1. Utvidelse av Datamodell og Zustand Store
Vi må utvide Zustand store i `store.ts` med:
- `isMakerChecked: boolean` (Angir om sidemannskontroll er fullført)
- `makerName: string` (Navn på makkeren som signerer)
- `setMakerCheck: (checked: boolean, name: string) => void` (Handling for å utføre makker-sjekk)
- Steg 3-interne strukturer for risikoreduserende tiltak.

### 2. Autofyll og Pre-fill av Internkontroll (Steg 3)
Når brukeren klikker på "Autofyll" eller går til Steg 3, skal beregningsmotoren i `mockDiagnosisService.ts` generere ferdige, standardiserte formuleringer for internkontroll og tiltak basert på det aktive trafikklyset og stoppreglene:
- **Hvis Rød:** Tiltakene må være absolutte og restriktive (f.eks. "Systemet må flyttes til lukket instans under signert DPA før videre testing. Løpende bias-testing må etableres.").
- **Hvis Gul:** Tiltakene fokuserer på betinget godkjenning (f.eks. "Menneskelig stikkprøvekontroll av 20% av utdataene utføres ukentlig. Loggføring av avvik etableres.").
- **Hvis Grønn:** Tiltakene er forenklet (f.eks. "Standard livssyklus-risikovurdering utføres hver 12. måned.").

### 3. Sidemannskontroll-grensesnitt (Makker-sjekk)
Nederst i [DecisionLog.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx), under godkjenning av saksnotat, legger vi inn en ny seksjon for **Sidemannskontroll (Makker-sjekk)**:
- Vises kun dersom primær saksbehandler allerede har godkjent/signert dokumentet.
- Inneholder et tekstfelt for makkerens navn ("Verifisert av makker (navn)") og en checkbox "Bekreft og lås vurdering".
- **Låsingslogikk:** Når makkersjekk-checkboxen er huket av, settes alle tekstområder (Risikovurdering, Menneskelig Kontroll, Endelig Beslutning), sjekkpunkter og justeringsknapper til `disabled`. Modellvelgeren fryses også. Dette gjør vurderingen skrivebeskyttet i lokal prototypeøkt, men er ikke et varig revisjonsarkiv.

---

## 💡 Instruksjoner for neste tråd

Når du starter en ny tråd:
1. Les først [CONTEXT.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/CONTEXT.md), [CLAUDE.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/CLAUDE.md), [current_context.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/state/context/current_context.md) og [domain.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/docs/agents/domain.md).
2. Les dette dokumentet ([antigravity_sprint_2_handoff.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/handoff/antigravity_sprint_2_handoff.md)) kun som teknisk historikk, ikke for å låse produktretning.
3. Sjekk kildekoden til [CompassView.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/CompassView.tsx), [store.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/store/store.ts), [DecisionLog.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx) og [mockDiagnosisService.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/services/mockDiagnosisService.ts).
4. Hvis Steg 3 eller makkersjekk videreutvikles, bruk det som støtte for ROS-arbeid, lokal verifikasjon og etterspor, ikke som revisjonssertifikat eller erstatning for human-in-the-loop.
5. Verifiser alt med relevante tester før status oppdateres.
