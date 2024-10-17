'use client';
import useIsMobile from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PageLoading = () => {
  const [loading, setLoading] = useState(
    process.env.NODE_ENV === 'production' ? true : false,
  );
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  const ANIMATION_DURATION = 2;
  const CIRCLE_RADIUS = isMobile ? 130 : 175;

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, ANIMATION_DURATION * 10);
    return () => clearInterval(interval);
  }, [loading]);

  const circleVariants = {
    initial: {
      opacity: 0,
      strokeDashoffset: Math.PI * 2 * CIRCLE_RADIUS,
    },
    animate: {
      opacity: 1,
      strokeDashoffset: 0,
      transition: {
        opacity: {
          duration: 1,
          ease: 'easeInOut',
        },
        strokeDashoffset: {
          duration: ANIMATION_DURATION,
          ease: 'easeInOut',
        },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    },
  };

  const fixedCircleVariants = {
    initial: { opacity: 0 },

    animate: {
      opacity: 0.1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const imageVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        scale: {
          duration: 0.8,
          type: 'spring',
          stiffness: 400,
          damping: 13,
        },
      },
    },
    exit: {
      scale: 0,
      transition: {
        scale: {
          delay: 0.5,
          duration: 0.3,
          ease: 'easeInOut',
        },
      },
    },
  };

  const progressVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { delay: 0.8, duration: ANIMATION_DURATION },
          }}
        >
          {/* Background */}
          <Image
            src="/images/liquid.webp"
            alt="Logo"
            objectFit="cover"
            layout="fill"
            priority
            className="blur-2xl sm:blur-3xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          {/* Content */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              className="absolute h-36 w-36"
            >
              <Image
                src="/images/logo.webp"
                alt="Logo"
                objectFit="contain"
                layout="fill"
                priority
              />
            </motion.div>

            <motion.p
              className="absolute bottom-20 left-1 w-full text-center text-xl text-white"
              variants={progressVariants}
            >
              {progress}%
            </motion.p>

            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                variants={fixedCircleVariants}
                cx="200"
                cy="200"
                r={CIRCLE_RADIUS}
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={0.1}
              />
              <motion.circle
                cx="200"
                cy="200"
                r={CIRCLE_RADIUS}
                stroke="white"
                strokeWidth="1"
                fill="none"
                strokeDasharray={Math.PI * 2 * CIRCLE_RADIUS}
                strokeDashoffset={Math.PI * 2 * CIRCLE_RADIUS}
                variants={circleVariants}
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoading;
