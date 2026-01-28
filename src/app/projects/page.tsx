import Transition from '@/components/layout/Transition'
import type { Variants } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight, Star, GitFork, ExternalLink, Github } from 'lucide-react'
import { getGitHubRepos, getTopRepos } from '@/lib/github'
import { MotionDiv } from '@/components/clientWrappers/MotionElements'
import Image from 'next/image'

export const revalidate = 3600 // Revalidate every hour

export default async function ProjectsPage() {
  const allRepos = await getGitHubRepos('fizanmuhammedfaisal')
  const topRepos = getTopRepos(allRepos, 6)

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
        {/* Header with gradient */}
        <div className="fixed top-0 w-full mt-20 z-10 backdrop-blur-md bg-black/60 border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />
          <div className="container mx-auto px-6 py-6 relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <MotionDiv
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  {topRepos[0] && (
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full blur" />
                      <Image
                        src={topRepos[0].owner.avatar_url}
                        alt={topRepos[0].owner.login}
                        width={48}
                        height={48}
                        className="relative rounded-full ring-2 ring-white/10"
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
                      Projects
                    </h1>
                    <p className="text-xs text-emerald-400/70 font-mono tracking-wider mt-1">
                      @{topRepos[0]?.owner.login || 'fizanmuhammedfaisal'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/60 max-w-md font-light">
                  Open source projects and experiments from GitHub
                </p>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/projects/learnings"
                  className="group flex items-center text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors duration-300"
                >
                  Check out my Learnings
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>

        {/* Main content - better responsive layout */}
        <div className="container mx-auto pt-72 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          {/* Project grid - optimized for all screen sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {topRepos.map((repo, index) => {
              // Varied hover effects for visual interest
              const gradients = [
                'from-emerald-500/5 to-green-500/10',
                'from-blue-500/5 to-cyan-500/10',
                'from-purple-500/5 to-pink-500/10',
                'from-orange-500/5 to-red-500/10',
                'from-yellow-500/5 to-amber-500/10',
                'from-rose-500/5 to-pink-500/10',
              ]

              const borders = [
                'hover:border-emerald-500/40',
                'hover:border-blue-500/40',
                'hover:border-purple-500/40',
                'hover:border-orange-500/40',
                'hover:border-cyan-500/40',
                'hover:border-rose-500/40',
                'hover:border-amber-500/40',
                'hover:border-blue-500/40',
              ]

              return (
                <MotionDiv
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative overflow-hidden rounded-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 ${borders[index % borders.length]} transition-all duration-500`}
                >
                  {/* Varied gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  />

                  <div className="p-4 sm:p-5 md:p-6 relative z-10 flex flex-col h-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px]">
                    {/* Stats only - no numbers */}
                    <div className="flex items-start justify-end mb-4">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                            <Star size={10} className="fill-white/40" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full">
                            <GitFork size={10} />
                            {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project name */}
                    <h3 className="text-2xl font-light tracking-tight text-white mb-3 group-hover:text-white/90 transition-colors duration-300 leading-tight">
                      {repo.name
                        .replace(/-/g, ' ')
                        .replace(/_/g, ' ')
                        .split(' ')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6 line-clamp-2 flex-grow">
                      {repo.description ||
                        'A curated project focusing on clean code and modern development practices.'}
                    </p>

                    {/* Tech stack and actions - visible by default now */}
                    <div className="space-y-4 mt-auto">
                      {(repo.language || repo.topics.length > 0) && (
                        <div className="flex flex-wrap gap-2">
                          {repo.language && (
                            <span className="px-2.5 py-1 text-xs bg-white/10 border border-white/20 rounded-md text-white/80 font-light">
                              {repo.language}
                            </span>
                          )}
                          {repo.topics.slice(0, 2).map((topic) => (
                            <span
                              key={topic}
                              className="px-2.5 py-1 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400/90 font-light"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-white/80 hover:text-white group/btn"
                        >
                          <Github
                            size={14}
                            className="group-hover/btn:scale-110 transition-transform"
                          />
                          <span>View Code</span>
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 text-emerald-400/90 hover:text-emerald-300 group/btn"
                          >
                            <ExternalLink
                              size={14}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )
            })}
          </div>

          {/* View all on GitHub - enhanced */}
          <MotionDiv
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-16 flex justify-center"
          >
            <a
              href="https://github.com/fizanmuhammedfaisal?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-full hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative flex items-center gap-3">
                <Github
                  size={18}
                  className="text-white/60 group-hover:text-white transition-colors"
                />
                <span className="text-sm text-white/80 group-hover:text-white font-light tracking-wide">
                  View all repositories
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>
          </MotionDiv>
        </div>
      </div>
    </Transition>
  )
}
