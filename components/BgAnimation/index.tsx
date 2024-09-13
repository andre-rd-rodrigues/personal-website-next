'use client';
import { Player } from '@lottiefiles/react-lottie-player';
import styles from './BgAnimation.module.scss';

const BgAnimation = () => {
  return (
    <Player
      autoplay
      loop
      keepLastFrame
      src="/animations/geometry.json"
      className={styles.container}
      speed={0.5}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
    />
  );
};

export default BgAnimation;
