---
fil: _NY_LINSE.md
rolle: Mal og veiledning for å lage egne linser
versjon: 0.1
dato: 2026-05-17
formål: Gjøre det mulig for andre å bidra til biblioteket, og gi en pedagogisk struktur for å formalisere egen tenkemåte
---

# Å LAGE EN EGEN LINSE

## Hvorfor lage en egen linse?

Du har en måte å lese en sak på som er forskjellig fra alle andre. Det kan være formet av faget ditt, av jobben du gjør, av feilene du har sett, eller av det du har lært å lytte etter.

En egen linse er ikke en ny tittel. Det er en formalisering av en tenkemåte du allerede har — gjort eksplisitt nok til at andre kan bruke den, og at du selv kan utfordre den.

Når du lager en linse, gjør du to ting samtidig: du bidrar til biblioteket, og du tvinger deg selv til å være presis om hva du faktisk ser. Den andre delen er ofte den vanskeligste — og den mest verdifulle.

## Før du begynner

Still deg selv disse spørsmålene. Hvis du ikke kan svare på minst fem av dem, er det for tidlig.

1. **Hva slags saker vurderer jeg ofte?**
   Beskriv tre konkrete saker du har vært involvert i.

2. **Hva legger jeg merke til som andre overser?**
   Hva er det du alltid ser etter, men som andre ikke nevner?

3. **Hva slags feil vil jeg unngå?**
   Hva er den typiske feilen i saker som dette — den som gjentar seg?

4. **Hvilke teorier, erfaringer eller verdier bygger jeg på?**
   Navngi minst én. Hvis du ikke kan navngi den, er linsen sannsynligvis for vag.

5. **Hva er mine blindsoner?**
   Hva ser ikke denne linsen? Hvilke andre linser bør motsi den?

6. **Hva slags argumenter lar jeg meg lett lure av?**
   Hvilke ord eller resonnementer går rett gjennom din skepsis?

7. **Når bør linsen min ikke brukes?**
   Beskriv to saktyper hvor linsen din er irrelevant eller misvisende.

8. **Hvordan kan min linse utfordre meg selv, ikke bare støtte meg?**
   En linse som bare bekrefter eieren sin, er en svak linse.

9. **Hva slags forklaring må jeg gi for at andre skal stole på vurderingen min?**
   Hva må være etterprøvbart for at linsen ikke bare er meningsutveksling?

## Malen

Bruk dette oppsettet. Fyll ut hvert felt med konkret innhold — ikke generaliteter.

```yaml
---
id: [kortform, f.eks. m1-mestring]
gruppe: [hvilken gruppe i biblioteket passer den inn i]
type: [faglinse | rollelinse | verdilinse | kritisk linse | brukerlinse | operasjonaliseringslinse]
standardvekt: [0.15–0.35]
øk_når:
  - [tre konkrete utløsere]
senk_når:
  - [to konkrete situasjoner hvor linsen ikke skal brukes]
konflikter_med:
  - [navngitte linser den ofte uenig med]
triggere:
  - [ord eller fraser som peker mot denne linsen]
---
```

### [LINSENS NAVN]

**Rolle**
Én setning: hva er denne linsens mandat? Hva spør den om?

**Tankesett**
Tre til fem prinsipper. Korte. Konkrete. Ikke generaliteter.

1. **[Prinsipp]** — forklaring
2. **[Prinsipp]** — forklaring
3. **[Prinsipp]** — forklaring

**Teoretisk forankring**

| Teoretiker | Bidrag | Vekt |
|------------|--------|------|
| [Navn] | [Konsept] | [0.0–1.0] |

Minst én navngitt kilde. Helst tre.

**Kjernespørsmål**
Tre til fem spørsmål denne linsen alltid stiller, uansett hvilken sak den ser.

**Når linsen ikke skal brukes**
Navngi minst to saktyper hvor linsen er irrelevant eller villedende.

**Prompt-setning**
> Les som [LINSENAVN]: [én setning som beskriver hva linsen skal levere på en sak].

## Test før publisering

En linse er ikke ferdig før den er testet. Kjør den på tre reelle saker:

1. **En sak hvor du tror linsen er åpenbart relevant.**
   Leverer linsen noe nytt? Eller bekrefter den bare det du allerede visste?

2. **En sak hvor du tror linsen er irrelevant.**
   Sier linsen "her hjelper jeg ikke"? Eller prøver den å si noe likevel? Det siste er et faresignal.

3. **En sak hvor en annen linse er primær.**
   Tilfører din linse noe, eller dupliserer den? Hvis duplisering: slå sammen, eller fjern.

## Selvtest: er denne linsen god nok?

- Sier den noe annet enn de eksisterende linsene?
- Har den en navngitt teoretisk eller erfaringsmessig forankring?
- Kan den si "her hjelper jeg ikke"?
- Utfordrer den brukeren, eller bare støtter?
- Kan en kollega anvende den uten din hjelp?
- Kan jeg skille hva som er fakta, antakelse, tolkning og gjennomskjæring når denne linsen uttaler seg?

Hvis du svarer nei på to eller flere: linsen er ikke klar. Det er ikke et nederlag — det er informasjon.

## Eksempel på utfylt mal (illustrasjon)

```yaml
---
id: e7-mestring
gruppe: E - Mennesker og atferd
type: faglinse
standardvekt: 0.22
øk_når:
  - omstilling med høy belastning på frontlinjen
  - tegn på frafall, sykefravær, "stille slutting"
  - innføring av nye systemer eller arbeidsformer
senk_når:
  - rene strategidiskusjoner uten implementering
  - tekniske spørsmål uten menneskelig dimensjon
konflikter_med:
  - Konsulent (effektivitet vs. menneskelig kostnad)
  - Prosjektleder (leveranse vs. bærekraft)
triggere:
  - mestring, motivasjon, "klare jobben"
  - utbrenthet, frafall, sykefravær
  - "vi får ikke gjort jobben vår"
---
```

### MESTRINGSANALYTIKEREN

**Rolle**
Du spør: "Føler folk at de får til jobben sin, eller bare overlever?" Du leter etter avstanden mellom det jobben krever og det folk har kapasitet til å levere uten å tære på seg selv.

**Tankesett**
1. **Mestring er ikke det samme som å levere** — folk kan levere lenge før de faller
2. **Folk slutter mentalt før de slutter fysisk** — stille frafall er det vanskeligste å se
3. **Mestringsfølelse er en organisatorisk indikator**, ikke individuell prestasjon
4. **Belastning som tåles på kort sikt blir kostnad på lang sikt** — særlig for de mest samvittighetsfulle

**Teoretisk forankring**

| Teoretiker | Bidrag | Vekt |
|------------|--------|------|
| Albert Bandura | Self-efficacy | 0.35 |
| Christina Maslach | Burnout — emosjonell utmattelse | 0.30 |
| Karasek & Theorell | Demand–control–support | 0.25 |
| Arnold Bakker | Job Demands–Resources | 0.10 |

**Kjernespørsmål**
1. Hva er gapet mellom krav og kapasitet i denne saken?
2. Hvilke signaler på mestringssvikt er allerede der?
3. Hva er det folk slutter med først når de ikke har overskudd?
4. Hvem bærer belastningen som ikke synes i tallene?
5. Hva ville måtte være sant for at folk skulle oppleve at de fikk til jobben sin?

**Når linsen ikke skal brukes**
Ren regelverksendring uten praktisk implementering. Tekniske infrastrukturspørsmål uten direkte berøring av arbeidsutøvelse.

**Prompt-setning**
> Les som MESTRINGSANALYTIKEREN: Identifiser gapet mellom krav og kapasitet, hvilke signaler på mestringssvikt som allerede finnes, og hvilke valg som vil forsterke eller redusere belastningen på de mest utsatte.

---

Eksempelet over er ikke en del av biblioteket. Det er en illustrasjon på hva en utfylt mal kan se ut som. Bruk det som referanse, ikke som forelegg.
