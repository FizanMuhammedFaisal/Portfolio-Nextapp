import Transition from '@/components/layout/Transition'
import { Variants } from 'motion/react'
import React from 'react'

function page() {
  const customSlide: Variants = {
    initial: { y: '100vw' },
    enter: { y: 0, transition: { duration: 1 } },
    exit: { x: '100vw', transition: { duration: 1 } },
  }
  return (
    <Transition>
      <div className="bg-slate-400 ">
        {[...Array(400)].map((_, i) => (
          <p key={i} className="text-lg text-black/70 text-center">
            This is paragraph {i + 1}. Scroll quickly up and down to see the
            header animation effect.
          </p>
        ))}
      </div>
    </Transition>
  )
}

export default page
