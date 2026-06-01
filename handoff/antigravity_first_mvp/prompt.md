---
title: "Prompt til Antigravity: avgrenset første MVP-bygg"
date: 2026-05-17
status: ready-with-context-correction
tags: [prompt, antigravity, mvp, scope-control, hr-strategiradar]
category: handoff
---

# Prompt til Antigravity: avgrenset første MVP-bygg

## Kontekstoppdatering 2026-05-23

Før denne prompten brukes, skal Antigravity lese `CONTEXT.md`, `CLAUDE.md`, `state/context/current_context.md` og `docs/agents/domain.md`. HR Strategiradar skal forstås som arbeidsverktøy og øvingsarena for en fasilitert prosjektgruppe, ikke som selvbetjent scoreapp, compliance-fasit eller revisjonssertifikat.

Du skal bygge første MVP for HR Strategiradar. Ikke start med å lese hele repoet. Les bare filene i denne prompten, og utvid kun hvis en konkret build- eller testfeil krever det.

## Oppdrag

Bygg første MVP som en lokal TypeScript/React-workbench med tre synlige steg:

```text
1. Beskriv saken
2. Se foreløpig KI-diagnose
3. Tweak og lag notat
```

MVP-en skal først støtte HRR-07 Langvakter i helsesektoren, med HRR-01, HRR-02 og HRR-04 som ekstra dropdown-caser hvis det er rimelig innen første bygg.

## Les bare disse prosjektfilene først

Les i denne rekkefølgen:

1. `AGENTS.md`
2. `CONTEXT.md`
3. `CLAUDE.md`
4. `state/context/current_context.md`
5. `docs/agents/domain.md`
6. `workspace.yml`
7. `handoff/antigravity_first_mvp/kanban.md`
8. `handoff/antigravity_first_mvp/handoff.md`
9. `reviews/ui_ux/001_3_stegs_mvp_ui_review.md`
10. `app_spec/ui_3_stegs_startflyt_og_kanban.md`
11. `concepts/kart_og_kompass.md`
12. `decision_model/lagskille_og_beslutningsflyt.md`
13. `decision_model/stoppregel_og_scorekontrakt.md`
14. `testcases/hr_strategiradar_realistiske_caser.md`
15. `research/langvakter_helsesektoren_kildegrunnlag.md`

## Les bare disse appfilene før kodeendring

Innen `apps/hr-strategiradar/`, les bare:

```text
package.json
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
src/App.tsx
src/App.css
src/main.tsx
src/index.css
src/domain/__tests__/schemas.test.ts
src/domain/__tests__/fixtures.test.ts
src/App.test.tsx
```

Hvis en fil ikke finnes, noter det og bygg minste nødvendige struktur. Ikke let bredt i repoet for å finne en alternativ sannhetskilde.

## Ikke les disse uten eksplisitt behov

Ikke bruk tid på disse mappene i første pass:

```text
archive/
archive/source_packages/
missing/
quality/
prompts/
reviews/claude/
intake/
sources/
research/runde_1/
context_packets/
planning/
sprints/
.superpowers/
.claude/
```

Ikke les Learning Lab direkte i første MVP-bygg. Bruk bare det som allerede er destillert i:

```text
testcases/hr_strategiradar_realistiske_caser.md
research/langvakter_helsesektoren_kildegrunnlag.md
reviews/ui_ux/001_3_stegs_mvp_ui_review.md
handoff/antigravity_first_mvp/handoff.md
```

## Søkeregler

Bruk bare avgrensede søk:

```powershell
rg -n "HRR-07|langvakter|Foreløpig KI-diagnose|stoppregler|målklarhet|separabilitet" app_spec decision_model testcases research handoff reviews apps/hr-strategiradar
```

Ikke kjør brede søk som:

```powershell
rg -n "kompass" .
rg --files
Get-ChildItem -Recurse
```

Hvis du må liste filer, avgrens til:

```powershell
rg --files apps/hr-strategiradar
rg --files handoff/antigravity_first_mvp reviews/ui_ux app_spec decision_model testcases research
```

## Byggeregler

- Ikke endre råpakker i `archive/source_packages/`.
- Ikke bygg database, auth, deploy, LLM-integrasjon eller research-agent.
- Ikke bygg full grafisk kompassvisning først.
- Ikke vis rolle før stoppregler.
- Ikke bruk språk som "fasit", "godkjent for KI", "trygt å automatisere" eller "KI anbefaler".
- Første output skal hete **Foreløpig KI-diagnose**.
- Brukeren må bekrefte antakelser med ja/nei/endre før de brukes videre.

## Første vertikale MVP-slice

Bygg denne flyten først:

```text
Dropdown: Arbeidstid, HMS og langvakter
Klikkspørsmål: KI-intent, berørte parter, påvirkningsnivå
Fritekst: kort casebeskrivelse
Bekreftelseskort: dette antar vi
Foreløpig KI-diagnose: KI kan / KI bør ikke / stoppregler / foreløpig tillatt bruk / hull
Tweak: endre KI-bruksoppgave, røde flagg, beslutningseier og lokal verifikasjon
Notat: foreløpig beslutningsnotat med mangler synlig
```

## Verifisering

Før du sier deg ferdig:

```powershell
cd "C:\Users\larse\Documents\ki-beslutningsradar\apps\hr-strategiradar"
npm test
npm run build
```

Hvis test/build feiler på eksisterende manglende domenefiler, implementer minste nødvendige domenemodell fra handoffen. Ikke les gamle arkivpakker for å løse det.
