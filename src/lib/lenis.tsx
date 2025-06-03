import Lenis from '@studio-freight/lenis/types'

// lib/lenis-controller.ts
export let lenisInstance: Lenis | null = null

export const setLenis = (instance: Lenis) => {
  lenisInstance = instance
}

export const getLenis = () => lenisInstance
