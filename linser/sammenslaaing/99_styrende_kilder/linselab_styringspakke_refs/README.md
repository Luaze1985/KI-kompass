# Linselab styringspakke v0.1

## Formål

Dette er en styringspakke for å bygge et linsebibliotek og en linsemaker-metode.
Pakken skal brukes både i ChatGPT Project og som startpunkt for et lokalt repo/Codex-arbeid.

Prosjektet skal:

- videreføre eksisterende linser og agent-/rådgiverledetekster
- harmonisere dem til én felles standard
- gjøre dem brukbare mot konkrete caser
- gjøre det mulig å rangere linser etter forklaringsstyrke, teori, relevans, varians og gjennomskjæringsstyrke
- lære brukere å lage egne faglige KI-linser

## Hovedskille

Dette prosjektet må ikke blandes sammen til én utydelig agentpakke.

Bruk dette skillet:

```text
Instrument = fellesnavn på lens/frame/model/stance/heuristic
Linse = operasjonalisert rådgiverperspektiv med prosedyre, output og kvalitetssjekk
Rådgiver = valgt linse + rolle/atferd + kontekst + svarform
Bibliotek = sortert samling av instrumenter og linser
Linsemaker = metode for å lage nye linser
```

## Inspirasjonskilder som er inspisert

- `personanexus-main.zip`: nyttig for identitet, atferdskontrakter, guardrails, evaluering og evolusjonslogg.
- `agentforge-main.zip`: nyttig for generering, promptlag, validering, drift/driftssjekk og team-/avdelingslogikk.
- `prism-main.zip`: nyttig for katalog, taksonomi, strengt skille mellom lens/frame/model/stance/heuristic og instrumentformat.
- `Linser-20260517T204415Z-3-001.zip` og løse linsefiler: eksisterende domeneinnhold som skal bevares og normaliseres.

## Ikke gjør ennå

- Ikke bygg backend.
- Ikke bygg RAG.
- Ikke slett eller overskriv originalfiler.
- Ikke konverter alt ukritisk til “linse”.
- Ikke slå sammen ulike agenter uten å bevare opprinnelig kilde og versjon.
- Ikke bruk alle linser i hver analyse.

## Første mål

Første mål er ikke full app. Første mål er et ryddig repo som gjør tre ting:

1. Registrerer og sorterer alle eksisterende linser/agenter.
2. Definerer en standard for nye linser.
3. Tester modellen på 3–5 konkrete caser.
