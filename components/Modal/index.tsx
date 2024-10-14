import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ICONS from '@/constants/icons.constants';
import { Icon } from '@iconify/react';
import useIsMobile from '@/hooks/useIsMobile';

interface Props {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onHide, children }: Props) => {
  const isMobile = useIsMobile(767);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    // Close the modal if dragged down sufficiently or with enough velocity
    if (info.point.y > 1700 || info.velocity.y > 765) {
      onHide();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          onClick={onHide}
        >
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.2, type: 'linear' },
              },
              exit: {
                opacity: 0,
                transition: { duration: 0.1, type: 'linear' },
              },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileInView="visible"
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full rounded-t-3xl border border-gray-800 bg-gray-800 bg-opacity-10 px-8 pb-8 ${isMobile || 'pt-8'} backdrop-blur-3xl sm:max-w-7xl sm:rounded-lg sm:shadow-lg`}
          >
            {isMobile && (
              <Icon
                icon={ICONS.drag}
                fontSize={35}
                color="grey"
                className="mx-auto mb-4"
              />
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
