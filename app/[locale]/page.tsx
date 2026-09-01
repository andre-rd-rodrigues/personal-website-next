import HomeClient from './HomeClient';
import { getAllPosts } from '@/lib/blog';
import type { Locale } from '@/locale.types';
import { getLatestPosts } from '@/utils/post.utils';

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  return <HomeClient posts={getLatestPosts(posts)} />;
}
