'use client';

import { motion } from 'framer-motion';

interface FramerMotionWrapperProps {
  children: React.ReactNode;
  preload?: boolean; // 🔥 미리 mount + visible 제어할지 여부
  inView?: boolean; // 🔥 preload 모드일 때 visible 여부를 외부에서 제어
}

export const FramerMotionWrapper = ({
  children,
  preload = false,
  inView = true, // preload 모드일 때 기본은 보이게
}: FramerMotionWrapperProps) => {
  if (preload) {
    // 🔥 preload 모드: 미리 mount, visible 제어
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        transition={{
          ease: 'easeInOut',
          duration: 2,
          y: { duration: 1 },
        }}
      >
        {children}
      </motion.div>
    );
  }

  // 기본 모드 (whileInView로 동작)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        ease: 'easeInOut',
        duration: 2,
        y: { duration: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};
