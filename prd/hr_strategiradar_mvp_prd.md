---
title: "PRD: HR Strategiradar MVP"
date: 2026-05-12
status: draft-for-approval
tags: [prd, mvp, typescript, hr-strategi, livsfasepolitikk, ki-beslutningsradar]
category: prd
---

# PRD: HR Strategiradar MVP

## Problembeskrivelse

Prosjekteier eller rådgiver trenger en praktisk appflate for å teste KI-beslutningsradaren på strategiske HR-mikroprosjekter sammen med en prosjektgruppe. Dagens grunnlag har gode konsepter, dimensjoner, stoppregler, caser og HR-kontekst, men vurderingen er fortsatt fil- og notatbasert.

Risikoen uten app er at modellen enten blir for abstrakt, eller at score oppfattes som en fasit. Særlig i HR-saker kan høy målklarhet gi falsk trygghet hvis separabilitet, human oversight, lokal praksis, rettigheter, persondata eller relasjonell tillit ikke vurderes før KI-rolle foreslås.

MVP-en skal gjøre vurderingen testbar, sporbar og repeterbar uten å bygge produksjonssystem, database, revisjonsarkiv eller automatisk beslutningsmotor.

## Foreslått løsning

Bygg en lokal TypeScript-webapp med arbeidstittel **HR Strategiradar**.

Appen skal være en avansert, men avgrenset, React/Vite-workbench som hjelper prosjekteier eller rådgiver i konsulentrollen med å fasilitere en prosjektgruppe som skal:

1. beskrive et strategisk HR-mikroprosjekt
2. velge konkret KI-bruksoppgave eller delbeslutning som skal vurderes
3. koble saken til HR-strategiområde, prosess og randsoner
4. få foreslått målklarhet og separabilitet basert på indikatorer
5. svare på utvalgte verdivurderingspunkter
6. vurdere stoppregler før score tolkes
7. vurdere kontrollkrav for forklarbarhet, human oversight og anti-overreliance
8. skille `beregnet_rolle` fra `forelopig_tillatt_rolle`
9. arbeide gjennom ROS-punkter og fylle beslutningslogg når risikoen krever det
10. eksportere et Markdown- og JSON-basert rapportutkast

Første tracer bullet-case er:

> Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

Denne casen skal teste at appen håndterer strategisk HR, livsfasepolitikk, lokal praksis, HMS/personvern-randsoner, menneskelig ansvar og risiko for falsk automatiseringsanbefaling.

## Mål

- Gjøre kompasset og dimensjonene praktisk testbare i en app.
- Validere at stoppregler alltid går foran score.
- Vise forskjell på beregnet KI-rolle og tillatt KI-rolle.
- Gjøre HR-randsoner og lokal verifikasjon synlige.
- Lage en rapport som kan brukes som arbeidsnotat for prosjektgruppen og konsulentnotat videre.
- Holde domenelogikk deterministisk og testbar før eventuell LLM-integrasjon.

## Ikke-mål

- Appen skal ikke fatte HR-beslutninger.
- Appen skal ikke behandle sensitive personopplysninger.
- Appen skal ikke gi juridiske råd.
- Appen skal ikke være en generell HR-chatbot.
- Appen skal ikke ha database, innlogging, flerbrukerflyt eller deploy i første versjon.
- Appen skal ikke bruke stateful graph, sokratisk motpart eller agentorkestrering i første versjon.
- Appen skal ikke gjøre full AI Act-compliance.
- Appen skal ikke være compliance-fasit, revisjonssertifikat eller juridisk godkjenningsmotor.
- Appen skal ikke anbefale automatisert beslutning i HR-høyrisiko-caser.

## Primærbruker

Første bruker er prosjekteier eller rådgiver i rollen som konsulent/fasilitator for en prosjektgruppe.

Brukeren skal kunne bruke appen til å strukturere en reell arbeidsøkt der prosjektgruppen vurderer en konkret KI-bruksoppgave mot radaren, fullfører ROS-punkter, dokumenterer human-in-the-loop og lager et beslutningsnotat før eventuell kundedialog, intern gjennomgang eller videre produktutvikling.

## Brukerhistorier

### UH-01: Opprette strategisk HR-mikroprosjekt

Som konsulent/fasilitator vil jeg beskrive et HR-mikroprosjekt med prosjektgruppen, inkludert målgruppe, ønsket effekt, beslutningseier, berørte parter, sikre fakta og usikkerhet, slik at vurderingen starter med kontekst før score.

Akseptanse:

- appen krever tittel, strategiområde, mål, målgruppe og beslutningseier før videre vurdering
- appen lar bruker skille mellom sikre fakta og usikkerhet
- appen varsler at persondata ikke skal registreres

### UH-01B: Velge KI-bruksoppgave

Som konsulent/fasilitator vil jeg beskrive nøyaktig hva KI skal brukes til i HR-mikroprosjektet, slik at appen vurderer riktig enhet og ikke beregner på hele HR-prosjektet som én klump.

Akseptanse:

- appen krever `ai_task_title`, `ai_task_type`, `input_data_type`, `output_use` og `human_decision_point`
- appen skiller mellom strukturering, oppsummering, forslag, klassifisering, rangering og beslutning
- appen viser at KI-bruksoppgaven er vurderingsenheten for kompasset
- appen bremser bruksoppgaver som prioriterer, rangerer eller beslutter på individnivå

### UH-02: Koble til HR-prosess og randsoner

Som konsulent/fasilitator vil jeg se hvilke HR-prosesser og randsoner saken kan aktivere, slik at prosjektgruppen ikke vurderer KI-rolle løsrevet fra HR-ansvar, juss, HMS, personvern eller strategi.

Akseptanse:

- appen foreslår relevante HR-prosesser basert på strategiområde og triggere
- appen viser aktiverte randsoner med begrunnelse
- appen lager første versjon av `handover_packet`

### UH-03: Vurdere målklarhet og separabilitet

Som konsulent/fasilitator vil jeg få indikatorbasert forslag til målklarhet og separabilitet, slik at kompasset blir praktisk uten at prosjektgruppen må taste alle enkeltscorer manuelt.

Akseptanse:

- appen viser indikatorer som trekker opp eller ned score
- appen viser målklarhet og separabilitet separat
- appen forklarer hvorfor høy målklarhet ikke alene gir høy KI-rolle

### UH-04: Svare på verdivurderingspunkter

Som konsulent/fasilitator vil jeg gjøre eksplisitte menneskelige verdivurderinger med prosjektgruppen, slik at appen ikke later som om strategisk HR kan avgjøres av teknisk score.

Akseptanse:

- appen spør om relasjonell tillit, lokale unntak, menneskelig nærvær, reversibilitet og verdikonflikt
- svarene påvirker stoppregler, rolle-tak eller kontrollkrav
- appen viser hva AI ikke kan vurdere godt

### UH-05: Se stoppregler før KI-rolle

Som konsulent/fasilitator vil jeg se stoppregler før rollen foreslås, slik at røde flagg ikke drukner i score.

Akseptanse:

- stoppregler vises før `beregnet_rolle`
- kritiske stoppregler setter rolle-tak
- score kan aldri overstyre stoppregel

### UH-06: Skille beregnet rolle fra tillatt rolle

Som konsulent/fasilitator vil jeg se både beregnet og foreløpig tillatt KI-rolle, slik at prosjektgruppen kan forklare hvorfor en sak ikke bør automatiseres selv om deler av den scorer høyt.

Akseptanse:

- appen viser `beregnet_rolle`
- appen viser `forelopig_tillatt_rolle`
- appen viser begrunnelse for avvik mellom rollene

### UH-07: Fylle beslutningslogg

Som konsulent/fasilitator vil jeg fylle en beslutningslogg sammen med prosjektgruppen når saken er høy risiko, slik at menneskelig vurdering, motargument, lokal verifikasjon, ROS-punkter og ansvar blir dokumentert.

Akseptanse:

- høy-risiko saker krever høy-risiko-logg
- appen krever forhåndsvurdering, motargument, verifikasjon, usikkerhet og sluttvurdering
- appen lar ikke høy-risiko rapport fullføres uten obligatoriske loggfelt

### UH-08: Eksportere rapport

Som konsulent/fasilitator vil jeg eksportere rapport til Markdown og JSON, slik at vurderingen kan brukes videre uten database.

Akseptanse:

- Markdown-rapporten kan leses som konsulentnotat
- JSON-eksporten inneholder samme vurderingsresultat maskinlesbart
- rapporten viser HR-kontekst, stoppregler, rolle-tak, kontroller, beslutningsloggkrav og lokal verifikasjon

## Appflyt

```text
1. Strategikart
2. KI-bruksoppgave
3. HR-prosess og randsoner
4. KI-kompass
5. Stoppregler
6. Kontrollkrav
7. Rolle-tak og KI-rolle
8. Beslutningslogg og handover
9. Rapportutkast
```

Tilbake-navigering skal rekalkulere alle nedstrøms vurderinger.

## Datamodell på konseptnivå

### `HrMicroproject`

- `id`
- `title`
- `strategyArea`
- `goal`
- `targetGroups`
- `decisionOwner`
- `affectedParties`
- `timeHorizon`
- `knownFacts`
- `uncertainties`
- `triggers`

### `AiUseTask`

- `id`
- `title`
- `taskType`
- `inputDataType`
- `outputUse`
- `humanDecisionPoint`
- `directEffectOnPeople`
- `usesPersonalOrSensitiveData`

### `ValueJudgments`

- `relationalTrustImportant`
- `humanPresencePartOfValue`
- `localExceptionsMatter`
- `valueConflictPresent`
- `errorReversible`
- `rightsOrWorkImpact`
- `sensitiveOrPersonalDataRisk`

### `RiskFlags`

- `workOrRightsImpact`
- `healthOrHmsImpact`
- `personalDataRisk`
- `vulnerableGroup`
- `localPracticeDependency`
- `relationalTrustDependency`
- `irreversibleOrHardToCorrect`

### `ModuleScores`

- `maalklarhetScore`
- `separabilitetScore`
- `forklarbarhetOversightScore`
- `antiOverrelianceScore`
- `kompassScore`
- `kontrollScore`

### `AssessmentResult`

- `triggeredStopRules`
- `roleCap`
- `maalklarhetScore`
- `separabilitetScore`
- `compassScore`
- `controlScore`
- `calculatedRole`
- `allowedRole`
- `requiredControls`
- `decisionLogRequired`

### `DecisionLog`

- lavrisiko-loggfelter fra `decision_model/beslutningslogg_kontrakt.md`
- høy-risiko-loggfelter fra `decision_model/beslutningslogg_kontrakt.md`

### `HandoverPacket`

- `owner`
- `activatedRandsoner`
- `reason`
- `requiredLocalVerification`
- `nextControlPoint`

## Edge cases og feilhåndtering

### EC-01: Bruker legger inn persondata

Appen skal vise tydelig varsel og be bruker anonymisere. Første MVP skal ikke lagre eller sende persondata til ekstern modell.

### EC-02: Høy målklarhet, lav separabilitet

Appen skal vise at KI kan støtte analyse eller struktur, men ikke overta beslutning. `SR-02` skal kunne sette tak til `utforskende støtte`.

### EC-03: Stoppregel utløses etter at bruker har fylt score

Appen skal rekalkulere rolle-tak og vise at score ikke overstyrer stoppregelen.

### EC-04: Høy-risiko logg mangler

Appen skal utløse `SR-05` og hindre rapportstatus som "klar".

### EC-05: Bruker går tilbake og endrer strategiområde

Appen skal rekalkulere HR-prosess, randsoner, stoppregler, rolle-tak og rapport.

### EC-06: Ingen HR-randsone aktiveres

Appen skal fortsatt kreve lokal verifikasjon hvis saken berører arbeid, rettigheter, HMS, persondata eller relasjonell tillit.

### EC-07: Lavrisiko sak

Appen skal tillate enklere logg, men fortsatt skille beregnet rolle fra tillatt rolle.

## Tekniske begrensninger

- Første versjon er lokal webapp.
- Første versjon har ingen backend.
- Første versjon har ingen database.
- Første versjon bruker manuell eksport til Markdown og JSON.
- Domenelogikk skal være rene TypeScript-funksjoner.
- AI-lag skal være adapterbasert, men første versjon bruker deterministisk provider.
- Sensitive opplysninger skal ikke sendes til LLM.
- Testgrunnlag skal ligge som fixtures/seeds.

## Implementasjonsbeslutninger

- Stack: Vite + React + TypeScript.
- Validering: Zod.
- Skjema: React Hook Form.
- State: Zustand eller lokal reducer; første plan bruker Zustand for tydelig delt arbeidsflate-state.
- Tester: Vitest for domenelogikk, React Testing Library for komponenter, Playwright for hovedflyt.
- Persistens: eksport, ikke lagring.
- Første case: seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

## Akseptansekriterier for MVP

- Bruker kan kjøre seniorbevaring-casen fra strategikart til rapport.
- Appen vurderer stoppregler før rolle.
- `beregnet_rolle` og `forelopig_tillatt_rolle` er separate.
- HR-randsoner vises med begrunnelse.
- Høy-risiko saker krever beslutningslogg.
- Rapport viser KI-støtte, begrensninger, kontroller, lokal verifikasjon og handover.
- Testene viser at HR-høyrisiko ikke får falsk automatiseringsanbefaling.
- Appen kan kjøres lokalt uten backend.

## Første evalsett

MVP-en skal testes mot:

- seniorbevaring i hjemmetjenesten
- fleksibel tilrettelegging i ulike livsfaser
- lærlingløp med frafallsrisiko
- strategisk rekruttering av kritisk lederrolle
- høy sykefraværs-/HMS-risiko
- omstilling med høy uro
- minst de relevante høyrisiko-casene fra `testcases/runde_1_testcaser.md`

## Avhengigheter

- `concepts/dimensjoner.md`
- `decision_model/scoremodell_runde_1.md`
- `decision_model/stoppregel_og_scorekontrakt.md`
- `decision_model/beslutningslogg_kontrakt.md`
- `app_spec/avansert_typescript_hr_strategiradar.md`
- `app_spec/arbeidsflyt_og_beregningsmodell.md`
- HR-kontekst fra Learning Lab som seedes inn i appen, ikke kobles live

## Beslutning før implementering

PRD-en kan brytes ned i issues nå.

Før appkode starter, må bruker godkjenne issue-rekkefølgen og første byggesteg.
