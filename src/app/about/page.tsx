import { Github, Mail, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import WebGLBackground from '@/components/shader/WebglBackground'
import Transition from '@/components/layout/Transition'
import { MotionA, MotionDiv } from '@/components/clientWrappers/MotionElements'
import LenisEnhancer from '@/components/lenisComponent'

function Page() {
  const experiences = [
    { area: 'Full-Stack', desc: 'End-to-end applications' },
    { area: 'System Design', desc: 'Scalable architecture' },
    { area: 'Low-Level', desc: 'Performance & internals' },
  ]

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
  ]

  return (
    <Transition>
      <LenisEnhancer />

      {/* Hero with Profile */}
      <WebGLBackground
        baseColor1={[0.0, 0.0, 0.0]}
        baseColor2={[0.0, 0.25, 0.28]}
        noiseScale={0.2}
        speed={0.5}
      >
        <div className="min-h-[40vh] flex items-center">
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 py-16">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <MotionDiv
                className="lg:col-span-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-sm" />
                  <Image
                    src="/profile.png"
                    alt="Fizan Muhammed Faisal"
                    width={200}
                    height={200}
                    className="relative rounded-2xl object-cover w-full max-w-[200px]"
                  />
                </div>
              </MotionDiv>

              <MotionDiv
                className="lg:col-span-9"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
                  Fizan Muhammed Faisal
                </h1>
                <p className="text-emerald-400 font-mono text-sm tracking-wider mb-6">
                  Software Engineer
                </p>
                <div className="text-lg text-gray-400 leading-relaxed max-w-2xl space-y-4">
                  <p>
                    I build software and enjoy understanding how things work. My
                    focus is on creating{' '}
                    <span className="text-white">
                      clean, well-architected systems
                    </span>
                    .
                  </p>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
        <div
          className="h-20"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, black 100%)',
          }}
        />
      </WebGLBackground>

      {/* Main Content */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* What I Do - Compact */}
          <section className="py-12">
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {experiences.map((exp, i) => (
                <MotionDiv
                  key={exp.area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group"
                >
                  <span className="text-white font-medium">{exp.area}</span>
                  <span className="text-gray-600 mx-2">—</span>
                  <span className="text-gray-500">{exp.desc}</span>
                </MotionDiv>
              ))}
            </MotionDiv>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-900" />

          {/* Connect */}
          <section className="py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-12">
              <MotionDiv
                className="lg:col-span-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-emerald-400 font-mono text-sm tracking-wider mb-4">
                  Get in touch
                </p>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
                  Let&apos;s connect
                </h2>
                <p className="text-gray-500 text-lg">
                  Always open to interesting conversations and new
                  opportunities.
                </p>
              </MotionDiv>

              <MotionDiv
                className="lg:col-span-7 lg:col-start-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="space-y-0">
                  {links.map((link) => (
                    <MotionA
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith('mailto') ? undefined : '_blank'
                      }
                      rel={
                        link.href.startsWith('mailto')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="group flex items-center justify-between py-5 border-b border-gray-900 first:border-t"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <link.icon
                          size={20}
                          className="text-gray-600 group-hover:text-emerald-400 transition-colors"
                        />
                        <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-gray-700 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </MotionA>
                  ))}
                </div>
              </MotionDiv>
            </div>
          </section>
        </div>

        {/* Footer space */}
        <div className="h-24" />
      </div>
    </Transition>
  )
}

export default Page
