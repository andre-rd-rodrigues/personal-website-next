'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export const Underline = ({ className }: { className?: string }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      whileInView={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 2,
        ease: [0.35, 0, 0, 1],
        delay: 1,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'block',
      }}
      className={cn(
        `relative z-0 h-[2px] w-full rounded-lg bg-gradient-to-r from-[#00ffe1ac] to-[#6954f000]`,
        className,
      )}
    />
  );
};
