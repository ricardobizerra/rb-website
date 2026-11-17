---
name: conventional-commits
description: Format commit messages using Conventional Commits, stage atomic commits in proper order, execute pre-commit validation gates, and follow branch naming conventions. Make sure to use this skill whenever the user or task mentions git commits, writing commit messages, staging changes, creating pull requests, formatting git history, or breaking changes into atomic commits.
---

# Conventional Commits & Staged Atomic Workflow

## Purpose

Maintain a clean, bisect-safe, and self-describing Git history across `rb-website` by enforcing Conventional Commits (v1.0.0), area scoping, and gated atomic commits.

---

## Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 1. Types (Canonical 10)

- `feat`: New section, UI capability, route, or portfolio feature.
- `fix`: Bug fix or unintended visual/runtime behavior correction.
- `docs`: Documentation, README, or ADR updates.
- `chore`: Dependency upgrades, build/lint tooling, or maintenance.
- `refactor`: Structural code changes without functional or bug-fix impact.
- `test`: Adding or correcting tests.
- `perf`: Performance, image, or bundle optimizations.
- `style`: Formatting, design token alignment, or whitespace fixes.
- `ci`: CI/CD workflows and automation scripts.
- `revert`: Reverting previous commits.

### 2. Scopes

- **Area Scopes**: `ui`, `ui/experience`, `ui/projects`, `ui/profile`, `ui/navbar`, `data`, `design`, `app`, `seo`.
- **Repo / Tooling Scopes**: `root`, `docs`, `docs/adr`, `agents`, `skills`, `ci`.

### 3. Subject Rules

- Use the **imperative mood** (e.g., `add`, `implement`, `fix`, `prevent`, `remove`, `align`).
- Lowercase starting letter.
- No trailing period (`.`).
- Strictly English (even when describing Portuguese portfolio copy).

---

## Staged Atomic Commit Pipeline

When a change spans application code and documentation/ADRs, split staging cleanly rather than bundling unrelated concerns:

```text
Stage 1: Application Code, Data & Assets -> feat(ui/<area>) or fix(ui/<area>) or chore(root)
Stage 2: Documentation & ADR Records    -> docs(adr): record ADR ... or docs: update ...
```

---

## Pre-Commit Validation Gates

Run the required local validation commands **before** creating each commit:

### Code & Styling Gate:

```bash
pnpm prettier
pnpm typecheck
pnpm lint
pnpm build
```

### Documentation & Governance Gate:

```bash
pnpm docs:check
```

---

## Step-by-Step Execution Workflow

> [!NOTE]
> In agent execution environments where `.git/` is read-only in standard sandbox mode, git write operations (`git add`, `git commit`, `git checkout`, `git push`) require elevated permissions (`BypassSandbox: true`). All validation gates (`prettier`, `typecheck`, `lint`, `build`, `docs:check`) must run sandboxed (`BypassSandbox: false`).

1. **Analyze Working Tree**:
   ```bash
   git status
   git diff --name-only
   ```
2. **Stage and Validate Code Changes** (if any):
   - Stage source/config files: `git add src/ public/ package.json ...`
   - Run `pnpm prettier`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
   - Commit: `git commit -m "<type>(<scope>): <imperative description>"`
3. **Stage and Validate Documentation / Agent Changes** (if any):
   - Stage docs/agent files: `git add docs/ AGENTS.md .agents/ ...`
   - Run `pnpm docs:check`.
   - Commit: `git commit -m "docs(adr): record ADR YYYY-MM-DD-HH-mm-ss for <topic>"` (UTC timestamp from `date -u +%Y-%m-%d-%H-%M-%S`) or `docs: ...`.

---

## Branching Conventions

- Features: `feature/<topic>` (e.g. `feature/blog-section`)
- Fixes: `fix/<topic>` (e.g. `fix/navbar-mobile-overflow`)
- Chores: `chore/<topic>` (e.g. `chore/setup-agents-and-docs`)
- Docs: `docs/<topic>` (e.g. `docs/design-system-alignment`)
