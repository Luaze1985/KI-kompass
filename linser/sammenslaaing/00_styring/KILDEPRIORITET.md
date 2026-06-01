# Kildeprioritet

## Styrende kilder

Disse kildene skal styre første fase:

1. `linser råd.zip`
   - `_RAMMEVERK.md`
   - `_NY_LINSE.md`
   - `_BRUK.md`

2. `linselab_styringspakke_v0_1.zip`
   - arkitektur
   - harmoniseringsregler
   - forklarings-/variansmodell
   - Codex-brief

3. Eksisterende linsebibliotek
   - `_SYSTEM.md`
   - `_INDEKS.md`
   - `_HURTIGVALG_v2_oppdatert.md`
   - `Linser-20260517T204415Z-3-001.zip`
   - `Kjernelinser_Niva1_til_Niva4.docx`

4. Repo-inspirasjon
   - `prism-main.zip`
   - `personanexus-main.zip`
   - `agentforge-main.zip`

## Prioritetsregel ved konflikt

| Konflikt | Regel |
|---|---|
| Ny styringsfil vs gammel prompt | Ny styringsfil styrer, gammel prompt bevares som kilde |
| To linser med likt navn | Ikke slå sammen før funksjon og output er sammenlignet |
| Agentprompt vs rådgiverlinse | Splitt i rolle, atferd, linse, output og guardrails |
| Teori vs praktisk bruk | Teori gir forankring, men linse må være operativ |
| Enighet vs varians | Bevar varians hvis den gir reell innsikt |

## Ikke-destruktiv sammenslåing

Alt arbeid skal skje som avledede filer. Originalene skal ligge i `source_originals/` eller `99_styrende_kilder/`.
