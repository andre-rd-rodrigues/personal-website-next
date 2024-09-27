'use client';
import { useTranslations } from 'next-intl';

import styles from '@/assets/styles/pages/homepage.module.scss';
import AnimatedText from '@/components/AnimatedText';
import Button from '@/components/Button';
import Card from '@/components/Card';
import HeroSection from '@/components/Hero';
import InfoCounter from '@/components/InfoCounter';
import SectionTitle from '@/components/SectionTitle';
import { TESTIMONIALS } from '@/components/Testimonials/testimonials.constants';
import TrustedCompanies from '@/components/TrustedCompanies';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { FlipWords } from '@/components/ui/flip-words';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import {
  EventActions,
  EventCategories,
  EventLabels,
} from '@/constants/analytics.constants';
import ICONS from '@/constants/icons.constants';
import { EXPERTISE, PROJECTS } from '@/data/info.data';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import { Link } from '@/navigation';
import { PopupButton } from '@typeform/embed-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactGA from 'react-ga4';
import Section from '@/components/Section';
import CONTACTS from '@/constants/contacts.constants';
import Container from '@/components/Container';

const Home = () => {
  const t = useTranslations();

  return (
    <>
      <AuroraBackground className="relative">
        <div className="relative z-10 grid h-[80vh] grid-cols-1 gap-6 overflow-hidden px-5 sm:mx-12 md:grid-cols-12">
          {/* Title */}
          <div
            className={`${styles.title} col-span-12 mx-auto flex flex-col items-center justify-center text-center sm:col-span-8 sm:items-start sm:text-start`}
          >
            <AnimatedText.Fade
              className="py-3 text-5xl font-semibold sm:text-7xl"
              text="André Rodrigo"
              underline
            />

            <motion.p variants={fadeInVariant} className="mt-5 opacity-70">
              {t('homepage.subtitle')}
            </motion.p>
            <motion.div variants={containerVariant} className="mt-8 flex gap-3">
              <motion.span variants={fadeInSlideInVariant}>
                <Link href="/portfolio">
                  <Button.Text label={t('homepage.cta')} icon={ICONS.arrow} />
                </Link>
              </motion.span>
              <motion.span variants={fadeInSlideInVariant}>
                <PopupButton
                  id="wTr5ba0e"
                  size={60}
                  onClick={() =>
                    ReactGA.event({
                      category: EventCategories.USER_INTERACTION,
                      action: EventActions.OPEN_CONTACT_TYPEFORM,
                      label: EventLabels.CONTACT_FORM_BUTTON,
                    })
                  }
                >
                  <Button.Text
                    icon={ICONS.message}
                    label={t('buttons.contact')}
                  />
                </PopupButton>
              </motion.span>
            </motion.div>
          </div>
        </div>
        {/* Profile */}
        <div className="absolute bottom-0 right-0 z-0 h-[750px] w-[500px] opacity-30 sm:opacity-70">
          <motion.span
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/profile.png"
              alt="André Rodrigo - Software Engineer"
              objectFit="contain"
              layout="fill"
            />
          </motion.span>
        </div>
      </AuroraBackground>

      <Container>
        {/* About Me */}
        <Section className="md:my-56">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="col-span-12 flex h-full justify-center sm:col-span-5">
              <div className="mb-24 flex flex-col justify-center gap-11 sm:mb-0">
                <InfoCounter label={t('about.experience.years')} end={4} />
                <InfoCounter label={t('about.experience.projects')} end={15} />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-7">
              <motion.h3
                variants={fadeInSlideLeftVariant}
                initial="hidden"
                whileInView="visible"
                className="mb-10 text-6xl font-extralight"
              >
                {t('homepage.about.title')}
              </motion.h3>
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
                  <Link href={CONTACTS.LINKEDIN} target="_">
                    <Button.Icon icon={ICONS.linkedin} />
                  </Link>
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
        <SectionTitle title="Expertise" />
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
        {/* Trusted By */}
        <Section className="md:my-56">
          <TrustedCompanies />
        </Section>
        <Section className="md:my-56">
          <HeroSection.FlipWords className="mb-56">
            <>
              Innovating
              <FlipWords words={['modern', 'user-focused', 'engaging']} />
              <br />
              applications tailored to your needs.
            </>
          </HeroSection.FlipWords>
        </Section>

        {/* Testimonials */}
        <Section className="md:my-56">
          <SectionTitle title={t('testimonials.title')} />
          <InfiniteMovingCards items={TESTIMONIALS} />
        </Section>

        {/* Contacts */}
        <Section className="md:my-56">
          <HeroSection.Cta
            text={t('homepage.contact.description')}
            cta={
              <PopupButton
                id="wTr5ba0e"
                size={60}
                onClick={() =>
                  ReactGA.event({
                    category: EventCategories.USER_INTERACTION,
                    action: EventActions.OPEN_CONTACT_TYPEFORM,
                    label: EventLabels.CONTACT_FORM_BUTTON,
                  })
                }
              >
                <Button.Text
                  icon={ICONS.message}
                  label={t('buttons.send_message')}
                />
              </PopupButton>
            }
          />
        </Section>
      </Container>
    </>
  );
};

export default Home;
