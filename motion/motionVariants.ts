import { motion, useScroll, useTransform } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export {
  containerVariant,
  fadeInVariant,
  motion,
  useScroll,
  homepageDelayVariant,
  workPageHeaderContent,
  useTransform
};
