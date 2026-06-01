# Prism Usage Decision

Generated: `2026-05-18T13:49:16.2837439Z`

Decision status: `blocked`

Allowed now:

- Use Prism metadata for triage and prioritization.
- Keep the 15 candidate mappings as catalog-level references.
- Discuss Prism concepts at a high level without copying instrument text.

Not allowed yet:

- Extract Prism `library/**` instrument content.
- Copy, adapt, normalize, or merge Prism instrument wording into Linselab.
- Mark any Prism-derived candidate as active or ready for case testing.

Reason:

- Local zip lacks LICENSE and upstream LICENSE checks returned 404. README declares MIT, but the referenced license file is not present.

Status alternatives not chosen:

- `externally_verified_but_zip_incomplete`: not chosen because upstream license endpoints returned 404.
- `cleared_for_reference_extraction`: not chosen because no license file was documented.
