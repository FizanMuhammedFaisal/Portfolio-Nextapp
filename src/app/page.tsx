// #117B58
// #0D5F4B
'use client'
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
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
                      }}
                      animate={{
                        backgroundImage: isHovered
                          ? 'linear-gradient(to bottom right, #8ea0b8, #F1F5FA, #8ea0b8)'
                          : 'linear-gradient(to bottom right, #ffffff, #8ea0b8, #ffffff)',
                      }}
                      transition={{
                        backgroundImage: {
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          delay: index * 0.3,
                          repeatType: 'reverse',
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
              className="mb-16 sm:mb-24 md:mb-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <motion.p
                className="text-white text-sm sm:text-lg font-light tracking-widest text-center"
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
// baseColor1 = [0.0, 0.02, 0.05],
// baseColor2 = [0.0, 0.4, 0.1],
// noiseScale = 8.0

//   baseColor1={[0.0, 0.0, 0.07]}
// baseColor2={[0.0, 0.5, 0.2]}
