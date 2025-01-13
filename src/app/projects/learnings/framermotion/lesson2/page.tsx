'use client'
import ShinyText from '@/components/Animations/ShinyText/ShinyText'
import ExampleCard from '@/components/content/card/ExampleCard'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'
motion
function page() {
  return (
    <div className="w-full">
      <h1 className="text-center mt-20 text-3xl font-bold bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 text-transparent bg-clip-text">
        {' '}
        Keyframe Animations
      </h1>
      <section className="space-y-3 w-full mt-20">
        <h2 className="text-xl text-center text-gray-300 mb-10 font-semibold">
          Animation a Square
        </h2>
        <ExampleCard
          description={'A square is being animated'}
          content={
            <motion.div
              className="bg-gray-400 w-24 h-24"
              animate={{
                scale: [1, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
          }
          code={`
<motion.div
  className="bg-gray-400 w-24 h-24"
  animate={{
    scale: [1, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
  }}
  transition={{ duration: 2, repeat: Infinity }}
>
</motion.div>
`}
        />
        <ExampleCard
          description={'A square is being animated'}
          content={
            <motion.div
              className="bg-gray-400 w-24 h-24"
              animate={{
                scale: [1, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                times: [0, 0.15, 0.75, 0.85, 1], //times can change the ease
              }}
            ></motion.div>
          }
          code={`
<motion.div
  className="bg-gray-400 w-24 h-24"
  animate={{
    scale: [1, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ['0%', '0%', '50%', '50%', '0%'],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatDelay: 1,
    times: [0, 0.15, 0.75, 0.85, 1],//times can change the ease
  }}
></motion.div>
            `}
        />
        <ExampleCard
          description={'A square is being animated'}
          content={
            <motion.div
              className="bg-gray-400 w-24 h-24"
              animate={{
                scale: [1, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ff0000'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            ></motion.div>
          }
          code={`
<motion.div
  className="bg-gray-400 w-24 h-24"
  animate={{
    scale: [1, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ['0%', '0%', '50%', '50%', '0%'],
    backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ff0000'],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    repeatDelay: 1,
  }}
></motion.div>
            `}
        />
        <ExampleCard
          description={'A square is being animated'}
          content={
            <motion.div
              className="bg-gray-400 w-24 h-24"
              animate={{
                x: [-200, 0, 200, 0, -200],
                rotate: [0, 180, 0, -180, 0],
                borderRadius: ['0%', '50%', '0%', '50%', '0%'],
                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ff0000'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                repeatType: 'reverse',
              }}
            ></motion.div>
          }
          code={`
<motion.div
  className="bg-gray-400 w-24 h-24"
  animate={{
    x: [-200, 0, 200, 0, -200],
    rotate: [0, 180, 0, -180, 0],
    borderRadius: ['0%', '50%', '0%', '50%', '0%'],
    backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ff0000'],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    repeatDelay: 1,
    repeatType: 'reverse',
  }}
  
></motion.div>
            `}
        />
        <div className="bg-black text-center rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-400 mb-4">
            Read about animation form Docs
            <span className="text-yellow font-semibold "> By Motion</span>
          </p>
          <Link
            href="https://motion.dev/docs/animate"
            className="text-gray-400 ml-1 group hover:text-yellow transition-colors duration-300"
            target="_blank"
          >
            Link to Docs {''}
            <ShinyText
              className=" group-hover:text-yellow/60 transition-colors duration-300"
              text="Motion's Animate"
              speed={2}
            />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default page
