import { getBlogPosts } from '@/lib/blog'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://fizanfaisal.vercel.app${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const routes = ['', '/about', '/blog', '/projects'].map((route) => ({
    url: `https://fizanfaisal.vercel.app${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
