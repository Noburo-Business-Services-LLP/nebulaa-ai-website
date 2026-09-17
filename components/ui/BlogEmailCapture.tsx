'use client'
import { useState } from 'react'
import HudCard from '@/components/ui/HudCard'

export default function BlogEmailCapture() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || 'Reader', email: email.trim(), source: 'blog-post' }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <HudCard halo="cyan" className="mt-14 p-6 text-center">
        <h3 className="font-heading text-lg font-bold text-ink mb-1">You&apos;re in.</h3>
        <p className="font-body text-sm text-muted">
          One email a week. Nothing else.
        </p>
      </HudCard>
    )
  }

  return (
    <HudCard halo="amber" className="mt-14 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-lg font-bold text-ink mb-1">
            Get GTM playbooks that actually work
          </h3>
          <p className="font-body text-sm text-muted mb-4">
            One email a week. Actionable tips for founders building in India. No fluff, no spam — ever.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-faint"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 border border-rule bg-surface-2 text-ink rounded-xl px-4 py-2.5 font-body text-sm outline-none focus:border-gold transition-colors placeholder:text-faint"
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="bg-gold text-[#1A1208] font-body font-semibold rounded-xl px-5 py-2.5 text-sm hover:brightness-105 transition-all disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining...' : 'Join free →'}
            </button>
          </form>
          {status === 'error' && (
            <p className="font-body text-xs text-red-400 mt-2">Something went wrong — try again or email us directly.</p>
          )}
          <p className="font-body text-xs text-faint mt-2">
            Unsubscribe anytime.
          </p>
        </div>
      </div>
    </HudCard>
  )
}
