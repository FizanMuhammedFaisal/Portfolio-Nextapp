'use client'

import { motion, Variants } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
  variants?: Variants
  transition?: object
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variants = {
    initial: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  },
  transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  },
}) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
