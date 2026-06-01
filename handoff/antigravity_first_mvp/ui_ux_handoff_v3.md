---
title: "UI/UX Handoff v3 — HR Strategiradar (Forberedelse Backend)"
date: 2026-05-17
status: aktiv
tags: [ui, ux, handoff, backend-prep, mvp]
category: handoff
---

# UI/UX Handoff v3: Klargjøring for Backend og Multi-Agent

Denne handoffen oppsummerer de siste store UI/UX-endringene før verktøyet overleveres til backend for sammenslåing med multi-agent logikk.

Vi har nå bygget en svært dynamisk, visuell og taktil "shell" (front-end) som er klar til å fôres med ekte agent-data.

## 1. Totalt farvel til "Stoppregler" (SR-koder)
- **Problem:** Brukeren forsto ikke "stopp-problemet 0203" (koder som SR-02, SR-03).
- **Løsning:** All referanse til "Stoppregler" og SR-koder er fjernet fra det visuelle grensesnittet.
- **Nytt konsept:** Det kalles nå **"Veiledning"** eller **"Tiltak"**. Hver veiledning består av en emojii og en setning skrevet i rent hverdagsspråk (f.eks. "Logg hva du besluttet og hvorfor").
- **Backend-krav:** LLM/Agenten skal ikke returnere tekniske koder til brukergrensesnittet. Den må returnere ferdig tygde, handlingsorienterte råd.

## 2. Dynamisk og Trykkbar Informasjonsflyt (Steg 2)
- Brukeren forventer "progressive disclosure" (å få mer info når de trykker på noe).
- **Sjekkpunkter i Steg 2:** Hvert spørsmål/avklaringspunkt er nå utvidbart (klikkbart). Når brukeren trykker på et punkt, utvides det nedover med handlingsknapper:
  - "Ja, det gjelder"
  - "Nei, ikke aktuelt"
  - "Trenger mer info"
- **Backend-krav:** Å trykke på disse valgene skal i fremtiden trigge et agent-kall som justerer kompassverdier i sanntid.

## 3. Kompasset som interaktivt "Senter" (Steg 3)
- Prikken foreslår nå bare hvor saken lander, basert på innledende case-valg (eller fremtidig RAG-input).
- **Trykkbare soner:** Alle de 4 firkantene (kvadrantene) er store, klikkbare områder.
- **Konsekvens av klikk:**
  1. Prikken flytter seg ("snapper") konkret til det valgte feltet.
  2. Et **nytt dashboard åpenbarer seg** (i høyre sidepanel).
- **Dashboardet inneholder:**
  - Hva rollen/feltet betyr i praksis.
  - Informasjon om hvordan man går frem for å ordne det.
  - Knapper for handling: "Opprett handlingsplan", "Koble på agent".
- **Backend-krav:** Agenten må levere innholdet til dette dashboardet dynamisk basert på (a) sakens kontekst og (b) hvilken firkant brukeren aktivt har valgt.

## 4. RAG-Chat som Dynamisk Justering
- Chat-boblen nede til høyre er knyttet direkte til kompasset.
- **Mock-LLM:** Hvis brukeren chatter "jeg vil ha mer manuell kontroll", forstår mock-logikken dette, gir et svar, og *justerer prikken i kompasset dynamisk*.
- **Backend-krav:** Den ekte LLM-en må kunne returnere strukturerte JSON-instrukser ved siden av tekst (f.eks. `{ adjustCompass: { dx: -0.2, dy: -0.1 } }`) for å kunne flytte UI-prikken basert på samtalen.

## 5. Oppsummering: Hva mangler for å fullføre sirkelen?
Alt i front-end er nå trykkbart, visuelt, neo-brutalistisk stort og responsivt.
Backend (Neste oppgave):
1. Bytt ut `mockDiagnosisService.ts` med ekte API-kall.
2. Bygg agentene som kan fylle høyre-panelets Dashboard (når kompass-sone klikkes) med *ekte, saks-spesifikke handlingsplaner*.
3. Implementer RAG i chatten så den faktisk forstår lovverket i kommunen og kan justere kompasset reelt.
