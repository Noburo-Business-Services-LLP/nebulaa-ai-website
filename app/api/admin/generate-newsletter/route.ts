import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

function checkAuth(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret')
  return secret?.trim() === process.env.ADMIN_SECRET?.trim()
}

const client = new Anthropic()

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { topic, ideaPrompt } = await req.json()

  const systemPrompt = `You are the newsletter writer for Nebulaa.ai — an agentic AI platform for Indian founders and SMEs.
Nebulaa has two agents: Gravity (posts daily social content) and Pulsar (calls and qualifies leads automatically).
Writing style: Gen Z energy — like a text from your smartest founder friend, not a company email.
Use emojis naturally. Keep paragraphs short. Use Indian context.`

  const userPrompt = `${ideaPrompt ? `Content framework: ${ideaPrompt}\n\n` : ''}Newsletter topic: ${topic}

Write a newsletter email. Output TWO things, clearly separated:

1. SUBJECT LINE (make it irresistible — curiosity gap, emoji, specific number, or meme energy)
2. HTML BODY CONTENT (just the inner content, no full HTML wrapper — I'll wrap it)

For the HTML body:
- Use <h1> for the main hook/title
- Use <p> for paragraphs (short, 2-3 lines)
- Use <h2> for section breaks
- Use <ul><li> for bullet points
- Add emoji naturally in text
- Max 300-400 words total
- Gen Z phrases where natural ("okay but", "fr fr", "not gonna lie", "real talk", "no cap")
- Include ONE meme reference (describe the meme in text like "you know the 'this is fine' dog energy?")
- End with a punchy 1-line closing (NOT "Best regards" — something like "go get it 🔥" or "your pipeline won't fill itself 👀")
- DO NOT include the CTA block (I add that separately)

Format your response EXACTLY like this:
SUBJECT: [subject line here]
---
BODY:
[HTML content here]`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    })

    const raw = (message.content[0] as { type: string; text: string }).text

    // Parse subject and body
    const subjectMatch = raw.match(/SUBJECT:\s*(.+)/i)
    const bodyMatch = raw.match(/BODY:\s*([\s\S]+)/i)

    const subject = subjectMatch ? subjectMatch[1].trim() : topic
    const body = bodyMatch ? bodyMatch[1].trim() : raw

    return NextResponse.json({ subject, body })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Claude API error — check your ANTHROPIC_API_KEY' }, { status: 500 })
  }
}
