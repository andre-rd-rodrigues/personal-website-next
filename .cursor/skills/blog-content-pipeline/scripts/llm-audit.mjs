#!/usr/bin/env node

// Prep tool for the LLM audit (advisory). It extracts the material needed to
// judge the two things regex cannot: (1) semantic emptiness of each paragraph,
// and (2) whether each cited source actually supports its claim. It does NOT
// judge; it lists the units to review and prints the rubric. The agent then
// reads each paragraph for emptiness, fetches each URL, and confirms support by
// quoting the supporting sentence from the source. Always exits 0.
//
// usage: node .cursor/skills/blog-content-pipeline/scripts/llm-audit.mjs <file...>

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

function stripFrontmatter(md) {
  if (!md.startsWith('---')) return md;
  const close = md.indexOf('\n---', 3);
  if (close === -1) return md;
  const newlineAfter = md.indexOf('\n', close + 1);
  return newlineAfter === -1 ? '' : md.slice(newlineAfter + 1);
}

function sentences(text) {
  return text
    .replace(/\n/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú"“(])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function strip(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function audit(path) {
  const md = readFileSync(path, 'utf8');
  const body = stripFrontmatter(md);
  const lines = body.split('\n');

  const paragraphs = [];
  const claims = [];
  const quotes = [];
  let heading = '(intro)';
  let inFence = false;
  let buffer = [];

  const flush = () => {
    if (buffer.length === 0) return;
    const block = buffer.join(' ').trim();
    buffer = [];
    if (!block || /^[-*+]|^\d+\.|^>/.test(block)) return;
    paragraphs.push({ heading, preview: strip(block).slice(0, 100) });
    for (const sentence of sentences(block)) {
      if (/\]\(https?:\/\//.test(sentence)) {
        const url = sentence.match(/\]\((https?:\/\/[^)\s]+)\)/)?.[1];
        claims.push({ heading, url, text: strip(sentence).slice(0, 160) });
      }
      for (const quote of sentence.match(/[""][^""]{8,}[""]|"[^"\n]{8,}"/g) || []) {
        quotes.push({ heading, quote: quote.trim() });
      }
    }
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^#{1,3}\s/.test(line)) {
      flush();
      heading = line.replace(/^#+\s*/, '').trim();
      continue;
    }
    if (line.trim() === '') {
      flush();
      continue;
    }
    buffer.push(line.trim());
  }
  flush();

  console.log(`\n=== ${basename(path)} ===`);

  console.log(`\nPARAGRAPHS (emptiness review) — ${paragraphs.length}:`);
  paragraphs.forEach((item, index) => {
    console.log(`  [${index + 1}] (${item.heading}) ${item.preview}`);
  });

  console.log(`\nCLAIMS WITH SOURCES (support review) — ${claims.length}:`);
  claims.forEach((item, index) => {
    console.log(`  [${index + 1}] ${item.url}`);
    console.log(`      claim: ${item.text}`);
  });

  if (quotes.length > 0) {
    console.log(`\nQUOTED SPANS (fidelity review) — ${quotes.length}:`);
    quotes.forEach((item, index) => {
      console.log(`  [${index + 1}] (${item.heading}) ${item.quote}`);
    });
  }
}

const paths = process.argv.slice(2);
if (paths.length === 0) {
  console.error(
    'usage: node .cursor/skills/blog-content-pipeline/scripts/llm-audit.mjs <file...>',
  );
  process.exit(1);
}

for (const path of paths) {
  try {
    audit(path);
  } catch (error) {
    console.error(`\n${path}: ${error.message}`);
  }
}

console.log(
  [
    '',
    'RUBRIC (judge manually, do not trust regex):',
    '  Emptiness  — for each paragraph: does it give information the reader could',
    '               not infer from its heading and the previous paragraph? If no,',
    '               mark it for the deletion-only pruning pass.',
    '  Support    — for each claim, fetch the URL and confirm it states the claim.',
    '               Record yes / partial / no and quote the supporting sentence.',
    '               Rewrite or drop any claim the source does not support.',
    '  Fidelity   — each quoted span must appear verbatim in its cited source.',
    '',
  ].join('\n'),
);
