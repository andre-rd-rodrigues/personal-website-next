import {
  fadeInSlideLeftVariant,
  underlineSlideInVariant,
} from '@/motion/motionVariants';
import { motion } from 'framer-motion';
import React from 'react';

interface SectionTitleProps {
  title: string;
  tag?: keyof JSX.IntrinsicElements;
  color?: 'white' | 'primary';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  tag = 'h1',
  color = 'primary',
}) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <div className="relative mb-5">
      <motion.div variants={fadeInSlideLeftVariant}>
        <Tag
          className={`pb-2 text-xl font-thin uppercase tracking-wider`}
          style={{ color: `var(--color-${color})` }}
        >
          {title}
        </Tag>
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
