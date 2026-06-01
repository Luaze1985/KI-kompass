---
title: "Kanban: HR Strategiradar første MVP"
date: 2026-05-18
status: ready-with-context-correction
tags: [kanban, antigravity, mvp, hr-strategiradar, ui-ux]
category: handoff
---

# Kanban: HR Strategiradar første MVP

Dette brettet oppsummerer status etter konseptarbeid, casearbeid, UI/UX-grilling, subagentreview og Antigravity-handoff.

Kontekstoppdatering 2026-05-23: Før dette brettet brukes, skal Antigravity lese `CONTEXT.md`, `CLAUDE.md`, `state/context/current_context.md` og `docs/agents/domain.md`. HR Strategiradar er arbeidsverktøy og øvingsarena for en fasilitert prosjektgruppe, ikke selvbetjent scoreapp, compliance-fasit eller revisjonssertifikat.

## Klar som grunnlag

| Kort | Status | Artefakt |
|---|---|---|
| K-00: Kanonisk produktkontekst | Klar | `CONTEXT.md`, `CLAUDE.md`, `state/context/current_context.md`, `docs/agents/domain.md` |
| K-01: Kompasspremisser | Klar | `concepts/kart_og_kompass.md` |
| K-02: Lagskille | Klar | `decision_model/lagskille_og_beslutningsflyt.md` |
| K-03: Stoppregel- og scorekontrakt | Klar | `decision_model/stoppregel_og_scorekontrakt.md` |
| K-04: Realistiske HR-caser | Klar | `testcases/hr_strategiradar_realistiske_caser.md` |
| K-05: Langvakt-kildegrunnlag | Klar | `research/langvakter_helsesektoren_kildegrunnlag.md` |
| K-06: 3-stegs UI-retning | Klar | `app_spec/ui_3_stegs_startflyt_og_kanban.md` |
| K-07: UI/UX-subagentreview | Klar | `reviews/ui_ux/001_3_stegs_mvp_ui_review.md` |
| K-08: Backend-MVP plan | Klar som referanse | `docs/superpowers/plans/2026-05-17-hr-strategiradar-backend-mvp.md` |
| K-09: Antigravity-handoff | Klar | `handoff/antigravity_first_mvp/handoff.md` |
| K-10: Antigravity scope-prompt | Klar | `handoff/antigravity_first_mvp/prompt.md` |

## Må bygges først

| Kort | Status | Akseptansekriterium |
|---|---|---|
| MVP-01: Avgrenset lesestart | Ikke startet | Antigravity bruker `handoff/antigravity_first_mvp/prompt.md` og leser ikke irrelevante mapper først. |
| MVP-02: 3-stegs shell | Ikke startet | Appen viser bare `Beskriv saken`, `Foreløpig KI-diagnose`, `Tweak og lag notat`. |
| MVP-03: Startinntak | Ikke startet | Dropdown, maks tre klikkspørsmål og ett fritekstfelt finnes. |
| MVP-04: Fire MVP-caser i dropdown | Ikke startet | HRR-01, HRR-02, HRR-04 og HRR-07 er tilgjengelige; HRR-07 er primær. |
| MVP-05: Bekreftelseskort | Ikke startet | Systemantakelser vises med `Ja, bruk dette`, `Endre`, `Nei, start på nytt`. |
| MVP-06: Foreløpig diagnosepanel | Ikke startet | Viser KI-kan, KI-bør-ikke, stoppregler, foreløpig tillatt KI-bruk og hull. |
| MVP-07: Stoppregler før rolle | Ikke startet | UI viser røde flagg/stoppregler før foreløpig tillatt KI-bruk. |
| MVP-08: Tweakflate | Ikke startet | Bruker kan korrigere KI-bruksoppgave, fagfelt/randsoner, røde flagg, beslutningseier og lokal verifikasjon. |
| MVP-09: Foreløpig notat | Ikke startet | Notatet genereres som foreløpig og markerer manglende avklaringer. |
| MVP-10: HRR-07 vertikal slice | Ikke startet | Langvakter kan kjøres fra startinntak til foreløpig notat. |

## Bør bygges i samme MVP hvis innenfor scope

| Kort | Status | Akseptansekriterium |
|---|---|---|
| SHOULD-01: Miniindikator for målklarhet/separabilitet | Ikke startet | Viser enkel tekstlig/visuell indikasjon uten full kompassgrafikk. |
| SHOULD-02: Hull-status | Ikke startet | Manglende beslutningseier og lokal verifikasjon påvirker notatstatus. |
| SHOULD-03: KI-kan/KI-nei skille | Ikke startet | Diagnosepanelet skiller tydelig støtteoppgaver fra oppgaver som bremses. |
| SHOULD-04: Språkvask i UI | Ikke startet | UI bruker `Foreløpig KI-diagnose`, `Foreløpig tillatt KI-bruk`, `Må avklares lokalt`. |
| SHOULD-05: Enkel testdekning | Ikke startet | `npm test` dekker minst startinntak, diagnose og HRR-07-case. |
| SHOULD-06: Build-verifisering | Ikke startet | `npm run build` passerer etter MVP-slice. |

## Må avklares eller låses under bygging

| Kort | Status | Beslutning |
|---|---|---|
| DEC-01: Backend først eller mock-kontrakter | Åpent | Hvis backend er for tungt, bygg frontend mot mock-kontrakter som matcher handoffens API. |
| DEC-02: Full domenemodell nå | Åpent | Implementer bare minste nødvendige modell hvis eksisterende tester/build krever det. |
| DEC-03: Notatblokkering | Foreløpig låst | Notat kan genereres med mangler, men må ikke kalles beslutningsklart. |
| DEC-04: Kompassgrafikk | Foreløpig låst | Full grafikk venter; miniindikator er greit. |

## Vent til etter første fungerende sløyfe

| Kort | Status | Begrunnelse |
|---|---|---|
| LATER-01: Full grafisk kompasskvadrant | Vent | Må ikke bli første verdi eller scorejakt. |
| LATER-02: Mange KI-spor side om side | Vent | Kommer etter første diagnose, ikke i startinntaket. |
| LATER-03: Ekspertmodus for indikatorer | Vent | For tungt i første MVP. |
| LATER-04: Learning Lab direkteimport i UI | Vent | Bruk destillert materiale først. |
| LATER-05: LLM/research-agent i produksjonsflyt | Vent | Research må lande i kildefiler før produktlogikk. |
| LATER-06: Database/persistens | Vent | Første MVP kan være lokal og stateless. |

## Skal ikke gjøres nå

| Kort | Status | Begrunnelse |
|---|---|---|
| NO-01: Lese hele repoet før bygg | Avvist | Prompten har lese-whitelist for Antigravity. |
| NO-02: Endre `archive/source_packages/` | Avvist | Råpakker skal ikke endres. |
| NO-03: 8-9 synlige UI-steg | Avvist | Bruker ønsker maks 3 steg. |
| NO-04: Rolle før stoppregler | Avvist | Bryter stoppregel- og scorekontrakt. |
| NO-05: Score som fasit | Avvist | Bryter kompasset og øker overreliance. |
| NO-06: Chatbot bestemmer fagfelt alene | Avvist | Bruker må aktivt bekrefte antakelser. |
| NO-07: Språk om at alle fagfelt er dekket | Avvist | UI skal si fagfelt vi har grunnlag for å vurdere. |
| NO-08: Individrangering i HR | Avvist | Høy risiko og ikke MVP-mål. |
| NO-09: Produksjonsdeploy/auth/database | Avvist | Ikke del av første MVP. |

## Neste anbefalte handling

Gi Antigravity disse filene først:

```text
CONTEXT.md
CLAUDE.md
state/context/current_context.md
docs/agents/domain.md
handoff/antigravity_first_mvp/prompt.md
handoff/antigravity_first_mvp/kanban.md
```

Deretter kan Antigravity lese:

```text
handoff/antigravity_first_mvp/handoff.md
reviews/ui_ux/001_3_stegs_mvp_ui_review.md
```
