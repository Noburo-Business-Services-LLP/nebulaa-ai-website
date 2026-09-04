'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Play, TrendingUp, Users, Zap } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'

const GRAVITY_POSTS = [
  '5 reasons your startup needs LinkedIn presence today →',
  'How we got 200 leads without paid ads — a founder story',
  'The ₹0 marketing playbook that actually works in 2025',
]

// Gravity card: shows AI writing a post with animated typing
function GravityCard() {
  const [postIdx, setPostIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const target = GRAVITY_POSTS[postIdx]
    if (isTyping) {
      if (typed.length < target.length) {
        const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 38)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setIsTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 18)
        return () => clearTimeout(t)
      } else {
        setPostIdx(i => (i + 1) % GRAVITY_POSTS.length)
        setIsTyping(true)
      }
    }
  }, [typed, isTyping, postIdx])

  const platforms = ['LinkedIn', 'Instagram', 'Twitter']
  const platformColors = ['bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400', 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 shadow-card dark:shadow-none p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌀</span>
          <span className="font-heading font-semibold text-sm text-brand-text dark:text-white">Gravity</span>
          <span className="text-[10px] font-body font-bold bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">● Live</span>
        </div>
        <span className="font-body text-xs text-brand-muted dark:text-white/40">AI writing post…</span>
      </div>

      {/* Post being written */}
      <div className="bg-brand-off-white dark:bg-white/5 rounded-xl p-3.5 mb-4 min-h-[56px]">
        <p className="font-body text-sm text-brand-text dark:text-white/80 leading-relaxed">
          {typed}<span className="animate-pulse text-brand-gold">|</span>
        </p>
      </div>

      {/* Platforms */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-body text-xs text-brand-muted dark:text-white/40 mr-1">Posting to:</span>
        {platforms.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className={`font-body text-[10px] font-semibold px-2 py-0.5 rounded-full ${platformColors[i]}`}
          >
            {p}
          </motion.span>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex gap-4">
        {[{ icon: <TrendingUp size={11} />, val: '142', label: 'views' }, { icon: <Users size={11} />, val: '18', label: 'likes' }, { icon: <Zap size={11} />, val: '3', label: 'DMs' }].map(s => (
          <div key={s.label} className="flex items-center gap-1 text-brand-muted dark:text-white/40">
            {s.icon}
            <span className="font-body text-xs font-semibold text-brand-text dark:text-white/70">{s.val}</span>
            <span className="font-body text-[10px]">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const PULSAR_MESSAGES = [
  '👋 Hi Priya! Saw your interest in our growth plan.',
  'Our AI agents handle your marketing 24/7.',
  'Would you like a 7-day free trial? No card needed.',
  '✅ Trial link sent to your WhatsApp!',
]

// Pulsar card: shows active AI call + WhatsApp messages appearing
function PulsarCard() {
  const [messages, setMessages] = useState<string[]>([])
  const [seconds, setSeconds] = useState(47)

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (messages.length >= PULSAR_MESSAGES.length) return
    const t = setTimeout(() => {
      setMessages(m => [...m, PULSAR_MESSAGES[m.length]])
    }, 1200 + messages.length * 900)
    return () => clearTimeout(t)
  }, [messages])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/8 shadow-card dark:shadow-none p-5"
    >
      {/* Call header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span className="font-heading font-semibold text-sm text-brand-text dark:text-white">Pulsar</span>
          <span className="text-[10px] font-body font-bold bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full border border-orange-200 dark:border-orange-800">● Calling</span>
        </div>
        <span className="font-body text-xs font-semibold text-brand-gold font-mono">{fmt(seconds)}</span>
      </div>

      {/* Waveform */}
      <div className="flex items-end justify-center gap-1 h-10 mb-4">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.4, 0.6, 0.9, 0.5].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-brand-gold"
            animate={{ scaleY: [h, h * 1.8, h * 0.5, h * 1.4, h] }}
            transition={{ duration: 0.8 + i * 0.07, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '100%', transformOrigin: 'bottom' }}
          />
        ))}
      </div>

      {/* WhatsApp messages */}
      <div className="space-y-2 max-h-[96px] overflow-hidden">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-xl px-3 py-2"
            >
              <p className="font-body text-[11px] text-brand-text dark:text-white/80">{msg}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Floating badge that appears with delay
function FloatingBadge({ children, delay, className }: { children: React.ReactNode; delay: number; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex items-center gap-2 bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/10 rounded-full px-3 py-1.5 shadow-card dark:shadow-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white dark:bg-brand-black overflow-hidden flex items-center">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(245,184,0,0.06) 0%, transparent 70%)' }} />
      <div className="dark:hidden absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-28 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center w-full">
        {/* Left — copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col">
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-4 block">Agentic AI for Founders &amp; SMEs</SectionLabel>
          </motion.div>

          <h1 className="font-heading font-bold text-[52px] md:text-[72px] leading-[0.95] tracking-tight text-brand-text dark:text-white mb-6">
            <motion.span variants={fadeUpVariant} initial="hidden" animate="visible" className="block">Your pipeline</motion.span>
            <motion.span variants={fadeUpVariant} initial="hidden" animate="visible" className="block" style={{ animationDelay: '100ms' }}>fills while</motion.span>
            <motion.span variants={fadeUpVariant} initial="hidden" animate="visible" className="block relative" style={{ animationDelay: '200ms' }}>
              you sleep.
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" preserveAspectRatio="none">
                <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="#F5B800" strokeWidth="2.5" fill="none" strokeLinecap="round" className="svg-underline" />
              </svg>
            </motion.span>
          </h1>

          <motion.p variants={fadeUpVariant} initial="hidden" animate="visible" className="font-body text-lg text-brand-muted dark:text-white/60 mb-8 max-w-sm">
            Gravity builds your audience. Pulsar qualifies your leads. Both work 24/7, so you don&apos;t have to.
          </motion.p>

          <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3">
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-7 py-3.5 hover:bg-brand-gold-dim animate-pulse-gold transition-all hover:scale-[1.03] active:scale-[0.97]">
              Start Free Trial →
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 border border-brand-border dark:border-white/10 text-brand-muted dark:text-white/60 font-body font-medium rounded-full px-7 py-3.5 hover:border-brand-gold hover:text-brand-text dark:hover:text-white transition-all hover:scale-[1.03] active:scale-[0.97]">
              <Play size={14} className="fill-current" />
              Watch 90-second demo
            </a>
          </motion.div>

          <motion.p variants={fadeUpVariant} initial="hidden" animate="visible" className="mt-5 font-body text-xs text-brand-muted-2 dark:text-white/30 flex items-center gap-2">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />Live</span>
            <span>·</span><span>No card required</span>
          </motion.p>
        </motion.div>

        {/* Right — 2D animated agent mockups */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:flex flex-col gap-4 relative"
        >
          {/* Floating badges */}
          <FloatingBadge delay={1.2} className="-top-4 right-8 z-20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-body text-xs font-semibold text-brand-text dark:text-white">3 posts scheduled today</span>
          </FloatingBadge>

          <FloatingBadge delay={1.6} className="bottom-4 -left-4 z-20">
            <span className="text-sm">🎯</span>
            <span className="font-body text-xs font-semibold text-brand-text dark:text-white">12 leads qualified today</span>
          </FloatingBadge>

          <GravityCard />
          <PulsarCard />
        </motion.div>
      </div>
    </section>
  )
}
