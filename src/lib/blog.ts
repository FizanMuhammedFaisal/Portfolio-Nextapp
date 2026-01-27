import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary?: string
}

type BlogPost = {
  metadata: Metadata
  slug: string
  content: string
}

export function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/(posts)')

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const folders = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  return folders
    .map((folder) => {
      const fullPath = path.join(postsDirectory, folder, 'page.mdx')
      if (!fs.existsSync(fullPath)) {
        // Skip folders without page.mdx
        return {
          metadata: { title: folder, publishedAt: '', summary: '' },
          slug: folder,
          content: '',
        }
      }
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Try to parse export const metadata
      const metadataRegex = /export const metadata = {([\s\S]*?)}/
      const match = fileContents.match(metadataRegex)

      let metadata: Metadata = { title: folder, publishedAt: '', summary: '' }

      if (match && match[1]) {
        const metadataContent = match[1]
        const titleMatch = metadataContent.match(/title:\s*['"](.*?)['"]/)
        const dateMatch = metadataContent.match(/date:\s*['"](.*?)['"]/)
        const descMatch = metadataContent.match(/description:\s*['"](.*?)['"]/)

        metadata = {
          title: titleMatch ? titleMatch[1] : folder,
          publishedAt: dateMatch ? dateMatch[1] : '',
          summary: descMatch ? descMatch[1] : '',
        }
      } else {
        const { data } = matter(fileContents)
        metadata = {
          title: data.title || folder,
          publishedAt: data.date || '',
          summary: data.description || data.summary || '',
        }
      }

      return {
        metadata,
        slug: `/blog/${folder}`,
        content: fileContents,
      }
    })
    .filter((post: BlogPost) => post.content !== '') // Filter out empty or invalid posts
}
