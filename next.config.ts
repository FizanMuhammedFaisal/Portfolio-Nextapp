import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    mdxRs: true,
    viewTransition: true,
  },
  // output: 'export', // Commented out to allow dynamic OG image generation
  images: {
    unoptimized: true,
  },
  pageExtensions: ['mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
