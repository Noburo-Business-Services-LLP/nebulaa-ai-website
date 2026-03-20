'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const t = v.topic
    const style = v.style
    if (style === 'Curiosity') return `Here's the thing nobody tells you about ${t}:

The conventional approach fails 80% of the time. And the worst part? You won't know it's failing until it's too late.

I've spent the last 6 months obsessing over this. Talked to 50+ founders. Ran the experiments. Made the mistakes.

What I found will change how you think about ${t} forever.

Here's what actually works (and what everyone gets wrong):`
    if (style === 'Data / Stat') return `${Math.floor(Math.random() * 40 + 60)}% of founders struggle with ${t} — not because they lack skill, but because they're measuring the wrong things.

That number comes from our own research across 200+ early-stage startups.

The ones who cracked ${t}? They had one thing in common — and it wasn't budget, team size, or experience.

It was this:`
    if (style === 'Question') return `What if everything you know about ${t} is making things harder, not easier?

Sounds dramatic. But after working with hundreds of founders, I keep seeing the same pattern:

The people who struggle most with ${t} are the ones following the most advice.

Too many tactics. Too many "best practices." Not enough clarity on what actually matters for their specific situation.

So let's fix that. Here's how to think about ${t} differently:`
    return `Six months ago, I almost quit because of ${t}.

Not kidding. It was one of those nights where you're staring at the numbers, and nothing makes sense. The strategy made sense on paper. The execution was solid. But results? Zero.

Then one conversation changed everything.

A founder friend asked me one question that reframed the entire problem. And once I heard it, I couldn't unhear it.

Here's what changed — and why it matters for you:`
  },
]

export default function BlogHookGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'topic', label: "What's your blog post about?", type: 'textarea', placeholder: "e.g. 'cold email for B2B founders' or 'how to hire your first sales rep'", rows: 2 },
        { key: 'style', label: 'Hook style', type: 'select', options: ['Storytelling', 'Curiosity', 'Data / Stat', 'Question'] },
      ]}
      templates={templates}
      outputLabel="Your Blog Hook"
      buttonLabel="Generate Hook"
      tip="Use different hooks for different audiences. Test curiosity hooks on LinkedIn, story hooks on your blog."
    />
  )
}
