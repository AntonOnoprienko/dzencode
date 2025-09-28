'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export const AnimationWrapper: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const pageVariants = {
    initial: { opacity: 0, x: 50, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.98 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.4,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
