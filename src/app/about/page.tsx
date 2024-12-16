'use client'

import React, { useState } from 'react'
import Transition from '@/components/layout/Transition'
import WebGLBackground from '@/components/shader/WebglBackground'
import useLenis from '@/hooks/useLenis'

function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useLenis()

  return (
    <Transition>
      <WebGLBackground mousePosition={mousePosition}>
        <div className="relative min-h-screen" onMouseMove={handleMouseMove}>
          <div className="relative z-10 p-4">
            <h1 className="text-white text-2xl">Your content here</h1>
            asdf
          </div>
        </div>
      </WebGLBackground>
    </Transition>
  )
}

export default Page
