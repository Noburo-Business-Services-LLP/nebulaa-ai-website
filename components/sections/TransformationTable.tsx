'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const rows = [
  { workflow: 'Social Posting', before: 'Inconsistent, forgotten', after: 'AI-written, auto-scheduled daily ✓' },
  { workflow: 'Lead Follow-Up', before: 'Manual, delayed', after: 'Voice call + WhatsApp in 5 min ✓' },
  { workflow: 'Competitor Tracking', before: 'Never checked', after: 'Live alerts, daily ✓' },
  { workflow: 'Lead Tracking', before: 'Sticky notes chaos', after: 'Auto-updated pipeline ✓' },
  { workflow: 'Execution Rhythm', before: 'Unpredictable', after: 'Structured, every day ✓' },
]

export default function TransformationTable() {
  return (
    <section className="bg-white dark:bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Before vs After</SectionLabel></motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight">Before. After.</motion.h2>
          <motion.p variants={fadeUpVariant} className="font-body text-base text-brand-muted dark:text-white/50 mt-3">One tool. Everything changes.</motion.p>
        </motion.div>

        {/* Desktop table */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOptions} transition={{ duration: 0.6 }} className="hidden md:block rounded-2xl overflow-hidden border border-brand-border dark:border-white/10 shadow-card">
          <div className="grid grid-cols-3">
            <div className="bg-brand-warm-gray dark:bg-white/5 px-6 py-4 font-body text-xs font-bold tracking-widest uppercase text-brand-muted dark:text-white/50 border-b border-r border-brand-border dark:border-white/10">Workflow</div>
            <div className="bg-red-50 dark:bg-red-950/30 px-6 py-4 border-b border-r border-brand-border dark:border-white/10">
              <span className="flex items-center gap-2 font-body text-xs font-bold tracking-widest uppercase text-red-400"><span className="w-2 h-2 rounded-full bg-red-400" />Before Nebulaa</span>
            </div>
            <div className="bg-brand-gold-pale dark:bg-brand-gold/10 px-6 py-4 border-b border-brand-border dark:border-white/10">
              <span className="flex items-center gap-2 font-body text-xs font-bold tracking-widest uppercase text-brand-gold"><span className="w-2 h-2 rounded-full bg-brand-gold" />After Nebulaa</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 group hover:bg-brand-warm-gray/50 dark:hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-white dark:bg-brand-black' : 'bg-brand-off-white/50 dark:bg-white/[0.02]'}`}>
              <div className="px-6 py-5 font-body font-semibold text-sm text-brand-text dark:text-white border-r border-brand-border dark:border-white/10 group-hover:border-l-2 group-hover:border-l-brand-gold transition-all">{row.workflow}</div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} transition={{ delay: i * 0.08 }} className="px-6 py-5 font-body text-sm text-red-400 border-r border-brand-border dark:border-white/10">{row.before}</motion.div>
              <motion.div initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOptions} transition={{ delay: i * 0.08 + 0.3 }} className="px-6 py-5 font-body text-sm font-medium text-brand-text dark:text-white">{row.after}</motion.div>
            </div>
          ))}
        </motion.div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOptions} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/10 p-5 shadow-card">
              <p className="font-body font-bold text-sm text-brand-text dark:text-white mb-3">{row.workflow}</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-start"><span className="w-16 font-body text-xs font-semibold text-red-400 flex-shrink-0">Before</span><span className="font-body text-sm text-red-400">{row.before}</span></div>
                <div className="flex gap-2 items-start"><span className="w-16 font-body text-xs font-semibold text-brand-gold flex-shrink-0">After</span><span className="font-body text-sm font-medium text-brand-text dark:text-white">{row.after}</span></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} transition={{ delay: 0.5 }} className="text-center font-body text-sm text-brand-muted dark:text-white/50 mt-10">
          This is what founders experience in their first 30 days.
        </motion.p>
      </div>
    </section>
  )
}
