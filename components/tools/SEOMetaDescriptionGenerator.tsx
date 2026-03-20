'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const kw = v.keyword
    const topic = v.topic
    const brand = v.brand || ''

    const descriptions = [
      `${kw ? kw.charAt(0).toUpperCase() + kw.slice(1) : 'Discover'} — ${topic}. ${brand ? brand + ' helps you ' : ''}get results faster with proven strategies, real examples, and step-by-step guidance. Free.`,
      `Learn ${kw || topic} with our comprehensive guide. Covers everything you need to know — from basics to advanced tactics. ${brand ? 'By ' + brand + '.' : ''}${topic ? ' ' + topic + '.' : ''}`,
      `${topic}. Discover why ${kw || 'top founders'} ${brand ? 'choose ' + brand : 'use this approach'} and how you can get the same results starting today.`,
      `Looking for ${kw || 'a better approach to ' + topic}? Here's exactly what works in 2025 — no fluff, just actionable insights you can implement immediately.`,
      `${brand ? brand + ': ' : ''}${topic}. The complete guide to ${kw || topic} for founders and business owners. Free tips, templates, and real-world examples.`,
    ]

    const formatted = descriptions.map((d, i) => {
      const chars = d.length
      const status = chars <= 160 ? '✅' : '⚠️'
      return `Option ${i + 1} (${chars} chars) ${status}\n"${d}"`
    }).join('\n\n')

    return `5 SEO META DESCRIPTION OPTIONS FOR:
"${topic}"
Target keyword: ${kw || '(not specified)'}

━━━━━━━━━━━━━━━━━━━━━━━

${formatted}

━━━━━━━━━━━━━━━━━━━━━━━

TIPS FOR BETTER CTR:
→ Keep under 160 characters (Google truncates longer ones)
→ Include your target keyword naturally near the start
→ Use action words: "Discover", "Learn", "Get", "See"
→ Add a unique value hook — why click YOUR result?
→ Avoid clickbait — match what's actually on the page
→ Test different descriptions on your top 5 pages first`
  },
]

export default function SEOMetaDescriptionGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'topic', label: "What's the page about?", type: 'text', placeholder: "e.g. 'how to write cold emails that get replies'" },
        { key: 'keyword', label: 'Target keyword', type: 'text', placeholder: "e.g. 'cold email for B2B' or 'linkedin post generator'" },
        { key: 'brand', label: 'Brand name (optional)', type: 'text', placeholder: 'e.g. Nebulaa' },
      ]}
      templates={templates}
      outputLabel="Your Meta Description Options"
      buttonLabel="Generate Meta Descriptions"
      tip="Test multiple descriptions on your highest-traffic pages. Even a 1% CTR improvement compounds massively over time."
    />
  )
}
