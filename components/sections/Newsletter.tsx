'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { trackLead } from '@/lib/analytics/track'

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
      if (data.message !== 'already_subscribed') trackLead('newsletter_section', { eventId: data.eventId })
      setState(data.message === 'already_subscribed' ? 'duplicate' : 'success')
    } catch {
      setError('Network error, try again')
      setState('error')
    }
  }

  return (
    <section id="newsletter" className="relative py-[130px] px-6 md:px-12 lg:px-[120px] text-center border-t border-rule overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="relative max-w-[540px] mx-auto"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">Weekly GTM Intel</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="font-heading text-[42px] leading-[1.12] tracking-[-0.02em] font-medium mb-5">
          GTM tips. Weekly. <span className="italic text-gold-text">No fluff.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[16px] leading-[1.68] text-muted mb-10 max-w-[440px] mx-auto">
          What founders using Nebulaa are learning right now — experiments, data, and what&apos;s actually working.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="max-w-[420px] mx-auto">
          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface border border-gold/[0.18] rounded-[18px] p-7 text-center"
            >
              <p className="font-heading text-[19px] font-medium text-gold-text mb-1">You&apos;re in!</p>
              <p className="font-body text-[14.5px] text-muted">
                {name ? `Hey ${name}! ` : ''}Expect GTM gold in your inbox every Monday at 8 AM.
              </p>
            </motion.div>
          ) : state === 'duplicate' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hud-card rounded-[18px] p-7 text-center"
            >
              <p className="font-body text-[14.5px] text-muted">You&apos;re already on the list! See you Monday.</p>
            </motion.div>
          ) : (
            <div className="hud-card rounded-[18px] p-6">
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="First name (optional)"
                  className="w-full font-body text-[14.5px] bg-surface-2 border border-rule rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors text-ink placeholder:text-faint"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 font-body text-[14.5px] bg-surface-2 border border-rule rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors text-ink placeholder:text-faint"
                  />
                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="bg-gold text-[#1A1208] font-body font-semibold text-[14.5px] rounded-xl px-5 py-3 hover:bg-gold-dim transition-colors whitespace-nowrap disabled:opacity-60"
                  >
                    {state === 'loading' ? '…' : 'Join →'}
                  </button>
                </div>
                {state === 'error' && <p className="font-body text-[12.5px] text-red-400 pl-1">{error}</p>}
                <p className="font-body text-[12px] text-faint text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
