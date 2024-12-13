'use client'
import { motion, Variants } from 'motion/react'
import React from 'react'
import Header from '../Header'
import './transition.scss'
function Transition({ children }: { children: React.ReactNode }) {
  const anim = (variants: Variants) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants,
    }
  }
  const opacity: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 1 },
  }

  const slide: Variants = {
    initial: { top: '100vh' },
    enter: { top: '100vh' },
    exit: { top: '0', transition: { duration: 1 } },
  }

  const perspective: Variants = {
    initial: { y: 0, scale: 1, opacity: 1 },
    enter: { y: 0, scale: 1, opacity: 1 },
    exit: { y: -100, scale: 0.9, opacity: 0.5, transition: { duration: 1 } },
  }

  return (
    <div className="">
      {/* <motion.div {...anim(slide)} className='slide' /> */}
      {/* <motion.div {...anim(perspective)} className='page'> */}
      <motion.div {...anim(opacity)}> {children}</motion.div>
      {/* </motion.div> */}
    </div>
  )
}

export default Transition
