#!/usr/bin/env node

// Advisory accuracy gate for blog articles. For each slug it checks EN/PT parity
// of external citations and headings, and flags numeric or currency claims that
// have no link in the same paragraph. With --links it also checks every external
// link for liveness over the network. Always exits 0: it is a review aid that
// surfaces things to verify by hand, not a hard gate.
//
// usage: node .cursor/skills/blog-content-pipeline/scripts/accuracy-check.mjs [--links] <file-or-slug...>

import { readFileSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

function stripFrontmatter(md) {
  if (!md.startsWith('---')) return md;
  const close = md.indexOf('\n---', 3);
  if (close === -1) return md;
  const newlineAfter = md.indexOf('\n', close + 1);
  return newlineAfter === -1 ? '' : md.slice(newlineAfter + 1);
}

function extractLinks(md) {
  return [...md.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);
}

function extractHeadings(md) {
  return md
    .split('\n')
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => line.replace(/^#+\s*/, '').trim());
}

function domainsOf(urls) {
  return urls
    .map((url) => {
      try {
        return new URL(url).hostname.replace(/^www\./, '');
      } catch {
        return url;
      }
    })
    .sort();
}

function paragraphs(md) {
  return stripFrontmatter(md)
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !block.startsWith('#') && !block.startsWith('```'));
}

const CLAIM = /(?:€|\$)\s?\d|\d[\d.,]*\s?(?:%|percent|per cent|€|\$)/i;

function findUnsourcedClaims(md) {
  return paragraphs(md)
    .filter((block) => CLAIM.test(block) && !/\]\(https?:/.test(block))
    .map((block) => block.replace(/\s+/g, ' ').slice(0, 90));
}

async function liveness(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });
    if (res.status === 405 || res.status >= 400) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
    }
    return { url, status: res.status, ok: res.ok };
  } catch (error) {
    return { url, status: 0, ok: false, error: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function checkSlug(slug, { checkLinks }) {
  const enPath = `content/blog/en/${slug}.md`;
  const ptPath = `content/blog/pt/${slug}.md`;
  console.log(`\n${slug}`);

  const enExists = existsSync(enPath);
  const ptExists = existsSync(ptPath);
  if (!enExists || !ptExists) {
    console.log(
      `  ! missing locale: en=${enExists ? 'yes' : 'no'} pt=${ptExists ? 'yes' : 'no'}`,
    );
  }

  const en = enExists ? readFileSync(enPath, 'utf8') : '';
  const pt = ptExists ? readFileSync(ptPath, 'utf8') : '';

  if (enExists && ptExists) {
    const enDomains = domainsOf(extractLinks(en));
    const ptDomains = domainsOf(extractLinks(pt));
    if (enDomains.join('|') !== ptDomains.join('|')) {
      console.log('  ! citation domains differ between locales');
      console.log(`      en: ${enDomains.join(', ') || '(none)'}`);
      console.log(`      pt: ${ptDomains.join(', ') || '(none)'}`);
    }

    const enHeadings = extractHeadings(en).length;
    const ptHeadings = extractHeadings(pt).length;
    if (enHeadings !== ptHeadings) {
      console.log(`  ! heading count differs: en=${enHeadings} pt=${ptHeadings}`);
    }
  }

  for (const [locale, md] of [
    ['en', en],
    ['pt', pt],
  ]) {
    for (const claim of findUnsourcedClaims(md)) {
      console.log(`  ~ ${locale} numeric claim without a link: ${claim}`);
    }
  }

  if (checkLinks) {
    const urls = [...new Set([...extractLinks(en), ...extractLinks(pt)])];
    const results = await Promise.all(urls.map(liveness));
    for (const result of results.filter((r) => !r.ok)) {
      console.log(
        `  ! dead or unreachable link (${result.status || result.error}): ${result.url}`,
      );
    }
  }
}

const args = process.argv.slice(2);
const checkLinks = args.includes('--links');
const inputs = args.filter((arg) => arg !== '--links');

if (inputs.length === 0) {
  console.error(
    'usage: node .cursor/skills/blog-content-pipeline/scripts/accuracy-check.mjs [--links] <file-or-slug...>',
  );
  process.exit(1);
}

const slugs = [...new Set(inputs.map((input) => basename(input).replace(/\.md$/, '')))];

for (const slug of slugs) {
  await checkSlug(slug, { checkLinks });
}

console.log(
  '\nAccuracy check complete (advisory). `!` = verify now, `~` = confirm the number has a source.',
);
