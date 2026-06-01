# KUNNSKAPSBASE

## Formaal

Kunnskapsbasen skiller mellom:

- aktiv kjerne
- kodetabeller
- referansekilder
- konsoliderte kilder
- eldre konkurrenter
- karantene

## Kildehierarki

1. Markdown-mastere i aktiv struktur
2. Modeller og kodetabeller i `10_kunnskapsbase/modeller` og `10_kunnskapsbase/kodetabeller`
3. Referanser i `10_kunnskapsbase/referanser`
4. Konsoliderte kilder i `90_arkiv/konsolidert_kilde`
5. Eldre konkurrenter i `90_arkiv/eldre_konkurrenter`
6. Slettkandidater i `99_karantene`

## Kategorier

### Robust kjerne
- styringsdokumenter
- indeks og kjernelinser
- agentkontrakter og playbooks
- HR-pilot og guardrails
- prosesskort, rollemastere og rekrutteringsmastere
- maskinlesbar pilotmodell og kodetabeller

### Delvis stottet innhold
- dokumenter som er konsolidert til mastere, men som fortsatt er nyttige for kontrollspor

### Lose ideutkast og dubletter
- materiale i karantene
- tomme eller eksakt dupliserte filer

## Bruksregel

- hvis et sporsmal kan besvares av en Markdown-master, skal referansedokument ikke overstyre den
- hvis master mangler dekning, kan referanse brukes med eksplisitt merking av usikkerhet
- hvis flere kilder motsier hverandre, skal konflikten markeres og verifiseres lokalt
- modeller og kodetabeller skal bare oppdateres etter at tilsvarende Markdown-master er avklart
