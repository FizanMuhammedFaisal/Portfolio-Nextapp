'use client'

import { motion } from 'motion/react'
import { Github, ExternalLink, Mail, Twitter } from 'lucide-react'
import Transition from '@/components/layout/Transition'
import useLenis from '@/hooks/useLenis'
import Image from 'next/image'
import WebGLBackground from '@/components/shader/WebglBackground'

function Page() {
  useLenis()

  const technologies = [
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
    { name: 'Three.js', category: 'Graphics' },
  ]

  return (
    <Transition>
      {/* WebGL Background - Top 30% */}
      <WebGLBackground
        baseColor1={[0.0, 0.0, 0.0]}
        baseColor2={[0.0, 0.25, 0.28]}
        noiseScale={0.5}
      >
        <div className="h-[20vh] flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-medium mt-20">About Me</h1>
            <p className="text-gray-400 mt-2">
              A story of growth and discovery
            </p>
          </motion.div>
        </div>
        <div
          className="h-11 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)',
          }}
        ></div>
      </WebGLBackground>
      {/* Main Content */}
      <div className="relative min-h-screen bg-black text-white">
        {/* Header Section */}

        {/* Main Content Section */}
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left Column - Photo */}
            <motion.div
              className="w-full md:w-2/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/profile.png"
                alt="profile"
                width={250}
                height={250}
                className="rounded-full"
              />
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              className="w-full md:w-3/5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-medium mb-6">
                Fizan Muhammed Faisal
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Full-stack Developer & Creative Technologist
              </p>

              <div className="space-y-6 text-gray-300">
                <p>
                  Hello! I'm a passionate developer with a keen interest in
                  creating beautiful and functional web experiences. With a
                  background in cutting-edge technologies and a love for clean,
                  efficient code, I bring a unique perspective to every project
                  I work on.
                </p>
                <p>
                  My journey in the world of development has been driven by
                  curiosity and a constant desire to learn. I thrive on
                  challenges and am always excited to explore new technologies
                  that can enhance user experiences and solve complex problems.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest in
                  web technologies, contributing to open-source projects, or
                  sharing knowledge with the developer community.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <motion.a
                  href="https://github.com/fizanmuhammedfaisal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="fizanmuhammedfaisal.k@gmail.com"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                </motion.a>
                <motion.a
                  href="https://x.com/fizan_faisal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Technologies Section */}
          {/* <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-medium mb-8">
              Technologies I Work With
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="bg-gray-900 border border-gray-800 p-4 rounded-md"
                  whileHover={{
                    borderColor: '#10B981',
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.6 + index * 0.05, duration: 0.4 },
                  }}
                >
                  <div className="text-xs text-green-500 mb-1">
                    {tech.category}
                  </div>
                  <div className="text-gray-200">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>
      </div>
    </Transition>
  )
}

export default Page
