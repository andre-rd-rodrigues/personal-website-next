import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './navigator.module.scss';
import type { Heading } from '@/app/[locale]/blog/[slug]/BlogPostClient';

interface ContentNavigatorProps {
  headings: Heading[];
}

const ContentNavigator: React.FC<ContentNavigatorProps> = ({ headings }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;
    setActiveHeadingId(headings[0].id);
  }, [headings]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            setIsVisible(false);
          }
        }, 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const scrollToPosition = absoluteElementTop - 90;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }

    setIsVisible(false);
    setActiveHeadingId(id);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className={styles.picker}
          >
            <ul className={styles.list}>
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={`${styles.listItem} ${heading.id === activeHeadingId ? styles.active : ''}`}
                  onClick={() => handleNavigation(heading.id)}
                >
                  {heading.text}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={toggleVisibility} className={styles.button}>
        <Icon icon="mdi:format-list-bulleted" className="text-3xl" />
      </button>
    </div>
  );
};

export default ContentNavigator;
