'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import ShinyText from '@/components/Animations/ShinyText/ShinyText'

export default function LearningJourney() {
  const projects = [
    {
      title: 'Basic Animations',
      path: 'framermotion/lesson1',
    },
    {
      title: 'Keyframe Animation',
      path: 'framermotion/lesson2',
    },
    {
      title: 'Advanced Transitions',
      path: 'framermotion/lesson3',
    },
  ]

  return (
    <div className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-[#2d6a4f] via-[#52b788] to-[#40916c]  mb-8">
          Learning Motion
        </h1>
        <p className="text-xl text-center text-gray-300 mb-12">
          Explore the animations I created while learning Framer Motion.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href={project.path} className="">
                <div className="rounded-lg hover:bg-white/5 border border-opacity-10 border-white/20 h-full shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-xl font-semibold bg-gradient-to-br from-gray-400 via-gray-100 to-gray-300 text-transparent bg-clip-text mb-2">
                    {project.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="bg-black rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-400 mb-4">
            Want to read about great animations?{' '}
            <span className="text-yellow font-semibold">By Emil Kowal</span>
          </p>
          <Link
            href="https://emilkowal.ski/ui/great-animations"
            className="text-gray-400 hover:text-yellow transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Emil Kowal's{' '}
            <ShinyText
              className="hover:text-yellow/50"
              text="Great Animations"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
