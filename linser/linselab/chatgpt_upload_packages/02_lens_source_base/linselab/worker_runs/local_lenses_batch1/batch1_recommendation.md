# Antigravity Recommendation: Batch 1 Lenses

## Status
I have scanned the local Linselab source file `02_linser/KJERNELINSER.md.txt` (Source ID: `SRC-FILE-0046`) as defined by the Merge Backlog (Batch 1).

## Findings
The 5 requested lenses have been successfully extracted into `batch1_candidates.jsonl`.
These are natively formatted as YAML+Markdown combinations in the source file, which matches the Linselab structure, but they need to be properly registered and split into distinct `draft` files according to `NORMALISERT_LINSE_MINIMUM.md`.

## Recommendation for Codex (Stage 5?)
Codex should now process `batch1_candidates.jsonl`:
1. Create normalized draft files for each of the 5 lenses in `registers/drafts/`.
2. Add them to `INSTRUMENT_REGISTER.yml` under `instrument_candidates`.
3. Update `MERGE_BACKLOG.md` Batch 1 checkboxes to "Done".

Note: These are classified as `lens` candidates, not `advisor_profile`, since their source explicitly defines them with standard weights, triggers, conflict profiles, and specific prompt structures.
