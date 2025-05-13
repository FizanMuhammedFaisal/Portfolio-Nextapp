'use client'
import { useHeader } from '@/context/HeaderContext'
import Link from 'next/link'
import React from 'react'

function Page() {
  const { setHeaderColor } = useHeader()

  return (
    <div className="mt-32 flex flex-col items-center">
      <p>This page will be updated later</p>

      <Link
        onMouseEnter={() => {
          setHeaderColor('text-yellow')
        }}
        onMouseLeave={() => {
          setHeaderColor('text-green-500')
        }}
        href={'learnings/framermotion'}
        className="text-yellow font-bold mt-3"
      >
        {' '}
        Framer motion learnings
      </Link>
    </div>
  )
}

export default Page
