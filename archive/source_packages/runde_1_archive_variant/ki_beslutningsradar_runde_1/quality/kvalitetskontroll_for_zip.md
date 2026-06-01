---
title: Kvalitetskontroll før zip
date: 2026-05-12
status: final
tags: [kvalitet, kontroll]
category: ki-beslutningsradar
---


# Kvalitetskontroll før zip

## 1. Sterkt nok til å bevare

- Hovedspørsmålet er tydelig og konsekvent formulert.
- Foreløpig modell har klart skille mellom kart, kompass, kontrollkrav og linser.
- Anti-overreliance-datafangsten er operativ og inneholder:
  - definisjoner,
  - kilder,
  - kontrollmekanismer,
  - app-spørsmål,
  - stoppregler,
  - beslutningslogg,
  - handoff til syntese.
- Prinsippet “ikke automatiser dømmekraft” er tydelig.

## 2. Må ryddes

- Kildehenvisninger i anti-overreliance-filen må normaliseres med URL/DOI i `sources/kildeoversikt.md`.
- `data_capture.md` må merkes som supersedert.
- Manglende datafangster må ikke forveksles med ferdige filer.
- Syntese skal ikke bruke placeholder-filer som datagrunnlag.

## 3. Må suppleres

- Målklarhet: kriterier, skåringsspørsmål, stoppregler, kilder.
- Separabilitet: direkte handlingsverdi, behov for skjønn, konsekvens ved feil, reversibilitet, ansvarlighet, relasjon/tillit, unntak/kontekst, rettigheter/legitimitet.
- Forklarbarhet + human oversight: hva som må kunne forklares, hva som må kunne overstyres, hva som er gummistempel.
- Beslutningslogg: minste felter som må dokumenteres i en MVP.
- Testcaser: HR, kommune, service, lav/høy risiko.

## 4. Bør ikke inn i zip som hovedmateriale

- Løse chat-notater uten struktur.
- Generiske AI-artikler uten metode.
- Leverandørmarkedsføring.
- Supersederte utkast som ikke merkes som archive.

## 5. Forslag til siste supplerende søk

1. `goal clarity AI decision support human judgment`
2. `task separability human AI decision making`
3. `EU AI Act human oversight automation bias guidance`
4. `NIST AI RMF explainability interpretability human oversight`
5. `decision log AI assisted decision making accountability`
6. `algorithmic decision support rubber stamp human oversight`
7. `AI decision support reversibility accountability rights impact`

## Konklusjon

Zip kan lages som **foreløpig arkiv- og arbeidsgrunnlag**.

Ikke bruk pakken som ferdig modell, appspesifikasjon eller MVP-krav ennå.
