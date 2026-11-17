#!/usr/bin/env python3
"""Validate agent-facing documentation against the repository.

Checks:
- relative Markdown links resolve;
- active docs and workflow skills do not teach stale command forms;
- pnpm commands reference a real root package.json script;
- every ADR in docs/adr/ is listed in docs/README.md.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent

ACTIVE_DOCS = [
    "AGENTS.md",
    "CODING_STANDARDS.md",
    "PRODUCT.md",
    "DESIGN.md",
    "GLOSSARY.md",
    "README.md",
    "docs/README.md",
    "docs/overview.md",
    "docs/repo-map.md",
    "docs/architecture.md",
    "docs/development.md",
    "docs/commands.md",
    "docs/design-system.md",
    "docs/branching-strategy.md",
    "docs/commit-strategy.md",
    "docs/agents/issue-tracker.md",
    "docs/agents/triage-labels.md",
    "docs/agents/domain.md",
    ".agents/skills/README.md",
]

WORKFLOW_SKILLS = [
    "feature-development",
    "bug-fix",
    "testing",
    "documentation-update",
    "git-branching",
    "conventional-commits",
]

ACTIVE_DOCS.extend(f".agents/skills/{name}/SKILL.md" for name in WORKFLOW_SKILLS)

STALE_PATTERNS = [
    (re.compile(r"\byarn\b", re.IGNORECASE), "use pnpm, not yarn"),
    (re.compile(r"\bnpm run\b"), "use pnpm, not npm run"),
    (re.compile(r"\bnext lint\b"), "use `pnpm lint` (eslint flat config), not `next lint`"),
    (re.compile(r"\bdocker compose\b"), "rb-website runs directly with Node/pnpm, not Docker Compose"),
]

PNPM_BUILTINS = {
    "add",
    "audit",
    "bin",
    "config",
    "dlx",
    "exec",
    "fetch",
    "import",
    "init",
    "install",
    "link",
    "list",
    "ls",
    "outdated",
    "pack",
    "prune",
    "publish",
    "rebuild",
    "remove",
    "rm",
    "run",
    "store",
    "test",
    "uninstall",
    "unlink",
    "up",
    "update",
    "why",
}

PNPM_SCRIPT_RE = re.compile(r"`pnpm (?:run )?([\w:-]+)")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def line_of(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def add_error(errors: list[str], path: Path, message: str) -> None:
    try:
        display = path.relative_to(ROOT).as_posix()
    except ValueError:
        display = path.as_posix()
    errors.append(f"{display}: {message}")


def markdown_files() -> list[Path]:
    files = [
        ROOT / name
        for name in (
            "AGENTS.md",
            "CODING_STANDARDS.md",
            "PRODUCT.md",
            "DESIGN.md",
            "GLOSSARY.md",
            "README.md",
        )
    ]
    files.extend((ROOT / "docs").rglob("*.md"))
    files.append(ROOT / ".agents/skills/README.md")
    files.extend(ROOT / f".agents/skills/{name}/SKILL.md" for name in WORKFLOW_SKILLS)
    return sorted({path for path in files if path.is_file()})


def check_links(errors: list[str]) -> None:
    link_re = re.compile(r"\[[^\]]*\]\(([^)\s]+)(?:\s+[\"'][^\"']*[\"'])?\)")
    for path in markdown_files():
        text = read(path)
        for match in link_re.finditer(text):
            target = match.group(1).strip().strip("<>")
            if not target or target.startswith("#"):
                continue
            if target.startswith(("http://", "https://", "mailto:", "tel:", "file:")):
                continue
            target = unquote(target).split("#", 1)[0]
            if not target:
                continue
            destination = (path.parent / target).resolve()
            if not destination.exists():
                add_error(
                    errors,
                    path,
                    f"line {line_of(text, match.start())}: broken link `{target}`",
                )


def check_stale_commands(errors: list[str]) -> None:
    for name in ACTIVE_DOCS:
        path = ROOT / name
        if not path.is_file():
            add_error(errors, path, "active documentation file is missing")
            continue
        text = read(path)
        for pattern, reason in STALE_PATTERNS:
            for match in pattern.finditer(text):
                add_error(
                    errors,
                    path,
                    f"line {line_of(text, match.start())}: `{match.group(0)}` ({reason})",
                )


def check_commands(errors: list[str]) -> None:
    pkg = json.loads(read(ROOT / "package.json"))
    scripts = set(pkg.get("scripts", {}))

    for name in ACTIVE_DOCS:
        path = ROOT / name
        if not path.is_file():
            continue
        text = read(path)
        for match in PNPM_SCRIPT_RE.finditer(text):
            cmd = match.group(1)
            if cmd in PNPM_BUILTINS or cmd in scripts:
                continue
            add_error(
                errors,
                path,
                f"line {line_of(text, match.start())}: "
                f"`package.json` has no `{cmd}` script",
            )


def check_adr_index(errors: list[str]) -> None:
    readme = ROOT / "docs/README.md"
    if not readme.is_file():
        return
    index = read(readme)
    adr_dir = ROOT / "docs/adr"
    if not adr_dir.is_dir():
        return
    for adr in sorted(adr_dir.glob("*.md")):
        if f"adr/{adr.name}" not in index:
            add_error(errors, adr, "not listed in docs/README.md")


def main() -> int:
    errors: list[str] = []
    check_links(errors)
    check_stale_commands(errors)
    check_commands(errors)
    check_adr_index(errors)

    if errors:
        print("Documentation check failed:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    print("Documentation check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
