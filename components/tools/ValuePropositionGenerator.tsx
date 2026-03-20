'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `VALUE PROPOSITION OPTIONS FOR ${v.product.toUpperCase()}

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 1: Problem → Solution → Outcome
"For ${v.target} who struggle with ${v.problem}, ${v.product} is the ${v.category || 'platform'} that ${v.solution}. Unlike ${v.alternative || 'traditional tools'}, we ${v.differentiator || 'do this automatically'}."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 2: Jobs To Be Done
"When ${v.target} need to ${v.job || v.solution}, they choose ${v.product} because it ${v.outcome || 'delivers results faster than any alternative'}."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 3: Hero Statement (for landing pages)
"${v.product}: ${v.outcome || 'The fastest way to ' + v.solution + ' for ' + v.target}."

Subheadline: "Stop ${v.problem}. Start ${v.outcome || 'growing'}. ${v.product} does the heavy lifting for you."

━━━━━━━━━━━━━━━━━━━━━━━

🎯 FORMULA 4: Outcome-first (ad copy)
"${v.target} who use ${v.product} ${v.result || 'see measurable results in the first 30 days'}. Here's how it works:"

━━━━━━━━━━━━━━━━━━━━━━━

HOW TO TEST THESE:
→ Run them as LinkedIn post hooks and see which gets the most engagement
→ Use the winner as your homepage headline for 30 days
→ A/B test the top 2 on Google/Meta ads
→ The version your customers quote back to you = your real value prop`,
]

export default function ValuePropositionGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'product', label: 'Product / company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'target', label: 'Target customer', type: 'text', placeholder: "e.g. 'B2B SaaS founders with 5-50 person teams'" },
        { key: 'problem', label: 'Core problem you solve', type: 'text', placeholder: "e.g. 'spending 10+ hours a week on content that barely converts'" },
        { key: 'solution', label: 'How you solve it', type: 'text', placeholder: "e.g. 'automate their entire LinkedIn presence with AI'" },
        { key: 'differentiator', label: 'What makes you different? (optional)', type: 'text', placeholder: "e.g. 'it posts automatically every day, not just suggests ideas'" },
      ]}
      templates={templates}
      outputLabel="Your Value Proposition Options"
      buttonLabel="Generate Value Propositions"
      tip="Your real value prop is what customers say when they refer you to someone else. Ask them."
    />
  )
}
