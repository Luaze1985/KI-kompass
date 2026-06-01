---
title: KI-beslutningsradar project context packet
date: 2026-05-13
status: canonical-understanding
tags: [context-packet, project, concept_context]
---


# Project Summary

KI-beslutningsradaren skal hjelpe brukeren å avgjøre hvilken rolle KI bør ha i en konkret beslutningsprosess.

Kjernen er ikke å automatisere mest mulig, men å stille riktige spørsmål før KI brukes.

# Current Concept

Sterkeste konsept:

> Kart + kompass + kontrollkrav + linser + beslutningslogg

Kartet avklarer virksomhet, HR-kontekst, mål, tiltak, risiko, ansvar og tillit.

Kompasset bruker målklarhet og separabilitet til å diagnostisere en konkret KI-bruksoppgave:

- utforskende støtte
- forsterket skjønn
- automatisert beslutning
- strategisk autonomi

Kontrollkravene stopper eller begrenser automatisering når forklarbarhet, human oversight eller dømmekraft er for svak.

# Kanonisk Brukerreise

Appen skal ikke oppleves som et skjema som gir score. Den skal oppleves som en veiledet diagnose:

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

Viktigste produktregel:

> HR-mikroprosjektet er kontekst. KI-bruksoppgaven er vurderingsenheten.

Første tracer bullet er seniorbevaring i hjemmetjenesten gjennom livsfasepolitikk.

# Key Inputs

- promptpakker for ledertråd og fire researchtråder
- tidligere funn om KI-kompasset
- egne rammeverk: linser og “Ikke bli dum med KI”
- Notion/Drive-funn om dømmekraft, bias, KI-modenhet og peer review
- GitHub/Krs-harness som anbefalt workspace-retning

# Decisions So Far

- start som `concept_context`, men første appskall finnes i `apps/hr-strategiradar/`
- ikke bygg videre app før brukerreisen og beregningsmodellen brukes som kontrakt
- forklarbarhet er kontrollkrav, ikke kompassakse
- linser er fagperspektiver, ikke kompassdimensjoner
- stoppregler kommer før rolle
- score gir `beregnet_rolle`, ikke anbefaling
- stoppregler gir `forelopig_tillatt_rolle`

# Next Useful Work

1. Bruk `app_spec/brukerreise_hr_strategiradar.md` som produktkontrakt.
2. Bruk `app_spec/arbeidsflyt_og_beregningsmodell.md` som beregningskontrakt.
3. Utfør `HRSR-002`: schemas og fixtures for HR-mikroprosjekt, KI-bruksoppgave, risikoflagg og indikatorer.
4. Ikke hopp rett fra HR-situasjon til score.
