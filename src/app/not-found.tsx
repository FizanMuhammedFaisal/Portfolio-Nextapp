'use client'

import type React from 'react'
import { motion } from 'motion/react'
import { Home } from 'lucide-react'
import Link from 'next/link'
import Transition from '@/components/layout/Transition'

export default function NotFound() {
  return (
    <Transition>
      <div className="relative">
        <div className="flex flex-col min-h-screen justify-center items-center p-4 text-white bg-black">
          <motion.div
            className="mb-8 sm:mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className="inline-block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-bold font-bebas text-white"
              style={{
                lineHeight: '0.9',
              }}
            >
              404
            </motion.span>
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
      </div>
    </Transition>
  )
}
