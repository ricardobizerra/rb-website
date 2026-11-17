# Commands Reference

Run all commands from the repository root with `pnpm`.

## Development & Build

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start Next.js development server (`next dev`) |
| `pnpm build` | Build production bundle (`next build`) and verify static/SSR routes |
| `pnpm start` | Serve production build (`next start`) |

## Code Quality & Formatting

| Command | Purpose |
| --- | --- |
| `pnpm typecheck` | Run TypeScript compiler check (`tsc --noEmit`) in strict mode |
| `pnpm lint` | Run ESLint flat config (`eslint .` with Next.js Core Web Vitals, TypeScript, and Prettier rules) |
| `pnpm prettier` | Format `js`, `jsx`, `ts`, `tsx`, `json`, and `css` files (including Tailwind class sorting) |
| `pnpm prettier:check` | Check code and style formatting without writing changes (used in CI) |

## Repository Governance & Docs

| Command | Purpose |
| --- | --- |
| `pnpm docs:check` | Run `python3 scripts/check-docs.py` (validates markdown links, stale command patterns, `pnpm` script references, and ADR indexing) |
| `pnpm git:check` | Run `node scripts/git-branch-audit.mjs` (advisory check for canonical branch names and `main`/`develop` upstream isolation) |
| `node scripts/git-branch-audit.mjs --ci-pr-head` | Audit PR head branch name in CI against canonical taxonomy (allows `develop`, `main`, `dependabot/*`) |
| `node scripts/release-tag.mjs --dry-run` | Preview automated SemVer tagging and GitHub Release creation |

## Git Hooks

Enable the versioned pre-commit hook in a fresh clone:

```bash
git config core.hooksPath .githooks
```

When markdown files, `package.json`, `scripts/check-docs.py`, or `.githooks/pre-commit` are staged, the hook runs `python3 scripts/check-docs.py` automatically.
