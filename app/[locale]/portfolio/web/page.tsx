'use client';
import styles from '@/assets/styles/pages/portfoliocategorypage.module.scss';
import HeroSection from '@/components/Hero';
import PageContainer from '@/components/PageContainer/PageContainer';
import ProjectDisplay from '@/components/ProjectDisplay/ProjectDisplay';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import { PROJECTS } from '@/data/info.data';
import {
  containerVariant,
  fadeInSlideInVariant,
  motion,
  workPageHeaderContent,
} from '@/motion/motionVariants';
import { Link } from '@/navigation';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';

const Web = () => {
  const t = useTranslations('projects.web');

  const projects = PROJECTS.web;

  return (
    <PageContainer className={styles.container}>
      <HeroSection.Text
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
      />

      <Section>
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
      </Section>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className={styles.showCaseContainer}
      >
        {projects.map((project, i) => (
          <motion.div variants={fadeInSlideInVariant} key={i}>
            <ProjectDisplay key={i} {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Next category button */}
      <Link href={`/portfolio/mobile`} className={styles.nextCategoryContainer}>
        <p>NEXT</p>
        <p>Mobile</p>
        <Icon icon="bi:arrow-right-short" className={styles.arrow} />
      </Link>
    </PageContainer>
  );
};

export default Web;
