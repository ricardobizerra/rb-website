# Repository Map

Use this page before searching the whole repository. It names the canonical paths for each area and the fastest search scope.

## Top-Level Layout

| Path | What lives there |
| --- | --- |
| `src/app/` | App Router entrypoint (`layout.tsx`, `page.tsx`, `globals.css`, `icon.png`) |
| `src/components/` | Portfolio sections, shared structural components, and `ui/` shadcn primitives |
| `src/data/` | Strongly-typed static portfolio, project, and technology registry modules |
| `src/lib/` | Pure helpers (`utils.ts`, `experience-utils.ts`, `svg-utils.ts`) |
| `src/hooks/` | Custom React hooks (`use-mobile.ts`) |
| `src/assets/` | Static PNG images and SVGs imported as React components via `@svgr/webpack` |
| `public/` | Public static images (`icon-rb-code.png`, `next.svg`, `vercel.svg`) |
| `docs/` | Architecture, commands, design system, branching/commit policy, ADRs, agent config |
| `.agents/skills/` | Repo governance skills (6) and tailored ecosystem skills |
| `scripts/` | Repository maintenance scripts (`check-docs.py`, `git-branch-audit.mjs`) |
| `.githooks/` | Versioned git hooks (`pre-commit` running `scripts/check-docs.py`) |
| root | `AGENTS.md`, `CODING_STANDARDS.md`, `PRODUCT.md`, `DESIGN.md`, `GLOSSARY.md`, `skills-lock.json`, `next.config.js`, `components.json` |

## Canonical Component & Data Map

| Area | Files | Start here |
| --- | --- | --- |
| App shell & theme | `src/app/layout.tsx`, `src/app/globals.css`, `src/components/theme-provider.tsx`, `src/components/background.tsx` | `src/app/layout.tsx` |
| Navigation & theme toggle | `src/components/navbar.tsx`, `src/components/theme-toggle.tsx` | `src/components/navbar.tsx` |
| Hero & identity | `src/components/profile.tsx`, `src/data/portfolio.ts` | `src/components/profile.tsx` |
| Current experience cards | `src/components/current-experience.tsx`, `src/components/experience-card.tsx`, `src/components/experience/variants.ts` | `src/components/experience-card.tsx` |
| Experience timeline | `src/components/experience-history.tsx`, `src/lib/experience-utils.ts`, `src/components/experience/variants.ts` | `src/components/experience-history.tsx` |
| Projects showcase | `src/components/projects.tsx`, `src/data/projects.ts` | `src/components/projects.tsx` |
| Skills & badges | `src/components/stack-section.tsx`, `src/components/tech-badge.tsx`, `src/data/languages.ts` | `src/components/stack-section.tsx` |
| Icons & SVG styling | `src/components/icons.tsx`, `src/lib/svg-utils.ts`, `src/assets/` | `src/components/icons.tsx` |
| UI primitives | `src/components/ui/{badge,button,card,carousel,dropdown-menu,tabs}.tsx` | `components.json` |

## Naming Rules That Prevent Wrong Guesses

- **Component filenames use `kebab-case`**: `experience-history.tsx`, `tech-badge.tsx`, `theme-toggle.tsx`.
- **Technology IDs are centrally keyed**: `src/data/languages.ts` (`languages`) is the single registry; both `portfolio.ts` and `projects.ts` reference `keyof typeof languages`.
- **SVG imports use SVGR**: importing `*.svg` from `src/assets/` yields a React component (configured in `next.config.js` for both Webpack and Turbopack).
- **UI copy is Portuguese (`pt-BR`)**: visible headings and labels are Portuguese, while code identifiers, docs, and commits are English.

## Search Recipes

```bash
# Search components without node_modules or build noise
rg -n "SymbolName" src/components

# Search data & types
rg -n "SymbolName" src/data src/lib

# Search docs and glossary
rg -n "term" GLOSSARY.md docs
```
