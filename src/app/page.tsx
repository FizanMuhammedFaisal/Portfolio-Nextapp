// #117B58
// #0D5F4B
'use client'
import { useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Transition from '@/components/layout/Transition'
import WebGLBackground from '@/components/shader/WebglBackground'
import useLenis from '@/hooks/useLenis'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  const [isHovered, setIsHovered] = useState(false)
  useLenis()

  const nameArray = ['Fizan', 'M', 'Faisal']

  // Variants for the parent container, to control children staggering
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
        type: 'spring', // Use a spring animation
        stiffness: 70, // Lower stiffness for a softer, slower, more "gooey" feel
        damping: 10, // Standard damping for a nice subtle bounce
        mass: 1, // Default mass (can adjust to make it feel heavier/lighter)
        ease: 'easeOut', // Easing still applies to how the spring settles
      },
    },
    unhovered: {
      fontWeight: 700, // Return to normal boldness
      transition: {
        type: 'spring', // Use a spring animation for the return
        stiffness: 250, // Higher stiffness for a quicker snap back
        damping: 25, // Higher damping to make it settle faster with less bounce
        mass: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <Transition>
      <div className="relative" onMouseMove={handleMouseMove}>
        <WebGLBackground
          baseColor1={[0.0, 0.0, 0.0]}
          baseColor2={[0.0, 0.4, 0.35]}
          noiseScale={3.5}
          mousePosition={mousePosition}
        >
          <div className="flex flex-col min-h-screen justify-center items-center p-4 text-white">
            <motion.div
              className="mb-8 sm:mb-12 relative"
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ y }}
            >
              <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={containerVariants}
                initial="unhovered"
                animate={isHovered ? 'hovered' : 'unhovered'}
                className="flex flex-wrap justify-center items-baseline"
              >
                {nameArray.map((word, index) => {
                  return (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={wordVariants}
                      initial={{
                        backgroundImage:
                          'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                        fontWeight: 700,
                      }}
                      animate={{
                        backgroundImage: isHovered
                          ? 'linear-gradient(to bottom right, #8ea0b8, #F1F5FA, #8ea0b8)'
                          : 'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                        fontWeight: [700, 700, 900, 700], // Breathe: normal -> bold -> normal
                      }}
                      transition={{
                        backgroundImage: {
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          delay: index * 0.3,
                          repeatType: 'reverse',
                        },
                        fontWeight: {
                          duration: 1.2,
                          delay: 2.5, // Start after all entrance animations
                          times: [0, 0.3, 0.6, 1], // Control keyframe timing
                          ease: 'easeInOut',
                        },
                      }}
                      className={`inline-block text-5xl sm:text-6xl md:text-8xl lg:text-[6rem] xl:text-[6rem] font-bold font-bebas mr-2 sm:mr-4 bg-clip-text text-transparent`}
                      style={{
                        lineHeight: '0.9',
                      }}
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </motion.div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.h2
                className="text-sm sm:text-xl font-light tracking-[0.4em] text-white/70 uppercase"
                initial={{ opacity: 0, y: 20, letterSpacing: '0.6em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
                transition={{
                  duration: 1,
                  delay: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Software Engineer
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.7,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <Link
                  href="/blog"
                  className="group relative px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-medium tracking-[0.2em] rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-3"
                >
                  <span className="relative z-10">READ MY THOUGHTS</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                <Link
                  href="/about"
                  className="text-white/50 hover:text-white/80 text-xs tracking-wider transition-colors"
                >
                  About
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </WebGLBackground>
      </div>
    </Transition>
  )
}
// baseColor1 = [0.0, 0.02, 0.05],
// baseColor2 = [0.0, 0.4, 0.1],
// noiseScale = 8.0

//   baseColor1={[0.0, 0.0, 0.07]}
// baseColor2={[0.0, 0.5, 0.2]}
