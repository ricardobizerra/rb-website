---
name: feature-development
description: Implement a new user-visible capability in rb-website while keeping UI components, portfolio data, design tokens, verification gates, and docs aligned.
---

# Feature Development

Repo-harness adapter coordinating end-to-end feature delivery for `rb-website` across Next.js App Router, Tailwind CSS v4, shadcn/ui, and the repository's validation gates.

## 1. Delegate Layer Implementation to Tracked Skills

Before modifying code, activate the specialized tracked skill matching each development step:

| Layer / Responsibility | Specialized Tracked Skill | What It Owns |
| --- | --- | --- |
| **Spec Breakdown & Execution** | [`implement-spec`](../implement-spec/SKILL.md) / [`implement`](../implement/SKILL.md) | Task breakdowns, incremental phase execution, and acceptance criteria |
| **Surgical Discipline** | [`karpathy-guidelines`](../karpathy-guidelines/SKILL.md) | Concrete success criteria, avoiding premature abstraction, minimal changes |
| **Domain Terms & ADRs** | [`domain-modeling`](../domain-modeling/SKILL.md) | `GLOSSARY.md` ubiquitous language alignment and ADR authoring |
| **Next.js & App Router Layout** | [`nextjs-app-router-patterns`](../nextjs-app-router-patterns/SKILL.md) | Server vs. client component boundaries, metadata, and App Router layout |
| **Vercel React Performance** | [`vercel-react-best-practices`](../vercel-react-best-practices/SKILL.md) | Memoization, bundle efficiency, and image/asset optimization |
| **UI Aesthetics & Visual Polish** | [`frontend-design`](../frontend-design/SKILL.md), [`impeccable`](../impeccable/SKILL.md) | Distinctive UI aesthetics, visual hierarchy, and UX clarity |
| **UI Components & Radix Patterns** | [`shadcn`](../shadcn/SKILL.md) | shadcn/Radix component composition and CSS variable alignment |
| **Responsive Grid & Breakpoints** | [`responsive-design`](../responsive-design/SKILL.md) | Fluid typography and mobile-first responsive layouts (`xs` through `lg`) |
| **Web Interface Accessibility** | [`web-design-guidelines`](../web-design-guidelines/SKILL.md) | Accessibility audits, ARIA landmarks, focus visibility, and UX review |
| **Verification** | [`tdd`](../tdd/SKILL.md), [`playwright-cli`](../playwright-cli/SKILL.md) | Test-first discipline and browser smoke exploration |

## 2. Repo Harness & Execution Pipeline

0. **Pre-Flight Branch Verification**:
   - Run the Repository State Gate in [`git-branching`](../git-branching/SKILL.md).
   - Cut a canonical `feature/<topic>` branch from verified local `main`.
1. **Data & Content Modeling**:
   - Update typed portfolio data in `src/data/` and helpers in `src/lib/` following `CODING_STANDARDS.md`.
2. **UI & Styling**:
   - Compose components in `src/components/` using primitives from `src/components/ui/` and tokens from `src/app/globals.css` / `DESIGN.md`.
   - Keep `Section` wrappers, `cva()` variants, and Portuguese UI copy consistent.
3. **Validation Gates**:
   ```bash
   pnpm prettier
   pnpm typecheck
   pnpm lint
   pnpm build
   ```
4. **Documentation & ADR Records**:
   - Update affected docs (`docs/`, `GLOSSARY.md`, `DESIGN.md`) and record an ADR when architectural or design-system contracts change, following [`documentation-update`](../documentation-update/SKILL.md).
   - Run `pnpm docs:check`.
5. **Stage & Commit**:
   - Commit atomically using [`conventional-commits`](../conventional-commits/SKILL.md) and push via [`git-branching`](../git-branching/SKILL.md).
