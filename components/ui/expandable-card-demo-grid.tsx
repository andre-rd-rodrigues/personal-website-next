'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

export interface ExpandableCard {
  title: string;
  description: string;
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
    <div className={className}>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute right-6 top-6 z-[101] flex h-8 w-8 items-center justify-center rounded-full border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-2xl transition-opacity hover:opacity-80 lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 backdrop-blur-2xl sm:rounded-3xl md:h-fit md:max-h-[90%]"
              style={{ maxWidth: maxModalWidth }}
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4 md:p-8">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-medium text-white md:text-lg"
                      style={{
                        fontFamily: 'var(--font-jost)',
                      }}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="mt-2 text-base text-white/70"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="ml-4 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4 md:px-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-white/80 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof active.content === 'function'
                      ? active.content(t)
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <BentoGrid className={gridClassName}>
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`${card.title}-${index}`}
            onClick={() => handleCardClick(card)}
            className={cn(
              'group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-gray-800 bg-gray-800 bg-opacity-10 p-4 backdrop-blur-2xl transition-all hover:bg-opacity-20',
              getColSpan(index, card),
            )}
          >
            <div className="flex w-full flex-col gap-4">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col items-center justify-center">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="text-center text-base font-medium text-white md:text-left"
                  style={{
                    fontFamily: 'var(--font-jost)',
                  }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="mt-2 text-center text-base text-white/70 md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </BentoGrid>
    </div>
  );
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
    </motion.svg>
  );
};
