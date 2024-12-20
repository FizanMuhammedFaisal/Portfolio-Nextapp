'use client'
import { motion, Variants } from 'motion/react'
import React from 'react'
import Header from '../Header'
interface TransitionProps {
  children: React.ReactNode
  variants?: Variants
  includeHeader?: boolean
}

function Transition({ children, variants, includeHeader }: TransitionProps) {
  const defaultVariants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }
  const animVariants = variants || defaultVariants
  return (
    <div>
      {!includeHeader ? <Header /> : ''}

      <motion.div
        key="transition"
        initial="initial"
        animate={'enter'}
        exit="exit"
        variants={animVariants}
      >
        {includeHeader ? <Header /> : ''}
        {children}
      </motion.div>
    </div>
  )
}

export default Transition
