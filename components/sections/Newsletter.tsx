'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const perks = [
  { emoji: '🧪', text: 'Real GTM experiments' },
  { emoji: '📊', text: 'Actual founder data' },
  { emoji: '⚡', text: 'Every Monday, 8 AM' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setState('loading')
    setError('')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); setState('error'); return }
      setState(data.message === 'already_subscribed' ? 'duplicate' : 'success')
    } catch {
      setError('Network error, try again')
      setState('error')
    }
  }

  return (
    <section id="newsletter" className="bg-brand-warm-gray dark:bg-[#0D0C0A] py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start"
        >
          {/* Left: heading + perks */}
          <motion.div variants={fadeUpVariant}>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-3 py-1 mb-4">
              <span className="text-brand-gold text-xs">⚡</span>
              <span className="text-brand-gold font-body text-xs font-bold tracking-widest uppercase">Weekly GTM Intel</span>
            </div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-brand-text dark:text-white mb-3 leading-tight">
              GTM tips. Weekly.<br className="hidden sm:block" /> No fluff.
            </h3>
            <p className="font-body text-base text-brand-muted dark:text-white/50 mb-5 max-w-md">
              What founders using Nebulaa are learning right now — experiments, data, and what&apos;s actually working.
            </p>
            <div className="flex flex-wrap gap-4">
              {perks.map(p => (
                <div key={p.text} className="flex items-center gap-2">
                  <span className="text-base">{p.emoji}</span>
                  <span className="font-body text-sm text-brand-muted dark:text-white/40">{p.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div variants={fadeUpVariant} className="w-full md:w-[360px]">
            {state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">🎉</div>
                <p className="font-body font-bold text-brand-gold text-lg mb-1">You&apos;re in!</p>
                <p className="font-body text-sm text-brand-muted dark:text-white/50">
                  {name ? `Hey ${name}! ` : ''}Expect GTM gold in your inbox every Monday at 8 AM.
                </p>
              </motion.div>
            ) : state === 'duplicate' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 dark:bg-white/3 border border-brand-border dark:border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">😄</div>
                <p className="font-body text-sm text-brand-muted dark:text-white/60">You&apos;re already on the list! See you Monday.</p>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-white/3 border border-brand-border dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-none">
                <form onSubmit={submit} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="First name (optional)"
                    className="w-full font-body text-sm bg-brand-warm-gray dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-colors text-brand-text dark:text-white placeholder:text-brand-muted-2 dark:placeholder:text-white/30"
                  />
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 font-body text-sm bg-brand-warm-gray dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-gold transition-colors text-brand-text dark:text-white placeholder:text-brand-muted-2 dark:placeholder:text-white/30"
                    />
                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="bg-brand-gold text-brand-black font-body font-bold text-sm rounded-xl px-5 py-3 hover:bg-brand-gold-dim transition-all whitespace-nowrap cursor-pointer hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60"
                    >
                      {state === 'loading' ? '⏳' : 'Join →'}
                    </button>
                  </div>
                  {state === 'error' && <p className="font-body text-xs text-red-400 pl-1">{error}</p>}
                  <p className="font-body text-[11px] text-brand-muted-2 dark:text-white/25 text-center">
                    No spam. Unsubscribe anytime. Join 500+ founders.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
