'use client'

import { useState, useEffect } from 'react'
import Transition from '@/components/layout/Transition'
import { motion, useScroll, useTransform } from 'framer-motion'
import WebGLBackground from '@/components/shader/WebglBackground'
import useLenis from '@/hooks/useLenis'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useLenis()

  const nameArray = ['Fizan', 'M', 'Faisal']

  return (
    <Transition>
      <div className="relative" onMouseMove={handleMouseMove}>
        <WebGLBackground mousePosition={mousePosition} />
        <div className="flex min-h-screen justify-center items-center p-4 text-white">
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ y }}
          >
            {nameArray.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, color: '#ffffff' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className={`inline-block text-9xl font-extrabold tracking-tighter mr-4 bg-gradient-to-br from-white via-slate-400 to-slate-100 text-transparent bg-clip-text ${
                  index === 1 ? 'text-7xl align-top mt-4' : ''
                }`}
                style={{
                  lineHeight: '0.9',
                  transform: 'scaleY(1.8) scaleX(0.9)',
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.div
              className="absolute -bottom-4 left-0 w-full h-1 blur-sm bg-green-800"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-white text-xl font-light tracking-widest">
            Web Developer & Designer
          </p>
        </motion.div>
      </div>
      <div className="bg-gradient-to-b from-transparent to-black h-20"></div>
      <div className="h-screen bg-black flex items-center justify-center">
        <motion.h2
          className="text-4xl text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          HELLoooo
        </motion.h2>
      </div>
    </Transition>
  )
}

export default Home
