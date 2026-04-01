'use client';

import { useMemo, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import BlogFilters from '@/components/BlogFilters';
import Container from '@/components/Container';
import BlogMainArticleCard from '@/components/BlogMainArticleCard';
import type { Post } from '@/types/blog';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';

type BlogListClientProps = {
  posts: Post[];
};

export default function BlogListClient({ posts }: BlogListClientProps) {
  const t = useTranslations('blogFilters');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mainArticle = posts.filter((post) => post.isTopPick)[0];
  const regularPosts = posts.filter((post) => !post.isTopPick);

  const categories = useMemo(
    () => [...new Set(regularPosts.map((p) => p.category))].sort(),
    [regularPosts],
  );

  const filteredPosts = useMemo(() => {
    let result = regularPosts;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [regularPosts, activeCategory, searchQuery]);

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
        initial="hidden"
        animate="visible"
        variants={fadeInSlideInVariant}
      >
        <BlogFilters
          categories={categories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onCategoryChange={setActiveCategory}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      <motion.div
        initial="visible"
        animate="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-2 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                variants={fadeInSlideInVariant}
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-gray-400">{t('noResults')}</p>
        )}
      </motion.div>
    </Container>
  );
}
