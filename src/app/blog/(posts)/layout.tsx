'use client'

import Transition from '@/components/layout/Transition'
import useLenis from '@/hooks/useLenis'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useLenis()
  return (
    <Transition>
      <div className="w-full h-full bg-blog-black">
        <div className=" pt-52 max-w-3xl px-4 mx-auto ">
          {children}

          <div className="h-24"></div>
        </div>
      </div>
    </Transition>
  )
}
