---
title: "Claude project understanding"
date: 2026-05-13
status: canonical-understanding
tags: [claude, project-understanding, hr-strategiradar]
category: agent-context
---

# Claude Project Understanding

## Read first

1. `AGENTS.md`
2. `state/context/current_context.md`
3. `app_spec/brukerreise_hr_strategiradar.md`
4. `app_spec/arbeidsflyt_og_beregningsmodell.md`
5. `testcases/hr_strategiradar_realistiske_caser.md`
6. `handoff/claude_deep_research_datainnhenting.md`
7. `prd/hr_strategiradar_mvp_prd.md`

## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `issues/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the standard five triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo with root `CONTEXT.md` and supporting architecture notes under `docs/architecture/`. See `docs/agents/domain.md`.

### UI/UX subagent

Use `docs/agents/ui-ux-subagent.md` for work on weighting, interaction design, user journey, language, visual priority or HR Strategiradar UI changes.

## Core understanding

HR Strategiradar skal ikke være et skjema som gir score. Den skal være en veiledet diagnose og en fasilitert arbeidsflate som hjelper prosjekteier/konsulent og en prosjektgruppe å forstå hvilken rolle KI kan ha i en konkret del av et HR-arbeid.

Primærkonteksten er reelle arbeidsoppgaver: en prosjektgruppe skal kunne bruke radaren som øvingsarena og arbeidsverktøy for å bygge kart, vurdere en konkret KI-bruksoppgave, avklare ROS-punkter, dokumentere menneskelig ansvar og lage et beslutningsklart notat. Appen skal ikke fremstå som compliance-fasit, juridisk godkjenning eller revisjonssertifisering.

Kanonisk brukerreise:

```text
Forstå situasjonen
-> bygg kartet
-> velg KI-bruksoppgave
-> still to kompass-spørsmål
-> gjør verdivurderinger
-> se kompassplassering
-> vurder stoppregler
-> skill beregnet rolle fra tillatt rolle
-> dokumenter ansvar
-> lag beslutningsklart notat
```

## Most important rule

> HR-mikroprosjektet er kontekst. KI-bruksoppgaven er vurderingsenheten.

Ikke vurder hele HR-prosjektet som én klump. Appen skal først bygge kartet, deretter vurdere hva KI konkret skal gjøre.

Nest viktigste regel:

> Human-in-the-loop er en arbeidsmåte, ikke en signatur.

Appen må tvinge frem aktiv menneskelig forhåndsvurdering, motargument, lokal verifikasjon, usikkerhet og ansvarlig beslutning før KI-output kan brukes. En makkersjekk eller låsing kan støtte etterspor, men kan ikke erstatte menneskelig dømmekraft.

## Visual foundation

Bildene i `assets/images/original/` gir produktlogikken:

- `01_to_sporsmal_malklarhet_separabilitet.png`: to grunnspørsmål.
- `02_kompass_fire_kvadranter.png`: fire rolleområder.
- `12_risikoen_er_feildiagnose.png`: største risiko er feil diagnose.
- `13_kompass_og_kart.png`: brukeren trenger både kart og kompass.

## Modeling rules

- Målklarhet og separabilitet er kompassaksene.
- Forklarbarhet/human oversight og anti-overreliance er kontrollkrav.
- Stoppregler kommer før rolle.
- Score gir `beregnet_rolle`.
- Stoppregler og rolle-tak gir `forelopig_tillatt_rolle`.
- Høy HR-risiko krever beslutningslogg.
- KI skal ikke anbefales som automatisk beslutning i HR-høyrisiko-caser.
- ROS-punkter er arbeidsgrunnlag for prosjektgruppen, ikke en automatisk godkjenningsmotor.
- Samsvarsgrad, trafikklys eller compliance-lignende indikatorer skal behandles som interne varsel- og prioriteringssignaler, ikke som juridisk eller revisjonsmessig fasit.

## Case foundation

Primary MVP case set: `testcases/hr_strategiradar_realistiske_caser.md`.

First tracer bullet: HRR-01 Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

Denne skal brukes til å teste:

- strategisk HR
- lokal praksis
- relasjonell tillit
- HMS/personvern-randsoner
- arbeid/rettigheter
- risiko for falsk automatiseringsanbefaling

Første byggeløype bør samtidig holdes opp mot HRR-02 sykefravær/tilrettelegging, HRR-04 rekruttering og HRR-07 langvakter i helsesektoren, slik at modellen ikke blir for smal.

## Current implementation state

- Appskall finnes i `apps/hr-strategiradar/`.
- `HRSR-001` er fullført.
- Neste steg er `HRSR-002`, men schemas må følge brukerreisen:
  - `HrMicroproject`
  - `AiUseTask`
  - `RiskFlags`
  - `DimensionIndicators`
  - `ModuleScores`
  - `ValueJudgments`
  - `AssessmentResult`
  - `DecisionLog`
  - `HandoverPacket`

## Latest UI direction from grill session

Use `app_spec/ui_3_stegs_startflyt_og_kanban.md` before challenging or revising MVP plans.

The user wants a low-friction UI with maximum three visible phases:

```text
1. Beskriv saken
2. Se forelopig KI-diagnose
3. Tweak og lag notat
```

The first screen should combine relevant dropdowns, max 2-3 questions, one free-text field, and clickable confirmation choices. The chatbot may propose fagfelt, randsoner, case draft and missing information, but the user must actively confirm with yes/no/change before the assumptions are used.

Several KI-spor should appear after the first diagnosis, not as the initial user task.

## Product intent correction after Antigravity handoffs

Antigravity-handoffene la for mye vekt på appfunksjoner, compliance-score og revisjonslås. Videre arbeid skal korrigere kursen:

- bygg for rådgiver/prosjektgruppe i workshop, ikke for en selvkjørende beslutningsapp
- vis foreløpig KI-diagnose, ikke fasit
- gjør ROS og lokal verifikasjon til faktisk arbeidsflate
- bevar menneskelig ansvar gjennom friksjonspunkter før aksept av KI-output
- bruk beslutningsnotatet som arbeidsleveranse, ikke som automatisk godkjenning
- ikke gjør trafikklys eller samsvarsgrad til et modenhetssertifikat
