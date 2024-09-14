import { motion, useScroll, useTransform } from 'framer-motion';

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Homepage
const homepageDelayVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

//Work page
const workPageHeaderContent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: 0.2,
    },
  },
};

const fadeInVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
    },
  },
};

const fadeInSlideInVariant = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.35, 0, 0, 1], // ease-smooth
    },
  },
};

const fadeInSlideLeftVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.35, 0, 0, 1],
    },
  },
};

const rotateScaleVariant = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: 200,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const slowRotateVariant = {
  rotate: [0, 360],
  transition: {
    duration: 8,
    ease: 'linear',
    repeat: Infinity,
  },
};

const scaleSpringVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.4,
    },
  },
};

const getAttentionVariant = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 0.6,
        ease: 'easeInOut',
        repeatDelay: 1,
      },
      rotate: {
        repeat: Infinity,
        duration: 0.6,
        ease: 'easeInOut',
        repeatDelay: 1,
      },
    },
  },
  hover: {
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const underlineSlideInVariant = {
  hidden: {
    width: '0%',
    opacity: 0.5,
    transition: {
      duration: 1,
      ease: [0.35, 0, 0, 1],
    },
  },
  visible: {
    width: '100%',
    opacity: 0.5,
    transition: {
      duration: 1,
      ease: [0.35, 0, 0, 1],
      delay: 0.3,
    },
  },
};

export {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  fadeInVariant,
  getAttentionVariant,
  homepageDelayVariant,
  motion,
  rotateScaleVariant,
  scaleSpringVariant,
  slowRotateVariant,
  useScroll,
  useTransform,
  workPageHeaderContent,
  underlineSlideInVariant,
};
