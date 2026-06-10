# HR Strategiradar / KI-Radar

Workshop-verktøy som hjelper en HR-/HMS-/prosjektgruppe å vurdere om det er forsvarlig
å bruke KI i en konkret sak. Verktøyet kjører i nettleseren — ingen backend.

## Hva appen gjør

- Tar en konkret HR-sak gjennom fire steg: beskriv saken → foreløpig KI-diagnose →
  risikovurdering → beslutningsnotat.
- Viser et **kompass** (klart KI-formål vs. løsbart med faste regler), et **trafikklys**
  (risikonivå) og en **anbefalt KI-rolle** som endrer seg etter hva gruppen svarer.
- Støtter **menneskelig vurdering** — aldri automatisk beslutning.
- Eksporterer beslutningsnotat som Markdown, JSON og Word (.docx med ROS + DPIA-struktur).

## Kjør lokalt

```bash
npm install
npm run dev      # start dev-server (Vite)
npm test         # kjør testene (Vitest)
npm run build    # type-sjekk (tsc -b) + produksjonsbygg
npm run lint     # ESLint
```

## Miljøvariabler

- Kopier `.env.example` til `.env` i samme mappe (`apps/hr-strategiradar/.env`).
- `.env` er gitignored og **skal aldri deles** (verken i git, e-post eller zip).
- `PERPLEXITY_API_KEY` brukes **kun** av den valgfrie research-importen
  (`npm run research`). Selve appen kjører fint uten nøkkel.
- **Har `.env` noen gang forlatt maskinen** (delt zip, opplasting, e-post)?
  Roter nøkkelen i Perplexity-panelet umiddelbart.

Se `.env.example` for fullstendig variabelliste.

## Dele trygt

Ikke zip arbeidsmappa — den inneholder `.env`, `node_modules` og `dist`.
Lag en ren pakke fra git i stedet:

```bash
git archive --format=zip -o share.zip HEAD   # eller: npm run share:zip
```

`git archive` tar kun sporet innhold og hopper over alt i `.gitignore`.
Se `CHECKLIST_BEFORE_SHARING.md` før hver deling.

## Kvalitetsstatus

| Lag | Verktøy |
|-----|---------|
| Frontend | Vite + React + TypeScript (`strict`) |
| Skjema / validering | Zod |
| State | Zustand |
| Tester | Vitest + Testing Library, Playwright (e2e) |

Domenemotoren (`src/services/mockDiagnosisService.ts`) avleder rolle, trafikklys og
stoppregler. Alle 8 HR-saker har authored output = motor-output (koherenstest).
