# Original User Request

## Initial Request — 2026-06-10T08:01:34+02:00

HR Strategiradar er en React-app som kjører på `http://localhost:5173`. En agent-gruppe skal gå gjennom alle 4 steg i appen med nettleser, ta screenshots og verifisere at spesifikke UI-tekster og komponenter er korrekte.

Working directory: `C:\Users\larse\Documents\ki-beslutningsradar\apps\hr-strategiradar`
Integrity mode: development

> ⚠️ **VIKTIG: Du skal IKKE gjøre noen kodeendringer.** Kun lese, navigere i nettleseren, ta screenshots og skrive rapport.

---

## Requirements

### R1. Steg 1 — Beskriv saken
Naviger til `http://localhost:5173`. Ta screenshot av starttilstanden. Velg `Seniorbevaring i hjemmetjenesten` fra dropdown. Ta screenshot etter valg. Verifiser at casebeskrivelse vises og at det IKKE finnes noe fritekstfelt for egne beskrivelser. Klikk `Stemmer — gå videre →` for å gå til steg 2.

### R2. Steg 2 — Se foreløpig KI-diagnose
Ta screenshot av blindtest-visningen (før svar). Klikk alternativet `KI som idégiver (Lav risiko)`. Ta screenshot av KI-kompasset etter at det åpner seg. Verifiser akseetiketter, trafikklys, status-tekst, seksjonstittel for stoppregler og score-labels. Klikk `Gå til risikovurdering →`.

### R3. Steg 3 — Risikovurdering
Ta screenshot. Verifiser overskriften `Tenk gjennom risiko` og at de 4 riktige toggle-labelene er til stede. Klikk `Nei` på de tre første toggles og `Ja` på den siste (`Kan feil rettes opp?`). Klikk `Gå til beslutningsnotat →`.

### R4. Steg 4 — Beslutningsnotat
Ta screenshot. Verifiser overskrift, knapp-tekst og signeringsblokk. Klikk `Fyll inn automatisk` og ta nytt screenshot av det utfylte notatet.

---

## Acceptance Criteria

### Steg 1
- [ ] Screenshot av starttilstand er tatt
- [ ] `Seniorbevaring i hjemmetjenesten` er valgt fra dropdown
- [ ] Screenshot etter valg er tatt
- [ ] Casebeskrivelse vises (teksten `Slik forstår vi saken` eller tilsvarende)
- [ ] Ingen `<textarea>` for fritekst er synlig
- [ ] Knapp med tekst `Stemmer — gå videre →` er synlig og klikket

### Steg 2
- [ ] Screenshot av blindtest-visning (`Hva tror dere selv?`) er tatt
- [ ] Alternativet `KI som idégiver (Lav risiko)` er klikket
- [ ] Screenshot av kompasset er tatt
- [ ] Y-aksetikett inneholder `Hvor tydelige er målene?`
- [ ] X-aksetikett inneholder `Kan det løses med faste regler?`
- [ ] Trafikklys er synlig (rød, gul eller grønn)
- [ ] Status-tekst er synlig under trafikklyset
- [ ] Teksten `Forhold som må avklares:` brukes (IKKE `Stoppregler utløst`)
- [ ] Score-labels inneholder `Faste regler: X.XX / 5.0` og `Tydelige mål: X.XX / 5.0`
- [ ] Knapp `Gå til risikovurdering →` er klikket

### Steg 3
- [ ] Screenshot er tatt
- [ ] Teksten `Tenk gjennom risiko` er synlig
- [ ] Toggle `Påvirker ansattes rettigheter?` er synlig
- [ ] Toggle `Brukes personlige eller sensitive opplysninger?` er synlig
- [ ] Toggle `Må du kjenne lokale forhold?` er synlig
- [ ] Toggle `Kan feil rettes opp?` er synlig
- [ ] Knapp `Gå til beslutningsnotat →` er klikket

### Steg 4
- [ ] Screenshot er tatt
- [ ] Overskriften `Foreløpig beslutningsnotat` er synlig
- [ ] Knapp heter `Fyll inn automatisk` (IKKE `Autofyll`)
- [ ] `Signer at notatet er gjennomgått` er synlig
- [ ] `Kollega som har lest notatet` er synlig
- [ ] `Lås vurderingen` er synlig
- [ ] Screenshot av utfylt notat etter `Fyll inn automatisk` er tatt

### Rapportering
- [ ] Alle screenshots er lagret og referert i rapporten
- [ ] Alle faktiske tekster som ble sett er dokumentert (for å verifisere språkforenklingen)
- [ ] Eventuelle visuelle problemer eller layout-feil er notert
- [ ] Ingen kodeendringer er gjort — kun rapport
