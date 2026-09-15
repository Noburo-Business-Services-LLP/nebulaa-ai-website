import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { savePublishedPost, getPublishedPost, type StoredPost } from '@/lib/blogStore'
import { blogPosts } from '@/lib/blogData'

const HEADER_COLORS = [
  'from-brand-gold/25 to-brand-gold/5',
  'from-blue-500/20 to-blue-400/5',
  'from-purple-500/20 to-purple-400/5',
  'from-green-500/20 to-green-400/5',
  'from-orange-500/20 to-orange-400/5',
  'from-pink-500/20 to-pink-400/5',
  'from-cyan-500/20 to-cyan-400/5',
]

const CATEGORIES = [
  'GTM Experiments',
  'Founder Mistakes',
  'Comparisons',
  'Founder Playbook',
  'GTM Strategy',
  'Marketing Automation',
]

/** Roughly 200 words a minute, which is the usual reading estimate. */
function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, title, content, category, excerpt } = await req.json()

  if (!slug || !title || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: 'Slug must be lowercase letters, numbers and hyphens only' },
      { status: 400 },
    )
  }

  // A post compiled into the repo wins — overwriting it here would produce two
  // versions of the same URL with no way to tell which one is live.
  if (blogPosts.some(p => p.slug === slug)) {
    return NextResponse.json(
      { error: `"${slug}" already exists in the repo. Edit it there and redeploy.` },
      { status: 409 },
    )
  }

  const existing = await getPublishedPost(slug)

  const post: StoredPost = {
    slug,
    title,
    excerpt: (excerpt || title).replace(/[#*`_~\[\]]/g, '').trim().slice(0, 160),
    category: CATEGORIES.includes(category) ? category : 'Founder Playbook',
    readTime: readTime(content),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: 'Nebulaa Team',
    // Keep the colour stable across edits so a republish doesn't restyle the card.
    headerColor: existing?.headerColor || HEADER_COLORS[Math.floor(Math.random() * HEADER_COLORS.length)],
    content,
    publishedAt: new Date().toISOString(),
  }

  if (!(await savePublishedPost(post))) {
    return NextResponse.json({ error: 'Could not save the post to the store.' }, { status: 503 })
  }

  return NextResponse.json({
    success: true,
    slug,
    url: `/blog/${slug}`,
    updated: Boolean(existing),
    message: existing ? 'Post updated and live.' : 'Post published and live. No redeploy needed.',
  })
}
