'use client'
import { motion, AnimatePresence, Variants } from 'motion/react'
import React, { useEffect } from 'react'
import { useTransition } from '@/context/TransitionContext'
import Header from '../Header'
interface TransitionProps {
  children: React.ReactNode
  variants?: Variants
  exitDuration?: number
  includeHeader?: boolean
}

function Transition({
  children,
  variants,
  exitDuration,
  includeHeader,
}: TransitionProps) {
  const { isExiting, setExitDuration } = useTransition()
  // Default animation variants (opacity effect)
  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }
  exitDuration ? setExitDuration(exitDuration) : ''
  const animVariants = variants || defaultVariants
  return (
    <div className="transition-container">
      {!includeHeader ? <Header /> : ''}
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="transition"
            initial="initial"
            animate={isExiting ? 'exit' : 'enter'}
            exit="exit"
            variants={animVariants}
          >
            {includeHeader ? <Header /> : ''}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Transition
