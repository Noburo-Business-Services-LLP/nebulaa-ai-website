'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const STEPS = [
  { slot: 'how-share', title: 'Share your website or Instagram', body: 'That is all we need to understand your business.' },
  { slot: 'how-make', title: 'We plan and make the month', body: 'Posts, photos and reels written for your customers. You approve them on your phone.' },
  { slot: 'how-reply', title: 'Customers message you', body: 'Enquiries reach your WhatsApp already answered and sorted.' },
]

function Arrow() {
  return (
    <div className="hidden md:flex items-center justify-center" aria-hidden="true">
      <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
        <motion.path
          d="M2 12h54"
          stroke="var(--coral)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOptions}
          transition={{ duration: 0.8 }}
        />
        <path d="M52 5l9 7-9 7" stroke="var(--coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/** A real sequence, so the order carries meaning: three photo cards joined by dashed arrows. */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px] bg-surface-2">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[720px] mb-11"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">How it works</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[36px] md:text-[54px]">
          You share. We do the work. <span className="text-gold-display">They message you.</span>
        </motion.h2>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-start">
        {STEPS.flatMap((s, i) => {
          const card = (
            <motion.div
              key={s.slot}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ delay: i * 0.1 }}
            >
              <div className="rounded-[22px] overflow-hidden border border-rule mb-4">
                <MediaSlot id={s.slot} ratio="4 / 3" compact />
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-ground text-[14px] font-extrabold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-heading text-[18px] leading-[1.25] mb-1">{s.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-ink-2">{s.body}</p>
                </div>
              </div>
            </motion.div>
          )
          return i < STEPS.length - 1 ? [card, <div key={`a${i}`} className="md:mt-[64px]"><Arrow /></div>] : [card]
        })}
      </div>
    </section>
  )
}
