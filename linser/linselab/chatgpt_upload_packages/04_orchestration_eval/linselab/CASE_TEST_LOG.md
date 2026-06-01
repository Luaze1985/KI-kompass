# Case Test Log

Status: planned_tests_registered.

No instruments have been case-tested yet. The entries below are planned gate tests for PersonaNexus advisor profiles before any move from `draft` to `pilot`.

## Planned Orchestrator Route Test

```text
Case ID: CT-A4-ROUTE-001
Instrument ID: A4 Orkestratoren
Question or task: Brukeren legger frem en uklar administrativ problemstilling der tiltaket kan ha juridiske, økonomiske, organisatoriske og menneskelige konsekvenser. Orkestratoren skal velge analyseteam før faglig analyse starter.
Must verify:
- Riktig problemtype og arbeidslop er valgt.
- 3-5 linser er valgt med vekt, trigger_match og konkret begrunnelse.
- Minst to plausible linser er forkastet med begrunnelse.
- Forventede spenninger mellom valgte linser er synliggjort.
- Output inneholder forventet sluttartefakt, handoff_plan og decision_trace_ref.
- Orkestratoren skriver ikke endelig faglig anbefaling alene.
Better-than-generic criteria:
- Finner minst tre relevante blindsoner/spenninger brukeren ikke allerede nevnte.
- Velger minst en ikke-åpenbar, men relevant linse.
- Forklarer hvorfor enkelte intuitive linser ikke bør brukes i første runde.
Activation recommendation: Remain draft until route output is reviewed and scored.
```

## Planned PersonaNexus Profile Tests

```text
Case ID: CT-PN-LEX-001
Instrument ID: persona-lex
Mapped lens: D1 juristen
Question or task: Vurder en kontraktsklausul med uklar jurisdiksjon og mulig compliance-risiko.
Must verify:
- Riktig trigger: kontrakt/compliance/klausul.
- Riktig outputmarkor: disclaimer, jurisdiksjonssjekk, risikorating og advokat-eskalering.
- Non-override: Profilen tilfører juridisk grensespråk, men Juristen beholder faglig mandat og gir ikke endelig juridisk raad.
Activation recommendation: Remain draft until case output is reviewed.
```

```text
Case ID: CT-PN-BEACON-001
Instrument ID: persona-beacon
Mapped lens: D2 risikostyringseksperten
Question or task: Lag statusoppdatering for en aktiv P1-hendelse med uavklart rotarsak.
Must verify:
- Riktig trigger: hendelse/nedetid/P1/eskalering.
- Riktig outputmarkor: severity, known unknowns, kundepavirkning, eier og neste oppdatering.
- Non-override: Profilen tilfører krisekommunikasjon, men Risikostyringseksperten beholder risikofaglig mandat og spekulerer ikke i rotarsak.
Activation recommendation: Remain draft until case output is reviewed.
```

```text
Case ID: CT-PN-BOARD-001
Instrument ID: persona-board-advisor
Mapped lens: K1 den_virtuelle_stabssjefen
Question or task: Vurder et styrenotat med uklart beslutningsmandat og manglende bevisgrunnlag.
Must verify:
- Riktig trigger: styrevedtak/governance/risiko/eskalering.
- Riktig outputmarkor: governance-memo, mandatsporsmal, fakta/antakelser og usikkerhetsmarkering.
- Non-override: Profilen tilfører styringstone, men Stabssjefen beholder syntese- og beslutningsmandat uten aa bli juridisk raadgiver.
Activation recommendation: Remain draft until case output is reviewed.
```

```text
Case ID: CT-PN-CORAL-001
Instrument ID: persona-coral
Mapped lens: L2 forstelinjelederen
Question or task: Handter en sint kundehenvendelse som krever feilsoking og eskalering.
Must verify:
- Riktig trigger: kunde/frustrasjon/klage/feilsoking.
- Riktig outputmarkor: empatisk mottak, problem-eierskap, hva som er provd og strukturert handoff.
- Non-override: Profilen tilfører supporttone, men Forstelinjelederen beholder operasjonelt mandat og lover ikke andres tidslinjer.
Activation recommendation: Remain draft until case output is reviewed.
```

```text
Case ID: CT-PN-FABLE-001
Instrument ID: persona-fable
Mapped lens: H3 narrativ_analytikeren
Question or task: Gi tilbakemelding paa et tekstutkast der intensjon og faktisk narrativ spriker.
Must verify:
- Riktig trigger: narrativ/historie/tone-of-voice/skriveprosess.
- Riktig outputmarkor: forfatterautonomi, craft-feedback, show-dont-tell og valgfrie eksperimenter.
- Non-override: Profilen tilfører fortellingsrad, men Narrativ-analytikeren beholder analysemandat og skriver ikke teksten generisk om.
Activation recommendation: Remain draft until case output is reviewed.
```

Template:

```text
Case ID:
Instrument ID:
Question or task:
What it saw:
What it missed:
Facts:
Assumptions:
Interpretations:
Useful variance:
Decision impact:
Activation recommendation:
```
