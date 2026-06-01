---
title: "Brukerreise for HR Strategiradar"
date: 2026-05-13
status: canonical-understanding
tags: [brukerreise, hr-strategiradar, kompass, kart, mvp]
category: app-spec
---

# Brukerreise for HR Strategiradar

## Formål

Denne filen beskriver hvordan appen skal oppleves og forstås av brukeren. Den er kanonisk for videre produktarbeid.

Hovedpoenget:

> Appen skal ikke oppleves som et skjema som gir en score. Den skal oppleves som en veiledet diagnose: først kart, så konkret KI-bruksoppgave, så kompass, så stoppregler, så ansvarlig rapport.

## Visuelt grunnlag

Brukerreisen bygger på bildematerialet i `assets/images/original/`, særlig:

- `01_to_sporsmal_malklarhet_separabilitet.png`
- `02_kompass_fire_kvadranter.png`
- `12_risikoen_er_feildiagnose.png`
- `13_kompass_og_kart.png`

Disse bildene gir fire produktprinsipper:

1. Brukeren må stille to grunnspørsmål før KI bygges inn: målklarhet og separabilitet.
2. Fire kvadranter gir rolleforslag, ikke fasit.
3. Den største risikoen er feildiagnose.
4. Kompasset gir retning, men kartet er virksomhets- og HR-konteksten.

## Brukerens mentale modell

Brukeren kommer ikke inn for å "score HR". Brukeren kommer inn fordi de vurderer om KI kan brukes i en konkret del av et HR-arbeid.

Appen må derfor lære brukeren dette skillet:

```text
HR-mikroprosjekt = kontekst og kart
KI-bruksoppgave = vurderingsenheten
Kompass = diagnose av KI-egnethet
Stoppregler = grense for hva appen kan anbefale
Beslutningslogg = menneskelig ansvar og etterspor
Rapport = konsulentnotat / beslutningsgrunnlag
```

## Første tracer bullet

Første reise bygges rundt:

> Seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

Dette er valgt fordi casen tvinger frem de sentrale avklaringene:

- strategisk HR
- livsfasepolitikk
- lokal praksis
- HMS/personvern-randsoner
- arbeid og rettferdighet
- risiko for falsk automatiseringsanbefaling

## Reise 1: Bruker kommer inn med HR-situasjon

Brukeren starter med en situasjon, ikke en teknisk oppgave.

Eksempel:

> Vi vurderer livsfasepolitikk for seniorbevaring i hjemmetjenesten.

Appen skal svare med en arbeidsflate som sier:

```text
Før vi vurderer KI-rolle, må vi forstå saken og hva KI faktisk skal brukes til.
```

Brukerens første jobb er å beskrive:

- hva saken gjelder
- hvorfor den er viktig
- hvem som blir berørt
- hvem som eier beslutningen
- hva som er kjent
- hva som må verifiseres lokalt

## Reise 2: Bruker bygger kartet

Kartet er HR- og virksomhetskonteksten.

Brukeren fyller inn:

| Felt | Hva brukeren egentlig gjør |
|---|---|
| Strategiområde | Plasserer saken i HR-landskapet. |
| Målgruppe | Avklarer hvem vurderingen gjelder, uten persondata. |
| Ønsket effekt | Beskriver retning, ikke KI-løsning. |
| Berørte parter | Synliggjør hvem som kan få konsekvenser. |
| Beslutningseier | Binder vurderingen til menneskelig ansvar. |
| Sikre fakta | Skiller grunnlag fra antakelser. |
| Usikkerhet | Gjør lokal verifikasjon eksplisitt. |

Systemet avleder:

- aktuelle HR-prosesser
- mulige randsoner
- risikoflagg
- lokale verifikasjonskrav

For seniorbevaring kan appen aktivere:

- strategi/analyse og virksomhetsstyring
- HMS og arbeidsmiljø
- personvern/sikkerhet ved data eller systembruk
- juridisk vurdering hvis tiltak påvirker rettigheter eller forskjellsbehandling

## Reise 3: Bruker velger KI-bruksoppgave

Dette er det viktigste produktsteget.

Appen skal tydelig si:

```text
Vi vurderer ikke hele HR-prosjektet. Vi vurderer hva KI konkret skal gjøre.
```

Brukeren må velge eller beskrive én KI-bruksoppgave:

- strukturere anonymisert innsikt
- lage tiltakshypoteser
- skrive rapportutkast
- prioritere ansatte
- foreslå individuell tilrettelegging
- lage kommunikasjonsutkast

Appen skal vise at ulike KI-bruksoppgaver i samme HR-prosjekt kan få ulike roller.

Eksempel:

| KI-bruksoppgave | Forventet retning |
|---|---|
| Strukturere anonymisert innsikt | Kan være utforskende støtte. |
| Lage rapportutkast | Kan være utforskende støtte eller forsterket skjønn. |
| Prioritere ansatte for tiltak | Skal bremses hardt. |
| Foreslå individuell tilrettelegging | Skal bremses hardt. |

## Reise 4: Appen stiller kompass-spørsmålene

Appen bruker bildenes to grunnspørsmål:

```text
Målklarhet:
Vet vi tydelig hva godt output betyr?

Separabilitet:
Kan KI-output brukes uten at mennesket må vurdere helheten?
```

Dette må vises som diagnose, ikke poengjakt.

For seniorbevaring kan appen si:

```text
Målet kan være relativt klart: bedre grunnlag for livsfasepolitikk.
Men separabiliteten er lavere: tiltak påvirker arbeidshverdag, tillit, lokal praksis og opplevd rettferdighet.
```

## Reise 5: Bruker gjør verdivurderinger

Her skal appen føles mest forskjellig fra et vanlig spørreskjema.

Brukeren må ta stilling til:

- betyr relasjonell tillit mye?
- er menneskelig nærvær del av verdien?
- kan lokale unntak endre vurderingen?
- påvirker dette arbeid, rettigheter eller helse?
- er feil lette å oppdage og reversere?
- finnes persondata- eller sensitivitetsrisiko?

Disse svarene er styrende input, ikke kommentarer.

De påvirker:

- separabilitet
- stoppregler
- rolle-tak
- kontrollkrav
- beslutningsloggkrav

## Reise 6: Appen viser kompassplassering

Appen viser plassering i kompasset:

- høy/lav målklarhet
- høy/lav separabilitet
- foreløpig kvadrant

Men den skal samtidig forklare:

```text
Kompassplasseringen er en diagnose. Den er ikke en tillatelse til automatisering.
```

Eksempel:

```text
Middels/høy målklarhet + lav/middels separabilitet
=> KI kan støtte analyse og struktur, men bør ikke overta prioritering eller individuelle vurderinger.
```

## Reise 7: Stoppregler kommer før rolle

Før appen viser anbefalt rolle, må den vise røde flagg.

For seniorbevaring kan stoppregler være:

- arbeid eller rettigheter kan påvirkes
- lokal praksis betyr mye
- relasjonell tillit og legitimitet er viktig
- persondata må ikke brukes uten særskilt kontroll
- høy-risiko beslutningslogg kreves hvis output brukes i anbefaling

Appen må gjøre det lett å forstå hvorfor en høy score ikke nødvendigvis gir høy KI-rolle.

## Reise 8: Appen skiller beregnet og tillatt rolle

Dette er kjernen i produktet.

Appen viser:

```text
beregnet_rolle:
Hva scoremodellen ville foreslå uten stoppregler.

forelopig_tillatt_rolle:
Hva som faktisk kan foreslås når stoppregler og rolle-tak er vurdert.
```

Eksempel:

```text
Beregnet rolle: forsterket skjønn
Foreløpig tillatt rolle: utforskende støtte
Begrunnelse: lav separabilitet og HR-risiko setter rolle-tak.
```

## Reise 9: Bruker fyller beslutningslogg

Beslutningsloggen skal hindre gummistempel.

Brukeren må dokumentere:

- egen vurdering før KI-output brukes
- minst ett motargument
- hva som må verifiseres lokalt
- usikkerhet
- om KI-output aksepteres, endres, avvises eller eskaleres
- hvem som eier beslutningen

Hvis loggen mangler i høy-risiko sak, skal appen ikke la rapporten fremstå som klar.

## Reise 10: Appen lager rapport

Rapporten er brukerens konkrete leveranse.

Den skal være et konsulentnotat som viser:

- HR-situasjonen
- valgt KI-bruksoppgave
- kart/kontekst
- kompassplassering
- stoppregler
- beregnet rolle
- foreløpig tillatt rolle
- kontrollkrav
- lokal verifikasjon
- hva KI ikke skal gjøre
- handover til relevante HR-randsoner

## Kort brukerreise

```text
Forstå situasjonen
-> bygg kartet
-> velg KI-bruksoppgave
-> still to kompass-spørsmål
-> gjør verdivurderinger
-> se kompassplassering
-> vurder stoppregler
-> skill beregnet rolle fra tillatt rolle
-> dokumenter ansvar
-> lag beslutningsklart notat
```

## Produktkonsekvens

Neste appbygging må følge denne reisen.

`HRSR-002` og videre schemas må derfor modellere:

- HR-mikroprosjekt
- KI-bruksoppgave
- verdivurderinger
- risikoflagg
- indikatorer
- modulskårer
- stoppregler
- rolle-tak
- beslutningslogg
- rapport

Hvis appen hopper rett fra HR-situasjon til score, har den mistet poenget.
