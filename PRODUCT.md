# Product

## Register

product

## Audience

Recruiters, engineering managers, technical peers, and potential collaborators evaluating Ricardo Bizerra's background as a Full-Stack Software Engineer. Visitors typically arrive from LinkedIn, GitHub, or a resume link to quickly scan current role and education, inspect flagship projects (with live demos and repositories), review the technical stack, and trace career progression.

## Product Purpose

A personal software engineering portfolio (`rb-website`) that presents identity, current professional and academic status, curated software projects, technical stack, and chronological work/education history in one fast, responsive, scannable page.

Success looks like: a visitor understands Ricardo's experience level, core stack, and shipped projects within seconds on mobile or desktop, and can jump straight to a live demo, repository, LinkedIn, GitHub, or email without friction.

## Brand Personality

Confident, technical, structured, approachable.

The portfolio reads like an engineer's craft showcase: clean navy/blue identity, crisp typography, purposeful depth and hover feedback, and zero filler copy. Every section earns its vertical space by presenting concrete proof of work (roles, dates, stacks, repos, live URLs).

## References

- **Modern engineering portfolios (Vercel / shadcn aesthetic)** — crisp cards, tight grid alignment, tabular/clean metadata, effortless dark and light mode parity.
- **Interactive technical resumes** — scannable two-column summary cards up front paired with tabbed, filterable deep-dives below.

## Anti-references

- **Template "creative agency" portfolios** — generic stock photos, bloated bio paragraphs, fake skill percentage bars ("React: 90%"), or excessive scroll-jacking.
- **Unstructured text walls** — plain bullet lists with no visual hierarchy, iconography, or stack context.

## Design Principles

1. **Above-the-fold clarity.** Identity (`ProfileHero`) and current status (`CurrentExperience`: work + education) appear immediately without marketing fluff.
2. **Proof over adjectives.** Projects link directly to GitHub repositories and live deployments (`financial-tracker`, ML/AI coursework, web apps), categorized by domain (`Todos`, `Front-end`, `Back-end`, `IA`).
3. **Structured progression.** Career and academic timelines (`ExperienceHistory`) group multiple roles under each institution so growth within an organization is immediately legible.
4. **Cohesive light and dark polarity.** Both modes use intentional OKLCH navy/slate palettes with subtle glow accents rather than inverted defaults.

## Accessibility & Inclusion

- Semantic landmarks (`<main>`, `<section>`, heading hierarchy `h1` -> `h2` -> `h3`), visible `:focus-visible` primary outlines, and keyboard-accessible Radix Tabs/Dropdown/Carousel controls.
- High-contrast foreground/background tokens in both light and dark modes, plus system preference support via `next-themes`.
- Portfolio content is written in Portuguese (`pt-BR`) for Brazilian/Portuguese-speaking audiences; repository documentation and engineering metadata remain in English.
