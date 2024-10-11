'use client';
import { useState, useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { scaleSpringVariant, slowRotateVariant } from '@/motion/motionVariants';
import Button from '../Button';

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
          className="bg-dark fixed bottom-5 right-5 z-10 max-w-md rounded-lg border-gray-800 bg-opacity-50 p-4 text-white shadow-lg backdrop-blur-[20px]"
        >
          <div className="flex items-center gap-2">
            <motion.span animate={slowRotateVariant}>
              <Icon icon="fluent:cookies-16-regular" />
            </motion.span>
            <h2 className="text-lg font-normal">Cookies</h2>
          </div>
          <p className="mt-2 text-sm">{t('description')}</p>
          <div className="mt-5 text-end">
            <Button.Text label={t('accept')} onClick={handleClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsBanner;
