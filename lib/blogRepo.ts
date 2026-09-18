import fs from 'fs'
import path from 'path'
import { blogPosts, type BlogPost } from '@/lib/blogData'

/**
 * Reads the .mdx files that ship in the repo — the site's original posts,
 * written before the S3-backed CMS existed. Shared between the public blog
 * page and the admin edit API, which both need "what does this repo post
 * actually say" rather than duplicating the frontmatter-stripping logic.
 */

export function getRepoPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getRepoContent(slug: string): string | null {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

/** Strips YAML frontmatter — everything between the first pair of `---` lines. */
export function stripFrontmatter(raw: string): string {
  const lines = raw.split('\n')
  if (lines[0]?.trim() !== '---') return raw
  const closingIndex = lines.slice(1).findIndex(l => l.trim() === '---')
  if (closingIndex === -1) return raw
  return lines.slice(closingIndex + 2).join('\n')
}
