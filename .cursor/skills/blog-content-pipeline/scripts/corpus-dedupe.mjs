#!/usr/bin/env node

// Advisory cannibalization check. Compares one article against the rest of the
// English corpus using title/heading token overlap and body shingle similarity,
// then prints the closest existing articles and the headings they share. Use it
// in Phase 1 (before writing, against the working title) and Phase 7 (against the
// finished piece). Lexical only, so treat matches as "look here", not a verdict.
// Always exits 0.
//
// usage: node .cursor/skills/blog-content-pipeline/scripts/corpus-dedupe.mjs <slug-or-path>

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const EN_DIR = 'content/blog/en';
const SHINGLE_SIZE = 5;
const STOP = new Set(
  (
    'a an the and or of to for in on at with your you my me is are be it if how ' +
    'what why when do does this that these those as from by into out over under ' +
    'o a os as um uma uns umas de do da dos das e ou que para com por no na nos ' +
    'nas se sua seu suas seus como quando porque isto isso aquilo mais menos'
  ).split(' '),
);

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

function body(md) {
  return md.replace(/^---\n[\s\S]*?\n---/, '');
}

function headings(md) {
  return body(md)
    .split('\n')
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => line.replace(/^#+\s*/, '').trim());
}

function tokens(text) {
  return (text.toLowerCase().match(/\p{L}[\p{L}\p{N}]+/gu) || []).filter(
    (word) => word.length > 2 && !STOP.has(word),
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
}

function shingles(tokenList) {
  const set = new Set();
  for (let i = 0; i + SHINGLE_SIZE <= tokenList.length; i += 1) {
    set.add(tokenList.slice(i, i + SHINGLE_SIZE).join(' '));
  }
  return set;
}

const GENERIC_HEADINGS = new Set([
  'frequently asked questions',
  'sources',
  'fontes',
  'perguntas frequentes',
  'conclusion',
  'the takeaway',
  'conclusão',
  'em resumo',
]);

function profile(md) {
  const data = frontmatter(md);
  const headingList = headings(md).filter(
    (heading) => !GENERIC_HEADINGS.has(heading.toLowerCase()),
  );
  return {
    titleSet: new Set(tokens(data.title || '')),
    headingSet: new Set(tokens(headingList.join(' '))),
    bodySet: shingles(tokens(body(md).replace(/^#{1,3}\s.*$/gm, ''))),
    headings: headingList,
  };
}

const input = process.argv[2];
if (!input) {
  console.error(
    'usage: node .cursor/skills/blog-content-pipeline/scripts/corpus-dedupe.mjs <slug-or-path>',
  );
  process.exit(1);
}

const targetSlug = path.basename(input).replace(/\.md$/, '');
const targetPath = path.join(EN_DIR, `${targetSlug}.md`);
const target = profile(readFileSync(targetPath, 'utf8'));

const scored = [];
for (const file of readdirSync(EN_DIR).filter((name) => name.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  if (slug === targetSlug) continue;

  const other = profile(readFileSync(path.join(EN_DIR, file), 'utf8'));
  const titleScore = jaccard(target.titleSet, other.titleSet);
  const headingScore = jaccard(target.headingSet, other.headingSet);
  const bodyScore = jaccard(target.bodySet, other.bodySet);
  const combined = 0.55 * titleScore + 0.3 * headingScore + 0.15 * bodyScore;
  const sharedHeadings = other.headings.filter((heading) =>
    target.headings.some((own) => own.toLowerCase() === heading.toLowerCase()),
  );
  scored.push({
    slug,
    titleScore,
    headingScore,
    bodyScore,
    combined,
    sharedHeadings,
  });
}

scored.sort((a, b) => b.combined - a.combined);

console.log(`\nClosest existing articles to "${targetSlug}":`);
for (const match of scored.slice(0, 5)) {
  const pct = (value) => `${Math.round(value * 100)}%`;
  const flag = match.combined >= 0.25 ? '!' : ' ';
  console.log(
    `  ${flag} ${match.slug} — title ${pct(match.titleScore)}, headings ${pct(match.headingScore)}, body ${pct(match.bodyScore)}`,
  );
  if (match.sharedHeadings.length > 0) {
    console.log(`      shared headings: ${match.sharedHeadings.join(' | ')}`);
  }
}
console.log(
  '\nAdvisory: `!` marks likely overlap. Consolidate into the strongest URL or sharpen the angle.',
);
