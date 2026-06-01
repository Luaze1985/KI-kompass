# AgentForge: Fullstendig innholdsutvinning

> Generert: 2026-05-18
> Kilde: agentforge-main.zip (MIT-lisens)
> Formål: Oversett Python-konsepter til Linselab-sjekklister og prinsipper

---

## 1. Layered Prompt Architecture (arkitekturprinsipp)

### Hva den sier
Alle prompter bygges i 6 lag med strengt prioritetshierarki:

| Lag | Prioritet | Token-budsjett | Tilsvarer i Linselab |
|-----|-----------|---------------|---------------------|
| `persona` | 1 (høyest) | 30% | Linsens rolle og teori |
| `rules` | 2 | 15% | Guardrails, "når-ikke-bruk" |
| `memory` | 3 | 15% | Kontekst fra tidligere caser |
| `wiki` | 4 | 15% | Kunnskapsbase-oppslag |
| `skills` | 5 | 15% | Utvalgt linsepakke for saken |
| `task_context` | 6 (lavest) | 10% | Selve saken som analyseres |

### Linselab-konsekvens
Når vi bygger en prompt for en linse, bør vi følge samme lagdeling:
1. Linsen sin rolletekst (persona) trumfer alltid
2. Guardrails ("Juristen gir aldri juridisk fasit") trumfer linseinnholdet
3. Tidligere variansnotater fra caseloggen kommer inn som memory
4. Kunnskapsbasen kan hentes on-demand
5. Pakkesammensetningen (hvilke linser) er en skills-avgjørelse
6. Selve saken er det minst privilegerte laget

---

## 2. Guardrail Auditor (sjekkliste for linser)

### 6 universelle sjekker (påkrevd for ALLE linser):
1. **Ingen fabrikasjon** — Aldri dikte opp fakta. Si "usikkert" istedenfor å gjette.
2. **Scope-grenser** — Hold deg innenfor linsens definerte ansvarsområde.
3. **Eskaleringssti** — Overlat til mennesker ved beslutninger med store konsekvenser.
4. **Feilhåndtering** — Rapporter feil tydelig istedenfor å anta.
5. **Konfidensmarkører** — Skill mellom sikre anbefalinger og spekulasjon.
6. **Ingen skadelig innhold** — Aldri produser skadelig eller misvisende materiale.

### 6 domene-spesifikke sjekker (aktiveres basert på linsens domene):
1. **Ingen finansrådgivning** (C1–C4) — Henvis til kvalifisert økonom.
2. **Ingen medisinsk diagnose** (E6) — Henvis til helsepersonell.
3. **Ingen juridisk rådgivning** (D1) — Henvis til jurist.
4. **Personvern** (D3–D4, G4) — Aldri eksponere persondata.
5. **Ingen diskriminering** (E5, F4) — Sikre likeverdig behandling.
6. **Ansvarlig varsling** (D4) — Ikke offentliggjør sårbarheter.

### Fix-maler
Hver sjekk som feiler har en ferdig formulering som kan injiseres i linsens "Guardrails"-seksjon. Se kildekoden for fullstendige maler.

---

## 3. Gap Analyzer (hull-analyse for linsedekning)

### Konsepter oversatt til Linselab:
- **Importance weights**: `required=1.0`, `preferred=0.5`, `nice_to_have=0.2` → Direkte overførbart til linser sin `standardvekt`
- **Category base scores**: Myk kompetanse (0.40) er vanskeligere å automatisere enn hard (0.85) → Relevant for B3/B4/E4 som er "mykere" linser
- **Human keywords**: Ord som trigger "dette trenger menneskelig vurdering": `mentor, lead, negotiate, present, interview, counsel, coach, empathize, relationship, stakeholder, executive`

### Linselab-konsekvens
Vi kan bruke disse human-nøkkelordene som en sjekk: Hvis en case inneholder disse ordene, bør den **alltid** aktivere minst én linse fra Gruppe E (Mennesker) eller L (Operasjonalisering).

---

## 4. Skill Reviewer (kvalitetssjekk for linseutkast)

### 9 kvalitetssjekker for nye linser:

| Sjekk | Prioritet | Hva den ser etter |
|-------|----------|-------------------|
| **Methodology** | Høy | Har linsen konkrete beslutningsregler (if/then), ikke bare vage ansvarsområder? |
| **Triggers** | Høy | Har linsen minst 2 trigger-situasjoner som sier når den brukes? |
| **Templates** | Medium | Finnes det konkrete output-formater? |
| **Quality criteria** | Medium | Er det definert hva "godt nok" betyr? |
| **Domain context** | Lav | Har linsen spesifikk kontekst for sitt domene, ikke generisk? |
| **Persona** | Lav | Er kommunikasjonsstilen definert (formell/uformell, kort/lang)? |
| **Scope** | Lav | Er det eksplisitte grenser for hva linsen IKKE gjør? |
| **Examples** | Medium | Er det reelle eksempler, ikke bare teori? |
| **Frameworks** | Medium | Er det navngitte rammeverk (IRAC, OODA, DACI)? |

### Linselab-konsekvens
Disse 9 sjekkene kan brukes direkte som en sjekkliste for `_NY_LINSE.md`-malen. Hver ny linse bør passere alle 9 før den flyttes fra `draft` til `active`.

---

## 5. Evaluator (LLM-som-dommer for case-testing)

### Evalueringskonsept
Evaluatoren scorer en linses output mot kvalitetskriterier:
- Score 0.0–1.0 per kriterium
- Fallback-kriterier hvis ingen er definert: "Relevant", "Demonstrerer domeneekspertise", "Godt strukturert"
- Har en heuristisk fallback uten LLM (basert på lengde og ordoverlapp)

### Standard evalueringsrapport:
- `overall_score` (gjennomsnitt av alle kriterier)
- `weakest_criteria` (de 3 svakeste)
- `recommendations` (konkrete forbedringer, f.eks. "Criterion X scored 45% — add methodology")

### Linselab-konsekvens
Kan brukes direkte i `CASE_TEST_LOG.md` for variansanalyse av linseoutput. Format:
1. Kjør en sak gjennom en linse
2. Evaluer mot linsens `kjernespørsmål` som kvalitetskriterier
3. Rapporter score og svakheter

---

## 6. Handoffs (overleveringsformat mellom linser)

### Konsept
En handoff er en rettet kant mellom to roller: `from_role → to_role`, med:
- **trigger**: Når overleveringen utløses
- **artifact**: Hva som overleveres (f.eks. "juridisk risikovurdering", "implementeringsplan")

### Eksisterende Linselab-overleveringer dette matcher:
- HR_RANDSONER: Pakke 1–6 har allerede `typisk handover`-seksjoner
- ORKESTRERING_CODEX_ANTIGRAVITY: Stage-overgangene er handoffs

### Linselab-konsekvens
Vi bør formalisere handoff-grafen mellom linsene. For eksempel:
- `D1 Juristen → K1 Stabssjefen` (trigger: juridisk risikovurdering ferdig; artifact: rettslig vurderingsnotat)
- `L1 Oppgaveatomisten → L2 Førstelinjelederen` (trigger: oppgaveliste klar; artifact: mikrooppgaveliste)
- `J1 Kritisk venn → A4 Orkestratoren` (trigger: stresstest ferdig; artifact: svakhetsrapport)

---

## 7. Wiki-Memory Design (kunnskapslagring)

### Tre-lags minnemodell
Relevant for Linselab sin arkivstruktur:
1. **Episodisk minne** — Brukers tilbakemeldinger og justeringer per case
2. **Wiki (strukturert)** — Kanoniske fakta om entiteter og konsepter
3. **Bredt arkiv** — Kildedokumenter og historikk

### Promotion Pipeline
Kunnskap går gjennom 4 steg: `capture → candidate → review → promote`
→ Direkte parallell til Codex-gate: `draft → review → active`

### Linselab-konsekvens
`source_text_extracts/` tilsvarer lag 3. `registers/` tilsvarer lag 2. Vi mangler fortsatt lag 1 (episodisk per-case-kontekst).

---

## 8. Extraction Prompts (hvordan trekke ut linseinnhold)

### Metodologi-utvinningsprompt
Denne prompten er designet for å konvertere en rollebeskrivelse til:
1. **Heuristikker** — Konkrete trigger → procedure-par
2. **Output-maler** — 3-6 domene-spesifikke leveranseformater
3. **Trigger-mappinger** — if/then-rutingsregler
4. **Kvalitetskriterier** — 5-8 evalueringspunkter

### Personlighetstrekk-dimensjoner
AgentForge bruker 10 dimensjoner for kommunikasjonsstil (0–1):
`warmth, verbosity, assertiveness, humor, empathy, directness, rigor, creativity, epistemic_humility, patience`

### Linselab-konsekvens
Vi kan bruke disse dimensjonene til å profiliere PersonaNexus-profilene og koble dem til riktig linse. F.eks.:
- Lex: `warmth=0.2, rigor=0.9, directness=0.8`
- Coral: `warmth=0.9, empathy=0.9, patience=0.9`
- Beacon: `assertiveness=0.9, directness=0.9, warmth=0.3`

---

## 9. Tilleggsfiler identifisert i analysis/

Disse ble *ikke* merket som `candidate_for_register`, men inneholder nyttige konsepter:

| Fil | Konsept | Mulig Linselab-bruk |
|-----|---------|---------------------|
| `drift_detector.py` | Måler semantisk drift over tid | Sjekke om linser gradvis endrer innhold |
| `prompt_differ.py` | Sammenligner promptversjoner | Kvalitetskontroll ved linseoppdateringer |
| `skill_linter.py` | Struktursjekk av markdown-filer | Validere at linser følger `_NY_LINSE.md`-format |
| `supplement_scorer.py` | Scorer tilleggsinformasjon | Vurdere nye kilder for linsebiblioteket |
| `cost_projector.py` | Estimerer token-kostnader | Budsjettere prompt-lengde per linse |
| `value_estimator.py` | Estimerer verdi av automatisering | Prioritere hvilke linser som er mest nyttige |

---

## 10. Prism-repo: Utvidet triage (742 instrumenter)

> **NB: Innholdsblokkert pga. manglende lisensfil. Denne seksjonen viser kun domene-kategorier og antall, ikke kopiert tekst.**

### Relevante domener for Linselab (sortert etter antall instrumenter):

| Prism-domene | Linser | Frames | Models | Stances | Heuristics | Total | Relevante Linselab-linser |
|---|---|---|---|---|---|---|---|
| **philosophy** | 10 | 4 | — | 6 | 5 | 25 | B1 Etiker, B3 Konfuciansk, B4 Tjenesteled |
| **law** | 12 | 1 | 1 | 4 | — | 18 | D1 Juristen |
| **economics** | 6 | 1 | 12 | 1 | 2 | 22 | C1–C4 |
| **psychology** | 1 | 6 | 11 | 1 | 1 | 20 | E1 Psykologen, E6 Neurologen |
| **sociology** | 3 | — | 4 | 12 | — | 19 | E2 Sosiologen, E3 Kulturanalytikeren |
| **game-theory** | — | — | 19 | — | — | 19 | L6 Maktkartlegger, C3 Politisk økonom |
| **military-strategy** | 6 | 3 | 3 | 2 | 1 | 15 | D2 Risikostyring (krisehåndtering) |
| **security** | 11 | 2 | 2 | — | — | 15 | D4 Sikkerhetsrådgiver |
| **theology** | 7 | 5 | 1 | 3 | — | 16 | Alternativt perspektiv! |
| **education** | 10 | 3 | 2 | — | 2 | 17 | Undervisningspakken |
| **decision** | 4 | 4 | 2 | — | — | 10 | K1 Stabssjef, G5 Kognitivt sinn |
| **strategy** | 6 | 5 | 4 | — | — | 15 | K2 Ledelsesstrategen |
| **operations** | 7 | — | — | 1 | 2 | 10 | L1–L2 Oppgaveatomist/Førstelinjeleder |
| **public-policy** | 2 | 1 | — | — | — | 3 | G2 Policy analyst, B2 Politisk teoretiker |
| **applied-ethics** | 5 | 1 | — | — | — | 6 | B1 Etiker |
| **negotiation** | 4 | 1 | — | — | 1 | 6 | L6 Maktkartlegger |
| **storytelling** | 3 | 4 | — | — | — | 7 | H3 Narrativ-analytiker |
| **literary-theory** | 5 | — | — | 8 | — | 13 | H3 Narrativ-analytiker |
| **political-science** | — | 1 | 2 | — | — | 3 | B2 Politisk teoretiker |
| **anthropology** | — | 2 | — | 2 | — | 4 | E3 Kulturanalytikeren |
| **communication** | 3 | — | — | — | 2 | 5 | H1 Kommunikasjonseksperten |
| **neuroscience** | 1 | — | 2 | — | — | 3 | E6 Neurologen |

### Ikke-åpenbart relevante (alternative perspektiver):
| Domene | Mulig bruk |
|--------|-----------|
| **theology** (16) | Moralfilosofisk perspektiv, naturrettstenkning |
| **ecology** (20+) | Systemtenkning, bærekraft, feedback-loops |
| **meta-science** (14) | Forskningsmetodikk, epistemologi |
| **systems-thinking** (3) | Direkte støtte til A1 Systemteoretikeren |

### Totaloppsummering Prism
- **742 instrumenter** totalt (327 linser, 106 frames, 139 modeller, 80 stances, 90 heuristics)
- **~200 instrumenter** er direkte relevante for eksisterende Linselab-linser
- **~40 instrumenter** i domener som gir alternative perspektiver (teologi, økologi, metavitenskap)
- **Status: BLOKKERT** — Ingen tekst kopiert. Kun domene-statistikk fra YAML-frontmatter.
