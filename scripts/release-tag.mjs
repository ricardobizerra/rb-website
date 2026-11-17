#!/usr/bin/env node
/**
 * scripts/release-tag.mjs - Automated tag creation and GitHub Release publisher.
 *
 * Usage:
 *   node scripts/release-tag.mjs [--dry-run] [--tag <vX.Y.Z>]
 *
 * Behavior:
 *   1. Reads version from package.json (or --tag override) and normalizes to 'vX.Y.Z'.
 *   2. Checks if tag already exists on remote origin (via git ls-remote).
 *   3. If exists, exits 0 cleanly (idempotent / safe no-op).
 *   4. If not exists:
 *      - In --dry-run mode: prints planned operations and exits 0.
 *      - Otherwise: creates annotated git tag, pushes tag to origin, and publishes
 *        a GitHub Release using PR_BODY (if non-empty) + GitHub generated release notes.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SEMVER_TAG_REGEX = /^v\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const tagIndex = args.indexOf('--tag');
  const explicitTag =
    tagIndex !== -1 && args[tagIndex + 1] ? args[tagIndex + 1] : null;

  return { dryRun, explicitTag };
}

function resolveTag(explicitTag) {
  if (explicitTag) {
    const normalized = explicitTag.startsWith('v')
      ? explicitTag
      : `v${explicitTag}`;
    return normalized;
  }

  const pkgPath = join(ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

  if (!pkg.version) {
    throw new Error('package.json does not contain a "version" field.');
  }

  return pkg.version.startsWith('v') ? pkg.version : `v${pkg.version}`;
}

function tagExistsOnOrigin(tag) {
  try {
    const stdout = execFileSync(
      'git',
      ['ls-remote', '--tags', 'origin', `refs/tags/${tag}`],
      { encoding: 'utf8' },
    );
    return stdout.trim().length > 0;
  } catch (err) {
    console.warn(
      `Warning: could not inspect remote tags on origin (${err.message.trim()}). Assuming tag does not exist.`,
    );
    return false;
  }
}

function main() {
  const { dryRun, explicitTag } = parseArgs();
  const tag = resolveTag(explicitTag);

  if (!SEMVER_TAG_REGEX.test(tag)) {
    console.error(
      `Error: tag '${tag}' is not a valid semantic version tag (expected vX.Y.Z).`,
    );
    process.exit(1);
  }

  console.log(`Checking release status for tag '${tag}'...`);

  if (tagExistsOnOrigin(tag)) {
    console.log(
      `Tag '${tag}' already exists on remote origin. Release already published. Safe no-op.`,
    );
    process.exit(0);
  }

  if (dryRun) {
    console.log(`[DRY-RUN] Tag '${tag}' does not exist on origin.`);
    console.log(
      `[DRY-RUN] Would create annotated git tag: git tag -a ${tag} -m "Release ${tag}"`,
    );
    console.log(`[DRY-RUN] Would push tag to origin: git push origin ${tag}`);
    console.log(
      `[DRY-RUN] Would publish GitHub Release for '${tag}' via gh release create.`,
    );
    process.exit(0);
  }

  console.log(`Creating annotated git tag '${tag}'...`);
  execFileSync('git', ['tag', '-a', tag, '-m', `Release ${tag}`], {
    stdio: 'inherit',
  });

  console.log(`Pushing tag '${tag}' to origin...`);
  execFileSync('git', ['push', 'origin', tag], { stdio: 'inherit' });

  let tempFile = null;
  try {
    const prBody = (process.env.PR_BODY || '').trim();
    const ghArgs = ['release', 'create', tag, '--verify-tag', '--title', tag];

    if (prBody) {
      tempFile = join(tmpdir(), `release-notes-${Date.now()}.md`);
      writeFileSync(tempFile, prBody, 'utf8');
      ghArgs.push('--notes-file', tempFile, '--generate-notes');
    } else {
      ghArgs.push('--generate-notes');
    }

    console.log(`Publishing GitHub Release for '${tag}'...`);
    execFileSync('gh', ghArgs, { stdio: 'inherit' });
    console.log(`Successfully published GitHub Release for '${tag}'.`);
  } catch (err) {
    console.error(
      `Failed to publish GitHub Release for '${tag}':`,
      err.message,
    );
    process.exit(1);
  } finally {
    if (tempFile && existsSync(tempFile)) {
      try {
        unlinkSync(tempFile);
      } catch {
        // ignore cleanup error
      }
    }
  }
}

main();
