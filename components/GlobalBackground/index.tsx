'use client';

import styles from './GlobalBackground.module.scss';
import Image from 'next/image';

const GlobalBackground = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/gauze.webp"
        alt="André Rodrigues"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default GlobalBackground;
