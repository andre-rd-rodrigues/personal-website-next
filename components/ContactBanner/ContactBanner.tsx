import { containerVariant, motion } from '@/motion/motionVariants';

import { useTranslations } from 'next-intl';
import TypeformPopup from '../TypeformPopup';
import styles from './contactbanner.module.scss';

const ContactBanner = () => {
  const t = useTranslations('contacts');

  return (
    <motion.div
      className={styles.container}
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h4>{t('banner.title')}</h4>
      <TypeformPopup.Button />
    </motion.div>
  );
};

export default ContactBanner;
