---
title: "Handoff til Antigravity: første MVP for HR Strategiradar"
date: 2026-05-17
status: ready-with-context-correction
tags: [handoff, antigravity, mvp, ui-ux, hr-strategiradar]
category: handoff
---

# Handoff til Antigravity: første MVP for HR Strategiradar

## Kontekstoppdatering 2026-05-23

Dette handoffet kan fortsatt brukes for første MVP-slice, men må leses etter `CONTEXT.md`, `CLAUDE.md`, `state/context/current_context.md` og `docs/agents/domain.md`. HR Strategiradar er arbeidsverktøy og øvingsarena for en fasilitert prosjektgruppe, ikke selvbetjent scoreapp, compliance-fasit eller revisjonssertifikat.

## Oppdrag

Bygg første MVP av HR Strategiradar som en lokal TypeScript/React-workbench med en 3-stegs brukerflyt:

```text
1. Beskriv saken
2. Se foreløpig KI-diagnose
3. Tweak og lag notat
```

MVP-en skal gi rask verdi: brukeren skal innen kort tid få en foreløpig diagnose av om KI kan hjelpe i en HR-sak, hva KI ikke bør gjøre, hvilke stoppregler som er relevante, og hvilke hull som må avklares før notat kan brukes.

## Les først

Bruk disse filene som styrende kontekst:

0. `AGENTS.md`
1. `CONTEXT.md`
2. `CLAUDE.md`
3. `state/context/current_context.md`
4. `docs/agents/domain.md`
5. `handoff/antigravity_first_mvp/prompt.md`
6. `README.md`
7. `concepts/kart_og_kompass.md`
8. `decision_model/lagskille_og_beslutningsflyt.md`
9. `decision_model/stoppregel_og_scorekontrakt.md`
10. `app_spec/ui_3_stegs_startflyt_og_kanban.md`
11. `reviews/ui_ux/001_3_stegs_mvp_ui_review.md`
12. `docs/superpowers/plans/2026-05-17-hr-strategiradar-backend-mvp.md`
13. `testcases/hr_strategiradar_realistiske_caser.md`

## Viktigste produktregel

Ikke bygg en lang kartleggingsapp. Bygg en hurtig diagnose med redigerbar begrunnelse.

Men:

```text
Rask diagnose må ikke bli rask anbefaling.
```

Første output skal hete **Foreløpig KI-diagnose**, ikke resultat, fasit eller anbefaling.

## Modellregler som ikke kan brytes

- Kart må finnes før kompass.
- HR-saken er kontekst; KI-bruksoppgaven er vurderingsenheten.
- Målklarhet og separabilitet er kompassaksene.
- Forklarbarhet, kontroll og anti-overreliance er kontrollkrav, ikke kompassakse.
- Fagfelt/randsoner er ikke kompassdimensjoner.
- Stoppregler vises før foreløpig tillatt KI-bruk.
- Score eller grafikk skal aldri overstyre stoppregler.
- Automatisert beslutning skal ikke anbefales i HR-høyrisiko-caser.

## Standardvalg for første MVP

Disse standardvalgene avklarer åpne spørsmål fra UI/UX-reviewet:

1. Dropdown viser bare fire primærcaser i første MVP:
   - HRR-01 Seniorbevaring i hjemmetjenesten
   - HRR-02 Gradert sykefravær og tilrettelegging
   - HRR-04 Rekruttering av kritisk helsefagkompetanse
   - HRR-07 Langvakter i helsesektoren

2. Steg 2 viser tekstlig vurdering først, ikke full grafisk kompassvisning.
   - Det kan vises en enkel miniindikator for målklarhet/separabilitet.
   - Full grafisk kompasskvadrant skal vente.

3. Hvis beslutningseier eller lokal verifikasjon mangler:
   - MVP kan generere et **foreløpig notat med mangler**.
   - MVP skal ikke kalle notatet beslutningsklart.

## Steg 1: Beskriv saken

### Mål

Få nok minimumskart til at systemet kan foreslå en første KI-bruksoppgave og en foreløpig diagnose.

### UI

Skjermen skal ha:

- én dropdown for fagfelt/case-mal
- maks tre klikkspørsmål
- ett fritekstfelt
- knapp: **Lag foreløpig diagnose**

### Dropdown

Label:

```text
Fagfelt vi har grunnlag for å vurdere i denne MVP-en
```

Valg:

- Livsfasepolitikk og seniorbevaring
- Sykefravær og tilrettelegging
- Rekruttering
- Arbeidstid, HMS og langvakter

### Klikkspørsmål

Spørsmål 1:

```text
Hva håper du KI kan bidra med?
```

Valg:

- Strukturere grunnlag
- Lage utkast eller agenda
- Lage scenarioer
- Foreslå tiltak
- Prioritere eller rangere
- Jeg er usikker

Spørsmål 2:

```text
Hvem kan bli påvirket?
```

Valg:

- Ansatte
- Jobbsøkere
- Lærlinger
- Ledere/HR
- Brukere eller pasienter
- Uklart

Spørsmål 3:

```text
Kan output påvirke arbeid, rettigheter, helse eller vesentlige interesser?
```

Valg:

- Ja
- Nei
- Uklart
- Bruker bare anonymisert eller aggregert grunnlag

### Fritekst

Label:

```text
Beskriv saken kort
```

Eksempel:

```text
Vi vurderer langvakter i en hjemmetjenesteenhet med rekrutteringsutfordringer.
```

### Etter innsending

Systemet viser et bekreftelseskort før diagnose brukes videre:

```text
Dette antar vi:
- Saken gjelder: ...
- Aktuelle fagfelt vi har grunnlag for å vurdere: ...
- Første KI-bruksoppgave: ...
- Viktige hull: ...

[Ja, bruk dette] [Endre] [Nei, start på nytt]
```

## Steg 2: Se foreløpig KI-diagnose

### Mål

Gi rask verdi uten å gi endelig anbefaling.

### Diagnosepanel må vise i denne rekkefølgen

1. **Dette vurderer vi nå**
   - Vis valgt KI-bruksoppgave.
   - Skriv tydelig at diagnosen ikke gjelder hele HR-saken.

2. **Dette kan KI trolig hjelpe med**
   - Lavere risikostøtte, eksempelvis strukturere grunnlag, lage agenda, lage kontrollspørsmål.

3. **Dette bør KI ikke gjøre nå**
   - Individrettet prioritering, rangering, tildeling eller beslutning.

4. **Stoppregler og røde flagg**
   - Vises før rolle.
   - Vis SR-koder med kort menneskelig forklaring.

5. **Foreløpig tillatt KI-bruk**
   - Bruk språk som `utforskende støtte` eller `forsterket skjønn`.
   - Vis om rollen er senket av stoppregler.

6. **Hull som må avklares**
   - beslutningseier
   - lokal verifikasjon
   - datagrunnlag
   - medvirkning/partsbilde
   - beslutningslogg

### Steg 2 må ikke vise

- endelig score som hovedresultat
- "godkjent for KI"
- "trygt å automatisere"
- "KI anbefaler"
- full grafisk kompasskvadrant som hovedflate
- individrangering eller match-score

## Steg 3: Tweak og lag notat

### Mål

La bruker korrigere diagnosen uten at appen blir et langt skjema.

### UI-mønster

Bruk kompakte redigeringskort:

- KI-bruksoppgave: behold, bytt til annet forslag, eller skriv egen.
- Fagfelt og randsoner: legg til/fjern fra begrenset liste.
- Røde flagg: bekreft ja/nei/uklart.
- Lokal verifikasjon: kort tekstfelt.
- Beslutningseier: rolle/funksjon.
- Notatstatus: foreløpig notat eller mangler avklaringer.

### Live-effekt

Når bruker endrer et rødt flagg, vis enkel tekst:

```text
Dette senker mulig KI-bruk til utforskende støtte.
```

eller:

```text
Dette fjerner ikke stoppregelen før lokal verifikasjon er fylt ut.
```

### Notatknapp

Bruk:

```text
Lag foreløpig beslutningsnotat
```

Ikke bruk:

```text
Fullfør
Godkjenn
Publiser
```

## Data/API-kontrakter som MVP bør støtte

Første implementering kan være lokal og deterministisk. Den trenger disse funksjonelle kontraktene:

```text
GET /api/intake/options
POST /api/intake/draft
POST /api/intake/confirm
POST /api/diagnosis/preview
POST /api/diagnosis/update
POST /api/reports/decision-note
```

Hvis backend ikke er klar, kan frontend starte med samme kontrakter som mock-data, men kontraktene må være lette å bytte til backend.

## Første case for vertikal sløyfe

Start med HRR-07:

```text
Langvakter i helsesektoren
```

Hvorfor:

- tvinger frem arbeidstid, HMS, hvile, pasient-/brukersikkerhet og avtaleverk
- passer godt til dropdown/intake
- viser forskjell på KI-hjelp og KI-nei
- hindrer at MVP-en blir for generell eller for scorepreget

Deretter test mot:

- HRR-01 Seniorbevaring
- HRR-02 Sykefravær/tilrettelegging
- HRR-04 Rekruttering

## UI-ordvalg

### Bruk

- Foreløpig KI-diagnose
- Dette vurderer vi nå
- Foreslått KI-bruksoppgave
- Fagfelt vi har grunnlag for å vurdere
- Dette kan KI trolig hjelpe med
- Dette bør KI ikke gjøre nå
- Røde flagg
- Stoppregler
- Foreløpig tillatt KI-bruk
- Må avklares lokalt
- Beslutningseier
- Bekreft antakelser
- Endre antakelse
- Lag foreløpig beslutningsnotat

### Unngå

- Fasit
- Endelig resultat
- Godkjent for KI
- KI anbefaler
- Automatiser dette
- Trygt å automatisere
- Objektiv score
- Ranger ansatte
- Match-score
- Prediksjon av ansatt
- Alle fagfelt dekket
- Fullført vurdering

## Kanban for Antigravity

### Must

| Kort | Akseptansekriterium |
|---|---|
| AG-MVP-01: 3-stegs shell | UI viser bare Beskriv saken, Foreløpig diagnose, Tweak og notat. |
| AG-MVP-02: Startinntak | Dropdown, maks tre klikkspørsmål, ett fritekstfelt. |
| AG-MVP-03: Aktiv bekreftelse | Chatbot-/systemantakelser brukes ikke videre før bruker klikker ja/endre/nei. |
| AG-MVP-04: Diagnosepanel | Viser KI-kan, KI-bør-ikke, stoppregler, foreløpig tillatt KI-bruk og hull. |
| AG-MVP-05: Tweakflate | Bruker kan korrigere KI-bruksoppgave, fagfelt, røde flagg, beslutningseier og lokal verifikasjon. |
| AG-MVP-06: Foreløpig notat | Genererer notat som merkes foreløpig eller mangler avklaringer. |

### Should

| Kort | Akseptansekriterium |
|---|---|
| AG-MVP-07: HRR-07 tracer | Langvaktcasen fungerer ende til ende. |
| AG-MVP-08: Fire dropdown-caser | HRR-01, HRR-02, HRR-04 og HRR-07 er tilgjengelige. |
| AG-MVP-09: Miniindikator | Enkel tekstlig/visuell målklarhet/separabilitet uten full kompassgrafikk. |
| AG-MVP-10: Hullmarkering | Beslutningseier og lokal verifikasjon påvirker notatstatus. |

### Later

| Kort | Begrunnelse |
|---|---|
| AG-LATER-01: Full grafisk kompassvisning | Etter første diagnoseflyt er validert. |
| AG-LATER-02: Mange KI-spor side om side | Etter runde 1 / første diagnose. |
| AG-LATER-03: Ekspertmodus | Kan gi scorejakt i MVP. |
| AG-LATER-04: Research-agent i produksjonsflyt | Research må lande i kildefiler først. |

### Not now

| Kort | Begrunnelse |
|---|---|
| AG-NO-01: 8-9 synlige steg | For tungt og strider mot brukerens krav. |
| AG-NO-02: Chatbot bestemmer fagfelt | Bruker må aktivt bekrefte. |
| AG-NO-03: Rolle før stoppregler | Bryter modellen. |
| AG-NO-04: Score som fasit | Skaper falsk presisjon. |
| AG-NO-05: Individrangering i HR | Høy risiko og ikke MVP-mål. |

## Verifisering før levering

Antigravity bør verifisere:

- HRR-07 kan kjøres fra Steg 1 til foreløpig notat.
- Første output heter Foreløpig KI-diagnose.
- Stoppregler vises før foreløpig tillatt KI-bruk.
- Bruker må bekrefte antakelser før diagnosen brukes.
- Manglende beslutningseier eller lokal verifikasjon gir notatstatus med mangler.
- UI viser ikke "godkjent", "fasit", "trygt å automatisere" eller tilsvarende språk.

## Ikke endre

- Ikke endre råpakker under `archive/source_packages/`.
- Ikke bygg database, auth eller produksjonsdeploy.
- Ikke legg inn ekstern LLM/research-agent i første MVP.
- Ikke gjør full grafisk kompassvisning til startflate.
