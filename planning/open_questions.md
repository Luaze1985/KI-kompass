---
title: MVP open questions
date: 2026-05-12
status: ready
tags: [planning, open-questions, mvp]
category: planning
---

# MVP Open Questions

## Lukket etter grill-me-runde

| Spørsmål | Svar |
|---|---|
| Hvem er første reelle bruker? | Prosjekteier eller rådgiver i konsulentrollen, som fasiliterer en prosjektgruppe gjennom en reell HR-/KI-vurdering. |
| Hva er appens primære produktform? | Arbeidsverktøy og øvingsarena for reelle prosjektvurderinger, ROS-punkter og beslutningsnotat. Ikke compliance-fasit eller revisjonssertifikat. |
| Hva er første harde beslutningstype? | Strategisk HR: livsfasepolitikk-mikroprosjekter. |
| Skal første MVP være lokal prototype, webapp eller klikkbar vurderingsflyt? | Lokal webapp/prototype med passiv wizard-flyt. |
| Skal rapporten være intern eller kunde-/ledervennlig? | Intern arbeidsrapport i første runde. |
| Skal MVP ha database? | Nei. Eksport/filbasert er nok. |
| Er `stateful_graph` riktig første arkitektur? | Nei. Enkel sekvensiell wizard er riktig for MVP. |
| Skal første app være TypeScript-basert? | Ja. Etter HR-kontekstsøk anbefales avansert Vite + React + TypeScript workbench. |
| Hvilken første HR-case skal være tracer bullet? | Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk. |
| Hvilket eksportformat er nok i første MVP? | Markdown og JSON. PDF venter. |
| Hvilke verdivurderingspunkter skal første PRD dekke? | Relasjonell tillit, menneskelig nærvær, lokale unntak, verdikonflikt, reversibilitet, arbeid/rettighetspåvirkning og persondata-/sensitivitetsrisiko. |

## Gjenstår

1. Hvor tung kan høy-risiko beslutningslogg og ROS-arbeid være før det blir upraktisk i en fasilitert prosjektgruppeøkt?
2. Hvilke ekstra strategisk HR-/livsfasepolitikk-caser må legges til etter seniorbevaring?
3. Hvilke stoppunkter må tvinge frem aktiv human-in-the-loop-vurdering før KI-output kan brukes i en reell oppgave?
4. Skal første byggesteg kjøres inline eller med subagent-drevet gjennomføring?
