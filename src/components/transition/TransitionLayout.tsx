'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface TransitionLayoutProps {
  children: React.ReactNode
}

const pageVariants = {
  initial: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.9,
}

export const TransitionLayout: React.FC<TransitionLayoutProps> = ({
  children,
}) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
