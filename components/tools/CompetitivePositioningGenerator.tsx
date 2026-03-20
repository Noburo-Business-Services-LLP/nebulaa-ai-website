'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `COMPETITIVE POSITIONING — ${v.company} vs ${v.competitor}

━━━━━━━━━━━━━━━━━━━━━━━

📌 YOUR POSITIONING STATEMENT
"For ${v.target || '[target customer]'} who need ${v.need || '[core need]'}, ${v.company} is the ${v.category || '[category]'} that ${v.differentiator || '[key differentiator]'}. Unlike ${v.competitor}, we ${v.advantage || '[unique advantage]'}."

━━━━━━━━━━━━━━━━━━━━━━━

⚔️ FEATURE COMPARISON

| Feature | ${v.company} | ${v.competitor} |
|---------|------------|----------------|
| ${v.feature1 || 'Core feature'} | ✅ Yes | ❌ No / Limited |
| ${v.feature2 || 'Key differentiator'} | ✅ Yes | ❌ No |
| Ease of setup | ✅ Minutes | ⚠️ Days/Weeks |
| Indian market focus | ✅ Built for India | ❌ Global product |
| Pricing | ✅ Startup-friendly | ⚠️ Enterprise pricing |
| Support | ✅ Dedicated | ⚠️ Ticket-based |

━━━━━━━━━━━━━━━━━━━━━━━

🏆 WHERE YOU WIN
→ ${v.win1 || 'Better fit for the specific segment you serve'}
→ ${v.win2 || 'Faster time to value — no lengthy implementation'}
→ ${v.win3 || 'More cost-effective for your target company size'}
→ Purpose-built vs. generic solution
→ Local support and Indian context

━━━━━━━━━━━━━━━━━━━━━━━

⚠️ WHERE THEY WIN (be honest)
→ ${v.theyWin || 'They may have more features for large enterprise use cases'}
→ Larger existing customer base and brand recognition
→ [Add your honest assessment here]

━━━━━━━━━━━━━━━━━━━━━━━

💬 BATTLE CARD: HOW TO RESPOND WHEN A PROSPECT MENTIONS ${v.competitor.toUpperCase()}

If they say: "We're already using ${v.competitor}"
→ "That's great — they're solid for [what competitor does well]. Can I ask what's not working about your current setup? Most of our customers who switched came because [specific pain point]."

If they say: "We're evaluating ${v.competitor}"
→ "Makes sense — they're a good option for [use case]. The question is [key differentiator question]. If that matters to you, that's where we're different. Want to see a quick side-by-side?"

━━━━━━━━━━━━━━━━━━━━━━━

🎯 YOUR MESSAGING FOR THIS MARKET
Headline: "${v.company}: ${v.messagingHook || '[What you do that they can\'t]'}"
Sub: "The ${v.category || 'platform'} built specifically for ${v.target || 'your audience'} — not retrofitted for it."`,
]

export default function CompetitivePositioningGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Your company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'competitor', label: 'Main competitor', type: 'text', placeholder: "e.g. 'HubSpot' or 'Salesforce' or 'a manual approach'" },
        { key: 'target', label: 'Target customer', type: 'text', placeholder: "e.g. 'B2B SaaS founders in India with 5-50 person teams'" },
        { key: 'differentiator', label: 'Your key differentiator vs them', type: 'textarea', placeholder: "e.g. 'automates the entire GTM workflow end-to-end vs just being a CRM'", rows: 2 },
      ]}
      templates={templates}
      outputLabel="Your Competitive Positioning"
      buttonLabel="Generate Positioning"
      tip="Never trash competitors. Position around a specific use case where you clearly win, and let the right customers self-select."
    />
  )
}
