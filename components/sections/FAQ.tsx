'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const faqs = [
  { q: 'What happens after the 7-day free trial?', a: "You choose to continue on the plan you started — ₹10,000/month for Gravity, ₹15,000/month for Pulsar, or ₹20,000/month for both. No auto-charge. No surprise invoices. We'll remind you before the trial ends." },
  { q: 'Do I need a tech team to set this up?', a: 'No. Our onboarding team sets everything up with you. You\'ll be live in under 24 hours. No technical skills required.' },
  { q: 'Can I use just Gravity or just Pulsar?', a: 'Yes! You can choose Gravity (marketing) at ₹10,000/month or Pulsar (outreach) at ₹15,000/month, or get both together at ₹20,000/month — saving ₹5,000 every month.' },
  { q: 'What channels does Pulsar support?', a: 'WhatsApp (via API), email, and SMS — plus voice calls where they fit. All from a single setup.' },
  { q: 'How does Gravity learn my brand voice?', a: 'Give it your website URL. In about 60 seconds it extracts your tone, ICP and competitors, and builds a marketing strategy from that. It keeps learning after — the longer it runs, the better it gets at sounding like you.' },
  { q: 'Is this useful for businesses with no online presence yet?', a: 'Yes — Gravity helps you build that presence from scratch. Even if you have zero followers, it starts posting for you on day one.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-white/[0.06] transition-all duration-200 ${open ? 'border-l-2 border-l-brand-gold pl-5' : 'pl-0'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left cursor-pointer group">
        <span className="font-heading text-[19px] font-medium text-white pr-4 group-hover:text-brand-gold transition-colors">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex-shrink-0">
          <ChevronDown size={18} className="text-brand-gold" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="font-body text-[15px] leading-[1.68] text-white/55 pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="max-w-[640px] mb-[62px]">
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">FAQ</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="font-heading text-[34px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium">
          The questions you&apos;re <span className="italic text-brand-gold">actually asking.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOptions}
        className="bg-brand-dark-surface border border-white/[0.06] rounded-[18px] px-8"
      >
        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
      </motion.div>
    </section>
  )
}
