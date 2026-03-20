'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'


const features = [
  {
    id: 'ingest',
    heading: 'Reads your website. Understands your brand in 60 seconds.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-4">Brand Ingestion</p>
        <div className="flex gap-2 mb-4">
          <input className="flex-1 border border-brand-border dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-3 py-2 font-body text-sm" defaultValue="yoursite.com" readOnly />
          <span className="bg-brand-gold text-brand-black font-body font-semibold text-xs rounded-xl px-3 py-2 flex items-center">Scanning...</span>
        </div>
        <div className="space-y-2">
          {[{ k: 'Tone', v: 'Confident & direct' }, { k: 'ICP', v: 'Indian founders, 25-45' }, { k: 'Rivals', v: '3 identified' }].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }} className="flex justify-between bg-white dark:bg-[#1A1815] rounded-lg px-3 py-2 border border-brand-border dark:border-white/8">
              <span className="font-body text-xs text-brand-muted dark:text-white/50">{r.k}</span>
              <span className="font-body text-xs font-semibold text-brand-gold">{r.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'schedule',
    heading: 'Writes and schedules posts across every platform. Daily.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-4">Content Queue — This Week</p>
        <div className="grid grid-cols-5 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, di) => (
            <div key={day} className="text-center">
              <p className="font-body text-xs text-brand-muted dark:text-white/50 mb-2">{day}</p>
              {['LI', 'IG', 'TW'].map((p, pi) => (
                <motion.div key={p} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (di * 3 + pi) * 0.05 }} className="mb-1.5 rounded-lg text-[9px] font-bold py-1 text-center" style={{ background: p === 'LI' ? '#0A66C2' : p === 'IG' ? '#E1306C' : '#1DA1F2', color: 'white' }}>{p}</motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'rival',
    heading: 'Watches your rivals. Alerts you when they move.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-4">Competitor Tracker</p>
        <div className="space-y-3">
          {[{ name: 'rival1.com', posts: 3, time: '2h ago' }, { name: 'competitor2.io', posts: 1, time: '5h ago' }, { name: 'brand3.in', posts: 5, time: 'Today' }].map((r, i) => (
            <div key={i} className="bg-white dark:bg-[#1A1815] rounded-xl p-3 border border-brand-border dark:border-white/8 flex items-center justify-between">
              <div>
                <p className="font-body text-xs font-semibold text-brand-text dark:text-white">{r.name}</p>
                <p className="font-body text-xs text-brand-muted dark:text-white/50">{r.posts} new posts · {r.time}</p>
              </div>
              <span className="font-body text-xs bg-brand-gold-pale text-brand-gold border border-brand-gold/20 rounded-full px-2.5 py-1">Alert !</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'calendar',
    heading: 'Never misses a cultural moment that could go viral.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-4">Festival Calendar</p>
        <div className="space-y-2.5">
          {[{ event: 'Diwali', days: '3 days away', status: 'Draft ready ✓' }, { event: 'IPL Final', days: '1 week away', status: 'Drafting...' }, { event: 'Budget Day', days: '2 weeks', status: 'Scheduled ✓' }].map((e, i) => (
            <div key={i} className="bg-white dark:bg-[#1A1815] rounded-xl p-3 border border-brand-border dark:border-white/8 flex items-center justify-between">
              <div>
                <p className="font-body text-xs font-semibold text-brand-text dark:text-white">{e.event}</p>
                <p className="font-body text-xs text-brand-muted dark:text-white/50">{e.days}</p>
              </div>
              <span className="font-body text-xs font-semibold text-brand-gold">{e.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function GravitySection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)))
      setActiveIdx(Math.min(features.length - 1, Math.floor(progress * features.length)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="gravity" ref={sectionRef} className="bg-white dark:bg-brand-black" style={{ minHeight: `${features.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — sticky copy */}
          <div>
            <SectionLabel className="mb-4 block">🌀 Gravity</SectionLabel>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight leading-tight mb-3">
              Your brand<br />never goes<br />quiet.
            </h2>
            <p className="font-body text-sm font-semibold text-brand-gold tracking-wide mb-5">Gravity posts while you build.</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="font-body text-base text-brand-muted dark:text-white/50 leading-relaxed mb-8 max-w-sm"
              >
                {features[activeIdx].heading}
              </motion.p>
            </AnimatePresence>
            {/* Progress dots */}
            <div className="flex gap-2">
              {features.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-brand-gold w-8' : 'bg-brand-border w-4'}`} />
              ))}
            </div>
          </div>

          {/* Right — animated visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
            >
              {features[activeIdx].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
