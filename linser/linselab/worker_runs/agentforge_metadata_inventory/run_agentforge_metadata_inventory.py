from __future__ import annotations

import hashlib
import json
import re
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
RUN_DIR = ROOT / "linselab" / "worker_runs" / "agentforge_metadata_inventory"
INPUT_DIR = RUN_DIR / "input_metadata"
ZIP_PATH = Path(r"C:\Users\larse\Downloads\agentforge-main.zip")
SOURCE_ZIP = "agentforge-main.zip"
LICENSE_STATUS = "mit"

PROTECTED_FILES = [
    ROOT / "linselab" / "ACTIVE_LIBRARY_INDEX.md",
    ROOT / "linselab" / "registers" / "INSTRUMENT_REGISTER.yml",
    ROOT / "linselab" / "registers" / "DUPLICATE_MAP.yml",
    ROOT / "linselab" / "registers" / "MERGE_DECISIONS.yml",
]

METADATA_PREFIXES = (
    "agentforge-main/docs/",
    "agentforge-main/src/agentforge/extraction/",
    "agentforge-main/src/agentforge/analysis/",
    "agentforge-main/src/agentforge/prompt_composer/",
    "agentforge-main/src/agentforge/testing/",
    "agentforge-main/src/agentforge/pipeline/",
    "agentforge-main/src/agentforge/department/",
)

METADATA_EXACT = {
    "agentforge-main/LICENSE",
    "agentforge-main/README.md",
    "agentforge-main/plan.md",
    "agentforge-main/pyproject.toml",
    "agentforge-main/src/agentforge/generation/identity_generator.py",
    "agentforge-main/src/agentforge/generation/identity_loader.py",
    "agentforge-main/src/agentforge/generation/personanexus_deployment.py",
    "agentforge-main/src/agentforge/generation/skill_file.py",
    "agentforge-main/src/agentforge/generation/skill_folder.py",
    "agentforge-main/src/agentforge/models/extracted_skills.py",
    "agentforge-main/src/agentforge/models/blueprint.py",
}


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def protected_hashes() -> dict[str, str]:
    result: dict[str, str] = {}
    for path in PROTECTED_FILES:
        result[str(path)] = sha256_bytes(path.read_bytes())
    return result


def infer_area(path: str) -> str:
    parts = path.split("/")
    if len(parts) >= 4 and parts[0] == "agentforge-main" and parts[1] == "src":
        return parts[3]
    if len(parts) >= 3 and parts[0] == "agentforge-main" and parts[1] == "docs":
        return "docs"
    if len(parts) >= 2:
        return parts[1]
    return "root"


def infer_domain(path: str) -> str:
    lower = path.lower()
    if "prompt" in lower:
        return "prompt_architecture"
    if "skill" in lower:
        return "skill_extraction_and_review"
    if "guardrail" in lower:
        return "guardrails"
    if "testing" in lower or "scenario" in lower or "evaluator" in lower:
        return "evaluation"
    if "pipeline" in lower or "stage" in lower:
        return "pipeline"
    if "department" in lower or "team" in lower or "conductor" in lower:
        return "agent_team_orchestration"
    if "wiki" in lower or "memory" in lower:
        return "knowledge_memory"
    if "gap" in lower or "drift" in lower or "differ" in lower:
        return "analysis_and_quality"
    if "identity" in lower or "persona" in lower:
        return "persona_identity_generation"
    if "license" in lower:
        return "license"
    if "readme" in lower or lower.endswith("/plan.md"):
        return "overview"
    return "source_project"


def infer_file_role(path: str) -> str:
    lower = path.lower()
    if lower.endswith("license"):
        return "license"
    if "/docs/" in lower or lower.endswith("readme.md") or lower.endswith("plan.md"):
        return "documentation"
    if "prompt" in lower:
        return "prompt_or_composer_source"
    if "test" in lower or "evaluator" in lower or "scenario" in lower:
        return "evaluation_source"
    if "analysis/" in lower:
        return "analysis_source"
    if "extraction/" in lower:
        return "extraction_source"
    if "generation/" in lower:
        return "generation_source"
    return "source_or_config"


def should_extract(path: str) -> bool:
    if path in METADATA_EXACT:
        return True
    return any(path.startswith(prefix) for prefix in METADATA_PREFIXES)


def jsonl_write(path: Path, records: list[dict]) -> None:
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")


def read_zip_text(archive: zipfile.ZipFile, entry_path: str) -> str:
    try:
        data = archive.read(entry_path)
    except KeyError:
        return ""
    return data.decode("utf-8", errors="replace")


def one_liner_from_text(text: str, fallback: str) -> str:
    for line in text.splitlines():
        clean = line.strip().lstrip("#").strip()
        if not clean:
            continue
        if len(clean) > 180:
            clean = clean[:177].rstrip() + "..."
        return clean
    return fallback


def candidate(
    entry_path: str,
    record_type: str,
    summary: str,
    key_elements: list[str],
    possible_use: str,
    risks: list[str],
    next_action: str,
    confidence: str = "medium",
) -> dict:
    return {
        "source_zip": SOURCE_ZIP,
        "entry_path": entry_path,
        "license_status": LICENSE_STATUS,
        "record_type": record_type,
        "native_type": "agentforge_source_or_doc",
        "target_type": "workflow_or_quality_method",
        "summary": summary,
        "key_elements": key_elements,
        "possible_linselab_use": possible_use,
        "merge_risks": risks,
        "next_action": next_action,
        "confidence": confidence,
    }


def build_method_candidates(archive: zipfile.ZipFile) -> list[dict]:
    source_notes = {
        "agentforge-main/docs/layered-prompt-architecture.md": (
            "workflow",
            "Layered prompt architecture for separating identity, policy, tools, context, memory, output contract, and evaluation concerns.",
            ["layer separation", "prompt composition", "responsibility boundaries", "budgeting and traceability"],
            "Use as architecture guidance for separating Linselab advisor profiles, lenses, templates, guardrails, and source context.",
            ["Could become too framework-specific if copied as product architecture instead of extracted as principles."],
            "compare_to_existing",
            "high",
        ),
        "agentforge-main/src/agentforge/extraction/prompts.py": (
            "template_candidate",
            "Prompt templates for extracting structured methodology and skill information from source text.",
            ["structured extraction", "methodology fields", "skill extraction prompts", "JSON-oriented output"],
            "Use as inspiration for Antigravity/LLM extraction prompts that produce JSONL findings for Linselab.",
            ["Prompt wording should be adapted, not blindly reused, so it fits Linselab taxonomy."],
            "candidate_for_register",
            "high",
        ),
        "agentforge-main/src/agentforge/extraction/methodology_extractor.py": (
            "workflow",
            "Pipeline logic for turning source material into methodology-oriented structured output.",
            ["input text", "LLM extraction", "structured result", "error handling"],
            "Use as a reference for a Linselab source-to-instrument extraction worker.",
            ["Runtime implementation details may not map cleanly to the current document database."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/extraction/skill_extractor.py": (
            "workflow",
            "Extractor for skill-like artifacts and reusable capability descriptions.",
            ["skill candidates", "capability summaries", "structured outputs", "source grounding"],
            "Use to separate reusable advisor capabilities from full persona files.",
            ["Could blur advisor profile and executable lens unless output schema enforces the distinction."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/prompt_composer/composer.py": (
            "workflow",
            "Prompt composer implementation for assembling prompt layers under constraints.",
            ["composition rules", "layer order", "budget handling", "resolver hooks"],
            "Use as design input for a Linselab pack builder that assembles active advisor packages from registers.",
            ["Do not import runtime assumptions before Linselab package boundaries are finalized."],
            "stage_only",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/guardrail_auditor.py": (
            "quality_criteria",
            "Audits generated artifacts against guardrail coverage and missing constraints.",
            ["guardrail coverage", "missing policy checks", "risk flags", "review findings"],
            "Use as a model for checking advisor profiles and lenses before activation.",
            ["May overfit to AgentForge guardrail terminology unless mapped to Linselab gates."],
            "candidate_for_register",
            "high",
        ),
        "agentforge-main/src/agentforge/analysis/prompt_differ.py": (
            "quality_criteria",
            "Compares prompt versions and surfaces meaningful changes.",
            ["diffing", "change review", "prompt variance", "regression risk"],
            "Use for merge review when two lenses or advisor prompts look similar but may preserve useful variance.",
            ["Naive diffs can misclassify wording changes as conceptual changes."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/gap_analyzer.py": (
            "heuristic",
            "Analyzes missing or weak areas in a generated skill or package.",
            ["gap categories", "coverage review", "recommendations", "risk surfacing"],
            "Use for finding holes in Linselab advisor packs before they move from staged to active.",
            ["Needs Linselab-specific gap taxonomy before results can be authoritative."],
            "candidate_for_register",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/skill_linter.py": (
            "quality_criteria",
            "Lint-style checks for skill artifacts.",
            ["static checks", "format expectations", "missing sections", "review flags"],
            "Use as inspiration for a Linselab instrument linter before register import.",
            ["Lint rules should be narrow enough to avoid flattening stylistic variation."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/skill_reviewer.py": (
            "quality_criteria",
            "Review workflow for assessing generated skill quality.",
            ["quality review", "recommendations", "accept/revise signals", "structured findings"],
            "Use as a review pattern for staged lenses, templates, and advisor profiles.",
            ["Review output must cite source paths so merge decisions remain traceable."],
            "candidate_for_register",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/team_composer.py": (
            "workflow",
            "Composes agent teams from capability requirements.",
            ["role selection", "team composition", "capability matching", "constraints"],
            "Use for future orchestration of advisor/lens bundles around case types.",
            ["Could prematurely turn all lenses into agents unless the taxonomy gate is enforced."],
            "stage_only",
            "medium",
        ),
        "agentforge-main/src/agentforge/analysis/team_validator.py": (
            "quality_criteria",
            "Validates whether a composed team covers needed capabilities.",
            ["coverage validation", "role fit", "missing capability detection", "warnings"],
            "Use for testing whether a Linselab package has enough roles and lenses for a scenario.",
            ["Needs case-based evaluation data before validation can be trusted."],
            "stage_only",
            "medium",
        ),
        "agentforge-main/docs/day2-products.md": (
            "workflow",
            "Day-2 productization concepts for maintaining and improving generated artifacts after creation.",
            ["lifecycle", "maintenance", "review loops", "post-generation products"],
            "Use as source inspiration for operating Linselab as a living document/code database.",
            ["Could expand scope too far if productization is started before inventory is stable."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/docs/wiki-memory-design.md": (
            "workflow",
            "Design notes for memory/wiki style knowledge management.",
            ["memory schema", "promotion", "knowledge capture", "retrieval"],
            "Use as inspiration for separating source archive, staged findings, and active library.",
            ["Memory patterns must not override source-register-first governance."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/testing/evaluator.py": (
            "quality_criteria",
            "Evaluation runner concepts for testing generated skills or artifacts.",
            ["scenario tests", "evaluation criteria", "execution", "scores"],
            "Use to develop case tests before lenses are marked active.",
            ["Evaluation scoring needs human-readable rationale, not only pass/fail."],
            "candidate_for_register",
            "medium",
        ),
        "agentforge-main/src/agentforge/pipeline/stages.py": (
            "workflow",
            "Pipeline stage definitions for multi-step artifact generation and checking.",
            ["stages", "sequencing", "handoffs", "status transitions"],
            "Use as inspiration for staged Linselab workflow from source to candidate to active.",
            ["Stage names should follow existing Linselab registers rather than AgentForge internals."],
            "compare_to_existing",
            "medium",
        ),
        "agentforge-main/src/agentforge/department/handoffs.py": (
            "template_candidate",
            "Handoff helpers for passing work between agents or roles.",
            ["handoff format", "role boundaries", "task transfer", "context package"],
            "Use to standardize Codex-to-Antigravity worker handoffs.",
            ["Must keep hard limits: no register edits, no activation, explicit output paths."],
            "candidate_for_register",
            "medium",
        ),
    }

    records: list[dict] = []
    for entry_path, spec in source_notes.items():
        record_type, summary, elements, possible_use, risks, action, confidence = spec
        text = read_zip_text(archive, entry_path)
        if text:
            first_line = one_liner_from_text(text, summary)
            if first_line and first_line.lower() not in summary.lower():
                elements = elements + [f"source cue: {first_line}"]
        records.append(
            candidate(
                entry_path=entry_path,
                record_type=record_type,
                summary=summary,
                key_elements=elements,
                possible_use=possible_use,
                risks=risks,
                next_action=action,
                confidence=confidence,
            )
        )
    return records


def write_license_status(license_text: str, has_license: bool) -> None:
    first_line = one_liner_from_text(license_text, "MIT License")
    status = "mit" if has_license and re.search(r"\bMIT License\b", license_text, re.I) else "needs_review"
    content = f"""# AgentForge license status

Status: `{status}`

Local evidence:
- Zip checked: `{ZIP_PATH}`
- `agentforge-main/LICENSE` present: `{str(has_license).lower()}`
- First license line: `{first_line}`

Decision:
- AgentForge can be used for staged metadata and method-candidate extraction under local MIT evidence.
- This run does not import anything into the active library.
- Text reuse still goes through normal Linselab review before activation.
"""
    (RUN_DIR / "agentforge_license_status.md").write_text(content, encoding="utf-8", newline="\n")


def write_handoff() -> None:
    content = f"""# Antigravity handoff: AgentForge stage 1

## Mandate
Review and extend the worker-run at:

`{RUN_DIR}`

This is a metadata and method-candidate pass only. Do not edit active registers, do not activate instruments, and do not rewrite Linselab source files.

## Allowed inputs
- `{ZIP_PATH}`
- Files already generated under `{RUN_DIR}`

## Allowed outputs
Write only inside:

`{RUN_DIR}`

Preferred additions:
- `agentforge_method_review.jsonl`
- `agentforge_overlap_notes.md`
- `agentforge_stage2_recommendation.md`

## Current products
- `agentforge_zip_entries.jsonl`: one JSON record per zip file entry.
- `agentforge_method_candidates.jsonl`: staged candidates from docs and method/prompt source files.
- `agentforge_unpack_summary.md`: counts, extracted metadata paths, and verification notes.
- `agentforge_license_status.md`: local MIT evidence.

## Rules
- Keep `license_status: mit` only when records are grounded in the local `LICENSE`.
- Do not merge, normalize, or deduplicate into main registers.
- Do not edit `ACTIVE_LIBRARY_INDEX.md`, `INSTRUMENT_REGISTER.yml`, `DUPLICATE_MAP.yml`, or `MERGE_DECISIONS.yml`.
- Mark uncertain items as `stage_only`.
- Preserve useful variance between workflow, heuristic, template candidate, and quality criteria.

## Stage 1 success criteria
- JSONL files parse cleanly.
- Method candidates identify concrete use in Linselab.
- Every claim has an `entry_path`.
- Next-stage recommendations separate safe extraction from register import.
"""
    (RUN_DIR / "ANTIGRAVITY_STAGE1_HANDOFF.md").write_text(content, encoding="utf-8", newline="\n")
    (ROOT / "linselab" / "HANDOFF_ANTIGRAVITY_AGENTFORGE_STAGE1.md").write_text(
        content, encoding="utf-8", newline="\n"
    )


def write_summary(
    entries: list[dict],
    extracted: list[str],
    candidates: list[dict],
    before_hashes: dict[str, str],
    after_hashes: dict[str, str],
) -> None:
    ext_counts = Counter(record["extension"] for record in entries)
    area_counts = Counter(record["inferred_area"] for record in entries)
    role_counts = Counter(record["file_role"] for record in entries)
    unchanged = before_hashes == after_hashes

    lines = [
        "# AgentForge metadata inventory",
        "",
        f"Generated: `{datetime.now(timezone.utc).isoformat()}`",
        f"Source zip: `{ZIP_PATH}`",
        "",
        "## Counts",
        "",
        f"- File entries indexed: {len(entries)}",
        f"- Extracted metadata/method files: {len(extracted)}",
        f"- Method candidates staged: {len(candidates)}",
        "",
        "## Extension counts",
        "",
    ]
    for ext, count in sorted(ext_counts.items()):
        label = ext if ext else "[no extension]"
        lines.append(f"- `{label}`: {count}")

    lines.extend(["", "## Area counts", ""])
    for area, count in sorted(area_counts.items()):
        lines.append(f"- `{area}`: {count}")

    lines.extend(["", "## File role counts", ""])
    for role, count in sorted(role_counts.items()):
        lines.append(f"- `{role}`: {count}")

    lines.extend(
        [
            "",
            "## Extracted to input_metadata",
            "",
        ]
    )
    for path in extracted:
        lines.append(f"- `{path}`")

    lines.extend(
        [
            "",
            "## Register protection",
            "",
            f"- Protected files unchanged: `{str(unchanged).lower()}`",
        ]
    )
    for path, before in before_hashes.items():
        after = after_hashes.get(path, "")
        lines.append(f"- `{path}`: `{before}` -> `{after}`")

    lines.extend(
        [
            "",
            "## Recommended next step",
            "",
            "Send `ANTIGRAVITY_STAGE1_HANDOFF.md` to Antigravity for review/extension inside this worker-run only. After that, Codex should decide which AgentForge method candidates become register-ready drafts.",
        ]
    )
    (RUN_DIR / "agentforge_unpack_summary.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")


def main() -> None:
    if not ZIP_PATH.exists():
        raise FileNotFoundError(ZIP_PATH)

    RUN_DIR.mkdir(parents=True, exist_ok=True)
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    before_hashes = protected_hashes()

    entries: list[dict] = []
    extracted: list[str] = []

    with zipfile.ZipFile(ZIP_PATH) as archive:
        names = {info.filename for info in archive.infolist()}
        has_license = "agentforge-main/LICENSE" in names
        license_text = read_zip_text(archive, "agentforge-main/LICENSE")

        for info in archive.infolist():
            if info.is_dir():
                continue
            data = archive.read(info.filename)
            ext = Path(info.filename).suffix.lower()
            extract = should_extract(info.filename)
            record = {
                "source_zip": SOURCE_ZIP,
                "entry_path": info.filename,
                "extension": ext,
                "size": info.file_size,
                "compressed_size": info.compress_size,
                "sha256": sha256_bytes(data),
                "inferred_area": infer_area(info.filename),
                "inferred_domain": infer_domain(info.filename),
                "file_role": infer_file_role(info.filename),
                "license_status": LICENSE_STATUS,
                "extracted_to_input_metadata": extract,
            }
            entries.append(record)

            if extract:
                relative = info.filename.removeprefix("agentforge-main/")
                target = INPUT_DIR / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(data)
                extracted.append(relative)

        candidates = build_method_candidates(archive)
        write_license_status(license_text, has_license)

    entries.sort(key=lambda item: item["entry_path"])
    extracted.sort()
    jsonl_write(RUN_DIR / "agentforge_zip_entries.jsonl", entries)
    jsonl_write(RUN_DIR / "agentforge_method_candidates.jsonl", candidates)

    write_handoff()
    after_hashes = protected_hashes()
    write_summary(entries, extracted, candidates, before_hashes, after_hashes)

    print(f"indexed={len(entries)}")
    print(f"extracted={len(extracted)}")
    print(f"candidates={len(candidates)}")
    print(f"protected_unchanged={before_hashes == after_hashes}")


if __name__ == "__main__":
    main()
