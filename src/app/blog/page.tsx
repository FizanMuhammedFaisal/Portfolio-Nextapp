import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Fizan M Faisal',
  description:
    'Exploring software engineering, system design, and the art of building scalable applications. Insights from real-world experiences and technical deep dives.',
  openGraph: {
    title: 'Blog | Fizan M Faisal',
    description:
      'Exploring software engineering, system design, and the art of building scalable applications.',
    url: 'https://fizanfaisal.vercel.app/blog',
    siteName: 'Fizan M Faisal',
    images: [
      {
        url: 'https://fizanfaisal.vercel.app/og?title=Blog',
        width: 1200,
        height: 630,
        alt: 'Fizan M Faisal Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Fizan M Faisal',
    description:
      'Exploring software engineering, system design, and the art of building scalable applications.',
    images: ['https://fizanfaisal.vercel.app/og?title=Blog'],
  },
}

import { getBlogPosts } from '@/lib/blog'
import BlogIndex from '@/components/blog/BlogIndex'

export default function BlogPage() {
  const posts = getBlogPosts()
    // Filter out the 'first' post (Understanding AI)
    .filter((post) => !post.slug.includes('/first'))

  // Sort posts by date if valid dates exist, otherwise keep default order
  posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  return <BlogIndex posts={posts} />
}
