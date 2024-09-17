'use client';
import styles from '@/assets/styles/pages/skills.module.scss';
import PageContainer from '@/components/PageContainer/PageContainer';
import { useTranslations } from 'next-intl';

import HeroSection from '@/components/Hero';
import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import RadarChart from '@/components/RadarChart';
import { skillsDataFE, skillsDataBE } from '@/data/info.data';
import { Col, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { fadeInSlideLeftVariant } from '@/motion/motionVariants';
import AppButton from '@/components/AppButton';
import CONTACTS from '@/constants/contacts.constants';
import Link from 'next/link';

const Skills = () => {
  const t = useTranslations('skills');

  return (
    <PageContainer className={styles.container}>
      <HeroSection.Text
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
        className="pb-0"
        options={{
          subtitleDelay: 0.8,
        }}
      />
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
      <Row>
        <Col sm={12} md={6}>
          <RadarChart data={skillsDataFE} />
        </Col>
        <Col sm={12} md={6}>
          <RadarChart data={skillsDataBE} />
        </Col>
      </Row>
      <div className="flex items-end justify-end gap-3">
        <a href="/docs/cv.pdf" download="André_Rodrigues_CV.pdf">
          <AppButton.Icon icon="mingcute:download-3-line" />
        </a>
        <Link href={CONTACTS.LINKEDIN} target="_">
          <AppButton.Icon icon="flowbite:linkedin-solid" />
        </Link>
      </div>
    </PageContainer>
  );
};

export default Skills;
