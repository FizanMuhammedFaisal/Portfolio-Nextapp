'use client'

import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

const TOP_SCROLL_LIMIT =
  typeof window !== 'undefined' ? window.innerHeight * 0.9 : 200
const SCROLL_THRESHOLD_SPEED = 2.8

type NavLink = {
  href: string
  label: string
  icon: string
}

const links: NavLink[] = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/about', label: 'About', icon: 'User' },
  { href: '/projects', label: 'Projects', icon: 'Code2' },
  { href: '/learnings', label: 'Learn', icon: 'Code2' },
  { href: '/blog', label: 'Blogs', icon: 'Book' },
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
      className="flex justify-center top-0 fixed left-0 right-0 z-50 pointer-events-none rounded-md overflow-hidden"
    >
      <div className="flex justify-center  min-w-11 mt-5 md:mx-0 mx-5 backdrop-blur-md rounded-md text-white relative pointer-events-auto">
        <div className="absolute inset-0 z-50  bg-black/30 border-white/10 border rounded-md pointer-events-none"></div>

        <motion.ul className="flex px-2 py-[.5rem]  relative z-10">
          {links.map((link, i) => {
            const isSelected = link.href === baseRoute
            const isHovered = selectedIndex === i

            return (
              <motion.li key={i} className="relative">
                <AnimatePresence>
                  <Link
                    href={link.href}
                    className={clsx(
                      'block relative py-[.18rem] sm:px-2 md:px-3 px-2 rounded-md text-[0.77rem] sm:text-sm'
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
                      {isHovered && (
                        <motion.div
                          layoutId="hovered"
                          className={clsx(
                            'absolute inset-0 bg-white/15 rounded-[0.3rem]'
                          )}
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 50,
                          }}
                        />
                      )}
                    </motion.div>

                    <motion.span
                      className={`relative z-10 font-medium ${
                        isSelected
                          ? 'text-emerald-500 font-semibold'
                          : 'text-amber-50'
                      }`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>

        <div className="absolute left-0 right-0 top-0 bottom-0 border-2 border-white/5 backdrop-blur-md shadow-xl rounded-md pointer-events-none"></div>
      </div>
    </motion.div>
  )
}

export default Header
