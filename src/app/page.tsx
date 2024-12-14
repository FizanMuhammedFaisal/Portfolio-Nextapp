'use client'

import Transition from '@/components/layout/Transition'
import { motion } from 'framer-motion'
import React from 'react'
import { Github, Linkedin, Mail, Code, Cpu, Database } from 'lucide-react'

function Home() {
  return (
    <Transition>
      <div className="min-h-screen flex  justify-start items-center p-4 bg-gradient-to-br from-black via-black to-green-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className=" mb-12 flex gap-2"
        >
          <h1 className="text-5xl font-medium mb-4 bg-gradient-to-b from-white via-slate-400 to-slate-100 text-transparent bg-clip-text">
            I'M
          </h1>
          <h1 className="text-5xl font-medium mb-4 bg-gradient-to-br from-white via-slate-400 to-slate-100 text-transparent bg-clip-text">
            Fizan Muhammed Faisal
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        ></motion.div>
      </div>
    </Transition>
  )
}

export default Home
