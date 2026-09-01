'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';

import Button from '@/components/Button';
import ICONS from '@/constants/icons.constants';
import {
  containerVariant,
  fadeInSlideInVariant,
} from '@/motion/motionVariants';
import { Link } from '@/navigation';
import type { Post } from '@/types/blog';

type BlogPreviewProps = {
  posts: Post[];
};

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const locale = useLocale();
  const t = useTranslations('homepage.blogPreview');
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
  });

  if (posts.length === 0) return null;

  return (
    <div>
      <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h2 className="text-balance text-4xl font-light md:text-6xl">
            {t('title')}
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-white/75 md:text-xl">
            {t('description')}
          </p>
        </div>
        <Link href="/blog">
          <Button.Text as="span" icon={ICONS.arrow} label={t('viewAll')} />
        </Link>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={fadeInSlideInVariant}>
            <Link
              href={{
                pathname: '/blog/[slug]',
                params: { slug: post.slug },
              }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-800/10 backdrop-blur-2xl transition-colors duration-300 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverPhoto.url}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-4 text-sm text-pink">
                  <span>{post.category}</span>
                  <time dateTime={post.publishedDate}>
                    {dateFormatter.format(
                      new Date(`${post.publishedDate}T00:00:00Z`),
                    )}
                  </time>
                </div>
                <h3 className="mt-5 text-balance text-2xl font-light">
                  {post.title}
                </h3>
                <p className="mt-4 line-clamp-3 text-pretty text-white/70">
                  {post.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-white transition-colors group-hover:text-pink">
                  {t('readArticle')}
                  <Icon
                    icon={ICONS.arrow}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
