'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `IDEAL CUSTOMER PROFILE (ICP) — ${v.company || 'Your Company'}

━━━━━━━━━━━━━━━━━━━━━━━

🏢 FIRMOGRAPHICS (Company Characteristics)
Industry: ${v.industry || '[Define your target industries]'}
Company size: ${v.companySize || '[Employee count range]'}
Revenue stage: ${v.revenue || '[Early stage / ₹1-10Cr ARR / Series A]'}
Geography: ${v.geo || 'India — Tier 1 cities primarily'}
Business model: ${v.bizModel || '[B2B / B2C / SaaS / Services]'}

━━━━━━━━━━━━━━━━━━━━━━━

👤 BUYER CHARACTERISTICS (Decision Maker)
Title: ${v.title || '[Founder / CEO / Head of Marketing / VP Sales]'}
Has budget authority: ${v.budgetAuth || 'Yes — makes final call or is key influencer'}
Technical level: ${v.techLevel || 'Non-technical to moderate'}
Reports to: ${v.reportsTo || 'Board / investors or is the final decision maker'}

━━━━━━━━━━━━━━━━━━━━━━━

🔥 TRIGGER EVENTS (when they start looking for you)
→ ${v.trigger1 || 'Just missed a growth target for the quarter'}
→ ${v.trigger2 || 'Brought on a new marketing/sales hire who needs tools'}
→ ${v.trigger3 || 'Saw a competitor getting results they want'}
→ Received funding and now need to grow faster
→ Got referral from a peer or community member

━━━━━━━━━━━━━━━━━━━━━━━

✅ GREEN FLAGS (they're a great fit if...)
→ ${v.greenFlag1 || 'They have product-market fit and now need to scale GTM'}
→ ${v.greenFlag2 || 'They\'ve tried DIY approaches and hit a ceiling'}
→ They ask about ROI and metrics (not just features)
→ They can make a decision in 1-2 sales cycles
→ They have a specific, painful problem you solve

━━━━━━━━━━━━━━━━━━━━━━━

🚩 RED FLAGS (likely bad fit if...)
→ Still searching for product-market fit
→ Looking for cheapest option (price-sensitive above all)
→ Decision requires 5+ stakeholders and 6+ month cycle
→ Industry you don't serve well
→ Needs deep custom work / professional services

━━━━━━━━━━━━━━━━━━━━━━━

📊 QUALIFICATION QUESTIONS TO ASK
1. "How are you currently handling [your category]?"
2. "What does success look like in 90 days?"
3. "Who else is involved in this decision?"
4. "What's your timeline to get started?"
5. "What's your budget range for solving this?"

━━━━━━━━━━━━━━━━━━━━━━━

REVIEW THIS ICP MONTHLY
Your ICP evolves as you close more deals. Review after every 10 new customers.`,
]

export default function ICPBuilder() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Your company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'industry', label: "Your best customers' industry", type: 'text', placeholder: "e.g. 'B2B SaaS, D2C brands, professional services'" },
        { key: 'companySize', label: 'Ideal company size', type: 'text', placeholder: "e.g. '5-100 employees' or '₹50L-5Cr ARR'" },
        { key: 'greenFlag1', label: 'Top green flag (ideal customer characteristic)', type: 'text', placeholder: "e.g. 'They already have paying customers and now want to grow faster'" },
      ]}
      templates={templates}
      outputLabel="Your ICP Document"
      buttonLabel="Build My ICP"
      tip="Look at your top 5 happiest customers and find what they have in common. That's your real ICP."
    />
  )
}
