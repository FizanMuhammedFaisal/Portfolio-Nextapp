'use client'

import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { useRef, useState } from 'react'
import TransitionLink from './links/TransitionLink'

const TOP_SCROLL_LIMIT =
  typeof window !== 'undefined' ? window.innerHeight * 0.9 : 200
const SCROLL_THRESHOLD_SPEED = 2.5

type NavLink = {
  href: string
  label: string
  icon: string
}

const links: NavLink[] = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/about', label: 'About', icon: 'User' },
  { href: '/projects', label: 'Projects', icon: 'Code2' },
  { href: '/contact', label: 'Contact', icon: 'Mail' },
]

function Header() {
  const routes = usePathname()
  const arrOfRoutes = routes.split('/')
  const baseRoute = '/' + arrOfRoutes[1]
  const [visibility, setVisibility] = useState<boolean>(true)
  const { scrollY } = useScroll()
  const lastScrollPosition = useRef(0)
  const lastTimestamp = useRef(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useMotionValueEvent(scrollY, 'change', (currentScrollY) => {
    const currentTime = Date.now()
    const Distance = Math.abs(currentScrollY - lastScrollPosition.current)
    const Time = currentTime - lastTimestamp.current
    const speed = Distance / Time

    if (currentScrollY <= TOP_SCROLL_LIMIT) {
      setVisibility(true)
    } else if (speed > SCROLL_THRESHOLD_SPEED) {
      const diff = currentScrollY - lastScrollPosition.current
      if (diff > 0) {
        setVisibility(false)
      } else {
        setVisibility(true)
      }
    }
    lastScrollPosition.current = currentScrollY
    lastTimestamp.current = currentTime
  })

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: visibility ? 0 : -100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex justify-center top-0 sticky z-50 pointer-events-none rounded-md overflow-hidden"
    >
      <div className="flex justify-center max-w-96 min-w-11 mt-2 backdrop-blur-md rounded-md text-white relative pointer-events-auto">
        <div className="absolute inset-0 backdrop-blur-[19px] bg-white/5 rounded-md pointer-events-none"></div>

        <motion.ul className="flex px-4 py-2 relative z-10">
          {links.map((link, i) => {
            const isSelected = link.href === baseRoute
            const isHovered = selectedIndex === i

            return (
              <motion.li key={i} className="relative">
                <AnimatePresence>
                  <TransitionLink
                    href={link.href}
                    className={clsx(
                      'block relative py-1 px-3 rounded-md hover:text-white/75'
                    )}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onMouseLeave={() => setSelectedIndex(null)}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 bg-white/40 rounded-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 310,
                            damping: 37,
                            mass: 1,
                          }}
                        />
                      )}
                      {isHovered && (
                        <motion.div
                          layoutId="hovered"
                          className="absolute inset-0 bg-white/10 rounded-lg"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 40,
                          }}
                        />
                      )}
                    </motion.div>

                    <span
                      className={`relative z-10 ${
                        isSelected ? 'text-green-500' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                  </TransitionLink>
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>

        <div className="absolute left-0 right-0 top-0 bottom-0 border-4 border-white/10 backdrop-blur-md shadow-xl rounded-md pointer-events-none"></div>
      </div>
    </motion.div>
  )
}

export default Header