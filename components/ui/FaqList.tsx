'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { soundEngine } from '@/lib/soundEngine'

export interface Faq {
  q: string
  a: string
}

function Item({ q, a }: Faq) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-rule transition-all duration-200 ${open ? 'border-l-2 border-l-gold pl-5 bg-gold/[0.03]' : 'pl-0'}`}>
      <button
        onClick={() => { soundEngine.playClick(); setOpen(!open) }}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group gap-4"
      >
        <span className="font-heading text-[17.5px] font-medium text-ink group-hover:text-gold-text transition-colors">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown size={18} className="text-gold-text" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-[15px] leading-[1.7] text-muted pb-5 max-w-[74ch]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Renders an FAQ block and emits FAQPage schema alongside it, so answer
 * engines can quote the answers rather than guessing at them.
 */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-[820px]">
        {faqs.map(f => (
          <Item key={f.q} {...f} />
        ))}
      </div>
    </>
  )
}
