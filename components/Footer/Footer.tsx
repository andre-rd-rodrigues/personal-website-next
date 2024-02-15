"use client";
import React from "react";

import styles from "./footer.module.scss";
import { Icon } from "@iconify/react";

import FOOTER_LINKS from "@/constants/footer.constants";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className="flex gap-2">
        {FOOTER_LINKS.map(({ icon, href }, i) => (
          <a href={href} className="app-icon" key={i} target="_blank">
            <Icon fontSize={21} icon={icon} />
          </a>
        ))}
      </div>
      <div id="footer-copyright">&#169; 2022 by André Rodrigo</div>
    </footer>
  );
};

export default Footer;
