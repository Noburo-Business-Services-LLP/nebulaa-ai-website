'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `━━━ 30-SECOND PITCH ━━━

"${v.company} helps ${v.target || 'B2B founders'} ${v.outcome || 'scale their go-to-market'} without ${v.pain || 'the usual grind'}.

Most ${v.target || 'founders'} ${v.problem || 'spend hours on marketing that barely moves the needle'}. We fix that with ${v.solution || 'AI-powered automation that works in the background'}.

${v.traction ? `So far, we've ${v.traction}.` : 'We\'re early stage and already seeing strong early results.'}

If you know anyone ${v.trigger || 'building a B2B startup who wants to grow faster'}, I\'d love an introduction."

━━━ INVESTOR VERSION ━━━

"We're ${v.company} — ${v.oneliner || `the AI-powered ${v.solution || 'growth platform'} for ${v.target || 'founders'}`}.

The problem: ${v.problem || '[State the problem clearly with a stat if possible]'}

Our solution: ${v.solution || '[How you solve it differently]'}

${v.traction ? `Traction: ${v.traction}` : 'Traction: [# customers, ARR, growth rate]'}

We're raising ${v.raise || '[amount]'} to ${v.useOfFunds || 'accelerate growth and expand the team'}."

━━━ TIPS ━━━
→ Lead with the customer pain, not your features
→ Use one specific number to build credibility
→ End with a clear ask or next step
→ Practice out loud until it feels natural (not rehearsed)`,
]

export default function ElevatorPitchGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'target', label: 'Who is your customer?', type: 'text', placeholder: "e.g. 'B2B SaaS founders with 5-50 person teams'" },
        { key: 'problem', label: 'What problem do they have?', type: 'textarea', placeholder: "e.g. 'They spend 10+ hours a week on LinkedIn content that barely converts'", rows: 2 },
        { key: 'solution', label: 'How do you solve it?', type: 'text', placeholder: "e.g. 'AI agent that posts daily content and follows up with leads automatically'" },
        { key: 'traction', label: 'Any traction? (optional)', type: 'text', placeholder: "e.g. '₹15L ARR, 40 paying customers, 3x growth in 6 months'" },
      ]}
      templates={templates}
      outputLabel="Your Elevator Pitch"
      buttonLabel="Generate Pitch"
      tip="The best pitch starts a conversation, not closes a deal. Make it intriguing, not exhaustive."
    />
  )
}
