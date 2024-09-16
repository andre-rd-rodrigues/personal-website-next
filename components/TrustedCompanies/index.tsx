import React from 'react';
import styles from './TrustedCompanies.module.scss';
import COMPANIES from './companies.constants';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
} from '@/motion/motionVariants';

const TrustedCompanies = () => {
  return (
    <div className={styles.container}>
      <h2 className="text-uppercase text-l mb-4 text-center font-thin tracking-wider text-pink">
        Trusted by companies at
      </h2>
      <motion.div variants={containerVariant} className={styles.companies}>
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
