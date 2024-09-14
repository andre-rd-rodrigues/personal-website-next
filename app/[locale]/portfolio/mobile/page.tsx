'use client';
import PageContainer from '@/components/PageContainer/PageContainer';
import React from 'react';
import {
  containerVariant,
  fadeInSlideInVariant,
  motion,
  workPageHeaderContent,
} from '@/motion/motionVariants';
import styles from '@/assets/styles/pages/portfoliocategorypage.module.scss';
import { PROJECTS } from '@/data/info.data';
import { useTranslations } from 'next-intl';
import ProjectDisplay from '@/components/ProjectDisplay/ProjectDisplay';
import { Link } from '@/navigation';
import { Icon } from '@iconify/react';
import HeroSection from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';

const Mobile = () => {
  const t = useTranslations('projects.mobile');

  const projects = PROJECTS.mobile;

  return (
    <PageContainer className={styles.container}>
      <HeroSection
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
      />

      <div className="mb-16">
        <SectionTitle title="Overview" color="primary" />
        <motion.p
          variants={workPageHeaderContent}
          initial="hidden"
          animate="visible"
        >
          {t('description')}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className={styles.showCaseContainer}
      >
        {projects.map((project, i) => (
          <motion.div variants={fadeInSlideInVariant} key={i}>
            <ProjectDisplay {...project} key={i} />
          </motion.div>
        ))}
      </motion.div>

      {/* Next category button */}
      <Link href={`/portfolio/web`} className={styles.nextCategoryContainer}>
        <p>NEXT</p>
        <p>Web</p>
        <Icon icon="bi:arrow-right-short" className={styles.arrow} />
      </Link>
    </PageContainer>
  );
};

export default Mobile;
