'use client'
import WebGLBackground from '@/components/shader/WebglBackground'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import useLenis from '@/hooks/useLenis'

export default function Home() {
  useLenis()
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerY = useTransform(scrollY, [0, 100], [0, -20])

  const posts = [
    {
      title: 'Caching Strategies',
      slug: '/blog/caching-strategies',
      excerpt:
        'Discover techniques for creating sleek, professional UI components for modern web applications.',
      date: 'April 22, 2023',
      readTime: '7 min read',
      author: 'Fizan',
    },
    {
      title: 'Getting Started with WebGL in Next.js',
      slug: '/blog/first',
      excerpt:
        'Learn how to implement stunning WebGL backgrounds in your Next.js applications.',
      date: 'May 8, 2023',
      readTime: '5 min read',
      author: 'Fizan',
    },
  ]
  // ;[0.0, 0.0, 0.23]
  // [0.00, 0.55, 0.00]
  // Noise Scale: 0.5

  const [baseColor1] = useState<[number, number, number]>([0.0, 0.0, 0.18])
  const [baseColor2] = useState<[number, number, number]>([0.0, 0.35, 0.0])
  const [noiseScale] = useState(1.0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15 } },
  }

  return (
    <WebGLBackground
      // baseColor1={baseColor1}
      // baseColor2={baseColor2}
      noiseScale={noiseScale}
    >
      <main className="min-h-screen pt-28 font-sans">
        <motion.header
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
          className="py-6 mb-6"
        >
          <div className="max-w-3xl mx-auto px-4">
            <motion.div
              className="backdrop-blur-xl bg-black/30 rounded-xl p-6 shadow-xl border border-white/10 hover:border-white/15 transition-all duration-500"
              initial={{ opacity: 0, y: 5 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              whileHover={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
                transition: { duration: 0.3 },
              }}
            >
              <motion.h1
                className="text-3xl font-light tracking-tight mb-3 text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.3, type: 'spring' }}
              >
                I'm a Developer, Optimist & Community Builder
              </motion.h1>
              <motion.p
                className="text-base text-white/70 font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
              >
                Welcome to my digital garden where I share my thoughts,
                projects, and experiences.
              </motion.p>
            </motion.div>
          </div>
        </motion.header>

        <section className="max-w-3xl mx-auto px-4 pb-12">
          <motion.div
            className="backdrop-blur-xl bg-black/30 rounded-xl p-6 shadow-xl border border-white/10 relative overflow-hidden "
            initial={{
              opacity: 0,
              y: 20,
              boxShadow: '0 0 0px rgba(255, 255, 255, 0)',
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              type: 'spring',
              damping: 20,
            }}
            whileHover={{
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.07)',
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            <motion.div
              className="flex items-center mb-5 border-b pb-3 border-white/15"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <span className="bg-white/10 w-1 h-5 mr-2 rounded-sm"></span>
              <h2 className="text-xl font-light tracking-wide text-white">
                Latest Writing
              </h2>
            </motion.div>

            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={post.slug}
                    className="block p-4 rounded-lg transition-all duration-300 hover:bg-white/5 border hover:border-white/15 border-transparent group backdrop-blur-md relative"
                  >
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-10 pointer-events-none"
                      initial={false}
                      animate={
                        hoveredItem === index
                          ? { opacity: 0.05 }
                          : { opacity: 0 }
                      }
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px]"></div>
                    </motion.div>

                    <motion.h3
                      className="text-lg font-light mb-2 text-white group-hover:text-white/90 transition-colors duration-300"
                      animate={
                        hoveredItem === index
                          ? { scale: 0.99, x: 1 }
                          : { x: 0, scale: 1 }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 17,
                      }}
                    >
                      {post.title}
                    </motion.h3>
                    <p className="text-sm text-white/70 mb-3 line-clamp-2 font-light">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-white/50 space-x-3">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 opacity-70" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 opacity-70" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1 opacity-70" />
                        {post.author}
                      </span>
                      <motion.span
                        className="ml-auto text-xs font-light flex items-center text-white/80 group-hover:text-white transition-colors duration-300"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        Read more <ArrowRight className="w-3 h-3 ml-1" />
                      </motion.span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-6 text-center flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center px-5 py-2 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-all duration-300 text-sm shadow-lg backdrop-blur-md border border-white/10 hover:border-white/20 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">View all posts</span>
                  <motion.span
                    className="relative z-10"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </WebGLBackground>
  )
}

// ;[0.0, 0.0, 0.23]
// [0.00, 0.55, 0.00]
// Noise Scale: 0.5
//the ripple
// Base Color 1: [0.00, 0.00, 0.03]
// Base Color 2: [0.04, 0.14, 0.07]
// Noise Scale: 9.0
