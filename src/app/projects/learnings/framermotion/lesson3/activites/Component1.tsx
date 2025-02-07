'use client'
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react'

function AnimatingSquare() {
  const x = useMotionValue(0)
  const scalex = useTransform(x, [-100, 0, 100], [1, 1, 1.5])
  const scale = useSpring(scalex)
  const borderRadius = useTransform(x, [-100, 0, 100], ['50%', '0%', '50%'])
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ['#fff', '#4335a0', '#bc0707']
  )
  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{ x, scale, borderRadius, backgroundColor }}
        className="w-32 h-32 bg-[#4335a0] rounded-md flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      ></motion.div>
    </div>
  )
}

export const AnimatingSquareCode = `import { motion, useSpring, useMotionValue, useTransform } from 'motion/react'

function AnimatingSquare() {
  const x = useMotionValue(0)
  const scalex = useTransform(x, [-100, 0, 100], [1, 1, 1.5])
  const scale = useSpring(scalex)
  const borderRadius = useTransform(x, [-100, 0, 100], ['50%', '0%', '50%'])
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ['#4335a0', '#0f5878', '#9d4108']
  )
  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{ x, scale, borderRadius, backgroundColor }}
        className="w-32 h-32 bg-[#4335a0] rounded-md flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      ></motion.div>
    </div>
  )
}

export default AnimatingSquare
`
export default AnimatingSquare
