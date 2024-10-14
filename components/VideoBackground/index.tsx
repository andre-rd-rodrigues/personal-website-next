'use client';

import React from 'react';
import styles from './VideoBackground.module.scss';

type VideoBackgroundProps = {
  src: string;
  placeholder?: string;
  children: React.ReactNode;
};

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, children }) => {
  return (
    <div className={styles.container}>
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

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default VideoBackground;
