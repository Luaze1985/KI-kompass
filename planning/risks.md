---
title: MVP risks
date: 2026-05-12
status: ready
tags: [planning, risks, mvp]
category: planning
---

# MVP Risks

| Risiko | Konsekvens | Mottiltak |
|---|---|---|
| Første bruker glir fra konsulent til selvbetjent kunde | Appen får feil språk, flyt og kontrollnivå. | Hold MVP til prosjekteier som konsulent. |
| Livsfasepolitikk blir for bredt | Testcaser og UI blir generiske. | Kjør flyten per mikroprosjekt, ikke på porteføljen samlet. |
| Rolle oppfattes som fasit | Falsk trygghet og overautomatisering. | Skill `beregnet_rolle` fra `forelopig_tillatt_rolle`. |
| Beslutningslogg blir for tung | Bruker dropper logg eller omgår prosess. | Skille lavrisiko-logg og høy-risiko-logg. |
| Stoppregler blir skjulte advarsler | Score dominerer brukerens vurdering. | Stoppregler må vises før rolle. |
| MVP blir compliance-system | Scope blir for tungt. | Hold full AI Act-vurdering utenfor MVP. |
| Stateful graph sniker seg inn igjen | Første prototype blir unødvendig tung. | Bruk lineær wizard med tilbake-knapp og nedstrøms rekalkulering. |
