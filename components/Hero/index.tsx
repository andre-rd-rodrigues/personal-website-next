import {
  containerVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import AnimatedText from '../AnimatedText';

interface HeroSectionProps {
  title: string;
  subtitle: ReactNode;
  className?: string;
}

// Hero Text Section
const HeroTextSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={`text-white md:p-20 ${className}`}>
      <AnimatedText.Fade
        text={title}
        className="mb-4 text-5xl font-extralight md:mb-12 md:w-4/5 md:text-7xl"
      />

      <motion.div
        className="md:w-4/5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.35, 0, 0, 1], delay: 3 }}
      >
        {subtitle}
      </motion.div>
    </div>
  );
};

// CTA
const HeroCtaSection: React.FC<{
  text: string;
  cta: ReactNode;
}> = ({ text, cta }) => {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      className="border-1 relative h-full rounded-lg border-gray-800 bg-gray-800 bg-opacity-10 p-9 shadow-lg backdrop-blur-[40px] md:px-12 md:py-16"
    >
      <AnimatedText.Fade
        text={text}
        className="mb-5 text-center text-4xl font-extralight"
      />
      <motion.div variants={fadeInSlideLeftVariant} className="text-center">
        {cta}
      </motion.div>
    </motion.div>
  );
};

const HeroSection = {
  Text: HeroTextSection,
  Cta: HeroCtaSection,
};

export default HeroSection;
