import React from 'react'

function page() {
  return (
    <div>
      <div className="bg-slate-200">
        {[...Array(400)].map((_, i) => (
          <p key={i} className="text-lg text-black/50">
            This is paragraph {i + 1}. Scroll quickly up and down to see the
            header animation effect.
          </p>
        ))}
      </div>
    </div>
  )
}

export default page
