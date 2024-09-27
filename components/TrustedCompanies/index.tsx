import React from 'react';
import styles from './TrustedCompanies.module.scss';
import COMPANIES from './companies.constants';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';

type Props = {
  className?: string;
};

const TrustedCompanies = ({ className }: Props) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <motion.h2
        variants={fadeInSlideLeftVariant}
        initial="hidden"
        whileInView="visible"
        className="text-l text-pink mb-4 text-center font-thin uppercase tracking-wider"
        style={{ color: `var(--color-primary)` }}
      >
        Trusted by companies at
      </motion.h2>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        className={styles.companies}
      >
        {COMPANIES.map((company) => (
          <motion.img
            variants={fadeInSlideInVariant}
            key={company.name}
            src={company.logo}
            alt={`${company.name} logo`}
            className={styles.logo}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TrustedCompanies;
