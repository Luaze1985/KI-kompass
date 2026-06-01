---
title: "UI-retning: 3-stegs startflyt for HR Strategiradar"
date: 2026-05-17
status: ready-for-ui-ux-subagent-review
tags: [ui, brukerreise, grill-me, hr-strategiradar, kanban]
category: app-spec
---

# UI-retning: 3-stegs startflyt for HR Strategiradar

## Formål

Dette notatet lagrer brukerens ønsker fra UI-grillingen før UI/UX-subagentreview og senere Antigravity-handoff.

Målet er å komprimere KI-kompassets kartlegging til en lett brukeropplevelse:

```text
Steg 1: Beskriv saken
Steg 2: Se foreløpig KI-diagnose
Steg 3: Tweak og lag notat
```

Appen skal fortsatt følge KI-kompassets lagdeling, men ikke vise brukeren en lang 8-9 stegs prosess.

## Brukerønsker som er låst inn

- UI skal ha maks 3 hovedsteg.
- Første skjerm skal ikke kreve mye arbeid.
- Brukeren skal få rask verdi og raskt se et foreløpig resultat.
- Appen skal primært avklare om KI kan hjelpe, og på hvilken måte.
- Det skal være maks 2-3 spørsmål i startinntaket.
- Starten skal ha ett fritekstfelt.
- Brukeren skal kunne velge alternativer med klikkbare valg, tilsvarende tappbare `ask_user_input_v0`-valg.
- Chatboten skal anta og lage forslag, men brukeren skal aktivt bekrefte med ja/nei eller endring.
- Chatboten skal ikke gi endelig score, rolle eller fasit før bruker har bekreftet antakelser.
- Dropdowns skal bare vise relevante fagfelt der prosjektet har data eller kildegrunnlag.
- Fagfelt/randsoner skal presenteres som "fagfelt vi har grunnlag for å vurdere", ikke som garanti om at alt er dekket.
- Flere KI-spor er lurt, men skal først komme etter runde 1 / første foreløpige diagnose, ikke som første brukeroppgave.
- KI skal hjelpe brukeren med å oppdage hull i saken og foreslå hva som må avklares.
- Brukeren skal kunne tweake diagnosen etter første resultat.

## Sjekk mot KI-kompassets README-grunnlag

Retningen er i tråd med grunnlaget hvis disse vilkårene holdes:

| Kompasspremiss | Konsekvens for 3-stegs UI |
|---|---|
| Kart må komme før kompass. | Startinntaket lager et minimumskart, og chatboten foreslår manglende kartfelter som hull. |
| Kompasset bruker målklarhet og separabilitet. | Første diagnose kan vise foreløpig plassering, men må markeres som foreløpig til antakelser er bekreftet. |
| Delbeslutning/KI-bruksoppgave er vurderingsenheten. | Steg 2 må eksplisitt vise hvilken KI-bruksoppgave diagnosen gjelder. |
| Stoppregler begrenser score. | Steg 2 viser stoppregler før foreløpig tillatt KI-bruk. |
| Kontrollkrav er ikke kompassakse. | Kontrollkrav vises som krav/hull, ikke som tredje akse i grafikken. |
| Linser/fagfelt er ikke kompassdimensjoner. | Fagfelt/randsoner vises som aktiverte fagområder og handover, ikke som scoreakse. |
| Foreløpig KI-rolle er anbefaling, ikke beslutning. | UI bruker språk som "foreløpig KI-diagnose" og "foreløpig tillatt KI-bruk". |

## Avklart spenning fra grillingen

Det finnes en reell spenning:

```text
Kompassgrunnlaget sier: kartlegg først.
Brukerønsket sier: ikke lag en tung kartleggingsapp.
```

Løsning:

```text
Kartlegging skjer i to nivåer.

Nivå 1: Lett inntak med dropdown, 2-3 spørsmål og fritekst.
Nivå 2: AI foreslår saksmappe, fagfelt, hull og KI-bruksoppgave.
Bruker bekrefter aktivt før diagnosen kan brukes som beslutningsgrunnlag.
```

## Foreslått 3-stegs UI

### Steg 1: Beskriv saken

Brukerinput:

- Dropdown for relevant fagfelt/case-mal der vi har data.
- Maks 2-3 klikkspørsmål.
- Ett fritekstfelt.

Eksempel for langvakter:

```text
Fagfelt/case-mal:
Arbeidstid / HMS / helse og omsorg / langvakter

Klikkvalg:
- Gjelder saken arbeidstid eller turnus?
- Kan ansatte eller brukere bli direkte påvirket?
- Skal KI bare strukturere grunnlag, eller også foreslå tiltak?

Fritekst:
Vi vurderer langvakter i en hjemmetjenesteenhet med rekrutteringsutfordringer.
```

Systemoutput:

- foreslått saksmappe
- foreslåtte fagfelt/randsoner
- foreslått KI-bruksoppgave for første diagnose
- tydelige hull
- aktiv bekreftelse: ja/nei/endre

### Steg 2: Se foreløpig KI-diagnose

Brukeren skal raskt se:

- Dette tror vi saken gjelder.
- Dette kan KI trolig hjelpe med.
- Dette bør KI ikke gjøre.
- Aktive fagfelt/randsoner.
- Hull som må avklares.
- Foreløpig målklarhet/separabilitet.
- Stoppregler.
- Foreløpig tillatt KI-bruk.

Språkregel:

```text
Ikke kall dette "resultat".
Kall det "foreløpig KI-diagnose".
```

### Steg 3: Tweak og lag notat

Bruker kan:

- justere fagfelt/randsoner
- endre eller bekrefte KI-bruksoppgaven
- bekrefte hull eller legge til manglende info
- justere målklarhet/separabilitet med begrunnelse
- fylle beslutningseier og lokal verifikasjon
- generere beslutningsnotat

Systemet skal:

- oppdatere diagnosen live
- holde stoppregler synlige før rolle
- vise hva KI ikke skal gjøre
- eksportere Markdown/JSON-notat

### Scenariofelt per tema, randsone og linsepakke

Scenarioarbeid skal være en synlig del av Steg 3. Når appen aktiverer et tema, en randsone eller en linsepakke, skal brukeren kunne fylle ut en kort simulert hendelse:

```text
Hvis dette faktisk blir utfallet, hva skjer konkret?
```

Dette skal ikke bli en ny kompassakse eller score. Feltet er et ROS- og scenariofelt som hjelper prosjektgruppen å konkretisere konsekvenser, tidlige signaler og lokal verifikasjon.

Anbefalt feltsett per aktivert tema:

| Felt | Formål |
|---|---|
| `tema_eller_linsepakke` | Hvilket tema, randsone eller linsepakke scenarioet gjelder. |
| `simulert_hendelse` | Kort beskrivelse av hva som konkret skjer hvis utfallet inntreffer. |
| `utfallstype` | For eksempel tillit, HMS, arbeid/rettigheter, personvern, økonomi, drift, politikk/offentlighet eller leverandør/system. |
| `tidshorisont` | Når hendelsen kan vise seg: umiddelbart, 1-3 måneder, 6-12 måneder eller senere. |
| `berørte_parter` | Hvem som merker utfallet først. |
| `utløsende_antakelse` | Hvilken antakelse må være sann for at scenarioet skal bli relevant. |
| `tidlige_signaler` | Hva prosjektgruppen bør se etter før utfallet materialiserer seg. |
| `konsekvens_hvis_ikke_håndtert` | Hva som skjer hvis temaet overses. |
| `stoppregel_eller_ros_punkt` | Hvilken stoppregel, rødt flagg eller ROS-oppgave scenarioet kobles til. |
| `lokal_verifikasjon` | Hva som må sjekkes lokalt før KI-output brukes. |
| `ansvarlig_eier` | Hvem som må følge opp scenarioet. |

Eksempel for HRR-01:

| Tema | Simulert hendelse hvis utfallet skjer |
|---|---|
| Arbeid/rettigheter | Tiltakshypotesene brukes indirekte til å peke ut senioransatte som bør få eller ikke få tiltak. |
| Relasjonell tillit | Ansatte opplever at livsfasepolitikken er laget av KI uten reell medvirkning. |
| Personvern/system | Anonymiserte innspill kan kobles tilbake til små enheter eller enkeltpersoner. |
| Strategi/økonomi | Tiltak prioriteres etter antatt effekt uten at lokale bemanningsforhold er verifisert. |

UI-mønster:

- Vis scenariofeltene som små kort under hvert aktivert tema.
- Start hvert kort med én setning: `Hvis dette blir utfallet: ...`
- La brukeren merke scenarioet som `lav`, `middels` eller `høy` bekymring, men ikke regn dette inn i kompasset.
- Koble hvert kort til `Må avklares lokalt` og beslutningsnotatet.
- Skjul full linsetaksonomi; vis bare temaet/randsonen og hvorfor den er aktivert.

## Kanban før UI/UX-subagentreview

### Må godkjennes før plan

| Kort | Status | Akseptanse |
|---|---|---|
| UI-01: 3 hovedsteg | Klar for review | Appflyten vises som Start, Foreløpig diagnose, Tweak/notat. |
| UI-02: Aktiv bekreftelse | Klar for review | Chatbotforslag må bekreftes med ja/nei/endre før de brukes videre. |
| UI-03: Relevante dropdowns | Klar for review | Dropdowns viser bare fagfelt/case-maler der vi har data eller researchgrunnlag. |
| UI-04: Foreløpig diagnose | Klar for review | Første output merkes tydelig som foreløpig, ikke fasit. |
| UI-05: Flere KI-spor etter runde 1 | Klar for review | Flere KI-spor vises etter første diagnose, ikke som første skjerm. |

### Planlegg i MVP

| Kort | Status | Akseptanse |
|---|---|---|
| MVP-UI-01: Startinntak | Ikke startet | Maks 2-3 spørsmål, ett fritekstfelt og relevante dropdownvalg. |
| MVP-UI-02: Chat-assistert struktur | Ikke startet | Chatbot lager saksutkast, antakelser og prompt/caseforslag. |
| MVP-UI-03: Bekreftelseskort | Ikke startet | Brukeren kan klikke ja/nei/endre på antakelser. |
| MVP-UI-04: Diagnosepanel | Ikke startet | Viser KI-hjelp, KI-nei, fagfelt, hull, stoppregler og foreløpig tillatt bruk. |
| MVP-UI-05: Tweakflate | Ikke startet | Brukeren kan justere vurderingen og se endring i diagnose. |
| MVP-UI-06: Notatgenerator | Ikke startet | Beslutningsnotat bygges fra bekreftet diagnose og åpne hull. |
| MVP-UI-07: Scenariofelt per tema | Ikke startet | Hvert aktivert tema/randsone kan få en simulert hendelse, tidlige signaler, konsekvens, lokal verifikasjon og ansvarlig eier. |

### Vent til etter første fungerende sløyfe

| Kort | Status | Begrunnelse |
|---|---|---|
| LATER-01: Full grafisk kompassvisning | Vent | Kompasset bør komme etter første diagnose og bekreftelse. |
| LATER-02: Mange KI-spor side om side | Vent | Nyttig etter runde 1, men for tungt som første skjerm. |
| LATER-03: Avansert ekspertkonsoll | Vent | Kan bli scorejakt før modellen er trygg. |
| LATER-04: LLM/research-agent i produksjonsflyt | Vent | Research må lande i kildefiler først. |

### Skal ikke gjøres nå

| Kort | Status | Begrunnelse |
|---|---|---|
| NO-01: 8-9 synlige steg | Avvist | For tungt for bruker og strider mot ønsket om rask diagnose. |
| NO-02: Chatbot bestemmer fagfelt | Avvist | Bruker skal aktivt bekrefte antakelser. |
| NO-03: "Alle fagfelt er dekket" | Avvist | UI kan bare si hvilke fagfelt vi har grunnlag for å vurdere. |
| NO-04: Rolle før stoppregler | Avvist | Bryter stoppregel- og scorekontrakten. |
| NO-05: Score som fasit | Avvist | Bryter kompassgrunnlaget og grillingen. |

## Foreløpig anbefaling

Godkjenn denne UI-retningen før ny implementeringsplan:

```text
3-stegs hurtigdiagnose:
1. Beskriv saken
2. Se foreløpig KI-diagnose
3. Tweak og lag notat
```

Backend-planen bør deretter justeres slik at første API-sløyfe støtter:

- `intakeOptions`
- `draftCaseFromInput`
- `confirmAssumptions`
- `previewDiagnosis`
- `updateDiagnosis`
- `generateDecisionNote`
