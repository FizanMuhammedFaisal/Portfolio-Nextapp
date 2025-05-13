import React from 'react'
import { getBlogPosts } from '@/utils/blog'
import Link from 'next/link'

function Posts() {
  let allBlogs = getBlogPosts()
  console.log(allBlogs)
  return (
    <div className="space-y-8">
      Blogs
      {allBlogs.map((post) => (
        <div key={post.slug} className="border border-gray-700 rounded-lg p-6">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold mb-2 hover:text-gray-300">
              {post.metadata.title}
            </h2>
          </Link>
          <time className="text-sm text-gray-400 mb-2 block">
            {post.metadata.publishedAt}
          </time>
          <p className="text-gray-300">{post.metadata.summary}</p>
        </div>
      ))}
    </div>
  )
}

export default Posts
