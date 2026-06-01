# AgentForge Stage 2 Recommendations

## Codex Gate Mandate
As defined in `ORKESTRERING_CODEX_ANTIGRAVITY.md`, Stage 2 requires Codex to validate Antigravity's output, compare findings to existing flows, and decide what enters the active registers.

## Recommendation Summary
Based on the review of the 17 method candidates from AgentForge, Antigravity recommends the following approach for Stage 2:

### 1. Taxonomy Translation First
Before any AgentForge artifact is merged into `INSTRUMENT_REGISTER.yml` or `ACTIVE_LIBRARY_INDEX.md`, Codex must perform a strict terminology translation:
- `Skill` -> `Lens` or `Advisor Profile`
- `Agent Team` -> `Advisor Package`
- `Guardrail` -> `Quality Criteria / Gate`

### 2. Prioritized Draft Registers (candidate_for_register)
Codex should extract the **prompts and markdown content** (ignoring the Python execution logic) from the following files to create draft instruments:
- `prompts.py` (Excellent templates for LLM methodology extraction)
- `handoffs.py` (High value for improving Codex-to-Antigravity worker handoffs)
- `guardrail_auditor.py` (Crucial logic for validating Linselab packages before activation)
- `skill_reviewer.py` (Good heuristic for assessing staged drafts)
- `evaluator.py` (LLM-as-judge prompts to power `CASE_TEST_LOG.md`)
- `gap_analyzer.py` (Identify missing lenses in an advisor package)
- `layered-prompt-architecture.md` (As foundational documentation in active library)

### 3. Conceptual References (compare_to_existing)
Codex should review these against current Linselab mechanisms, extracting only variance or improved wording:
- `prompt_differ.py` (Compare with how Linselab logs variance in `PRESERVED_VARIANCE_LOG.md`)
- `methodology_extractor.py` & `skill_extractor.py` (Compare extraction steps to Linselab's source-to-staged workflow)
- `skill_linter.py` (Extract structural rules that apply to Linselab Markdown schemas)
- `stages.py` (Compare to the Codex/Antigravity stage definitions)
- `day2-products.md` & `wiki-memory-design.md` (Compare to current directory mapping)

### 4. Stage Only (stage_only)
These are premature for Linselab's current single-advisor/lens focus and should remain staged:
- `team_composer.py`
- `team_validator.py`
- `composer.py`

## Next Action for Codex
1. Review `agentforge_method_review.jsonl` and `agentforge_overlap_notes.md`.
2. Extract the prompt templates from the priority candidates.
3. Update `MERGE_DECISIONS.yml` with the explicit decision to translate terminology before activating any extracted tools.
4. Prepare the Stage 3 register drafts for the five advisor profiles using the translated extraction prompts.
