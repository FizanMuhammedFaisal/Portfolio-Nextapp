'use client'

import Transition from '@/components/layout/Transition'
import type { Variants } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectsPage() {
  const customSlide: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <Transition variants={customSlide}>
      <div className="min-h-screen bg-black text-white">
        {/* Subtle top navigation */}

        <nav className="fixed top-0 w-full mt-20 z-10 backdrop-blur-sm bg-black/40 border-b border-white/5">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <header>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-3">
                Projects
              </h1>
              <p className="text-sm text-white/60 max-w-md font-light tracking-wide">
                A curated collection of work showcasing my approach to design
                and development.
              </p>
            </header>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Link
                href="/projects/learnings"
                className="group flex items-center text-lg font-light tracking-wide text-white/80 hover:text-white transition-colors duration-300"
              >
                Check out my Learnings
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto pt-72 pb-20 px-6">
          {/* Project grid with subtle glass effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative h-[400px] overflow-hidden rounded-sm backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-white/50 font-light tracking-wider">
                      0{item}
                    </span>
                    <h3 className="text-xl font-light tracking-wide text-white group-hover:text-white transition-colors duration-300">
                      Project {item}
                    </h3>
                  </div>

                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-white/70 text-sm font-light mb-6 leading-relaxed">
                      A sophisticated project demonstrating attention to detail
                      and technical excellence.
                    </p>

                    <div className="flex justify-between items-end">
                      <div className="flex space-x-3">
                        <span className="text-xs text-white/40 font-light">
                          React
                        </span>
                        <span className="text-xs text-white/40 font-light">
                          TypeScript
                        </span>
                      </div>
                      <button className="text-xs border-b border-white/30 pb-0.5 text-white/70 hover:text-white hover:border-white/70 transition-colors duration-300">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Transition>
  )
}
