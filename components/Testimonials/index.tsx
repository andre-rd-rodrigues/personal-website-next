'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import TESTIMONIALS from '@/constants/testimonials.constants';
import ICONS from '@/constants/icons.constants';
import { GOOGLE_REVIEWS_URL } from '@/constants/links.constants';
import Button from '@/components/Button';
import { motion, fadeInSlideInVariant } from '@/motion/motionVariants';

interface Testimonial {
  review: string;
  client_name: string;
  client_details: string;
  picture_path: string;
  project_link?: string | null;
}

const REVIEWS = (TESTIMONIALS as Testimonial[]).slice(0, 5);

/** Testimonial shown first when the section loads. */
const DEFAULT_INDEX = Math.max(
  0,
  REVIEWS.findIndex((item) => item.client_name === 'Brennda Castro'),
);

/** Slot the active avatar always occupies, so it stays visually centered. */
const CENTER_SLOT = Math.floor(REVIEWS.length / 2);

/** Scale and opacity by distance from the centered slot. */
const AVATAR_SCALE = [1.3, 1, 0.78];
const AVATAR_OPACITY = [1, 0.55, 0.3];

const EASE_SMOOTH = [0.35, 0, 0, 1];

const reviewSwapVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

/**
 * Rotates the review indexes so the active one lands on CENTER_SLOT.
 * Returns original indexes, keeping selection independent of display order.
 */
const orderAroundActive = (activeIndex: number) => {
  const offset = (activeIndex - CENTER_SLOT + REVIEWS.length) % REVIEWS.length;
  return REVIEWS.map((_, index) => (index + offset) % REVIEWS.length);
};

const Testimonials = () => {
  const t = useTranslations('testimonials');
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const active = REVIEWS[activeIndex];

  return (
    <motion.div
      className="flex flex-col items-center"
      variants={fadeInSlideInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div layout className="w-full">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.review}
            variants={reviewSwapVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-8 text-center backdrop-blur-2xl md:p-12"
          >
            <blockquote className="mx-auto max-w-4xl text-lg font-light leading-[1.6] text-white md:text-2xl md:leading-[1.5]">
              {t(active.review)}
            </blockquote>

            <div className="mt-8">
              <div className="flex justify-center">
                <StarRating size={16} />
              </div>
              <p className="mt-3 text-white">{active.client_name}</p>
              <p className="mt-1 text-sm font-light text-white/50">
                {t(active.client_details)}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 flex items-center justify-center gap-5">
        {orderAroundActive(activeIndex).map((reviewIndex, slot) => {
          const item = REVIEWS[reviewIndex];
          const distance = Math.abs(slot - CENTER_SLOT);
          const isActive = reviewIndex === activeIndex;

          return (
            <motion.button
              key={item.review}
              type="button"
              layout="position"
              onClick={() => setActiveIndex(reviewIndex)}
              animate={{
                scale: AVATAR_SCALE[distance],
                opacity: AVATAR_OPACITY[distance],
              }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH }}
              whileHover={{ opacity: 1 }}
              whileTap={{ scale: AVATAR_SCALE[distance] * 0.92 }}
              aria-label={item.client_name}
              aria-current={isActive}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 transition-colors duration-300 ${
                isActive
                  ? 'border-[var(--color-primary)]'
                  : 'border-transparent'
              }`}
            >
              <Avatar item={item} />
            </motion.button>
          );
        })}
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12"
        aria-label={t('google_reviews')}
      >
        <Button.Minimal label={t('google_reviews')} icon={ICONS.google} />
      </a>
    </motion.div>
  );
};

export default Testimonials;

const Star = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 20 20"
    width={size}
    height={size}
    className="text-[#dea97d]"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M10 1.5l2.35 5.5 6 .55-4.55 3.95 1.4 5.85L10 14.9 4.8 17.35l1.4-5.85L1.65 7.55l6-.55L10 1.5z"
    />
  </svg>
);

const StarRating = ({ size = 16 }: { size?: number }) => (
  <div className="flex items-center gap-1" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} size={size} />
    ))}
  </div>
);

const Avatar = ({ item }: { item: Testimonial }) =>
  item.picture_path ? (
    <Image
      src={item.picture_path}
      alt={item.client_name}
      fill
      sizes="72px"
      className="object-cover object-center"
    />
  ) : (
    <span className="flex h-full w-full items-center justify-center bg-white/10 text-xs font-light text-white">
      {getInitials(item.client_name)}
    </span>
  );
