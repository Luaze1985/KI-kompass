# Handoff: Pakk Ut Alt Kontrollert

## Kort status

Vi har oversikt nok til å gi arbeidet videre, men ikke til å be noen pakke ut alt ukritisk.

Status per kilde:

- Lokalt Linselab-/kommunegrunnlag er inventert og tekstuttrukket: 158 filer.
- PersonaNexus er delvis analysert: 5 rådgiverprofiler, 15 JSONL-funn, MIT-lisens finnes i zipen.
- Prism er metadataindeksert og triagert, men instrumentinnhold er blokkert: zipen mangler `LICENSE`, og upstream `LICENSE`/license API ga 404.
- AgentForge er ikke pakket ut i worker-run ennå, men tidligere inspeksjon viste MIT-lisens i zipen.

Målet for neste person er å pakke ut og analysere videre uten å miste kilder, uten å aktivere noe for tidlig, og uten å bruke Prism-tekst før lisensgrunnlaget er lukket.

## Kilder og nåværende kontrollfiler

Arbeidsrot:

```text
C:\Users\larse\Documents\Interne prosjekter\Linser
```

Viktigste statusfiler:

```text
linselab/registers/INGEST_SUMMARY.md
linselab/registers/SOURCE_REGISTER.yml
linselab/registers/TEXT_EXTRACT_INDEX.yml
linselab/worker_runs/persona_yaml_analysis/persona_yaml_findings.jsonl
linselab/worker_runs/prism_metadata_inventory/prism_metadata_summary.md
linselab/worker_runs/prism_persona_gap_triage/persona_gap_to_prism_candidates.jsonl
linselab/worker_runs/prism_license_overview_gate/prism_usage_decision.md
linselab/worker_runs/prism_license_overview_gate/next_safe_actions.md
```

Beskyttede filer som ikke skal endres under utpakking:

```text
linselab/ACTIVE_LIBRARY_INDEX.md
linselab/registers/INSTRUMENT_REGISTER.yml
linselab/registers/DUPLICATE_MAP.yml
linselab/registers/MERGE_DECISIONS.yml
```

## Hva som kan pakkes ut nå

### PersonaNexus

Kan pakkes videre til staging fordi zipen inneholder MIT-lisens.

Tillatt:

- Pakk ut flere YAML/MD/JSON-kilder til ny worker-run.
- Lag JSONL-funn etter samme mønster som `persona_yaml_findings.jsonl`.
- Klassifiser som `advisor_profile`, `behavioral_contract`, `answer_format`, `template_candidate`, `instrument_candidate`.

Ikke tillatt ennå:

- Ikke skriv direkte til aktive registre.
- Ikke aktiver rådgivere eller linser.
- Ikke slå sammen rådgivere bare fordi rollene ligner.

Anbefalt neste PersonaNexus-run:

```text
linselab/worker_runs/personanexus_full_staging/
```

### AgentForge

Kan pakkes til metadata/staging først fordi zipen inneholder MIT-lisens, men den er ikke analysert i nåværende worker-runs.

Tillatt første steg:

- Lag `agentforge_metadata_inventory`.
- Pakk ut `LICENSE`, README, docs og relevante prompt-/metodikkfiler.
- Klassifiser som `workflow`, `heuristic`, `template_candidate`, `quality_criteria`, `source_only`.

Ikke start med all Python-kode med mindre målet er teknisk analyse av verktøyet. For Linselab er docs og metodikk viktigere enn runtime.

Anbefalt worker-run:

```text
linselab/worker_runs/agentforge_metadata_inventory/
```

## Hva som ikke kan pakkes ut nå

### Prism `library/**`

Ikke pakk ut Prism-instrumentinnhold ennå.

Begrunnelse:

- `prism-main.zip` mangler `LICENSE`, `COPYING` og `NOTICE`.
- README sier MIT og peker til `LICENSE`.
- Upstream repo finnes, men raw `LICENSE` og GitHub license API ga 404.
- Gjeldende status er `blocked`.

Tillatt:

- Bruk Prism metadata, kandidatnavn, klasser og paths.
- Bruk de 15 kandidatene som prioriteringsliste.

Ikke tillatt:

- Ikke pakk ut `prism-main/library/**`.
- Ikke kopier, adapter, normaliser eller merge Prism-instrumenttekst.
- Ikke marker Prism-baserte kandidater som aktive eller case-testklare.

Hvis lisens senere dokumenteres, start med rekkefølgen i:

```text
linselab/worker_runs/prism_persona_gap_triage/prism_next_extraction_order.md
```

## Første anbefalte oppdrag til neste person

Start med AgentForge metadata, ikke Prism.

Oppdrag:

1. Lag `linselab/worker_runs/agentforge_metadata_inventory/`.
2. Les `C:\Users\larse\Downloads\agentforge-main.zip`.
3. Pakk kun ut:
   - `LICENSE`
   - `README.md`
   - `docs/*.md`
   - relevante `src/agentforge/extraction/*.py`
   - relevante `src/agentforge/generation/*.py`
   - relevante `src/agentforge/analysis/*.py`
4. Lag:
   - `agentforge_zip_entries.jsonl`
   - `agentforge_method_candidates.jsonl`
   - `agentforge_unpack_summary.md`
   - `agentforge_license_status.md`
5. Ikke endre hovedregistre.

Outputskjema for metodefunn:

```json
{
  "source_zip": "agentforge-main.zip",
  "entry_path": "",
  "license_status": "mit",
  "record_type": "workflow | heuristic | template_candidate | quality_criteria | source_only",
  "summary": "",
  "key_elements": [],
  "possible_linselab_use": "",
  "merge_risks": [],
  "next_action": "stage_only | compare_to_existing | candidate_for_register"
}
```

## Stoppunkter

Stopp og rapporter hvis:

- en kilde mangler lisens eller opphav
- en fil ser sensitiv/personlig ut
- en fil ikke kan leses uten konverteringstap
- nyttig variasjon står i fare for å bli slått sammen bort
- rådgiverprofil, linse og output-template blandes sammen
- Prism-instrumenttekst trengs før lisensstatus er løst

## Definition of Done for neste runde

Neste runde er ferdig når:

- alle nye filer ligger i én isolert `worker_runs/*`-mappe
- lisensstatus er dokumentert
- JSONL-output parser
- alle kilder har zip-entry/path og hash der det er relevant
- hovedregistre og `ACTIVE_LIBRARY_INDEX.md` er uendret
- det finnes en kort anbefaling om hva som kan importeres senere og hva som må vente
