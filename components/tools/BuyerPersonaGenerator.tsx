'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `BUYER PERSONA: ${v.personaName || 'The ' + (v.target || 'Ideal Customer')}

━━━━━━━━━━━━━━━━━━━━━━━

👤 WHO THEY ARE
Role: ${v.role || 'Founder / CEO'}
Company size: ${v.companySize || '5-50 employees'}
Industry: ${v.industry || 'B2B SaaS / Tech startup'}
Location: ${v.location || 'Metro cities — Mumbai, Bangalore, Delhi, Hyderabad'}
Age: ${v.age || '28-40'}
Experience: ${v.experience || '2-8 years in their industry'}

━━━━━━━━━━━━━━━━━━━━━━━

😤 PAIN POINTS (what keeps them up at night)
1. ${v.pain1 || 'Not enough time — wearing too many hats'}
2. ${v.pain2 || 'Inconsistent pipeline — good months, bad months'}
3. ${v.pain3 || 'Can\'t afford a big marketing or sales team yet'}
4. Pressure to grow faster without proportionally more budget
5. Constantly starting from scratch on content and outreach

━━━━━━━━━━━━━━━━━━━━━━━

🎯 GOALS (what they\'re trying to achieve)
1. Consistent, predictable revenue growth
2. Build a brand without spending hours on content
3. Free up time to focus on product and customers
4. Look like a much bigger company than they are
5. Find a repeatable, scalable GTM motion

━━━━━━━━━━━━━━━━━━━━━━━

🔍 HOW THEY FIND SOLUTIONS
→ LinkedIn (scroll during commute or after work)
→ Word of mouth / founder peer recommendations
→ Founder communities (Slack groups, WhatsApp groups)
→ Google search when they have a specific problem
→ YouTube for how-to content

━━━━━━━━━━━━━━━━━━━━━━━

💬 WHAT THEY SAY (voice of customer)
"I don't have time to post on LinkedIn every day"
"I know content is important but I never get around to it"
"Our outreach is inconsistent — it works when we focus on it"
"I wish I had a team to handle this"

━━━━━━━━━━━━━━━━━━━━━━━

✅ BUYING TRIGGERS
→ Just had a bad revenue month
→ Hired their first sales/marketing person and need them to succeed
→ Saw a competitor's content and felt left behind
→ Got a referral from a trusted peer
→ Free trial that showed immediate value

━━━━━━━━━━━━━━━━━━━━━━━

HOW TO REACH THEM:
Best channel: ${v.channel || 'LinkedIn organic + warm outreach'}
Best time: Monday morning or end of week (Friday afternoon)
Tone that works: Direct, founder-to-founder. No corporate speak.`,
]

export default function BuyerPersonaGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'product', label: 'Your product / service', type: 'text', placeholder: 'e.g. Nebulaa (AI GTM platform)' },
        { key: 'target', label: 'Describe your target customer in one line', type: 'text', placeholder: "e.g. 'early-stage B2B SaaS founders who want to grow without a big marketing team'" },
        { key: 'personaName', label: 'Give this persona a name (optional)', type: 'text', placeholder: "e.g. 'Founder Vikram' or 'The Scrappy Founder'" },
        { key: 'pain1', label: 'Top pain point (optional)', type: 'text', placeholder: "e.g. 'no time to post on LinkedIn consistently'" },
      ]}
      templates={templates}
      outputLabel="Your Buyer Persona"
      buttonLabel="Generate Persona"
      tip="Validate this persona by interviewing 5 real customers. The details they share will be worth more than any template."
    />
  )
}
