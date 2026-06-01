# Linselab Merge Control

This workspace is a controlled merge area for lenses, advisor prompts, models, frames, stances, heuristics, teaching material, and source references.

Current ingest source:

```text
C:\Users\larse\Documents\Interne prosjekter\learning lab\domains\kommune_org
```

Rules for this phase:

- Originals remain untouched in the source folder.
- Generated text extracts are working copies only.
- No item becomes active before classification, duplicate review, merge decision, and case testing.
- Archive unpacking, if needed later, must go through staging and be registered before use.

Primary files:

- `registers/SOURCE_REGISTER.yml`
- `registers/TEXT_EXTRACT_INDEX.yml`
- `registers/INSTRUMENT_REGISTER.yml`
- `registers/DUPLICATE_MAP.yml`
- `registers/MERGE_DECISIONS.yml`
- `ACTIVE_LIBRARY_INDEX.md`
- `PRESERVED_VARIANCE_LOG.md`
- `CASE_TEST_LOG.md`

Regenerate inventory and text extracts:

```powershell
python tools\ingest_sources.py --source-root "C:\Users\larse\Documents\Interne prosjekter\learning lab\domains\kommune_org" --output-root linselab
```
