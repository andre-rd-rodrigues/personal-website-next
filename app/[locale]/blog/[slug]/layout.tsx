import { ReactNode } from 'react';

import { Metadata, MetadataProps, getMetadata } from '@/metadata';
import { ARTICLE_QUERY, graphcms } from '@/api/graphQL/main';
import { Post } from '../page';

export async function generateMetadata({
  params: { slug },
}: MetadataProps): Promise<Metadata | undefined> {
  async function fetchData() {
    try {
      const data: { post: Post } = await graphcms.request(ARTICLE_QUERY, {
        slug,
      });

      return getMetadata({
        title: data?.post.title,
        description: data?.post.description,
        src: data?.post.coverPhoto.url,
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
