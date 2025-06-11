import { Github, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'
import WebGLBackground from '@/components/shader/WebglBackground'
import Transition from '@/components/layout/Transition'
import { MotionA, MotionDiv } from '@/components/clientWrappers/MotionElements'

function Page() {
  return (
    <Transition>
      {/* WebGL Background - Top 30% */}
      <WebGLBackground
        baseColor1={[0.0, 0.0, 0.0]}
        baseColor2={[0.0, 0.25, 0.28]}
        noiseScale={0.2}
        speed={0.5}
      >
        <div className="h-[15vh] flex items-center justify-center">
          <MotionDiv
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mt-38">About Me</h1>
          </MotionDiv>
        </div>
        <div
          className="h-20 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)',
          }}
        ></div>
      </WebGLBackground>

      <div className="relative min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 max-w-6xl">
          <div className="flex flex-col items-center space-y-8 lg:space-y-0 lg:flex-row lg:items-start lg:space-x-16">
            <MotionDiv
              className="w-full max-w-sm lg:max-w-lg lg:w-2/5 order-1 lg:order-1 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/profile.png"
                  alt="profile"
                  width={200}
                  height={200}
                  className="  object-cover rounded-full"
                />
              </div>
            </MotionDiv>

            {/* Right Column - Content */}
            <MotionDiv
              className="w-full lg:w-3/5 order-2 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-medium mb-6">
                Fizan Muhammed Faisal
              </h2>
              <p className="text-gray-400 text-base mb-8">
                Full-stack Developer & Creative Technologist
              </p>

              <div className="space-y-6 text-left text-zinc-300">
                <p>
                  Hey, I’m <b>Fizan</b> who loves learning and diving deep into
                  how things work. I’m especially into low-level systems and
                  design
                </p>
                <p>
                  I enjoy building clean, thoughtful interfaces, but I also like
                  breaking things down to understand them better. Whether it's
                  debugging something weird or trying out a new layout idea, I’m
                  up for it.
                </p>
                <p>
                  Most of my time goes into experimenting, building side
                  projects, and exploring new concepts cause they’re
                  interesting. It’s how I learn best.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <MotionA
                  href="https://github.com/fizanmuhammedfaisal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </MotionA>
                <MotionA
                  href="fizanmuhammedfaisal.k@gmail.com"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                </MotionA>
                <MotionA
                  href="https://x.com/fizan_faisal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2  border border-gray-800 hover:border-greenP rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={20} />
                </MotionA>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Page
