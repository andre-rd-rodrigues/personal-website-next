import React from "react";

import styles from "./techstack.module.scss";
import Image from "next/image";
import { techStack } from "@/data/info.data";

const TechStack = () => {
  return (
    <div className={styles.section}>
      <h2>Tech Stack</h2>
      <div className={styles.container}>
        {techStack.map(({ label, img_src }) => (
          <div key={label} className={styles.techSection}>
            <div>
              <Image
                src={img_src}
                alt={label}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
