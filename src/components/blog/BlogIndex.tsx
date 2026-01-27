'use client'

import WebGLBackground from '@/components/shader/WebglBackground'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import useLenis from '@/hooks/useLenis'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    readTime?: string
    author?: string
  }
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  useLenis()

  const [baseColor1] = useState<[number, number, number]>([0.0, 0.0, 0.06])
  const [baseColor2] = useState<[number, number, number]>([0.0, 0.45, 0.38])
  const [noiseScale] = useState(1.5)
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerY = useTransform(scrollY, [0, 100], [0, -20])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { damping: 15 } },
  }

  return (
    <WebGLBackground
      baseColor1={baseColor1}
      baseColor2={baseColor2}
      noiseScale={noiseScale}
    >
      <main className="min-h-screen pt-28 font-sans">
        <motion.header
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
          className="py-6 mb-6"
        >
          <div className="max-w-2xl mx-auto px-4">
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
              <div className="flex justify-between items-start">
                <motion.h1
                  className="text-2xl sm:text-3xl font-light tracking-tight mb-3 text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.3, type: 'spring' }}
                >
                  Blog
                </motion.h1>
              </div>
              <motion.p
                className="text-xs sm:text-sm text-white/60 font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.3, type: 'spring' }}
              >
                Welcome to my Blog where I share my thoughts, projects, and
                experiences.
              </motion.p>
            </motion.div>
          </div>
        </motion.header>

        <section className="max-w-2xl mx-auto px-4 pb-12">
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
              className="flex items-center mb-5 border-b pb-3 border-white/15"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <span className="bg-white/10 w-1 h-5 mr-2 rounded-sm"></span>
              <h2 className="text-lg font-light tracking-wide text-white">
                Latest Writing
              </h2>
            </motion.div>

            <motion.ul className="space-y-4">
              {posts.map((post, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={post.slug}
                    className="block p-4 rounded-lg transition-all hover:bg-white/5 border hover:border-white/15 border-transparent group backdrop-blur-md relative"
                  >
                    <motion.h3
                      className="text-sm font-light mb-2 text-white group-hover:text-white/90 transition-colors"
                      animate={
                        hoveredItem === index
                          ? { scale: 0.99, x: 2 }
                          : { x: 0, scale: 1 }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 17,
                      }}
                    >
                      {post.metadata.title}
                    </motion.h3>
                    <motion.p
                      className="text-xs text-white/70 mb-3 line-clamp-2 font-light"
                      animate={
                        hoveredItem === index ? { x: 2 } : { x: 0, scale: 1 }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 17,
                      }}
                    >
                      {post.metadata.summary}
                    </motion.p>
                    <div className="flex flex-wrap items-center text-tiny text-white/50 space-x-3">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 opacity-70" />
                        {post.metadata.publishedAt}
                      </span>
                      {/* ReadTime and Author can be added to frontmatter if desired */}
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </section>
      </main>
    </WebGLBackground>
  )
}
