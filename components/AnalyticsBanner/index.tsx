'use client';
import { useState, useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleSpringVariant, slowRotateVariant } from '@/motion/motionVariants';

const AnalyticsBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('analytics_banner');

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies.analyticsAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setCookie(null, 'analyticsAccepted', 'true', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={scaleSpringVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileInView="visible"
          className="fixed bottom-0 right-0 z-10 max-w-md rounded-lg bg-black bg-opacity-50 p-4 text-white backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <motion.span animate={slowRotateVariant}>
              <Icon icon="fluent:cookies-16-regular" />
            </motion.span>
            <h2 className="text-lg font-bold">Cookies</h2>
          </div>
          <p className="mt-2 text-sm">{t('description')}</p>
          <div className="text-end">
            <button
              className="mt-4 rounded bg-white px-4 py-2 text-black transition duration-300 hover:opacity-50"
              onClick={handleClose}
            >
              {t('accept')}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsBanner;
