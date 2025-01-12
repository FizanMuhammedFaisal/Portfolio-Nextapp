'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

interface TerminalWindowProps {
  title?: string
  children?: React.ReactNode
  initialText?: string
}

interface CommandResponse {
  id: string
  command: string
  response: string | string[]
  type?: 'error' | 'success' | 'info' | 'warning'
  loading?: boolean
}

export function TerminalWindow({
  title = 'Introduction',
  children,
  initialText = "I'Fizan",
}: TerminalWindowProps) {
  const [time, setTime] = useState<string>('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)
  const [commandHistory, setCommandHistory] = useState<CommandResponse[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [currentPath, setCurrentPath] = useState('~')

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cursorControls = useAnimation()

  const commands = {
    help: [
      'Available commands:',
      '- help: Show this help message',
      '- clear: Clear the terminal',
      '- about: About me',
      '- skills: My skills',
      '- contact: Contact information',
      '- time: Show current time',
      '- ls: List directory contents',
      '- cd [dir]: Change directory',
      '- pwd: Print working directory',
      '- echo [text]: Display text',
      '- whoami: Display current user',
      '- neofetch: System information',
    ],
    ls: ['Documents/', 'Projects/', 'README.md', '.config', '.git'],
    pwd: currentPath,
    whoami: 'fizan',
    heyhowyoudoing: 'good ',
    echo: (args: string[]) => args.join(' ') || '',
    cd: (args: string[]) => {
      const newPath = args[0]
      if (!newPath || newPath === '~' || newPath === '/') {
        setCurrentPath('~')
        return 'Changed directory to ~'
      }
      setCurrentPath(`${currentPath}/${newPath}`)
      return `Changed directory to ${currentPath}/${newPath}`
    },
    neofetch: [
      '       ▄▄▄▄▄▄▄       fizan@terminal',
      '    ▄█████████████▄   ----------------',
      '  ███████████████████  OS: Terminal OS v1.0',
      ' ████████████████████  Host: Vercel Cloud',
      '▐████████████████████  Kernel: 6.1.0-next',
      ' ████████████████████  Uptime: ∞',
      '  ███████████████████  Packages: npm, yarn, pnpm',
      '    ▀█████████████▀   Shell: bash 5.1.16',
      '       ▀▀▀▀▀▀▀       Terminal: xterm-256color',
      '',
      '                      CPU: React 18 @ 60fps',
      '                      Memory: 1024MB / 1024MB',
    ],
    about: [
      "Hey! I'm Fizan.",
      'A passionate developer focused on creating beautiful and functional web experiences.',
      'Type "help" to see what I can do!',
    ],
    skills: [
      'My skills include:',
      '- Frontend: React, Next.js, TypeScript',
      '- Backend: Node.js, Python',
      '- Design: Figma, Adobe XD',
      '- DevOps: Docker, AWS, Vercel',
    ],
    contact: [
      'Get in touch:',
      '- Email: hello@fizan.dev',
      '- GitHub: github.com/fizan',
      '- Twitter: @fizan',
      '- LinkedIn: in/fizan',
    ],
    time: () => new Date().toLocaleTimeString(),
    clear: 'CLEAR_TERMINAL',
  }

  useEffect(() => {
    if (showInitialAnimation) {
      const timeout = setTimeout(() => {
        if (displayedText.length < initialText.length) {
          setDisplayedText(initialText.slice(0, displayedText.length + 1))
          cursorControls.start({ x: displayedText.length * 9.6 })
        } else {
          setShowInitialAnimation(false)
        }
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, initialText, showInitialAnimation, cursorControls])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTime(`${hours}.${minutes}.${seconds}`)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }

    containerRef.current?.addEventListener('click', handleClick)
    return () => containerRef.current?.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [commandHistory])

  const processCommand = async (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ')
    const normalizedCmd = command.toLowerCase()
    let response: string | string[]
    let type: 'error' | 'success' | 'info' | 'warning' = 'success'

    const commandResponse: CommandResponse = {
      id: Math.random().toString(36).substr(2, 9),
      command: cmd,
      loading: true,
      type: 'info',
      response: 'Processing...',
    }

    setCommandHistory((prev) => [...prev, commandResponse])

    // Simulate network delay for some commands
    if (['neofetch', 'skills', 'about'].includes(normalizedCmd)) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    if (normalizedCmd === 'clear') {
      setCommandHistory([])
      return
    }

    if (normalizedCmd in commands) {
      const cmdFunction = commands[normalizedCmd as keyof typeof commands]
      if (typeof cmdFunction === 'function') {
        response = cmdFunction(args)
      } else {
        response = cmdFunction
      }
    } else {
      response = `Command not found: ${command}. Type 'help' for available commands.`
      type = 'error'
    }

    setCommandHistory((prev) =>
      prev.map((entry) =>
        entry.id === commandResponse.id
          ? { ...entry, response, type, loading: false }
          : entry
      )
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
    setCursorPosition(e.target.selectionStart || 0)
    cursorControls.start({ x: (e.target.selectionStart || 0) * 9.6 })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0)
    cursorControls.start({ x: (e.currentTarget.selectionStart || 0) * 9.6 })

    if (e.key === 'Enter' && userInput.trim()) {
      processCommand(userInput)
      setUserInput('')
      setHistoryIndex(-1)
      setCursorPosition(0)
      cursorControls.start({ x: 0 })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setUserInput(
          commandHistory[commandHistory.length - 1 - newIndex].command
        )
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setUserInput(
          commandHistory[commandHistory.length - 1 - newIndex].command
        )
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setUserInput('')
      }
    }
  }

  return (
    <div className="w-full  mx-auto p-4">
      <div className="rounded-lg overflow-hidden shadow-2xl bg-[#001800] relative">
        {/* Window frame */}
        <div className="bg-[#002800] px-4 py-2 flex items-center justify-between border-b border-green-950/30">
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-3 h-3 rounded-full bg-red-500/90 cursor-pointer"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-3 h-3 rounded-full bg-yellow-500/90 cursor-pointer"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-3 h-3 rounded-full bg-green-500/90 cursor-pointer"
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[#B8E986] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
            {title}
          </div>
          <div className="text-green-300/80 text-sm font-mono tabular-nums">
            {time}
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-[#001200]/90"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="sticky top-0 left-0 right-0 px-4 py-2 bg-[#001800]/80  border-b border-green-950/20 z-20">
            <div className="text-[#B8E986] font-mono text-sm">
              {currentPath}
            </div>
          </div>

          {/* Scrollable content */}
          <div
            ref={scrollRef}
            className="h-[480px] overflow-y-auto px-8 py-4 scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent"
          >
            {/* Blur layer */}
            {/* <div className="fixed inset-0 backdrop-blur-sm bg-black/10 pointer-events-none" /> */}

            {/* Animated gradient ball */}
            <motion.div
              initial={{ x: '100%', y: '100%', opacity: 0 }}
              animate={{ x: '60%', y: '20%', opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="fixed w-96 h-96 rounded-full bg-gradient-radial from-green-500 via-green-500/10 to-transparent blur-3xl pointer-events-none"
            />

            {/* Additional gradient overlays */}
            {/* <div className="fixed inset-0 bg-gradient-to-t from-transparent to-black/20 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-br from-transparent via-green-900/5 to-green-500/10 pointer-events-none" /> */}

            {/* Content */}
            <div className="relative z-10 font-mono text-[#B8E986]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl mb-6 text-[#B8E986]"
              >
                HEY
              </motion.div>
              <div className="flex items-start text-4xl mb-8 relative group">
                <span className="text-[#B8E986] mr-4">&gt;</span>
                <div className="relative">
                  <span className="text-[#B8E986]">{displayedText}</span>
                  {showInitialAnimation && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={cursorControls}
                      className={`absolute top-0 w-4 h-12 bg-green-400/80 ${
                        cursorVisible ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-100`}
                    />
                  )}
                </div>
              </div>

              {/* Command history */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {commandHistory.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-1"
                    >
                      <div className="flex items-center group">
                        <span className="text-[#B8E986] mr-2">$</span>
                        <span className="text-[#B8E986]">{entry.command}</span>
                      </div>
                      {entry.loading ? (
                        <div className="pl-4 text-[#B8E986]">
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Processing...
                          </motion.span>
                        </div>
                      ) : Array.isArray(entry.response) ? (
                        entry.response.map((line, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: j * 0.05 }}
                            className={`pl-4 ${
                              entry.type === 'error'
                                ? 'text-red-400/80'
                                : entry.type === 'warning'
                                  ? 'text-yellow-400/80'
                                  : entry.type === 'info'
                                    ? 'text-blue-400/80'
                                    : 'text-green-400/80'
                            }`}
                          >
                            {line}
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`pl-4 ${
                            entry.type === 'error'
                              ? 'text-red-400/80'
                              : entry.type === 'warning'
                                ? 'text-yellow-400/80'
                                : entry.type === 'info'
                                  ? 'text-blue-400/80'
                                  : 'text-green-400/80'
                          }`}
                        >
                          {entry.response}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input line */}
              <div className="flex items-center group mt-4">
                <span className="text-[#B8E986] mr-2">$</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-[#B8E986] font-mono w-full caret-transparent focus:ring-0 focus:outline-none"
                    autoFocus
                  />
                  <motion.span
                    animate={cursorControls}
                    className={`absolute top-2 left-4 w-2 h-5 bg-[#B8E986] ${
                      cursorVisible ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-100`}
                  />
                </div>
              </div>

              {children}
            </div>

            {/* Background effects */}
            <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0yIDJMMCA0aDR6IiBmaWxsPSIjMDAwMSIvPjwvc3ZnPg==')] opacity-5 pointer-events-none" />
            <div className="fixed inset-0 bg-scanline pointer-events-none" />
            <div className="fixed inset-0 bg-noise mix-blend-overlay opacity-5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
