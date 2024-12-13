'use client'
import { motion, AnimatePresence, Variants } from 'motion/react'
import React, { useEffect } from 'react'
import { useTransition } from '@/context/TransitionContext'
interface TransitionProps {
  children: React.ReactNode
  variants?: Variants
  exitDuration?: number
}

function Transition({ children, variants, exitDuration }: TransitionProps) {
  const { isExiting, setExitDuration } = useTransition()
  // Default animation variants (opacity effect)
  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }
  exitDuration ? setExitDuration(exitDuration) : ''
  const animVariants = variants || defaultVariants

  const anim = {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants: animVariants,
  }

  useEffect(() => {
    console.log('isExiting', isExiting)
  }, [isExiting])

  return (
    <div className="transition-container">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="transition"
            initial="initial"
            animate={isExiting ? 'exit' : 'enter'}
            exit="exit"
            variants={animVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Transition
