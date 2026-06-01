# Antigravity handoff: AgentForge stage 1

## Mandate
Review and extend the worker-run at:

`C:\Users\larse\Documents\Interne prosjekter\Linser\linselab\worker_runs\agentforge_metadata_inventory`

This is a metadata and method-candidate pass only. Do not edit active registers, do not activate instruments, and do not rewrite Linselab source files.

## Allowed inputs
- `C:\Users\larse\Downloads\agentforge-main.zip`
- Files already generated under `C:\Users\larse\Documents\Interne prosjekter\Linser\linselab\worker_runs\agentforge_metadata_inventory`

## Allowed outputs
Write only inside:

`C:\Users\larse\Documents\Interne prosjekter\Linser\linselab\worker_runs\agentforge_metadata_inventory`

Preferred additions:
- `agentforge_method_review.jsonl`
- `agentforge_overlap_notes.md`
- `agentforge_stage2_recommendation.md`

## Current products
- `agentforge_zip_entries.jsonl`: one JSON record per zip file entry.
- `agentforge_method_candidates.jsonl`: staged candidates from docs and method/prompt source files.
- `agentforge_unpack_summary.md`: counts, extracted metadata paths, and verification notes.
- `agentforge_license_status.md`: local MIT evidence.

## Rules
- Keep `license_status: mit` only when records are grounded in the local `LICENSE`.
- Do not merge, normalize, or deduplicate into main registers.
- Do not edit `ACTIVE_LIBRARY_INDEX.md`, `INSTRUMENT_REGISTER.yml`, `DUPLICATE_MAP.yml`, or `MERGE_DECISIONS.yml`.
- Mark uncertain items as `stage_only`.
- Preserve useful variance between workflow, heuristic, template candidate, and quality criteria.

## Stage 1 success criteria
- JSONL files parse cleanly.
- Method candidates identify concrete use in Linselab.
- Every claim has an `entry_path`.
- Next-stage recommendations separate safe extraction from register import.
