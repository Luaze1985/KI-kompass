---
title: "Overføring til incident data og workforce planning"
source: "Berge & Knudsen - KI-kompasset"
date_created: "2026-06-01"
status: "compressed-notes"
tags: [incident-data, workforce-planning, hms, hr]
---


# Overføring til incident data og workforce planning

Dette notatet oversetter KI-kompasset til bruksområdet du beskrev: incident data, roller, oppgaver, krav, forventninger og virksomhetsspesifikke domener.

## Ikke start med personer

Trygg førsteversjon bør bruke:

```text
roller, ikke personer
oppgaver, ikke prestasjon
krav, ikke individuell vurdering
hendelsestyper, ikke sensitive enkeltsaker
syntetiske eller anonymiserte eksempler først
```

## Incident data

Incident data bør forstås bredt:

```text
hendelse
avvik
nestenhendelse
skade
klage
feil
driftsavbrudd
risikosignal
```

KI kan støtte med:

```text
kategorisering
oppsummering
mønsterfunn
risikosignaler
forslag til kontrollspørsmål
forslag til læringspunkt
```

KI bør ikke alene:

```text
konkludere årsak
plassere skyld
bestemme tiltak mot ansatte
prioritere bort alvorlige signaler
fatte vedtak eller personalsensitive beslutninger
```

## Workforce planning

Workforce planning kan brytes ned slik:

```text
rolle
  -> oppgaver
  -> krav
  -> forventninger
  -> kompetansebehov
  -> risiko ved feil
  -> mulig KI-støtte
```

## Deterministisk først

Bruk faste regler før språkmodell der det er mulig.

Deterministisk egnet:

```text
sjekklister
kravmatriser
rolle-oppgave-kobling
manglende felt
risikoscore etter fast regel
modenhetsnivå
statuslogg
```

Språkmodell egnet:

```text
oppsummere fritekst
foreslå kategorier
forklare funn
lage kontrollspørsmål
finne mulige mønstre
utfordre antakelser
```

Menneske må eie:

```text
ansvarlig vurdering
prioritering
tiltak
etiske avveiinger
konsekvens for folk
beslutninger med legitimitetskrav
```

## Mest sannsynlige KI-kompass-plasseringer

| Brukstilfelle | Sannsynlig kvadrant | Begrunnelse |
|---|---|---|
| Foreslå kategori for avvik | Forsterket skjønn | Målet kan være klart, men fagperson må vurdere |
| Finne manglende felt i skjema | Automatisert beslutning | Regelbasert og lett å separere |
| Analysere mønstre i hendelser | Utforskende støtte | Mål og årsak kan være sammensatt |
| Automatisk oppfølging av roller | Ikke anbefalt i v1 | Høy person-/legitimitetsrisiko |
| Foreslå kompetansebehov på rollenivå | Forsterket skjønn | Kan støtte, men leder/fag må vurdere |

## Første solide app-scope

```text
Beslutningsregister + kompassdiagnose + audit logg.
```

Ikke:

```text
Full workforce-planning-motor.
```
