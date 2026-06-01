# Orkestrering: Codex og Antigravity

Dette dokumentet styrer arbeidsdelingen mellom Codex og Antigravity for Linselab.

## Prinsipp

- Codex er kontrolltaarn: scope, lisensgate, registergate, merge-beslutninger og endelig aktivering.
- Antigravity er worker: avgrenset analyse, utpakking i worker-runs, JSONL-funn og forslag.
- Ingen worker endrer aktive registre direkte.
- Alt som skal bli aktivt maa gjennom Codex-gate etter inventory, duplikatsjekk, variansvurdering og case-test.

## Stage 1: AgentForge metadata-inventory

Status: `codex_done_ready_for_antigravity_review`

Worker-run:

`C:\Users\larse\Documents\Interne prosjekter\Linser\linselab\worker_runs\agentforge_metadata_inventory`

Codex har produsert:

- `agentforge_zip_entries.jsonl`
- `agentforge_method_candidates.jsonl`
- `agentforge_license_status.md`
- `agentforge_unpack_summary.md`
- `ANTIGRAVITY_STAGE1_HANDOFF.md`

Top-level handoff:

`C:\Users\larse\Documents\Interne prosjekter\Linser\linselab\HANDOFF_ANTIGRAVITY_AGENTFORGE_STAGE1.md`

Antigravity skal naa:

- lese eksisterende worker-run
- kontrollere om de 17 metodekandidatene er riktig klassifisert
- skrive kun inne i samme worker-run
- foreslaa stage 2 uten aa endre hovedregistre

Tillatte Antigravity-output:

- `agentforge_method_review.jsonl`
- `agentforge_overlap_notes.md`
- `agentforge_stage2_recommendation.md`

## Stage 2: Codex-gate etter Antigravity

Status: `done`

Codex skal:

- validere Antigravity-output
- sammenligne mot eksisterende Linselab-flows
- markere hva som er source_only, stage_only eller register-kandidat
- oppdatere merge-backlog bare etter eksplisitt beslutning

## Stage 3: PersonaNexus til registerutkast

Status: `done`

Input:

- `persona_yaml_findings.jsonl`
- AgentForge review hvis relevant

Codex skal lage registerutkast for fem raadgiverprofiler, men ikke aktivere dem foer case-test.

## Stage 4: Prism hold

Status: `blocked`

Prism `library/**` forblir blokkert for tekstlig gjenbruk til lisensgrunnlag er dokumentert. Prism kan fortsatt brukes som metadata-/navne-/prioriteringskart.

## Stoppunkter

Stopp hvis:

- worker foreslaar aa endre hovedregistre direkte
- en persona blir behandlet som lens uten operativ prosedyre
- Prism-tekst brukes uten lisensavklaring
- duplikater slaas sammen uten preserved-variance note
- kandidat mangler `entry_path`
