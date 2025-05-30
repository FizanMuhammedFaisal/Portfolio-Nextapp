'use client'

import React from 'react'
import Transition from '@/components/layout/Transition'

import useLenis from '@/hooks/useLenis'
import Image from 'next/image'
import WebGLBackground from '@/components/shader/WebglBackground'

function Page() {
  useLenis()

  return (
    <Transition>
      <WebGLBackground
        baseColor1={[0.0, 0.0, 0.0]}
        baseColor2={[0.0, 0.25, 0.28]}
        noiseScale={0.5}
      >
        <div className="h-40"></div>
        <div
          className="h-11 flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)',
          }}
        ></div>
      </WebGLBackground>
      <div>
        {/* <h1 className=" text-5xl text-center mt-32 font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-600 via-green-500 to-green-600">
          Fizan Muhammed Faisal
        </h1> */}
      </div>
      <div className=" mx-20 mt-20 bg-black text-white flex flex-col lg:flex-row items-center justify-center p-8">
        <div className="w-full lg:w-1/2 space-y-12 mb-12 lg:mb-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto overflow-hidden ">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Fizan Muhammed Faisal"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-12 space-y-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-400 via-slate-200 to-slate-100 ">
            Fizan Muhammed Faisal
          </h1>
          <div className="text-base leading-relaxed ext-slate-200">
            <p>
              I'm a passionate developer with a keen interest in creating
              beautiful and functional web experiences. With a background in
              cutting-edge technologies and a love for clean, efficient code, I
              bring a unique perspective to every project I work on.
            </p>
            <p className="mt-3">
              My journey in the world of development has been driven by
              curiosity and a constant desire to learn. I thrive on challenges
              and am always excited to explore new technologies that can enhance
              user experiences and solve complex problems.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Page
