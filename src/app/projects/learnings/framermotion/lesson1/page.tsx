'use client'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import './style.css'
import ExampleCard from '@/components/content/card/ExampleCard'
import Slider from '@/components/content/Sliders/Slider'
function page() {
  const [bounce, setBounce] = useState(0.5)
  const [mass, setMass] = useState(0.5)
  const [damping, setDamping] = useState(1)
  const [velocity, setVelocity] = useState(1)

  return (
    <div className=" w-full">
      <h1 className="text-center mt-32 text-3xl font-bold bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 text-transparent bg-clip-text">
        Basic Animation
      </h1>

      <section className="space-y-3 w-full mt-20">
        <h2 className="text-xl text-gray-300 text-center mb-10 font-semibold">
          Adding Animation on Button
        </h2>

        <div className="">
          <ExampleCard
            content={
              <motion.button className="bg-gray-600  px-2 py-1">
                Click Me
              </motion.button>
            }
            description={'Normal button'}
            code={`
<motion.button className="bg-gray-600  px-2 py-1">
  Click Me
</motion.button>
              `}
          />
          <ExampleCard
            content={
              <motion.button
                className="bg-gray-600  px-2 py-1"
                initial={{ backgroundColor: 'red' }}
                animate={{ backgroundColor: 'blue' }}
                transition={{ delay: 1 }}
              >
                Click Me
              </motion.button>
            }
            description={
              'Button with a inital state and animation on background color'
            }
            code={`
<motion.button
  className="bg-gray-600  px-2 py-1"
  initial={{ backgroundColor: 'red' }}
  animate={{ backgroundColor: 'blue' }}
  transition={{ delay: 1 }}
>
  Click Me
</motion.button>
          `}
          />
          <ExampleCard
            content={
              <motion.button
                className="bg-gray-600  px-2 py-1"
                initial={{ scale: 1 }}
                animate={{ scale: 2 }}
                transition={{
                  delay: 1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 0.2,
                }}
              >
                Click Me
              </motion.button>
            }
            description={'Button with a scale repeat'}
          />

          <ExampleCard
            content={
              <motion.button
                key={`${bounce}-${damping}-${mass}-${velocity}`}
                className="bg-gray-600  px-2 py-1"
                initial={{ scale: 1 }}
                animate={{ scale: 2 }}
                transition={{
                  delay: 1,
                  type: 'spring',
                  bounce: bounce,
                  damping: damping,
                  mass: mass,
                  repeat: Infinity,
                  velocity: velocity,
                  repeatType: 'reverse',
                  repeatDelay: 0.2,
                }}
              >
                Click Me
              </motion.button>
            }
            description={'Button with a "Spring" as animation '}
            code={String.raw`

  const [bounce, setBounce] = useState(${bounce})
  const [mass, setMass] = useState(${mass})
  const [damping, setDamping] = useState(${damping})
  const [velocity, setVelocity] = useState(${velocity})

  <motion.button
  key={${bounce}-${damping}-${mass}-${velocity}}
  className="bg-gray-600  px-2 py-1"
  initial={{ scale: 1 }}
  animate={{ scale: 2 }}
  transition={{
    delay: 1,
    type: 'spring',
    bounce: bounce,
    damping: damping,
    mass: mass,
    repeat: Infinity,
    velocity: velocity,
    repeatType: 'reverse',
    repeatDelay: 0.2,
  }}
  >
  Click Me
  </motion.button>
              `}
            controls={
              <div className="space-y-4">
                <Slider
                  htmlFor="bounce"
                  label={` Bounce: ${bounce.toFixed(2)}`}
                  id="bounce"
                  min={0}
                  max={2}
                  step={0.01}
                  value={bounce}
                  onChange={(e) => setBounce(parseFloat(e.target.value))}
                />
                <Slider
                  htmlFor="damping"
                  label={` Damping: ${damping.toFixed(2)}`}
                  id="damping"
                  min={1}
                  max={40}
                  step={1}
                  value={damping}
                  onChange={(e) => setDamping(parseFloat(e.target.value))}
                />
                <Slider
                  htmlFor="mass"
                  label={` Mass: ${mass.toFixed(2)}`}
                  id="mass"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                />
                <Slider
                  htmlFor="velocity"
                  label={` Velocity: ${velocity.toFixed(2)}`}
                  id="velocity"
                  min={0}
                  max={100}
                  step={1}
                  value={velocity}
                  onChange={(e) => setVelocity(parseFloat(e.target.value))}
                />
              </div>
            }
          />
        </div>
      </section>
    </div>
  )
}

export default page
