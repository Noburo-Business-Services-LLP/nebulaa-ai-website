'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `${v.product}

${v.tagline || `The smarter way to ${v.benefit || 'get results'}.`}

━━━━━━━━━━━━━━━━━━━━━━━

${v.description ? v.description + '\n\n' : ''}Here's the problem ${v.product} solves:

Most ${v.audience || 'businesses'} waste hours on ${v.problem || 'manual, repetitive work'} — time that should be spent on things that actually grow the business.

${v.product} changes that.

✅ ${v.feature1 || 'Saves hours of manual work every week'}
✅ ${v.feature2 || 'No technical setup required — works in minutes'}
✅ ${v.feature3 || 'Scales with your team as you grow'}

━━━━━━━━━━━━━━━━━━━━━━━

WHO IT'S FOR:
Perfect for ${v.audience || 'founders, marketers, and growing teams'} who want ${v.benefit || 'better results without burning out'}.

━━━━━━━━━━━━━━━━━━━━━━━

THE RESULT:
${v.result || 'Teams using ' + v.product + ' save an average of 10 hours per week and see measurable improvement in their key metrics within the first month.'}

━━━━━━━━━━━━━━━━━━━━━━━

[Try ${v.product} free →] [See pricing] [Book a demo]`,
]

export default function ProductDescriptionGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'product', label: 'Product / service name', type: 'text', placeholder: 'e.g. Nebulaa Gravity' },
        { key: 'audience', label: 'Who is it for?', type: 'text', placeholder: "e.g. 'B2B founders with 5-50 person teams'" },
        { key: 'problem', label: 'What problem does it solve?', type: 'textarea', placeholder: "e.g. 'spending 10+ hours a week creating LinkedIn content manually'", rows: 2 },
        { key: 'benefit', label: 'Key benefit / outcome', type: 'text', placeholder: "e.g. 'get consistent social media presence without the manual effort'" },
      ]}
      templates={templates}
      outputLabel="Your Product Description"
      buttonLabel="Generate Description"
      tip="Lead with the problem, not the features. Buyers buy outcomes, not functionality."
    />
  )
}
