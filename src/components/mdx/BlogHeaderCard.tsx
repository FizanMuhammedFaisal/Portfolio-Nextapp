'use client'
import React from 'react'
import { Calendar, User } from 'lucide-react'
import { motion } from 'motion/react'

interface BlogHeaderCardProps {
  author: string
  date: string
  // imageSrc: string
  // imageAlt: string
  title: string
}

const BlogHeaderCard: React.FC<BlogHeaderCardProps> = ({
  author,
  date,
  title,
}) => {
  return (
    <motion.header className="mb-14 pb-4 flex justify-center lg:justify-start border-gray-200 dark:border-zinc-700">
      <div className=" items-center mb-3">
        <motion.h1
          className="font-semibold text-3xl md:text-4xl lg:text-5xl  tracking-tight leading-tight text-gray-800 dark:text-white"
          transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <div className="text-sm mt-2 flex gap-5 text-gray-600 dark:text-gray-400">
          <motion.div className="flex items-center space-x-2 mb-1">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </motion.div>
          <motion.div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="font-mono text-xs">{date}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default BlogHeaderCard
