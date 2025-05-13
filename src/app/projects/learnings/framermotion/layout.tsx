'use client'
import { useHeader } from '@/context/HeaderContext'
import React, { useEffect } from 'react'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setHeaderColor } = useHeader()
  useEffect(() => {
    setHeaderColor('text-yellow')
    return () => {
      setHeaderColor('text-green-500')
    }
  }, [setHeaderColor])
  return children
}
