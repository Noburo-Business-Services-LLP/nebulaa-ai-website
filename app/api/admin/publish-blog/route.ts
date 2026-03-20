import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  return secret?.trim() === process.env.ADMIN_SECRET?.trim()
}

const HEADER_COLORS = [
  'from-brand-gold/25 to-brand-gold/5',
  'from-blue-500/20 to-blue-400/5',
  'from-purple-500/20 to-purple-400/5',
  'from-green-500/20 to-green-400/5',
  'from-orange-500/20 to-orange-400/5',
  'from-pink-500/20 to-pink-400/5',
  'from-cyan-500/20 to-cyan-400/5',
]

const CATEGORIES = ['GTM Experiments', 'Founder Mistakes', 'Comparisons', 'Founder Playbook', 'GTM Strategy', 'Marketing Automation']

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, title, content, category, excerpt } = await req.json()

  if (!slug || !title || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    // Write MDX file
    const mdxPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
    fs.writeFileSync(mdxPath, content, 'utf8')

    // Update blogData.ts
    const blogDataPath = path.join(process.cwd(), 'lib', 'blogData.ts')
    const blogDataContent = fs.readFileSync(blogDataPath, 'utf8')

    const today = new Date()
    const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    const randomColor = HEADER_COLORS[Math.floor(Math.random() * HEADER_COLORS.length)]
    const cleanCategory = CATEGORIES.includes(category) ? category : 'Founder Playbook'

    // Clean excerpt — strip markdown
    const cleanExcerpt = (excerpt || title)
      .replace(/[#*`_~\[\]]/g, '')
      .trim()
      .slice(0, 160)

    const newEntry = `  {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    excerpt: '${cleanExcerpt.replace(/'/g, "\\'")}',
    category: '${cleanCategory}',
    readTime: '5 min read',
    date: '${dateStr}',
    author: 'Nebulaa Team',
    headerColor: '${randomColor}',
  },`

    // Insert after "export const blogPosts: BlogPost[] = ["
    const insertAfter = 'export const blogPosts: BlogPost[] = ['
    const insertIdx = blogDataContent.indexOf(insertAfter) + insertAfter.length
    const updatedBlogData = blogDataContent.slice(0, insertIdx) + '\n' + newEntry + blogDataContent.slice(insertIdx)
    fs.writeFileSync(blogDataPath, updatedBlogData, 'utf8')

    return NextResponse.json({
      success: true,
      slug,
      url: `/blog/${slug}`,
      message: 'Post saved. Run `vercel --prod` or push to Git to publish live.'
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
