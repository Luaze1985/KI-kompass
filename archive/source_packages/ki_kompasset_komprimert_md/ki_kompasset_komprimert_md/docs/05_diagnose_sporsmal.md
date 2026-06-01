---
title: "Diagnosespørsmål for app og sprint"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [diagnose, skjema, kvalitetsport]
---


# Diagnosespørsmål for app og sprint

Disse spørsmålene kan brukes direkte i UI, skjema, database eller sprintpakke.

## Første spørsmål

```text
Hva er beslutningen?
```

Ikke skriv "bruk KI på X". Skriv beslutningen som faktisk skal støttes.

Eksempel:

```text
Bør denne typen hendelse prioriteres for lederoppfølging?
```

## Målklarhet

1. Hva er ønsket utfall?
2. Kan ønsket utfall beskrives som en stabil regel?
3. Finnes tydelige terskler eller kriterier?
4. Er det konflikt mellom mål?
5. Må målet tolkes forskjellig i ulike situasjoner?
6. Hva vil være et dårlig optimalisert mål?

## Separabilitet

1. Kan KI-output brukes direkte?
2. Må en fagperson tolke output før handling?
3. Må en navngitt person stå ansvarlig?
4. Finnes lovkrav om menneskelig vurdering?
5. Kan feil oppdages og rettes enkelt?
6. Påvirker beslutningen personer, rettigheter, arbeidsforhold, tillit eller økonomi?

## Data og grunnlag

1. Hvilke data brukes?
2. Er dataene grønne, gule eller røde?
3. Er dataene persondata?
4. Er dataene anonyme, pseudonyme eller identifiserbare?
5. Finnes datakildeeier?
6. Finnes metadata om kvalitet, tid og opprinnelse?

## KI-rolle

1. Skal KI bare forklare?
2. Skal KI foreslå kategorier?
3. Skal KI rangere risiko?
4. Skal KI fatte standardbeslutning?
5. Skal KI handle innen gitte rammer?
6. Hvor må mennesket godkjenne?

## Minimumsoutput fra diagnose

```yaml
kompass_diagnose:
  beslutning: ""
  malklarhet: lav | middels | høy
  separabilitet: lav | middels | høy
  anbefalt_ki_rolle: forsterket_skjonn | automatisert_beslutning | utforskende_stotte | strategisk_autonomi
  stoppunkter:
    - ""
  menneskelig_vurdering_kreves: true
  begrunnelse: ""
```
