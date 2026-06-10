# Project: ROS and DPIA Mal- og Eksempelsamsvar

## Architecture
This project focuses on the validation and revision of ROS (Risk and Vulnerability) and DPIA (Data Protection Impact Assessment) templates, examples, and user guides for the HR Strategiradar application. The goal is to ensure alignement with:
- Domain terminology defined in `CONTEXT.md` (e.g. "foreløpig KI-diagnose", "KI-bruksoppgave").
- Legal requirements: PVO (Data Protection Officer) as strictly advisory, GDPR, and EU AI Act (high-risk employment AI systems).
- Avoidance of forbidden words: "fasit", "godkjent", "sertifikat".
- Structural integrity: valid YAML frontmatter, no real personal data, etc.
- Programmatic verification via a verification script in `scratch/`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Analysis | Scan target files for discrepancies, forbidden words, and lack of YAML headers. | None | DONE |
| 2 | Implementation & Revision | Edit files to address findings, write validation script in `scratch/`. | M1 | IN_PROGRESS |
| 3 | Verification, Review, Audit | Run validation script, run reviews & forensic audit to verify compliance. | M2 | PLANNED |

## Code Layout
- `templates/ros/hr_strategiradar_ros_mal.md` - ROS Template
- `templates/dpia/hr_strategiradar_dpia_mal.md` - DPIA Template
- `examples/ros/ros_eksempel_seniorbevaring_anonymisert_innsikt.md` - ROS Example 1
- `examples/ros/ros_eksempel_individuell_prioritering_tiltak_stopp.md` - ROS Example 2
- `examples/dpia/dpia_eksempel_sykefravaer_tilrettelegging_ki_stotte.md` - DPIA Example 1
- `docs/guides/ros_dpia_veiledning.md` - Guidance document
- `scratch/` - Folder for the programmatic verification script

## Interface Contracts
- The verification script in `scratch/` must accept zero arguments and exit with code 0 on success, and non-zero on failure. It must scan the 6 markdown files.
