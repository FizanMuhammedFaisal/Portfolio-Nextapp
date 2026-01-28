'use client'

import { useHeader } from '@/context/HeaderContext'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

function Page() {
  const { setHeaderColor } = useHeader()

  useEffect(() => {
    setHeaderColor('text-emerald-500')
    return () => setHeaderColor('text-white')
  }, [setHeaderColor])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 pt-32 pb-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Learnings
          </h1>
          <p className="text-lg text-white/70 font-light leading-relaxed mb-12">
            Documenting my journey through web development and animation.
          </p>
        </motion.div>

        {/* Framer Motion Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <Link
            href="/learnings/motion"
            className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light text-white group-hover:text-yellow-100 transition-colors mb-2">
                    Framer Motion
                  </h2>
                  <p className="text-sm text-yellow-400/70">
                    Interactive Animations
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-yellow-400/60 group-hover:text-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>

              <p className="text-white/60 font-light leading-relaxed mb-6">
                Deep dive into Framer Motion - from basic animations to advanced
                gesture controls, spring physics, and layout animations.
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400/90 font-light">
                  Animations
                </span>
                <span className="px-3 py-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400/90 font-light">
                  Gestures
                </span>
                <span className="px-3 py-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400/90 font-light">
                  Spring Physics
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Page
