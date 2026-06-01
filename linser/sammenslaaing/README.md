# Startpakke for sammenslåing av linser og rådgiverledetekster v0.1

## Formål

Denne pakken styrer første fase av sammenslåingen av eksisterende linser, agent-/rådgiverledetekster og nye styringsfiler til ett ryddig Linselab-prosjekt.

Målet er ikke å lage et ferdig bibliotek nå. Målet er å gjøre videre arbeid trygt, sporbarhetsbasert og mulig å overta for Codex eller et annet repo-verktøy.

## Hva pakken skal gjøre

1. Bevare alle originale linser og ledetekster.
2. Registrere kilder før sammenslåing.
3. Skille mellom linse, rådgiver, frame, modell, stance og heuristic.
4. Harmonere innhold uten å fjerne nyttig varians.
5. Lage første caseflyt slik at biblioteket testes på reell organisasjonssak.
6. Forberede en slank ChatGPT Project-pakke og et bredere lokalt repo.

## Hva pakken ikke skal gjøre

- Ikke lage ferdige aktive linser av alt materiale.
- Ikke slette eller overskrive originalfiler.
- Ikke bygge backend, RAG eller app.
- Ikke slå sammen linser bare fordi navnene ligner.
- Ikke gjøre alle agentprompter til agenter.

## Styrende kilder i denne pakken

De tre nye filene i `linser råd.zip` er lagt inn som styrende kilder:

- `99_styrende_kilder/linser_raad/_RAMMEVERK.md`
- `99_styrende_kilder/linser_raad/_NY_LINSE.md`
- `99_styrende_kilder/linser_raad/_BRUK.md`

Utvalgte filer fra forrige styringspakke er lagt inn som referanser:

- arkitektur
- harmoniseringsregler
- forklarings-/variansmodell
- Codex-brief

## Første arbeidsrekkefølge

```text
registrer -> klassifiser -> koble -> harmoniser -> test på case -> foreslå aktiv pakke
```

## Første beslutning som må tas senere

Skal første sammenslåing normalisere:

1. de 15 hurtigvalglinsene først, eller
2. de 5 demonstrasjonslinsene først, eller
3. alle eksisterende gruppefiler først uten omskriving?

Anbefaling v0.1: Start med 5 demonstrasjonslinser og én konkret case. Ikke normaliser alt før metoden er testet.
