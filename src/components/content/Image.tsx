'use client'
import ImageNext, { StaticImageData } from 'next/image'
import React, { useEffect, useRef } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { getLenis } from '@/lib/lenis'

interface ImageProps {
  src: StaticImageData // The dynamic image source URL
  alt: string // The alt text for the image
  className?: string
  blurDataURL?: string
  galleryId?: string // Optional gallery ID for grouping multiple images
}

function Image({
  src,
  alt,
  className,
  blurDataURL,
  galleryId = 'default-gallery',
}: ImageProps) {
  const placeholder = blurDataURL ? 'blur' : 'empty'
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null)
  const imageId = useRef(`image-${Math.random().toString(36).slice(2, 9)}`)

  useEffect(() => {
    lightboxRef.current = new PhotoSwipeLightbox({
      gallery: `#${galleryId}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.9,
      showHideAnimationType: 'zoom',
      wheelToZoom: true,
      trapFocus: true,
      zoom: true,
    })

    lightboxRef.current.init()
    lightboxRef.current.on('beforeOpen', () => {
      const lenis = getLenis()
      if (lenis) lenis.stop()
    })

    lightboxRef.current.on('close', () => {
      const lenis = getLenis()
      if (lenis) lenis.start()
    })
    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy()
        lightboxRef.current = null

        const lenis = getLenis()
        if (lenis) lenis.start()
      }
    }
  }, [galleryId])

  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className ?? ''}`}
      id={galleryId}
    >
      <a
        href={src.src}
        data-pswp-width={src.width}
        data-pswp-height={src.height}
        target="_blank"
        rel="noreferrer"
        key={imageId.current}
      >
        <ImageNext
          src={src}
          alt={alt}
          width={src.width}
          height={src.height}
          className={`rounded-lg shadow-lg cursor-pointer ${className ?? ''}`}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
        />
      </a>
    </div>
  )
}

export default Image
