# Handoff: Visuell verifisering av HR Strategiradar MVP

**Fra:** Claude Code
**Til:** Gemini (Antigravity)
**Dato:** 2026-06-10
**Status:** Runde 2 — 3 obs-fikser etter forrige kjøring, klar for re-verifisering

## Fikser siden forrige kjøring

Forrige runde ga 25/25 bestått med 3 observasjoner. Alle 3 er nå fikset:

1. **Obs 1 — Rekkefølge steg 3:** ScenarioCards ("Tenk gjennom risiko") rendres nå FØR CheckpointsAndReflections ("Felles vurdering"). Verifiser at risiko-kortet kommer først.
2. **Obs 2 — Scoreskala:** "av 4.0" er rettet til "av 5.0" i forklaringsteksten i steg 2. Verifiser at INGEN forekomster av "4.0" finnes i scoretekst.
3. **Obs 3 — Blindtest-label:** Sammenligningsblokken viser nå "KI som idégiver" (ikke "sparringspartner") når brukeren velger laveste nivå. Verifiser at "sparringspartner" IKKE forekommer noe sted.

`browser_verification.mjs` er oppdatert med 3 nye sjekker og verdicts for disse fiksene.

## Mål

Verifiser visuelt at alle 4 steg i appen ser riktige ut, og at de 3 obs-fiksene er synlige. Start dev-server og gå gjennom hvert steg.

## Start dev-server

```bash
cd apps/hr-strategiradar
npm run dev
```

Åpne http://localhost:5173

## Hva skal sjekkes

### Steg 1: Beskriv saken
- Velg en case fra dropdown (f.eks. HRR-01 "Seniorbevaring i hjemmetjenesten")
- Bekreft at casebeskrivelse vises
- Sjekk at det IKKE finnes et fritekstfelt (fjernet med vilje)
- Klikk "Bekreft og gå videre"

### Steg 2: Se foreløpig KI-diagnose
- KI-Kompass skal vises med 4 kvadranter:
  - Akseetiketter: "Hvor tydelige er målene?" (Y) og "Kan det løses med faste regler?" (X)
  - Kvadrantetiketter: "Menneske vurderer" / "Faste regler" / "Tydelige mål" / "Uklare mål"
- Blå prikk skal plasseres i riktig kvadrant
- Trafikklys skal vises (rød/gul/grønn)
- Status-tekst: "OK å jobbe videre" / "Noe må avklares først" / "Stopp — må sjekkes nærmere"
- Stoppregler skal hete "Forhold som må avklares:" (IKKE "Stoppregler utløst")
- KI-rolle skal hete "Foreløpig anbefalt KI-rolle:" (IKKE "Foreløpig tillatt KI-bruk etter avklaringer")
- Score-labels: "Faste regler: X.XX / 5.0" og "Tydelige mål: X.XX / 5.0"
- **Test kompassbevegelse:** Bytt case fra HRR-01 til HRR-04 — prikken skal flytte seg

### Steg 3: Risikovurdering
- Overskrift "Tenk gjennom risiko" (IKKE "Lokal scenariotenking og ROS")
- Felt: "Hva kan gå galt?" (IKKE "Simulert hendelse")
- Bekymringsnivå: lav/middels/høy knapper
- Utvidede felt: "Hva må være sant for at dette skal skje?", "Hvem rammes?", "Varseltegn", etc.
- "Dette må dere avklare" (IKKE "Dette må prosjektgruppen avklare")
- Toggle-labels: "Påvirker ansattes rettigheter?", "Brukes personlige eller sensitive opplysninger?", "Må du kjenne lokale forhold?", "Kan feil rettes opp?"

### Steg 4: Beslutningsnotat
- "Foreløpig beslutningsnotat" som overskrift
- Knapp: "Fyll inn automatisk" (IKKE "Autofyll")
- Knapp: "Teknisk rapport" (IKKE "IT-Dokumentasjon")
- Seksjon: "Risikovurdering og tiltak" (IKKE "ROS og risikoreduserende tiltak")
- "Signer at notatet er gjennomgått" (IKKE "Signer gjennomgått foreløpig notat")
- "Kollega som har lest notatet" (IKKE "Makker som har lest notatet")
- "Lås vurderingen" (IKKE "Lås vurderingen i denne økten")
- Eksportknapper: "Last ned som tekstfil" og "Last ned som datafil"
- Disclaimer: "Dette er et utkast fra workshopen. Må gjennomgås av ansvarlig før bruk."

## Viktige ting å IKKE finne

- Ingen forekomster av: "separabilitet", "målklarhet", "stoppregler", "overreliance", "human-in-the-loop", "FRIA", "samsvarsgrad", "compliance"
- Ingen fritekstfelt i steg 1
- Ingen SR-koder synlige (SR-01, SR-05 etc.)

## Endrede filer (for referanse)

- `src/services/mockDiagnosisService.ts` — rolle-labels, stoppregler, forklaringstekster
- `src/components/Dashboard/Dashboard.tsx` — steg-labels, blindtest, modellveksler
- `src/components/Dashboard/CompassView.tsx` — akser, kvadranter, status
- `src/components/Dashboard/ExportPanel.tsx` — knappetekst
- `src/components/Dashboard/CheckpointsAndReflections.tsx` — overskrifter, toggle-labels
- `src/components/Dashboard/ScenarioCards.tsx` — feltnavn, overskrift
- `src/components/Dashboard/DecisionLog.tsx` — knapper, seksjonsnavn, rapport

## Ordliste

Se `docs/ordliste-fagterm-til-brukersprak.md` for komplett mapping mellom fagtermer og brukerspråk.

## Etter visuell verifisering

Rapporter:
1. Skjermbilder eller beskrivelse av hvert steg
2. Eventuelle tekster som fortsatt er for tekniske/akademiske
3. Layout-problemer eller visuell støy
4. Om kompasset beveger seg korrekt mellom caser
