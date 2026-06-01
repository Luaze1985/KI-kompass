---
title: "KI-kompass alignment og verifisering"
date: 2026-06-01
status: completed
tags: [architecture, adr, ki-kompasset, verifisering]
category: architecture
---

# Arkitekturnotat: Samkjøring med Berge & Knudsens KI-kompass

Dette dokumentet utgjør den uforanderlige verifiseringsloggen og arkitektursporet ("run trail") for samkjøringen av kildekoden, testene og brukergrensesnittet med det oppdaterte, formelle rammeverket til **Berge & Knudsen (KI-kompasset)**.

---

## 🏛️ Kontekst og Bakgrunn

Vi mottok en oppdatert MD-kildepakke (`ki_kompasset_komprimert_md.zip`) som representerer den primære og kanoniske forståelsen av KI-kompass-rammeverket. En grundig revisjon av repoet avdekket at den eksisterende implementeringen i `apps/hr-strategiradar/` brukte en uoffisiell rolle (`delautomatisering`), manglet den kritiske offisielle rollen **`strategisk_autonomi` (Kvadrant IV)**, og brukte en unødig sammensatt terskelbasert beregning for å anslå anbefalt KI-rolle.

For å sikre at forfatterne av rammeverket (Berge & Knudsen) og eksterne evaluatorer kjenner igjen modellen nøyaktig i koden og grensesnittet, har vi gjennomført en systematisk refaktorering av kjernekomponentene.

---

## 🛠️ Gjennomførte Endringer i Kodebasen

Følgende filer har blitt endret og verifisert:

### 1. Domenetyper og TypeScript-skjemaer ⚙️
*   **Fil**: `apps/hr-strategiradar/src/domain/schemas.ts`
*   **Endring**: Erstattet `'delautomatisering'` med `'strategisk_autonomi'` i `KiRole` Zod-enumen.
*   **Betydning**: Datamodellen samsvarer nå med de fire offisielle kvadrantrollene under Berge & Knudsens modell.

### 2. Beregningsmotor og Diagnoselogikk 🧮
*   **Fil**: `apps/hr-strategiradar/src/services/mockDiagnosisService.ts`
*   **Endringer**:
    *   Oppdatert `ROLE_LABELS` til å referere til de offisielle kvadrantnumrene og betegnelsene (I. Forsterket skjønn, II. Automatisert beslutning, III. Utforskende støtte, IV. Strategisk autonomi).
    *   Skrevet om `getCalculatedRole` til å beregne KI-rollen utelukkende ut fra de uavhengige aksene for **målklarhet** og **separabilitet** (høy/lav med grenseverdi `3.0`), akkurat slik det defineres i Berge & Knudsens kvadrantdiagram:
        *   Målklarhet >= 3.0 og Separabilitet >= 3.0 ➔ `automatisert_beslutning`
        *   Målklarhet >= 3.0 og Separabilitet < 3.0 ➔ `forsterket_skjønn`
        *   Målklarhet < 3.0 og Separabilitet < 3.0 ➔ `utforskende_støtte`
        *   Målklarhet < 3.0 og Separabilitet >= 3.0 ➔ `strategisk_autonomi`
    *   Oppdatert `ROLE_ORDER`, `minRole` og `getRoleCap` til å støtte `strategisk_autonomi` i stak- og prioriteringsberegninger.

### 3. Brukergrensesnitt og UX 🖥️
*   **Filer**:
    *   `apps/hr-strategiradar/src/components/Dashboard/Dashboard.tsx`
    *   `apps/hr-strategiradar/src/components/Dashboard/DecisionLog.tsx`
    *   `apps/hr-strategiradar/src/components/Dashboard/CompassView.tsx`
*   **Endringer**:
    *   Samkjørt blindtest-valg, refleksjonsavsjekk og foreløpig tillatt rolle-visning med `'strategisk_autonomi'` og dens unike strategiske risikoprofil.
    *   **UX-Berikelse**: Lagt til en automatisk visning av **Stoppregler utløst** i `CompassView` dersom det finnes aktive stoppregler. Dette sikrer human-in-the-loop og gjør det umiddelbart synlig *hvorfor* en rolle er begrenset eller har rødt/gult lys.

---

## 🧪 Verifisering og QA-testespor ("Run Trail")

For å sikre fullstendig regresjonskontroll, ble testsuiten oppdatert og kjørt med Vitest. Alle **96 enhetstester** er grønne og passer 100 % uten feil:

*   **`schemas.test.ts`**: Verifiserer at `'strategisk_autonomi'` parses riktig.
*   **`mockDiagnosisService.test.ts`**: Validerer de polariserte scorene (f.eks. M=5, S=1 som gir `forsterket_skjønn` uavhengig av sammensatt modell, og utløser `SR-02` stoppregel med rødt trafikklys).
*   **`casetypes.test.ts`**: Bekrefter at en standardoppgave (HRR-02-A) får tillatt rolle `'automatisert_beslutning'` når den mangler stoppregler, og at høyrisikosaker bremses korrekt.
*   **`CompassView.test.tsx`**: Verifiserer at stoppregler og tillatt KI-bruk vises i korrekt rekkefølge for brukeren.

### Testkjøring-resultat:
```text
 ✓ src/domain/__tests__/casetypes.test.ts (5 tests) 4ms
 ✓ src/research/__tests__/sonarAdapter.test.ts (3 tests) 6ms
 ✓ src/services/__tests__/mockDiagnosisService.test.ts (12 tests) 7ms
 ✓ src/research/__tests__/pipeline.test.ts (5 tests) 6ms
 ✓ src/domain/__tests__/schemas.test.ts (16 tests) 10ms
 ✓ src/domain/__tests__/fixtures.test.ts (41 tests) 10ms
 ✓ src/store/scenarioFlow.test.ts (4 tests) 5ms
 ✓ src/store/store.test.ts (3 tests) 5ms
 ✓ src/services/__tests__/researchDiagnosisService.test.ts (4 tests) 7ms
 ✓ src/App.test.tsx (1 test) 56ms
 ✓ src/components/Dashboard/CompassView.test.tsx (1 test) 90ms
 ✓ src/components/Dashboard/DecisionLog.test.tsx (1 test) 109ms

 Test Files  12 passed (12)
      Tests  96 passed (96)
```

---

## 📈 Konklusjon og Neste Fase

Vi har lagt igjen et solid arkitektonisk og kjørbart spor ("run trail") i prosjektet. Denne samkjøringen sikrer at forfatterne av rammeverket vil oppleve en feilfri og teoretisk presis implementering av sitt eget arbeid i **HR Strategiradar**.

Neste naturlige steg i henhold til vår integrasjonsplan (`planning/sprint_plan_ki_kompass_alignment.md`) er å demonstrere denne visuelle og beregningsmessige flyten for brukeren.
