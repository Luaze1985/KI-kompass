---
title: "Første datamodell for KI-beslutningsradar"
date: 2026-05-12
status: draft
tags: [datamodell, mvp, beslutningslogg]
category: concept-context
chunk_type: schema-note
---

# Første datamodell

Dette er ikke en teknisk schema-fil. Det er et konseptuelt feltsett.

## Beslutning

- beslutning_id
- beslutning_tittel
- beslutning_beskrivelse
- delbeslutning
- prosessområde
- beslutningseier

## Kart

- virksomhet
- kunde_bruker
- verdiforslag
- strategisk_maal
- tiltak
- risiko
- ansvar
- tillit

## Kompass

- maalklarhet_score
- maalklarhet_begrunnelse
- separabilitet_score
- separabilitet_begrunnelse
- foreslaatt_kvadrant
- foreslaatt_ki_rolle

## Kontrollkrav

- forklarbarhet_score
- human_oversight_score
- overreliance_risiko
- stoppregler_utloest
- eskalering_kreves

## Beslutningslogg

- ki_output_brukt
- menneskelig_vurdering
- motargumenter_vurdert
- kilder_verifisert
- usikkerhet
- overstyring
- endelig_beslutning
- endelig_ansvarlig
- dato

## Rapportoutput

- anbefalt_ki_rolle
- hva_ki_kan_gjore
- hva_mennesket_maa_eie
- hva_som_ikke_skal_automatiseres
- neste_steg
