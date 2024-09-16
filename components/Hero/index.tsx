import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  containerVariant,
  fadeInSlideInVariant,
  fadeInSlideLeftVariant,
} from '@/motion/motionVariants';

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
      <h3 className="mb-4 text-5xl font-extralight md:mb-12 md:w-4/5 md:text-7xl">
        {title}
      </h3>
      <div className="md:w-4/5">{subtitle}</div>
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
      className="border-1 relative h-full rounded-lg border-gray-800 bg-gray-800 bg-opacity-10 p-9 shadow-lg backdrop-blur-[40px] md:p-12"
    >
      <motion.h4
        variants={fadeInSlideInVariant}
        className="mb-5 text-center text-2xl font-extralight"
      >
        {text}
      </motion.h4>
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
