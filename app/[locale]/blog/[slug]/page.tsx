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

type PostsData = {
  post: Post;
};

type BlogPostParams = {
  slug: string;
};

type BlogPostProps = {
  params: BlogPostParams;
};

const BlogPost: NextPage<BlogPostProps> = ({ params }) => {
  const { data, loading, error } = useFetch<PostsData>(ARTICLE_QUERY, {
    slug: params.slug,
  });

  const { post } = data || {};
  const { title, publishedDate, content, coverPhoto, category } = post || {};

  const router = useRouter();

  return (
    <Container>
      <AnimatePresence> {loading && <Skeleton.Post />}</AnimatePresence>
      {error && <ErrorGeneric />}
      {post && (
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
            <div className={styles.content}>{parser(content?.html || '')}</div>
          </TracingBeam>
        </motion.div>
      )}
    </Container>
  );
};

export default BlogPost;
