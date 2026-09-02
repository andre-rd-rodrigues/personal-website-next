#!/usr/bin/env node

// Advisory coverage check for the strict prose gate. Warns when an article dated
// on or after RULES_EFFECTIVE_DATE is not listed in scripts/strict-articles.txt,
// so new articles cannot silently skip the HARD-category gate by omission.
// Always exits 0: it is a reminder, not a hard failure (the parallel backlog of
// pre-rule articles would otherwise break CI).
//
// usage: node .cursor/skills/blog-content-pipeline/scripts/strict-coverage.mjs

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const RULES_EFFECTIVE_DATE = '2026-09-02';
const EN_DIR = 'content/blog/en';
const ALLOWLIST =
  '.cursor/skills/blog-content-pipeline/scripts/strict-articles.txt';

function frontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    const pair = line.match(/^(\w+):\s*(.*)$/);
    if (pair) data[pair[1]] = pair[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return data;
}

function allowlistSlugs() {
  if (!existsSync(ALLOWLIST)) return new Set();
  return new Set(
    readFileSync(ALLOWLIST, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#')),
  );
}

const covered = allowlistSlugs();
const uncovered = [];

for (const file of readdirSync(EN_DIR).filter((name) => name.endsWith('.md'))) {
  const data = frontmatter(readFileSync(path.join(EN_DIR, file), 'utf8'));
  const slug = data.slug || file.replace(/\.md$/, '');
  const date = data.publishedDate || '';
  if (date >= RULES_EFFECTIVE_DATE && !covered.has(slug)) {
    uncovered.push({ slug, date });
  }
}

if (uncovered.length === 0) {
  console.log(
    `All articles dated >= ${RULES_EFFECTIVE_DATE} are covered by the strict prose gate.`,
  );
} else {
  console.log(
    `\n${uncovered.length} new article(s) NOT covered by the strict prose gate (dated >= ${RULES_EFFECTIVE_DATE}):`,
  );
  for (const article of uncovered.sort((a, b) => a.slug.localeCompare(b.slug))) {
    console.log(`  ! ${article.slug} (${article.date})`);
  }
  console.log(
    `\nClean each in Phase 3, then add its slug to ${ALLOWLIST} so \`pnpm test\` enforces it.`,
  );
}
