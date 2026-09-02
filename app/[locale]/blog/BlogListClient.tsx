'use client';

import { useMemo, useRef, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import BlogFilters from '@/components/BlogFilters';
import Container from '@/components/Container';
import BlogMainArticleCard from '@/components/BlogMainArticleCard';
import Button from '@/components/Button';
import type { PostSummary } from '@/types/blog';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';

type BlogListClientProps = {
  posts: PostSummary[];
};

const POSTS_PER_PAGE = 6;

export default function BlogListClient({ posts }: BlogListClientProps) {
  const t = useTranslations('blogFilters');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const filtersRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const handleCategoryFromCard = (category: string) => {
    handleCategoryChange(category);
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    filtersRef.current?.scrollIntoView?.({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const mainArticle = useMemo(
    () => posts.find((post) => post.isTopPick),
    [posts],
  );
  const regularPosts = useMemo(
    () => posts.filter((post) => !post.isTopPick),
    [posts],
  );

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category))].sort(),
    [posts],
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

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;

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
          <BlogMainArticleCard
            post={mainArticle}
            onCategoryClick={handleCategoryFromCard}
          />
        </motion.div>
      )}

      <motion.div
        ref={filtersRef}
        initial="hidden"
        animate="visible"
        variants={fadeInSlideInVariant}
        className="scroll-mt-24"
      >
        <BlogFilters
          categories={categories}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
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
            {visiblePosts.map((post) => (
              <motion.div
                variants={fadeInSlideInVariant}
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard
                  post={post}
                  onCategoryClick={handleCategoryFromCard}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMorePosts && (
          <div className="mt-10 flex justify-center">
            <Button.Minimal
              label={t('loadMore')}
              onClick={() => setVisibleCount((count) => count + POSTS_PER_PAGE)}
            />
          </div>
        )}

        {filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-gray-400">{t('noResults')}</p>
        )}
      </motion.div>
    </Container>
  );
}
