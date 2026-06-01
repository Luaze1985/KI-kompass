# Prism Next Extraction Order

Status: `catalog_triage_only`
License gate: `declared_mit_missing_license_file`

No `library/**` content should be extracted until the Prism license file is supplied or otherwise verified.

## Recommended Order After License Gate

1. `irac-creac-firac` and `contract-analysis` for `Juridisk grensevurderer`, because this is the only PersonaNexus instrument candidate already close to lens prototype readiness.
2. `ooda-loop` for `Krisekoordinatoren`, because it can turn the severity-state model into a stepwise response cycle.
3. `daci` and `rapid` for `Styre- og styringsrådgiveren`, reviewed together because both address decision rights and may overlap.
4. `raci`, `5-whys`, and `a3-problem-solving` for `Mottaks- og eskaleringsrådgiveren`, moving from handoff roles to diagnosis to improvement case.
5. `pixar-formula`, `save-the-cat-beat-sheet`, and `three-act-structure` for `Fortellingsrådgiveren`, with explicit check that structure does not override writer intent.
6. Secondary support candidates: `stakeholder-mapping`, `statutory-interpretation-canons`, `nist-csf`, and `fmea` once the primary operational gaps are tested.

## Stop Conditions

- Stop if license remains unresolved and the work would require copying or adapting Prism text.
- Stop if two candidates solve the same problem but preserve useful variation, and log the difference instead of merging.
- Stop if a frame/model/heuristic is being treated as a lens without input, procedure, output format, and confidence signal.
