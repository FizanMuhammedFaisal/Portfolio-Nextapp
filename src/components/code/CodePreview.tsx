'use client'

import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  atomDark,
  dracula,
  nightOwl,
  nord,
  coldarkDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, ChevronDown } from 'lucide-react'

interface CodePreviewProps {
  code: string
}

const themes = {
  oneDark,
  atomDark,
  dracula,
  nightOwl,
  nord,
  coldarkDark,
}

export default function CodePreview({ code }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof themes>('nord')
  const [isOpen, setIsOpen] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="my-8 rounded-lg">
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-24 px-2 py-1 text-sm bg-black text-gray-300 rounded-md hover:bg-white/5 hover:text-white"
            >
              <span className="truncate">{selectedTheme}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {isOpen && (
              <ul
                className="absolute z-10 w-24  mt-1 bg-black rounded-md shadow-lg max-h-60 overflow-auto"
                role="listbox"
              >
                {Object.keys(themes).map((theme) => (
                  <li
                    key={theme}
                    className={`px-2 py-1  rounded-md text-sm cursor-pointer ${
                      theme === selectedTheme
                        ? 'bg-gray-500/80 text-white'
                        : 'text-gray-300 hover:bg-gray-500/40'
                    }`}
                    onClick={() => {
                      setSelectedTheme(theme as keyof typeof themes)
                      setIsOpen(false)
                    }}
                  >
                    {theme}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-md  bg-black text-gray-300  hover:bg-white/5  hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        {typeof code === 'string' ? (
          <SyntaxHighlighter
            language="tsx"
            style={themes[selectedTheme]}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              paddingTop: '3rem',
            }}
            wrapLines
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <div className="p-4 text-red-500">Error: Invalid code prop</div>
        )}
      </div>
    </div>
  )
}
