import Transition from '@/components/layout/Transition'
import { Variants } from 'motion/react'
import Link from 'next/link'
import React from 'react'

function page() {
  const customSlide: Variants = {
    initial: { y: '100vw' },
    enter: { y: 0, transition: { duration: 1 } },
    exit: { x: '100vw', transition: { duration: 1 } },
  }
  return (
    <Transition>
      <div className=" ">
        <Link href={'/projects/learnings'}>
          {' '}
          <p className="text-green-300 mt-20 text-center">
            {' '}
            check out learnings
          </p>
        </Link>
      </div>
    </Transition>
  )
}

export default page
