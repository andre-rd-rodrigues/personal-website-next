import React from 'react';
import styles from './TrustedCompanies.module.scss';
import COMPANIES from './companies.constants';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';
import Section from '../Section';

const TrustedCompanies = () => {
  return (
    <Section>
      <div className={styles.container}>
        <motion.h2
          variants={fadeInSlideLeftVariant}
          initial="hidden"
          whileInView="visible"
          className="text-uppercase text-l mb-4 text-center font-thin tracking-wider text-pink"
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
    </Section>
  );
};

export default TrustedCompanies;
