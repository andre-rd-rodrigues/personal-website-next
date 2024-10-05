'use client';

import useIsMobile from '@/hooks/useIsMobile';
import styles from './BgAnimation.module.scss';
import Image from 'next/image';

const BgAnimation = () => {
  const isMobile = useIsMobile();

  return (
    <div className={styles.container}>
      {!isMobile ? (
        <>
          <video width="100%" height="auto" autoPlay loop muted playsInline>
            <source src="/animations/geometry.webm" type="video/webm" />
          </video>
          <div className={styles.hideWaterMark} />
        </>
      ) : (
        <Image
          src="/images/geometry.webp"
          alt="André Rodrigues"
          layout="fill"
          objectFit="contain"
        />
      )}
    </div>
  );
};

export default BgAnimation;
