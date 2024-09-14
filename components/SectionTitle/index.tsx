import {
  fadeInSlideLeftVariant,
  underlineSlideInVariant,
} from '@/motion/motionVariants';
import { motion } from 'framer-motion';
import React from 'react';

interface SectionTitleProps {
  title: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, tag = 'h1' }) => {
  const Tag = tag;

  return (
    <div className="relative mb-5 text-white">
      <motion.div variants={fadeInSlideLeftVariant}>
        <Tag className="text-uppercase pb-2 text-xl font-thin tracking-wider">
          {title}
        </Tag>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 bg-white"
        style={{ opacity: 0.5, height: 1 }}
        variants={underlineSlideInVariant}
        initial="hidden"
        whileInView="visible"
      />
    </div>
  );
};

export default SectionTitle;
