'use client';
import { useTranslations } from 'next-intl';

import styles from '@/assets/styles/pages/homepage.module.scss';
import AppLink from '@/components/AppLink/AppLink';

import { fadeInVariant, homepageDelayVariant } from '@/motion/motionVariants';
import { PopupButton } from '@typeform/embed-react';
import { motion } from 'framer-motion';
import ReactGA from 'react-ga4';
import {
  EventActions,
  EventCategories,
  EventLabels,
} from '@/constants/analytics.constants';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { HeroParallax } from '@/components/ui/hero-parallax';
import PageContainer from '@/components/PageContainer/PageContainer';
import SectionTitle from '@/components/SectionTitle';
import Section from '@/components/Section';

const Home = () => {
  const t = useTranslations('homepage');
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
    <AuroraBackground>
      <motion.div
        variants={homepageDelayVariant}
        initial="hidden"
        animate="visible"
        className={`${styles.title} flex h-[80vh] flex-col items-center justify-center`}
      >
        <motion.h1 variants={fadeInVariant} className="mt-20 font-extralight">
          André Rodrigo
        </motion.h1>

        <motion.p variants={fadeInVariant}>{t('subtitle')}</motion.p>
        <motion.div variants={fadeInVariant} className="mt-12">
          <AppLink href="/portfolio" label={t('cta')} />|
          <PopupButton
            id="wTr5ba0e"
            size={60}
            className={styles.formButton}
            onClick={() =>
              ReactGA.event({
                category: EventCategories.USER_INTERACTION,
                action: EventActions.OPEN_CONTACT_TYPEFORM,
                label: EventLabels.CONTACT_FORM_BUTTON,
              })
            }
          >
            {t('form.button')}
          </PopupButton>
        </motion.div>
      </motion.div>

      <SectionTitle title="Expertise" />

      <HeroParallax products={products} />
    </AuroraBackground>
  );
};

export default Home;
