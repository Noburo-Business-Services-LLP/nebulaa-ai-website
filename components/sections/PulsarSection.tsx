'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import PhoneMockup from '@/components/ui/PhoneMockup'

const pulsarFeatures = [
  {
    id: 'call',
    heading: 'Calls your leads. Qualifies them. Sounds human.',
    visual: (
      <PhoneMockup>
        <div className="p-4 space-y-3">
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">📞</span>
            </div>
            <p className="font-heading font-semibold text-sm text-brand-text dark:text-white">Rahul S.</p>
            <p className="font-body text-xs text-brand-muted dark:text-white/50">B2B SaaS Lead</p>
            <motion.p className="font-body text-xs text-green-600 font-semibold mt-1 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              00:42
            </motion.p>
          </div>
          <div className="space-y-2">
            {['Hi Rahul, this is Nebulaa calling...', '"Yes, interested in the product."', 'Scheduling call with founder...'].map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.6 }} className={`font-body text-xs p-2.5 rounded-xl ${i === 1 ? 'bg-brand-warm-gray dark:bg-white/10 ml-4 text-brand-text dark:text-white' : 'bg-brand-gold/15 dark:bg-brand-gold/20 text-brand-black dark:text-white border border-brand-gold/30'}`}>
                {msg}
              </motion.div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    ),
  },
  {
    id: 'whatsapp',
    heading: 'Follows up on WhatsApp, email, SMS. Automatically.',
    visual: (
      <PhoneMockup>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">N</div>
            <div>
              <p className="font-heading text-xs font-semibold text-brand-text dark:text-white">Nebulaa (Pulsar)</p>
              <p className="font-body text-[10px] text-brand-muted dark:text-white/50">online</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { sender: 'pulsar', msg: 'Hi [Name], this is Nebulaa on behalf of [Company]...' },
              { sender: 'lead', msg: 'Yes, I\'m interested, what are the prices?' },
              { sender: 'pulsar', msg: 'Great! Scheduling a quick call with our founder for you 📅' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.5 }} className={`font-body text-xs p-2.5 rounded-xl max-w-[85%] ${m.sender === 'lead' ? 'ml-auto bg-white dark:bg-white/10 border border-brand-border dark:border-white/20 text-brand-text dark:text-white' : 'bg-green-50 dark:bg-green-800/30 border border-green-200 dark:border-green-700/40 text-brand-text dark:text-white'}`}>
                {m.msg}
              </motion.div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    ),
  },
  {
    id: 'scoring',
    heading: 'Scores every lead. Hands off only the warm ones to you.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-5">Lead Pipeline</p>
        <div className="space-y-4">
          {[
            { name: 'Arjun M.', score: 82, status: 'WARM ✓', color: 'bg-brand-gold' },
            { name: 'Priya K.', score: 54, status: 'Nurturing', color: 'bg-yellow-400' },
            { name: 'Ravi S.', score: 28, status: 'Cold', color: 'bg-brand-border' },
          ].map((lead, i) => (
            <div key={i} className="bg-white dark:bg-[#1A1815] rounded-xl p-3 border border-brand-border dark:border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm font-semibold text-brand-text dark:text-white">{lead.name}</span>
                <span className="font-body text-xs font-semibold text-brand-gold">{lead.status}</span>
              </div>
              <div className="h-1.5 bg-brand-border dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${lead.score}%` }} transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }} className={`h-full rounded-full ${lead.color}`} />
              </div>
              <p className="font-body text-xs text-brand-muted dark:text-white/50 mt-1">Score: {lead.score}/100</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'sequence',
    heading: 'Runs 7-day sequences. Automatically. You set it once.',
    visual: (
      <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-5">Outreach Sequence</p>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[{ day: 'Day 1', action: 'Call', icon: '📞' }, { day: 'Day 2', action: 'WhatsApp', icon: '💬' }, { day: 'Day 4', action: 'Email', icon: '📧' }, { day: 'Day 7', action: 'Follow-up', icon: '🔔' }].map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(245,166,35,0.4)', '0 0 0 8px rgba(245,166,35,0)', '0 0 0 0 rgba(245,166,35,0)'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} className="bg-white dark:bg-[#1A1815] border-2 border-brand-gold rounded-xl p-3 text-center min-w-[70px]">
                <span className="text-xl">{step.icon}</span>
                <p className="font-body text-[10px] font-bold text-brand-gold mt-1">{step.day}</p>
                <p className="font-body text-[10px] text-brand-muted dark:text-white/50">{step.action}</p>
              </motion.div>
              {i < 3 && <div className="w-4 h-px bg-brand-gold flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function PulsarSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)))
      setActiveIdx(Math.min(pulsarFeatures.length - 1, Math.floor(progress * pulsarFeatures.length)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="pulsar" ref={sectionRef} className="bg-brand-off-white dark:bg-[#0F0E0C]" style={{ minHeight: `${pulsarFeatures.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.4 }} className="flex justify-center">
              {pulsarFeatures[activeIdx].visual}
            </motion.div>
          </AnimatePresence>

          {/* Right — sticky copy */}
          <div>
            <SectionLabel className="mb-4 block">📞 Pulsar</SectionLabel>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight leading-tight mb-3">
              Every lead,<br />called and<br />followed up.
            </h2>
            <p className="font-body text-sm font-semibold text-brand-gold tracking-wide mb-5">Pulsar converts while you sleep.</p>
            <AnimatePresence mode="wait">
              <motion.p key={activeIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="font-body text-base text-brand-muted dark:text-white/50 leading-relaxed mb-8 max-w-sm">
                {pulsarFeatures[activeIdx].heading}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-2">
              {pulsarFeatures.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? 'bg-brand-gold w-8' : 'bg-brand-border w-4'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
