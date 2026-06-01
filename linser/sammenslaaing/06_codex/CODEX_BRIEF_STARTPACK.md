# Codex-brief: start sammenslåing av Linselab

## Rolle

Du er Codex som repo-arkitekt og dokumentingeniør. Du skal bygge første lokale struktur for sammenslåingen av eksisterende linser, rådgiverledetekster og nye styringsfiler.

## Viktig

Dette er ikke en appjobb. Ikke bygg backend, frontend, RAG eller agent-runtime. Dette er filstruktur, registre, markdownnormalisering og testbar arbeidsflyt.

## Kilder

Les først:

1. denne startpakken
2. `linser råd.zip`
3. `linselab_styringspakke_v0_1.zip`
4. eksisterende linsefiler og linsezip
5. repo-inspirasjonene bare som referanse

## Oppgave

Lag et lokalt repo med denne minimumsstrukturen:

```text
linselab/
  README.md
  AGENTS.md
  docs/
    architecture.md
    glossary.md
    source_priority.md
  registers/
    SOURCE_REGISTER.yml
    INSTRUMENT_REGISTER.yml
    LENS_REGISTER.yml
    DUPLICATE_MAP.yml
    MERGE_DECISIONS.yml
    QUESTION_LOG.md
  source_originals/
    linser/
    styrende_kilder/
    repo_inspiration/
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
    normalized_lens_template.md
    merge_record_schema.yml
    case_template.md
  cases/
    case_001_sammenslaaing/
  teaching/
    linsemaker_start.md
  handoff/
    chatgpt_project_pack_plan.md
    next_steps.md
```

## Arbeidsrekkefølge

### 1. Inventory

Pakk ut alle kilder. Lag register. Ikke omskriv innhold.

### 2. Klassifisering

Klassifiser alt som lens/advisor_profile/frame/model/stance/heuristic/teaching/source_only.

### 3. Overlapp

Lag `DUPLICATE_MAP.yml` for like eller nesten like elementer. Ikke slå sammen ennå.

### 4. Første normalisering

Normaliser bare fem linser:

- Systemteoretikeren
- Juristen
- Samfunnsøkonomen
- Kritisk venn
- Oppgaveatomisten

### 5. Case-test

Lag ett case om sammenslåing av linsebibliotek/rådgiverledetekster. Test de fem linsene på dette.

### 6. Rapport

Lag `handoff/next_steps.md` med:

- hva som er registrert
- hva som er uklart
- hvilke linser som er klare for videre arbeid
- hvilke sammenslåinger som bør vente
- hvilke filer som bør inn i ChatGPT Project

## Definition of Done

Ferdig når:

- repo-struktur er opprettet
- kilderegister finnes
- minst 5 linser er normalisert som utkast
- duplikatkart finnes
- case-test finnes
- ingen originalfiler er endret
- handoff finnes

## Stopp hvis

- filene inneholder sensitivt/personlig innhold
- lisensstatus er uklar ved kopiering fra repo-inspirasjon
- en sammenslåing vil fjerne nyttig varians
- en agentprompt har skadelige eller uønskede instruksjoner
