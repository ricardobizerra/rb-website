# 2026-11-17-01-17-00. Agent Harness, Tailored Skills, and Documentation Architecture

Date: 2026-11-17

## Status

Accepted

## Context

`rb-website` previously contained only a single-line `README.md` and had no structured agent steering, coding standards, design system spec, domain glossary, ADR log, or git/documentation guardrails. Meanwhile, the sibling `financial-tracker` repository established an effective two-layer agent architecture: concise progressive-disclosure steering (`AGENTS.md` with `CLAUDE.md`/`GEMINI.md` symlinks), a tailored `.agents/skills/` library separating repo-specific governance adapters from tracked ecosystem skills (`skills-lock.json`), structured `docs/` documentation, and deterministic verification scripts.

Because `rb-website` is a standalone Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui portfolio (without Docker, NestJS, Prisma, PostgreSQL, Redis, or GraphQL), copying `financial-tracker` verbatim would introduce stale instructions and unused backend skills.

## Decision

1. **Progressive-Disclosure Root Docs**: Establish concise `AGENTS.md` (~35 lines) plus `CODING_STANDARDS.md`, `PRODUCT.md`, `DESIGN.md`, `GLOSSARY.md`, and an updated `README.md`, with `CLAUDE.md` and `GEMINI.md` symlinked to `AGENTS.md`.
2. **Two-Layer Skills Setup**:
   - Author 6 repo-specific harness skills in `.agents/skills/` (`git-branching`, `conventional-commits`, `feature-development`, `bug-fix`, `testing`, `documentation-update`) adapted for local `pnpm` execution (no Docker/Prisma/GraphQL).
   - Bring over 31 tracked ecosystem skills (`skills-lock.json`) plus `software-factory` covering Next.js App Router, React, shadcn/ui, UI/UX polish, planning, domain modeling, and code review (excluding NestJS, Apollo, and Mantis security suites).
   - Symlink `.claude/skills -> ../.agents/skills`.
3. **Full `main` + `develop` Git Governance**: Adopt `financial-tracker`'s trunk-based model with `develop` as the intermediate integration branch: topic branches cut from verified-synchronized local `main`, push to `origin/<prefix>/<slug>`, integrate via `--no-ff` into `develop` after user confirmation, and promote to `main` via PR.
4. **Session Briefs + ADRs with Optional Linear Support**: Record work primarily via session briefs and UTC-timestamped ADRs in `docs/adr/`, while allowing Linear MCP integration when tickets originate in Linear (`docs/agents/issue-tracker.md`).
5. **Automated Verification Scripts & Pre-Commit Hook**: Adapt `scripts/check-docs.py`, `scripts/git-branch-audit.mjs`, and `.githooks/pre-commit`, and expose `typecheck`, `git:check`, and `docs:check` scripts in `package.json`.

## Consequences

- Agents start every session with verified repository paths, commands, design tokens, and git invariants without bloating turn context.
- `pnpm docs:check` catches broken markdown links, stale command patterns (`npm run`, `yarn`, `next lint`, `docker compose`), nonexistent `pnpm` scripts, and unindexed ADRs before commits land.
- `pnpm git:check` flags non-canonical local branches or topic branches wired to track `main` or `develop`.
- Future additions such as unit/E2E tests or `i18n` will extend `docs/commands.md`, `.agents/skills/testing/SKILL.md`, and new ADRs rather than inflating `AGENTS.md`.
