'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => {
    const t = v.topic
    const a = v.audience || 'founders'
    return `Here are 10 subject line variations for "${t}":

━━━ CURIOSITY ━━━
1. "The ${t} mistake everyone makes (including me)"
2. "Why most ${a} get ${t} wrong"
3. "I tested this so you don't have to [${t}]"

━━━ URGENCY / TIME-BASED ━━━
4. "Last chance: ${t} opportunity ends Friday"
5. "Before you start your week — read this about ${t}"
6. "This ${t} window closes in 48 hours"

━━━ PERSONALIZATION ━━━
7. "Quick question about your ${t} strategy"
8. "Saw you're working on ${t} — wanted to share this"
9. "[First Name], your ${t} approach might be costing you"

━━━ NUMBER-BASED ━━━
10. "5 ${t} tactics that actually work in 2025"

━━━ PRO TIPS ━━━
→ Keep subject lines under 50 characters for mobile
→ Avoid spam triggers: "FREE", "!!!", ALL CAPS
→ Test 2 variations — send to 20% each, pick the winner
→ The best subject line is the one YOUR audience opens`
  },
]

export default function EmailSubjectLineGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'topic', label: 'What is the email about?', type: 'text', placeholder: "e.g. 'your product launch' or 'content marketing tips'" },
        { key: 'audience', label: 'Target audience (optional)', type: 'text', placeholder: "e.g. 'B2B founders' or 'e-commerce store owners'" },
      ]}
      templates={templates}
      outputLabel="Your Subject Line Options"
      buttonLabel="Generate Subject Lines"
      tip="A/B test your top 2 subject lines. Even a 5% lift in open rate compounds dramatically over time."
    />
  )
}
