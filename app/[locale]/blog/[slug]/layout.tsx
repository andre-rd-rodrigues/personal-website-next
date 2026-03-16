import { ReactNode } from 'react';

import { Metadata, MetadataProps, getMetadata } from '@/metadata';
import { getPostBySlug } from '@/lib/blog';

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata | undefined> {
  const { locale, slug } = await params;
  const post = slug && locale ? await getPostBySlug(slug, locale) : null;
  return getMetadata({
    title: post?.title ?? 'Blog',
    description: post?.description ?? undefined,
    src: post?.coverPhoto?.url,
  });
}

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
