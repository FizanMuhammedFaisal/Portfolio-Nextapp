'use client'
import { motion } from 'motion/react'
import React from 'react'

function Home() {
  return (
    <div className='min-h-screen flex justify-center bg-black'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className='flex justify-center items-center text-green-500 font-bold'
      >
        <p className='text-xl'>
          {' '}
          Hello there , I &apos; m Fizan Muhammed Faisal and This Portfolio is
          Under construction
        </p>
      </motion.div>
    </div>
  )
}

export default Home
