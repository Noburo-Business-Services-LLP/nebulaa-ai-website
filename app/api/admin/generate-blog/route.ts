import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/adminAuth'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { topic, style, ideaPrompt } = await req.json()

  const systemPrompt = `You are the content writer for Nebulaa.ai — an agentic AI platform for Indian founders and SMEs.
Nebulaa has three agents: Orbit (AI lead sourcing — finds and qualifies businesses to reach out to), Gravity (AI marketing — posts content daily) and Pulsar (AI outreach — calls and follows up with leads).
Target audience: Indian founders, early-stage startup CEOs, B2B SaaS founders, SME owners aged 25-45.
Tone: Gen Z energy — punchy, direct, real, casual. Not corporate at all.
Always write in first-person founder voice. Use Indian context (₹ not $, Indian cities, Indian startup ecosystem).`

  const userPrompt = `${ideaPrompt ? `Content framework + structure to follow:\n${ideaPrompt}\n\n` : ''}Topic/angle: ${topic}
Style preference: ${style || 'Gen Z — punchy, direct, casual with emojis'}

Write a complete, SEO-optimised blog post for nebulaa.ai/blog. Follow ALL these rules:

SEO RULES:
- H1 title: include the primary keyword naturally, keep under 60 chars, make it click-worthy
- First paragraph: include 2-3 target keywords naturally within the first 150 words
- H2 headers: use keyword-rich subheadings that people actually search for
- Include a TLDR section near the top (3 bullet points — perfect for featured snippets)
- Use natural keyword variations throughout (synonyms, related phrases)
- Internal structure: intro → TLDR → main sections → conclusion with CTA

WRITING RULES:
- 700-900 words total
- Short paragraphs (max 3 lines — mobile readers)
- H1 + H2 section headers (use ## for H2, ### for H3 if needed)
- Use emojis naturally (1-2 per section, not every line)
- If data/experiment post: include a realistic markdown table with 4-6 rows of data
- End with: horizontal rule (---) + one-sentence Nebulaa CTA
- Gen Z phrases where natural: "literally", "fr", "no cap", "okay but hear me out"
- Indian context: use ₹ not $, mention Indian cities/ecosystem when relevant
- NEVER use: "leverage", "utilize", "synergy", "delve", "stakeholder", "in conclusion", "to summarize"
- Start the post immediately with the H1 — no preamble

Format as plain MDX (no frontmatter, start directly with # Title):`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    })

    const content = (message.content[0] as { type: string; text: string }).text

    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : topic

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .slice(0, 60)

    return NextResponse.json({ content, title, slug })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Claude API error — check your ANTHROPIC_API_KEY' }, { status: 500 })
  }
}
