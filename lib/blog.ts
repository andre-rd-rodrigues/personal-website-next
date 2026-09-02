import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Locale } from '@/locale.types';
import type { Post, PostSummary } from '@/types/blog';
import { getBlogDir } from './blog.meta';

type Frontmatter = {
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  isTopPick?: boolean;
  slug: string;
  coverImage: string;
  id?: string;
};

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

function frontmatterToPostSummary(
  frontmatter: Frontmatter,
  slugFromFile?: string,
): PostSummary {
  const slug = frontmatter.slug ?? slugFromFile ?? '';
  return {
    id: frontmatter.id ?? slug,
    title: frontmatter.title,
    category: frontmatter.category,
    publishedDate: frontmatter.publishedDate,
    description: frontmatter.description,
    isTopPick: frontmatter.isTopPick ?? false,
    slug,
    coverPhoto: { url: frontmatter.coverImage },
  };
}

function frontmatterToPost(
  frontmatter: Frontmatter,
  html: string,
  slugFromFile?: string,
): Post {
  return {
    ...frontmatterToPostSummary(frontmatter, slugFromFile),
    content: { html },
  };
}

function sortPosts<T extends PostSummary>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    if (a.isTopPick && !b.isTopPick) return -1;
    if (!a.isTopPick && b.isTopPick) return 1;
    return (
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  });
}

export async function getAllPostSummaries(
  locale: Locale,
): Promise<PostSummary[]> {
  const blogDir = getBlogDir(locale);
  let entries: string[];
  try {
    entries = await fs.readdir(blogDir);
  } catch {
    return [];
  }

  const posts: PostSummary[] = [];

  for (const file of entries.filter((entry) => entry.endsWith('.md'))) {
    const slugFromFile = path.basename(file, '.md');
    const raw = await fs.readFile(path.join(blogDir, file), 'utf-8');
    const { data } = matter(raw);
    posts.push(frontmatterToPostSummary(data as Frontmatter, slugFromFile));
  }

  return sortPosts(posts);
}

export async function getAllPosts(locale: Locale): Promise<Post[]> {
  const blogDir = getBlogDir(locale);
  let entries: string[];
  try {
    entries = await fs.readdir(blogDir);
  } catch {
    return [];
  }

  const mdFiles = entries.filter((e) => e.endsWith('.md'));
  const posts: Post[] = [];

  for (const file of mdFiles) {
    const slugFromFile = path.basename(file, '.md');
    const filePath = path.join(blogDir, file);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as Frontmatter;
    const html = await markdownToHtml(content.trim());
    posts.push(frontmatterToPost(frontmatter, html, slugFromFile));
  }

  return sortPosts(posts);
}

export async function getPostBySlug(
  slug: string,
  locale: Locale,
): Promise<Post | null> {
  const posts = await getAllPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export const BLOG_LOCALES: Locale[] = ['en', 'pt'];
