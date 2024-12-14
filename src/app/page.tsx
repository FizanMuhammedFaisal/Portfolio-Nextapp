'use client'

import Transition from '@/components/layout/Transition'
import { motion, Variants } from 'framer-motion'
import React from 'react'

function Home() {
  // Fancy animation for individual text letters
  const letterAnimation: Variants = {
    initial: { y: 100, opacity: 0, rotate: -45 },
    animate: (index: number) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { delay: index * 0.1, duration: 0.8, ease: 'easeOut' },
    }),
  }

  const pageAnimation: Variants = {
    initial: { opacity: 1, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  }

  // Background shapes animation
  const shapeAnimation: Variants = {
    initial: { opacity: 0, scale: 0 },
    animate: (index: number) => ({
      opacity: 0.2,
      scale: 2,
      transition: { delay: index * 0.5, duration: 3, ease: 'easeInOut' },
    }),
  }

  // Text content
  const title = 'Fizan Muhammed Faisal'
  const description = 'Full-Stack Developer | Problem Solver'

  return (
    <Transition variants={pageAnimation}>
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-black text-green-500 overflow-hidden">
        {/* Background Shapes */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            variants={shapeAnimation}
            custom={index}
            initial="initial"
            animate="animate"
            className="absolute w-96 h-96 bg-gradient-to-br from-green-400 to-purple-500 rounded-full blur-3xl"
          />
        ))}

        {/* Title Animation */}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          className="z-10 text-center"
        >
          <h1 className="text-4xl font-bold flex space-x-2">
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterAnimation}
                className="inline-block bg-gradient-to-br from-white via-slate-400 to-white bg-clip-text text-transparent"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
            className="text-xl mt-4"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </Transition>
  )
}

export default Home
