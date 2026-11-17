# Repository Skills

This directory contains the operational skills available to AI agents in `rb-website`. It is structured into two complementary layers:

1. **Repository Harness Skills (6)**: Repo-specific governance, git safety invariants, and validation workflows authored and maintained directly in this codebase.
2. **Tracked Ecosystem Skills (`skills-lock.json`, 31) + Shared Vocabulary Skill (1)**: Specialized upstream engineering, architecture, planning, and Next.js/React/UI skills adapted from `financial-tracker`.

---

## 1. Repository Harness & Governance Skills

These 6 skills enforce non-negotiable repository invariants, pnpm execution gates, and commit pipelines:

### Core Infrastructure Gates

- [Git Branching](git-branching/SKILL.md) — Pre-flight branch gates, trunk safety, `main` synchronization, topic push, and `develop` integration.
- [Conventional Commits](conventional-commits/SKILL.md) — Atomic commit conventions, scope taxonomy, and pre-commit validation gates.

### Task-Layer Adapters

These skills serve as repo-harness adapters, delegating design and implementation methodology to tracked skills while executing local validation gates:

- [Feature Development](feature-development/SKILL.md) — End-to-end Next.js/UI/data feature delivery.
- [Bug Fix](bug-fix/SKILL.md) — Surgical defect investigation, reproduction, and minimal fix verification.
- [Testing](testing/SKILL.md) — Static typechecking, linting, Next.js build, doc checks, and browser smoke verification.
- [Documentation Update](documentation-update/SKILL.md) — Domain vocabulary (`GLOSSARY.md`), ADR authoring, and documentation consistency guards (`pnpm docs:check`).

---

## 2. Tracked Ecosystem Skills (Installed via `skills-lock.json`)

### Engineering, Architecture & Debugging

- [Karpathy Guidelines](karpathy-guidelines/SKILL.md) — Behavioral guidelines to avoid over-engineering, make surgical changes, and define verifiable criteria.
- [Diagnosing Bugs](diagnosing-bugs/SKILL.md) — Systematic root-cause isolation, hypothesis generation, and diagnostic logging.
- [TDD](tdd/SKILL.md) — Test-driven development and red-green-refactor discipline.
- [Codebase Design](codebase-design/SKILL.md) — Deep modules, interface seams, and information hiding.
- [Improve Codebase Architecture](improve-codebase-architecture/SKILL.md) — Codebase architecture analysis and decoupling.
- [Code Review](code-review/SKILL.md) — Dual-axis code review (Standards vs. Spec).
- [Implement](implement/SKILL.md) — Executing engineering tasks systematically.
- [Implement Spec](implement-spec/SKILL.md) — Spec-driven implementation and acceptance criteria validation.
- [Skill Creator](skill-creator/SKILL.md) — Authoring, refining, and evaluating agent skills.

### Planning, Specs & Product Design

- [Grill with Docs](grill-with-docs/SKILL.md) — Interactive planning sessions that generate ADRs and glossary documents.
- [Grilling](grilling/SKILL.md) — Relentless interview loop to challenge assumptions and stress-test decisions.
- [Domain Modeling](domain-modeling/SKILL.md) — Ubiquitous language, domain entity boundaries, and ADR trade-off records.
- [To Spec](to-spec/SKILL.md) — Converting informal requests into unambiguous specifications.
- [To Tickets](to-tickets/SKILL.md) — Breaking specs into atomic tracking units.
- [Triage](triage/SKILL.md) — Issue categorization, verification, and brief writing.
- [Wayfinder](wayfinder/SKILL.md) — Codebase orientation and architectural pathfinding.
- [Prototype](prototype/SKILL.md) — Throwaway exploratory prototyping to resolve design ambiguity.
- [Research](research/SKILL.md) — Investigating primary sources and capturing repo findings.
- [Retro](retro/SKILL.md) — Retrospective evaluation of workflows and milestones.
- [PR](pr/SKILL.md) — Clear, context-rich pull request descriptions.
- [Wizard](wizard/SKILL.md) — Interactive step-by-step guidance for manual operations.
- [Ask Matt](ask-matt/SKILL.md) — High-level technical advice and principles.
- [Setup Matt Pocock Skills](setup-matt-pocock-skills/SKILL.md) — Configuration and synchronization of engineering workflow skills.
- [Software Factory](software-factory/SKILL.md) — Shared vocabulary for autonomous software factory tasks, triggers, runs, and runners.

### Frontend, UI Design & Verification

- [Next.js App Router Patterns](nextjs-app-router-patterns/SKILL.md) — Server components, route handlers, and streaming boundaries.
- [Vercel React Best Practices](vercel-react-best-practices/SKILL.md) — Performance optimization, memoization, and bundle efficiency.
- [Frontend Design](frontend-design/SKILL.md) — Distinctive, intentional aesthetic direction and visual hierarchy.
- [Impeccable](impeccable/SKILL.md) — Comprehensive frontend polish, design audit, UX review, and accessibility tuning.
- [Shadcn UI](shadcn/SKILL.md) — Composition of shadcn/Radix components and design tokens.
- [Responsive Design](responsive-design/SKILL.md) — Fluid typography, container queries, and mobile-first responsive layouts.
- [Web Design Guidelines](web-design-guidelines/SKILL.md) — Web Interface Guidelines, UX best practices, and accessibility audits.
- [Playwright CLI](playwright-cli/SKILL.md) — Browser automation for smoke-testing web pages and visual debugging.

---

Use these with `AGENTS.md`, `CODING_STANDARDS.md`, and the docs in `docs/`.
