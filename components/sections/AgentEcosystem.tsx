'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Radar, MessageSquareText, Orbit as OrbitIcon, BrainCircuit } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

/**
 * Descriptions are the canonical engine definitions — the same sentences
 * used on the product pages and in orgFacts, so a reader meets one version
 * of what each engine does wherever they land.
 */
const ENGINES = [
  {
    id: 'gravity',
    name: 'Gravity',
    role: 'AI content & social media engine',
    icon: Radar,
    purpose: 'Plans, creates, publishes and monitors your content across the channels your business uses.',
  },
  {
    id: 'orbit',
    name: 'Orbit',
    role: 'AI lead generation engine',
    icon: OrbitIcon,
    purpose: 'Finds, enriches, qualifies and prepares the right prospects for outreach.',
  },
  {
    id: 'pulsar',
    name: 'Pulsar',
    role: 'AI outreach engine',
    icon: MessageSquareText,
    purpose: 'Responds, follows up, qualifies and keeps customer conversations moving.',
  },
]

/**
 * Hub and spoke — Core at the centre with the three engines connected to it —
 * rather than four feature cards, because the claim being made is that these
 * are coordinated rather than separate. Connector lines are desktop-only; on
 * mobile the relationship carries through order and the closing line instead,
 * which is the "clean vertical modules" rule rather than a shrunk diagram.
 */
export default function AgentEcosystem() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[680px] mb-[72px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">03 // The system</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="neb-display text-[33px] md:text-[50px] text-ink"
        >
          Three engines.
          <br />
          <span className="text-gold-display">One core.</span>
        </motion.h2>
      </motion.div>

      <div className="relative max-w-[820px] mx-auto">
        {/* Connector lines — desktop only. Drawn in on scroll, then a signal
            pulse loops along each one so the diagram reads as a running
            system rather than a static wiring chart. */}
        <svg
          className="hidden md:block absolute left-0 top-0 w-full h-full pointer-events-none"
          viewBox="0 0 820 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[137, 410, 683].map((x, i) => (
            <motion.line
              key={x}
              x1="410"
              y1="140"
              x2={x}
              y2="300"
              stroke="rgba(245,166,35,0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOptions}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
            />
          ))}
          {!reduceMotion &&
            [137, 410, 683].map((x, i) => (
              <motion.circle
                key={`pulse-${x}`}
                r="2.5"
                fill="#F5A623"
                initial={{ cx: 410, cy: 140, opacity: 0 }}
                whileInView={{
                  cx: [410, x],
                  cy: [140, 300],
                  opacity: [0, 1, 1, 0],
                }}
                viewport={viewportOptions}
                transition={{
                  duration: 1.8,
                  delay: 1.2 + i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 2.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </svg>

        {/* Core — the hub */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex justify-center mb-16 md:mb-0"
        >
          <Link href="/product/core" className="group block w-full max-w-[290px]">
            <HudCard
              halo="cyan"
              label="Cross-agent intelligence"
              status={{ tone: 'learning', label: 'Learning' }}
              className="group-hover:border-gold/30 transition-colors"
            >
              <div className="text-center">
                <BrainCircuit size={20} className="text-gold-text mx-auto mb-4" />
                <h3 className="font-heading font-medium text-[19px] mb-1.5">Core</h3>
                <p className="text-[13px] leading-[1.55] text-muted">
                  Learns from actions, outcomes and signals across the system — continuously
                  improving what happens next.
                </p>
              </div>
            </HudCard>
          </Link>
        </motion.div>

        {/* The three engines */}
        <div className="relative z-10 grid sm:grid-cols-3 gap-6 md:mt-[140px]">
          {ENGINES.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/product/${e.id}`} className="group block h-full">
                <HudCard
                  label={e.role}
                  status={{ tone: 'active', label: 'Ready' }}
                  className="h-full group-hover:border-gold/30 transition-colors"
                >
                  <e.icon size={20} className="text-gold-text mb-4" />
                  <h3 className="font-heading font-medium text-[19px] mb-1.5">{e.name}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-muted">{e.purpose}</p>
                </HudCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The closing statement from the master copy */}
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="neb-label text-center mt-14 leading-[2]"
        >
          Core learns. Gravity creates. Orbit finds. Pulsar engages.
        </motion.p>
      </div>
    </section>
  )
}
