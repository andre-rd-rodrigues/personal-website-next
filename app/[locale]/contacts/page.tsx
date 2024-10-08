'use client';
import styles from '@/assets/styles/pages/contact.module.scss';
import { motion } from 'framer-motion';

import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer/PageContainer';
import CONTACTS from '@/constants/contacts.constants';
import ICONS from '@/constants/icons.constants';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';
import TypeformPopup from '@/components/TypeformPopup';

const Contacts = () => {
  const t = useTranslations('contacts');

  return (
    <PageContainer className={styles.container}>
      <div className="flex flex-wrap items-center justify-center gap-10 text-center sm:flex-nowrap sm:justify-start sm:gap-40 sm:text-start">
        <div className="">
          <h1 className="absolute opacity-0">{t('title')}</h1>
          <p className="text-6xl font-light sm:font-extralight md:text-8xl">
            {t('title')}
          </p>
        </div>

        <motion.div
          variants={containerVariant}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeInSlideLeftVariant}>
            <h3>{t('email')}</h3>
            <a
              id="contact_email"
              href={`mailto:${CONTACTS.EMAIL}`}
              target="_blank"
              rel="noreferrer"
            >
              {CONTACTS.EMAIL}
            </a>
          </motion.div>

          <motion.div
            variants={fadeInSlideLeftVariant}
            className={styles.social}
          >
            <motion.h3 variants={fadeInSlideLeftVariant}>
              {t('social')}
            </motion.h3>
            <motion.ul
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
            >
              <li>
                <a href={CONTACTS.LINKTREE} target="_blank" rel="noreferrer">
                  <Button.Icon icon={ICONS.linktree} />
                </a>
              </li>
              <li>
                <a href={CONTACTS.INSTAGRAM} target="_blank" rel="noreferrer">
                  <Button.Icon icon={ICONS.instagram} />
                </a>
              </li>
              <li>
                <a href={CONTACTS.LINKEDIN} target="_blank" rel="noreferrer">
                  <Button.Icon icon={ICONS.linkedin} />
                </a>
              </li>
            </motion.ul>
          </motion.div>

          <motion.div variants={fadeInSlideLeftVariant}>
            <motion.h3 variants={fadeInSlideLeftVariant}>
              {t('reachOut')}
            </motion.h3>
            <motion.div variants={fadeInSlideInVariant}>
              <TypeformPopup />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Contacts;
