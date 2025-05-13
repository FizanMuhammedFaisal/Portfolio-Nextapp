'use client'
import React from 'react'
import Image from 'next/image'
import { Calendar, User } from 'lucide-react'
import { motion } from 'motion/react'

interface BlogHeaderCardProps {
  author: string
  date: string
  imageSrc: string
  imageAlt: string
  title: string
}

const BlogHeaderCard: React.FC<BlogHeaderCardProps> = ({
  author,
  date,
  imageSrc,
  imageAlt,
  title,
}) => {
  return (
    <motion.header
      className="mb-14 pb-4  border-gray-200 dark:border-zinc-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
    >
      <motion.h1
        className="text-5xl font-semibold tracking-tight leading-tight text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.2 }}
      >
        {title}
      </motion.h1>
      <div className="flex items-center mb-3">
        <div className="text-sm flex gap-5 text-gray-600 dark:text-gray-400">
          <motion.div
            className="flex items-center space-x-2 mb-1"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.1 }}
          >
            <User className="w-4 h-4" />
            <span>{author}</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1, ease: 'easeInOut', delay: 0.1 }}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-mono text-xs">{date}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default BlogHeaderCard
