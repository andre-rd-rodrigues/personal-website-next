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
import Skeleton from '@/components/Skeletons/indext';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInVariant } from '@/motion/motionVariants';
import ErrorGeneric from '@/components/ErrorGeneric';
import { IMAGE_DATA_BLUR_URL } from '@/constants/common.constants';
import { useEffect, useState } from 'react';
import { injectHeaderIds } from '@/utils/post.utils';
import ContentNavigator from '@/components/ContentNavigator';

type PostsData = {
  post: Post;
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

  const { post } = data || {};
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
      <AnimatePresence> {loading && <Skeleton.Post />}</AnimatePresence>
      {error && <ErrorGeneric />}
      {enhancedPost?.html && (
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
              className="rotate-180 cursor-pointer opacity-80"
              onClick={() => router.back()}
            />
            <h1 className="my-12 text-5xl">{title}</h1>
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
