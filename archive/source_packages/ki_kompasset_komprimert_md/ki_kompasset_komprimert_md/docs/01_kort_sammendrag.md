---
title: "Kort sammendrag"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [sammendrag, beslutninger, strategi]
---


# Kort sammendrag

PDF-en presenterer **KI-kompasset** som et strategisk verktøy for å velge riktig rolle for KI i konkrete beslutningsprosesser.

Hovedpoenget er at KI-implementering ikke først og fremst er et teknisk spørsmål. Det er et spørsmål om:

- verdiforslag
- ansvar
- beslutningstype
- målklarhet
- menneskelig skjønn
- hvor mye som trygt kan automatiseres

## Kjernepåstand

Når KI bygges inn i beslutningssystemer kan gode valg forsterkes, men dårlige valg kan også skaleres. Derfor må virksomheten først diagnostisere beslutningstypen, og deretter velge hvilken rolle KI skal ha.

## Hvorfor dette er viktig

Mange virksomheter starter med hastighet: de vil bruke KI raskt. Risikoen er at de løper i feil retning. Kompasset skal hindre at virksomheten automatiserer bort det som faktisk gir verdi, legitimitet eller ansvarlighet.

## Den praktiske læringen

For hvert bruksområde må man spørre:

```text
1. Hva er beslutningen?
2. Hva er målet?
3. Er målet stabilt og regelbasert?
4. Kan prediksjon skilles fra menneskelig vurdering?
5. Hvem eier ansvaret hvis noe går galt?
6. Hva vil kunder, brukere, ansatte eller borgere oppfatte som legitimt?
```

## Bruk i app-/vibekode-prosjekt

KI-kompasset bør ikke bare være bakgrunnsteori. Det bør bli en konkret flyt i appen:

```text
beslutningscase
  -> målklarhet
  -> separabilitet
  -> foreslått KI-rolle
  -> menneskelig vurdering
  -> beslutningslogg
```

## Kort konklusjon

Ikke bygg en generell chatbot på toppen av virksomhetsdata. Bygg et beslutningsregister der KI-kompasset brukes som diagnose og kvalitetsport før automatisering vurderes.
