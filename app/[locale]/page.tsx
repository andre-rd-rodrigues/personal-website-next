'use client';
import { useTranslations } from 'next-intl';

import styles from '@/assets/styles/pages/homepage.module.scss';

import Button from '@/components/Button';
import Card from '@/components/Card';
import HeroSection from '@/components/Hero';
import InfoCounter from '@/components/InfoCounter';
import SectionTitle from '@/components/SectionTitle';

import Container from '@/components/Container';
import Section from '@/components/Section';
import TrustedCompanies from '@/components/TrustedCompanies';
import TypeformPopup from '@/components/TypeformPopup';
import { FlipWords } from '@/components/ui/flip-words';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import CONTACTS from '@/constants/contacts.constants';
import ICONS from '@/constants/icons.constants';
import TESTIMONIALS from '@/constants/testimonials.constants';
import { EXPERTISE, PROJECTS } from '@/data/info.data';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { Compare } from '@/components/ui/compare';
import useTranslation from '@/hooks/useTranslation';
import VideoBackground from '@/components/VideoBackground';
import Image from 'next/image';

const Home = () => {
  const t = useTranslations();
  const { getTranslationsArray } = useTranslation();

  return (
    <>
      {/* Title */}
      <VideoBackground
        src="/animations/liquid.webm"
        placeholder="/images/liquid.webp"
      >
        <div className="relative z-10 flex h-[100vh] w-full flex-col items-center justify-center px-5 sm:mx-12">
          <motion.div
            variants={containerVariant}
            whileInView="visible"
            initial="hidden"
            className={`${styles.title} col-span-12 mx-auto flex flex-col items-center justify-center text-center sm:col-span-8 sm:items-start sm:text-start`}
          >
            <Image
              src="/images/logo_light.webp"
              width={200}
              height={200}
              className="mx-auto"
              alt="André Rodrigo - Software Engineer"
            />
            <h1 className="w-full py-3 text-center text-2xl font-normal uppercase tracking-wider sm:text-[25px]">
              André Rodrigo
            </h1>

            <motion.p
              variants={fadeInSlideLeftVariant}
              className="mt-8 w-full text-center opacity-70"
            >
              {t('homepage.subtitle')}
            </motion.p>
            {/*  <div className="mt-8 flex w-full items-center justify-center gap-3">
              <motion.span variants={fadeInSlideInVariant}>
                <Link href="/portfolio/web">
                  <Button.Text label={t('homepage.cta')} icon={ICONS.arrow} />
                </Link>
              </motion.span>
              <motion.span variants={fadeInSlideInVariant}>
                <TypeformPopup />
              </motion.span>
            </div> */}
          </motion.div>
        </div>
      </VideoBackground>
      {/* Profile */}
      {/*  <div className="absolute bottom-0 right-0 z-0 h-[750px] w-[500px] opacity-30 sm:opacity-70">
        <motion.span
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/profile.webp"
            alt="André Rodrigo - Software Engineer"
            objectFit="contain"
            layout="fill"
          />
        </motion.span>
      </div> */}

      <Container>
        {/* About Me */}
        <Section className="md:my-56">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="col-span-12 flex h-full justify-center sm:col-span-5">
              <div className="mb-24 flex flex-col items-center justify-center gap-11 sm:mb-0 sm:items-start">
                <InfoCounter label={t('about.experience.years')} end={4} />
                <InfoCounter label={t('about.experience.projects')} end={15} />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-7">
              <motion.h2
                variants={fadeInSlideLeftVariant}
                initial="hidden"
                whileInView="visible"
                className="mb-10 text-6xl"
              >
                {t('homepage.about.title')}
              </motion.h2>
              <motion.p
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
              >
                {t('homepage.about.description')}
              </motion.p>
              <motion.div
                variants={containerVariant}
                initial="hidden"
                whileInView="visible"
                className="mt-4 flex items-end justify-end gap-3"
              >
                <motion.span variants={fadeInSlideInVariant}>
                  <a href={CONTACTS.LINKEDIN} target="_">
                    <Button.Icon icon={ICONS.linkedin} />
                  </a>
                </motion.span>
                <motion.span variants={fadeInSlideInVariant}>
                  <Link href="/about">
                    <Button.Text
                      label={t('buttons.see_more')}
                      icon={ICONS.arrow}
                    />
                  </Link>
                </motion.span>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Expertise */}
        <Section>
          <SectionTitle tag="h2" title="Expertise" />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            className="mt-20 grid items-baseline gap-6 md:grid-cols-12"
          >
            {EXPERTISE.map(({ name, description, src }, i) => (
              <motion.div
                variants={fadeInSlideInVariant}
                className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-4"
                key={i}
              >
                <Card
                  title={name}
                  description={t('portfolio.' + description)}
                  imageUrl={src}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInSlideLeftVariant}
            whileInView="visible"
            initial="hidden"
            className="mt-6 text-center"
          >
            <Link href="/skills">
              <Button.Text
                className="w-full"
                label={t('buttons.skills')}
                icon={ICONS.arrow}
              />
            </Link>
          </motion.div>
        </Section>

        {/* Trusted By */}
        <Section>
          <TrustedCompanies />
        </Section>
      </Container>

      {/* Portfolio */}
      <HeroParallax products={PROJECTS.homepage} />
      <motion.div
        variants={fadeInSlideInVariant}
        whileInView="visible"
        initial="hidden"
        className="mt-6 text-center"
      >
        <Link href="/portfolio">
          <Button.Text
            className="w-full"
            label={t('buttons.see_more')}
            icon={ICONS.arrow}
          />
        </Link>
      </motion.div>

      <Container>
        {/* Rebranding hero */}
        <Section>
          <motion.div
            variants={fadeInSlideLeftVariant}
            whileInView="visible"
            initial="hidden"
            className="mb-4 text-5xl md:mb-12 md:w-5/6 md:text-7xl"
          >
            <h2 className="text-4xl md:text-6xl">
              {t('homepage.rebrand_hero.title')}
              <br />
              {t('homepage.rebrand_hero.flipWords.part1')}{' '}
              <FlipWords
                words={getTranslationsArray(
                  'homepage.rebrand_hero.flipWords.words',
                )}
              />
            </h2>
            <p className="mt-8 md:w-3/5 md:text-xl">
              {t('homepage.rebrand_hero.description')}
            </p>
          </motion.div>
          <motion.div
            variants={fadeInSlideInVariant}
            whileInView="visible"
            initial="hidden"
            className="mx-auto flex h-[400px] w-full rounded-3xl border border-gray-800 bg-gray-800 bg-opacity-10 p-5 backdrop-blur-[40px] sm:h-[500px] sm:w-4/5"
          >
            <Compare
              firstImage="/images/websites/bb_before.webp"
              secondImage="/images/websites/bb_after.webp"
              firstImageClassName="object-cover object-left-top w-full"
              secondImageClassName="object-cover  w-full"
              className="h-full w-full rounded-[22px] md:rounded-lg"
              slideMode="drag"
            />
          </motion.div>
        </Section>

        {/* Testimonials */}
        <Section className="md:my-56">
          <SectionTitle tag="h2" title={t('testimonials.title')} />
          <InfiniteMovingCards items={TESTIMONIALS} />
        </Section>

        {/* Contacts */}
        <Section className="md:my-56">
          <HeroSection.Cta
            text={t('homepage.contact.description')}
            cta={<TypeformPopup label="schedule" icon={ICONS.calendar} />}
          />
        </Section>
      </Container>
    </>
  );
};

export default Home;
