"use client";
import React from "react";

import styles from "./footer.module.scss";
import { Icon } from "@iconify/react";
import FOOTER_LINKS from "@/constants/footer.constants";
import { motion } from "framer-motion";
import { containerVariant, rotateScaleVariant } from "@/motion/motionVariants";

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
          <motion.a
            variants={rotateScaleVariant}
            whileInView="visible"
            whileHover="hover"
            initial="hidden"
            href={href}
            key={i}
            target="_blank"
          >
            <Icon fontSize={21} icon={icon} />
          </motion.a>
        ))}
      </div>
      <div id="footer-copyright">&#169; 2022 by André Rodrigo</div>
    </motion.footer>
  );
};

export default Footer;
