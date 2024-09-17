'use client';
import styles from '@/assets/styles/pages/contact.module.scss';
import { motion } from 'framer-motion';
import { Col, Row } from 'react-bootstrap';

import AppButton from '@/components/AppButton';
import PageContainer from '@/components/PageContainer/PageContainer';
import CONTACTS from '@/constants/contacts.constants';
import {
  containerVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
} from '@/motion/motionVariants';
import { useTranslations } from 'next-intl';
import ICONS from '@/constants/icons.constants';

const Contacts = () => {
  const t = useTranslations('contacts_page');

  const spacing = {
    lg: 4,
    md: 4,
    sm: 12,
  };

  return (
    <PageContainer className={styles.container}>
      <Row>
        <Col className={styles.col} {...spacing}>
          <h1 className="text-extralight">{t('title')}</h1>
        </Col>
        <Col className={styles.col} {...spacing}>
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
        </Col>
        <Col className={styles.col} {...spacing}>
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
                  <AppButton.Icon icon={ICONS.linktree} />
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={fadeInVariant}
                  href={CONTACTS.INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AppButton.Icon icon={ICONS.instagram} />
                </motion.a>
              </li>
              <li>
                <motion.a
                  variants={fadeInVariant}
                  href={CONTACTS.LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AppButton.Icon icon={ICONS.linkedin} />
                </motion.a>
              </li>
            </motion.ul>
          </motion.div>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Contacts;
