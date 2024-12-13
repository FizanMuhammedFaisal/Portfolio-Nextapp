'use client'
import React, { createContext, useState, useContext } from 'react'

interface TransitionContextType {
  isExiting: boolean
  setExiting: (value: boolean) => void
  exitDuration: number
  setExitDuration: (value: number) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isExiting: false,
  setExiting: () => {},
  exitDuration: 400,
  setExitDuration: () => {},
})

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isExiting, setExiting] = useState(false)
  const [exitDuration, setExitDuration] = useState(300)

  return (
    <TransitionContext.Provider
      value={{ isExiting, setExiting, exitDuration, setExitDuration }}
    >
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)
