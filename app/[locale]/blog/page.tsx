'use client';
import { ARTICLES_CARD_QUERY } from '@/api/graphQL/main';
import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
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

  const mainArticle = data?.posts?.filter((post) => post.isTopPick)[0];
  const regularPosts = data?.posts?.filter((post) => !post.isTopPick) || [];

  return (
    <Container className="min-h-[95vh] max-w-full px-0">
      {error && <ErrorGeneric />}

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
            <p className="text-white/60">Loading articles...</p>
          </div>
        </motion.div>
      )}

      {!loading && (
        <>
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

          <motion.div
            initial="visible"
            animate="visible"
            viewport={{ once: true }}
            variants={containerVariant}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-2 md:gap-6">
              {/* Posts */}
              {regularPosts.map((post) => (
                <motion.div variants={fadeInSlideInVariant} key={post.id}>
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </Container>
  );
};

export default Blog;
