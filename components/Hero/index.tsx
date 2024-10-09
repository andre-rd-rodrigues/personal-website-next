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
  textClassName?: string;
  options?: {
    subtitleDelay?: number;
  };
}

// Hero Text Section
const HeroTextSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  className,
  textClassName,
  options,
}) => {
  return (
    <div className={`text-white md:px-20 ${className}`}>
      <AnimatedText.Fade
        text={title}
        className={`mb-4 text-5xl font-light sm:font-extralight md:mb-12 md:w-5/6 md:text-7xl ${textClassName}`}
      />

      <motion.div
        className="md:w-3/5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          ease: [0.35, 0, 0, 1],
          delay: options?.subtitleDelay || 2,
        }}
        viewport={{ once: true }}
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
      viewport={{ once: true }}
      whileInView="visible"
      className="relative h-full rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 p-9 shadow-lg backdrop-blur-[40px] md:px-12 md:py-16"
    >
      <AnimatedText.Fade
        text={text}
        className="mb-8 text-center text-4xl font-light sm:font-extralight"
      />
      <motion.div variants={fadeInSlideLeftVariant} className="text-center">
        {cta}
      </motion.div>
    </motion.div>
  );
};

type FlipWordsProps = {
  children: ReactNode;
  className?: string;
};

export function HeroFlipWords({ children, className }: FlipWordsProps) {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      viewport={{ once: true }}
      whileInView="visible"
      className={`relative flex h-full items-center rounded-lg border border-gray-800 bg-gray-800 bg-opacity-10 p-9 shadow-lg backdrop-blur-[40px] md:px-12 md:py-20 ${className}`}
    >
      <div className="mx-auto text-center text-4xl font-light sm:text-start sm:font-extralight">
        {children}
      </div>
    </motion.div>
  );
}

const HeroSection = {
  Text: HeroTextSection,
  Cta: HeroCtaSection,
  FlipWords: HeroFlipWords,
};

export default HeroSection;
