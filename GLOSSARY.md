# rb-website Glossary

Ubiquitous language for the `rb-website` portfolio codebase and documentation. Engineering docs, branches, and commits use English terms; UI strings preserve their established Portuguese (`pt-BR`) copy.

## Portfolio Domain

**Profile (`ProfileHero` / `ProfileHeader`)**:
The owner identity header displaying photo, name, role subtitle (`Engenheiro de Software Full-Stack`), and contact/social actions. `ProfileHero` is the main top-of-page header; `ProfileHeader` is its compact version revealed inside `Navbar` once scrolled past `#profile-section`.
_Avoid_: Hero banner, user bio box

**Current Experience (`CurrentExperience`)**:
The two-column summary row (`WorkExperienceCard` and `EducationExperienceCard`) highlighting the latest work role and latest academic course from `data.workExperience` and `data.educationExperience`.
_Avoid_: Active status widgets, top cards

**Institution (`companies` / `universities`)**:
An employer or university entry in `src/data/portfolio.ts` keyed by a canonical ID (e.g., `citi`, `trackingTrade`, `ufpe`, `senac`) that binds a display name, an icon key in `Icons`, and a `ColorVariant`.
_Avoid_: Organization record, brand object

**Experience Entry (`WorkExperience` / education item)**:
A single role or degree entry tied to an `institution` key, with `title`, `type` (e.g., `Estágio`, `Empresa Júnior`, `Graduação`), `startDate` (`MM/YYYY`), `endDate` (`MM/YYYY | null`), and `description`.
_Avoid_: Job item, resume row

**Experience History (`ExperienceHistory`)**:
The tabbed chronological timeline section (`Profissional` / `Acadêmica`) that groups consecutive or related entries by institution and computes group and item date spans via `src/lib/experience-utils.ts`.
_Avoid_: Timeline list, career table

**Project (`Project` / `githubProjects`)**:
A showcased software project in `src/data/projects.ts` with `categories` (`frontend`, `backend`, `ai`), `technologies` (`keyof typeof languages`), `projectType` (`individual` or `group`), optional `imageUrl`, `githubLinks`, and optional `liveUrl`.
_Avoid_: Repo card, work item

**Tech Registry (`languages`)**:
The canonical `const` map in `src/data/languages.ts` mapping technology IDs (e.g., `typescript`, `nextjs`, `nestjs`) to human-readable labels, paired with matching icons in `src/components/icons.tsx` and rendered via `<TechBadge />`.
_Avoid_: Skill enum, tag list

**Stack Section (`StackSection`)**:
The categorized skills overview (`Back-End`, `Front-End + Mobile`, `Geral`) rendered from `data.skills` using `<StackCard>` and `<TechBadge>`.
_Avoid_: Skills matrix, tech cloud

## Design & Assets

**Color Variant (`ColorVariant`)**:
The 8-value institution accent union (`default`, `red`, `green`, `blue`, `yellow`, `orange`, `purple`, `pink`) defined in `src/components/experience/variants.ts` and consumed by `iconVariants`, `titleVariants`, and `cardVariants`.
_Avoid_: Theme color, badge color

**SVG Fill Utility (`svg-utils.ts`)**:
Tailwind arbitrary-selector helpers (`svgFillWhite`, `svgFillForeground`, `svgFillBackground`, `svgFillBackgroundWithHover`) that color SVGR-imported brand SVGs while preserving `[fill="transparent"]` paths and excluding `.lucide` stroke icons.
_Avoid_: Inline SVG color overrides
