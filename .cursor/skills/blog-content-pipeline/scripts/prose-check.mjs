#!/usr/bin/env node

// Advisory prose check for blog drafts. Reports formulaic-writing patterns with
// line numbers and always exits 0 -- see EDITORIAL-REVISION.md for the rules.
// Intentionally not wired into `pnpm test`: published articles predate these rules.

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const BANNED_CONSTRUCTIONS = [
  { label: 'false contrast', pattern: /\bis not (?:a|the|just|only|simply|automatically)\b/gi },
  { label: 'false contrast', pattern: /\bnot just\b/gi },
  { label: 'false contrast', pattern: /\bnot only\b[^.]*\bbut\b/gi },
  { label: 'false contrast', pattern: /\bThe (?:useful|important|stronger|real) (?:question|case|approach|point) is not\b/gi },
  { label: 'false contrast', pattern: /\bnot because\b/gi },
  { label: 'filler transition', pattern: /\bIn today's\b/gi },
  { label: 'filler transition', pattern: /\bLet's dive in\b/gi },
  { label: 'filler transition', pattern: /\bThe good news is\b/gi },
  { label: 'filler transition', pattern: /(?:^|[.!?]\s|\n)That said\b/g },
  { label: 'filler transition', pattern: /\bAt the end of the day\b/gi },
  { label: 'filler transition', pattern: /\bfrom start to finish\b/gi },
  { label: 'filler transition', pattern: /\bit is worth noting\b/gi },
  { label: 'filler transition', pattern: /\bIn other words\b/gi },
  { label: 'scare quotes', pattern: /["“][^"”\n]{2,30}["”]/g },
  { label: 'PT filler', pattern: /\bÉ importante notar que\b/gi },
  { label: 'PT filler', pattern: /\bNo mundo de hoje\b/gi },
  { label: 'PT filler', pattern: /\bdo início ao fim\b/gi },
  { label: 'PT filler', pattern: /(?:^|[.!?]\s|\n)Além disso\b/g },
];

const ATTRIBUTION_CLOSER =
  /\b(?:explains|explain|documented in|describes|confirms|guidance|overview|clarification|reference|outlines)\b[^.]*\]\(https?:/i;

const SUMMARY_CLOSER =
  /^(?:In short|In summary|Overall|Ultimately|The (?:point|takeaway|lesson) (?:is|here)|This is why|That is why|Treat (?:it|this) as)\b/i;

const MIN_SENTENCES_FOR_CADENCE = 3;
const MIN_SENTENCE_LENGTH_SPREAD = 8;

function parseBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  let current = null;
  let inFrontmatter = false;
  let inCodeFence = false;

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (index === 0 && line.trim() === '---') {
      inFrontmatter = true;
      return;
    }
    if (inFrontmatter) {
      if (line.trim() === '---') inFrontmatter = false;
      return;
    }
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      return;
    }
    if (inCodeFence) return;

    if (line.trim() === '') {
      current = null;
      return;
    }

    if (!current) {
      current = { startLine: lineNumber, text: line };
      blocks.push(current);
      return;
    }
    current.text += `\n${line}`;
  });

  return blocks.map((block) => ({ ...block, kind: classify(block.text) }));
}

function classify(text) {
  const firstLine = text.split('\n')[0].trim();
  if (firstLine.startsWith('#')) return 'heading';
  if (/^(?:[-*+]|\d+\.)\s/.test(firstLine)) return 'list';
  if (firstLine.startsWith('>')) return 'quote';
  if (firstLine.startsWith('|')) return 'table';
  if (/^(?:---|___|\*\*\*)$/.test(firstLine)) return 'rule';
  return 'paragraph';
}

function headingLevel(text) {
  return text.match(/^(#+)/)?.[1].length ?? 0;
}

function splitSentences(text) {
  return text
    .replace(/\n/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú"“(])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countWords(sentence) {
  return sentence.replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
    .length;
}

function stripInlineMarkup(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

function findBannedConstructions(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind === 'heading' || block.kind === 'rule') continue;

    const blockLines = block.text.split('\n');

    blockLines.forEach((line, offset) => {
      for (const { label, pattern } of BANNED_CONSTRUCTIONS) {
        const matches = line.matchAll(new RegExp(pattern.source, pattern.flags));
        for (const match of matches) {
          findings.push({
            line: block.startLine + offset,
            label,
            detail: match[0].trim().replace(/\s+/g, ' '),
          });
        }
      }
    });
  }

  return findings;
}

function findSectionClosers(blocks) {
  const findings = [];
  let lastContentBlock = null;

  const flush = () => {
    if (!lastContentBlock || lastContentBlock.kind !== 'paragraph') return;

    const sentences = splitSentences(lastContentBlock.text);
    const closer = sentences.at(-1);
    if (!closer) return;

    const bare = stripInlineMarkup(closer);

    if (ATTRIBUTION_CLOSER.test(closer)) {
      findings.push({
        line: lastContentBlock.startLine,
        label: 'section ends on source attribution',
        detail: bare.slice(0, 90),
      });
      return;
    }
    if (SUMMARY_CLOSER.test(bare)) {
      findings.push({
        line: lastContentBlock.startLine,
        label: 'section ends on summary-only sentence',
        detail: bare.slice(0, 90),
      });
    }
  };

  for (const block of blocks) {
    if (block.kind === 'heading' && headingLevel(block.text) <= 3) {
      flush();
      lastContentBlock = null;
      continue;
    }
    if (block.kind === 'rule') continue;
    lastContentBlock = block;
  }
  flush();

  return findings;
}

function findCadenceIssues(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;

    const sentences = splitSentences(block.text);
    if (sentences.length < MIN_SENTENCES_FOR_CADENCE) continue;

    const lengths = sentences.map((sentence) =>
      countWords(stripInlineMarkup(sentence)),
    );
    const spread = Math.max(...lengths) - Math.min(...lengths);

    if (spread < MIN_SENTENCE_LENGTH_SPREAD) {
      findings.push({
        line: block.startLine,
        label: 'uniform sentence length',
        detail: `spread ${spread} words (counts: ${lengths.join(', ')})`,
      });
    }
  }

  return findings;
}

function findRepeatedCitations(blocks) {
  const byDomain = new Map();

  for (const block of blocks) {
    if (block.kind === 'heading' || block.kind === 'rule') continue;
    if (/^##\s+(?:Sources|Fontes)\b/i.test(block.text)) continue;

    const blockLines = block.text.split('\n');

    blockLines.forEach((line, offset) => {
      const links = line.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g);
      for (const [, url] of links) {
        let domain;
        try {
          domain = new URL(url).hostname.replace(/^www\./, '');
        } catch {
          continue;
        }
        if (!byDomain.has(domain)) byDomain.set(domain, []);
        byDomain.get(domain).push(block.startLine + offset);
      }
    });
  }

  return [...byDomain.entries()]
    .filter(([, lines]) => lines.length > 1)
    .map(([domain, lines]) => ({
      line: lines[0],
      label: 'repeated inline citation',
      detail: `${domain} cited ${lines.length}x (lines ${lines.join(', ')}) - move extras to Sources`,
    }));
}

function checkFile(path) {
  const source = readFileSync(path, 'utf8');
  const blocks = parseBlocks(source);

  const findings = [
    ...findBannedConstructions(blocks),
    ...findSectionClosers(blocks),
    ...findCadenceIssues(blocks),
    ...findRepeatedCitations(blocks),
  ].sort((a, b) => a.line - b.line);

  const words = blocks
    .filter((block) => block.kind !== 'heading' && block.kind !== 'rule')
    .reduce((total, block) => total + countWords(stripInlineMarkup(block.text)), 0);

  console.log(`\n${basename(path)} - ${words} words, ${findings.length} findings`);

  if (findings.length === 0) {
    console.log('  no formulaic patterns detected');
  } else {
    for (const { line, label, detail } of findings) {
      console.log(`  ${String(line).padStart(4)}  ${label}: ${detail}`);
    }
  }

  if (words < 800 || words > 1500) {
    console.log(`  note: word count ${words} is outside the 800-1500 target`);
  }

  return findings.length;
}

const paths = process.argv.slice(2);

if (paths.length === 0) {
  console.error(
    'usage: node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs <file...>',
  );
  process.exit(1);
}

let total = 0;
for (const path of paths) {
  try {
    total += checkFile(path);
  } catch (error) {
    console.error(`\n${path}: ${error.message}`);
  }
}

console.log(`\nTotal findings: ${total} (advisory - review, do not auto-apply)`);
