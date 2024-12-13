import Transition from '@/components/layout/Transition'

import React from 'react'
function page() {
  return (
    <Transition>
      <div className="bg-slate-700">
        {[...Array(400)].map((_, i) => (
          <p key={i} className="text-lg text-black/50">
            This is paragraph {i + 1}. Scroll quickly up and down to see the
            header animation effect.
          </p>
        ))}
      </div>
    </Transition>
  )
}

export default page
