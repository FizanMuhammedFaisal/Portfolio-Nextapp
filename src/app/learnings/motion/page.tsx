'use client'

import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import React from 'react'
import { motion } from 'motion/react'

export default function LearningJourney() {
  const lessons = [
    {
      title: 'Basic Animations',
      path: 'motion/lesson1',
      description: 'Introduction to motion components and simple transitions',
      topics: ['motion.div', 'animate', 'initial'],
    },
    {
      title: 'Keyframe Animation',
      path: 'motion/lesson2',
      description: 'Multi-step animations using keyframe arrays',
      topics: ['keyframes', 'sequences'],
    },
    {
      title: 'Exit Animations',
      path: 'motion/lesson3',
      description: 'Component unmounting with exit transitions',
      topics: ['exit', 'AnimatePresence'],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 pt-32 pb-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <Link
            href="/learnings"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/80 transition-colors mb-6 group"
          >
            <ArrowUpRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Learnings
          </Link>

          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 text-transparent bg-clip-text">
            Learning Motion
          </h1>

          <p className="text-lg text-white/70 font-light leading-relaxed">
            Animations created while learning Framer Motion.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={lesson.path}
                className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 flex flex-col h-full min-h-[240px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6 relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-light text-white group-hover:text-yellow-100 transition-colors">
                      {lesson.title}
                    </h2>
                    <ArrowUpRight className="w-4 h-4 text-yellow-400/60 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <p className="text-sm text-white/60 font-light leading-relaxed mb-6 flex-grow">
                    {lesson.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {lesson.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400/80 font-light font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6"
        >
          <div className="flex items-start gap-4">
            <BookOpen className="w-5 h-5 text-white/40 mt-1" />
            <div>
              <h3 className="text-base font-light text-white mb-2">
                Recommended Reading
              </h3>
              <p className="text-sm text-white/60 font-light mb-3">
                Want to read about great animations?{' '}
                <span className="text-yellow-400">By Emil Kowal</span>
              </p>
              <a
                href="https://emilkowal.ski/ui/great-animations"
                className="group inline-flex items-center gap-2 text-sm text-yellow-400/90 hover:text-yellow-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Great Animations
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
