'use client';
import React from 'react';

import styles from './footer.module.scss';

import FOOTER_LINKS from '@/constants/footer.constants';
import { motion } from 'framer-motion';
import { containerVariant } from '@/motion/motionVariants';
import Button from '../Button';

const Footer = () => {
  return (
    <motion.footer
      variants={containerVariant}
      whileInView="visible"
      initial="hidden"
      className={styles.container}
    >
      <div className="flex">
        {FOOTER_LINKS.map(({ icon, href }, i) => (
          <a
            href={href}
            key={i}
            target="_blank"
            rel="noreferrer"
            style={{ transform: 'scale(0.7)' }}
          >
            <Button.Icon icon={icon} />
          </a>
        ))}
      </div>
      <div className="mb-0 flex items-center gap-2 text-sm font-extralight">
        &#169; 2022 by <span className="text-pink">André Rodrigo</span>
      </div>
    </motion.footer>
  );
};

export default Footer;
