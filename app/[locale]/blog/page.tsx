'use client';
import { ARTICLES_CARD_QUERY } from '@/api/graphQL/main';
import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import Skeleton from '@/components/Skeletons/indext';
import useFetch from '@/hooks/useFetch';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import ErrorGeneric from '@/components/ErrorGeneric';
import BlogMainArticleCard from '@/components/BlogMainArticleCard';

const MOCK_POSTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

const Blog: NextPage = () => {
  const { data, loading, error } = useFetch<PostsData>(ARTICLES_CARD_QUERY);

  const mainArticle = data?.posts.filter((post) => post.isTopPick)[0];

  return (
    <Container className="min-h-[95vh] max-w-full px-0">
      {error && <ErrorGeneric />}

      {!!mainArticle && (
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={fadeInSlideLeftVariant}
          className="mx-auto mb-12 max-w-full lg:max-w-[1420px]"
        >
          <BlogMainArticleCard post={mainArticle} />
        </motion.div>
      )}

      {/* Main Article */}
      {loading && (
        <motion.div
          initial="visible"
          exit="hidden"
          viewport={{ once: true }}
          variants={fadeInVariant}
          className="mx-auto mb-12 max-w-full lg:max-w-[1420px]"
        >
          <Skeleton.MainPost />
        </motion.div>
      )}

      <motion.div
        initial="visible"
        animate="visible"
        viewport={{ once: true }}
        variants={containerVariant}
        className="flex flex-wrap justify-center gap-5"
      >
        {/* Loading */}
        {loading &&
          MOCK_POSTS.map((i) => (
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

        {/* Posts */}
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
