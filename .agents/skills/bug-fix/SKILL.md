---
name: bug-fix
description: Investigate and fix incorrect behavior or visual defects in rb-website with minimal, well-validated changes.
---

# Bug Fix

Repo-harness adapter for investigating defects, preventing regressions, and landing minimal fixes through `rb-website` validation gates.

## 1. Delegate Methodology to Tracked Skills

Before modifying code, activate the specialized tracked skill matching your diagnostic or implementation step:

| Need | Specialized Tracked Skill | What It Owns |
| --- | --- | --- |
| **Root-Cause Investigation** | [`diagnosing-bugs`](../diagnosing-bugs/SKILL.md) | Hypothesis generation, reproduction, and systematic fault isolation |
| **Surgical Scope & Restraint** | [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) | Keeping fixes minimal, avoiding speculative rewrites, surfacing assumptions |
| **Regression Discipline** | [`tdd`](../tdd/SKILL.md) | Reproduction-first mindset and verifiable acceptance criteria |
| **Next.js / App Router Defects** | [`nextjs-app-router-patterns`](../nextjs-app-router-patterns/SKILL.md) | Hydration mismatches, server/client boundaries, and image/SVG loading |
| **Frontend UI / Layout Bugs** | [`impeccable`](../impeccable/SKILL.md), [`web-design-guidelines`](../web-design-guidelines/SKILL.md) | Visual hierarchy, dark/light contrast, responsive quirks, and focus states |

## 2. Repo Harness & Execution Steps

0. **Pre-Flight Branch Verification**: Run the Repository State Gate in [`git-branching`](../git-branching/SKILL.md) before modifying files; cut a dedicated `fix/<topic>` branch from verified-synchronized local `main`.
1. **Reproduce the Defect**: Identify the exact failing route, component, responsive breakpoint, theme mode (light/dark), or build/typecheck error. Use [`playwright-cli`](../playwright-cli/SKILL.md) for visual/browser reproduction when helpful.
2. **Apply Narrow Fix**: Make the surgical fix in the owning file (`src/components/`, `src/data/`, `src/lib/`, or `src/app/globals.css`).
3. **Update Documentation**: If the fix alters documented contracts, data schemas, or design tokens, update docs following [`documentation-update`](../documentation-update/SKILL.md).
4. **Verify & Commit**: Run validation gates and commit via [`conventional-commits`](../conventional-commits/SKILL.md):
   ```bash
   pnpm prettier
   pnpm typecheck
   pnpm lint
   pnpm build
   pnpm docs:check
   ```

## 3. Recovery Guidance

- If `origin/main` moves while developing, sync via `git pull --no-rebase origin main` (never rebase or force-push).
- Keep unrelated cleanups out of bug-fix commits.
