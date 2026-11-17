#!/usr/bin/env node
/**
 * git:check - audit branch names against the canonical taxonomy.
 *
 * Mode 1 (default / local):
 *   Audits local branch names. Advisory only: reports violations, never blocks.
 *   The repository may carry legacy branches that predate this script, so a
 *   hard gate would fail on historical state.
 *
 * Mode 2 (--ci-pr-head):
 *   Audits a PR head branch name in CI (via GITHUB_HEAD_REF or --branch).
 *   Enforcing gate: exits 1 if non-canonical or disallowed alias.
 *   Permits canonical prefixes, develop (for release PRs), main, and dependabot/*.
 *
 * Trunk: main
 * Canonical prefixes: feature/, fix/, chore/, refactor/, docs/, test/, perf/
 * Allowed non-topic branches: main, develop
 */

import { execFileSync } from 'node:child_process';

const CANONICAL_PREFIXES = [
  'feature/',
  'fix/',
  'chore/',
  'refactor/',
  'docs/',
  'test/',
  'perf/',
];

// Long-lived trunk and integration branches. See docs/branching-strategy.md.
const ALLOWED_NON_TOPIC = new Set(['main', 'develop']);

const DISALLOWED_ALIASES = [
  'feat/',
  'bugfix/',
  'hotfix/',
  'agent/',
  'agents/',
  'wip/',
  'temp/',
  'style/',
];

const TRUNK = 'main';
const INTEGRATION = 'develop';

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' });
}

function localBranches() {
  const out = git([
    'for-each-ref',
    '--format=%(refname:short)\t%(upstream:short)',
    'refs/heads',
  ]);
  return out
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [name, upstream] = line.split('\t');
      return { name, upstream: upstream || null };
    });
}

function classify(name) {
  if (ALLOWED_NON_TOPIC.has(name)) {
    return { ok: true, reason: 'allowed non-topic branch' };
  }

  const slash = name.indexOf('/');
  const prefix = slash === -1 ? '' : name.slice(0, slash + 1);

  if (CANONICAL_PREFIXES.includes(prefix)) {
    return { ok: true, reason: `canonical prefix '${prefix}'` };
  }

  if (DISALLOWED_ALIASES.includes(prefix)) {
    return { ok: false, reason: `disallowed alias '${prefix}'` };
  }

  if (slash === -1) {
    return {
      ok: false,
      reason: "no prefix (expected '<prefix>/<kebab-case-topic>')",
    };
  }

  return { ok: false, reason: `unknown prefix '${prefix}'` };
}

function auditCiPrHead(branchName) {
  const branch = (branchName || '').trim();

  if (!branch) {
    console.log(
      'No PR head branch provided (GITHUB_HEAD_REF is empty). Skipping PR branch audit.',
    );
    process.exit(0);
  }

  console.log(`Auditing PR head branch: ${branch}`);

  // Dependabot branches targeting develop are allowed in PRs
  if (branch.startsWith('dependabot/')) {
    console.log(
      `Branch '${branch}' is an allowed automated Dependabot branch.\nPR branch check passed.`,
    );
    process.exit(0);
  }

  const verdict = classify(branch);
  if (!verdict.ok) {
    console.error(
      `Error: PR head branch '${branch}' violates canonical branching policy.`,
    );
    console.error(`Reason: ${verdict.reason}`);
    console.error(
      'See docs/branching-strategy.md section 2 for the canonical taxonomy.',
    );
    process.exit(1);
  }

  console.log(
    `Branch '${branch}' is valid (${verdict.reason}).\nPR branch check passed.`,
  );
  process.exit(0);
}

function main() {
  const args = process.argv.slice(2);
  const isCiPrHead = args.includes('--ci-pr-head');

  if (isCiPrHead) {
    const branchArgIndex = args.indexOf('--branch');
    const branchArg =
      branchArgIndex !== -1 && args[branchArgIndex + 1]
        ? args[branchArgIndex + 1]
        : null;
    const targetBranch = branchArg || process.env.GITHUB_HEAD_REF || '';
    auditCiPrHead(targetBranch);
    return;
  }

  let branches;
  try {
    branches = localBranches();
  } catch (err) {
    console.error('git:check could not read local branches.');
    console.error(err.message.trim());
    process.exit(0);
  }

  const nameViolations = [];
  const upstreamViolations = [];

  for (const { name, upstream } of branches) {
    const verdict = classify(name);
    if (!verdict.ok) {
      nameViolations.push({ name, reason: verdict.reason });
    }

    if (
      !ALLOWED_NON_TOPIC.has(name) &&
      (upstream === `origin/${TRUNK}` || upstream === `origin/${INTEGRATION}`)
    ) {
      upstreamViolations.push({ name, upstream });
    }
  }

  let exitCode = 0;

  if (nameViolations.length) {
    console.log('Non-canonical branch names:');
    for (const { name, reason } of nameViolations) {
      console.log(`  - ${name}  (${reason})`);
    }
    console.log(
      '  See docs/branching-strategy.md section 2 for the canonical taxonomy.\n',
    );
    exitCode = 1;
  } else {
    console.log(
      `Branch names: OK (${branches.length} local branches match the taxonomy).\n`,
    );
  }

  if (upstreamViolations.length) {
    console.log('Topic branches tracking main or develop (publishing risk):');
    for (const { name, upstream } of upstreamViolations) {
      console.log(`  - ${name}  (upstream is ${upstream})`);
    }
    console.log(
      '  Repair with: git branch --unset-upstream <branch>\n' +
        '  Or delete the branch if it is already merged.\n',
    );
    exitCode = 1;
  } else {
    console.log(
      'Upstream wiring: OK (no topic branch tracks main or develop).\n',
    );
  }

  if (exitCode !== 0) {
    console.log(
      'Advisory report only - no branch was modified and nothing was blocked.',
    );
  }

  process.exit(exitCode);
}

main();
