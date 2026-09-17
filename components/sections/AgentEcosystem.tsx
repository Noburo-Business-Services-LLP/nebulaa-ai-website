'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Radar, MessageSquareText, Orbit as OrbitIcon, BrainCircuit } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const AGENTS = [
  { id: 'orbit', name: 'Orbit', icon: OrbitIcon, purpose: 'Finds and qualifies leads', status: 'ACTIVE', accent: '#F5A623' },
  { id: 'gravity', name: 'Gravity', icon: Radar, purpose: 'Plans and makes the content', status: 'ACTIVE', accent: '#F5A623' },
  { id: 'pulsar', name: 'Pulsar', icon: MessageSquareText, purpose: 'Answers and qualifies leads', status: 'ACTIVE', accent: '#38BDF8' },
]

/**
 * "Not four ordinary feature cards" — a hub-and-spoke diagram (Core in the
 * center, the three agents connected to it) rather than another card grid.
 * SVG lines only render on wider screens; the diagram still reads as a
 * connected system on mobile through proximity and the shared "→ Core"
 * labeling, per the audit doc's "convert complex HUD layouts into clean
 * vertical modules" mobile rule.
 */
export default function AgentEcosystem() {
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
          <SectionLabel className="mb-[22px] block">One objective. Multiple agents.</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="font-heading text-[33px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium">
          Not separate tools. <span className="italic text-gold-text">A coordinated system.</span>
        </motion.h2>
      </motion.div>

      <div className="relative max-w-[820px] mx-auto">
        {/* Connector lines — desktop only */}
        <svg
          className="hidden md:block absolute left-0 top-0 w-full h-full pointer-events-none"
          viewBox="0 0 820 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="410" y1="140" x2="137" y2="300" stroke="rgba(245,166,35,0.25)" strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1="410" y1="140" x2="410" y2="300" stroke="rgba(245,166,35,0.25)" strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1="410" y1="140" x2="683" y2="300" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" strokeDasharray="4 5" />
        </svg>

        {/* Core */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex justify-center mb-16 md:mb-0"
        >
          <Link href="/product/core" className="group">
            <HudCard halo="cyan" className="px-8 py-6 text-center hover:border-gold/30 transition-colors">
              <BrainCircuit size={22} className="text-gold-text mx-auto mb-3" />
              <SectionLabel tone="muted" className="mb-1.5 block">Nebulaa Core</SectionLabel>
              <p className="font-heading text-[15px] font-medium">Cross-agent intelligence</p>
            </HudCard>
          </Link>
        </motion.div>

        {/* Agents */}
        <div className="relative z-10 grid sm:grid-cols-3 gap-6 md:mt-[140px]">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/product/${a.id}`} className="group block">
                <HudCard halo={i === 2 ? 'cyan' : 'amber'} className="p-7 h-full hover:border-gold/30 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <a.icon size={20} style={{ color: a.accent }} />
                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider" style={{ color: a.accent }}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: a.accent }} />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: a.accent }} />
                      </span>
                      {a.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-medium text-[19px] mb-1.5">{a.name}</h3>
                  <p className="text-[13.5px] leading-[1.55] text-muted">{a.purpose}</p>
                </HudCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
