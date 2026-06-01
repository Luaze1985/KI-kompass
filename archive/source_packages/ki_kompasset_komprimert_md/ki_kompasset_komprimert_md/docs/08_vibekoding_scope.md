---
title: "Vibekoding scope"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [vibekoding, sprint, local-first]
---


# Vibekoding scope

Denne filen avgrenser hva som kan kodes først uten å miste kontroll.

## Produktregel

KI-kompasset skal være en kvalitetsport før KI-funksjoner får høyere autonomi.

## Første nyttige vertikale snitt

```text
Decision Case Register
```

Brukeren skal kunne:

1. registrere et beslutningscase
2. knytte det til domain, rolle, oppgave eller incident type
3. score målklarhet
4. score separabilitet
5. få foreslått KI-rolle
6. skrive menneskelig vurdering
7. lagre audit-logg

## Skal ikke i første snitt

- ekte HR-persondata
- individuelle kompetanseprofiler
- eksterne LLM-kall
- automatisk beslutning
- integrasjon mot interne fagsystemer
- full workforce planning
- prediktiv risikomodell

## Local-first krav

All førsteversjon bør kunne kjøres lokalt og lagre til lokal fil eller SQLite.

## UI-first flyt

```text
Start
  -> Ny beslutningscase
  -> Få spørsmål
  -> Kompassdiagnose
  -> Anbefalt KI-rolle
  -> Menneskelig vurdering
  -> Lagre beslutningslogg
```

## Kvalitetsporter

Blokker automatisering hvis:

```text
menneskelig ansvar mangler
persondata er uavklart
målklarhet er lav
separabilitet er lav
lov-/policykrav er uavklart
konsekvens ved feil er høy
```

## Neste trygge steg

Lag først en sprintpakke. Ikke start koding rett fra idéen.
