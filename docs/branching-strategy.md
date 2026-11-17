# Git Branching Strategy & Topic Lifecycle

This document defines the **rationale and policy** for branching in `rb-website`: the core principles, the canonical taxonomy, and why each safety gate exists.

**The procedure lives in [`.agents/skills/git-branching/SKILL.md`](../.agents/skills/git-branching/SKILL.md).**
Do not restate procedure here. If a step needs changing, change the skill and link to it.

---

## 1. Core Principles

1. **Trunk-Based Development with an Intermediate Integration Lane (`develop`)**: `main` is the canonical trunk of production-ready code. All work runs on short-lived topic branches cut from `main`. Mature topics integrate into `develop` before promotion to `main`.
2. **Never Commit or Push Directly to `main`**, with exactly one enumerated exception: the emergency hotfix backport ([`git-branching` Step 7](../.agents/skills/git-branching/SKILL.md#step-7-emergency-production-hotfix-named-exception-to-golden-rule-1)). `develop` is updated via `--no-ff` merge commits of mature topics (or via explicit user-requested direct commits on `develop`), followed by pushing `origin/develop`.
3. **Strict English & Kebab-Case**: branch names are lowercase, English, kebab-case (`<prefix>/<short-topic-description>`).
4. **Clean Tree Discipline**: uncommitted tracked state never crosses a branch transition. Untracked files are classified rather than treated as blockers.
5. **Merge-Based Upstream Synchronization (`git pull --no-rebase origin main`)**: synchronize topic branches with `main` via `git pull --no-rebase origin main` rather than rebasing, preserving published branch history. Force-pushing (`--force`, `--force-with-lease`) is forbidden across all branches.
6. **Automated Topic Push & Confirmed `develop` Promotion**: agents automatically push validated topic branches (`git push -u origin <prefix>/<slug>`) after completing commits and ask whether the work can be merged into `develop`. PR guidance is generated only when explicitly requested (e.g. Release PR, urgent bypass PR, or `/pr`).
7. **Verified Base**: a topic branch is cut from a local `main` that has been proven equal to `origin/main` — never from `origin/main` or `develop` directly (unless explicitly requested by the user).
8. **Upstream Isolation**: topic branches must never track `main` or `develop`.

---

## 2. Canonical Branch Taxonomy

All topic branches use one of the 7 canonical prefixes:

| Prefix | Purpose | Example |
| :--- | :--- | :--- |
| `feature/` | New user-visible capability, section, page, or data feature | `feature/blog-section` |
| `fix/` | Defect, layout bug, data typo, or runtime issue | `fix/navbar-mobile-overflow` |
| `chore/` | Maintenance, dependency upgrades, agent/docs setup, config | `chore/setup-agents-and-docs` |
| `refactor/` | Structural change without functional impact | `refactor/experience-card-variants` |
| `docs/` | Documentation, ADR records, guides, agent instructions | `docs/design-system-alignment` |
| `test/` | Unit, integration, or browser smoke tests | `test/portfolio-smoke-e2e` |
| `perf/` | Performance optimization, image/bundle tuning | `perf/hero-lcp-preload` |

### Allowed Non-Topic Branches

| Branch | Purpose |
| :--- | :--- |
| `main` | The trunk (production-ready code) |
| `develop` | Intermediate integration branch |

### Disallowed Aliases

- `feat/` -> use `feature/`
- `bugfix/`, `hotfix/` -> use `fix/`
- `agent/`, `agents/` -> use `chore/` or `docs/`
- `wip/`, `temp/`, `style/` -> branches must use a canonical intent prefix

### Audit

`pnpm git:check` reports non-canonical names and topic branches tracking `main` or `develop`. It is **advisory**: it reports, it never blocks, and it never modifies a branch.

### Optional Issue Tracking Keys

When tracking against Linear or an issue tracker, include the key after the prefix:
`feature/RB-12-blog-section`, `fix/RB-18-navbar-overflow`.

---

## 3. Repository State Gate & Branch Entry

- Unfinished git operations (rebase, merge, cherry-pick, revert, bisect, detached HEAD) halt immediately and present only non-destructive recovery options; `git reset --hard` and `git clean -fd` are never offered during live operations.
- On entry, the agent classifies the current branch into three states (`main`, matching topic branch, or `develop`/non-matching topic branch) and never switches away from a branch autonomously unless explicitly instructed.

See Steps 0 and 1 of [`.agents/skills/git-branching/SKILL.md`](../.agents/skills/git-branching/SKILL.md).

---

## 4. Verified Base, `develop` Integration & Promotion to `main`

- **Cut from verified local `main`**: `git fetch origin main && git checkout main && git merge --ff-only origin/main && git checkout --no-track -b <prefix>/<slug> main`.
- **Promote to `develop`**: upon user confirmation after topic validation and push, merge with `git merge --no-ff <prefix>/<slug>` and push `origin/develop`.
- **Promote to `main`**: standard releases open a pull request from `develop` to `main`. Urgent fixes may open a PR directly from `fix/<slug>` to `main`, followed by absorbing `main` back into `develop` via `--no-ff`.
