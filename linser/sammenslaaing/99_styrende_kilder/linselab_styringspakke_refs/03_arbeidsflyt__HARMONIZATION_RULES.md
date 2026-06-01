# Harmoniseringsregler

## Målet

Slå sammen og standardisere eksisterende agentledetekster, linser og rådgiverroller uten å miste opprinnelse, nyanser eller kildehistorikk.

## Regel 1: Bevar originalen

Originalfil skal aldri overskrives. Alt nytt skal være avledet versjon.

## Regel 2: Skill kilde og normalisert linse

Kilden kan være lang, rotete, personlig, engelsk eller uferdig. Den normaliserte linsen skal være kortere, strukturert og testbar.

## Regel 3: Ikke slå sammen bare fordi navnene ligner

To linser kan hete nesten det samme, men ha ulik funksjon. Slå bare sammen hvis:

- rolleformål er likt
- prosedyre er lik
- output er likt
- konfliktprofil er lik

## Regel 4: Bevar variasjon som verdi

Hvis to linser gir ulike forklaringer på samme sak, kan det være verdifull varians, ikke duplikat.

## Regel 5: Agent blir rådgiverprofil

Eksisterende agentprompter skal ikke nødvendigvis bli egne agenter. Ofte skal de splittes i:

- rådgiverrolle
- atferdskontrakt
- faglig linse
- svarformat
- guardrails

## Regel 6: Alle aktive linser må ha testbar output

Hvis en linse ikke har outputformat, confidence eller vurderingskriterier, er den `draft` eller `source`, ikke `active`.

## Regel 7: Bruk case før status active

En linse blir ikke `active` før den er testet på minst én konkret case.
