'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import { BentoGrid } from '@/components/ui/bento-grid';
import {
  fadeInSlideInVariant,
  containerVariant,
} from '@/motion/motionVariants';

export interface ExpandableCard {
  title: string;
  src: string; // Image URL
  ctaText: string;
  ctaLink: string;
  content:
    | React.ReactNode
    | ((t: ReturnType<typeof useTranslations>) => React.ReactNode);
  colSpan?: number; // Optional: custom column span for bento grid (defaults to auto)
}

export interface ExpandableCardsProps {
  cards: ExpandableCard[];
  className?: string; // For the root container
  gridClassName?: string; // For customizing BentoGrid
  maxModalWidth?: string; // For the expanded modal (default: "500px")
  onCardClick?: (card: ExpandableCard) => void; // Optional callback when card is clicked
}

export default function ExpandableCards({
  cards,
  className,
  gridClassName,
  maxModalWidth = '500px',
  onCardClick,
}: ExpandableCardsProps) {
  const t = useTranslations();
  const [active, setActive] = useState<ExpandableCard | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleCardClick = (card: ExpandableCard) => {
    setActive(card);
    onCardClick?.(card);
  };

  // Default column span logic: first and last cards span 2 columns, others span 1
  const getColSpan = (index: number, card: ExpandableCard) => {
    if (card.colSpan !== undefined) {
      // Map common colSpan values to Tailwind classes
      const colSpanMap: Record<number, string> = {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
      };
      return colSpanMap[card.colSpan] || `md:col-span-${card.colSpan}`;
    }
    // Default pattern: first and last cards are wider
    if (index === 0 || index === cards.length - 1) {
      return 'md:col-span-2';
    }
    return 'md:col-span-1';
  };

  return (
    <motion.div
      variants={containerVariant}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      className={className}
    >
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            className="fixed inset-0 z-10 h-full w-full bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
              className="absolute right-4 top-4 z-[101] flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-lg backdrop-blur-xl transition-opacity hover:bg-white/20 hover:opacity-90 lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
              className="flex h-fit max-h-[90vh] w-full flex-col overflow-y-auto rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl sm:rounded-3xl md:max-h-[90%] md:overflow-hidden"
              style={{ maxWidth: maxModalWidth }}
            >
              <div>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </div>

              <div>
                <div className="flex items-start justify-between p-4 md:p-8">
                  <div className="">
                    <h3
                      className="text-xl font-medium text-white md:text-2xl"
                      style={{
                        fontFamily: 'var(--font-jost)',
                      }}
                    >
                      {active.title}
                    </h3>
                  </div>

                  <a
                    href={active.ctaLink}
                    target="_blank"
                    className="ml-4 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    rel="noreferrer"
                  >
                    {active.ctaText}
                  </a>
                </div>
                <div className="relative px-4 pt-4 md:px-8">
                  <div className="flex flex-col items-start gap-4 pb-10 text-xs text-white/80 md:text-sm lg:text-base">
                    {typeof active.content === 'function'
                      ? active.content(t)
                      : active.content}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Grid */}
      <BentoGrid className={gridClassName}>
        {cards.map((card, index) => (
          <motion.div
            variants={fadeInSlideInVariant}
            key={`${card.title}-${index}`}
            onClick={() => handleCardClick(card)}
            className={cn(
              'group cursor-pointer overflow-hidden rounded-2xl md:hover:scale-[1.02]',
              getColSpan(index, card),
            )}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <img
              width={100}
              height={100}
              src={card.src}
              alt={card.title}
              className="h-full w-full object-cover transition-all duration-300 ease-out md:group-hover:scale-105 md:group-hover:brightness-110"
            />
          </motion.div>
        ))}
      </BentoGrid>
    </motion.div>
  );
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
