# Anvendelseskart: Antigravity-funn og rekkevidde

Status: styringsdraft, ikke aktivt bibliotekinnhold
Opprettet: 2026-05-19
Formål: Avklare hvor Antigravity-arbeidet kan brukes, hva som er modent nok til neste fase, og hvilke grenser som må ligge fast før MVP eller bred implementering.

---

## 1. Kort konklusjon

Antigravity har ikke levert ett ferdig produkt. Det har levert et grunnlag for å styre et filbasert linseforvaltningssystem:

- lokale linser kan bli primær analysemotor
- AgentForge kan bli metode-, kvalitetssikrings- og evalueringslag
- PersonaNexus kan bli tone-, grense- og handoff-lag
- Prism kan bli metodekatalog, men er lisensblokkert for innholdsgjenbruk
- Orkestratoren må ligge foran linsene og velge analyseteam før faglig analyse starter

Rekkevidden er derfor større enn en MVP, men bare noen deler er klare for praktisk prototyping.

---

## 2. Modenhetsnivåer

| Nivå | Betegnelse | Betydning |
|---|---|---|
| R0 | Kilde / katalog | Kan leses som kilde eller prioriteringskart, men ikke brukes som operativt innhold |
| R1 | Styringsdraft | Kan styre arbeid, backlog, fasegater og vurderinger |
| R2 | Normaliseringsklar | Kan gjøres om til draft-fil/registerpost med liten risiko |
| R3 | Prototypeklar | Kan testes på case, men ikke brukes som produksjonsstandard |
| R4 | Pilotklar | Kan prøves i avgrenset prosjekt etter godkjent case-test |
| R5 | Produksjonsklar | Aktivert, testet, dokumentert og forvaltningsmessig godkjent |

Ingen Antigravity-avledede artefakter er R5.

---

## 3. Antigravity-funn etter anvendelse

| Kilde / worker-run | Hva Antigravity ga | Nåværende nivå | Anbefalt bruk | Ikke gjør |
|---|---|---:|---|---|
| `ORKESTRERING_CODEX_ANTIGRAVITY.md` | Arbeidsdeling: Codex som kontrolltårn, Antigravity som worker | R1 | Brukes som styringsmodell for analyse, registergate, lisensgate og aktivering | Ikke la worker endre aktive registre direkte |
| `worker_runs/local_lenses_batch1/` | Fem lokale linsekandidater: A1, D1, C1, J1, L1 | R2 | Normaliseres til draft-filer og brukes som første kjernepakke for analyseteam | Ikke behandle dem som nye eksterne linser |
| `worker_runs/agentforge_metadata_inventory/` | Metoder for promptlag, handoff, guardrails, evaluator og gap-analyse | R1-R2 | Ekstraheres som metode- og QA-lag for Linselab | Ikke importer AgentForge-runtime eller Python-flyt |
| `worker_runs/persona_yaml_analysis/` | Fem rådgiverprofiler med tone, grenser og outputformer | R2-R3 | Koble som Lag 2 til eksisterende linser via `PERSONANEXUS_PROFILE_MAPPING.yml` | Ikke gjør profilene til primære linser |
| `worker_runs/prism_metadata_inventory/` | 742 Prism-instrumenter indeksert som metadata | R0 | Brukes til triage, navngiving og prioritering | Ikke kopier, adapter eller normaliser Prism-tekst |
| `worker_runs/prism_persona_gap_triage/` | 15 Prism-katalogkandidater koblet til PersonaNexus-gap | R0-R1 | Brukes som fremtidig metodekart når lisens er avklart | Ikke marker dem som case-test-klare |
| `worker_runs/prism_license_overview_gate/` | Lisensstatus: blokkert | R1 | Brukes som hard gate for Prism | Ikke omgå lisensstopp med parafrasert innhold |

---

## 4. Primære anvendelsesmuligheter

### 4.1 Generisk analyseteam for administrative problemstillinger

Dette er den viktigste rekkevidden. Orkestratoren mottar saken, velger 3-5 linser, vekter dem fra 0.0 til 1.0, beskriver forventede spenninger og sender saken videre som deterministiske handoffs.

Egnet for:

- kommunale og administrative beslutningssaker
- stabs- og ledervurderinger
- HR-, organisasjons- og risikosaker
- komplekse saker der juridiske, økonomiske, menneskelige og gjennomføringsmessige hensyn kolliderer

Modenhet: R2-R3 når A4 Orkestratoren er case-testet.

### 4.2 Linsefabrikk

AgentForge-funnene er spesielt sterke som produksjonsmetodikk. Verdien ligger i å tvinge hver linse til å ha:

- trigger-to-technique-logikk
- konkrete heuristikker
- outputmarkører
- fasegate
- evaluerbare kvalitetskriterier
- bevart varians mot nærliggende linser

Modenhet: R1-R2. Klar for å styre normalisering av lokale linser før bred bruk.

### 4.3 Kvalitetssikring og evaluering

AgentForge `guardrail_auditor`, `skill_reviewer`, `evaluator` og `gap_analyzer` peker mot et eget QA-lag for Linselab.

Mulig bruk:

- score case-output fra 0.0 til 1.0
- finne svakeste kriterium i en linse
- skille mellom dekning, kvalitet og reell nytte
- logge hva en generisk ChatGPT-respons ikke fant
- oppdage når en linse bare gjentar brukerens premiss

Modenhet: R1-R2. Bør først kobles til `CASE_TEST_LOG.md`.

### 4.4 Kommunikasjonslag for rollebaserte svar

PersonaNexus-profilene har verdi når de begrenses til Lag 2:

- Lex gir juridisk disclaimer, jurisdiksjonssjekk og advokateskalering til D1
- Beacon gir severity, known unknowns og neste oppdatering til D2
- Board Advisor gir governance-memo og usikkerhetsmarkering til K1
- Coral gir empatisk mottak og handoff til L2
- Fable gir forfatterautonomi og craft-feedback til H3

Modenhet: R2-R3. Klar for case-test, men ikke aktiv.

### 4.5 Metodekatalog og fremtidig verktøykasse

Prism har størst volum, men lavest juridisk modenhet. Metadataene viser stor potensiell rekkevidde:

- 327 lenses
- 106 frames
- 139 models
- 80 stances
- 90 heuristics

Anvendelsen nå er bare triage og prioritering. Reell innholdsbruk krever lisensavklaring og semantisk duplikatsjekk mot lokale linser.

Modenhet: R0-R1.

### 4.6 Konsulent- og workshopformat

Linselab kan bli et analyseformat for konsulentarbeid dersom caseformatet standardiseres:

- oppdragsbeskrivelse
- aktører
- handlingsrom
- beslutningsnivå
- risiko
- tidshorisont
- hva brukeren allerede tror
- hva analyseteamet utfordrer

Verdien er ikke bare struktur. Verdien er å finne blindsoner, spenninger og prinsipielle konsekvenser som brukeren ikke allerede har formulert.

Modenhet: R1 nå, R3 etter Orkestrator-case.

---

## 5. Anbefalt rekkefølge før MVP

1. Etabler dette anvendelseskartet som styrende rekkeviddedokument.
2. Normaliser Batch 1-linsene: A1, D1, C1, J1 og L1.
3. Case-test A4 Orkestratoren på én bred administrativ problemstilling.
4. Koble AgentForge QA-metoder til `CASE_TEST_LOG.md`.
5. Test én analyseteamrunde med A4 + 3-5 linser + J1 evaluering.
6. Test PersonaNexus som tone-/handoff-lag bare etter at primærlinsen fungerer.
7. Hold Prism som katalog til lisensgate er lukket.
8. Først deretter defineres MVP-scope.

---

## 6. Hva som kan brukes allerede

Kan brukes nå som styring:

- `LINSE_PROMPT_STANDARD.md`
- `AGENTFORGE_METHOD_DRAFTS.yml`
- `PERSONANEXUS_PROFILE_MAPPING.yml`
- `ORKESTRERING_CODEX_ANTIGRAVITY.md`
- dette anvendelseskartet

Kan brukes nå som kilde til normalisering:

- `worker_runs/local_lenses_batch1/batch1_candidates.jsonl`
- lokale linsekilder i `KJERNELINSER.md.txt` og øvrige Linselab-kilder

Kan brukes nå bare som triage:

- Prism-metadata
- Prism Persona-gap shortlist

Skal ikke aktiveres ennå:

- PersonaNexus-profiler
- AgentForge-metoder
- Prism-instrumenter
- nye eller normaliserte linser uten case-test

---

## 7. Foreslåtte anvendelsespakker

| Pakke | Formål | Første linser/profiler | Nødvendig gate |
|---|---|---|---|
| Kjerneanalyse | Bred administrativ vurdering | A1, C1, D1, J1, L1 | Batch 1-normalisering |
| Juridisk risiko | Hjemmel, compliance og prosesskrav | D1 + persona-lex | CT-PN-LEX-001 |
| Krise og hendelse | Risiko, status og eskalering | D2 + persona-beacon | CT-PN-BEACON-001 |
| Stabsbeslutning | Governance, mandat og syntese | K1 + persona-board-advisor | CT-PN-BOARD-001 |
| Operativ oppfølging | Oppgavebryting, frontlinje og handoff | L1, L2 + persona-coral | CT-PN-CORAL-001 |
| Narrativ vurdering | Tekst, historie og retorisk effekt | H3 + persona-fable | CT-PN-FABLE-001 |
| Kvalitet og motstand | Robusthet, blindsoner og alternativ forklaring | J1 + af-case-evaluator | Case-score i `CASE_TEST_LOG.md` |

---

## 8. Beslutningsgrenser

- Markdown og registerfiler er master.
- Antigravity-funn er worker-output, ikke aktiv autoritet.
- Linsen er Lag 1 og beholder faglig mandat.
- PersonaNexus er Lag 2 og styrer bare tone, grensemarkering og handoff.
- AgentForge er metode- og kvalitetslag, ikke runtime.
- Prism er katalog til lisensgate er avklart.
- Ingen fri agentdialog innføres. Alt handoff skjer som artefakter.
- Ingen ny linse aktiveres uten case-test, variansvurdering og merge-beslutning.

---

## 9. Suksesskriterier for neste fase

Neste fase er vellykket når systemet kan vise en konkret sak der:

- Orkestratoren velger relevante linser før analyse
- hver linse bruker egen metode, ikke bare rollebeskrivelse
- minst én uventet blindsone eller spenning blir funnet
- J1 eller evaluator markerer svakheter i svaret
- handoff-artifakter er dokumentert
- output viser hvorfor dette ble bedre enn én generisk prompt

Dette er terskelen før MVP-scope bør låses.
