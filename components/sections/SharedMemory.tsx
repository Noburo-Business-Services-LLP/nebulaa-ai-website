'use client'

import { motion } from 'framer-motion'
import { Sparkles, Hash, MessageSquareQuote, Clock } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const SIGNALS = [
  {
    icon: MessageSquareQuote,
    label: 'Copy & hooks',
    body: 'Which opening line actually got a reply, which caption fell flat — the tone that works for your audience specifically, not audiences in general.',
  },
  {
    icon: Hash,
    label: 'Hashtags & reach',
    body: 'The tags pulling reach this month, dropped the moment they stop, replaced without you asking.',
  },
  {
    icon: Sparkles,
    label: 'Visual style',
    body: 'The colours, the framing, the format your customers stop scrolling for — read from what performed, not guessed at.',
  },
  {
    icon: Clock,
    label: 'Timing & CTA',
    body: 'When your audience is actually online, and which call-to-action moves them — learned per account, not copied from a playbook.',
  },
]

export default function SharedMemory() {
  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[720px] mb-[64px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">One memory, three agents</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="font-heading text-[33px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium mb-6"
        >
          It doesn&apos;t forget <span className="italic text-gold-text">what worked.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-[16.5px] leading-[1.7] text-muted">
          Orbit, Gravity and Pulsar read from and write to the same memory. What gets engagement,
          what gets a reply, what a lead responds to — none of it evaporates after the post goes up
          or the conversation ends. It shapes what runs next, on that account, for that audience.
          Not a template getting reused. A system that knows your business better with every week it runs.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {SIGNALS.map((s, i) => (
          <motion.div key={s.label} variants={fadeUpVariant}>
            <HudCard halo={i % 2 === 0 ? 'amber' : 'cyan'} className="p-7 h-full">
              <s.icon size={20} className="text-gold-text mb-5" />
              <h3 className="font-heading font-medium text-[16.5px] mb-2.5">{s.label}</h3>
              <p className="text-[13.5px] leading-[1.62] text-muted">{s.body}</p>
            </HudCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
