'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HeaderContextType {
  headerColor: string
  setHeaderColor: (color: string) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

interface HeaderProviderProps {
  children: ReactNode
}

// Create the provider component
export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [headerColor, setHeaderColor] = useState<string>('text-green-500')

  return (
    <HeaderContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext)

  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }

  return context
}
