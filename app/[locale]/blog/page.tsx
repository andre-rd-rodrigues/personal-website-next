import { getAllPosts } from '@/lib/blog';
import type { Locale } from '@/locale.types';
import BlogListClient from './BlogListClient';

type BlogPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);
  return <BlogListClient posts={posts} />;
}
