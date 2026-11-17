# 2026-11-17-01-56-55. GitHub Actions CI and Release Automation Architecture

Date: 2026-11-17

## Status

Accepted

## Context

Following the establishment of repository documentation, agent harness skills, and local verification scripts (`pnpm docs:check`, `pnpm git:check`, `pnpm typecheck`, `pnpm lint`, `pnpm build`), `rb-website` needed an automated Continuous Integration (CI) and release delivery pipeline.

Prior to this decision:
- Pull requests and branch merges lacked automated status verification on GitHub.
- Release tagging on `main` was a manual, unverified process.
- Dependabot monitored npm dependencies weekly on `develop`, but GitHub Actions dependencies were untracked.
- The `git:check` audit only inspected local branches in advisory mode, leaving PR head branch naming unenforced in CI.

## Decision

1. **Parallel CI Job Fan-Out Behind a Unified Aggregator Check (`.github/workflows/ci.yml`)**:
   - Split CI into three parallel jobs:
     - `docs-and-branch`: Node 24 + Python 3.x, validating documentation integrity (`pnpm docs:check`) and PR head branch naming (`scripts/git-branch-audit.mjs --ci-pr-head`).
     - `quality`: Node 24 + pnpm 11, running `pnpm prettier:check`, `pnpm typecheck`, and `pnpm lint`.
     - `build`: Node 24 + pnpm 11, caching `.next/cache` via `actions/cache@v4` across runs, and running `pnpm build`.
   - Aggregate all three jobs into a final status check job named **`ci`** running with `if: always()`. GitHub branch protection / rulesets on `main` and `develop` require this single check.
   - Configure concurrency cancellation (`cancel-in-progress: true`) keyed on workflow and PR/ref to eliminate redundant runs on rapid pushes.

2. **Non-Mutating Formatting Gate (`prettier:check`)**:
   - Expose `"prettier:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,css}\""` in `package.json` to enforce consistent formatting across all code and styling assets without altering files in CI.

3. **PR Head Branch Taxonomy Gate (`--ci-pr-head`)**:
   - Extend `scripts/git-branch-audit.mjs` with `--ci-pr-head` reading `GITHUB_HEAD_REF` (or `--branch <name>`).
   - Allow `develop` (for release promotion PRs to `main`), `main` (for hotfix backports), and `dependabot/*` (for automated dependency PRs).
   - Enforce canonical prefixes (`feature/`, `fix/`, `chore/`, `refactor/`, `docs/`, `test/`, `perf/`) and reject non-canonical aliases (`feat/`, `bugfix/`, etc.) with exit code 1.

4. **Host-Side Release Tagging and GitHub Release Publishing (`scripts/release-tag.mjs` & `.github/workflows/release-tag.yml`)**:
   - Implement `scripts/release-tag.mjs` with `--dry-run` and `--tag` support, executable both locally and in CI.
   - When a PR merges into `main` (or on manual `workflow_dispatch`), resolve the version from `package.json` as `vX.Y.Z`.
   - Check if tag `vX.Y.Z` already exists on `origin` via `git ls-remote`. If it exists, exit cleanly as an idempotent safe no-op.
   - If new, create an annotated git tag `vX.Y.Z`, push it to `origin`, and invoke `gh release create` passing PR body release notes and `--generate-notes`.

5. **Actions Ecosystem Tracking in Dependabot (`.github/dependabot.yml`)**:
   - Add `package-ecosystem: "github-actions"` on a weekly schedule targeting `develop`, ensuring actions (`checkout`, `setup-node`, `setup-python`, `cache`) stay updated securely.

## Consequences

- All PRs targeting `develop` and `main` undergo deterministic, parallel verification within ~1-2 minutes.
- Branch protection on `main` and `develop` needs only one required check: `ci`.
- Every version bump merged into `main` automatically creates an immutable, annotated Git tag and publishes release notes on GitHub without manual intervention.
- The repository self-documents its CI and release automation in `docs/` and validates script references through `pnpm docs:check`.
