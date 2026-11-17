---
name: Ricardo Bizerra Portfolio
description: Personal portfolio and engineering showcase for Ricardo Bizerra
---

# Design System: rb-website

## 1. Overview

**Creative North Star: "Precision Navy Showcase"**

A crisp, deep-navy anchored engineering portfolio that pairs a serene slate-blue gradient canvas with structured shadcn/ui cards, subtle navy/blue glow accents, and fluid dark/light theme parity. It highlights current roles, shipped projects, technical stack, and chronological experience without visual noise.

**Source of Truth:** Design tokens, OKLCH CSS variables, custom glow/backdrop utilities, and keyframe animations live in [`src/app/globals.css`](src/app/globals.css). Shared component variants live in [`src/components/experience/variants.ts`](src/components/experience/variants.ts) and [`src/components/ui/`](src/components/ui/). Operating rules live in [`docs/design-system.md`](docs/design-system.md).

**Key Characteristics:**
- Deep-navy (`oklch(0.29 0.1 256.03)`) and electric-blue (`oklch(0.54 0.18 254.97)`) brand accents over cool neutral/slate surfaces
- `Plus Jakarta Sans` primary typeface (`--font-sans`), paired with `Geist` serif fallback and `JetBrains Mono` (`--font-mono`)
- Subtle glassmorphic floating navbar (`backdrop-blur-md`) and soft card hover glows (`shadow-navy-hover`, `portfolio-glow-*`)
- Responsive from `xs` (`360px`) through `lg` (`1024px+`)

## 2. Colors: OKLCH Navy & Slate Palette

Tokens are defined in `:root` (light mode) and `.dark` (dark mode) inside `src/app/globals.css` and mapped into Tailwind v4 via `@theme inline`.

### Core Semantic Tokens

| Token | Light (`:root`) | Dark (`.dark`) | Role |
| :--- | :--- | :--- | :--- |
| `--background` | `oklch(1 0 0)` | `oklch(0.13 0.05 267.82)` | Base surface |
| `--foreground` | `oklch(0.29 0.1 256.03)` | `oklch(0.93 0.03 261.49)` | Primary ink & headings |
| `--card` | `oklch(1 0 0)` | `oklch(0.13 0.05 267.82)` | Card background |
| `--primary` | `oklch(0.29 0.1 256.03)` | `oklch(1 0 0)` | Primary interactive & focus accent |
| `--secondary` | `oklch(0.54 0.18 254.97)` | `oklch(0.54 0.18 254.97)` | Secondary blue highlight |
| `--muted` | `oklch(0.99 0.01 264.61)` | `oklch(0.21 0.06 267.88)` | Subtle surface fills |
| `--muted-foreground` | `oklch(0.45 0.08 264.4)` | `oklch(0.71 0.06 264.96)` | Secondary labels, dates, descriptions |
| `--border` | `oklch(0.93 0.03 261.49)` | `oklch(0.26 0.06 265.83)` | Card and divider borders |
| `--destructive` | `oklch(0.58 0.24 28.48)` | `oklch(0.7 0.19 22.23)` | Error / destructive states |

### Page Canvas & Ambient Backdrop

- `src/app/layout.tsx` wraps content in `bg-linear-to-br from-slate-50 via-blue-50/80 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900`.
- `src/components/background.tsx` renders subtle ambient geometric/blur layers behind the main container.

### Institution Brand Palette (`ColorVariant`)

Institutions (companies and universities) declare a semantic `color` key from `ColorVariant` (`default`, `red`, `green`, `blue`, `yellow`, `orange`, `purple`, `pink`), mapped via `cva()` in `src/components/experience/variants.ts` (`iconVariants`, `titleVariants`) and card hover variants in `experience-card.tsx` and `experience-history.tsx`.

## 3. Typography

- **Primary Sans (`--font-sans`)**: `Plus Jakarta Sans` (`latin`, `latin-ext`), loaded via `next/font/google` in `src/app/layout.tsx`.
- **Monospace (`--font-mono`)**: `JetBrains Mono, monospace`.
- **Serif (`--font-serif`)**: `Geist, Geist Fallback, sans-serif`.

### Scale & Hierarchy

- **Hero Name**: Large bold display sizing in `ProfileHero`.
- **Section Title (`SectionTitle`)**: `text-xl leading-none font-bold sm:text-2xl md:text-3xl`.
- **Section Description (`SectionDescription`)**: `text-muted-foreground text-sm leading-tight sm:text-lg md:text-xl`.
- **Card / Group Title**: `text-base font-bold sm:text-lg`.
- **Metadata / Dates**: `text-xs font-medium` / `text-[10px] sm:text-xs text-muted-foreground`.

## 4. Elevation, Glows & Motion

`globals.css` provides:
- **Standard shadcn shadows**: `--shadow-2xs` through `--shadow-2xl`.
- **Portfolio glow utilities**: `shadow-navy`, `shadow-navy-hover`, `shadow-blue`, `shadow-blue-hover`, `glow-border-navy`, `glow-border-blue`, `portfolio-glow-navy`, `portfolio-glow-blue`.
- **Motion utilities**: `animate-float`, `animate-pulse-glow`, `animate-scale-in`, `animate-fade-in`, `btn-enhanced`.
- **Focus Ring**: Global `*:focus-visible` applies `outline-primary outline-2 outline-offset-2`.

## 5. Layout & Responsive Breakpoints

- Root container in `src/app/page.tsx`: `mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 pb-20 sm:gap-10 sm:px-6 md:gap-12`.
- Custom `xs` breakpoint at `360px` (`@theme { --breakpoint-xs: 360px; }` in `src/app/globals.css`) supports compact mobile layouts such as the `grid-cols-2` `CurrentExperience` cards and compact `Navbar` profile header.
