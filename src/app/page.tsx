'use client'

import Transition from '@/components/layout/Transition'
import { motion } from 'framer-motion'
import React from 'react'

function Home() {
  return (
    <Transition>
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-green-500 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="z-10 text-center"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl font-bold bg-gradient-to-br from-white via-slate-400 to-white bg-clip-text text-transparent"
          >
            Fizan Muhammed Faisal
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-xl mb-8"
          >
            Full-Stack Developer | Problem Solver
          </motion.p>
        </motion.div>
      </div>
    </Transition>
  )
}

export default Home
