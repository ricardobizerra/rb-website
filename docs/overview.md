# Repository Overview

## Purpose

`rb-website` is Ricardo Bizerra's personal software engineering portfolio. It presents personal identity, current work and academic status, showcased software projects, technical stack, and chronological experience history in a single responsive Next.js application.

Implemented capabilities include:

- **Profile & Floating Navbar**: Hero identity section (`ProfileHero`) paired with a scroll-triggered floating navigation bar (`Navbar`, `ProfileHeader`), social links, and light/dark `ThemeToggle`.
- **Current Experience Summary**: Two-column summary cards (`CurrentExperience`) derived automatically from the latest entries in `workExperience` and `educationExperience`.
- **Filterable Projects Carousel**: Category tabs (`Todos`, `Front-end`, `Back-end`, `IA`) backed by `githubProjects` and an Embla carousel (`Carousel`) with repository links, live deployment links, and team/individual badges.
- **Technical Stack Overview**: Categorized skill cards (`Back-End`, `Front-End + Mobile`, `Geral`) using `<TechBadge />` and SVGR-loaded brand icons.
- **Chronological Experience History**: Tabbed timeline (`Profissional` / `Acadêmica`) grouping roles/degrees by institution with formatted `pt-BR` date ranges.

## Application

| App | Path | Runtime | Main role |
| --- | --- | --- | --- |
| Portfolio Web | `/` (root) | Node 22+, Next.js 16 (App Router) | Static/SSR portfolio UI, Tailwind CSS v4 styling, `next-themes` polarity |

## Infrastructure & Dependencies

- Single-package repository managed with `pnpm` (`pnpm-lock.yaml`).
- No database, backend API, GraphQL layer, or Docker Compose stack.
- Dependabot (`.github/dependabot.yml`) checks npm dependencies weekly targeting `develop`.

## Source of Truth

- Product intent: [`PRODUCT.md`](../PRODUCT.md).
- Visual design spec: [`DESIGN.md`](../DESIGN.md).
- Theme tokens and utility animations: [`src/app/globals.css`](../src/app/globals.css).
- Portfolio & project data: [`src/data/`](../src/data/).
- Tech registry: [`src/data/languages.ts`](../src/data/languages.ts).
