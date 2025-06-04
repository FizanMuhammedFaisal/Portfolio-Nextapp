'use client'

import type React from 'react'
import { motion } from 'motion/react'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Transition from '@/components/layout/Transition'

export default function NotFound() {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hovered: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: 1,
      },
    },
    unhovered: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  }

  const wordVariants = {
    initial: {
      fontWeight: 700,
    },
    hovered: {
      fontWeight: 950,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 10,
        mass: 1,
        ease: 'easeOut',
      },
    },
    unhovered: {
      fontWeight: 700,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Transition>
      <div className="relative">
        <div className="flex flex-col min-h-screen justify-center items-center p-4 text-white">
          <motion.div
            className="mb-8 sm:mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              variants={containerVariants}
              initial="unhovered"
              animate={isHovered ? 'hovered' : 'unhovered'}
              className="flex justify-center items-baseline"
            >
              <motion.span
                variants={wordVariants}
                initial={{
                  backgroundImage:
                    'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                }}
                animate={{
                  backgroundImage: isHovered
                    ? 'linear-gradient(to bottom right, #8ea0b8, #F1F5FA, #8ea0b8)'
                    : 'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                }}
                transition={{
                  backgroundImage: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5,
                    repeatType: 'reverse',
                  },
                }}
                className="inline-block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-bold font-bebas bg-clip-text text-transparent"
                style={{
                  lineHeight: '0.9',
                }}
              >
                404
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
              This page doesn't exist.
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-light">
              But if you think it should... you might be in the wrong website
            </p>
          </motion.div>

          <motion.div
            className="mb-16 sm:mb-24 md:mb-32"
            initial={{ opacity: 0, y: 2, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-light tracking-wide"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                <span>HOME</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div
          className="h-96 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)',
          }}
        ></div>
      </div>

      <div className="min-h-screen bg-black"></div>
    </Transition>
  )
}
