'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `Subject: Partnership idea for ${v.partner} + ${v.company}?

Hi ${v.contactName || '[Contact Name]'},

I'm ${v.yourName || '[Your Name]'} from ${v.company} — we ${v.whatYouDo || 'help B2B founders grow without the usual grind'}.

I've been following what ${v.partner} is doing with ${v.partnerStrength || 'your audience/product'} and I think there's a really natural fit here.

Here's the opportunity I see:

Our audience / strength: ${v.yourStrength || '[What you bring to the table]'}
Your audience / strength: ${v.partnerStrength || '[What they bring]'}
Mutual benefit: ${v.mutualBenefit || '[What both sides get]'}

I'm thinking ${v.partnershipType || 'a co-marketing collaboration — a joint webinar, newsletter swap, or co-created content piece that adds value to both our audiences'}.

Not a one-sided pitch. I want this to genuinely work for ${v.partner} as much as it does for us.

Would you be open to a 20-minute call this week to explore if there's something here?

${v.yourName || '[Your Name]'}
${v.company}
${v.email || '[your email]'}`,
]

export default function PartnershipEmailGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'company', label: 'Your company name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'partner', label: 'Partner company you want to reach', type: 'text', placeholder: 'e.g. Zoho, Razorpay, or any company' },
        { key: 'yourStrength', label: "What your company brings to the table", type: 'text', placeholder: "e.g. '5,000 engaged B2B founder subscribers'" },
        { key: 'mutualBenefit', label: 'What does the partnership offer both sides?', type: 'textarea', placeholder: "e.g. 'Co-branded webinar reaching both audiences, revenue share on joint customers'", rows: 2 },
        { key: 'yourName', label: 'Your name', type: 'text', placeholder: 'e.g. Arjun Sharma' },
      ]}
      templates={templates}
      outputLabel="Your Partnership Email"
      buttonLabel="Generate Email"
      tip="Lead with what THEY get, not what you want. The best partnerships are obvious wins for both sides."
    />
  )
}
