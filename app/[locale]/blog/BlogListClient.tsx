'use client';

import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import BlogMainArticleCard from '@/components/BlogMainArticleCard';
import type { Post } from '@/types/blog';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';

type BlogListClientProps = {
  posts: Post[];
};

export default function BlogListClient({ posts }: BlogListClientProps) {
  const mainArticle = posts.filter((post) => post.isTopPick)[0];
  const regularPosts = posts.filter((post) => !post.isTopPick);

  return (
    <Container className="min-h-[95vh] max-w-full px-0">
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
          {regularPosts.map((post) => (
            <motion.div variants={fadeInSlideInVariant} key={post.id}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
