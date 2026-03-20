'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `Subject: Know anyone who'd benefit from ${v.product || '[product]'}?

Hi ${v.customerName ? v.customerName.split(' ')[0] : '[Name]'},

Hope you're doing well!

I wanted to reach out because you've been one of our best customers — and honestly, the kind of results you've seen with ${v.product || '[product]'} is exactly what we want to help more people achieve.

If you know anyone else who's dealing with ${v.pain || 'the same challenges you were facing'}, I'd love an introduction. Specifically, we're great for:

→ ${v.persona1 || 'Founders building their first sales/marketing system'}
→ ${v.persona2 || 'Teams that have outgrown manual processes'}
→ ${v.persona3 || 'Anyone who wants to grow faster without adding headcount'}

${v.incentive ? `As a thank you, we'll ${v.incentive} for every customer you refer.` : 'We\'ll make sure any referral you send gets the same white-glove treatment you\'ve received.'}

If someone comes to mind, just forward this email or make a quick intro — I'll take it from there and make you look good 😊

Thanks so much — really appreciate being in your corner.

${v.senderName || '[Your Name]'}
${v.company || '[Your Company]'}`,
]

export default function ReferralEmailGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'product', label: 'Product / service name', type: 'text', placeholder: 'e.g. Nebulaa' },
        { key: 'customerName', label: "Customer's name", type: 'text', placeholder: 'e.g. Priya Sharma' },
        { key: 'pain', label: 'Problem you solved for them', type: 'text', placeholder: "e.g. 'inconsistent LinkedIn presence and manual outreach'" },
        { key: 'incentive', label: 'Referral incentive (optional)', type: 'text', placeholder: "e.g. 'give you 1 month free for every referral who signs up'" },
        { key: 'senderName', label: 'Your name', type: 'text', placeholder: 'e.g. Arjun' },
      ]}
      templates={templates}
      outputLabel="Your Referral Email"
      buttonLabel="Generate Email"
      tip="Send referral requests when customer satisfaction is highest — after a milestone, win, or great support interaction."
    />
  )
}
