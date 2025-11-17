'use client';
import { ARTICLE_QUERY } from '@/api/graphQL/main';
import styles from '@/assets/styles/pages/blog.module.scss';
import Container from '@/components/Container';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ICONS from '@/constants/icons.constants';
import useFetch from '@/hooks/useFetch';
import { useRouter } from '@/navigation';
import { Icon } from '@iconify/react';
import { NextPage } from 'next';
import Image from 'next/image';
import parser from 'react-html-parser';
import { Post } from '../page';
import { motion } from 'framer-motion';
import { fadeInVariant } from '@/motion/motionVariants';
import ErrorGeneric from '@/components/ErrorGeneric';
import { IMAGE_DATA_BLUR_URL } from '@/constants/common.constants';
import { useEffect, useState } from 'react';
import { injectHeaderIds } from '@/utils/post.utils';
import ContentNavigator from '@/components/ContentNavigator';

type PostsData = {
  posts: Post[];
};

type BlogPostParams = {
  slug: string;
};

type BlogPostProps = {
  params: BlogPostParams;
};

export type Heading = { text: string | null; id: string };

const BlogPost: NextPage<BlogPostProps> = ({ params }) => {
  const [enhancedPost, setEnhancedPost] = useState<{
    html?: string;
    headings: Heading[];
  }>({
    html: undefined,
    headings: [],
  });

  const { data, loading, error } = useFetch<PostsData>(ARTICLE_QUERY, {
    slug: params.slug,
  });
  const post = data?.posts?.[0];

  const { title, publishedDate, content, coverPhoto, category } = post || {};

  const router = useRouter();

  useEffect(() => {
    if (post?.content?.html) {
      const { html, headings } = injectHeaderIds(content?.html);
      setEnhancedPost({ html, headings, ...post });
    }
  }, [post, content]);

  return (
    <Container>
      {loading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="flex min-h-[60vh] items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <p className="text-white/60">Loading article...</p>
          </div>
        </motion.div>
      )}
      {(error || (!loading && !post)) && (
        <div className="flex h-[100vh] items-center justify-center">
          <ErrorGeneric />
        </div>
      )}
      {!loading && enhancedPost?.html && (
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          className={styles.container}
        >
          <TracingBeam>
            <Icon
              icon={ICONS.arrow}
              fontSize={30}
              color="white"
              className="rotate-180 cursor-pointer opacity-50"
              onClick={() => router.back()}
            />
            <h1 className="my-8 text-5xl">{title}</h1>
            <div className={styles.headerImage}>
              <Image
                src={coverPhoto?.url || ''}
                alt={title || 'André Rodrigo'}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                placeholder="blur"
                blurDataURL={IMAGE_DATA_BLUR_URL}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <p className="text-sm font-normal uppercase opacity-80">
                {category}
              </p>
              <p className="text-sm font-normal opacity-80">{publishedDate}</p>
            </div>
            <div className={styles.content}>{parser(enhancedPost.html)}</div>
          </TracingBeam>
          <ContentNavigator headings={enhancedPost.headings} />
        </motion.div>
      )}
    </Container>
  );
};

export default BlogPost;
