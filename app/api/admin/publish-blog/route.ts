import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAdmin } from '@/lib/adminAuth'
import { savePublishedPost, getPublishedPost, type StoredPost } from '@/lib/blogStore'
import { getRepoPost } from '@/lib/blogRepo'

const HEADER_COLORS = [
  'from-brand-gold/25 to-brand-gold/5',
  'from-blue-500/20 to-blue-400/5',
  'from-purple-500/20 to-purple-400/5',
  'from-green-500/20 to-green-400/5',
  'from-orange-500/20 to-orange-400/5',
  'from-pink-500/20 to-pink-400/5',
  'from-cyan-500/20 to-cyan-400/5',
]

/** Roughly 200 words a minute, which is the usual reading estimate. */
function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

/**
 * Upserts a post for any slug — new, or an edit of one that already exists
 * either in S3 or as a repo .mdx file. S3 is the override layer for any
 * slug (see lib/blogStore.ts): saving here is what the render path reads
 * first, so editing a repo post takes effect immediately, no redeploy.
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, title, content, tags, excerpt, heroImage, date, author } = await req.json()

  if (!slug || !title || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const cleanTags: string[] =
    Array.isArray(tags) && tags.length
      ? Array.from(new Set(tags.map((t: unknown) => String(t).trim()).filter(Boolean)))
      : []

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: 'Slug must be lowercase letters, numbers and hyphens only' },
      { status: 400 },
    )
  }

  const existing = await getPublishedPost(slug)
  // First edit of a repo post: inherit its original date/author/colour so an
  // edit doesn't quietly reset "published" metadata that had nothing to do
  // with the edit itself.
  const repoOriginal = existing ? undefined : getRepoPost(slug)
  const base = existing ?? repoOriginal

  const post: StoredPost = {
    slug,
    title,
    excerpt: (excerpt || title).replace(/[#*`_~\[\]]/g, '').trim().slice(0, 160),
    tags: cleanTags.length ? cleanTags : base?.tags ?? [],
    readTime: readTime(content),
    date: date || base?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: author || base?.author || 'Nebulaa Team',
    // Keep the colour stable across edits so a republish doesn't restyle the card.
    headerColor: base?.headerColor || HEADER_COLORS[Math.floor(Math.random() * HEADER_COLORS.length)],
    heroImage: heroImage !== undefined ? heroImage || undefined : base?.heroImage,
    content,
    publishedAt: new Date().toISOString(),
  }

  if (!(await savePublishedPost(post))) {
    return NextResponse.json({ error: 'Could not save the post to the store.' }, { status: 503 })
  }

  // Without this, the edit is correctly saved but the post page and /blog
  // index keep serving whatever they last rendered for up to `revalidate`
  // seconds (see app/blog/[slug]/page.tsx, app/blog/page.tsx) — "no
  // redeploy needed" below was only half true until this landed.
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')

  return NextResponse.json({
    success: true,
    slug,
    url: `/blog/${slug}`,
    updated: Boolean(existing || repoOriginal),
    message:
      existing || repoOriginal
        ? 'Post updated and live. No redeploy needed.'
        : 'Post published and live. No redeploy needed.',
  })
}
