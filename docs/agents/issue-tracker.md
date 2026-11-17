# Issue tracker: session briefs + ADRs (with optional Linear support)

Work on `rb-website` primarily arrives as session-start briefs from the maintainer and is recorded as ADRs in `docs/adr/` (UTC date-hour identifiers, indexed in `docs/README.md`) and plans in `docs/plans/` (created lazily when needed). Occasionally, tickets also originate from Linear.

## Conventions for skills (`to-tickets`, `triage`, `to-spec`, `wayfinder`, `pr`)

- **Primary source of record**: When no Linear issue is referenced, the issue of record is the session brief plus its linked ADRs and plans. Do not invent ticket numbers; cite the brief, ADR, or plan path instead.
- **When a Linear ticket is provided**: Use the configured Linear MCP tools (`get_issue`, `list_issues`, `save_comment`, etc.) to read context or reference the key (e.g., `Refs <KEY>`) in commits, branches, and PR descriptions.
- **"Publish to the issue tracker"**: Write or update the ADR/plan and report its path (or update the referenced Linear issue if the session explicitly uses Linear).
- **GitHub CLI**: Do not assume `gh` CLI is authenticated or available; prefer local git commands and Linear MCP when applicable.

## Pull requests as a triage surface

**PRs as a request surface: no.** Solo-maintainer repo; PRs are the maintainer's own topic or release branches.

_(Set to `yes` if this repo ever treats external PRs as feature requests; `/triage` reads this flag.)_
