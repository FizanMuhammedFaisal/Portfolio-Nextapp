'use client'

import { useState } from 'react'
import Transition from '@/components/layout/Transition'
import { motion } from 'framer-motion'
import WebGLBackground from '@/components/shader/WebglBackground'
import useLenis from '@/hooks/useLenis'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  useLenis()
  return (
    <Transition>
      <div className="relative" onMouseMove={handleMouseMove}>
        <WebGLBackground mousePosition={mousePosition} />
        <div className="flex min-h-screen justify-start items-center p-4 text-white">
          <motion.div className="mb-12 flex gap-2">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 10,
              }}
              className="text-5xl font-medium mb-4 bg-gradient-to-b from-white via-slate-400 to-slate-100 text-transparent bg-clip-text"
            >
              I'M
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 10,
                delay: 1.1,
              }}
              className="text-5xl font-medium mb-4 bg-gradient-to-br from-white via-slate-400 to-slate-100 text-transparent bg-clip-text"
            >
              Fizan Muhammed Faisal
            </motion.h1>
          </motion.div>
        </div>
      </div>
      <div className="h-screen bg-black"></div>
    </Transition>
  )
}

export default Home
