import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
}

type BlogPost = {
  metadata: Metadata
  slug: string
  content: string
}

export function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog')

  try {
    // Get all directories in the posts directory
    const folders = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    return folders.map((folder) => {
      const fullPath = path.join(postsDirectory, folder, 'page.mdx')
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        metadata: data as Metadata,
        slug: folder,
        content,
      }
    })
  } catch (error) {
    console.warn('Error reading blog posts:', error)
    return []
  }
}
