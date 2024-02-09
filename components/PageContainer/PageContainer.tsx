import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./pagecontainer.module.scss";
import { containerVariant } from "@/motion/motionVariants";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className
}) => {
  return (
    <main className={`${styles.container} ${className}`}>
      <motion.div
        variants={containerVariant as Variants} // Add type assertion for variants
        whileInView="visible"
        initial="hidden"
        className={styles.wrapper}
      >
        {children}
      </motion.div>
    </main>
  );
};

export default PageContainer;
