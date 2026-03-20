'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

type BusinessType = 'startup' | 'gym' | 'tuition' | 'agency' | 'd2c' | 'realestate'

interface UseCase {
  icon: string
  label: string
  desc: string
  gravity: string[]
  pulsar: string[]
  hours: number
}

const useCases: Record<BusinessType, UseCase> = {
  startup: {
    icon: '🚀',
    label: 'Startup Founder',
    desc: 'Pre-seed to Series A',
    gravity: ['Posts 21x/week on LinkedIn + Twitter', 'Tracks 3 competitors in your space', 'Writes content in founder voice', 'Auto-posts on IPL, Budget Day, startup events'],
    pulsar: ['Calls inbound leads within 5 mins of signup', 'Sends follow-up WhatsApp in your name', 'Runs 7-day drip for cold outreach', 'Qualifies and scores every lead automatically'],
    hours: 24,
  },
  gym: {
    icon: '🏋️',
    label: 'Gym / Fitness',
    desc: 'Studios · Fitness Centres',
    gravity: ['Posts workout content, diet tips, transformations', 'Festival fitness challenges auto-created', 'Competitor gym tracking and counters', 'Monthly fitness calendar content auto-filled'],
    pulsar: ['Calls enquiry leads within minutes', 'Sends class schedule + pricing on WhatsApp', 'Follow-up drip for trial class no-shows', 'Bulk WhatsApp for new batch announcements'],
    hours: 18,
  },
  tuition: {
    icon: '📚',
    label: 'Tuition Centre',
    desc: 'Coaching · EdTech',
    gravity: ['Posts student success stories and exam tips', 'Board exam season content auto-generated', 'Subject-specific educational threads', 'Parent-facing trust-building content'],
    pulsar: ['Calls admission enquiries instantly', 'Sends fee structure + timetable on WhatsApp', 'Follow-up drip for interested but waiting parents', 'Bulk SMS/WhatsApp for results and announcements'],
    hours: 15,
  },
  agency: {
    icon: '🏪',
    label: 'Local Agency',
    desc: 'Digital · Marketing · Creative',
    gravity: ['Case study posts from your work', 'Industry trend commentary auto-drafted', 'LinkedIn thought leadership for founders', 'Festival campaign ideas and posts'],
    pulsar: ['Calls inbound leads from website/forms', 'Sends proposal reminders automatically', '5-touch follow-up for cold prospects', 'Bulk outreach for new service launches'],
    hours: 20,
  },
  d2c: {
    icon: '🛍️',
    label: 'D2C Brand',
    desc: 'E-commerce · Consumer Brands',
    gravity: ['Product launch content across platforms', 'UGC-style posts and testimonial reposts', 'Festival sale campaigns auto-created', 'Competitor product tracking and counters'],
    pulsar: ['Calls abandoned cart leads (COD)', 'WhatsApp order updates and follow-ups', 'Post-purchase review request sequences', 'Bulk campaign for sale announcements'],
    hours: 22,
  },
  realestate: {
    icon: '🏠',
    label: 'Real Estate',
    desc: 'Brokers · Developers · Agents',
    gravity: ['New listing posts auto-formatted', 'Area-specific market insights weekly', 'Testimonial and sold-property showcases', 'Festival gifting / investment content'],
    pulsar: ['Calls property enquiry leads instantly', 'Sends brochures + site visit links on WhatsApp', '10-day nurture sequence for cold leads', 'Bulk WhatsApp for new project launches'],
    hours: 16,
  },
}

export default function UseCaseSimulator() {
  const [selected, setSelected] = useState<BusinessType | null>(null)
  const selectedData = selected ? useCases[selected] : null

  return (
    <section className="bg-brand-warm-gray dark:bg-[#111110] py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Interactive Demo</SectionLabel></motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight mb-4">
            Pick your business. See what Nebulaa does.
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="font-body text-base text-brand-muted dark:text-white/50 max-w-lg mx-auto">
            No two businesses are the same. Here&apos;s what it looks like for yours.
          </motion.p>
        </motion.div>

        {/* Business picker */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {(Object.entries(useCases) as [BusinessType, UseCase][]).map(([key, uc]) => (
            <motion.button
              key={key}
              variants={fadeUpVariant}
              onClick={() => setSelected(key)}
              className={`bg-white dark:bg-white/5 rounded-2xl p-5 border text-left cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${
                selected === key
                  ? 'border-brand-gold bg-brand-gold-pale dark:bg-brand-gold/15 shadow-gold-sm'
                  : 'border-brand-border dark:border-white/10 hover:border-brand-gold/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-3xl block mb-2">{uc.icon}</span>
              <p className="font-body font-bold text-sm text-brand-text dark:text-white">{uc.label}</p>
              <p className="font-body text-xs text-brand-muted dark:text-white/50 mt-0.5">{uc.desc}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Result panel */}
        <AnimatePresence mode="wait">
          {selectedData && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#1A1815] rounded-3xl border border-brand-border dark:border-white/8 shadow-card-hover p-8 md:p-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">{selectedData.icon}</span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-text dark:text-white">Your Nebulaa Setup</h3>
                  <p className="font-body text-sm text-brand-muted dark:text-white/50">{selectedData.label}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">🌀 GRAVITY does this for you:</p>
                  <ul className="space-y-2.5">
                    {selectedData.gravity.map((item, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-2.5 font-body text-sm text-brand-text dark:text-white">
                        <span className="text-brand-gold mt-0.5 flex-shrink-0">→</span>{item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-gold mb-4">📞 PULSAR does this for you:</p>
                  <ul className="space-y-2.5">
                    {selectedData.pulsar.map((item, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.2 }} className="flex items-start gap-2.5 font-body text-sm text-brand-text dark:text-white">
                        <span className="text-brand-gold mt-0.5 flex-shrink-0">→</span>{item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-brand-border dark:border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div>
                  <p className="font-body text-sm text-brand-muted dark:text-white/50">Estimated time you save:</p>
                  <p className="font-heading text-3xl font-bold text-brand-text dark:text-white mt-1">
                    <AnimatedCounter target={selectedData.hours} suffix=" hrs/week" />
                  </p>
                </div>
                <a href="#pricing" className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-7 py-3.5 hover:bg-brand-gold-dim animate-pulse-gold transition-all hover:scale-[1.03]">
                  Start Free Trial for {selectedData.label} →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <div className="text-center py-10 font-body text-brand-muted dark:text-white/50 text-sm">
            ↑ Select your business type above to see your custom setup
          </div>
        )}
      </div>
    </section>
  )
}
