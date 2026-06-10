# Demo-verifisering: HR Strategiradar MVP — resultat

**Utført av:** Claude Code (live verifisering med Claude Preview, ikke Gemini)
**Dato:** 2026-06-10
**App:** `apps/hr-strategiradar` på http://localhost:5173
**Baseline:** 153/153 vitest grønne · dev-server lastet uten konsollfeil

## Sammendrag

| # | Feature | Funn ved verifisering | Status etter fiks |
|---|---------|----------------------|-------------------|
| 1 | "Begrenset fordi:" + klartekst stoppregler (ingen SR-koder) | ✅ PASS | — |
| 2 | Randsone-badges "Områder denne oppgaven berører:" | ❌ FAIL (bug) | ✅ **FIKSET + verifisert** |
| 3 | Steg-indikator med grønne hakmerker | ✅ PASS | — |
| 4 | Scenario-advarsel i steg 4 | ⚠️ Unåbar (seed-data) | ✅ **FIKSET + verifisert** |
| 5 | "## Kompassvurdering" i eksportert Markdown | ✅ PASS | — |
| 6 | Eksport-disclaimer gul/oransje bakgrunn | ✅ PASS | — |

Regresjon (forrige runde): ingen fagtermer, ingen SR-koder, ingen textarea i steg 1, score-skala "/ 5.0" — alt OK.

**Testsuite etter fiks: 154/154 grønne** (153 + 1 ny regresjonstest). `tsc -b` rent. Dev-server mounter uten konsollfeil.

## Fikser utført (godkjent av Lars 2026-06-10)

### Feature 2 — FIKSET
- `Dashboard.tsx`: tre linjer `activeTask.riskFlags?.X` → `activeTask.expectedRiskFlags?.X` (HMS, Arbeidsvilkår, Vanskelig å angre).
- Ny regresjonstest i `Dashboard.test.tsx` ("randsone-badges i steg 1") — RED før fiks, GREEN etter.
- Live verifisert: HRR-01 → `Arbeidsvilkår`; HRR-02 & HRR-07 → `HMS` + `Arbeidsvilkår`. HRR-04 viser ingen blokk fordi standardoppgaven (HRR-04-A) har alle flagg `false` — dette er datakorrekt (badges vises hvis man bytter til oppgave HRR-04-B i steg 2).

### Feature 4 — FIKSET
- `default-scenarios.ts`: rik seed beholdt som `SEEDED_SCENARIOS`; `DEFAULT_SCENARIOS` eksporteres nå med `simulertHendelse: ''` for alle scenarier. Detaljfeltene (berørteParter osv.) er fortsatt fylt som stillas bak kort-utvideren.
- `scenarioFlow.test.ts`: oppdatert til å asserte tomt startfelt (ny demo-kontrakt).
- Live verifisert: steg 3 starter med 4 tomme "Hva kan gå galt?"-felt → advarsel vises i steg 4 → forsvinner når minst ett felt fylles ut.

### Bonusfiks (oppdaget underveis)
- `vitest.setup.ts`: la til `afterEach(cleanup)` fra @testing-library/react. DOM-en akkumulerte mellom tester (ingen opprydding var konfigurert) — uten dette ga den nye badge-testen falsk "multiple elements". Gjør hele suiten mer korrekt.

### Restpunkt (ikke kode)
- Seed `default-scenarios.ts` linje for HRR-04 hadde tekststart "If dette blir utfallet:" (typo, manglende "Hv"). Strengen blankes nå ved eksport, så den vises ikke — men bør rettes i kilden hvis innholdet noen gang gjenbrukes.

## Detaljer

### ✅ Feature 1 — PASS
Steg 2, HRR-01, blindtest "KI som idégiver". Under "Foreløpig anbefalt KI-rolle:" vises "Begrenset fordi:" med klartekst-punkter:
- "Krever kjennskap til lokale forhold (kan ikke løses bare med faste regler)"
- "Notatet er ikke ferdig utfylt"
- "Det er vanskelig å sjekke om KI-resultatet stemmer mot regler og lokale fagvurderinger"

Ingen SR-koder funnet i DOM (regex `SR-\d` → 0 treff).

### ❌ Feature 2 — FAIL (bekreftet bug)
Blokken **"Områder denne oppgaven berører:"** rendres **ikke for noen** av casene (HRR-01, -02, -04, -07).

**Rotårsak:** `Dashboard.tsx:422-424` leser `activeTask.riskFlags?.X`, men feltet i skjemaet (`domain/schemas.ts:98`) heter **`expectedRiskFlags`**. Det finnes ikke noe `riskFlags`-felt på oppgaven, så `activeTask.riskFlags` er alltid `undefined`.

Konsekvens:
- Badgene **HMS**, **Arbeidsvilkår** og **Vanskelig å angre** (som leser `riskFlags`) rendres aldri.
- Badgene **Ansattes rettigheter** og **Personvern** leser korrekte topp-nivå-felt (`directEffectOnPeople` / `usesPersonalOrSensitiveData`), men begge er `false` for standardoppgavene i de fire casene → ingen badges → hele blokken returnerer `null`.

Handoffens påstand "HRR-01 → Arbeidsvilkår (blå)" feiler fordi `workConditionsImpact: true` ligger under `expectedRiskFlags`, ikke `riskFlags`.

**Fix (3 linjer i `Dashboard.tsx`):**
```diff
- if (activeTask.riskFlags?.healthSafetyEnvironment) badges.push({ label: 'HMS', ... })
- if (activeTask.riskFlags?.workConditionsImpact) badges.push({ label: 'Arbeidsvilkår', ... })
- if (activeTask.riskFlags?.irreversibleConsequences) badges.push({ label: 'Vanskelig å angre', ... })
+ if (activeTask.expectedRiskFlags?.healthSafetyEnvironment) badges.push({ label: 'HMS', ... })
+ if (activeTask.expectedRiskFlags?.workConditionsImpact) badges.push({ label: 'Arbeidsvilkår', ... })
+ if (activeTask.expectedRiskFlags?.irreversibleConsequences) badges.push({ label: 'Vanskelig å angre', ... })
```
Bør følges av en enhetstest som rendrer badge-blokken mot ekte fixture-data (ingen test dekker dette i dag — derfor 153/153 grønt til tross for bugen).

### ✅ Feature 3 — PASS
Steg 1-knappen i topp-navet: "✓ 1. Beskriv saken", grønn bakgrunn `rgba(16,185,129,0.08)`, grønn tekst `rgb(16,185,129)`. Aktivt steg (2) blå bakgrunn `rgb(3,105,161)` med hvit tekst. Steg 3/4 nøytrale.

### ⚠️ Feature 4 — Fungerer i test, men unåbar i live demo
Advarselen "Ingen risikoer er beskrevet ennå" vises **ikke** når man hopper til steg 4 uten å gjøre noe.

**Rotårsak:** Store-en seeder `scenarios` fra `DEFAULT_SCENARIOS` (`store.ts:173`), og alle demo-casene har `simulertHendelse` ferdig utfylt. `hasAnyScenarioContent` (`ExportPanel.tsx:27`) er derfor `true` fra start. Steg 3s fire "Hva kan gå galt?"-felt er alle forhåndsutfylt med eksempeltekst ("Hvis dette blir utfallet: …").

Selve logikken er korrekt (enhetstesten i `ExportPanel.test.tsx` med tomme scenarier passerer). Men handoffens walkthrough-steg ("gå til steg 4 UTEN å fylle inn risiko → advarsel") kan **ikke reproduseres** med seed-data. Avklaring trengs: skal demo-casene starte med tomme risikofelt, eller er den forhåndsutfylte teksten ønsket (og advarselen dermed bare en sikkerhet for tomme caser)?

### ✅ Feature 5 — PASS
Faktisk nedlastet Markdown (fanget via blob-intercept) inneholder:
```
## Kompassvurdering

- **Hvor tydelige er målene:** 3.5 av 5.0
- **Kan det løses med faste regler:** 2.5 av 5.0
```
Scorene matcher HRR-01-A (målklarhet 3.5, separabilitet 2.5).

### ✅ Feature 6 — PASS
Disclaimer "Dette er et utkast fra workshopen…": bakgrunn `rgba(245,158,11,0.08)` (gul/amber), tekst `rgb(146,64,14)` (mørk amber) — ikke bare grå.

## Anbefaling før demo
1. **Fiks Feature 2** (3-linjers `riskFlags` → `expectedRiskFlags`) + legg til regresjonstest. Lav risiko, høy demo-verdi.
2. **Avklar Feature 4**: tøm risikofelt i seed for demo-caser, ELLER aksepter at advarselen kun er en edge-case-sikkerhet og juster handoff-walkthrough.
3. Features 1, 3, 5, 6 er demo-klare.
