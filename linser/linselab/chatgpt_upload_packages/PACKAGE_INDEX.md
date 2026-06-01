# ChatGPT Upload Packages for Linselab

These ZIP packages are curated for upload to a ChatGPT project. They mirror the project capabilities without dumping the whole repository.

## Packages

| Zip | Purpose | Use when |
|---|---|---|
| `01_core_mvp.zip` | Project mandate, MVP, prompt standard, Orchestrator prototype, core registers | The ChatGPT project needs to understand what to build and what not to activate |
| `02_lens_source_base.zip` | Local Linselab lens source material | The project needs to create or improve lenses from local primary sources |
| `03_external_repo_methods.zip` | AgentForge, PersonaNexus, and Prism-derived method/status material | The project needs to use external repo value without replacing local lenses |
| `04_orchestration_eval.zip` | Agent contracts, task envelope, handover, eval rules, test sets | The project needs to test routing, handoffs, and better-than-generic quality |

## Core rule

Local Linselab lenses are the primary source. External repos are support layers:

- PersonaNexus: tone, boundaries, answer shape, uncertainty signals.
- AgentForge: methodology, eval, prompt architecture, handoff logic.
- Prism: method catalog only until license gate is closed.

Nothing in these packages is active production content unless `ACTIVE_LIBRARY_INDEX.md` says so.
