---
title: "Eksempel: incident data case"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [eksempel, incident-data, hms]
---


# Eksempel: incident data case

Dette er et syntetisk eksempel for testdata.

## Case

```yaml
case_id: CASE-001
tittel: "Gjentatte avvik i serviceflyt"
spørsmål: "Bør denne typen hendelse prioriteres for lederoppfølging?"
domain_id: "hms-drift"
berørte_roller:
  - "teamleder"
  - "fagansvarlig"
datagrunnlag:
  - "avvikskategorier siste 90 dager"
  - "anonymiserte hendelsesbeskrivelser"
```

## Målklarhet

```yaml
malklarhet_score: 4
begrunnelse: "Målet om å redusere gjentatte avvik er relativt klart, men årsak og tiltak krever vurdering."
```

## Separabilitet

```yaml
separabilitet_score: 2
begrunnelse: "KI kan peke på mønstre, men leder/fagperson må vurdere årsak, ansvar og tiltak."
```

## Foreslått KI-rolle

```yaml
anbefalt_ki_rolle: "forsterket_skjonn"
menneskelig_vurdering_kreves: true
```

## KI kan foreslå

```text
- mulige mønstre
- mulige årsakskategorier
- kontrollspørsmål til leder
- forslag til læringspunkt
```

## KI skal ikke gjøre

```text
- konkludere skyld
- beslutte tiltak mot ansatte
- lukke saken automatisk
```

## Menneskelig vurdering

```text
Fagansvarlig vurderer om mønsteret skyldes opplæring, bemanning, systemfeil eller uklar prosedyre.
```

## Beslutningslogg

```yaml
handling: "kompassdiagnose_opprettet"
systemforslag: "forsterket_skjonn"
menneskelig_valg: "godkjent_for_menneskelig_review"
begrunnelse: "Lav separabilitet på grunn av ansvar og konsekvens for tiltak."
```
