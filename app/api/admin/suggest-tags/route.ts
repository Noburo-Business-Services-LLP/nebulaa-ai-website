import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import Anthropic from '@anthropic-ai/sdk'
import { SUGGESTED_TAGS } from '@/lib/blogTags'

const client = new Anthropic()

/**
 * Reads the post and proposes tags — the "admin panel should automatically
 * generate relevant tags" request. Given the title/excerpt/content, asks for
 * whichever of SUGGESTED_TAGS actually apply (a post is often more than
 * one), plus up to two new tags if the content genuinely needs one that
 * doesn't exist yet. Never forces a post into exactly one bucket.
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, excerpt, content } = await req.json()
  if (!title || !content) {
    return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 200,
    system:
      'You tag blog posts for an SEO content system. Respond with ONLY a JSON array of strings, ' +
      'nothing else — no markdown fence, no explanation.',
    messages: [
      {
        role: 'user',
        content: `Existing tag vocabulary (prefer these where they genuinely apply — a post can have several): ${SUGGESTED_TAGS.join(', ')}

You may propose at most 2 new tags beyond this list, only if the content clearly needs one that isn't there.

Title: ${title}
Excerpt: ${excerpt || '(none)'}
Content (truncated):
${String(content).slice(0, 3000)}

Return 2-5 tags total as a JSON array of strings.`,
      },
    ],
  })

  const raw = message.content[0]?.type === 'text' ? message.content[0].text : '[]'

  let tags: string[]
  try {
    const parsed = JSON.parse(raw.trim())
    tags = Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === 'string') : []
  } catch {
    return NextResponse.json({ error: 'Model returned an unparseable response' }, { status: 502 })
  }

  return NextResponse.json({ tags })
}
