'use client';
import { useTranslations } from 'next-intl';

import styles from '@/assets/styles/pages/homepage.module.scss';

import AnimatedText from '@/components/AnimatedText';
import Button from '@/components/Button';
import Card from '@/components/Card';
import SectionTitle from '@/components/SectionTitle';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { HeroParallax } from '@/components/ui/hero-parallax';
import {
  EventActions,
  EventCategories,
  EventLabels,
} from '@/constants/analytics.constants';
import ICONS from '@/constants/icons.constants';
import { EXPERTISE } from '@/data/info.data';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import { Link } from '@/navigation';
import { PopupButton } from '@typeform/embed-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactGA from 'react-ga4';

const Home = () => {
  const t = useTranslations();

  const products = [
    {
      title: 'Moonbeam',
      link: 'https://gomoonbeam.com',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/moonbeam.png',
    },
    {
      title: 'Cursor',
      link: 'https://cursor.so',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/cursor.png',
    },
    {
      title: 'Rogue',
      link: 'https://userogue.com',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/rogue.png',
    },

    {
      title: 'Editorially',
      link: 'https://editorially.org',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/editorially.png',
    },
    {
      title: 'Editrix AI',
      link: 'https://editrix.ai',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/editrix.png',
    },
    {
      title: 'Pixel Perfect',
      link: 'https://app.pixelperfect.quest',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/pixelperfect.png',
    },

    {
      title: 'Algochurn',
      link: 'https://algochurn.com',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/algochurn.png',
    },
    {
      title: 'Aceternity UI',
      link: 'https://ui.aceternity.com',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/aceternityui.png',
    },
    {
      title: 'Tailwind Master Kit',
      link: 'https://tailwindmasterkit.com',
      thumbnail:
        'https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png',
    },
  ];
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
                    icon={ICONS.sendEmail}
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

      {/* Expertise */}
      <div className="mx-auto my-12 max-w-7xl px-5 md:my-20">
        <SectionTitle title="Expertise" />
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          className="grid items-baseline gap-6 md:grid-cols-12"
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
      </div>
      <HeroParallax products={products} />
    </>
  );
};

export default Home;
