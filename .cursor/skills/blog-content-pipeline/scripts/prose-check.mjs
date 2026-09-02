#!/usr/bin/env node

// Prose check for blog drafts. Reports formulaic-writing patterns with line
// numbers -- see EDITORIAL-REVISION.md for the rules. Runs advisory by default
// (always exits 0). With --strict it exits 1 when any HARD-category finding
// remains, including the 1500-word ceiling for new articles (override with
// --max-words); SOFT categories stay advisory. Published articles predate these
// rules, so only opted-in files run --strict.

import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const BANNED_CONSTRUCTIONS = [
  { label: 'false contrast', pattern: /\bis not (?:a|the|just|only|simply|automatically)\b/gi },
  { label: 'false contrast', pattern: /\bnot just\b/gi },
  { label: 'false contrast', pattern: /\bnot only\b[^.]*\bbut\b/gi },
  { label: 'false contrast', pattern: /\bThe (?:useful|important|stronger|real) (?:question|case|approach|point) is not\b/gi },
  { label: 'false contrast', pattern: /\bnot because\b/gi },
  { label: 'authority posture', pattern: /\b(?:ask|asking) (?:the )?wrong (?:version of (?:this|the) )?question\b/gi },
  { label: 'authority posture', pattern: /\bthe (?:sharper|real|more important) question\b/gi },
  { label: 'authority posture', pattern: /\bthe honest answer\b/gi },
  { label: 'authority posture', pattern: /\ba pergunta errada\b/gi },
  { label: 'authority posture', pattern: /\ba pergunta mais (?:afiada|importante|útil)\b/gi },
  { label: 'authority posture', pattern: /\ba resposta honesta\b/gi },
  { label: 'formulaic case-study setup', pattern: /\b(?:two|these two) (?:cases|examples|projects)\b[^.]{0,60}\b(?:illustrate|show|make the point)\b/gi },
  { label: 'formulaic case-study setup', pattern: /\bdois (?:casos|exemplos|projetos)\b[^.]{0,60}\b(?:ilustram|mostram)\b/gi },
  { label: 'filler transition', pattern: /\bIn today's\b/gi },
  { label: 'filler transition', pattern: /\bLet's dive in\b/gi },
  { label: 'filler transition', pattern: /\bThe good news is\b/gi },
  { label: 'filler transition', pattern: /(?:^|[.!?]\s|\n)That said\b/g },
  { label: 'filler transition', pattern: /\bAt the end of the day\b/gi },
  { label: 'filler transition', pattern: /\bfrom start to finish\b/gi },
  { label: 'filler transition', pattern: /\bit is worth noting\b/gi },
  { label: 'filler transition', pattern: /\bIn other words\b/gi },
  { label: 'staged reveal', pattern: /\b(?:here is|here's) the part\b/gi },
  { label: 'staged reveal', pattern: /\bthis is where\b/gi },
  { label: 'staged reveal', pattern: /\b(?:aqui está|eis) a parte\b/gi },
  { label: 'filler transition', pattern: /\bto be fair\b/gi },
  { label: 'PT filler', pattern: /\bpara ser justo\b/gi },
  { label: 'scare quotes', pattern: /["“][^"”\n]{2,30}["”]/g },
  { label: 'PT filler', pattern: /\bÉ importante notar que\b/gi },
  { label: 'PT filler', pattern: /\bNo mundo de hoje\b/gi },
  { label: 'PT filler', pattern: /\bdo início ao fim\b/gi },
  { label: 'PT filler', pattern: /(?:^|[.!?]\s|\n)Além disso\b/g },
  { label: 'audience fan-out', pattern: /\bwhether you(?:'re| are) an?\b[^.\n]{0,50}\bor an?\b/gi },
  { label: 'audience fan-out', pattern: /\bno matter (?:if|whether)\b/gi },
  { label: 'audience fan-out', pattern: /\bquer seja\b[^.\n]{0,60}\bou\b/gi },
  { label: 'audience fan-out', pattern: /\bseja (?:um|uma)\b[^.\n]{0,50}\bou (?:um|uma)\b/gi },
  { label: 'throat-clearing', pattern: /\bin this (?:article|post|guide|piece)\b/gi },
  { label: 'throat-clearing', pattern: /\bby the end of this\b/gi },
  { label: 'throat-clearing', pattern: /\bwe(?:'ll| will) (?:explore|cover|look at|dive into|discuss|walk through)\b/gi },
  { label: 'throat-clearing', pattern: /\blet's take a look\b/gi },
  { label: 'throat-clearing', pattern: /\bneste (?:artigo|post|guia)\b/gi },
  { label: 'throat-clearing', pattern: /\bao longo deste (?:artigo|guia|post)\b/gi },
  { label: 'throat-clearing', pattern: /\bvamos (?:explorar|ver|analisar|abordar|falar sobre)\b/gi },
  { label: 'demonstrative closer', pattern: /\bthat(?:'s| is) the (?:real|whole|actual|entire|hard|hidden|quiet|true|only) [a-z]+\b/gi },
  { label: 'demonstrative closer', pattern: /\bé (?:este|esse|aquele|isto|isso) (?:o|a) (?:verdadeir[oa]|real|únic[oa]|maior) [a-zà-ú]+\b/gi },
  { label: 'colon reveal', pattern: /(?:^|[.!?]\s|\n)The (?:problem|result|point|catch|reality|truth|fix|takeaway|upshot|bottom line|kicker|twist):/g },
  { label: 'colon reveal', pattern: /(?:^|[.!?]\s|\n)(?:O|A) (?:problema|resultado|questão|verdade|solução|ponto):/g },
  { label: 'filler adverb', pattern: /\b(?:simply|essentially|basically|arguably|literally|fundamentally)\b/gi },
  { label: 'filler adverb', pattern: /\b(?:simplesmente|basicamente|essencialmente|efetivamente|fundamentalmente)\b/gi },
];

const ATTRIBUTION_CLOSER =
  /\b(?:explains|explain|documented in|describes|confirms|guidance|overview|clarification|reference|outlines)\b[^.]*\]\(https?:/i;

const SUMMARY_CLOSER =
  /^(?:In short|In summary|Overall|Ultimately|The (?:point|takeaway|lesson) (?:is|here)|This is why|That is why|Treat (?:it|this) as)\b/i;

const GENERIC_HEADING =
  /^#{2,3}\s+(?:The takeaway|In summary|Conclusion|Em resumo|Conclusão)\s*$/i;

const AUDIENCE_JARGON = [
  /\b(?:Next\.js|TypeScript|TailwindCSS?|HTML5|CSS3|JSON-LD)\b/g,
  /\b(?:Local Pack|schema markup|client-side bundle|server-rendered|front end)\b/gi,
  /\b(?:NAP|CTA|UX|stack)\b/g,
];

const SLOP_LEXICON = [
  /\b(?:leverage|leveraging|utilize|utilizing|delve|delving|realm|testament|underscore[sd]?|pivotal|seamless(?:ly)?|cutting-edge|game[- ]?chang(?:er|ing)|foster(?:ing|s)?|harness(?:ing|es)?|streamline[sd]?|elevate[sd]?|empower(?:ing|s)?|myriad|plethora|tapestry|bustling|ever-(?:evolving|changing))\b/gi,
  /\b(?:in the realm of|at the forefront|in today's fast-paced world|needless to say|it goes without saying)\b/gi,
  /\b(?:de ponta|sem esforço|mergulh(?:ar|o)|plétora|miríade|potenciar|impulsionar|revolucionar|transformador[ao]?|de forma transparente|sem falhas|num piscar de olhos)\b/gi,
  /\b(?:num mundo cada vez mais|quando se trata de|escusado será dizer)\b/gi,
];

const TRIAD_PATTERNS = [
  /\p{L}+(?:\s\p{L}+){0,2}, \p{L}+(?:\s\p{L}+){0,2},? and \p{L}+(?:\s\p{L}+){0,2}/giu,
  /\p{L}+(?:\s\p{L}+){0,2}, \p{L}+(?:\s\p{L}+){0,2},? e \p{L}+(?:\s\p{L}+){0,2}/giu,
];

const HARD_LABELS = new Set([
  'false contrast',
  'authority posture',
  'formulaic case-study setup',
  'filler transition',
  'staged reveal',
  'PT filler',
  'em-dash in prose',
  'audience fan-out',
  'throat-clearing',
  'generic heading',
  'word count exceeds maximum',
]);

const NEW_ARTICLE_MAX_WORDS = 1500;

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

function findGenericHeadings(blocks) {
  return blocks
    .filter(
      (block) =>
        block.kind === 'heading' && GENERIC_HEADING.test(block.text.trim()),
    )
    .map((block) => ({
      line: block.startLine,
      label: 'generic heading',
      detail: stripInlineMarkup(block.text).replace(/^#+\s*/, ''),
    }));
}

function findProseEmDashes(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;

    const blockLines = block.text.split('\n');
    blockLines.forEach((line, offset) => {
      for (const match of line.matchAll(/[^—\n]{0,18}—[^—\n]{0,18}/g)) {
        findings.push({
          line: block.startLine + offset,
          label: 'em-dash in prose',
          detail: match[0].trim().replace(/\s+/g, ' '),
        });
      }
    });
  }

  return findings;
}

function findSlopLexicon(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind === 'heading' || block.kind === 'rule') continue;

    const blockLines = block.text.split('\n');
    blockLines.forEach((line, offset) => {
      for (const pattern of SLOP_LEXICON) {
        for (const match of line.matchAll(
          new RegExp(pattern.source, pattern.flags),
        )) {
          findings.push({
            line: block.startLine + offset,
            label: 'slop lexicon',
            detail: match[0].trim(),
          });
        }
      }
    });
  }

  return findings;
}

function findTriads(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;

    const blockLines = block.text.split('\n');
    blockLines.forEach((line, offset) => {
      for (const pattern of TRIAD_PATTERNS) {
        for (const match of line.matchAll(
          new RegExp(pattern.source, pattern.flags),
        )) {
          findings.push({
            line: block.startLine + offset,
            label: 'triad (rule of three)',
            detail: match[0].trim().replace(/\s+/g, ' '),
          });
        }
      }
    });
  }

  return findings;
}

function findRhetoricalQuestions(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind !== 'paragraph') continue;

    const text = stripInlineMarkup(block.text).trim();
    const sentences = splitSentences(block.text);
    if (sentences.length === 1 && text.endsWith('?')) {
      findings.push({
        line: block.startLine,
        label: 'rhetorical question (standalone)',
        detail: text.slice(0, 80),
      });
    }
  }

  return findings;
}

function findAudienceJargon(blocks) {
  const findings = [];

  for (const block of blocks) {
    if (block.kind === 'heading' || block.kind === 'rule') continue;

    const blockLines = block.text.split('\n');
    blockLines.forEach((line, offset) => {
      for (const pattern of AUDIENCE_JARGON) {
        for (const match of line.matchAll(
          new RegExp(pattern.source, pattern.flags),
        )) {
          findings.push({
            line: block.startLine + offset,
            label: 'audience jargon check',
            detail: match[0],
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
  let inSources = false;

  for (const block of blocks) {
    if (block.kind === 'heading') {
      if (headingLevel(block.text) <= 2) {
        inSources = /^##\s+(?:Sources|Fontes)\b/i.test(block.text);
      }
      continue;
    }
    if (block.kind === 'rule' || inSources) continue;

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

function checkFile(path, { maxWords = null } = {}) {
  const source = readFileSync(path, 'utf8');
  const blocks = parseBlocks(source);

  const findings = [
    ...findBannedConstructions(blocks),
    ...findGenericHeadings(blocks),
    ...findProseEmDashes(blocks),
    ...findSlopLexicon(blocks),
    ...findTriads(blocks),
    ...findRhetoricalQuestions(blocks),
    ...findAudienceJargon(blocks),
    ...findSectionClosers(blocks),
    ...findCadenceIssues(blocks),
    ...findRepeatedCitations(blocks),
  ].sort((a, b) => a.line - b.line);

  const words = blocks
    .filter((block) => block.kind !== 'heading' && block.kind !== 'rule')
    .reduce((total, block) => total + countWords(stripInlineMarkup(block.text)), 0);

  if (maxWords !== null && words > maxWords) {
    findings.push({
      line: 1,
      label: 'word count exceeds maximum',
      detail: `${words} words (max ${maxWords})`,
    });
    findings.sort((a, b) => a.line - b.line);
  }

  console.log(`\n${basename(path)} - ${words} words, ${findings.length} findings`);

  if (findings.length === 0) {
    console.log('  no formulaic patterns detected');
  } else {
    for (const { line, label, detail } of findings) {
      const mark = HARD_LABELS.has(label) ? '!' : ' ';
      console.log(`  ${mark}${String(line).padStart(4)}  ${label}: ${detail}`);
    }
  }

  if (words < 800 || words > 1500) {
    console.log(`  note: word count ${words} is outside the 800-1500 target`);
  }

  return findings;
}

function countsByLabel(findings) {
  const counts = {};
  for (const finding of findings) {
    counts[finding.label] = (counts[finding.label] ?? 0) + 1;
  }
  return counts;
}

const rawArgs = process.argv.slice(2);
let strict = false;
let baselinePath = null;
let diffPath = null;
let maxWords = null;
const paths = [];
for (let i = 0; i < rawArgs.length; i += 1) {
  const arg = rawArgs[i];
  if (arg === '--strict') strict = true;
  else if (arg === '--baseline') baselinePath = rawArgs[(i += 1)];
  else if (arg === '--diff') diffPath = rawArgs[(i += 1)];
  else if (arg === '--max-words') maxWords = Number(rawArgs[(i += 1)]);
  else paths.push(arg);
}

if (paths.length === 0) {
  console.error(
    'usage: node .cursor/skills/blog-content-pipeline/scripts/prose-check.mjs [--strict] [--max-words <n>] [--baseline <path>] [--diff <path>] <file...>',
  );
  process.exit(1);
}

if (maxWords !== null && (!Number.isFinite(maxWords) || maxWords <= 0)) {
  console.error('--max-words must be a positive number');
  process.exit(1);
}

if (strict && maxWords === null) {
  maxWords = NEW_ARTICLE_MAX_WORDS;
}

const results = [];
for (const path of paths) {
  try {
    results.push({ key: path, findings: checkFile(path, { maxWords }) });
  } catch (error) {
    console.error(`\n${path}: ${error.message}`);
  }
}

if (baselinePath) {
  const baseline = {};
  for (const result of results) {
    baseline[result.key] = countsByLabel(result.findings);
  }
  writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
  console.log(`\nBaseline written to ${baselinePath} (${results.length} file(s)).`);
  process.exit(0);
}

if (diffPath) {
  const baseline = JSON.parse(readFileSync(diffPath, 'utf8'));
  let regressions = 0;
  for (const result of results) {
    const before = baseline[result.key] ?? {};
    const after = countsByLabel(result.findings);
    for (const label of Object.keys(after)) {
      const delta = after[label] - (before[label] ?? 0);
      if (delta > 0) {
        regressions += 1;
        console.log(
          `  regression in ${result.key}: ${label} +${delta} (was ${before[label] ?? 0}, now ${after[label]})`,
        );
      }
    }
  }
  console.log(
    `\nRegression check vs ${diffPath}: ${regressions === 0 ? 'PASS (no new patterns)' : `FAIL (${regressions} new)`}.`,
  );
  process.exit(regressions > 0 ? 1 : 0);
}

const total = results.reduce((sum, result) => sum + result.findings.length, 0);
const hardTotal = results.reduce(
  (sum, result) =>
    sum +
    result.findings.filter((finding) => HARD_LABELS.has(finding.label)).length,
  0,
);

if (strict) {
  console.log(
    `\nTotal findings: ${total} (${hardTotal} hard). Strict mode: ${hardTotal === 0 ? 'PASS' : 'FAIL'}.`,
  );
  process.exit(hardTotal > 0 ? 1 : 0);
}

console.log(
  `\nTotal findings: ${total} (advisory - review, do not auto-apply). Hard categories flagged with '!'.`,
);
