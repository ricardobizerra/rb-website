# Design System Working Rules

This is the working layer complementing [`DESIGN.md`](../DESIGN.md) (the visual spec: palette, typography, elevation, and layout).

## Source of Truth

- **CSS variables & utilities**: [`src/app/globals.css`](../src/app/globals.css) defines `:root` and `.dark` OKLCH tokens, `@theme inline` Tailwind v4 mappings, custom `--breakpoint-xs: 360px`, glow/backdrop utilities (`@layer utilities`), and animations (`@layer components`).
- **shadcn/ui configuration**: [`components.json`](../components.json) configures `new-york` style, `zinc` base color, `rsc: true`, `cssVariables: true`, and `lucide` icon library.
- **UI Primitives**: [`src/components/ui/`](../src/components/ui/) (`badge.tsx`, `button.tsx`, `card.tsx`, `carousel.tsx`, `dropdown-menu.tsx`, `tabs.tsx`).
- **Section layout primitives**: [`src/components/section.tsx`](../src/components/section.tsx) (`Section`, `SectionHeader`, `SectionTitle`, `SectionDescription`).
- **Institution color variants**: [`src/components/experience/variants.ts`](../src/components/experience/variants.ts) (`ColorVariant`, `iconVariants`, `titleVariants`).

## Component & Variant Conventions

1. **Reuse `Section*` wrappers for page sections.** Every major vertical section (`Projects`, `StackSection`, `ExperienceHistory`) composes `Section`, `SectionHeader`, `SectionTitle`, and `SectionDescription` so heading scale and spacing stay uniform.
2. **Use `cva()` for reusable visual axes.** Shared institution color palettes live in `src/components/experience/variants.ts` (`ColorVariant`: `default`, `red`, `green`, `blue`, `yellow`, `orange`, `purple`, `pink`), consumed by both `experience-card.tsx` and `experience-history.tsx`.
3. **Preserve SVG fill semantics.** Custom brand SVGs under `src/assets/` use SVGR and are styled with `svgFillWhite`, `svgFillForeground`, `svgFillBackground`, or `svgFillBackgroundWithHover` from `src/lib/svg-utils.ts` so transparent paths (`[fill="transparent"]`) and `.lucide` stroke icons are never broken.
4. **Maintain light and dark parity.** Test every visual change under both light and dark modes (`ThemeToggle` / `next-themes`) and across mobile (`xs: 360px`), tablet (`sm`/`md`), and desktop (`lg`).

## Recipe: Adding an Institution Color Variant

1. Add the new color key to `ColorVariant` in `src/components/experience/variants.ts`.
2. Add matching classes to `iconVariants` and `titleVariants` in `src/components/experience/variants.ts`.
3. Add matching card hover classes to `cardVariants` in `src/components/experience-card.tsx` and `src/components/experience-history.tsx`.
4. Validate formatting and types with `pnpm prettier`, `pnpm typecheck`, and `pnpm build`.
