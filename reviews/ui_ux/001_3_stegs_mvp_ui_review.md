---
title: "UI/UX-review: 3-stegs MVP for HR Strategiradar"
date: 2026-05-17
status: ready-for-antigravity-handoff
tags: [ui-ux-review, hr-strategiradar, mvp, 3-stegs-flyt, antigravity]
category: review
---

# UI/UX-review: 3-stegs MVP for HR Strategiradar

## 1. Kort dom

3-stegs UI-et er i tråd med KI-kompasset hvis det behandles som en komprimert arbeidsflate, ikke som en forkortet beslutningsmodell.

Retningen er god fordi den gir rask foreløpig diagnose uten å tvinge brukeren gjennom en tung kartlegging. Den er likevel bare forsvarlig hvis Steg 1 lager et minimumskart, Steg 2 viser stoppregler før rolle, og Steg 3 krever aktiv bekreftelse av antakelser før notatet kan brukes som beslutningsgrunnlag.

Den største UI-risikoen er at "rask diagnose" oppleves som "rask anbefaling". MVP-en må derfor være streng på språk, rekkefølge og synlig usikkerhet.

## 2. Kritiske UI/UX-risikoer

1. **Diagnosen kan bli lest som fasit.** Hvis Steg 2 viser en tydelig rolle eller score uten nok forbehold, vil brukeren kunne tolke dette som godkjenning av KI-bruk.
2. **KI-bruksoppgaven kan bli for uklar.** Hvis appen vurderer hele HR-saken samlet, mister den skillet mellom mikroprosjekt og konkret KI-bruksoppgave.
3. **Stoppregler kan bli sekundære advarsler.** Røde flagg må vises før foreløpig tillatt KI-bruk, ikke som små merknader etterpå.
4. **Dropdowns kan late som dekningen er komplett.** Fagfelt må presenteres som "fagfelt vi har grunnlag for å vurdere", ikke som full HR-juridisk eller organisatorisk dekning.
5. **Chatbot-antakelser kan skli inn som fakta.** Alle foreslåtte saksfelt, fagfelt, hull og KI-bruksoppgaver må ha klikkbar bekreftelse: ja, nei eller endre.
6. **Tweak-steget kan bli en ekspertkonsoll.** Hvis Steg 3 viser for mange indikatorer, scorer og tekniske felter, blir MVP-en tung og flytter brukeren fra vurdering til poengjakt.
7. **Flere KI-spor kan komme for tidlig.** Flere spor er nyttig etter første diagnose, men vil forvirre på første skjerm hvis brukeren ikke først har forstått én valgt KI-bruksoppgave.

## 3. Anbefalt første MVP-skjermstruktur

### Steg 1: Beskriv saken

Formål: Få nok kontekst til å lage et minimumskart og foreslå én første KI-bruksoppgave.

Skjermen bør ha:

- én dropdown for fagfelt/case-mal
- maks tre klikkspørsmål
- ett fritekstfelt
- en tydelig knapp: **Lag foreløpig diagnose**

Etter innsending viser appen et bekreftelseskort før diagnose brukes videre:

```text
Dette antar vi:
- Saken gjelder: [kort saksutkast]
- Aktuelle fagfelt vi har grunnlag for å vurdere: [liste]
- Første KI-bruksoppgave: [forslag]
- Viktige hull: [liste]

[Ja, bruk dette] [Endre] [Nei, start på nytt]
```

### Steg 2: Se foreløpig KI-diagnose

Formål: Gi rask verdi uten å gi en endelig anbefaling.

Skjermen bør være ett diagnosepanel med denne rekkefølgen:

1. **Dette vurderer vi nå**: valgt KI-bruksoppgave, ikke hele HR-saken.
2. **Dette kan KI trolig hjelpe med**: lavrisiko støtteoppgaver.
3. **Dette bør KI ikke gjøre nå**: individrettede, rettighetsnære eller uverifiserbare oppgaver.
4. **Stoppregler og røde flagg**: før rolle.
5. **Foreløpig tillatt KI-bruk**: etter stoppregler.
6. **Hull som må avklares**: lokal verifikasjon, beslutningseier, data, medvirkning eller logg.

### Steg 3: Tweak og lag notat

Formål: La brukeren korrigere diagnosen uten å gjøre appen til et langt skjema.

Skjermen bør ha kompakte redigeringskort:

- **KI-bruksoppgave**: behold, bytt til annet forslag eller skriv egen.
- **Fagfelt og randsoner**: legg til eller fjern fra begrenset liste.
- **Røde flagg**: bekreft ja/nei/uklart.
- **Lokal verifikasjon**: kort tekstfelt for hva som må sjekkes.
- **Beslutningseier**: rolle eller funksjon.
- **Notatstatus**: "klart som foreløpig notat" eller "mangler avklaringer".

Knappen bør hete **Lag foreløpig beslutningsnotat**, ikke "Fullfør" eller "Godkjenn".

## 4. Steg 1: Datafelt, dropdowns og klikkvalg

### Må finnes

| Felt | UI-type | Merknad |
|---|---|---|
| `case_template_or_field` | Dropdown | Bare fagfelt/case-maler med grunnlag i prosjektet. |
| `case_description` | Fritekst | Ett felt. Brukeren beskriver saken med egne ord. |
| `ai_intent` | Klikkvalg | Hva brukeren håper KI kan bidra med. |
| `people_affected` | Klikkvalg | Om ansatte, søkere, lærlinger, ledere, brukere/pasienter eller andre påvirkes. |
| `impact_level_hint` | Klikkvalg | Om output kan påvirke arbeid, rettigheter, helse, økonomi eller vesentlige interesser. |

### Anbefalte dropdownvalg i første MVP

- Livsfasepolitikk og seniorbevaring
- Sykefravær og tilrettelegging
- Rekruttering
- Arbeidstid, HMS og langvakter

Disse bør merkes som:

```text
Fagfelt vi har grunnlag for å vurdere i denne MVP-en
```

### Anbefalte klikkvalg

For `ai_intent`:

- Strukturere grunnlag
- Lage utkast eller agenda
- Lage scenarioer
- Foreslå tiltak
- Prioritere eller rangere
- Jeg er usikker

For `people_affected`:

- Ansatte
- Jobbsøkere
- Lærlinger
- Ledere/HR
- Brukere eller pasienter
- Uklart

For `impact_level_hint`:

- Kan påvirke arbeid eller rettigheter
- Kan berøre helse, HMS eller tilrettelegging
- Bruker bare anonymisert eller aggregert grunnlag
- Uklart

## 5. Steg 2: Hva foreløpig diagnose må vise og ikke vise

### Må vise

- At diagnosen gjelder én konkret KI-bruksoppgave.
- Hva appen antar om saken, og om antakelsene er bekreftet.
- Foreløpig vurdering av målklarhet og separabilitet, uten å gjøre dem til poengjakt.
- Stoppregler før foreløpig tillatt KI-bruk.
- Forskjell på "KI kan støtte" og "KI bør ikke gjøre".
- Hvilke hull som må avklares lokalt.
- Om beslutningslogg kreves før videre bruk.
- At eventuell rolle er foreløpig og begrenset av stoppregler.

### Må ikke vise

- Endelig score som hovedresultat.
- "Anbefalt løsning" som om appen har tatt beslutningen.
- Automatisk grønt lys for KI fordi målet virker tydelig.
- Kontrollkrav som tredje kompassakse.
- Fagfelt/randsoner som kompassdimensjoner.
- Rangering, match-score eller individrettede forslag i HR-caser.
- Full rapportstatus hvis beslutningseier, verifikasjon eller logg mangler.

## 6. Steg 3: Tweak uten tung app

Steg 3 bør bruke få, avgrensede kontroller. Brukeren skal korrigere diagnosen, ikke fylle ut hele scoremodellen.

Anbefalt mønster:

- Bruk chips/toggles for røde flagg: **arbeid/rettigheter**, **persondata**, **lokal praksis**, **relasjonell tillit**, **vanskelig å reversere**, **uverifiserbart grunnlag**.
- Bruk korte valg for status: **bekreftet**, **uklart**, **ikke relevant**.
- Bruk ett begrunnelsesfelt som bare vises når brukeren overstyrer en antakelse.
- Vis live-effekt med enkel tekst: "Dette senker mulig KI-rolle til utforskende støtte".
- Hold stoppregler låst synlig over rollefeltet.
- La flere KI-spor vises som en sekundær handling: **Vurder et annet KI-spor**.

Steg 3 skal ikke vise alle indikatorvekter, full beregningsmodell eller avansert ekspertmodus i første MVP.

## 7. Eksakte ordvalg

### UI bør bruke

- **Foreløpig KI-diagnose**
- **Dette vurderer vi nå**
- **Foreslått KI-bruksoppgave**
- **Fagfelt vi har grunnlag for å vurdere**
- **Dette kan KI trolig hjelpe med**
- **Dette bør KI ikke gjøre nå**
- **Røde flagg**
- **Stoppregler**
- **Foreløpig tillatt KI-bruk**
- **Må avklares lokalt**
- **Beslutningseier**
- **Bekreft antakelser**
- **Endre antakelse**
- **Lag foreløpig beslutningsnotat**

### UI må unngå

- **Fasit**
- **Endelig resultat**
- **Godkjent for KI**
- **KI anbefaler**
- **Automatiser dette**
- **Trygt å automatisere**
- **Objektiv score**
- **Ranger ansatte**
- **Match-score**
- **Prediksjon av ansatt**
- **Alle fagfelt dekket**
- **Fullført vurdering** når hull fortsatt finnes

## 8. Kanban

### Must

| Kort | Akseptansekriterium |
|---|---|
| MVP-UX-01: Maks tre synlige steg | UI viser bare Beskriv saken, Foreløpig diagnose, Tweak og notat. |
| MVP-UX-02: Én vurderingsenhet | Steg 2 viser eksplisitt hvilken KI-bruksoppgave diagnosen gjelder. |
| MVP-UX-03: Aktiv bekreftelse | Chatbot-antakelser brukes ikke videre før bruker klikker ja, nei eller endre. |
| MVP-UX-04: Stoppregler før rolle | Røde flagg vises før foreløpig tillatt KI-bruk. |
| MVP-UX-05: Foreløpig språk | Første output heter foreløpig KI-diagnose, ikke resultat eller anbefaling. |
| MVP-UX-06: Begrensede fagfelt | Dropdowns viser bare MVP-fagfelt med kildegrunnlag. |

### Should

| Kort | Akseptansekriterium |
|---|---|
| MVP-UX-07: KI-kan/KI-bør-ikke | Diagnosepanelet skiller tydelig mellom støtteoppgaver og oppgaver som må bremses. |
| MVP-UX-08: Hullsynlighet | Manglende lokal verifikasjon, beslutningseier og logg vises som egne hull. |
| MVP-UX-09: Lett tweakflate | Brukeren kan korrigere fagfelt, KI-bruksoppgave og røde flagg uten ekspertmodus. |
| MVP-UX-10: Notatstatus | Notatet merkes som foreløpig eller mangler avklaringer. |

### Later

| Kort | Begrunnelse |
|---|---|
| LATER-UX-01: Flere KI-spor side om side | Nyttig etter første diagnose, men for tungt i startbildet. |
| LATER-UX-02: Full kompassgrafikk | Bør vente til diagnoseflyten er validert med caser. |
| LATER-UX-03: Ekspertmodus for indikatorer | Kan øke presisjon senere, men gir poengjakt i MVP. |
| LATER-UX-04: Utvidet fagfeltbibliotek | Krever mer kildegrunnlag og validering. |

### Not now

| Kort | Begrunnelse |
|---|---|
| NO-UX-01: 8-9 synlige steg | Strider mot brukerkravet om rask foreløpig diagnose. |
| NO-UX-02: Rolle før stoppregler | Bryter stoppregel- og scorekontrakten. |
| NO-UX-03: Score som hovedresultat | Skaper falsk presisjon og overreliance. |
| NO-UX-04: Individrangering i HR | Treffer arbeid, rettigheter, separabilitet og persondata-risiko. |
| NO-UX-05: Full appbygging fra reviewen | Reviewen er handoff-grunnlag, ikke implementeringsordre. |

## 9. Åpne spørsmål til bruker

1. Skal første MVP kun støtte de fire primærcasene HRR-01, HRR-02, HRR-04 og HRR-07, eller skal dropdownen vise alle åtte HR-caser fra testsettet?
2. Skal Steg 2 vise en enkel visuell kompassplassering i MVP, eller bare tekstlig vurdering av målklarhet og separabilitet?
3. Hvor hard skal sperren være når beslutningseier eller lokal verifikasjon mangler: bare tydelig advarsel, eller blokkere generering av foreløpig beslutningsnotat?
