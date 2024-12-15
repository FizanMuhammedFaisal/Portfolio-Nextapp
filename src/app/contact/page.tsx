'use client'
import Transition from '@/components/layout/Transition'
import useLenis from '@/hooks/useLenis'
import React from 'react'

function page() {
  useLenis()
  return (
    <Transition>
      {[...Array(400)].map((_, i) => (
        <p key={i} className="text-lg text-white/50">
          This is paragraph {i + 1}. Scroll quickly up and down to see the
          header animation effect.
        </p>
      ))}
    </Transition>
  )
}

export default page
