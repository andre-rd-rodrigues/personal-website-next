'use client';
import { motion } from 'framer-motion';

import PageContainer from '@/components/PageContainer/PageContainer';
import FaqSearch from '@/components/SeachInput';
import useTranslation from '@/hooks/useTranslation';
import { fadeInSlideLeftVariant, fadeInVariant } from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';

const FaqsPage = () => {
  const t = useTranslations('faqs');

  const { getTranslationsArray } = useTranslation();

  const faqs = getTranslationsArray('faqs.questions');

  return (
    <PageContainer>
      <div className="m-auto">
        <motion.h2
          variants={fadeInSlideLeftVariant}
          initial="hidden"
          whileInView="visible"
          className="mb-10 text-6xl"
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          {t('description')}
        </motion.p>
      </div>

      <FaqSearch faqs={faqs} />
    </PageContainer>
  );
};

export default FaqsPage;
