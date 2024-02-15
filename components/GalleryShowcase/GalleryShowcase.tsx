import React, { ReactNode } from "react";
import styles from "./gallery.module.scss";
import { fadeInVariant, motion } from "@/motion/motionVariants";
import { get_homepage_gallery } from "@/data/info.data";

interface GalleryShowcaseProps {
  children: ReactNode;
}

const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({ children }) => {
  const images = get_homepage_gallery();

  return (
    <motion.div
      variants={fadeInVariant}
      initial="hidden"
      animate="visible"
      className={styles.layer}
    >
      <div className={styles.container}>
        <div className={styles.background}>
          {images.map((src, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `linear-gradient(#21212170, #21212170), url(${src})`
              }}
            />
          ))}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </motion.div>
  );
};

export default GalleryShowcase;
