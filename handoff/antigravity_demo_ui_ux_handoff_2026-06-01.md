---
title: "Antigravity-handoff: demo, UX og UI for HR Strategiradar"
date: 2026-06-01
status: ready-for-antigravity
tags: [handoff, antigravity, demo, ui, ux, hr-strategiradar]
category: handoff
---

# Antigravity-handoff: demo, UX og UI for HR Strategiradar

## Kort strategi

Demoen bør vise HR Strategiradar som en fasilitert workshopflate, ikke som en compliance-app.

Fortellingen:

1. Prosjektgruppen kommer inn med en konkret HR-sak.
2. Appen hjelper dem å avgrense én konkret KI-bruksoppgave.
3. De får en rask foreløpig KI-diagnose.
4. Stoppregler og røde flagg vises før rolle.
5. Gruppen må gjøre lokal verifikasjon, ROS og human-in-the-loop-arbeid før notatet kan brukes.

Demo-casen bør være `HRR-01 Seniorbevaring i hjemmetjenesten`. Den viser verdien tydelig: KI kan strukturere anonymisert innsikt og lage tiltakshypoteser, men skal ikke prioritere ansatte eller foreslå individuell tilrettelegging.

## Verifisert status

- Appen ligger i `apps/hr-strategiradar/`.
- `npm test` passerer: 11 testfiler, 91 tester.
- `npm run build` passerer.
- E2E-scenarioet rapporterte `ok`, men `npm run test:e2e` hang til timeout etterpå. Dette bør sjekkes før demo.
- Dagens UI har fungerende casevalg, KI-bruksoppgave, foreløpig diagnose, stoppregler, beslutningsnotat, signering og lokal prototype-lås.
- Dagens UI er fortsatt mer dashboard/prototype enn ønsket 3-stegs startflyt.

## Viktigste risiko

1. Brukeren kan lese "rask diagnose" som "rask anbefaling".
2. Trafikklys, compliance-prosent, signering og lås kan fremstå viktigere enn KI-bruksoppgave, stoppregler, ROS og lokal verifikasjon.
3. Dagens første skjerm lar brukeren velge case og KI-bruksoppgave direkte, men mangler det ønskede lette inntaket med fritekst, 2-3 klikkvalg og aktiv bekreftelse av antakelser.
4. UI-et bør være demo-polert, men må ikke skjule at dette er en foreløpig vurdering.

## Anbefalt demo-workflow

1. Start med `HRR-01 Seniorbevaring i hjemmetjenesten`.
2. Velg KI-bruksoppgave: strukturere anonymisert innsikt og tiltakshypoteser.
3. Vis at appen skiller denne fra risikabel individrettet prioritering.
4. Pek på målklarhet og separabilitet uten å gjøre det til scorejakt.
5. Vis stoppregler før foreløpig tillatt KI-bruk.
6. Fyll eller autofyll beslutningsnotat.
7. Legg inn simulert hendelse per aktivert tema: "Hvis dette blir utfallet, hva skjer konkret?"
8. Forklar signering/lås som lokal prototypebeskyttelse, ikke revisjon eller juridisk godkjenning.

## Scenariofelt som må inn i UI

Dette er en viktig del av scenariotenking og bør inn i Steg 3: `Tweak og lag notat`.

For hvert aktivert tema, randsone eller linsepakke skal UI-et vise et lite scenariofelt. Feltet skal ikke telle som score og ikke bli en ny kompassakse. Det skal gjøre ROS-arbeidet konkret.

Anbefalt korttekst:

```text
Hvis dette blir utfallet: [simulert hendelse]
```

Feltsett per tema:

| Felt | Bruk |
|---|---|
| Tema/randsone/linsepakke | Hvilket perspektiv dette gjelder. |
| Simulert hendelse | Hva som konkret skjer hvis utfallet slår til. |
| Utløsende antakelse | Hva må være sant for at dette scenarioet blir relevant. |
| Berørte parter | Hvem merker konsekvensen først. |
| Tidlige signaler | Hva prosjektgruppen skal følge med på. |
| Konsekvens hvis ikke håndtert | Hva som kan gå galt hvis temaet overses. |
| Lokal verifikasjon | Hva må sjekkes før KI-output kan brukes. |
| Ansvarlig eier | Hvem tar dette videre. |

Eksempel for demo:

| Tema | Simulert hendelse |
|---|---|
| Arbeid/rettigheter | Tiltakshypotesene brukes indirekte til å peke ut senioransatte som bør få eller ikke få tiltak. |
| Relasjonell tillit | Ansatte opplever at livsfasepolitikken er laget av KI uten reell medvirkning. |
| Personvern/system | Anonymiserte innspill kan kobles tilbake til små enheter eller enkeltpersoner. |
| Strategi/økonomi | Tiltak prioriteres etter antatt effekt uten at lokale bemanningsforhold er verifisert. |

## Kanban

### Done

| Kort | Status | Bevis |
|---|---|---|
| Appskall og testverktøy | Done | `apps/hr-strategiradar/`, `npm test`, `npm run build` |
| Domenekontrakter og fixtures | Done | `src/domain/schemas.ts`, `src/fixtures/all-cases.ts` |
| Flere HR-caser | Done | HRR-01, HRR-02, HRR-04, HRR-07 med flere finnes i fixtures |
| Score, stoppregler og rolle-tak | Done | Tester dekker HR-høyrisiko og lav separabilitet |
| Beslutningslogg og lokal prototype-lås | Done | `DecisionLog.tsx`, E2E-scenario |

### Ready For UX/UI Fix

| Kort | Status | Akseptanse |
|---|---|---|
| DEMO-UX-01: Gjør 3-stegs flyt synlig | Ready | UI viser `Beskriv saken`, `Foreløpig KI-diagnose`, `Tweak og lag notat` som hovedstruktur |
| DEMO-UX-02: Lavfriksjon start | Ready | Første skjerm har dropdown, 2-3 klikkvalg, ett fritekstfelt og tydelig knapp |
| DEMO-UX-03: Bekreft antakelser | Ready | Saksutkast, fagfelt, hull og KI-bruksoppgave må bekreftes med ja/endre før diagnose |
| DEMO-UX-04: Stoppregler før rolle | Ready | Røde flagg plasseres visuelt over foreløpig tillatt KI-bruk |
| DEMO-UX-05: Demp compliance-signaler | Ready | Trafikklys og prosent flyttes ned eller omdøpes som prioriterings-/grunnlagssignal |
| DEMO-UX-06: Demo-polering | Ready | Layout fungerer på laptop-projektor, med tydelig hierarki og lesbar norsk tekst |
| DEMO-UX-07: Scenariofelt per tema | Ready | Hvert aktivert tema/randsone har felt for simulert hendelse, antakelse, tidlige signaler, lokal verifikasjon og eier |

### Blocked / Må Avklares

| Kort | Status | Hva må avklares |
|---|---|---|
| E2E timeout | Blocked | Testen passerer, men kommandoen avslutter ikke rent innen 120 sekunder |
| Hard notat-sperre | Open | Avklar om manglende beslutningseier/lokal verifikasjon skal blokkere notat eller bare merke det foreløpig |
| Kompassgrafikk i MVP | Open | Avklar om demoen trenger enkel visuell kompassplassering eller bare tekstlig diagnose |

### Later

| Kort | Status | Begrunnelse |
|---|---|---|
| Flere KI-spor side om side | Later | Nyttig etter første diagnose, men for tungt i startbildet |
| Ekspertmodus for indikatorvekter | Later | Risiko for poengjakt i demo |
| Full compliance-/revisjonsflyt | Not now | Strider mot prosjektets kanoniske retning |

## Antigravity-prompt

```text
Du skal gjøre UX/UI-fiks for HR Strategiradar i C:\Users\larse\Documents\ki-beslutningsradar.

Les først:
- AGENTS.md
- CONTEXT.md
- CLAUDE.md
- state/context/current_context.md
- docs/agents/ui-ux-subagent.md
- app_spec/ui_3_stegs_startflyt_og_kanban.md
- reviews/ui_ux/001_3_stegs_mvp_ui_review.md

Målet er en kul, trygg demo. Appen skal fremstå som en fasilitert workshopflate for prosjektgruppe, ikke som compliance-fasit, juridisk godkjenningsmotor eller revisjonssertifikat.

Prioriter:
1. Gjør tre hovedsteg tydelige: Beskriv saken -> Foreløpig KI-diagnose -> Tweak og lag notat.
2. Lag lavfriksjon start: relevant dropdown, maks 2-3 klikkvalg, ett fritekstfelt.
3. Vis antakelser som må bekreftes før diagnose brukes videre.
4. Vis konkret KI-bruksoppgave som vurderingsenhet. Ikke score hele HR-prosjektet.
5. Vis stoppregler/røde flagg før foreløpig tillatt KI-bruk.
6. Demp eller omdøp compliance-prosent, trafikklys, signering og lås slik at de fremstår som støtte for etterspor, ikke godkjenning.
7. Behold lokal prototype-lås som "låst for denne prototypeøkten", ikke revisjonssikker signatur.
8. Legg til scenariofelt per aktivert tema/randsone/linsepakke: simulert hendelse, utløsende antakelse, berørte parter, tidlige signaler, konsekvens, lokal verifikasjon og ansvarlig eier.
9. Formuler scenariofeltet som: "Hvis dette blir utfallet: ...". Dette er ROS/scenariotenking, ikke score.

Ikke gjør:
- Ikke bygg database, backend, innlogging eller flerbrukerflyt.
- Ikke gjør score til fasit.
- Ikke gjør forklarbarhet til kompassakse.
- Ikke slå sammen målklarhet og separabilitet.
- Ikke gjør linser til kompassdimensjoner eller scoreakser.
- Ikke legg til flere hovedsteg.
- Ikke skjul stoppregler bak rolle, score eller notatstatus.

Demo-case:
- Start med HRR-01 Seniorbevaring i hjemmetjenesten.
- Vis forskjellen mellom "strukturere anonymisert innsikt og tiltakshypoteser" og "prioritere ansatte".

Verifiser etter endring:
- npm test
- npm run build
- npm run test:e2e eller forklar hvorfor E2E fortsatt henger etter passert test
- Manuell browser-sjekk av hovedflyten på laptopbredde
```

## Minste nyttige test før demo

Kjør én gjennomgang på projektor/laptopbredde:

1. Velg HRR-01.
2. Bruk støtteoppgaven først.
3. Bekreft antakelser.
4. Vis foreløpig KI-diagnose.
5. Bytt til individrettet oppgave og vis at stoppreglene bremser.
6. Lag foreløpig beslutningsnotat.
7. Si høyt: "Dette er beslutningsgrunnlag og øvingsflate, ikke godkjenning."
