import { ReactNode } from 'react';

import { Metadata, MetadataProps, getMetadata } from '@/metadata';
import { ARTICLE_QUERY, graphcms } from '@/api/graphQL/main';
import { Post } from '../page';

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  async function fetchData() {
    try {
      const data: { post?: Post } = await graphcms.request(ARTICLE_QUERY, {
        slug: slug!,
      });

      const post = data?.post;
      return await getMetadata({
        title: post?.title ?? 'Blog',
        description: post?.description ?? undefined,
        src: post?.coverPhoto?.url,
      });
    } catch (error: unknown) {
      console.error(error);
    }
  }

  return fetchData();
}

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
