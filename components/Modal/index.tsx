import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInSlideInVariant } from '@/motion/motionVariants';
import { Icon } from '@iconify/react';
import ICONS from '@/constants/icons.constants';

interface Props {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onHide, children }: Props) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onHide}
        >
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            variants={fadeInSlideInVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileInView="visible"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
            className="border-1 relative w-full max-w-4xl rounded-lg border-gray-500 border-opacity-20 bg-gray-800 bg-opacity-10 p-8 shadow-lg backdrop-blur-[40px]"
          >
            <motion.div onClick={onHide} className="00 flex justify-end">
              <Icon
                icon={ICONS.close}
                fontSize={40}
                className="cursor-pointer"
              />
            </motion.div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
