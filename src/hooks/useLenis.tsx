'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,

      lerp: 0.4,
      autoResize: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
}

export default useLenis
