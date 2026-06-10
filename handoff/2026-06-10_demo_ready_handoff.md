# Handoff: MVP demo-ready — visuell verifisering runde 2

**Fra:** Claude Code
**Til:** Gemini (Antigravity)
**Dato:** 2026-06-10
**Status:** 153/153 tester grønne, 6 nye features siden forrige verifisering

## Start dev-server

```bash
cd apps/hr-strategiradar
npm run dev
```

Åpne http://localhost:5173

## Nye features å verifisere

### 1. "Begrenset fordi:" i steg 2
- Velg HRR-01, gå til steg 2
- Under "Foreløpig anbefalt KI-rolle:" skal det stå **"Begrenset fordi:"** med en punktliste over stoppregler i klartekst
- Skal IKKE vise SR-koder (SR-01, SR-05 etc.)

### 2. Randsone-badges i steg 1
- Velg HRR-01 → under "Slik forstår vi saken" skal det vises fargede badges:
  - "Arbeidsvilkår" (blå)
- Velg HRR-02 → skal vise "Personvern", "HMS", "Arbeidsvilkår" (og eventuelt "Ansattes rettigheter" for task B)
- Velg HRR-04 → sjekk at riktige badges vises
- Overskrift: "Områder denne oppgaven berører:"

### 3. Steg-indikator med grønne hakmerker
- Gå fra steg 1 → 2 → 3
- Steg 1 og 2 skal få grønt hakmerke (✓) og grønn bakgrunn
- Aktivt steg har blå bakgrunn som før

### 4. Scenario-advarsel i steg 4
- Gå til steg 4 UTEN å fylle inn "Hva kan gå galt?" i steg 3
- ExportPanel skal vise gul advarsel: "Ingen risikoer er beskrevet ennå."
- Etter å fylle inn minst ett risikopunkt i steg 3, skal advarselen forsvinne

### 5. Kompassvurdering i eksportfil
- Klikk "Last ned som tekstfil" i steg 4
- Åpne Markdown-filen
- Sjekk at den inneholder seksjon "## Kompassvurdering" med:
  - "Hvor tydelige er målene: X.X av 5.0"
  - "Kan det løses med faste regler: X.X av 5.0"

### 6. Eksport-disclaimer styling
- I steg 4, disclaimeren "Dette er et utkast fra workshopen" skal ha gul/oransje bakgrunn (ikke bare grå tekst)

## Fullstendig sjekkliste fra forrige runde (skal fortsatt bestå)

Alle 25 krav fra forrige verifisering + 3 obs-fikser gjelder fortsatt. Se `handoff/2026-06-10_visuell_verifisering_handoff.md` for komplett liste.

## Oppdatert browser_verification.mjs

Scriptet i `.agents/browser_verification.mjs` har allerede 3 obs-sjekker fra forrige runde. Det dekker IKKE de 6 nye features — visuell inspeksjon kreves.

## Endrede filer siden forrige verifisering

| Fil | Endring |
|---|---|
| `src/components/Dashboard/Dashboard.tsx` | Randsone-badges, "Begrenset fordi:", steg-hakmerker, STOP_RULES_MAP import |
| `src/services/reportService.ts` | Kompassvurdering-seksjon i Markdown + JSON |
| `src/components/Dashboard/ExportPanel.tsx` | Scenario-advarsel, disclaimer-styling |
| `src/components/Dashboard/ExportPanel.test.tsx` | 2 nye tester |
| `src/services/__tests__/reportService.test.ts` | 1 ny test |

## Demo-walkthrough (anbefalt rekkefølge)

1. Åpne appen — steg 1 vises
2. Velg HRR-01 "Seniorbevaring" → se randsone-badges og casebeskrivelse
3. Klikk "Stemmer — gå videre →"
4. Steg 2: Velg "KI som idégiver" i blindtest → se kompass, stoppregler, "Begrenset fordi:"
5. Sjekk at steg 1 nå har grønt hakmerke
6. Klikk "Gå til risikovurdering →"
7. Steg 3: Fyll inn minst ett "Hva kan gå galt?" felt
8. Klikk "Gå til beslutningsnotat →"
9. Steg 4: Sjekk disclaimer-styling, klikk "Fyll inn automatisk", last ned tekstfil
10. Verifiser kompassvurdering i nedlastet fil
