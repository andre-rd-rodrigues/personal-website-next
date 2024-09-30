import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Underline } from '../ui/underline';

interface FadeProps {
  text: string;
  className?: string;
  letter?: boolean;
  underline?: boolean;
}

const Fade = ({ text, className, letter, underline }: FadeProps) => {
  const words = text.split(' ');
  const letters = text.split('');
  const data = letter ? letters : words;

  return (
    <div className={`${className}`}>
      {data.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: index * 0.13,
            ease: [0.35, 0, 0, 1],
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            fontFamily: 'var(--font-jost)',
          }}
        >
          {word}
        </motion.span>
      ))}
      {underline && <Underline />}
    </div>
  );
};

interface ReplaceWordProps {
  words: string[];
  className?: string;
}

const ReplaceWord = ({ words, className }: ReplaceWordProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(timer);
  }, [words]);

  const currentWord = words[index];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-block' }}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const AnimatedText = {
  Fade,
  ReplaceWord,
};

export default AnimatedText;
