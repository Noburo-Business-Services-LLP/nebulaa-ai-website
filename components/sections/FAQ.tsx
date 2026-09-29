'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { soundEngine } from '@/lib/soundEngine'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import Schema, { faqSchema } from '@/components/ui/Schema'

const faqs = [
  { q: 'How much does it cost?', a: 'Starter is ₹999 a month and Professional is ₹1,999 a month. Paying yearly saves 10%. If you want our team to run everything for you, we quote for your business after a short call.' },
  { q: 'What happens after the 7-day free trial?', a: "You choose a plan or stop. Nothing is charged automatically, and we remind you before the trial ends." },
  { q: 'Do I need to do anything technical?', a: 'No. We set it up with you, and you are live within a day. After that you only approve the posts on your phone.' },
  { q: 'Which platforms and channels do you cover?', a: 'Instagram, Facebook, LinkedIn and X for posts and reels, and WhatsApp, email and SMS for replies.' },
  { q: 'What if I have no online presence yet?', a: 'That is a good place to start. We build your page from your website or your photos, and begin posting from the first week.' },
  { q: 'What happens if I run out of credits?', a: 'You can top up any time from inside the app, and nothing pauses while you wait for the plan to reset.' },
]

function FAQItem({ n, q, a }: { n: number; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-rule transition-all duration-200 ${open ? 'border-l-2 border-l-gold pl-5' : 'pl-0'}`}>
      <button onClick={() => { soundEngine.playClick(); setOpen(!open) }} className="w-full flex items-center justify-between py-6 text-left cursor-pointer group gap-4">
        <span className="flex items-baseline gap-4 pr-4">
          <span className="font-mono text-[12px] text-gold-text/60 flex-shrink-0">{String(n).padStart(2, '0')}</span>
          <span className="font-heading text-[19px] font-medium text-ink group-hover:text-gold-text transition-colors">{q}</span>
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex-shrink-0">
          <ChevronDown size={18} className="text-gold-text" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="font-body text-[15px] leading-[1.68] text-muted pb-6 pl-[42px]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <Schema data={faqSchema(faqs.map(f => ({ q: f.q, a: f.a })))} />
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="max-w-[640px] mb-[62px]">
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">FAQ</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[34px] md:text-[50px]">
          Questions <span className="text-gold-display">owners ask.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOptions}
        className="hud-card rounded-[18px] px-8"
      >
        {faqs.map((faq, i) => <FAQItem key={i} n={i + 1} q={faq.q} a={faq.a} />)}
      </motion.div>
    </section>
  )
}
