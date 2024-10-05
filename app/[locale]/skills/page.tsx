'use client';
import styles from '@/assets/styles/pages/skills.module.scss';
import PageContainer from '@/components/PageContainer/PageContainer';
import { useTranslations } from 'next-intl';

import HeroSection from '@/components/Hero';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import RadarChart from '@/components/RadarChart';
import { skillsDataFE, skillsDataBE } from '@/data/info.data';
import { motion } from 'framer-motion';
import { fadeInSlideLeftVariant } from '@/motion/motionVariants';
import Button from '@/components/Button';
import CONTACTS from '@/constants/contacts.constants';
import Link from 'next/link';
import ICONS from '@/constants/icons.constants';

const Skills = () => {
  const t = useTranslations('skills');

  return (
    <PageContainer className={styles.container}>
      <Section>
        <HeroSection.Text
          title={t('heroTitle')}
          subtitle={<p>{t('heroDescription')}</p>}
          className="pb-0"
          options={{
            subtitleDelay: 0.8,
          }}
        />
      </Section>

      <Section>
        <SectionTitle title={t('title')} color="primary" tag="h2" />
        <motion.p
          variants={fadeInSlideLeftVariant}
          whileInView="visible"
          initial="hidden"
        >
          {t('description')}
        </motion.p>
      </Section>
      <div className="grid items-baseline gap-6 md:grid-cols-12">
        <div className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-6">
          <RadarChart data={skillsDataFE} />
        </div>
        <div className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-6">
          <RadarChart data={skillsDataBE} />
        </div>
      </div>
      <div className="flex items-end justify-end gap-3">
        <a href="/docs/cv.pdf" download="André_Rodrigues_CV.pdf">
          <Button.Icon icon={ICONS.download} />
        </a>
        <Link href={CONTACTS.LINKEDIN} target="_">
          <Button.Icon icon={ICONS.linkedin} />
        </Link>
      </div>
    </PageContainer>
  );
};

export default Skills;
