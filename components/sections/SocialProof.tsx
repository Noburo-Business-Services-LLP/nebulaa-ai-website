'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const logos = ['D2C Brand','Fitness Studio','SaaS Startup','Coaching Centre','Digital Agency','Real Estate','EdTech','HR Tech','FMCG Brand','Legal Firm']

export default function SocialProof() {
  return (
    <section className="bg-brand-off-white dark:bg-[#0F0E0C] py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Counter */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-20">
          <motion.div variants={fadeUpVariant}>
            <p className="font-heading text-5xl font-bold text-brand-text dark:text-white"><AnimatedCounter target={60} suffix=" sec" /></p>
            <p className="font-body text-sm text-brand-muted dark:text-white/50 mt-1">Setup time</p>
          </motion.div>
        </motion.div>

        {/* Logo marquee */}
        <div className="overflow-hidden marquee-mask">
          <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="font-body text-sm text-brand-muted dark:text-white/50 bg-white dark:bg-white/5 border border-brand-border dark:border-white/8 rounded-xl px-5 py-2.5 opacity-50 hover:opacity-80 transition-opacity flex-shrink-0">{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
