import { Github, Mail, ArrowUpRight, FileDown } from 'lucide-react'
import Image from 'next/image'
import WebGLBackground from '@/components/shader/WebglBackground'
import Transition from '@/components/layout/Transition'
import { MotionA, MotionDiv } from '@/components/clientWrappers/MotionElements'
import LenisEnhancer from '@/components/lenisComponent'

function Page() {
  const links = [
    {
      href: 'https://github.com/fizanmuhammedfaisal',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://x.com/fizan_faisal',
      label: 'X',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: 'mailto:fizanmuhammedfaisal.k@gmail.com',
      label: 'Email',
      icon: Mail,
    },
    {
      href: '/FizanMFaisal.pdf',
      label: 'Resume',
      icon: FileDown,
    },
  ]

  return (
    <Transition>
      <LenisEnhancer />

      <WebGLBackground
        baseColor1={[0.0, 0.0, 0.0]}
        baseColor2={[0.0, 0.25, 0.28]}
        noiseScale={0.2}
        speed={0.5}
      >
        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black pointer-events-none" />

        <div className="relative min-h-screen flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-6 py-20">
            <MotionDiv
              initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-10"
            >
              {/* Profile Section */}
              <div className="space-y-6">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-6"
                >
                  <MotionDiv
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src="/profile.png"
                      alt="Profile picture"
                      width={100}
                      height={100}
                      className="relative rounded-2xl object-cover ring-1 ring-white/10"
                    />
                  </MotionDiv>
                  <div>
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <h1 className="text-4xl font-light text-white tracking-tight">
                        Fizan M Faisal
                      </h1>
                    </MotionDiv>
                    <MotionDiv
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8,
                        ease: 'easeOut',
                      }}
                    >
                      <p className="text-emerald-400/70 text-sm font-mono tracking-wide mt-2">
                        Software Engineer
                      </p>
                    </MotionDiv>
                  </div>
                </MotionDiv>

                <MotionDiv
                  className="max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-xl text-gray-300 leading-relaxed font-light">
                    I build software and enjoy understanding how things work.{' '}
                    <span className="text-white">
                      Clean architecture and thoughtful design.
                    </span>
                  </p>
                </MotionDiv>
              </div>

              {/* Focus Areas */}
              <MotionDiv
                className="border-t border-white/10 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4 font-medium">
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    'Full-Stack Development',
                    'System Design',
                    'Performance Engineering',
                  ].map((area, index) => (
                    <MotionDiv
                      key={area}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.2 + index * 0.1,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <span className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200">
                        {area}
                      </span>
                    </MotionDiv>
                  ))}
                </div>
              </MotionDiv>

              {/* Connect - New Compact Design */}
              <MotionDiv
                className="border-t border-white/10 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h2 className="text-base text-white tracking-wide mb-4 font-medium">
                  Let's Connect
                </h2>
                <div className="flex flex-wrap gap-6">
                  {links.map((link, index) => {
                    const isMailto = link.href.startsWith('mailto')

                    return (
                      <MotionA
                        key={link.label}
                        href={link.href}
                        target={isMailto ? undefined : '_blank'}
                        rel={isMailto ? undefined : 'noopener noreferrer'}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 1.7 + index * 0.1,
                          ease: 'easeOut',
                        }}
                      >
                        <link.icon
                          size={18}
                          className="text-gray-500 group-hover:text-emerald-400 transition-colors"
                        />
                        <span className="text-sm font-light">{link.label}</span>
                        <ArrowUpRight
                          size={14}
                          className="text-gray-600 group-hover:text-emerald-400 transition-colors"
                        />
                      </MotionA>
                    )
                  })}
                </div>
              </MotionDiv>
            </MotionDiv>
          </div>
        </div>
      </WebGLBackground>
    </Transition>
  )
}

export default Page
