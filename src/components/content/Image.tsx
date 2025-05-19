import ImageNext from 'next/image'
import React from 'react'

interface ImageProps {
  src: string // The dynamic image source URL
  alt: string // The alt text for the image
  width: number
  height: number
  className?: string // Optional className for styling

  blurDataURL?: string
}

function Image({
  src,
  alt,
  width,
  height,
  className,
  blurDataURL,
}: ImageProps) {
  const placeholder = blurDataURL ? 'blur' : 'empty'
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className || ''}`}
    >
      <ImageNext
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-lg shadow-lg ${className || ''}`}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
      />
    </div>
  )
}

export default Image
