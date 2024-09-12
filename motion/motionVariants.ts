import { motion, useScroll, useTransform } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Homepage
const homepageDelayVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
};

//Work page
const workPageHeaderContent = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      delay: 0.2
    }
  }
};

const fadeInVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2
    }
  }
};

const fadeInSlideInVariant = {
  hidden: {
    opacity: 0,
    y: -50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1.5,
      bounce: 0.5
    }
  }
};

const fadeInSlideLeftVariant = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.4,
      ease: ""
    }
  }
};

const rotateScaleVariant = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: 200
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export {
  containerVariant,
  fadeInVariant,
  motion,
  useScroll,
  homepageDelayVariant,
  workPageHeaderContent,
  useTransform,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
  rotateScaleVariant
};
