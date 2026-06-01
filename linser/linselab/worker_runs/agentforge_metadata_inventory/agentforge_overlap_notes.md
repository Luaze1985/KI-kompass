# AgentForge Overlap Notes

## 1. Quality Criteria & Testing Overlap
AgentForge includes multiple scripts for auditing and validating generated capabilities (`guardrail_auditor.py`, `prompt_differ.py`, `skill_linter.py`, `skill_reviewer.py`, `evaluator.py`).
**Linselab Context:** Linselab maintains an explicit `CASE_TEST_LOG.md` and `PRESERVED_VARIANCE_LOG.md`.
**Recommendation:** We should not import AgentForge scripts as executable Python files. Instead, extract the **prompts** and **heuristics** from them and translate them into Linselab's Markdown-based "quality criteria" tools. `prompt_differ.py` in particular is highly relevant to how Linselab manages `PRESERVED_VARIANCE_LOG.md`.

## 2. Orchestration & Pipeline Overlap
AgentForge has `stages.py`, `handoffs.py`, and `composer.py` to handle pipeline execution and cross-agent task transfer.
**Linselab Context:** Linselab already has a strict Markdown-based orchestration framework (`ORKESTRERING_CODEX_ANTIGRAVITY.md` and `HANDOFF_*` files).
**Recommendation:** `handoffs.py` contains structural templates that can refine our existing handoff files. However, `composer.py` and `stages.py` should only be used as conceptual references, as adopting them would conflict with Linselab's Codex-gate control mechanism.

## 3. Extraction & Generation Overlap
AgentForge provides `prompts.py`, `methodology_extractor.py`, and `skill_extractor.py`.
**Linselab Context:** Linselab is preparing a register for five advisor profiles (Stage 3).
**Recommendation:** The prompts from `prompts.py` are immediate candidates for register (as `workflow_or_quality_method`), provided the terminology is translated from AgentForge's "skills" to Linselab's "lenses" and "advisor profiles".

## 4. Architectural Concepts
AgentForge's `layered-prompt-architecture.md` and `wiki-memory-design.md` outline separating policy, identity, tools, and memory.
**Linselab Context:** Linselab already heavily relies on separating source texts, staged worker runs, and active registers.
**Recommendation:** These documents provide a solid theoretical backing for Linselab's structure. They can be merged into the active library as reference documentation without overlapping with executable logic.

## Summary
The primary overlap risk is introducing Python runtime dependencies (`.py` scripts) into Linselab, which is designed around markdown registries and strict Codex gates. All AgentForge Python tools must be treated as **source material** from which to extract prompts, schemas, and heuristics, rather than code to be executed directly in Linselab.
