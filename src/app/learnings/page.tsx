'use client'
import { useHeader } from '@/context/HeaderContext'
import Link from 'next/link'
import React from 'react'

function Page() {
  const { setHeaderColor } = useHeader()

  return (
    <div className="mt-32 flex flex-col items-center">
      <p>This page will be updated later</p>

      <div className="max-w-3/4 w-full">
        <Link
          onMouseEnter={() => {
            setHeaderColor('text-yellow')
          }}
          onMouseLeave={() => {
            setHeaderColor('text-green-500')
          }}
          href={'learnings/motion'}
          className="text-yellow font-bold text-lg  w-full rounded-lg hover:bg-white/5 border border-opacity-10 border-white/20  shadow-md p-6 hover:shadow-lg transition-shadow duration-300 h-24 mt-12 flex items-center justify-center"
        >
          {' '}
          Framer motion learnings
        </Link>
      </div>
    </div>
  )
}

export default Page
