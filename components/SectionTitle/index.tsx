import {
  fadeInSlideLeftVariant,
  underlineSlideInVariant,
} from '@/motion/motionVariants';
import { motion } from 'framer-motion';
import React, { type ElementType } from 'react';

interface SectionTitleProps {
  title: string;
  tag?: ElementType;
  color?: 'white' | 'primary';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  tag: Tag = 'h1',
  color = 'primary',
}) => {
  const Component = Tag;

  return (
    <div className="relative mb-5">
      <motion.div variants={fadeInSlideLeftVariant}>
        <Component
          className={`pb-2 text-xl font-light uppercase tracking-wider`}
          style={{ color: `var(--color-${color})` }}
        >
          {title}
        </Component>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ height: 1, backgroundColor: `var(--color-${color})` }}
        variants={underlineSlideInVariant}
        initial="hidden"
        whileInView="visible"
      />
    </div>
  );
};

export default SectionTitle;
