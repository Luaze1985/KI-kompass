# Ordliste: Fagtermer → Brukerspråk

> Denne ordlisten dokumenterer bevisste språkvalg i HR Strategiradar.
> Fagbegrepene har forskningsmessig forankring (bl.a. NHH, EU AI Act, KS),
> men skal ikke vises i brukergrensesnittet. I UI brukes brukerspråk.

## Kompassakser

| Fagterm | Brukerspråk | Kilde |
|---------|-------------|-------|
| Målklarhet | Hvor tydelige er målene? | NHH-rammeverk |
| Separabilitet | Kan det løses med faste regler? | NHH-rammeverk |
| Forklarbarhet | Kan systemet forklare resultatet? | EU AI Act |
| Anti-overreliance | Fare for å stole for mye på KI | EU AI Act |

## KI-roller

| Fagterm (intern kode) | Brukerspråk | Romertall |
|----------------------|-------------|-----------|
| utforskende_støtte | KI som idégiver | III |
| forsterket_skjønn | KI hjelper, dere bestemmer | I |
| strategisk_autonomi | KI handler innenfor rammer dere setter | IV |
| automatisert_beslutning | KI avgjør alene (krever egen godkjenning) | II |

## Stoppregler

| Kode | Fagterm | Brukerspråk |
|------|---------|-------------|
| SR-01 | Rettigheter / direkte effekt | Påvirker ansatte direkte (de må få si sin mening) |
| SR-02 | Lokalkunnskap og skjønn | Krever kjennskap til lokale forhold (kan ikke løses bare med faste regler) |
| SR-03 | Svak forklarbarhet | Systemet kan ikke forklare hvorfor det kom frem til dette (noen må sjekke manuelt) |
| SR-04 | Overreliance-risiko | Fare for at man stoler for mye på KI (det må finnes rutiner for å sjekke på egen hånd) |
| SR-05 | Ufullstendig logg | Notatet er ikke ferdig utfylt |
| SR-06 | Verdikonflikt | Her står verdier mot hverandre (et menneske må ta den endelige avgjørelsen) |
| SR-07 | Irreversibel konsekvens | Feil er vanskelige å rette opp i etterhånd (må sikres ekstra godt) |
| SR-08 | Svak verifiserbarhet | Det er vanskelig å sjekke om KI-resultatet stemmer mot regler og lokale fagvurderinger |

## Øvrige begreper

| Fagterm | Brukerspråk | Kontekst |
|---------|-------------|----------|
| Stoppregel | Forhold som må avklares | Brukes om SR-01–SR-08 |
| ROS-analyse | Risikovurdering | Steg 3 |
| Scenariotenking | Risikovurdering | Steg 3-overskrift |
| Human-in-the-loop | Menneskelig kontroll | Generelt |
| Overreliance | Stole for mye på KI | Generelt |
| Vurderingsenhet | Oppgaven vi vurderer / Hva KI skal hjelpe med | Steg 1-2 |
| Inndata / Inndatatype | Hvilke data brukes | Rapporter |
| Beslutningspunkt | Når bestemmer mennesket | Rapporter |
| Role cap / Rolle-tak | Begrensning | Kompass |
| Samsvarsgrad | Hvor mye er dokumentert | Rapporter |
| Personvernkonsekvensvurdering | Personvernvurdering | Tiltak |
| Regulatorisk klassifisering | Lovkrav og risikonivå | Rapporter |
| Kontekstavhengig | Avhenger av din virksomhet | Lovverk |
| Autofyll | Fyll inn automatisk | Knapper |

## Prinsipp

- **Brukerspråk i UI**: Alt brukeren ser skal være forståelig for en HR-leder i en kommune uten opplæring.
- **Fagtermer i kode**: Interne variabelnavn, fixtures og domenemodell beholder fagtermer (separabilitet, målklarhet osv.) for presisjon og sporbarhet mot forskningen.
- **Spørsmålsform**: Bruk spørsmål fremfor abstrakte substantiv ("Kan det løses med faste regler?" i stedet for "Separabilitet").
- **"Dere" fremfor "gruppen"**: Direkte tiltale er varmere og tydeligere.
