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
        <div className="flex min-h-screen justify-center items-center p-4 text-white">
          <motion.div className="mb-12 flex gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-medium mb-4 bg-gradient-to-br from-white via-slate-400 to-slate-100 text-transparent bg-clip-text"
            >
              Fizan Muhammed Faisal
            </motion.h1>
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-transparent to-black  h-20"></div>
      <div className="h-screen bg-black"></div>
    </Transition>
  )
}

export default Home
