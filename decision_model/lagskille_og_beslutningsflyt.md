---
title: Lagskille og beslutningsflyt
date: 2026-05-12
status: ready
tags: [lagskille, beslutningsflyt, arkitektur, runde-1]
category: decision-model
---

# Lagskille og beslutningsflyt

## Formål

Dette notatet gjør lagdelingen i KI-beslutningsradaren eksplisitt før appflyt eller MVP-spesifikasjon vurderes.

Målet er å hindre at kart, kompass, kontrollkrav, linser, KI-rolle og beslutningslogg blandes sammen til én utydelig score.

## Styrende flyt

```text
Kart -> Kompass -> Stoppregler -> Kontrollkrav -> Rolle-tak -> Foreløpig KI-rolle -> Beslutningslogg
```

Ingen senere fase skal kunne overstyre en tidligere stoppregel uten manuell begrunnelse og beslutningslogg.

## Lagene

| Lag | Spørsmål | Gir | Skal ikke gjøre |
|---|---|---|---|
| Kart | Hva står på spill? | Kontekst, berørte parter, risiko, ansvar og verdi. | Skal ikke gi KI-rolle. |
| Kompass | Hvor klar og separerbar er beslutningen? | Målklarhet, separabilitet og foreløpig egnethet. | Skal ikke vurdere forklarbarhet som akse. |
| Stoppregler | Finnes røde flagg som begrenser rollen? | Rolle-tak og krav om menneskelig behandling. | Skal ikke gjemmes som advarsel etter score. |
| Kontrollkrav | Kan KI-output forstås, kontrolleres og verifiseres? | Forklarbarhet, human oversight og anti-overreliance. | Skal ikke bli tredje kompassakse. |
| Linser | Hvilke fagperspektiver må kobles på? | Juridisk, etisk, HR, risiko, personvern eller service-perspektiv. | Skal ikke inngå direkte i score før de er operasjonalisert. |
| KI-rolle | Hva kan KI foreløpig brukes til? | Utforskende støtte, forsterket skjønn, delautomatisering eller kandidatstatus. | Skal ikke formuleres som fasit. |
| Beslutningslogg | Hva er vurdert og hvem eier beslutningen? | Sporbarhet, ansvar, overstyring og etterkontroll. | Skal ikke være valgfritt i høy-risiko saker. |

## Input og output per lag

### Kart

Input:

- beslutningstittel
- beslutningseier
- berørte parter
- risiko
- verdi for virksomhet, kunde eller bruker
- ansvar og tillit

Output:

- `risikoniva`
- `berorte_parter`
- `rettigheter_eller_betydelig_pavirking`
- `saarbar_part`
- `relasjonell_tillit`
- `beslutningslogg_kreves`

### Kompass

Input:

- kart-output
- målklarhetsspørsmål
- separabilitetsspørsmål

Output:

- `maalklarhet_score`
- `separabilitet_score`
- `kompass_score`
- foreløpig kvadrant

### Stoppregler

Input:

- kart-output
- kompass-output
- foreløpig risikovurdering

Output:

- `stoppregler_utloest`
- `rolle_tak`
- `eskalering_kreves`

### Kontrollkrav

Input:

- kart-output
- KI-output eller planlagt KI-bruk
- ansvarlig menneskelig rolle

Output:

- `forklarbarhet_oversight_score`
- `anti_overreliance_score`
- `kontroll_score`
- `pakrevde_kontroller`

### Linser

Input:

- kart-output
- stoppregler
- domene

Output:

- `pakrevde_linsevurderinger`
- `linse_notater`
- `aapne_sporsmal`

### KI-rolle

Input:

- `rolle_tak`
- `kompass_score`
- `kontroll_score`
- `stoppregler_utloest`

Output:

- `beregnet_rolle`
- `forelopig_tillatt_rolle`
- `begrunnelse`

### Beslutningslogg

Input:

- alle foregående outputs
- menneskelig vurdering
- aksept, avvisning eller overstyring

Output:

- dokumentert ansvar
- beslutningsgrunnlag
- motargumenter
- verifikasjon
- usikkerhet
- endelig beslutning

## Regler som skal gjelde videre

1. Kart må fylles før kompass-score.
2. Kompass-score kan ikke alene gi rolle over forsterket skjønn.
3. Stoppregler vurderes før foreløpig KI-rolle.
4. Kontrollkrav kan senke rollen, men skal ikke øke rollen alene.
5. Linser kan kreve mer vurdering, men skal ikke bli kompassdimensjoner i runde 1.
6. Beslutningslogg er obligatorisk i høy-risiko saker og ved rolle over utforskende støtte.
7. Automatisert beslutning er ikke et MVP-mål i runde 1.

## Testimplikasjoner

Case-testene skal regnes som ugyldige hvis:

- KI-rolle vises før stoppregler.
- Linser brukes som direkte score uten egen operasjonalisering.
- Forklarbarhet behandles som kompassakse.
- Høy målklarhet brukes som grønt lys uten separabilitet og kontrollkrav.
- Høy-risiko case mangler beslutningsloggkrav.

## Neste avhengighet

Dette notatet avhenger av `decision_model/stoppregel_og_scorekontrakt.md` og peker videre til `decision_model/beslutningslogg_kontrakt.md`.
