'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  pauseOnHover = true,
  className,
}: {
  items: {
    client_name: string;
    client_details: string;
    picture_path: string;
    review: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [start, setStart] = useState(false);

  const t = useTranslations('testimonials');

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller animation-duration-20 animation-direction-forwards relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[350px] max-w-full flex-shrink-0 rounded-2xl border border-gray-800 px-8 py-6 md:w-[450px]"
            key={item.client_details}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span className="relative z-20 text-sm font-normal leading-[1.6] text-gray-100">
                &quot;{t(item.review)}&quot;
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-5">
                <div className="relative mt-4 h-16 w-16 overflow-hidden">
                  <Image
                    src={item.picture_path}
                    alt="Personal Picture"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                    className="rounded-full"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {item.client_name}
                  </span>
                  <span className="text-sm font-normal leading-[1.6] text-gray-400">
                    {t(item.client_details)}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
