'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import BrowserMockup from '@/components/ui/BrowserMockup'
import TypewriterText from '@/components/ui/TypewriterText'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const tabs = [
  { id: 'setup', label: 'Setup (60 sec)', step: '01' },
  { id: 'gravity', label: 'Gravity Runs', step: '02' },
  { id: 'pulsar', label: 'Pulsar Runs', step: '03' },
]

const linkedinPosts = [
  'Why 80% of Indian founders burn out before hitting ₹1Cr ARR — and the one habit that changed everything...',
  "Stop pitching your product. Start sharing your journey. Here's what changed when we did...",
  'Hot take: The best GTM strategy for early-stage is to be undeniably specific about who you help.',
]

// 2D animated social platform orbit — Gravity visualisation
function GravityOrbit2D() {
  const platforms = [
    { name: 'LinkedIn', bg: '#0A66C2', emoji: '💼', x: 0, y: -118 },
    { name: 'Instagram', bg: '#E1306C', emoji: '📸', x: 102, y: 59 },
    { name: 'Twitter / X', bg: '#1DA1F2', emoji: '🐦', x: -102, y: 59 },
  ]
  const particles = [0, 60, 120, 180, 240, 300]

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center select-none">
      {/* Outermost faint ring */}
      <div className="absolute w-72 h-72 rounded-full border border-brand-gold/10 dark:border-white/5" />

      {/* Orbit ring — slowly spins */}
      <motion.div
        className="absolute w-56 h-56 rounded-full border-2 border-dashed border-brand-gold/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing glow rings */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-brand-gold/30"
          initial={{ width: 60, height: 60, opacity: 0.7 }}
          animate={{ width: [60, 200], height: [60, 200], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay }}
        />
      ))}

      {/* Center orb */}
      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold to-[#C49200] flex flex-col items-center justify-center shadow-[0_0_32px_rgba(245,184,0,0.4)]"
      >
        <span className="text-2xl">🌀</span>
        <span className="font-heading text-[9px] font-bold text-brand-black mt-0.5 tracking-wider">GRAVITY</span>
      </motion.div>

      {/* Rotating group carrying platform chips */}
      <motion.div
        className="absolute w-56 h-56"
        animate={{ rotate: 360 }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
      >
        {platforms.map((p) => (
          <motion.div
            key={p.name}
            style={{
              position: 'absolute',
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              transform: 'translate(-50%, -50%)',
              background: p.bg,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-1.5 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap"
          >
            <span>{p.emoji}</span>
            <span>{p.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Tiny gold dots around orbit */}
      {particles.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const r = 112
        const px = Math.cos(rad) * r
        const py = Math.sin(rad) * r
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-brand-gold z-10"
            style={{ left: `calc(50% + ${px}px)`, top: `calc(50% + ${py}px)`, transform: 'translate(-50%,-50%)' }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.33, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Live badge */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/10 rounded-full px-2.5 py-1 shadow z-30">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="font-body text-[10px] font-semibold text-brand-text dark:text-white">Posting now</span>
      </div>
    </div>
  )
}

function SetupTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted dark:text-white/50 mb-3">Step 01</p>
        <h3 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-4 leading-tight">Give it your URL.<br />That&apos;s it.</h3>
        <p className="font-body text-base text-brand-muted dark:text-white/50 leading-relaxed mb-6">Nebulaa reads your website, extracts your brand voice, ICP, competitors, and industry context. In 60 seconds. No forms to fill. No onboarding calls needed.</p>
        <div className="flex flex-wrap gap-2">
          {['Brand Voice Extracted ✓', 'ICP Identified ✓', 'Rivals Tracked ✓'].map(pill => (
            <span key={pill} className="font-body text-xs bg-brand-gold-pale border border-brand-gold/20 text-brand-text rounded-full px-3 py-1">{pill}</span>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <BrowserMockup url="nebulaa.ai/setup">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input className="flex-1 border border-brand-border dark:border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-brand-muted dark:text-white/50 dark:bg-white/5 outline-none focus:border-brand-gold transition-colors" placeholder="Enter your website URL..." defaultValue="myfounderstartup.com" readOnly />
              <button className="bg-brand-gold text-brand-black font-body font-semibold text-sm rounded-xl px-4 py-2.5">Analyse →</button>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Brand Voice', val: 'Confident, direct, founder-friendly' },
                { label: 'ICP', val: 'Founders, 25-45, B2B SaaS, India' },
                { label: 'Top rival', val: 'competitor.com — 3 posts this week' },
              ].map((row, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center gap-3 bg-brand-warm-gray dark:bg-white/5 rounded-xl px-4 py-2.5">
                  <span className="font-body text-xs font-semibold text-brand-gold w-24 flex-shrink-0">{row.label}</span>
                  <span className="font-body text-xs text-brand-text dark:text-white">{row.val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </BrowserMockup>
      </motion.div>
    </div>
  )
}

function GravityTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted dark:text-white/50 mb-3">Step 02</p>
        <h3 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-4 leading-tight">Gravity takes over.</h3>
        <p className="font-body text-base text-brand-muted dark:text-white/50 leading-relaxed mb-6">Every morning, Gravity generates platform-specific posts for your LinkedIn, Instagram, and Twitter. Schedules them. Posts them. You see it happen. You do nothing.</p>
        <div className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-4 border border-brand-border dark:border-white/10">
          <p className="font-body text-xs font-semibold text-brand-muted dark:text-white/50 mb-2">Currently drafting:</p>
          <TypewriterText texts={linkedinPosts} className="font-body text-sm text-brand-text dark:text-white" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <GravityOrbit2D />
      </motion.div>
    </div>
  )
}

function PulsarTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted dark:text-white/50 mb-3">Step 03</p>
        <h3 className="font-heading text-3xl font-bold text-brand-text dark:text-white mb-4 leading-tight">Pulsar calls while you sleep.</h3>
        <p className="font-body text-base text-brand-muted dark:text-white/50 leading-relaxed mb-6">Pulsar dials every lead, has a real conversation, and qualifies them — in your voice, your language. Warm leads land in your inbox. Cold leads stay in the sequence.</p>
        <div className="space-y-2">
          {[
            { name: 'Arjun M.', status: 'Qualified ✓', color: 'text-brand-gold' },
            { name: 'Priya K.', status: 'Calling...', color: 'text-green-600 animate-pulse' },
            { name: 'Ravi S.', status: 'Scheduled', color: 'text-brand-muted' },
          ].map((lead, i) => (
            <div key={i} className="flex items-center justify-between bg-brand-warm-gray dark:bg-white/5 rounded-xl px-4 py-3 border border-brand-border dark:border-white/10">
              <span className="font-body text-sm text-brand-text dark:text-white">{lead.name}</span>
              <span className={`font-body text-xs font-semibold ${lead.color}`}>{lead.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-brand-warm-gray dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="font-heading text-base font-semibold text-brand-text dark:text-white">📞 Live Call</span>
          <span className="flex items-center gap-1.5 font-body text-xs text-green-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />00:42
          </span>
        </div>
        <div className="space-y-2.5">
          {[
            { sender: 'Pulsar', msg: 'Hi Rahul, this is Nebulaa calling on behalf of your company...' },
            { sender: 'Lead', msg: "Yes, I'm interested, what are the prices?" },
            { sender: 'Pulsar', msg: "Great! I'd love to schedule a quick call with our founder..." },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.4 }}
              className={`font-body text-xs p-3 rounded-xl max-w-[85%] ${m.sender === 'Lead' ? 'ml-auto bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/10 text-brand-text dark:text-white' : 'bg-brand-gold/10 border border-brand-gold/20 text-brand-text dark:text-white'}`}
            >
              {m.msg}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function HowItWorks() {
  const [active, setActive] = useState('setup')

  return (
    <section id="how-it-works" className="bg-white dark:bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">How It Works</SectionLabel></motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight">Three steps. Then it runs itself.</motion.h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={viewportOptions} className="flex justify-center mb-12">
          <div className="inline-flex bg-brand-warm-gray dark:bg-white/5 rounded-full p-1 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`font-body text-sm font-semibold rounded-full px-5 py-2.5 transition-all duration-200 cursor-pointer ${active === tab.id ? 'bg-white dark:bg-[#1A1815] text-brand-text dark:text-white shadow-card' : 'text-brand-muted dark:text-white/50 hover:text-brand-text dark:hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            {active === 'setup' && <SetupTab />}
            {active === 'gravity' && <GravityTab />}
            {active === 'pulsar' && <PulsarTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
