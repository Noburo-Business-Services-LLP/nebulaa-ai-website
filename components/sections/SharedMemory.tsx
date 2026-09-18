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
    body: 'Tracks which opening lines get replies and which captions underperform, learning the tone that works for your specific audience.',
  },
  {
    icon: Hash,
    label: 'Hashtags & reach',
    body: 'Tracks which tags are driving reach this month and automatically replaces the ones that stop working.',
  },
  {
    icon: Sparkles,
    label: 'Visual style',
    body: 'Learns the colours, framing and format that get your customers to stop scrolling, based on what has actually performed.',
  },
  {
    icon: Clock,
    label: 'Timing & CTA',
    body: 'Learns when your audience is online and which call-to-action moves them, specific to each account.',
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
          <SectionLabel className="mb-[22px] block">One memory, three engines</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="neb-display text-[33px] md:text-[50px] mb-6"
        >
          <span className="text-gold-display">One memory</span>, shared across all three engines.
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-[16.5px] leading-[1.7] text-muted">
          Orbit, Gravity and Pulsar read from and write to the same memory. What gets engagement,
          what gets a reply, and what a lead responds to all feeds back into future work on that
          account, for that audience. The system gets better at your business with every week it runs,
          rather than starting over each time.
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
