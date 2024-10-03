'use client';
import { ARTICLES_CARD_QUERY } from '@/api/graphQL/main';
import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import Skeleton from '@/components/Skeletons/indext';
import useFetch from '@/hooks/useFetch';
import { AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import ErrorGeneric from '@/components/ErrorGeneric';

export type Post = {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  description: string;
  isTopPick: boolean;
  slug: string;
  content: {
    html: string;
  };
  coverPhoto: {
    url: string;
  };
};

type PostsData = {
  posts: Post[];
};

const Blog: NextPage<Post> = () => {
  const { data, loading, error } = useFetch<PostsData>(ARTICLES_CARD_QUERY);
  const mockedPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Container className="max-w-full px-0">
      {error && <ErrorGeneric />}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariant}
        className="flex flex-wrap justify-center gap-5"
      >
        <AnimatePresence>
          {loading &&
            mockedPosts.map((i) => (
              <motion.div
                key={i}
                initial="visible"
                variants={fadeInVariant}
                exit="hidden"
                className="max-w-full lg:max-w-[700px]"
              >
                <Skeleton.PostCard />
              </motion.div>
            ))}
        </AnimatePresence>

        {data?.posts.map((post, i) => (
          <motion.div
            variants={fadeInSlideInVariant}
            className="max-w-full lg:max-w-[700px]"
            key={i}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default Blog;
