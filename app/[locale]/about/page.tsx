'use client';
import PageContainer from '@/components/PageContainer/PageContainer';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
  motion,
} from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';

import HeroSection from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';

import { CountUp } from 'use-count-up';
import { useInView } from 'react-intersection-observer';
import styles from '@/assets/styles/pages/about.module.scss';

const About = () => {
  const t = useTranslations('about_page');
  const [counterRef, counterInView] = useInView();

  return (
    <PageContainer>
      <HeroSection
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
      />

      <SectionTitle title={t('about_me.title')} color="primary" tag="h2" />

      {/*   About me */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        className="md:24 mb-24"
      >
        <motion.p variants={fadeInVariant} className="mb-12">
          {t('about_me.description')}
        </motion.p>

        <motion.div
          variants={fadeInSlideInVariant}
          className="relative h-96 w-full"
        >
          <Image
            src="/images/profile-extend.png"
            alt="André Rodrigues - Web Developer"
            className="rounded-lg"
            objectFit="cover"
            layout="fill"
          />
        </motion.div>
      </motion.div>

      {/* Experience */}
      {/* TODO: Add Trusted by X companies */}
      <Row>
        <Col sm={12} md={4} lg={4}>
          <div className="flex h-full justify-center">
            <div className="mb-24 flex flex-col justify-center gap-11 sm:mb-0">
              {/* Years of experience */}
              <div>
                <p
                  ref={counterRef}
                  className={`${styles.counter} text-8xl font-thin text-purple-500`}
                >
                  {'+'}{' '}
                  <CountUp isCounting={counterInView} end={4} duration={3} />
                </p>
                <p className="mt-3">{t('experience.years')}</p>
              </div>
              {/* Projects */}
              <div>
                <p
                  ref={counterRef}
                  className={`${styles.counter} text-8xl font-thin text-purple-500`}
                >
                  {'+'}{' '}
                  <CountUp isCounting={counterInView} end={15} duration={3} />
                </p>
                <p className="mt-3">{t('experience.projects')}</p>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={12} md={8} lg={8}>
          <motion.h3
            variants={fadeInSlideLeftVariant}
            initial="hidden"
            whileInView="visible"
            className="mb-5 text-6xl font-extralight"
          >
            {t('experience.title')}
          </motion.h3>
          <motion.p
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
          >
            {t('experience.description')}
          </motion.p>
          {/* TODO: Add linkedin icon */}
        </Col>
      </Row>
      {/*  <ContactBanner /> */}
    </PageContainer>
  );
};

export default About;
