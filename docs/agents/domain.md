# Domain Docs

How engineering skills should consume `rb-website` domain documentation when exploring the codebase.

## Before exploring, read these

- **`GLOSSARY.md`** at the repo root: the ubiquitous language (terms plus explicit `_Avoid_` synonyms).
- **`docs/adr/`**: ADR records with UTC date-hour identifiers (`YYYY-MM-DD-HH-mm-ss`). [docs/README.md](../README.md#architectural-decisions) is the authoritative index. Read any ADRs touching the area you are working in.

If either lacks an entry you need, **proceed silently**. `/domain-modeling` (reached via `/grill-with-docs` and `/improve-codebase-architecture`) adds entries lazily when terms or architectural decisions are resolved.

## File structure

```text
/
├── GLOSSARY.md
└── docs/
    └── adr/
        └── 2026-11-17-01-17-00-agent-harness-skills-and-docs-setup.md
```

## Use the glossary's vocabulary

When naming a portfolio concept in code, plans, or docs, use the term defined in `GLOSSARY.md` (for example, `ProfileHero`, `CurrentExperience`, `ExperienceHistory`, `TechBadge`, `ColorVariant`). Don't drift to synonyms the glossary explicitly avoids.

## Flag ADR conflicts

If a proposed change contradicts an existing ADR, surface it explicitly and cite the ADR by its UTC date-hour identifier (`YYYY-MM-DD-HH-mm-ss`), never by a bare sequence number.
