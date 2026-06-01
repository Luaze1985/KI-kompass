---
title: "Decision case datamodell"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [schema, database, decision-case]
---


# Decision case datamodell

Dette er et første forslag til datamodell. Den er laget for lokal prototype, ikke produksjon.

## Domain

```yaml
domain:
  domain_id: string
  navn: string
  eierrolle: string
  dataklasse: green | yellow | red
  beskrivelse: string
```

## Role

```yaml
role:
  role_id: string
  domain_id: string
  navn: string
  formål: string
  hovedoppgaver:
    - string
  krav:
    - string
  forventninger:
    - string
```

## Task

```yaml
task:
  task_id: string
  role_id: string
  navn: string
  type: string
  frekvens: string
  risiko_ved_feil: low | medium | high | critical
  standardiserbarhet: low | medium | high
```

## Incident Type

```yaml
incident_type:
  type_id: string
  domain_id: string
  navn: string
  alvorlighet: low | medium | high | critical
  typiske_arsaker:
    - string
  typiske_tiltak:
    - string
```

## Decision Case

```yaml
decision_case:
  case_id: string
  tittel: string
  spørsmål: string
  domain_id: string
  berørte_roller:
    - string
  datagrunnlag:
    - string
  malklarhet_score: 1-5
  separabilitet_score: 1-5
  anbefalt_ki_rolle: forsterket_skjonn | automatisert_beslutning | utforskende_stotte | strategisk_autonomi
  menneskelig_vurdering_kreves: boolean
  menneskelig_vurdering: string
  beslutning: string
  status: draft | diagnosed | reviewed | closed
```

## Audit Log

```yaml
audit_log:
  log_id: string
  case_id: string
  tidspunkt: datetime
  brukerrolle: string
  handling: string
  datagrunnlag:
    - string
  systemforslag: string
  menneskelig_valg: string
  begrunnelse: string
```

## Første testregel

Hvis `menneskelig_vurdering_kreves` er `true`, skal casen ikke kunne lukkes uten utfylt `menneskelig_vurdering`.
