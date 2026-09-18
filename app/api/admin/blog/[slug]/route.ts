import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import { getPublishedPost } from '@/lib/blogStore'
import { getRepoPost, getRepoContent, stripFrontmatter } from '@/lib/blogRepo'

/** Full editable content for one post — S3 override first, repo .mdx otherwise. */
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const stored = await getPublishedPost(params.slug)
  if (stored) {
    const { content, ...meta } = stored
    return NextResponse.json({ ...meta, content, isRepoPost: false })
  }

  const repoPost = getRepoPost(params.slug)
  const raw = repoPost ? getRepoContent(params.slug) : null
  if (!repoPost || !raw) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json({ ...repoPost, content: stripFrontmatter(raw), isRepoPost: true })
}
