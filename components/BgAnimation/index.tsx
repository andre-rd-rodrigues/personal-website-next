import styles from './BgAnimation.module.scss';

const BgAnimation = () => {
  return (
    <div className={styles.container}>
      <video width="100%" height="auto" autoPlay loop>
        <source src="/animations/geometry.webm" type="video/webm" />
      </video>
      <div className={styles.hideWaterMark} />
    </div>
  );
};

export default BgAnimation;
