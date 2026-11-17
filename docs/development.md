# Development Workflow

## Prerequisites

- Node.js 24 LTS (22+ compatible)
- `pnpm` (recommended via Corepack or nvm)
- Python 3 (for `pnpm docs:check` and the `.githooks/pre-commit` documentation guard)

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Optionally enable the versioned pre-commit hook:

```bash
git config core.hooksPath .githooks
```

3. Start the Next.js development server:

```bash
pnpm dev
```

## Updating Portfolio Content

1. **Add a technology**: register its key and display name in `src/data/languages.ts`, and add a matching icon key in `src/components/icons.tsx` (and `src/assets/` SVG if custom).
2. **Add work or education experience**: add/update the institution in `companies` or `universities` (`src/data/portfolio.ts`) with a `ColorVariant` from `src/components/experience/variants.ts`, then append the entry using `MM/YYYY` dates.
3. **Add a project**: append to `githubProjects` in `src/data/projects.ts`. If `imageUrl` uses a new external host, allowlist it in `next.config.js` (`images.remotePatterns`).
4. **Validate before committing**:

```bash
pnpm prettier
pnpm typecheck
pnpm lint
pnpm build
```

## Git, Branching & Commit Strategy

All branching workflows, topic lifecycles, and commit conventions follow [Git Branching Strategy & Topic Lifecycle](branching-strategy.md) and [Commit & Conventional Commit Strategy](commit-strategy.md):

- **Pre-Flight Branching**: Never edit or commit on `main`. Cut topic branches from a verified-synchronized local `main` (`git fetch origin main && git checkout main && git merge --ff-only origin/main && git checkout --no-track -b <prefix>/<slug> main`).
- **Canonical Prefixes**: `feature/`, `fix/`, `chore/`, `refactor/`, `docs/`, `test/`, `perf/`. Audit local branches with `pnpm git:check`.
- **Integration via `develop`**: Push validated topic branches (`git push -u origin <prefix>/<slug>`) and confirm with the user before `--no-ff` merging into `develop` and pushing `origin/develop`.
- **Upstream Sync**: Sync topic branches with `git pull --no-rebase origin main`; never rebase or force-push.
- **Conventional Commits**: Imperative, lowercase, English commit messages (`<type>(<scope>): <description>`).

## Continuous Integration & Release Automation

- **Automated CI Workflow (`.github/workflows/ci.yml`)**: Runs on pushes to `main`/`develop` and pull requests targeting either branch. It executes 3 parallel jobs:
  1. `docs-and-branch`: `pnpm docs:check` and PR head branch taxonomy audit (`node scripts/git-branch-audit.mjs --ci-pr-head`).
  2. `quality`: `pnpm prettier:check`, `pnpm typecheck`, and `pnpm lint`.
  3. `build`: `.next/cache` restoration and `pnpm build`.
  A final aggregator job named **`ci`** verifies all three parallel jobs succeeded.
- **Branch Protection**: Configure GitHub branch protection / rulesets on `main` and `develop` to require the single **`ci`** status check before merging.
- **Automated Release Tagging (`.github/workflows/release-tag.yml`)**: When a pull request merges into `main`, GitHub Actions executes `node scripts/release-tag.mjs`. It reads `version` from `package.json`, checks if `vX.Y.Z` already exists on `origin` (no-op if already tagged), creates an annotated Git tag `vX.Y.Z`, pushes it, and publishes a GitHub Release using PR notes.
- **Automated Dependency Updates (`.github/dependabot.yml`)**: Dependabot checks both npm packages and GitHub Actions weekly, opening pull requests targeting `develop`.
