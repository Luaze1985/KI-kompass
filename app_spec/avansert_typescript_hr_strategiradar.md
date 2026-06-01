---
title: "Avansert TypeScript-app for HR-strategisk KI-dimensjonering"
date: 2026-05-12
status: proposed
tags: [typescript, hr-strategi, mvp, beslutningsradar, livsfasepolitikk]
category: app-spec
---

# Avansert TypeScript-app for HR-strategisk KI-dimensjonering

## Kort anbefaling

Bygg en avansert, lokal TypeScript-webapp som en **HR Strategiradar**:

> En arbeidsflate for å vurdere strategiske HR-mikroprosjekter, særlig livsfasepolitikk, opp mot KI-beslutningsradarens dimensjoner, stoppregler, kontrollkrav og beslutningslogg.

Appen skal ikke avgjøre HR-saker. Den skal hjelpe prosjekteier eller rådgiver med å fasilitere en prosjektgruppe som strukturerer vurderingen, ser hvor KI kan brukes, hvor KI må begrenses, hvilke HR-randsoner som aktiveres, hvilke ROS-punkter som må lukkes, og hvilket beslutningsgrunnlag som må dokumenteres.

## Kontekst som er brukt

Fra dette workspace-et:

- `concepts/dimensjoner.md`
- `decision_model/scoremodell_runde_1.md`
- `decision_model/stoppregel_og_scorekontrakt.md`
- `decision_model/beslutningslogg_kontrakt.md`
- `testcases/runde_1_testcaser.md`
- `app_spec/mvp_dimensjonering_og_vurdering.md`

Fra Learning Lab:

- `domains/kommune_org/01_organisasjonsmodell/HR_PILOT.md`
- `domains/kommune_org/01_organisasjonsmodell/HR_KJERNEPROSESSER/`
- `domains/kommune_org/02_linser/HR_RANDSONER_OG_LINSEPAKKER.md`
- `domains/kommune_org/03_agentroller/HR_TVILLING_GUARDRAILS.md`
- `domains/kommune_org/05_simulering/testsett/HR_TESTSETT_V1.md`
- `domains/kommune_org/05_simulering/testsett/HR_RANDSONE_TESTSETT_V1.md`
- `domains/kommune_org/07_moter/OPPDRAG_FORBERED_HR_MOTE.md`
- `domains/kommune_org/08_produksjon/OPPDRAG_PRODUSER_HR_LEVERANSE.md`
- `learning-ios-mvp/package.json`

## Hva slags informasjon vi har

### 1. Fagmodell for KI-vurdering

Vi har en tydelig kjerne for selve KI-vurderingen:

- målklarhet
- separabilitet
- forklarbarhet/human oversight
- anti-overreliance
- stoppregler
- rolle-tak
- beslutningslogg

Dette er nok til å bygge en deterministisk domenemodell i TypeScript. Den bør ligge som ren logikk uten UI-avhengighet.

### 2. HR-strategisk domenegrunnlag

Learning Lab gir et sterkt HR-lag:

- HR-piloten eier simulering, beslutningsstøtte, møteforberedelse og leveranseutkast.
- HR-kjerneprosessene gir prosesskort for sykefravær, strategisk rekruttering, personalsak, lærlingløp, HMS, lederutvikling og omstilling.
- HR-randsonene viser når saken må kobles til juss, lønn, politikk/administrasjon, anskaffelser, personvern/sikkerhet eller strategi/analyse.
- HR-tvillingsreglene sier at sensitive personopplysninger, juridiske råd og lokal praksis må stoppes eller verifiseres.

Dette er nok til å bygge et HR-strategilag som kan aktivere riktige kontrollspørsmål og handover-pakker.

### 3. Testgrunnlag

Vi har to testfamilier:

- Generiske beslutningsradar-caser i `testcases/runde_1_testcaser.md`.
- HR-spesifikke testsett fra Learning Lab, inkludert sykefravær, rekruttering, personalsak, lederopplæring, omstilling, HMS og randsoner.

Dette er nok til å teste at appen ikke gir falsk grønt lys i HR-saker.

### 4. App- og produksjonsoppsett

Produksjonsbasen ga struktur for:

- krav
- blueprint
- akseptansekriterier
- eval-plan
- handoff

Learning Lab har en eksisterende TypeScript/Expo-app som viser at TypeScript brukes i miljøet, men den bør ikke kopieres direkte. Denne appen bør først bygges som lokal webapp, ikke mobilapp.

## Foreslått produkt

Arbeidstittel:

> HR Strategiradar

Primærbruker:

> Prosjekteier eller rådgiver i konsulentrollen, som fasiliterer en prosjektgruppe.

Første domene:

> Strategiske HR-mikroprosjekter innen livsfasepolitikk.

Utvidbare HR-strategiområder:

- livsfasepolitikk
- strategisk rekruttering
- kompetanse- og lederutvikling
- nærvær, sykefravær og HMS
- omstilling og organisasjonsutvikling
- lærlingløp og tidlig karriere

## Kjerneflyt i appen

```text
1. Strategikart
2. HR-prosess og randsoner
3. KI-kompass
4. Stoppregler
5. Kontrollkrav
6. Rolle-tak og KI-rolle
7. Beslutningslogg og handover
8. Rapportutkast
```

### 1. Strategikart

Brukeren beskriver mikroprosjektet:

- tittel
- HR-strategiområde
- målgruppe
- ønsket effekt
- beslutningseier
- berørte parter
- tidshorisont
- hvilke lokale fakta som er sikre
- hva som er usikkert

### 2. HR-prosess og randsoner

Appen foreslår relevant HR-prosess og randsoner:

- prosesskort fra HR-piloten
- relevante roller
- mulige linser
- randsoner som må aktiveres
- lokal verifikasjon som kreves

Eksempel:

Livsfasepolitikk for seniorbevaring kan aktivere strategi/analyse, HMS, personvern/sikkerhet og eventuelt juridisk vurdering hvis tiltak påvirker rettigheter eller forskjellsbehandling.

### 3. KI-kompass

Appen vurderer målklarhet og separabilitet.

Brukeren skal ikke taste alle enkelttall manuelt. Appen bør foreslå score fra indikatorer, men brukeren må bekrefte sentrale verdivurderinger:

- Er målet stabilt eller strategisk omstridt?
- Er menneskelig nærvær del av verdien?
- Kan KI-output skilles fra helhetlig HR-skjønn?
- Finnes lokale unntak som endrer vurderingen?
- Kan feil oppdages og reverseres?

### 4. Stoppregler

Stoppregler vurderes før KI-rolle.

HR-saker bør ha konservativ default når saken berører:

- arbeid eller rettigheter
- sårbare parter
- høy relasjonell tillit
- persondata
- lokal praksis
- juridisk uklarhet
- politisk eller offentlig sensitivitet

### 5. Kontrollkrav

Appen vurderer:

- forklarbarhet
- reell overstyring
- ansvarlig beslutningseier
- motargument
- kilde- og faktaverifikasjon
- anti-overreliance

### 6. Rolle-tak og KI-rolle

Appen viser to ulike resultater:

- `beregnet_rolle`: hva scoremodellen ville gitt
- `forelopig_tillatt_rolle`: hva stoppregler og rolle-tak faktisk tillater

Dette er viktig for HR. En strategisk HR-sak kan ha høy målklarhet, men likevel lav automatiserbarhet fordi separabilitet, tillit, rettigheter eller lokal verifikasjon setter grense.

### 7. Beslutningslogg og handover

Appen lager et beslutningsspor:

- vurdering
- røde flagg
- menneskelige verdivurderinger
- overstyringer
- nødvendig lokal verifikasjon
- ansvarlig eier
- handover-pakke til relevant HR-randsone

### 8. Rapportutkast

Output bør være Markdown og JSON i første versjon.

Rapporten skal vise:

- hva saken gjelder
- hvilken HR-strategi og prosess som er aktivert
- hvilke randsoner som må kobles inn
- hvor KI kan støtte
- hva KI ikke bør gjøre
- foreløpig tillatt KI-rolle
- kontrollkrav før eventuell pilot

## Foreslått TypeScript-arkitektur

Anbefalt stack for første avanserte app:

- Vite
- React
- TypeScript strict mode
- Zod for schema og validering
- React Hook Form for skjema
- Zustand eller ren reducer for arbeidsflate-state
- Vitest for domenetester
- React Testing Library for komponenttester
- Playwright for ende-til-ende verifikasjon

Jeg anbefaler ikke Next.js i første runde med mindre serverfunksjoner, innlogging eller deploy er et eksplisitt mål. Dette er først og fremst en lokal beslutnings- og evalueringsapp.

## Modulstruktur

```text
src/
  app/
    workbench/
      StrategyMapStep.tsx
      HrContextStep.tsx
      CompassStep.tsx
      StopRulesStep.tsx
      ControlStep.tsx
      RoleCapStep.tsx
      DecisionLogStep.tsx
      ReportStep.tsx
  domain/
    radar/
      dimensions.ts
      scoreModel.ts
      stopRules.ts
      roleCap.ts
      decisionLog.ts
      assessment.ts
    hr/
      hrProcesses.ts
      hrStrategyAreas.ts
      randsoner.ts
      guardrails.ts
      handover.ts
    strategy/
      microproject.ts
      valueJudgments.ts
      localVerification.ts
    reporting/
      markdownReport.ts
      jsonExport.ts
  data/
    seeds/
      radarIndicators.ts
      hrProcesses.ts
      hrRandsoner.ts
      testCases.ts
  ai/
    DimensionSuggestionProvider.ts
    deterministicProvider.ts
    llmProviderStub.ts
  tests/
    fixtures/
```

## Viktigste domeneobjekter

```ts
export type HrStrategyArea =
  | "livsfasepolitikk"
  | "strategisk_rekruttering"
  | "kompetanse_og_lederutvikling"
  | "narvaer_sykefravaer_hms"
  | "omstilling"
  | "larling_og_tidlig_karriere";

export interface HrMicroproject {
  id: string;
  title: string;
  strategyArea: HrStrategyArea;
  goal: string;
  targetGroups: string[];
  decisionOwner: string;
  affectedParties: string[];
  timeHorizon: string;
  knownFacts: string[];
  uncertainties: string[];
}

export interface AssessmentResult {
  triggeredStopRules: string[];
  roleCap: string;
  compassScore: number;
  controlScore: number;
  calculatedRole: string;
  allowedRole: string;
  requiredControls: string[];
  decisionLogRequired: boolean;
}

export interface HandoverPacket {
  owner: string;
  activatedRandsoner: string[];
  reason: string[];
  requiredLocalVerification: string[];
  nextControlPoint: string;
}
```

## AI-lag

AI bør ikke være kjernen i første implementasjon. Kjernen bør være deterministisk og testbar.

Anbefalt kontrakt:

```ts
export interface DimensionSuggestionProvider {
  suggest(input: HrMicroproject): Promise<DimensionSuggestion>;
}
```

Første implementasjon:

- `deterministicProvider`: regelbasert forslag fra indikatorer og testdata
- `llmProviderStub`: grensesnitt for senere LLM-bruk

Regel:

> Ingen sensitive personopplysninger skal sendes til ekstern modell. Appen skal arbeide på anonymiserte strategiske beskrivelser.

## HR-caser som bør inn i eval før bygging

Legg til 6 HR-strategiske caser før UI bygges:

1. Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.
2. Fleksibel arbeidstid/tilrettelegging for ansatte i ulike livsfaser.
3. Tidlig karriere og lærlingløp med risiko for frafall.
4. Strategisk rekruttering av kritisk lederrolle med svakt kandidatmarked.
5. Høyt sykefravær og HMS-signaler i en enhet.
6. Omstillingsprosess med høy uro og behov for medvirkning.

Disse skal teste at appen klarer å skille mellom:

- høy målklarhet og lav separabilitet
- god KI-støtte og svak automatiserbarhet
- HR-faglig støtte og juridisk/personvernmessig stopp
- strategisk analyse og lokal beslutningsrett

## UI-prinsipp

Appen bør være en arbeidsflate, ikke en enkel spørreskjemaside.

Foreslått layout:

- venstre: steg, status og manglende avklaringer
- midt: aktiv vurdering
- høyre: live KI-kompass, stoppregler, rolle-tak og randsoner
- bunn eller sidepanel: beslutningslogg og rapportutkast

Viktig:

- Stoppregler vises før rolle.
- Røde flagg kan ikke drukne i score.
- Brukeren må se hvorfor appen begrenser KI-rollen.
- Rapporten skal være nyttig som konsulentnotat.

## Hva som ikke bør bygges nå

- database
- innlogging
- flerbrukerflyt
- automatisk saksbehandling
- produksjonsklar AI-integrasjon
- full juridisk vurdering
- generisk HR-chatbot
- mobilapp som første kanal
- stateful graph eller agentorkestrering i første versjon

## Teknisk anbefaling

Bygg nå:

> Vite + React + TypeScript som lokal workbench, med ren domenelogikk, Zod-schema, deterministisk eval, manuell JSON/Markdown-eksport og Playwright-verifikasjon.

Vent med:

> database, innlogging, LLM-produksjon, mobil, multiuser og agentisk orkestrering.

## Første implementeringsplan

1. Lag TypeScript-schemas for HR-mikroprosjekt, KI-vurdering, stoppregler og beslutningslogg.
2. Kod scoremodell og rolle-tak som rene funksjoner.
3. Kod HR-strategilaget: prosessvalg, randsoner og lokal verifikasjon.
4. Legg inn testcaser som fixtures.
5. Bygg workbench-UI med 8 steg.
6. Lag rapportgenerator for Markdown og JSON.
7. Kjør domenetester, komponenttester og Playwright-test på hovedflyten.

## Suksesskriterier

Appen er klar for første intern prøve når:

- en livsfasepolitikk-case kan kjøres fra strategikart til rapport
- minst en HR-randsone aktiveres riktig ved behov
- stoppregler vurderes før KI-rolle
- `beregnet_rolle` og `forelopig_tillatt_rolle` vises separat
- brukeren kan overstyre AI-forslag med begrunnelse
- rapporten viser kontrollkrav og lokal verifikasjon
- HR-høyrisiko-caser ikke får falsk automatiseringsanbefaling

## Beslutning som må tas før kode

Min anbefaling er å velge:

```text
Prototypeform: Vite + React + TypeScript
Persistens: manuell Markdown/JSON eksport, ingen database
AI: deterministisk provider først, LLM-adapter senere
Første case: livsfasepolitikk for seniorbevaring eller fleksibel tilrettelegging
```

Det eneste som må avklares før bygging er hvilken første HR-case som skal være tracer bullet.
