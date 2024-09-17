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

import styles from '@/assets/styles/pages/about.module.scss';

import Section from '@/components/Section';
import TrustedCompanies from '@/components/TrustedCompanies';
import { PopupButton } from '@typeform/embed-react';
import { useInView } from 'react-intersection-observer';
import { CountUp } from 'use-count-up';
import AppButton from '@/components/AppButton';
import { Link } from '@/navigation';
import CONTACTS from '@/constants/contacts.constants';

const About = () => {
  const t = useTranslations('about_page');
  const t_buttons = useTranslations('buttons');
  const [counterRef, counterInView] = useInView();

  return (
    <PageContainer>
      <HeroSection.Text
        title={t('heroTitle')}
        subtitle={<p>{t('heroDescription')}</p>}
        className="pb-0"
      />

      {/*   About me */}
      <Section>
        <SectionTitle title={t('about_me.title')} color="primary" tag="h2" />
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
      </Section>

      {/* Companies */}
      <TrustedCompanies />

      {/* About */}

      <Section>
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

            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              className="mt-4 flex items-end justify-end gap-3"
            >
              <a href="/docs/cv.pdf" download="André_Rodrigues_CV.pdf">
                <AppButton.Icon icon="mingcute:download-3-line" />
              </a>

              <Link href={CONTACTS.LINKEDIN} target="_">
                <AppButton.Icon icon="flowbite:linkedin-solid" />
              </Link>
            </motion.div>
          </Col>
        </Row>
      </Section>

      {/* Contact */}
      <Section className="mb-0">
        <SectionTitle title={t('contact.title')} color="primary" tag="h2" />
        <HeroSection.Cta
          text={t('contact.description')}
          cta={
            <PopupButton id="wTr5ba0e" size={60}>
              <AppButton.Button
                icon={{ icon: 'streamline:mail-send-email-message' }}
                label={t_buttons('send_message')}
              />
            </PopupButton>
          }
        />
      </Section>
    </PageContainer>
  );
};

export default About;
