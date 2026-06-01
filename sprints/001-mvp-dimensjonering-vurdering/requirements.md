---
title: MVP dimensjonering og vurdering requirements
date: 2026-05-12
status: prd-ready
tags: [sprint, requirements, mvp]
category: workflow
---

# Requirements

## Sprintmål

Definere første byggbare MVP-snitt for en passiv wizard som gjennomfører KI-beslutningsradarens dimensjoneringer og vurderinger for strategisk HR/livsfasepolitikk.

## Bakgrunn

Prosjektet har nå konseptgrunnlag, scoremodell, testcaser, stoppregelkontrakt, lagskille og beslutningsloggkontrakt. Neste steg er å gjøre dette byggbart uten å miste de faglige grensene.

## Bruker- eller systembehov

Første bruker er prosjekteier selv, i rollen som konsulent.

Første beslutningstype er strategisk HR: mikroprosjekter innenfor livsfasepolitikk.

Brukeren trenger en strukturert flyt som:

- samler beslutningskontekst
- lar AI foreslå målklarhet og separabilitet basert på indikatorer
- lar bruker gjøre utvalgte verdivurderinger
- vurderer stoppregler før rolle
- vurderer kontrollkrav
- skiller beregnet rolle fra tillatt rolle
- krever beslutningslogg når risikoen tilsier det
- lager et rapportutkast

## In scope

- En MVP-spesifikasjon for vurderingsflyt.
- Datakontrakter på konseptnivå.
- Evalplan mot runde 1-caser.
- Handoff til fremtidig bygger.
- Indikator-mapping som kalibreringsgrunnlag for AI-scoring.
- PRD for HR Strategiradar MVP.
- Lokal issue-splitt for stegvis bygging.
- Superpowers-plan for implementering.

## Out of scope

- Appkode.
- Frameworkvalg.
- Database.
- Sammenligning på tvers av mikroprosjekter.
- Sokratisk motpart.
- Linsesystem.
- Stateful graph.
- Innlogging.
- Deploy.
- Full AI Act-compliance.
- Produksjonsklar scoringmotor.

## Forretningsregler

- Kart må fylles før kompass.
- Stoppregler vurderes før score tolkes.
- Score kan ikke overstyre stoppregler.
- `beregnet_rolle` er ikke samme som `forelopig_tillatt_rolle`.
- Høy-risiko saker krever beslutningslogg.
- Automatisert beslutning er ikke første MVP-mål.

## Arbeidsflyt

1. Bruker fyller kart.
2. AI foreslår målklarhet og separabilitet med indikatorbegrunnelse.
3. Bruker svarer på utvalgte verdivurderingspunkter.
4. App vurderer stoppregler og rolle-tak.
5. Bruker vurderer kontrollkrav og menneskelige faktorer.
6. App viser beregnet rolle og foreløpig tillatt rolle.
7. Bruker fyller beslutningslogg hvis påkrevd.
8. App lager rapportutkast.

## Avklarte beslutninger

- Kodebaseprofil: avansert lokal `typescript_app`.
- Framework: Vite + React + TypeScript.
- Arkitekturmodell: passiv sekvensiell wizard, ikke `stateful_graph`.
- Arbeidsmodell: `architect_builder_verifier`.
- Persistens: ingen database; eksport/filbasert er nok.
- Eksportformat: Markdown og JSON i første versjon.
- Første tracer bullet: seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

## Åpne spørsmål

- Hvor tung høy-risiko beslutningslogg kan være før den blir upraktisk i konsulentarbeid.
- Hvilke ekstra livsfasepolitikk-caser som skal legges til etter seniorbevaring.
- Om første byggesteg kjøres inline eller subagent-drevet.
