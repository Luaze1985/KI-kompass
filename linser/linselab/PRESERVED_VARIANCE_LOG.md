# Preserved Variance Log

Use this file when two items look similar but the difference may be useful.

## Entries

```text
ID: PV-AF-001
Related source_id/instrument_id: agentforge-main/src/agentforge/* / registers/AGENTFORGE_METHOD_DRAFTS.yml
Difference to preserve: AgentForge provides executable Python runtime logic; Linselab keeps Markdown registers as master and extracts only prompts, schemas, heuristics, and checklists.
Why it matters: Importing runtime logic would bypass Codex-gate and weaken the file-based governance model.
Risk if removed: Future agents may treat AgentForge code as directly reusable production machinery instead of staged source material.
Decision status: preserve_as_governance_boundary
```

```text
ID: PV-AF-002
Related source_id/instrument_id: agentforge-main/src/agentforge/extraction/prompts.py / af-methodology-extraction
Difference to preserve: AgentForge "skill" terminology must become Linselab "lens" or "advisor profile" depending on whether the item changes reasoning or only tone/handoff.
Why it matters: Without the distinction, PersonaNexus profiles and method prompts can be mistaken for new lenses.
Risk if removed: The system may duplicate lenses or activate tone profiles as if they had independent theory.
Decision status: preserve_as_taxonomy_rule
```

```text
ID: PV-AF-003
Related source_id/instrument_id: agentforge-main/src/agentforge/department/handoffs.py / af-handoff-graph-template
Difference to preserve: AgentForge handoffs are graph edges with trigger and artifact; Linselab handovers must remain deterministic packets, not free agent conversation.
Why it matters: This preserves rigid orchestration while still adopting the useful handoff structure.
Risk if removed: Multi-lens work could drift into informal agent dialogue without traceable artifacts.
Decision status: preserve_as_orchestration_rule
```

Template:

```text
ID:
Related source_id/instrument_id:
Difference to preserve:
Why it matters:
Risk if removed:
Decision status:
```
