import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ALLOWLIST = path.join(
  ROOT,
  '.cursor/skills/blog-content-pipeline/scripts/strict-articles.txt',
);
const SCRIPT = path.join(
  ROOT,
  '.cursor/skills/blog-content-pipeline/scripts/prose-check.mjs',
);

function readAllowlistSlugs(): string[] {
  if (!fs.existsSync(ALLOWLIST)) return [];

  return fs
    .readFileSync(ALLOWLIST, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
}

describe('prose strict gate (new articles)', () => {
  const slugs = readAllowlistSlugs();

  if (slugs.length === 0) {
    it('allowlist is empty, nothing to enforce', () => {
      expect(slugs).toEqual([]);
    });
  } else {
    it.each(slugs)('%s passes prose-check --strict in both locales', (slug) => {
      const files = ['en', 'pt']
        .map((locale) => path.join('content', 'blog', locale, `${slug}.md`))
        .filter((file) => fs.existsSync(path.join(ROOT, file)));

      expect(files).toHaveLength(2);

      try {
        execFileSync('node', [SCRIPT, '--strict', ...files], {
          cwd: ROOT,
          stdio: 'pipe',
        });
      } catch (error) {
        const err = error as { stdout?: Buffer; stderr?: Buffer };
        const output = `${err.stdout?.toString() ?? ''}${err.stderr?.toString() ?? ''}`;
        throw new Error(
          `prose-check --strict failed for "${slug}" (hard-category findings):\n${output}`,
        );
      }
    });
  }
});
