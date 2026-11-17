---
name: testing
description: Verify rb-website behavior through static checks, production builds, documentation checks, and browser smoke exploration.
---

# Testing & Verification

Repo-harness adapter for verifying `rb-website`. Currently, `rb-website` does not ship a dedicated unit or E2E test runner (Vitest or Playwright suite); verification relies on TypeScript checking, ESLint, Next.js production builds, documentation consistency checks, and browser smoke verification.

## 1. Delegate Methodology to Tracked Skills

| Need | Specialized Tracked Skill | What It Owns |
| --- | --- | --- |
| **Test-Driven Design** | [`tdd`](../tdd/SKILL.md) | Red-green-refactor cycle and minimal test setups (when adding a test suite or pure logic tests) |
| **Browser Diagnostics & Smoke Checks** | [`playwright-cli`](../playwright-cli/SKILL.md) | Browser interaction, console/layout checks, responsive viewport inspection |
| **Accessibility & UI Audits** | [`web-design-guidelines`](../web-design-guidelines/SKILL.md) | Contrast, keyboard focus, semantic landmarks, and responsive checks |

## 2. Repo Harness Verification Commands

Run all checks from the repository root with `pnpm`:

- **Typecheck**:
  ```bash
  pnpm typecheck
  ```
- **Lint (ESLint flat config + Prettier rule)**:
  ```bash
  pnpm lint
  ```
- **Production build (catches Next.js SSR, image, SVG, and route bundling issues)**:
  ```bash
  pnpm build
  ```
- **Documentation & link consistency**:
  ```bash
  pnpm docs:check
  ```

## 3. Browser Smoke Verification Checklist

When changing layout, themes, navigation, or interactive tabs/carousels, start `pnpm dev` (or `pnpm start` after `pnpm build`) and verify:

1. Zero console errors or hydration warnings in light and dark mode.
2. Responsive rendering across mobile (`360px` / `xs`), tablet (`sm`/`md`), and desktop (`lg`+).
3. Navbar scroll reveal (`ProfileHeader`), `ThemeToggle`, `Projects` category tabs + carousel controls, and `ExperienceHistory` tabs (`Profissional` / `Acadêmica`).

## 4. Adding Automated Tests

If introducing Vitest or Playwright to `rb-website`, record an ADR following [`documentation-update`](../documentation-update/SKILL.md) and update [docs/commands.md](../../../docs/commands.md) and this skill with the exact test commands.
