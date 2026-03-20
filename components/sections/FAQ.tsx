'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const faqs = [
  { q: 'What happens after the 7-day free trial?', a: "You choose to continue at ₹10,000/month. No auto-charge. No surprise invoices. We'll remind you before the trial ends." },
  { q: 'Do I need a tech team to set this up?', a: 'No. Our onboarding team sets everything up with you. You\'ll be live in under 24 hours. No technical skills required.' },
  { q: 'Can I use just Gravity or just Pulsar?', a: 'Yes! You can choose Gravity (marketing) or Pulsar (outreach) at ₹7,500/month each, or get both together at ₹10,000/month — saving ₹5,000 every month.' },
  { q: 'What channels does Pulsar support?', a: 'Voice calls, WhatsApp (via API), email, and SMS — all from a single setup.' },
  { q: 'How does Gravity learn my brand voice?', a: 'Give it your website URL. It reads your content, extracts your tone, ICP, and competitive landscape — in about 60 seconds.' },
  { q: 'Is this useful for businesses with no online presence yet?', a: 'Yes — Gravity helps you build that presence from scratch. Even if you have zero followers, it starts posting for you on day one.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-brand-border dark:border-white/10 transition-all duration-200 ${open ? 'border-l-4 border-l-brand-gold pl-4' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
        <span className="font-body font-semibold text-sm md:text-base text-brand-text dark:text-white pr-4 group-hover:text-brand-gold transition-colors">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex-shrink-0">
          <ChevronDown size={18} className="text-brand-gold" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="font-body text-sm md:text-base text-brand-muted dark:text-white/60 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="bg-brand-off-white dark:bg-[#0F0E0C] py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">FAQ</SectionLabel></motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight">Questions we get asked a lot</motion.h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </motion.div>
      </div>
    </section>
  )
}
