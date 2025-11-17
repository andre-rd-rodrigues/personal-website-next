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

import TypeformPopup from '@/components/TypeformPopup';
import CONTACTS from '@/constants/contacts.constants';
import ICONS from '@/constants/icons.constants';
import Link from 'next/link';
import { skillsDataBE, skillsDataFE } from '@/data/info.data';
import RadarChart from '@/components/RadarChart';

const About = () => {
  const t = useTranslations('about');
  const t_skills = useTranslations('skills');

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
          className="mb-24"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <motion.p
              variants={fadeInVariant}
              className="flex-1 text-base md:text-lg"
            >
              {t('about_me.description')}
            </motion.p>
            <motion.div
              variants={fadeInSlideInVariant}
              className="relative h-96 w-full flex-shrink-0 overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-3 backdrop-blur-sm md:h-[400px] md:w-[400px]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/profile.webp"
                  alt="André Rodrigues - Web Developer"
                  className="rounded-2xl object-cover"
                  fill
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Companies */}
      <Section>
        <TrustedCompanies />
      </Section>

      {/* Skills */}
      <Section>
        <SectionTitle title={t_skills('title')} color="primary" tag="h2" />
        <motion.p
          variants={fadeInSlideLeftVariant}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          {t_skills('description')}
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
