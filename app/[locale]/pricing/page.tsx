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
  const t = useTranslations('pricing');

  return <PageContainer className={styles.container}></PageContainer>;
};

export default Contacts;
