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

import Button from '@/components/Button';
import Section from '@/components/Section';
import TrustedCompanies from '@/components/TrustedCompanies';

import InfoCounter from '@/components/InfoCounter';
import TypeformPopup from '@/components/TypeformPopup';
import CONTACTS from '@/constants/contacts.constants';
import ICONS from '@/constants/icons.constants';
import Link from 'next/link';

const About = () => {
  const t = useTranslations('about');

  return (
    <PageContainer>
      <Section>
        <HeroSection.Text
          title={t('heroTitle')}
          subtitle={<p>{t('heroDescription')}</p>}
          className="pb-0"
        />
      </Section>

      {/*   About me */}
      <Section>
        <SectionTitle title={t('about_me.title')} color="primary" tag="h2" />
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
              src="/images/profile-extend.webp"
              alt="André Rodrigues - Web Developer"
              className="rounded-lg"
              objectFit="cover"
              layout="fill"
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* Companies */}
      <Section>
        <TrustedCompanies />
      </Section>

      {/* About */}
      <Section>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="col-span-12 flex h-full justify-center sm:col-span-4">
            <div className="mb-24 flex flex-col items-center justify-center gap-11 sm:mb-0 sm:items-start">
              <InfoCounter label={t('experience.years')} end={4} />
              <InfoCounter label={t('experience.projects')} end={15} />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-8">
            <motion.h3
              variants={fadeInSlideLeftVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              viewport={{ once: true }}
              className="mt-4 flex items-end justify-end gap-3"
            >
              <a href="/docs/cv.pdf" download="André_Rodrigues_CV.pdf">
                <Button.Icon icon={ICONS.download} />
              </a>
              <Link href={CONTACTS.LINKEDIN} target="_">
                <Button.Icon icon={ICONS.linkedin} />
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section className="mb-0 md:mb-0">
        <SectionTitle title={t('contact.title')} color="primary" tag="h2" />
        <HeroSection.Cta
          text={t('contact.description')}
          cta={<TypeformPopup.Button />}
        />
      </Section>
    </PageContainer>
  );
};

export default About;
