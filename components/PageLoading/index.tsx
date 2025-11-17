'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const PageLoading = () => {
  const [loading, setLoading] = useState(
    process.env.NODE_ENV === 'production' ? true : false,
  );
  const prefersReducedMotion = useReducedMotion();
  const ANIMATION_DURATION = 0.2;

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, ANIMATION_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Optimized variants - simpler animations for better performance
  const imageVariants = useMemo(
    () => ({
      initial: { scale: 0, rotate: 0 },
      animate: {
        scale: 1,
        rotate: prefersReducedMotion ? 0 : 360,
        transition: {
          scale: {
            duration: prefersReducedMotion ? 0.3 : 0.6,
            ease: prefersReducedMotion ? 'easeOut' : [0.34, 1.56, 0.64, 1],
          },
          rotate: prefersReducedMotion
            ? {}
            : {
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
              },
        },
      },
      exit: {
        scale: 0,
        transition: {
          scale: {
            delay: 0.3,
            duration: 0.2,
            ease: 'easeIn',
          },
        },
      },
    }),
    [prefersReducedMotion],
  );

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.5, duration: ANIMATION_DURATION },
          }}
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        >
          {/* Background - reduced blur on mobile for better performance */}
          <div
            className="absolute inset-0"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <Image
              src="/images/liquid.webp"
              alt="Loading background"
              fill
              priority
              quality={75}
              className="object-cover blur-xl sm:blur-2xl"
              style={{
                willChange: 'transform',
              }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              className="h-36 w-36"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            >
              <Image
                src="/images/logo.webp"
                alt="Logo"
                fill
                className="object-contain"
                priority
                quality={90}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoading;
