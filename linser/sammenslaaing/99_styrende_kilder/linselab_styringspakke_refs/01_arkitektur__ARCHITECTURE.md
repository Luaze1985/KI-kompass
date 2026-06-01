# Arkitektur

## Arkitekturbilde

```text
KILDER
  ├─ eksisterende linser
  ├─ agent-/persona-ledetekster
  ├─ teori og metode
  ├─ repo-inspirasjon
  └─ undervisningsnotater
        ↓
REGISTRERING
  ├─ SOURCE_REGISTER.yml
  ├─ LENS_REGISTER.yml
  └─ DUPLICATE_MAP.yml
        ↓
NORMALISERING
  ├─ lens_schema.yml
  ├─ lens_template.md
  ├─ scoring_model.md
  └─ harmonization_rules.md
        ↓
BRUK
  ├─ case intake
  ├─ lens selection
  ├─ advisor bundle
  ├─ analysis output
  └─ review/evaluation
        ↓
LÆRING OG UTVIKLING
  ├─ refine existing lens
  ├─ create new lens
  ├─ test on cases
  └─ update registers
```

## Tre hovedlag

### 1. Biblioteklaget

Her ligger alle instrumenter og linser.

```text
library/
  lenses/
  frames/
  models/
  stances/
  heuristics/
```

Dette laget bør hente tydelig inspirasjon fra Prism: ikke alt bør kalles linse. En teoretisk modell kan være verdifull uten å være en operasjonalisert linse.

### 2. Rådgiverlaget

Her defineres hvordan en linse blir en rådgiver i praksis.

```text
advisors/
  advisor_profiles/
  behavioral_contracts/
  answer_formats/
  escalation_rules/
```

Dette laget bør hente inspirasjon fra PersonaNexus: rolle, scope, guardrails, atferdskontrakt, usikkerhet og begrensninger.

### 3. Forge-/driftslaget

Her ligger verktøy for å lage, teste og forbedre linser.

```text
forge/
  templates/
  evals/
  case_tests/
  validators/
  prompts/
```

Dette laget bør hente inspirasjon fra AgentForge: generering, validering, drift, teamkomposisjon og iterativ forbedring.

## Ikke bland disse

En linse er ikke automatisk en rådgiver.
En rådgiver er ikke automatisk en agent.
En teori er ikke automatisk en linse.
En prompt er ikke automatisk et bibliotekelement.

## Minimumsarkitektur v0.1

```text
linselab/
  README.md
  AGENTS.md
  PROJECT_CHARTER.md
  SOURCE_REGISTER.yml
  LENS_REGISTER.yml
  docs/
  library/
    lenses/
    frames/
    models/
    stances/
    heuristics/
  templates/
  teaching/
  cases/
  handoff/
```
