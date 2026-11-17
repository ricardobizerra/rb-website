# Coding Standards

Code-level standards and conventions for `rb-website`. This is the review-time source of truth for judgement calls. Mechanical checks (Prettier, ESLint, TypeScript `tsc --noEmit`, `pnpm docs:check`) run in tooling and are not restated as procedure. Workflow, commands, and branch rules live in the docs indexed by [docs/README.md](docs/README.md), not here.

## How to use this file

- **Implementation:** read the section for the layer you are touching before editing.
- **Review:** cite the section and rule; do not re-derive it from the diff.
- **Mechanical rules:** prefer an ESLint/Prettier/script check over growing this file. Reserve this file for judgement calls and invariants tooling cannot enforce.
- **Conflicts:** if this file and a reference doc disagree, verify the code and fix both.

## Next.js / App Router

### Directory and file layout

- `src/app/` holds App Router entrypoints (`layout.tsx`, `page.tsx`, `globals.css`, `icon.png`). Keep `page.tsx` as a clean composition shell assembling top-level section components.
- `src/components/` holds feature sections (`profile.tsx`, `current-experience.tsx`, `projects.tsx`, `stack-section.tsx`, `experience-history.tsx`, `navbar.tsx`, `background.tsx`) and shared structural wrappers (`section.tsx`, `tech-badge.tsx`, `icons.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`).
- `src/components/ui/` holds shadcn/ui primitives (`button.tsx`, `card.tsx`, `tabs.tsx`, `carousel.tsx`, `dropdown-menu.tsx`, `badge.tsx`) configured by `components.json`.
- `src/components/experience/` holds shared `cva()` variants (`variants.ts`) used across `experience-card.tsx` and `experience-history.tsx`.
- `src/data/` holds strongly-typed static portfolio content (`languages.ts`, `portfolio.ts`, `projects.ts`, `index.ts`).
- `src/lib/` holds pure utility modules (`utils.ts`, `experience-utils.ts`, `svg-utils.ts`).
- `src/hooks/` holds custom React hooks (`use-mobile.ts`).
- `src/assets/` holds static PNG and SVG brand/institution/tool assets imported as React components via `@svgr/webpack` or `next/image`.

### Server vs. client components

- Default to React Server Components (`rsc: true` in `components.json`). Add `'use client'` only when a component uses browser APIs, React state/effects, or interactive Radix/Embla primitives (`navbar.tsx`, `projects.tsx`, `theme-provider.tsx`, `theme-toggle.tsx`, `experience-card.tsx`, `ui/*`).
- Keep static data parsing, formatting, and layout composition in Server Components where possible.

### Data & type integrity

- Maintain `languages` in `src/data/languages.ts` as a `const` map. Reference technology keys everywhere via `keyof typeof languages` so invalid skill/tech IDs fail at compile time.
- Reference institutions in `src/data/portfolio.ts` via `keyof typeof companies` and `keyof typeof universities`, and verify matching icon entries exist in `Icons` (`src/components/icons.tsx`).
- Use `parseMonthYear`, `formatMonthYear`, and `getExperienceDateText` from `src/lib/experience-utils.ts` for all `MM/YYYY` experience dates instead of ad-hoc `Date` formatting.

### SVG and asset handling

- Local SVGs under `src/assets/` are transformed into React components by `@svgr/webpack` (configured for both Webpack and Turbopack in `next.config.js` with `removeViewBox: false`).
- Style imported SVG components using the shared helpers in `src/lib/svg-utils.ts` (`svgFillWhite`, `svgFillForeground`, `svgFillBackground`, `svgFillBackgroundWithHover`) so transparent paths (`[fill="transparent"]`) and Lucide stroke icons are preserved.
- Any new external image domain used in `next/image` must be allowlisted in `next.config.js` (`images.remotePatterns`).

## Design system & styling

- CSS theme tokens live in `src/app/globals.css` (`:root`, `.dark`, `@theme inline`, `@theme`). Prefer semantic theme classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-primary/20`, `bg-card`, `text-primary`) over hard-coded colors.
- Exception: institution brand accents (`ColorVariant` in `src/components/experience/variants.ts`) use the curated 8-color `cva()` palette (`default`, `red`, `green`, `blue`, `yellow`, `orange`, `purple`, `pink`).
- Compose new page sections with `Section`, `SectionHeader`, `SectionTitle`, and `SectionDescription` from `src/components/section.tsx`.
- Follow [DESIGN.md](DESIGN.md) for visual hierarchy and [docs/design-system.md](docs/design-system.md) for token, elevation, and variant conventions.
- Preserve Portuguese (`pt-BR`) UI copy for portfolio labels, headings, and descriptions (`Habilidades`, `Projetos`, `Experiência`, `Conclusão em ...`, `Desde ...`).

## Cross-cutting

- **Naming:** Use `kebab-case` for component/lib filenames, `PascalCase` for React components and types, and `camelCase` for functions and data keys. Follow [GLOSSARY.md](GLOSSARY.md) terms.
- **Types:** TypeScript runs in `strict` mode. Avoid explicit `any`; prefer `as const`, `keyof typeof`, narrow union types, or `unknown` with type guards.
- **Formatting:** Prettier (`prettier-plugin-tailwindcss`) + ESLint (`eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, `eslint-plugin-prettier`) own formatting and Tailwind class sorting. Do not hand-format around the formatter.
- **Documentation:** Keep `AGENTS.md` concise (~35 lines), index all ADRs in `docs/README.md`, and run `pnpm docs:check` whenever modifying markdown files or `package.json`.

## Review checklist

- **Type & data integrity:** New experience/project entries use valid `keyof typeof languages` and `Icons` keys; dates use `MM/YYYY` and `experience-utils.ts`.
- **Styling & responsive craft:** Uses `Section` primitives, semantic OKLCH theme variables, light & dark mode parity, and `xs`–`lg` responsive spacing.
- **SVG & assets:** Non-Lucide SVGs use `svg-utils.ts` helpers; external `Image` hosts exist in `next.config.js`.
- **Verification:** `pnpm typecheck`, `pnpm lint`, `pnpm build`, and (for docs/package changes) `pnpm docs:check` pass.
