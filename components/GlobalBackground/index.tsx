'use client';

import styles from './GlobalBackground.module.scss';
import Image from 'next/image';

const GlobalBackground = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/gauze.webp"
        alt="André Rodrigo"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default GlobalBackground;
