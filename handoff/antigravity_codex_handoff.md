---
title: Codex Handoff - Arkitekturvurdering, GMM og neste fase for Steg 3
date: 2026-05-23
status: superseded_by_context_correction
tags: [handoff, codex, arkitekturdom, steg-3, makkersjekk, gmm, trafikklys]
category: Handoff
---

# Codex Handoff: Arkitekturvurdering, GMM og neste fase for Steg 3

## Kontekstkorreksjon 2026-05-23

Dette handoff-dokumentet er overstyrt som produktretning. Det kan brukes som teknisk historikk for arbeid som ble foreslått rundt Steg 3, trafikklys og makkersjekk, men det overvekter compliance-score, revisjonssikker låsing og appmekanikk.

Kanonisk forståelse er nå at HR Strategiradar er et arbeidsverktøy og en øvingsarena for reelle prosjektvurderinger i en fasilitert prosjektgruppe. Trafikklys, samsvarsgrad og makkersjekk er støtte for prioritering og etterspor, ikke juridisk fasit, revisjonssertifikat eller erstatning for human-in-the-loop.

Les `CONTEXT.md`, `CLAUDE.md` og `state/context/current_context.md` før dette dokumentet brukes videre.

Dette dokumentet gir en formell **Codex Handoff** basert på prosjektets globale *Subagent Review Principles* (Global Antigravity Rules). Det sikrer at neste agent (Codex) får et fullstendig og strukturert utgangspunkt for å bygge ut **Steg 3: Internkontroll** og **Sidemannskontroll (Makker-sjekk)** i neste tråd.

---

## ⚖️ Arkitektonisk Vurdering (Architecture Judgement)

```yaml
architecture_judgement:
  decision: continue
  short_reason: "Historisk vurdering fra Antigravity. Må leses mot faktisk teststatus og dagens produktkontekst før videre bruk."
  must_fix_before_codex:
    - "Kontroller faktisk test-, build- og lintstatus før videre implementering."
  allowed_to_wait:
    - "Fullverdig grafisk utforming av Steg 3 Internkontroll-grensesnittet (dette er scope for neste sprint)."
  recommended_codex_instruction: "Implementer Steg 3 for internkontroll og tiltak basert på SUT-trafikklys, og etabler Sidemannskontroll (Makker-sjekk) som låser saksnotatet."
```

```yaml
target_project: "KI-beslutningsradar"
target_repo: "hr-strategiradar"
review_scope: "Integrasjon av kompass og trafikklys på felles UI, 3 beregningsmodeller (GMM), trippelsjekk samsvarsindeks og emoji-fri sanering"
current_plan: "Historisk plan for integrasjon av kompass, trafikklys, beregningsmodeller og samsvarsgrad som intern varselindikator. Ikke bruk som produktretning uten kontekstkorreksjonen over."
allowed_files:
  - "apps/hr-strategiradar/src/components/Dashboard/CompassView.tsx"
  - "apps/hr-strategiradar/src/services/mockDiagnosisService.ts"
  - "apps/hr-strategiradar/src/store/store.ts"
  - "apps/hr-strategiradar/src/components/Dashboard/SidebarSelector.tsx"
  - "apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx"
  - "apps/hr-strategiradar/src/domain/schemas.ts"
  - "apps/hr-strategiradar/src/services/__tests__/mockDiagnosisService.test.ts"
forbidden_files:
  - "archive/**/*"
done_when:
  - "Kompasset har en tynn solid farget ramme (grønn/gul/rød) basert på trafikklys live."
  - "Tannhjul-ikon (SVG) toggler et skjult beregningsmodell-panel under kompasset."
  - "Modellene GMM (med polariseringsstraff), lineær og konservativ er live og endrer prikkens posisjon og tillatt rolle."
  - "Stoppregler er skjult bak en ren tekstlenke og utvides kun ved klikk."
  - "Samsvarsindeks (I_C) regnes ut fra 12 standard-indikatorer og trigger trafikklys."
  - "Alle emojier er fjernet fra brukergrensesnitt, saksnotater, autofyll og service-lag."
  - "Alle 83 enhetstester kjører grønt og prosjektet bygger feilfritt."
```

---

## 🛠️ Hva ble implementert i denne sprinten?

1.  **Felles UI i CompassView (`CompassView.tsx`):**
    *   Sikkerhetskompasset og Trafikklyset er samlet på samme kort.
    *   En tynn, solid, farget rammelinje (grønn/gul/rød) reflekterer trafikklysstatusen direkte rundt kompasset.
    *   En diskret, emoji-fri tannhjulsknapp (SVG) toggler valget av beregningsmodell. Valgpanelet er skjult som standard.
    *   Stoppregler er skjult bak en ren tekst-lenke (`Vis X stoppregler`) som utvides ved klikk.
2.  **De tre beregningsmodellene (`mockDiagnosisService.ts`):**
    *   **GMM (Geometrisk Standard - default):** Ikke-kompensatorisk formel med polariseringsstraff: $K_{score} = \sqrt{M \times S} \times \left(1 - \frac{|M - S|}{10}\right)$. Justerer også kompass-prikken live mot origin ved polarisering.
    *   **Kompensatorisk (Lineær 45/55):** Aritmetisk vekting.
    *   **Konservativ (Svakeste ledd):** Låser score og posisjon til minimumsaksen ($\min(M, S)$).
3.  **Trippelsjekk-indeks ($I_C$) og Trafikklys:**
    *   Matematisk samsvarsindeks (0–100%) basert på 12 Digdir-, Datatilsynet- og Norsk Standard (ISO 31000 / 42001)-indikatorer.
    *   Kritiske Stoppregler (SR-K) trigger automatisk **🔴 RØD** status (inkluderer `SR-01` Menneskelig kontroll, `SR-08` Personvern, og `SR-05` Manglende saksnotat).
4.  **Fullstendig Emoji-Sanering:**
    *   Fjernet emojier fra knapper, etiketter og statuser i [DecisionLog.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx) og [SidebarSelector.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/SidebarSelector.tsx).
    *   Autofyll og system-generert tekst i [store.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/store/store.ts) og [mockDiagnosisService.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/services/mockDiagnosisService.ts) er helt emoji-frie.
5.  **Verifisering:**
    *   Lagt til enhetstest i `mockDiagnosisService.test.ts` for modellvalgene.
    *   Alle 83 tester kjører grønt.
    *   Vite bygger produksjons-dist-mappen feilfritt.

---

## 🎯 Scope for neste sprint (Codex-oppdrag)

I den opprinnelige planen skulle Codex bygge videre fra beregnings- og vurderingsradaren til en arbeidsflate for internkontrollstøtte, ROS-tiltak og etterspor ved å implementere **Steg 3** og **Sidemannskontroll**:

### Oppgave 1: Implementer Steg 3 for Internkontroll og Tiltak
1.  **Visuelt Skjema i DecisionLog:**
    *   Under saksnotatet, etabler en ny seksjon for **Steg 3: Internkontroll og Risikoreduserende Tiltak**.
    *   Vis samsvarsindeksen ($I_C$) (f.eks. `Samsvarsgrad: 78%`) og det gjeldende trafikklyset (Grønn, Gul, Rød) med en kort forklaring.
2.  **Pre-fill / Autofyll av Tiltak basert på Trafikklys og Stoppregler:**
    *   Når brukeren trykker på "Autofyll", skal Steg 3-feltene fylles ut med standardiserte tiltak tilpasset risikoen:
        *   *Hvis Rød:* Absolutt krav om lukket DPA-miljø, obligatorisk DPIA og bias-testing før utrulling.
        *   *Hvis Gul:* Krav om ukentlig stikkprøvekontroll av 20% av utdataene, samt HMS-gjennomgang.
        *   *Hvis Grønn:* Forenklet standard livssyklus-ROS hver 12. måned.

### Oppgave 2: Implementer Sidemannskontroll (Makker-sjekk) med Låsing
1.  **Signering for Makker:**
    *   Legg til et felt nederst i saksnotatet: `Verifisert av makker (Navn)` og en checkbox `Bekreft og lås vurdering`.
    *   Checkboxen skal kun være aktiv dersom den primære godkjenningen ("Godkjenn saksnotat") allerede er utført av saksbehandler.
2.  **Prototype-lås (Maker-Checker / 4-Eyes Principle):**
    *   Når makkersjekk-checkboxen hukkes av, settes `isMakerChecked: true` i Zustand-storen.
    *   **Dette skal koble ut alle redigeringsmuligheter:**
        *   Alle 3 tekstfeltene i saksnotatet blir `readOnly` eller `disabled`.
        *   Alle toggle-knapper for sjekkpunkter og verdivurderinger blir `disabled`.
        *   Modellvelgeren (tannhjulet) og dropdown blir `disabled` og kan ikke endres.
        *   Dette gjør vurderingen skrivebeskyttet i lokal prototypeøkt. Det er ikke et varig revisjonsarkiv.

---

## 📖 Korrigert leserekkefølge for Codex

1.  Kanonisk domenespråk: [CONTEXT.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/CONTEXT.md).
2.  Gjeldende system-veileder: [CLAUDE.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/CLAUDE.md) og [AGENTS.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/AGENTS.md).
3.  Nåværende status: [current_context.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/state/context/current_context.md).
4.  Agentregler for domene: [domain.md](file:///c:/Users/larse/Documents/ki-beslutningsradar/docs/agents/domain.md).
5.  Denne handoff-filen kan deretter leses som teknisk historikk, ikke som produktretning.
6.  Kildekoden til [CompassView.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/CompassView.tsx), [store.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/store/store.ts), [DecisionLog.tsx](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx) og [mockDiagnosisService.ts](file:///c:/Users/larse/Documents/ki-beslutningsradar/apps/hr-strategiradar/src/services/mockDiagnosisService.ts).
