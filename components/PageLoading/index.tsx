'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PageLoading = () => {
  const [loading, setLoading] = useState(true);
  const ANIMATION_DURATION = 2;

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, ANIMATION_DURATION * 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const imageVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: 1,
      rotate: 360,
      transition: {
        scale: {
          duration: 0.8,
          type: 'spring',
          stiffness: 400,
          damping: 13,
        },
        rotate: {
          duration: 10,
          ease: 'linear',
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoading;
