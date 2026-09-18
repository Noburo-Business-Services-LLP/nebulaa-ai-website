'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

export default function FinalCTA() {
  return (
    <section className="relative pt-[150px] pb-[140px] px-6 md:px-12 lg:px-[120px] text-center border-t border-rule overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="relative"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="neb-display text-[36px] md:text-[62px] mb-[26px]"
        >
          Start with your URL.
          <br />
          <span className="text-gold-display">See what it makes of you.</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariant}
          className="font-body text-[17.5px] leading-[1.65] text-muted max-w-[500px] mx-auto mb-[42px]"
        >
          A minute to your first brand read from Nebulaa, the AI marketing platform built for founders. A week to decide whether it deserves your money. No card until you&apos;ve seen it work.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row justify-center gap-[14px]">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center bg-gold text-[#1A1208] text-[15px] font-semibold px-[34px] py-4 rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:bg-gold-dim transition-colors"
          >
            Start free — no card
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center border border-rule-2 text-ink-2 text-[15px] font-medium px-[30px] py-4 rounded-full hover:border-gold hover:text-gold-text transition-colors"
          >
            Book a 20-min call
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
