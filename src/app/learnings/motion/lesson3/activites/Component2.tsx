'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function ExitingSquare() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="flex  flex-col items-center justify-center space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 mb-2 py-2 text-black font-semibold bg-yellow rounded hover:bg-yellow/80 transition-colors"
      >
        {isVisible ? 'Hide' : 'Show'} Square
      </button>
      <div className="min-h-52">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              style={{
                width: 128,
                height: 128,
                backgroundColor: '#4335a0',
                borderRadius: 16,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const ExitingSquareCode = `
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

function ExitingSquare() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="flex  flex-col items-center justify-center space-y-4">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 text-black font-semibold bg-yellow rounded hover:bg-yellow/80 transition-colors"
      >
        {isVisible ? 'Hide' : 'Show'} Square
      </button>
      <div className="min-h-60">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              style={{
                width: 128,
                height: 128,
                backgroundColor: '#4335a0',
                borderRadius: 16,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default ExitingSquare
`

export default ExitingSquare
