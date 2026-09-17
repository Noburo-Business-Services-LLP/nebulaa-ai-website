'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Mail } from 'lucide-react'
import { trackLead } from '@/lib/analytics/track'

const DISMISSED_KEY = 'nebulaa_nl_popup_dismissed'

const socialProofs = [
  'Sent every Monday, 8 AM IST',
  'Real data. Zero fluff.',
]

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'duplicate'>('idle')
  const [proofIdx] = useState(() => Math.floor(Math.random() * socialProofs.length))

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(DISMISSED_KEY)) return

    const timer = setTimeout(() => setVisible(true), 15000)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(DISMISSED_KEY)) {
        setVisible(true)
        clearTimeout(timer)
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(DISMISSED_KEY, '1')
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      setState(data.message === 'already_subscribed' ? 'duplicate' : 'success')
      if (data.success && data.message !== 'already_subscribed') {
        localStorage.setItem(DISMISSED_KEY, '1')
        trackLead('newsletter_popup', { eventId: data.eventId })
        setTimeout(() => setVisible(false), 3500)
      }
    } catch {
      setState('idle')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nl-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
          />

          {/* Popup */}
          <motion.div
            key="nl-popup"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed inset-0 flex items-center justify-center z-[91] p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-lg bg-surface border border-rule-2 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(212,175,55,0.1)] pointer-events-auto">

              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

              {/* Ambient background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gold/8 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-faint hover:text-ink-2 transition-colors z-10 bg-surface-2 hover:bg-white/10 rounded-full p-1.5"
              >
                <X size={14} />
              </button>

              {state === 'success' || state === 'duplicate' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 px-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gold-wash border border-gold/25 flex items-center justify-center mb-5">
                    <Check size={20} className="text-gold-text" />
                  </div>
                  <h3 className="text-ink font-heading font-bold text-2xl mb-2">
                    {state === 'success' ? "You're in." : 'Already subscribed'}
                  </h3>
                  <p className="text-muted font-body text-sm leading-relaxed">
                    {state === 'success'
                      ? 'One email every Monday — what we tried, what the numbers said, what changed.'
                      : "You're already on the list. Next one lands Monday."}
                  </p>
                  {state === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 flex items-center gap-2 bg-gold-wash border border-gold/20 rounded-2xl px-5 py-3"
                    >
                      <span className="text-gold-text font-body text-sm font-semibold">Next issue: Monday, 8 AM IST</span>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="p-7 sm:p-8">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gold/15 border border-gold/30 rounded-xl flex items-center justify-center">
                        <Mail size={14} className="text-gold-text" />
                      </div>
                      <div>
                        <p className="text-gold-text font-body text-[10px] font-bold tracking-widest uppercase">Weekly GTM Intel</p>
                        <p className="text-faint font-body text-[10px]">{socialProofs[proofIdx]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-heading font-bold text-[1.6rem] leading-tight text-ink mb-2">
                    The GTM playbook<br />
                    <span className="text-gold-text">founders are running</span> right now.
                  </h3>
                  <p className="font-body text-sm text-muted mb-6 leading-relaxed">
                    Real experiments. Real numbers. How founders use AI to close deals while they sleep — every Monday, no filler.
                  </p>

                  {/* Proof bullets */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                    {['Real experiments', 'Actual data', 'No filler'].map(item => (
                      <div key={item} className="flex items-center gap-1.5 text-faint font-body text-[11px]">
                        <Check size={11} className="text-gold-text" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={submit} className="space-y-3">
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="First name (optional)"
                      className="w-full bg-surface-2 border border-rule-2 hover:border-rule-2 rounded-2xl px-4 py-3 text-ink font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-faint"
                    />
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 bg-surface-2 border border-rule-2 hover:border-rule-2 rounded-2xl px-4 py-3 text-ink font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-faint"
                      />
                      <motion.button
                        type="submit"
                        disabled={state === 'loading'}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-gold text-brand-black font-body font-bold rounded-2xl px-5 py-3 hover:bg-gold-dim transition-all disabled:opacity-60 text-sm whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                      >
                        {state === 'loading' ? '⏳' : 'Join →'}
                      </motion.button>
                    </div>
                  </form>

                  <p className="text-faint font-body text-[11px] text-center mt-4">
                    No spam. Unsubscribe anytime. Your inbox stays clean.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
