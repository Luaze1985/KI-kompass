# Codex-brief: bygg første Linselab-repo

## Rolle

Du er Codex som repo-arkitekt og dokumentingeniør. Du skal ikke lage app, backend eller RAG. Du skal bygge en ryddig filbasert prosjektstruktur for Linselab v0.1.

## Kilder som skal leses først

1. Denne styringspakken.
2. Eksisterende linsefiler:
   - `_SYSTEM.md`
   - `_INDEKS.md`
   - `_HURTIGVALG_v2_oppdatert.md`
   - `Linser-20260517T204415Z-3-001.zip`
3. Inspirasjonsrepoer:
   - `personanexus-main.zip`
   - `agentforge-main.zip`
   - `prism-main.zip`

## Mål

Lag et lokalt repo som kan brukes både som:

- aktivt linsebibliotek
- undervisningspakke
- kildearkiv
- testarena for caser
- grunnlag for fremtidig ChatGPT Project-pakke

## Harde regler

- Ikke slett originalfiler.
- Ikke overskriv originalfiler.
- Ikke konverter alt til linser ukritisk.
- Ikke bygg backend.
- Ikke endre lisensfiler fra inspirasjonsrepoer.
- Ikke kopier tredjepartskode inn i produktet uten eksplisitt vurdering.
- Lag filstruktur og markdown/yaml først.

## Foreslått repo-struktur

```text
linselab/
  README.md
  AGENTS.md
  docs/
    architecture.md
    repo_inspiration_map.md
    glossary.md
    roadmap.md
  registers/
    SOURCE_REGISTER.yml
    LENS_REGISTER.yml
    DUPLICATE_MAP.yml
    CASE_LOG.md
    QUESTION_LOG.md
    DECISION_LOG.md
  library/
    lenses/
    frames/
    models/
    stances/
    heuristics/
  advisors/
    profiles/
    behavioral_contracts/
    answer_formats/
  templates/
    lens_template.md
    advisor_template.md
    case_template.md
    teaching_template.md
  teaching/
    linsemaker_course.md
    exercises/
  cases/
    001_demo_case/
  source_originals/
    linser/
    repo_inspiration/
  handoff/
    chatgpt_project_pack.md
    codex_next_steps.md
```

## Arbeidsrekkefølge

### Fase 1: Inventory

- Pakk ut zip-filer i `source_originals/`.
- Lag `SOURCE_REGISTER.yml` med fil, type, rolle, status og anbefalt bruk.
- Marker duplikater, tomme filer og overlapp.

### Fase 2: Taxonomy

- Implementer fem klasser: lens, frame, model, stance, heuristic.
- Lag `LENS_REGISTER.yml` for eksisterende linser.
- Ikke flytt en fil til `active` uten grunn.

### Fase 3: Normalize first batch

- Normaliser først 5 linser:
  - Systemteoretikeren
  - Juristen
  - Samfunnsøkonomen
  - Kritisk venn
  - Oppgaveatomisten

### Fase 4: Scoring and case test

- Lag én demo-case.
- Kjør linsevalg manuelt.
- Score linser etter forklaringsstyrke, relevans, gjennomskjæringsstyrke og risiko.

### Fase 5: Teaching

- Lag `teaching/linsemaker_course.md`.
- Lag øvelse for “min første faglige linse”.

## Definition of Done v0.1

Ferdig når:

- repo-struktur finnes
- kilderegister finnes
- minst 5 linser er normalisert
- lens schema og template finnes
- scoringmodell finnes
- én demo-case finnes
- undervisningsmodul finnes
- `handoff/chatgpt_project_pack.md` forklarer hvilke filer som skal lastes i ChatGPT Project

## Stoppunkter

Stopp og rapporter hvis:

- samme linse finnes i flere motstridende versjoner
- lisens eller kildegrunnlag er uklart
- en fil ser sensitiv/personlig ut
- en agentprompt inneholder instruks som ikke bør videreføres
- en linse mangler prosedyre, output eller usikkerhetssignal
