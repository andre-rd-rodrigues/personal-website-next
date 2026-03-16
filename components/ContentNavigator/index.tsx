import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './navigator.module.scss';
import type { Heading } from '@/app/[locale]/blog/[slug]/BlogPostClient';

type HeadingGroup = {
  parent: Heading;
  children: Heading[];
};

interface ContentNavigatorProps {
  headings: Heading[];
}

function buildHeadingTree(headings: Heading[]): HeadingGroup[] {
  const groups: HeadingGroup[] = [];
  let current: HeadingGroup | null = null;

  for (const heading of headings) {
    if (heading.level <= 2) {
      current = { parent: heading, children: [] };
      groups.push(current);
    } else if (current) {
      current.children.push(heading);
    } else {
      current = { parent: heading, children: [] };
      groups.push(current);
    }
  }

  return groups;
}

const ContentNavigator: React.FC<ContentNavigatorProps> = ({ headings }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>();
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const groups = useMemo(() => buildHeadingTree(headings), [headings]);

  useEffect(() => {
    if (!headings || headings.length === 0) return;
    queueMicrotask(() => setActiveHeadingId(headings[0].id));
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

  const toggleGroup = (groupId: string) => {
    setExpandedGroupId((prev) => (prev === groupId ? null : groupId));
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

  const isGroupActive = (group: HeadingGroup) =>
    activeHeadingId === group.parent.id ||
    group.children.some((c) => c.id === activeHeadingId);

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
              {groups.map((group) => {
                const hasChildren = group.children.length > 0;
                const isExpanded = expandedGroupId === group.parent.id;
                const groupActive = isGroupActive(group);

                return (
                  <li key={group.parent.id} className={styles.group}>
                    <div
                      className={`${styles.parentItem} ${groupActive ? styles.active : ''}`}
                    >
                      <span
                        className={styles.parentText}
                        onClick={() => handleNavigation(group.parent.id)}
                      >
                        {group.parent.text}
                      </span>
                      {hasChildren && (
                        <button
                          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                          onClick={() => toggleGroup(group.parent.id)}
                          aria-label="Toggle subsections"
                        >
                          <Icon icon="mdi:chevron-down" />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.ul
                          className={styles.childList}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                          {group.children.map((child) => (
                            <li
                              key={child.id}
                              className={`${styles.childItem} ${child.id === activeHeadingId ? styles.active : ''}`}
                              onClick={() => handleNavigation(child.id)}
                            >
                              {child.text}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
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
