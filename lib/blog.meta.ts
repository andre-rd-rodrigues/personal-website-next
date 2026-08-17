import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Locale } from '@/locale.types';

export type PostMeta = {
  slug: string;
  publishedDate: string;
};

export function getBlogDir(locale: Locale): string {
  return path.join(process.cwd(), 'content', 'blog', locale);
}

/**
 * Read only the frontmatter of every post for a locale.
 *
 * Kept free of the markdown pipeline so callers that just need slugs and dates
 * (the sitemap) neither pay to render HTML nor pull in ESM-only dependencies.
 */
export async function getAllPostsMeta(locale: Locale): Promise<PostMeta[]> {
  const blogDir = getBlogDir(locale);

  let entries: string[];
  try {
    entries = await fs.readdir(blogDir);
  } catch {
    return [];
  }

  const posts: PostMeta[] = [];

  for (const file of entries.filter((entry) => entry.endsWith('.md'))) {
    const raw = await fs.readFile(path.join(blogDir, file), 'utf-8');
    const { data } = matter(raw);

    posts.push({
      slug: data.slug ?? path.basename(file, '.md'),
      publishedDate: data.publishedDate,
    });
  }

  return posts;
}
