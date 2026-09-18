import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { listPublishedPosts, toMeta } from '@/lib/blogStore'
import { blogPosts } from '@/lib/blogData'

export interface AdminPostSummary {
  slug: string
  title: string
  tags: string[]
  date: string
  /** 'edited' = a repo post with an S3 override; 'published' = created entirely through admin. */
  source: 'repo' | 'edited' | 'published'
}

/** Every post the editor can open — repo and S3, deduped by slug, newest override info attached. */
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const published = await listPublishedPosts()
  const overrides = new Map(published.map(p => [p.slug, p]))
  const repoSlugs = new Set(blogPosts.map(p => p.slug))

  const repoRows: AdminPostSummary[] = blogPosts.map(p => {
    const override = overrides.get(p.slug)
    const meta = override ? toMeta(override) : p
    return { slug: p.slug, title: meta.title, tags: meta.tags, date: meta.date, source: override ? 'edited' : 'repo' }
  })

  const newRows: AdminPostSummary[] = published
    .filter(p => !repoSlugs.has(p.slug))
    .map(p => ({ slug: p.slug, title: p.title, tags: p.tags, date: p.date, source: 'published' }))

  return NextResponse.json([...newRows, ...repoRows])
}
