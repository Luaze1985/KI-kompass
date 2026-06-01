# Handoff: ChatGPT-prosjekt for Linse-MVP

## Mandat

Dette ChatGPT-prosjektet skal hjelpe Linselab med aa levendegjoere linsebiblioteket ved aa:

1. finne og strukturere relevant kunnskapsgrunnlag
2. lage flere linseutkast etter Linselabs standard
3. forbedre eksisterende linser med operativ metode
4. foresla nye linser bare naar case eller datagrunnlag viser et reelt hull
5. levere alt som forslag/drafts, ikke som aktiv produksjon

Prosjektet skal ikke aktivere linser, overskrive masterdokumenter eller behandle eksterne repoer som autoritet over lokale Linselab-linser.

## MVP-forslag

MVP-en er ikke en full analysemotor. MVP-en er en kontrollert produksjonsloype for aa bevise at linsene kan bli bedre, mer operative og mer datagrunnede.

### MVP-scope

MVP v0.1 skal levere:

1. **Orkestrator-test**
   - Bruk `A4 Orkestratoren` til aa velge analyseteam for en uklar problemstilling.
   - Output: `route_plan`, valgte/forkastede linser, forventede spenninger og `decision_trace`.

2. **Tre normaliserte linser**
   - Velg tre ufullstendige linser fra harmoniseringsoversikten.
   - Anbefalt foerste batch:
     - `A2 Organisasjonsteoretikeren`
     - `A3 Intergovernance-forvalteren`
     - `K2 Ledelsesstrategen`
   - Output: ett draft-dokument per linse etter `LINSE_PROMPT_STANDARD.md`.

3. **Datagrunnlag per linse**
   - Finn 5-10 relevante kilder per linse.
   - Kilder skal klassifiseres som teori, metode, praksis, offentlig forvaltning, kritikk eller case.
   - Output: `source_notes.jsonl`.

4. **Metode per linse**
   - Hver linse maa ha minst tre `trigger -> technique -> output`-regler.
   - Hver linse maa kunne si noe annet enn generisk ChatGPT.

5. **Eval og revisjonsnotat**
   - Vurder hvert utkast mot Linselabs kvalitetskrav.
   - Output: hva er sterkt, hva er generisk, hva mangler, hva maa testes i case.

### Ikke med i MVP

- Ingen full produksjonssetting.
- Ingen automatisk oppdatering av `ACTIVE_LIBRARY_INDEX.md`.
- Ingen Prism-tekstlig gjenbruk foer lisensgate er lukket.
- Ingen bygging av app, database eller runtime-agent.
- Ingen masseproduksjon av alle 52 linser.

## Viktige filer aa lese foerst

Arbeidsrot:

```text
C:\Users\larse\Documents\Interne prosjekter\Linser
```

Les i denne rekkefolgen:

```text
linselab/registers/HARMONISERINGS_OVERSIKT.md
linselab/registers/LINSE_PROMPT_STANDARD.md
linselab/registers/drafts/a4-orkestratoren.md
linselab/registers/AGENTFORGE_METHOD_DRAFTS.yml
linselab/registers/PERSONANEXUS_PROFILE_MAPPING.yml
linselab/CASE_TEST_LOG.md
linselab/ACTIVE_LIBRARY_INDEX.md
```

Lokale linsekilder:

```text
linselab/source_text_extracts/02_linser/LINSEINDEKS.md.txt
linselab/source_text_extracts/02_linser/KJERNELINSER.md.txt
linselab/source_text_extracts/10_kunnskapsbase/referanser/alle_linser_siste.docx.txt
linselab/source_text_extracts/02_linser/LINSEKARTLAG_IKKE_KOMMUNALE_ROLLER.md.txt
```

Orkestrering:

```text
linselab/source_text_extracts/04_orkestrering/OPPDRAGSFORMAT_OG_TRACE.md.txt
linselab/source_text_extracts/04_orkestrering/AGENTKONTRAKTER.md.txt
linselab/source_text_extracts/04_orkestrering/FASEGATE_SJEKKLISTER.md.txt
```

Eksterne repo-status:

```text
linselab/worker_runs/agentforge_metadata_inventory/AGENTFORGE_FULL_EXTRACTION.md
linselab/worker_runs/prism_license_overview_gate/prism_usage_decision.md
linselab/worker_runs/prism_persona_gap_triage/prism_candidate_shortlist.yml
linselab/worker_runs/persona_yaml_analysis/persona_yaml_findings.jsonl
```

## Styringsregler

1. Markdown er master.
2. Lokale linser er primaerkilde.
3. Eksterne repoer er støtte:
   - AgentForge = metode, eval, handoff og promptarkitektur.
   - PersonaNexus = tone, svarform, usikkerhet og grenser.
   - Prism = katalog over mulige teknikker, men tekstlig gjenbruk er blokkert.
4. Nye linser skal starte som `draft`.
5. En linse maa ha metode, ikke bare rollebeskrivelse.
6. Ingen linse kan aktiveres uten case-test.
7. Nyttig variasjon skal bevares, ikke glattes bort.

## Standard for nye linseutkast

Hver ny eller forbedret linse skal ha:

```yaml
id:
navn:
gruppe:
type: lens
status: draft
fasegate: prototype_candidate
standardvekt: 0.0-1.0
kilder:
triggere:
konflikter_med:
```

Og disse seksjonene:

```text
# Navn

## Rolle
## Brukes naar
## Brukes ikke naar
## Teoretisk og metodisk forankring
## Tankesett
## Trigger-to-technique
## Felles disseksjonsprotokoll tilpasset linsen
## Typisk output
## Blindsoner
## Handoff
## Guardrails
## Testkrav
```

## Datafangst

For hver kilde som brukes, lag en JSONL-linje:

```json
{
  "lens_id": "",
  "source_title": "",
  "source_type": "book | article | public_guidance | standard | case | local_source | other",
  "url_or_path": "",
  "why_relevant": "",
  "usable_concept": "",
  "risk_or_limit": "",
  "confidence": "low | medium | high"
}
```

Kildekrav:

- Bruk lokale kilder foerst.
- Eksterne kilder skal brukes for aa fylle hull, ikke erstatte lokale konsepter.
- Skill teori, metode, praksis og kritikk.
- Ikke bruk kilder uten aa notere begrensning.

## Outputmappe

ChatGPT-prosjektet skal skrive foreslaatte artefakter i en ny staging-mappe:

```text
linselab/worker_runs/chatgpt_lens_mvp/
```

Forventede filer:

```text
chatgpt_lens_mvp_summary.md
route_test_CT-A4-ROUTE-001.md
source_notes.jsonl
draft_lens_A2_organisasjonsteoretikeren.md
draft_lens_A3_intergovernance_forvalteren.md
draft_lens_K2_ledelsesstrategen.md
lens_quality_review.jsonl
recommended_register_updates.md
```

## Route-test: CT-A4-ROUTE-001

Bruk en uklar administrativ problemstilling der tiltaket kan ha juridiske, økonomiske, organisatoriske og menneskelige konsekvenser.

Orkestratoren skal levere:

```yaml
route_plan:
  problemtype:
  valgt_arbeidslop:
  risikoniva:
  bestillerrolle:
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
  handoff_plan:
  decision_trace_ref:
```

Kvalitetskriterier:

- 3-5 linser valgt.
- Minst to plausible linser forkastet.
- Minst tre blindsoner/spenninger som ikke er trivielle.
- Minst én ikke-åpenbar, men relevant linse valgt.
- Ingen endelig anbefaling uten linseanalyse.

## Nye linser fra case

ChatGPT-prosjektet kan foresla en ny linse bare hvis alle disse er sanne:

1. En case viser et gjentakende blindpunkt.
2. Eksisterende 52 linser dekker ikke blindpunktet godt nok.
3. Forslaget har egen metode, ikke bare nytt navn.
4. Forslaget har minst tre triggere.
5. Forslaget har tydelig konflikt med minst to eksisterende linser.
6. Forslaget kan testes i en case.

Foreslaatte nye linser skal legges i:

```text
linselab/worker_runs/chatgpt_lens_mvp/proposed_new_lenses/
```

De skal ikke legges direkte i `registers/drafts/`.

## Stoppunkter

Stopp og rapporter hvis:

- datagrunnlaget er for tynt til aa skrive metode
- en foreslatt linse bare er en stillingsinstruks
- en PersonaNexus-profil behandles som linse
- Prism-tekst trengs foer lisens er lukket
- kilder motsier hverandre og nyttig variasjon kan gaa tapt
- output begynner aa bli et stort generisk promptdokument

## Definition of Done

MVP-handoff er fullfort naar:

- `chatgpt_lens_mvp_summary.md` forklarer hva som ble gjort
- `route_test_CT-A4-ROUTE-001.md` viser Orkestratorens rutevalg
- tre linseutkast foreligger i staging
- `source_notes.jsonl` har kilder per linse
- `lens_quality_review.jsonl` vurderer methodology, triggers, templates, quality, scope og examples
- `recommended_register_updates.md` sier hva Codex kan importere senere
- ingenting er aktivert i `ACTIVE_LIBRARY_INDEX.md`
