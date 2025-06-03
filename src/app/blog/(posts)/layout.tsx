'use client'

import useLenis from '@/hooks/useLenis'
import { unstable_ViewTransition as ViewTransition } from 'react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useLenis()
  return (
    <ViewTransition>
      <div className="w-full h-full bg-blog-black">
        <div className=" pt-52 max-w-3xl px-4 mx-auto ">
          {children}

          <div className="h-24"></div>
        </div>
      </div>
    </ViewTransition>
  )
}
