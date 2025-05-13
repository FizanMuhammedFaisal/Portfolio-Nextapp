'use client'
import Transition from '@/components/layout/Transition'
import useLenis from '@/hooks/useLenis'
import React from 'react'

function Page() {
  useLenis()
  return (
    <Transition>
      <div>hey</div>
    </Transition>
  )
}

export default Page
