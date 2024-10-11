'use client';

import React from 'react';
import Image from 'next/image';
import styles from './VideoBackground.module.scss';
import useIsMobile from '@/hooks/useIsMobile';

type VideoBackgroundProps = {
  src: string;
  placeholder: string;
  children: React.ReactNode;
};

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  placeholder,
  children,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={styles.container}>
      {!isMobile ? (
        <video
          className={styles.video}
          width="100%"
          height="auto"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/webm" />
        </video>
      ) : (
        <Image
          src={placeholder}
          alt="Placeholder"
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default VideoBackground;
