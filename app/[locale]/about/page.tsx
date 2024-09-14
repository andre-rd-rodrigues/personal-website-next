'use client';
import PageContainer from '@/components/PageContainer/PageContainer';
import { fadeInVariant, motion } from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';
import React, { Suspense, lazy } from 'react';

import styles from '@/assets/styles/pages/about.module.scss';
import Image from 'next/image';
import ExperienceTimeline from '@/components/ExperienceTimeline/ExperienceTimeline';
import Button from '@/components/AppButton';
import ContactBanner from '@/components/ContactBanner/ContactBanner';
import HeroSection from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';

const TechStack = lazy(() => import('@/components/TechStack'));

const About = () => {
  const t = useTranslations('about_page');

  return (
    <PageContainer>
      <HeroSection
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
      />

      <SectionTitle title={t('about_me.title')} color="primary" tag="h2" />
      <div className={styles.container}>
        {/*   About me */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          className="mb-5"
        >
          <motion.p variants={fadeInVariant} className="mb-12">
            {t('about_me.description')}
          </motion.p>

          <div className="relative h-80 w-full">
            <Image
              src="/images/profile-extend.png"
              alt="André Rodrigues - Web Developer"
              className="rounded-lg"
              objectFit="cover"
              layout="fill"
            />
          </div>
          {/* Experience */}
          <div className={styles.section}>
            <ExperienceTimeline />
            <Button downloadCV className="mt-5 text-center" />
          </div>

          {/* Tech stack */}
          <Suspense fallback={<p>Loading...</p>}>
            <div className={styles.section}>{<TechStack />}</div>
          </Suspense>
        </motion.div>

        <ContactBanner />
      </div>
    </PageContainer>
  );
};

export default About;
