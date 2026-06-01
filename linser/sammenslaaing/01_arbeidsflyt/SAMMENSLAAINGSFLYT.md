# Sammenslåingsflyt

## Fase 1: Registrer

Lag komplett oversikt over alle kilder.

Minimumsfelt:

- kilde-ID
- filnavn
- opprinnelig zip/mappe
- type
- rolle
- anbefalt bruk
- status
- usikkerhet

## Fase 2: Klassifiser

Klassifiser hvert element som ett eller flere av disse:

- `lens`
- `advisor_profile`
- `behavioral_contract`
- `answer_format`
- `frame`
- `model`
- `stance`
- `heuristic`
- `teaching_material`
- `case_material`
- `governance_rule`
- `source_only`

## Fase 3: Koble

Finn relasjoner:

- bygger på
- overlapper
- motsier
- utfyller
- erstatter
- bør splittes
- bør slås sammen
- bør bli kilde, ikke aktiv linse

## Fase 4: Harmoniser

Bruk standardformat for normalisert linse:

- rolle
- bruksområde
- når den ikke skal brukes
- teori/erfaring
- kjernespørsmål
- gjennomskjæringsspørsmål
- output
- usikkerhetssignal
- konfliktprofil
- testkrav

## Fase 5: Test på case

Ingen linse får status `active` uten test på konkret case.

Testen skal vise:

- hva linsen så
- hva linsen ikke så
- om den ga fakta, antakelse, tolkning, gjetting eller gjennomskjæring
- om den skapte nyttig varians
- om den forbedret beslutningsgrunnlaget

## Fase 6: Foreslå aktiv pakke

Når første batch er testet, foreslå:

- ChatGPT Project-pakke
- lokalt repo-struktur
- undervisningspakke
- videre backlog
