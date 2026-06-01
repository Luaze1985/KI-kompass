---
title: MVP decisions
date: 2026-05-12
status: ready
tags: [planning, decisions, mvp]
category: planning
---

# MVP Decisions

| Dato | Beslutning | Begrunnelse |
|---|---|---|
| 2026-05-12 | Bruk produksjonsbasens sprintpakke-mønster før appbygging. | Gir tydelige gates og hindrer at byggeren må gjette. |
| 2026-05-12 | Forkast `stateful_graph` for første MVP. | Claude-grillingen viste at en passiv sekvensiell wizard dekker behovet bedre. |
| 2026-05-12 | Bruk `architect_builder_verifier` som arbeidsmodell. | Arkitektur, bygging og verifisering må holdes adskilt. |
| 2026-05-12 | Bruk prosjekteier selv som første bruker, i konsulentrollen. | MVP-en skal testes på reelle kundescenarioer uten å måtte støtte selvbetjent bruker først. |
| 2026-05-12 | Bruk strategisk HR / livsfasepolitikk-mikroprosjekter som første beslutningstype. | Gir et konkret, krevende domene for målklarhet, separabilitet og kontrollkrav. |
| 2026-05-12 | Bruk passiv wizard med tilbake-knapp som første MVP-format. | Sokratisk motpart og linsesystem parkeres til senere fase. |
| 2026-05-12 | Bruk `typescript_app` som foreløpig kodebaseprofil, men vurder enklere prototype før bygging. | MVP er sannsynligvis en lokal webapp/prototype, men framework er ikke låst. |
| 2026-05-12 | Ingen database i første MVP. | Eksport/filbasert rapport er tilstrekkelig for validering. |
| 2026-05-13 | Brukerreisen er kanonisk: kart først, deretter konkret KI-bruksoppgave, kompass, stoppregler, ansvar og rapport. | Hindrer at appen blir et generisk scoreskjema. |
| 2026-05-13 | HR-mikroprosjekt er kontekst; KI-bruksoppgave er vurderingsenheten. | Kompasset skal diagnostisere hva KI faktisk skal gjøre, ikke hele HR-prosjektet som én klump. |
| 2026-05-13 | Bildene fra grunnfundamentet skal styre produktforståelsen. | To spørsmål, fire kvadranter, feildiagnose og kompass/kart er appens visuelle og konseptuelle fundament. |
