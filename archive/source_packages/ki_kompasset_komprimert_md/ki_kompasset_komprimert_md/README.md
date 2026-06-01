---
title: "KI-kompasset komprimert MD-pakke"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [ki-kompasset, beslutningsstotte, vibekoding]
---


# KI-kompasset - komprimert MD-pakke

Denne pakken bryter PDF-en `Berge & Knudsen (KI-kompasset).pdf` ned til korte, filbaserte notater som kan brukes videre i arkitektur, sprintpakker og vibekoding.

## Hva pakken er

- En komprimert arbeidsversjon av rammeverket.
- Ikke en full gjengivelse av PDF-en.
- Laget for å kunne legges i et repo som kuratert kontekst.
- Skrevet med norsk terminologi og operativ bruk i tankene.

## Anbefalt plassering i repo

```text
workspaces/vibekode_til_solid_kodebase/docs/source_packs/ki_kompasset_compressed/
```

## Leserekkefølge

1. `docs/01_kort_sammendrag.md`
2. `docs/02_kjernebegreper.md`
3. `docs/03_aksene_malklarhet_separabilitet.md`
4. `docs/04_kvadrantene.md`
5. `docs/05_diagnose_sporsmal.md`
6. `docs/06_feildiagnose_risiko.md`
7. `docs/07_overforing_til_incident_workforce.md`
8. `schemas/decision_case_model.md`
9. `examples/incident_data_case.md`
10. `prompts/codex_handoff_ki_kompass.md`

## Hovedregel for videre bruk

KI-kompasset skal brukes som **kvalitetsport før KI bygges inn i en beslutningsflyt**.

Ikke start med spørsmålet:

```text
Kan KI gjøre dette?
```

Start med:

```text
Hva slags beslutning er dette?
Hvor klart er målet?
Kan prediksjon skilles fra menneskelig skjønn?
Hva må et menneske fortsatt stå ansvarlig for?
```
