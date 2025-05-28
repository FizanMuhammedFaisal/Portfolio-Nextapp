'use client'
// #117B58
// #0D5F4B
import { useState } from 'react'
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
  // baseColor1 = [0.0, 0.02, 0.05],
  // baseColor2 = [0.0, 0.4, 0.1],
  // noiseScale = 8.0

  //   baseColor1={[0.0, 0.0, 0.07]}
  // baseColor2={[0.0, 0.5, 0.2]}
  return (
    <Transition>
      <div className="relative " onMouseMove={handleMouseMove}>
        <WebGLBackground
          baseColor1={[0.0, 0.0, 0.0]}
          baseColor2={[0.0, 0.4, 0.35]}
          noiseScale={2.5}
          mousePosition={mousePosition}
        >
          <div className="flex  flex-col min-h-screen justify-center items-center p-4 text-white">
            <motion.div
              className="mb-8 sm:mb-12 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ y }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  color: '#ffffff',
                  transition: {
                    scale: { duration: 1 },
                    color: { duration: 1 },
                  },
                }}
                className="flex flex-wrap justify-center items-baseline"
              >
                {nameArray.map((word, index) => {
                  return (
                    <motion.span
                      key={`${word}-${index}`}
                      initial={{
                        backgroundImage:
                          'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                      }}
                      animate={{
                        backgroundImage:
                          'linear-gradient(to bottom right, #8ea0b8, #F1F5FA, #8ea0b8)',
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        delay: index * 0.3,
                        repeatType: 'reverse',
                      }}
                      className={`inline-block text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold tracking-tight mr-2 sm:mr-4 bg-clip-text text-transparent`}
                      style={{
                        lineHeight: '0.9',
                      }}
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </motion.div>
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
          <div
            className="h-96 flex items-center justify-center overflow-hidden"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)',
            }}
          ></div>
        </WebGLBackground>
      </div>
      <div className="min-h-screen bg-black"></div>
    </Transition>
  )
}
