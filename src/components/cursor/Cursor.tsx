import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    // Add hover listeners for links/buttons
    const handleMouseOver = () => setIsHovering(true)
    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseout', handleMouseOut)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseover', handleMouseOver)
        el.removeEventListener('mouseout', handleMouseOut)
      })
    }
  }, [])

  return (
    <motion.div
      className="custom-cursor"
      style={{
        top: cursorPosition.y,
        left: cursorPosition.x,
      }}
      animate={{
        x: cursorPosition.x,
        y: cursorPosition.y,
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{
        duration: 0.05, // Near-instant response
        ease: 'linear', // No spring bounce
      }}
    />
  )
}

export default Cursor
