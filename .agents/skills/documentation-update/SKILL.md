---
name: documentation-update
description: Keep rb-website self-describing as components, portfolio data, design tokens, or workflows change.
---

# Documentation Update

Repo-harness adapter for keeping repository architecture, domain documentation, design docs, and ADR records synchronized and verified.

## 1. Delegate Domain Modeling & ADRs to Tracked Skills

Before drafting architectural decisions or domain terms, activate the matching tracked skill:

| Need | Specialized Tracked Skill | What It Owns |
| --- | --- | --- |
| **Domain Terms & Glossary** | [`domain-modeling`](../domain-modeling/SKILL.md) | Capturing ubiquitous language, resolving synonym conflicts, and updating `GLOSSARY.md` |
| **ADR Trade-offs & Formatting** | [`domain-modeling`](../domain-modeling/SKILL.md) | Criteria for creating ADRs (hard to reverse, surprising, real trade-offs) |
| **Stress-Testing Design Decisions** | [`grill-with-docs`](../grill-with-docs/SKILL.md), [`grilling`](../grilling/SKILL.md) | Interactive interview loop to challenge assumptions and sharpen ADRs |

## 2. Repo Harness & Documentation Invariants

1. **Progressive Disclosure**:
   - Keep `AGENTS.md` strictly concise (~35 lines). It sits at the top of every turn's context; never bloat it with detailed commands, guides, or rules.
   - Place architectural records in `docs/adr/YYYY-MM-DD-HH-mm-ss-*.md` (UTC date-hour identifier from `date -u +%Y-%m-%d-%H-%M-%S`) and guides in `docs/` or `.agents/skills/`.
2. **Index Alignment**:
   - Every ADR in `docs/adr/` must be indexed in `docs/README.md`.
   - Workflow skills must be cross-referenced in `.agents/skills/README.md`.
3. **Language Discipline**:
   - All docs, ADRs, commit messages, and branch names are written in English.
   - Preserve established Portuguese UI copy and portfolio labels documented in `GLOSSARY.md`.
4. **Verification Command**:
   - Run the documentation consistency guard before committing any markdown or `package.json` changes:
     ```bash
     pnpm docs:check
     ```
   - Validates that relative links resolve, active docs do not teach stale command forms, `pnpm` script references exist in `package.json`, and every ADR is indexed in `docs/README.md`.
