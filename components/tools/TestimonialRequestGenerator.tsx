'use client'
import GenericTool from './GenericTool'

const templates = [
  (v: Record<string, string>) => `Subject: Quick favour — 2 minutes of your time?

Hi ${v.customerName || '[Customer Name]'},

Hope things are going well!

I wanted to reach out because you've been using ${v.product || '[your product/service]'} for a while now, and I'd love to hear how it's been going for you.

If you've had a positive experience, I'd be incredibly grateful if you could share a quick testimonial — it genuinely helps other ${v.audience || 'founders'} like yourself make better decisions.

It doesn't need to be long. Even 2-3 sentences answering these questions would be amazing:

1. What were you struggling with before using ${v.product || '[product]'}?
2. What changed after you started using it?
3. What would you tell someone who's on the fence about trying it?

You can reply to this email, or if you prefer, leave a review here: [link]

Either way works! And of course, no pressure at all — I completely understand if you're busy.

Thanks so much for being a customer. It means a lot. 🙏

${v.senderName || '[Your Name]'}
${v.company || '[Your Company]'}

---
P.S. If now isn't a great time but you'd be open to sharing later, just let me know — I can follow up in a few weeks!`,

  (v: Record<string, string>) => `Subject: ${v.customerName ? v.customerName.split(' ')[0] : 'Hey'}, would you be open to sharing your experience?

Hi ${v.customerName || '[Customer Name]'},

I'm building out our testimonials page and thought of you immediately.

You're exactly the kind of customer we built ${v.product || '[product]'} for — and I'd love to showcase your story (with your permission, of course).

If you've gotten value from ${v.product || '[product]'}, would you be willing to share:
→ What problem it solved for you
→ Any results you've seen (even rough numbers are great)
→ Who you'd recommend it to

A few sentences is honestly more than enough.

You can just hit reply and type it out — I'll take care of the formatting.

Really appreciate you taking the time. Your feedback means the world to us 🙏

${v.senderName || '[Your Name]'}`,
]

export default function TestimonialRequestGenerator() {
  return (
    <GenericTool
      fields={[
        { key: 'customerName', label: 'Customer name', type: 'text', placeholder: 'e.g. Priya Sharma' },
        { key: 'product', label: 'Product / service', type: 'text', placeholder: 'e.g. Nebulaa Gravity' },
        { key: 'audience', label: 'Type of customer', type: 'text', placeholder: "e.g. 'B2B founders' or 'SaaS startup teams'" },
        { key: 'senderName', label: 'Your name', type: 'text', placeholder: 'e.g. Rohan' },
      ]}
      templates={templates}
      outputLabel="Your Testimonial Request Email"
      buttonLabel="Generate Email"
      tip="Ask for testimonials when customers are at peak satisfaction — right after a win or milestone."
    />
  )
}
