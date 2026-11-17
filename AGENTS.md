# AGENTS.md

`rb-website` is a Next.js App Router personal portfolio built with React 19, TypeScript (`strict`), Tailwind CSS v4, and shadcn/ui. Read [PRODUCT.md](PRODUCT.md) for intent, [DESIGN.md](DESIGN.md) for UI direction, and [docs/README.md](docs/README.md) for the full index.

## Read before you act

| Task | Read first |
| --- | --- |
| Find code or assets | [Repo map](docs/repo-map.md) |
| Continue a previous session | `HANDOFF.md` in the worktree, if present |
| Implement or review code | [CODING_STANDARDS.md](CODING_STANDARDS.md), [code-review](.agents/skills/code-review/SKILL.md) |
| Change layout or domain data | [Architecture](docs/architecture.md), [GLOSSARY.md](GLOSSARY.md), and [ADRs](docs/README.md#architectural-decisions) |
| Change UI or styling | [DESIGN.md](DESIGN.md), [Design System](docs/design-system.md) |
| Run or validate | [Development](docs/development.md), [Commands](docs/commands.md), [validation gates](docs/commit-strategy.md#6-pre-commit-validation-gates) |
| Branch, commit, or open a PR | [git-branching](.agents/skills/git-branching/SKILL.md), [Commit Strategy](docs/commit-strategy.md) |
| Anything else | [docs/README.md](docs/README.md) |

## Hard rules

- **Never edit, commit, or push on `main`.** Halt on an in-progress rebase, merge, cherry-pick, bisect, or detached HEAD; cut topic branches from a verified-synchronized local `main`, never `origin/main`, after the gate in [git-branching](.agents/skills/git-branching/SKILL.md). `develop` is the intermediate integration branch and receives `--no-ff` merges from topic branches after user confirmation (or direct commits only when explicitly requested by the user).
- **Topic push, `develop` push, and no force-push.** Agents automatically push validated topic branches (`git push -u origin <prefix>/<slug>`) after completing commits and ask whether the work can be merged into `develop`. Pushing to `origin/develop` occurs after user-confirmed `--no-ff` topic merges or explicit direct commits on `develop`. Direct push to `main` and force-pushing (`--force`, `--force-with-lease`) on any branch are forbidden. Sync topic branches with `main` via `git pull --no-rebase origin main`, never rebase. Emit PR guidance only when explicitly requested.
- **Run package commands with `pnpm` from the repo root.** Validate code with `pnpm typecheck`, `pnpm lint`, and `pnpm build`, and docs with `pnpm docs:check`.
- **Use Conventional Commits.** Commit messages, branch names, PR titles, and docs are English; preserve established Portuguese UI and portfolio copy. See [commit strategy](docs/commit-strategy.md).
- **Keep docs true.** Update docs when structure, commands, tokens, or workflows change; record architectural decisions in `docs/adr/` and index them in [docs/README.md](docs/README.md).
- **Carry session context in `HANDOFF.md`.** Before closing multi-phase or commit-hold work, record the branch, pending commits, stashes, and checks in an untracked `HANDOFF.md`; read it before exploring.

## Before handoff

- [ ] The branch is canonical and does not track `main` or `develop`.
- [ ] Changed-layer gates (`pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm docs:check`) pass; skipped gates and reasons are recorded.
- [ ] Docs are updated; nothing was committed or pushed on `main`, the validated topic branch is pushed to `origin/<prefix>/<slug>`, and user confirmation is requested before merging and pushing to `develop`.
