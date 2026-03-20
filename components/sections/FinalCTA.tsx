'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

export default function FinalCTA() {
  return (
    <section className="bg-brand-off-white dark:bg-[#0F0E0C] py-32 relative overflow-hidden">
      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image src="/images/logo-dark.png" alt="" width={320} height={80} className="opacity-[0.04] dark:opacity-[0.03] w-80 object-contain select-none" aria-hidden />
      </div>

      {/* Gold glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-6 block">Start Today</SectionLabel></motion.div>

          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-[52px] md:text-[72px] leading-[0.95] tracking-tight text-brand-text dark:text-white mb-3">
            Sell while you sleep.
          </motion.h2>

          <motion.p variants={fadeUpVariant} className="font-heading font-semibold text-[28px] md:text-[36px] leading-tight text-gradient-gold mb-4">
            Gravity posts. Pulsar follows up.
          </motion.p>

          <motion.p variants={fadeUpVariant} className="font-body text-base text-brand-muted dark:text-white/50 mb-10">
            You wake up to leads, not a blank pipeline.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="inline-flex items-center justify-center bg-brand-gold text-brand-black font-body font-bold rounded-full px-10 py-4 text-base hover:bg-brand-gold-dim animate-pulse-gold transition-all hover:scale-[1.03] active:scale-[0.97]">
              Start Free Trial →
            </a>
            <a href="#" className="inline-flex items-center justify-center border border-brand-border dark:border-white/10 text-brand-muted dark:text-white/60 font-body font-medium rounded-full px-10 py-4 text-base hover:border-brand-gold hover:text-brand-text dark:hover:text-white transition-all hover:scale-[1.03] active:scale-[0.97]">
              Book a Demo
            </a>
          </motion.div>

          <motion.p variants={fadeUpVariant} className="font-body text-xs text-brand-muted-2 dark:text-white/30 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>✓ 7-day free trial</span><span>✓ No credit card</span><span>✓ Setup in 24 hrs</span><span>✓ Cancel anytime</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
