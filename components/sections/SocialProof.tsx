'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const logos = ['D2C Brand','Fitness Studio','SaaS Startup','Coaching Centre','Digital Agency','Real Estate','EdTech','HR Tech','FMCG Brand','Legal Firm']
const testimonials = [
  { quote: '"Pulsar qualified 40 leads while I was on a flight. I landed to a warm pipeline."', name: 'Arjun M.', role: 'Founder @ B2B SaaS', initials: 'AM' },
  { quote: '"Gravity writes our LinkedIn posts better than our ex-marketing intern did. No offence."', name: 'Sneha R.', role: 'Co-founder @ D2C Brand', initials: 'SR' },
  { quote: '"Our gym gets 3-4 new enquiries every week on autopilot. Set it up in a day."', name: 'Karan V.', role: 'Owner @ Fitness Studio', initials: 'KV' },
]

export default function SocialProof() {
  return (
    <section className="bg-brand-off-white dark:bg-[#0F0E0C] py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Counters */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-3 gap-8 mb-20 text-center">
          {[{ target: 40, suffix: '+', label: 'Founders' }, { target: 1000, suffix: '+', label: 'Leads qualified' }, { target: 60, suffix: ' sec', label: 'Setup time' }].map((s, i) => (
            <motion.div key={i} variants={fadeUpVariant}>
              <p className="font-heading text-5xl font-bold text-brand-text dark:text-white"><AnimatedCounter target={s.target} suffix={s.suffix} /></p>
              <p className="font-body text-sm text-brand-muted dark:text-white/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Logo marquee */}
        <div className="overflow-hidden marquee-mask mb-20">
          <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="font-body text-sm text-brand-muted dark:text-white/50 bg-white dark:bg-white/5 border border-brand-border dark:border-white/8 rounded-xl px-5 py-2.5 opacity-50 hover:opacity-80 transition-opacity flex-shrink-0">{l}</div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUpVariant} className="bg-white dark:bg-[#1A1815] rounded-2xl p-6 shadow-card border border-brand-border dark:border-white/8 border-l-2 border-l-brand-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1 mb-4">{Array(5).fill(0).map((_, j) => <span key={j} className="text-brand-gold text-sm">★</span>)}</div>
              <p className="font-body text-sm text-brand-text dark:text-white leading-relaxed italic mb-5">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center font-heading text-xs font-bold text-brand-gold">{t.initials}</div>
                <div>
                  <p className="font-body text-sm font-semibold text-brand-text dark:text-white">{t.name}</p>
                  <p className="font-body text-xs text-brand-muted dark:text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
