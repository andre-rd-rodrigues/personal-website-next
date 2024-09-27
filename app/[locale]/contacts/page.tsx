'use client';
import styles from '@/assets/styles/pages/contact.module.scss';
import { motion } from 'framer-motion';

import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer/PageContainer';
import CONTACTS from '@/constants/contacts.constants';
import ICONS from '@/constants/icons.constants';
import {
  containerVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';

const Contacts = () => {
  const t = useTranslations('contacts');

  return (
    <PageContainer className={styles.container}>
      <div className="grid items-baseline gap-6 md:grid-cols-12">
        <div className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-4">
          <h1 className="text-extralight">{t('title')}</h1>
        </div>
        <div className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-4">
          <motion.div variants={fadeInVariant}>
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
        </div>
        <div className="col-span-12 flex h-full justify-center sm:col-span-12 md:col-span-4">
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
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
                <motion.a
                  variants={fadeInVariant}
                  href={CONTACTS.LINKTREE}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button.Icon icon={ICONS.linktree} />
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={fadeInVariant}
                  href={CONTACTS.INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button.Icon icon={ICONS.instagram} />
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={fadeInVariant}
                  href={CONTACTS.LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button.Icon icon={ICONS.linkedin} />
                </motion.a>
              </li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Contacts;
