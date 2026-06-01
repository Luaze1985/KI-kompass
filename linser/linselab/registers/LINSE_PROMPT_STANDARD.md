---
id: linselab-linse-prompt-standard
status: draft
type: governance_standard
fasegate: prototype_candidate
formaal: Standardisere hvordan Orkestratoren velger analyseteam, og hvordan hver linse dissekerer en problemstilling.
kilder:
  - source_text_extracts/02_linser/KJERNELINSER.md.txt
  - source_text_extracts/02_linser/LINSEINDEKS.md.txt
  - source_text_extracts/04_orkestrering/OPPDRAGSFORMAT_OG_TRACE.md.txt
  - source_text_extracts/04_orkestrering/AGENTKONTRAKTER.md.txt
  - registers/PERSONANEXUS_PROFILE_MAPPING.yml
  - registers/AGENTFORGE_METHOD_DRAFTS.yml
  - worker_runs/prism_license_overview_gate/prism_usage_decision.md
---

# Linse Prompt Standard

## 1. Formaal

Denne standarden beskriver hvordan Linselab skal bygge analyser som et styrt analyseteam:

1. Orkestratoren/Dirigenten velger riktig sett med linser.
2. Hver linse dissekerer samme problemstilling fra sitt perspektiv.
3. Linseoutput kobles videre gjennom eksplisitte handoffs.
4. Stabssjefen syntetiserer funnene uten aa viske ut perspektivforskjellene.
5. Evalrevisoren vurderer om analysen ga merverdi utover generisk ChatGPT.

Standardens maal er ikke aa lage lengre prompter. Maalet er aa lage mer presise prompter med tydelig metode, vekt, trigger og output.

## 2. Kildelag

| Lag | Kilde | Rolle i standarden |
|---|---|---|
| Lokale linser | `KJERNELINSER`, `LINSEINDEKS`, `alle_linser_siste` | Primaerkilde for teori, mandat, triggere og standardvekt |
| PersonaNexus | `PERSONANEXUS_PROFILE_MAPPING.yml` | Tone, grenser, svarform, usikkerhetssignal og advisor-profile handoff |
| AgentForge | `AGENTFORGE_METHOD_DRAFTS.yml` | Byggemetode, trigger-to-technique, eval, guardrails og handoff-logikk |
| Prism | Prism worker-runs | Metodebibliotek paa katalognivaa; lisensblokkert for tekstlig gjenbruk |
| Linselab orkestrering | `OPPDRAGSFORMAT_OG_TRACE`, `AGENTKONTRAKTER` | `task_envelope`, `handover_packet`, `decision_trace` og agentroller |

Regel: Lokale linser vinner som faglig autoritet. Eksterne repoer kan forbedre struktur, tone, metode og kvalitetssikring, men skal ikke erstatte linsene.

## 3. Promptlag

Alle linseprompter skal bygges i denne rekkefolgen:

1. **Persona / Linse-teori:** hvem linsen er, faglig mandat, teori og tankesett.
2. **Rules / Guardrails:** hva linsen ikke skal gjøre, eskalering, sikkerhet og grenser.
3. **Memory / Tidligere caser:** relevante testfunn, revisjoner og kjente svakheter.
4. **Wiki / Kunnskapsbase:** kildeutdrag og lokalt faggrunnlag.
5. **Skills / Valgte metoder:** eventuelle prosedyrer, frames eller verktøy valgt for saken.
6. **Task Context / Saken:** brukerens konkrete problemstilling, dokumenter og bestillerrolle.

Konfliktregel: høyere lag vinner. Task context kan ikke instruere en linse til aa bryte linseteori eller guardrails.

## 4. Orkestratorens Route Plan

Orkestratoren skal alltid svare paa fem sporsmaal foer linseanalyse starter:

```text
1. Hva slags problemstilling er dette?
2. Hvilke 3-5 linser er mest relevante, og hvorfor?
3. Hvilke relevante linser forkastes, og hvorfor?
4. Hvilke spenninger forventes mellom valgte linser?
5. Hvilket artefakt skal analysen ende i?
```

Minimumsoutput fra Orkestratoren:

```yaml
route_plan:
  problemtype:
  valgt_arbeidslop:
  valgte_linser:
    - id:
      rolle:
      vekt:
      trigger_match:
      begrunnelse:
      forventet_bidrag:
  forkastede_linser:
    - id:
      begrunnelse:
  forventede_spenninger:
  forventet_sluttartefakt:
  decision_trace_ref:
```

Orkestratoren skal ikke skrive endelig faglig anbefaling alene. Den skal velge analyseteam og gjøre ruten etterprøvbar.

## 5. Linsekort

Hver linse som skal kunne brukes i analyseteamet må ha dette minimumsformatet:

```yaml
id:
navn:
gruppe:
standardvekt: 0.0-1.0
status: draft|prototype|pilot|active|revision
teori:
  - navn:
    bidrag:
    vekt: 0.0-1.0
triggere:
  ok_nar:
  ikke_nar:
konflikter_med:
metode:
  trigger_to_technique:
    - trigger:
      teknikk:
      prosedyre:
      output:
disseksjonsfokus:
  - hva_linsen_ser_etter:
  - typiske_blindsoner:
  - typiske_sporsmal:
handoff:
  kan_sende_til:
  typisk_artifact:
guardrails:
testkrav:
```

En linse er ikke ferdig hvis den bare beskriver en rolle. Den maa inneholde operativ metode: naar X skjer, bruk Y fremgangsmaate, produser Z artefakt.

## 6. Felles Disseksjonsprotokoll

Alle linser skal analysere samme problemstilling gjennom samme ytre struktur. Dette gir sammenlignbare funn uten aa gjøre linsene like.

```text
1. Paastand eller beslutning
   - Hva hevdes, foreslas eller forutsettes?

2. Underliggende antakelser
   - Hvilke fakta, verdier, ressurser, hjemler eller aarsakskjeder tas for gitt?

3. Linseobservasjon
   - Hva ser denne linsen som viktigst, som andre lett overser?

4. Dypere disseksjon
   - Hvilken mekanisme, risiko, mulighet, konflikt eller blindflekk avdekkes?

5. Kvalitetshevende motsporsmal
   - Hvilke sporsmal ville gjort saken skarpere, tryggere eller mer nyttig?

6. Perspektivkobling
   - Hvilken annen linse bor kobles inn, og hvorfor?

7. Artefakt
   - Hva leverer linsen: funn, risikoliste, alternativ, handoff, beslutningssporsmal eller revisjonspunkt?
```

Maalet er aa si noe brukeren ikke allerede har sagt, men som fortsatt er relevant for saken.

## 7. Vekting og Promptbudsjett

Tekstlig metode og numerisk vekting har ulike roller:

| Element | Styres av tekst | Styres av 0-1 vekt |
|---|---|---|
| Faglig perspektiv | Ja | Nei |
| Beslutningslogikk | Ja | Delvis |
| Valg av linser | Delvis | Ja |
| Rekkefolge | Delvis | Ja |
| Promptbudsjett | Nei | Ja |
| Konfliktstyrke | Delvis | Ja |
| Outputformat | Ja | Nei |

Vekt skal ikke erstatte metode. Vekt skal prioritere metode.

Foreslaatt beregning for v1:

```text
aktiv_vekt = standardvekt
            + trigger_match
            + risikoniva
            + bestillerrolle_match
            - eksplisitt_irrelevans
```

Skala:

```text
0.00-0.19 = ikke aktiver
0.20-0.39 = støtteperspektiv
0.40-0.69 = aktiv linse
0.70-1.00 = hovedlinse
```

Promptbudsjett:

```text
hovedlinse: full disseksjonsprotokoll
aktiv linse: kort disseksjonsprotokoll
støtteperspektiv: 1-2 blindsoner eller motsporsmal
ikke aktiv: bare list som forkastet i decision_trace ved behov
```

## 8. Rolle for Eksterne Repoer

### PersonaNexus

Brukes naar en eksisterende linse trenger tydeligere tone, grense, usikkerhetssignal eller handoff-format.

Eksempel:

```text
D1 Juristen beholder teori og juridisk vurderingsmandat.
Lex kan tilføre disclaimer, jurisdiksjonssjekk og risikorating.
Lex blir ikke en ny linse.
```

### AgentForge

Brukes til aa forbedre hvordan linser bygges og testes:

- trigger-to-technique
- guardrail-sjekk
- draft-review
- case-evaluator
- gap-analyse
- handoff-graf
- lagdelt promptarkitektur

AgentForge skal ikke importeres som runtime i Linselab.

### Prism

Brukes forelopig bare som katalog over mulige metoder. Prism kan foresla at Juristen senere tester IRAC, eller at Stabssjefen tester DACI/RAPID, men Prism-tekst skal ikke kopieres, tilpasses eller aktiveres foer lisensgate er lukket.

## 9. Agentroller i Analyseflyten

| Agent | Oppgave | Skal ikke |
|---|---|---|
| Dirigenten / Orkestratoren | Velge problemtype, arbeidslop, linser og rute | Skrive endelig faglig anbefaling alene |
| Linseagent | Analysere fra ett perspektiv med disseksjonsprotokollen | Blande flere linser eller lage totalvurdering |
| Stabssjefen | Syntetisere funn, konfliktlinjer, ansvar og neste steg | Skjule usikkerhet eller slette nyttig variasjon |
| Evalrevisoren | Vurdere merverdi, red flags og case-test | Late som eval-pass er produksjonsgodkjenning |
| Forbedringskoordinatoren | Route revisjonsfunn til riktig eier og neste oppdrag | Godkjenne autonom endring |

## 10. Eval: Bedre enn Generisk ChatGPT

En linseanalyse er bedre enn generisk ChatGPT hvis den scorer høyere på minst tre av disse kriteriene:

```text
1. Finner relevante blindsoner brukeren ikke allerede nevnte.
2. Stiller bedre oppfølgingssporsmal.
3. Velger mer presise linser enn en generisk analyse ville gjort.
4. Skiller fakta, antakelser og tolkninger tydeligere.
5. Synliggjør konflikt mellom perspektiver uten aa glatte den bort.
6. Gir mer handlingsrettet artefakt.
7. Eskalerer riktig naar saken krever menneskelig/faglig vurdering.
```

Scoring:

```text
0.0 = ikke tilstede
0.5 = delvis tilstede, men generisk eller svakt begrunnet
1.0 = tydelig tilstede, konkret og relevant for saken
```

Aktivering fra prototype til pilot krever dokumentert case-test med:

- route plan
- minst tre linseoutputs
- syntese
- decision_trace
- evalscore
- revisjonsnotat ved svakheter

## 11. Aktiveringsregel

Denne standarden kan ikke alene aktivere linser. Den aktiverer bare en felles maate aa skrive og teste linser paa.

For at en linsepakke skal aktiveres, maa den ha:

1. linsekort etter denne standarden
2. dokumentert trigger-to-technique
3. kjent promptbudsjett/vekt
4. tydelig handoff
5. case-test
6. evalscore og revisjonsbeslutning
7. registrering i `ACTIVE_LIBRARY_INDEX.md`

Inntil dette er gjort, er standarden og alle nye linsepakker `draft` eller `prototype_candidate`.
