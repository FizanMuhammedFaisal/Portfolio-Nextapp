'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

import { useTransition } from '@/context/TransitionContext'

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  href: string
  className?: string
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
}

function TransitionLink({
  children,
  href,

  className = '',
  ...props
}: TransitionLinkProps) {
  const router = useRouter()
  const { setExiting, exitDuration } = useTransition()

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    setExiting(true)

    setTimeout(() => {
      setExiting(false)
    }, exitDuration)
    router.push(href)
  }

  return (
    <Link
      onClick={handleTransition}
      href={href}
      {...props}
      className={className}
    >
      {children}
    </Link>
  )
}

export default TransitionLink
