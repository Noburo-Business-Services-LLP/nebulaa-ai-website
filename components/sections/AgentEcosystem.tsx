'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Three cards led by a real screen recording, not an icon and a paragraph.
 * This replaced a hub-and-spoke wiring diagram of "Core" learning from
 * "Gravity/Orbit/Pulsar" (too much architecture, not a pitch), and then a
 * plainer icon+text version of the same three cards — which was still too
 * much reading for someone deciding in ten seconds whether to keep
 * scrolling. The clip is the pitch; the two lines of text underneath just
 * name what it is.
 */
const OUTCOMES = [
  {
    id: 'gravity',
    slot: 'demo-content',
    title: 'Your page never goes quiet',
    body: 'New posts and offers go out on their own, all month.',
  },
  {
    id: 'orbit',
    slot: 'demo-leads',
    title: 'New customers get found',
    body: 'Real, nearby businesses get found and contacted for you.',
  },
  {
    id: 'pulsar',
    slot: 'demo-replies',
    title: 'Nobody waits for a reply',
    body: 'WhatsApp and email get answered within minutes, any hour.',
  },
]

export default function AgentEcosystem() {
  return (
    <section id="how-it-works" className="py-[110px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[640px] mb-[52px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[18px] block">What you get</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[30px] md:text-[44px] text-ink">
          Three things stop being <span className="text-gold-display">your problem.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid sm:grid-cols-3 gap-5"
      >
        {OUTCOMES.map(o => (
          <motion.div key={o.id} variants={fadeUpVariant}>
            <Link href={`/product/${o.id}`} className="group block h-full">
              <div className="rounded-[18px] overflow-hidden mb-4">
                <MediaSlot id={o.slot} ratio="4 / 5" />
              </div>
              <h3 className="font-heading font-medium text-[18px] mb-1.5 group-hover:text-gold-text transition-colors">
                {o.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-muted">{o.body}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
