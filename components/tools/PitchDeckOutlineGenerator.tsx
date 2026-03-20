'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `PITCH DECK OUTLINE — ${v.company || 'Your Startup'}

━━━━━━━━━━━━━━━━━━━━━━━

📊 SLIDE 1: COVER
"${v.company} — ${v.tagline || '[Your one-line pitch]'}"
→ Logo, company name, tagline
→ Founding team photos (optional)
→ Contact details

━━━━━━━━━━━━━━━━━━━━━━━

😤 SLIDE 2: THE PROBLEM
"${v.problem || '[State the problem — make investors feel it]'}"
→ Who has this problem?
→ How big is it? (stats if possible)
→ Why is it painful right now?
→ Why existing solutions fail
Tip: Make this slide personal. Tell a real story.

━━━━━━━━━━━━━━━━━━━━━━━

💡 SLIDE 3: YOUR SOLUTION
"${v.solution || '[How you solve it — simply]'}"
→ What ${v.company} does in 1 sentence
→ Product screenshot / demo GIF
→ Before vs After
Tip: Less is more. One clear message beats five features.

━━━━━━━━━━━━━━━━━━━━━━━

🏆 SLIDE 4: WHY NOW
→ What's changed in the market that makes this the right time?
→ Technology / regulatory / behavioral shift?
→ Why 2025, not 2020 or 2030?

━━━━━━━━━━━━━━━━━━━━━━━

📏 SLIDE 5: MARKET SIZE
→ TAM: Total Addressable Market
→ SAM: Serviceable Addressable Market
→ SOM: Your realistic share in 3-5 years
→ Source your numbers

━━━━━━━━━━━━━━━━━━━━━━━

🛠️ SLIDE 6: PRODUCT DEEP DIVE
→ Core features (3 max)
→ How it works (step by step)
→ Screenshot / demo
→ Key differentiator from alternatives

━━━━━━━━━━━━━━━━━━━━━━━

💰 SLIDE 7: BUSINESS MODEL
→ How do you make money?
→ Pricing tiers
→ Unit economics: CAC, LTV, LTV:CAC ratio
→ Gross margins

━━━━━━━━━━━━━━━━━━━━━━━

📈 SLIDE 8: TRACTION
"${v.traction || '[Your best metrics — revenue, growth rate, customers, retention]'}"
→ Revenue / ARR
→ Growth rate MoM
→ Customer count and notable names
→ Key partnerships
Tip: Show a curve going up and to the right.

━━━━━━━━━━━━━━━━━━━━━━━

🗺️ SLIDE 9: GO-TO-MARKET
→ Acquisition channels (top 2-3)
→ How you find and close customers today
→ Scalable GTM strategy for next 18 months

━━━━━━━━━━━━━━━━━━━━━━━

🏟️ SLIDE 10: COMPETITION
→ Comparison matrix (you vs top 3 alternatives)
→ Your unique position in the market
→ Why you win (moat)
Note: Never say "no competition" — shows naivety.

━━━━━━━━━━━━━━━━━━━━━━━

👥 SLIDE 11: THE TEAM
→ Founders + key hires
→ Relevant domain expertise
→ Why this team for this problem?
→ Notable advisors / investors (if any)

━━━━━━━━━━━━━━━━━━━━━━━

🎯 SLIDE 12: THE ASK
"We're raising ${v.raise || '[amount]'} to ${v.useOfFunds || '[achieve specific milestone]'}"
→ How much you're raising
→ How you'll use it (3-4 buckets)
→ What milestone this gets you to
→ Your 18-month plan

━━━━━━━━━━━━━━━━━━━━━━━

PITCH TIPS:
→ 12 slides max. Every slide earns its place.
→ Lead with traction, not vision (if you have it)
→ Know your numbers cold — memorize them
→ End with the ask, not a "thanks"
→ Always have a 3-slide version ready for 5-minute pitches`,
]

export default function PitchDeckOutlineGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Startup name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'tagline', label: 'One-line pitch', type: 'text', placeholder: "e.g. 'AI-powered GTM automation for Indian founders'" },
        { key: 'problem', label: 'Core problem you solve', type: 'textarea', placeholder: "e.g. 'Indian founders spend 15+ hours a week on sales and marketing with no system to scale it'", rows: 2 },
        { key: 'traction', label: 'Your best traction metrics (optional)', type: 'text', placeholder: "e.g. '₹25L ARR, 60 customers, 40% MoM growth'" },
        { key: 'raise', label: 'How much are you raising?', type: 'text', placeholder: "e.g. '₹2 Crore pre-seed'" },
      ]}
      templates={templates}
      outputLabel="Your Pitch Deck Outline"
      buttonLabel="Generate Pitch Deck"
      tip="The best pitches tell a compelling story. Problem → Why now → Why you → Why it works → What you need."
    />
  )
}
