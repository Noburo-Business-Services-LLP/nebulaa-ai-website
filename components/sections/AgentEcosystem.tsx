'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PenLine, Users, MessageCircle } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Three plain outcome cards — what a reader actually gets, not the system
 * that produces it. This replaced a hub-and-spoke wiring diagram of "Core"
 * learning from "Gravity/Orbit/Pulsar": accurate, but it reads as a product
 * architecture slide, not a pitch to a shop or hotel owner deciding in ten
 * seconds whether to keep scrolling. No status pills, no "engine," no
 * diagram — just what happens for the business.
 */
const OUTCOMES = [
  {
    id: 'gravity',
    icon: PenLine,
    title: 'Your page never goes quiet',
    body: 'New posts, photos and offers go out through the month, on their own, so anyone checking your page sees you\'re active.',
  },
  {
    id: 'orbit',
    icon: Users,
    title: 'New customers get found',
    body: 'Real, nearby businesses matching who you sell to get found and contacted for you, instead of waiting for them to find you first.',
  },
  {
    id: 'pulsar',
    icon: MessageCircle,
    title: 'Nobody waits for a reply',
    body: 'WhatsApp, email and calls get answered within minutes, any hour, so an enquiry never goes cold before you see it.',
  },
]

export default function AgentEcosystem() {
  return (
    <section className="py-[110px] px-6 md:px-12 lg:px-[120px]">
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
            <Link
              href={`/product/${o.id}`}
              className="group block h-full bg-surface border border-rule rounded-[18px] p-7 hover:border-gold/30 transition-colors"
            >
              <span className="inline-flex w-11 h-11 rounded-full bg-gold-wash items-center justify-center mb-5">
                <o.icon size={19} className="text-gold-text" />
              </span>
              <h3 className="font-heading font-medium text-[19px] mb-2.5">{o.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-muted">{o.body}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
