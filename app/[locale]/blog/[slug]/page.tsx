import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, BLOG_LOCALES } from '@/lib/blog';
import type { Locale } from '@/locale.types';
import BlogPostClient from './BlogPostClient';

type BlogPostPageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of BLOG_LOCALES) {
    const posts = await getAllPosts(locale);
    for (const p of posts) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
