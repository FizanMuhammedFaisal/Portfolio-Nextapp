import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <p>This page will be updated later</p>

      <Link href={'learnings/framermotion'} className="text-yellow">
        {' '}
        Framer motion learnings
      </Link>
    </div>
  )
}

export default page
