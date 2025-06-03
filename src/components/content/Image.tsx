'use client'
import ImageNext, { StaticImageData } from 'next/image'
import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import NextJsImage from './NextjsImage'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'
interface ImageProps {
  src: StaticImageData // The dynamic image source URL
  alt: string // The alt text for the image
  className?: string
  blurDataURL?: string
}

function Image({ src, alt, className, blurDataURL }: ImageProps) {
  const placeholder = blurDataURL ? 'blur' : 'empty'
  const [isOpen, setIsOpen] = useState(false)
  const hanldeOpenLightbox = () => {
    setIsOpen(true)
  }

  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className ?? ''}`}
    >
      <ImageNext
        src={src}
        alt={alt}
        width={src.width}
        height={src.height}
        className={`rounded-lg shadow-lg ${className ?? ''}`}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onClick={hanldeOpenLightbox}
      />
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src: src.src, alt: alt }]}
        plugins={[Zoom, Download]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        carousel={{
          finite: true,
          preload: 0,
        }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
        }}
        toolbar={{
          buttons: ['close'],
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          slide: NextJsImage,
        }}
        animation={{
          fade: 500,
          swipe: 300,
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
          },
          slide: {
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
          },
        }}
      />
    </div>
  )
}

export default Image
