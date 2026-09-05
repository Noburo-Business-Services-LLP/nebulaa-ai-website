'use client'

import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

export default function FinalCTA() {
  return (
    <section className="relative pt-[150px] pb-[140px] px-6 md:px-12 lg:px-[120px] text-center border-t border-white/[0.06] overflow-hidden">
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
          className="font-heading text-[36px] md:text-[62px] leading-[1.12] md:leading-[1.08] tracking-[-0.02em] font-medium mb-[26px]"
        >
          Start with your URL.
          <br />
          <span className="italic text-brand-gold">See what it makes of you.</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariant}
          className="font-body text-[17.5px] leading-[1.65] text-white/55 max-w-[500px] mx-auto mb-[42px]"
        >
          A minute to your first brand read. A week to decide whether any of this deserves your money. No card until you&apos;ve seen it work.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row justify-center gap-[14px]">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[34px] py-4 rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:bg-brand-gold-dim transition-colors"
          >
            Start free — no card
          </a>
          <a
            href="/services/enterprise"
            className="inline-flex items-center justify-center border border-white/[0.12] text-white/75 text-[15px] font-medium px-[30px] py-4 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            Book a 20-min call
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
