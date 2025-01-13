'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Transition from '@/components/layout/Transition'
import WebGLBackground from '@/components/shader/WebglBackground'
import useLenis from '@/hooks/useLenis'

export default function Home() {
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
      <div className="relative min-h-screen" onMouseMove={handleMouseMove}>
        <WebGLBackground mousePosition={mousePosition}>
          <div className="flex flex-col min-h-screen justify-center items-center p-4 text-white">
            <motion.div
              className="mb-8 sm:mb-12 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ y }}
            >
              <div className="flex flex-wrap justify-center items-baseline">
                {nameArray.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05, color: '#ffffff' }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className={`inline-block text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter mr-2 sm:mr-4 bg-gradient-to-br from-white via-slate-400 to-slate-100 bg-clip-text text-transparent ${
                      index === 1
                        ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl align-top mt-1 sm:mt-2 md:mt-3 lg:mt-4'
                        : ''
                    }`}
                    style={{
                      lineHeight: '0.9',
                      textShadow: '0 0 10px rgba(255,255,255,0.3)',
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-1 bg-green-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                  filter: 'blur(4px)',
                  opacity: 0.7,
                }}
              />
            </motion.div>
            <motion.div
              className="mb-16 sm:mb-24 md:mb-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <motion.p
                className="text-white text-lg sm:text-xl font-light tracking-widest text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                Web Developer & Designer
              </motion.p>
            </motion.div>
          </div>
          <div className="h-12 bg-gradient-to-b from-transparent via-black to-black flex items-center justify-center overflow-hidden"></div>
        </WebGLBackground>
        <div className="min-h-screen">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center mt-8 sm:mt-12 md:mt-16 lg:mt-20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Hey there
          </motion.h2>
        </div>
      </div>
      <div className="min-h-screen bg-black"></div>
    </Transition>
  )
}
