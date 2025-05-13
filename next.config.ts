import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    mdxRs: true,
    viewTransition: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
