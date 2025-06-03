'use client'
import React from 'react'
import { Calendar, User } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'

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
        <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          <motion.div className="flex items-center gap-2 whitespace-nowrap">
            <Image
              alt="profile"
              src="/profile.png"
              width={35}
              height={35}
              className="rounded-full "
            />
            <span>{author}</span>
          </motion.div>

          <motion.div className="flex text-tiny sm:text-xs items-center gap-2 whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            <span className="font-mono ">{date}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default BlogHeaderCard
