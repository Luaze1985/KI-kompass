from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import shutil
import sys
import zipfile
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
import xml.etree.ElementTree as ET


TEXT_EXTENSIONS = {".md", ".txt", ".yaml", ".yml", ".csv"}
DOCX_EXTENSIONS = {".docx"}
ARCHIVE_EXTENSIONS = {".zip", ".tar", ".gz", ".7z", ".rar"}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def read_text_file(path: Path) -> tuple[str | None, str | None]:
    for encoding in ("utf-8-sig", "utf-8", "cp1252", "latin-1"):
        try:
            return path.read_text(encoding=encoding), encoding
        except UnicodeDecodeError:
            continue
    return None, None


def extract_docx_text(path: Path) -> str:
    w_ns = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    paragraphs: list[str] = []

    with zipfile.ZipFile(path) as archive:
        xml_bytes = archive.read("word/document.xml")

    root = ET.fromstring(xml_bytes)
    for paragraph in root.iter(f"{w_ns}p"):
        parts: list[str] = []
        for node in paragraph.iter():
            if node.tag == f"{w_ns}t":
                parts.append(node.text or "")
            elif node.tag == f"{w_ns}tab":
                parts.append("\t")
            elif node.tag in {f"{w_ns}br", f"{w_ns}cr"}:
                parts.append("\n")
        text = "".join(parts).strip()
        if text:
            paragraphs.append(text)

    return "\n\n".join(paragraphs)


def safe_rel_text_path(relative_path: Path) -> Path:
    parts = []
    for part in relative_path.parts:
        safe_part = re.sub(r'[<>:"/\\|?*]+', "_", part)
        safe_part = safe_part.strip().strip(".") or "_"
        parts.append(safe_part)
    return Path(*parts).with_suffix(relative_path.suffix + ".txt")


def infer_tags(relative_path: Path, extension: str) -> list[str]:
    text = relative_path.as_posix().lower()
    name = relative_path.name.lower()
    tags: list[str] = []

    if "02_linser" in text or "linse" in name:
        tags.append("lens_candidate")
    if "agent" in name or "advisor" in name or "raadgiver" in name or "rådgiver" in name:
        tags.append("advisor_or_agent_reference")
    if "modeller" in text or "modell" in name or "model" in name:
        tags.append("model_candidate")
    if "frame" in name or "ramme" in name:
        tags.append("frame_candidate")
    if "heuristic" in name or "heuristikk" in name:
        tags.append("heuristic_candidate")
    if "eval" in text or "scenario" in name or "case" in name:
        tags.append("case_or_eval_material")
    if "undervis" in text or "learning" in text:
        tags.append("teaching_material")
    if "registry" in name or "register" in name or "manifest" in name:
        tags.append("governance_or_registry")
    if "kodetabeller" in text:
        tags.append("structured_reference_data")
    if "90_arkiv" in text or "arkiv" in text:
        tags.append("archived_source")
    if "99_karantene" in text or "karantene" in text:
        tags.append("quarantine")
    if extension in DOCX_EXTENSIONS:
        tags.append("document_source")
    if extension in ARCHIVE_EXTENSIONS:
        tags.append("archive")
    if not tags:
        tags.append("source_only")
    return tags


def recommended_use(tags: list[str]) -> str:
    if "quarantine" in tags:
        return "hold_for_review"
    if "archive" in tags:
        return "unpack_to_staging_then_inventory"
    if "lens_candidate" in tags:
        return "primary_content_source"
    if "advisor_or_agent_reference" in tags:
        return "classify_before_merge"
    if "governance_or_registry" in tags:
        return "governing_or_index_reference"
    if "archived_source" in tags:
        return "reference_only_until_needed"
    return "supporting_source"


def yaml_scalar(value: Any) -> str:
    if value is None:
        return "null"
    if value is True:
        return "true"
    if value is False:
        return "false"
    if isinstance(value, (int, float)):
        return str(value)
    text = str(value)
    if text == "":
        return '""'
    if re.fullmatch(r"[A-Za-z0-9_.:/@+\- ]+", text) and not text.startswith((" ", "-", "?", ":", "{", "[")):
        return text
    return json.dumps(text, ensure_ascii=False)


def dump_yaml(value: Any, indent: int = 0) -> str:
    space = " " * indent
    if isinstance(value, dict):
        lines: list[str] = []
        for key, item in value.items():
            if isinstance(item, (dict, list)):
                lines.append(f"{space}{key}:")
                lines.append(dump_yaml(item, indent + 2))
            else:
                lines.append(f"{space}{key}: {yaml_scalar(item)}")
        return "\n".join(lines)
    if isinstance(value, list):
        if not value:
            return f"{space}[]"
        lines = []
        for item in value:
            if isinstance(item, dict):
                lines.append(f"{space}-")
                lines.append(dump_yaml(item, indent + 2))
            elif isinstance(item, list):
                lines.append(f"{space}-")
                lines.append(dump_yaml(item, indent + 2))
            else:
                lines.append(f"{space}- {yaml_scalar(item)}")
        return "\n".join(lines)
    return f"{space}{yaml_scalar(value)}"


def write_yaml(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dump_yaml(data) + "\n", encoding="utf-8")


def list_archive(path: Path) -> dict[str, Any]:
    if path.suffix.lower() != ".zip":
        return {
            "archive": str(path),
            "status": "unsupported_archive_format",
            "entries": [],
            "note": "Only zip entry listing is supported by this script.",
        }
    with zipfile.ZipFile(path) as archive:
        entries = [
            {
                "name": info.filename,
                "size": info.file_size,
                "compressed_size": info.compress_size,
            }
            for info in archive.infolist()
            if not info.is_dir()
        ]
    return {
        "archive": str(path),
        "status": "listed",
        "entries": entries,
    }


def extract_archive(path: Path, output_root: Path, file_hash: str) -> str:
    target = output_root / f"{path.stem}_{file_hash[:8]}"
    if path.suffix.lower() != ".zip":
        return "skipped_unsupported_archive_format"
    target.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path) as archive:
        archive.extractall(target)
    return str(target)


def inventory(source_root: Path, output_root: Path, extract_archives: bool) -> dict[str, Any]:
    registers_dir = output_root / "registers"
    extracts_dir = output_root / "source_text_extracts"
    unpacked_dir = output_root / "source_originals" / "_unpacked"
    registers_dir.mkdir(parents=True, exist_ok=True)
    extracts_dir.mkdir(parents=True, exist_ok=True)

    files = sorted([path for path in source_root.rglob("*") if path.is_file()])
    now = datetime.now(timezone.utc).isoformat()
    source_entries: list[dict[str, Any]] = []
    extract_entries: list[dict[str, Any]] = []
    archive_entries: list[dict[str, Any]] = []
    hashes: defaultdict[str, list[dict[str, Any]]] = defaultdict(list)
    extension_counts: Counter[str] = Counter()
    tag_counts: Counter[str] = Counter()

    for index, path in enumerate(files, start=1):
        rel = path.relative_to(source_root)
        extension = path.suffix.lower()
        extension_counts[extension or "[none]"] += 1
        file_hash = sha256_file(path)
        stat = path.stat()
        tags = infer_tags(rel, extension)
        tag_counts.update(tags)
        source_id = f"SRC-FILE-{index:04d}"

        entry = {
            "id": source_id,
            "title": path.stem,
            "source_root": str(source_root),
            "relative_path": rel.as_posix(),
            "absolute_path": str(path),
            "extension": extension or "",
            "size_bytes": stat.st_size,
            "modified": datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat(),
            "sha256": file_hash,
            "tags": tags,
            "recommended_use": recommended_use(tags),
            "status": "inventoried",
        }
        source_entries.append(entry)
        hashes[file_hash].append(
            {
                "source_id": source_id,
                "relative_path": rel.as_posix(),
                "absolute_path": str(path),
            }
        )

        text: str | None = None
        encoding: str | None = None
        extract_status = "unsupported_for_text"
        error: str | None = None

        try:
            if extension in TEXT_EXTENSIONS:
                text, encoding = read_text_file(path)
                extract_status = "text_extracted" if text is not None else "text_decode_failed"
            elif extension in DOCX_EXTENSIONS:
                text = extract_docx_text(path)
                encoding = "docx_xml"
                extract_status = "text_extracted"
            elif extension in ARCHIVE_EXTENSIONS:
                archive_info = list_archive(path)
                if extract_archives:
                    archive_info["extracted_to"] = extract_archive(path, unpacked_dir, file_hash)
                archive_entries.append(archive_info)
                extract_status = "archive_listed"
        except Exception as exc:  # noqa: BLE001 - inventory should continue across bad files.
            extract_status = "extract_failed"
            error = f"{type(exc).__name__}: {exc}"

        extract_path = None
        character_count = 0
        line_count = 0
        if text is not None:
            out_rel = safe_rel_text_path(rel)
            out_path = extracts_dir / out_rel
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(text, encoding="utf-8")
            extract_path = str(out_path.relative_to(output_root)).replace("\\", "/")
            character_count = len(text)
            line_count = text.count("\n") + (1 if text else 0)

        extract_entries.append(
            {
                "source_id": source_id,
                "relative_path": rel.as_posix(),
                "status": extract_status,
                "encoding": encoding,
                "extract_path": extract_path,
                "characters": character_count,
                "lines": line_count,
                "error": error,
            }
        )

    duplicate_candidates = [
        {"sha256": file_hash, "files": refs}
        for file_hash, refs in sorted(hashes.items())
        if len(refs) > 1
    ]

    source_register = {
        "project": "Linselab merge control",
        "generated": now,
        "source_root": str(source_root),
        "policy": {
            "originals_changed": False,
            "originals_copied": False,
            "text_extracts_are_working_copies": True,
            "active_library_changes": False,
        },
        "sources": source_entries,
    }
    text_index = {
        "generated": now,
        "source_root": str(source_root),
        "extract_root": "source_text_extracts",
        "items": extract_entries,
    }
    duplicate_map = {
        "generated": now,
        "duplicate_type": "exact_sha256_only",
        "note": "Semantic and near-duplicate review is a later pass.",
        "groups": duplicate_candidates,
    }
    unpack_log = {
        "generated": now,
        "extract_archives": extract_archives,
        "archives": archive_entries,
    }

    write_yaml(registers_dir / "SOURCE_REGISTER.yml", source_register)
    write_yaml(registers_dir / "TEXT_EXTRACT_INDEX.yml", text_index)
    write_yaml(registers_dir / "DUPLICATE_CANDIDATES.yml", duplicate_map)
    write_yaml(registers_dir / "UNPACK_LOG.yml", unpack_log)

    (output_root / "source_originals").mkdir(parents=True, exist_ok=True)
    (output_root / "source_originals" / "README.md").write_text(
        "# Source Originals\n\n"
        "Original files are not copied here in this pass. "
        "The source register points back to the existing source folder, "
        "and generated text extracts live in `../source_text_extracts/`.\n\n"
        f"Current source root: `{source_root}`\n",
        encoding="utf-8",
    )

    summary_lines = [
        "# Ingest Summary",
        "",
        f"Generated: `{now}`",
        f"Source root: `{source_root}`",
        f"Output root: `{output_root}`",
        "",
        "## Counts",
        "",
        f"- Files inventoried: {len(files)}",
        f"- Text extracts created: {sum(1 for item in extract_entries if item['status'] == 'text_extracted')}",
        f"- Archives found: {len(archive_entries)}",
        f"- Exact duplicate groups: {len(duplicate_candidates)}",
        "",
        "## Extensions",
        "",
    ]
    for extension, count in sorted(extension_counts.items()):
        summary_lines.append(f"- `{extension}`: {count}")
    summary_lines.extend(["", "## Tag Counts", ""])
    for tag, count in sorted(tag_counts.items()):
        summary_lines.append(f"- `{tag}`: {count}")
    summary_lines.extend(
        [
            "",
            "## Next Checks",
            "",
            "- Review `registers/SOURCE_REGISTER.yml` for source scope and sensitive content.",
            "- Review `registers/DUPLICATE_CANDIDATES.yml` for exact duplicates.",
            "- Use `registers/TEXT_EXTRACT_INDEX.yml` before classifying instruments.",
            "- Do not mark anything active until case testing is complete.",
        ]
    )
    (registers_dir / "INGEST_SUMMARY.md").write_text("\n".join(summary_lines) + "\n", encoding="utf-8")

    return {
        "files": len(files),
        "extracts": sum(1 for item in extract_entries if item["status"] == "text_extracted"),
        "archives": len(archive_entries),
        "duplicates": len(duplicate_candidates),
        "output_root": str(output_root),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Inventory Linselab source files and create text extracts.")
    parser.add_argument("--source-root", required=True, type=Path)
    parser.add_argument("--output-root", default=Path("linselab"), type=Path)
    parser.add_argument("--extract-archives", action="store_true")
    args = parser.parse_args()

    source_root = args.source_root.resolve()
    output_root = args.output_root.resolve()
    if not source_root.exists() or not source_root.is_dir():
        print(f"Source root does not exist or is not a directory: {source_root}", file=sys.stderr)
        return 2
    if output_root.exists() and not output_root.is_dir():
        print(f"Output root exists but is not a directory: {output_root}", file=sys.stderr)
        return 2

    result = inventory(source_root, output_root, args.extract_archives)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
