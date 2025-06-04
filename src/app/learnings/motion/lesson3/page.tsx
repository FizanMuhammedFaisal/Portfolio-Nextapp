'use client'

import ExampleCard from '@/components/content/card/ExampleCard'
import React from 'react'
import Component1, { AnimatingSquareCode } from './activites/Component1'
import Component2, { ExitingSquareCode } from './activites/Component2'

function page() {
  return (
    <div className="w-full">
      <h1 className="text-center mt-32 text-3xl font-bold bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 text-transparent bg-clip-text">
        {' '}
        Exit Animations
      </h1>
      <section className="w-full mt-20">
        <div>
          <ExampleCard
            content={<Component1 />}
            code={AnimatingSquareCode}
            description={'Drag the square'}
          />
          <ExampleCard
            content={<Component2 />}
            code={ExitingSquareCode}
            description={'Using Animate Presence'}
          />
        </div>
      </section>
    </div>
  )
}

export default page
