'use client'

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const GOLD_DOT_STYLE = {
  background:
    'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)',
}

const productLinks = [
  { name: 'Overview', href: '/product' },
  { name: 'Gravity', href: '/product/gravity' },
  { name: 'Pulsar', href: '/product/pulsar' },
  { name: 'Pricing', href: '/pricing' },
]

const servicesLinks = [
  { name: 'Managed services', href: '/services' },
  { name: 'Channels', href: '/channels' },
  { name: 'Engagements', href: '/work' },
  { name: 'By industry', href: '/for' },
]

const freeLinks = [
  { name: '30 free tools', href: '/tools' },
  { name: 'Compare', href: '/compare' },
  { name: 'Playbook', href: '/blog' },
]

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'duplicate'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || state !== 'idle') return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setState(data.message === 'already_subscribed' ? 'duplicate' : 'success')
    } catch {
      setState('idle')
    }
  }

  return (
    <div className="flex flex-col gap-[11px]">
      <SectionLabel tone="muted" className="mb-1">Weekly GTM Drop</SectionLabel>

      {state === 'success' ? (
        <div>
          <p className="font-body text-[13.5px] text-gold-text">You&apos;re in!</p>
          <p className="font-body text-[13px] text-muted mt-1">Check your inbox Mondays.</p>
        </div>
      ) : state === 'duplicate' ? (
        <p className="font-body text-[13px] text-muted">Already subscribed!</p>
      ) : (
        <>
          <p className="font-body text-[13px] text-muted leading-[1.6]">
            Real GTM experiments, every Monday.
          </p>
          <form onSubmit={submit} className="flex flex-col gap-2 mt-1">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full font-body text-[13px] bg-surface-2 border border-rule rounded-lg px-3.5 py-2.5 outline-none focus:border-gold transition-colors text-ink placeholder:text-faint"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full bg-brand-gold text-brand-black font-body font-semibold text-[13px] rounded-lg py-2.5 hover:bg-brand-gold-dim transition-colors disabled:opacity-60"
            >
              {state === 'loading' ? 'Joining...' : 'Get weekly tips'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-rule pt-[60px] pb-[50px] px-6 md:px-12 lg:px-[120px]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-[50px] lg:gap-[70px]">
      <div>
        <div className="flex items-center gap-[10px] mb-4">
          <div className="w-[17px] h-[17px] rounded-full flex-shrink-0" style={GOLD_DOT_STYLE} />
          <span className="font-heading text-[17px] font-normal text-ink">Nebulaa</span>
        </div>
        <div className="font-body text-[13px] text-muted leading-[1.7]">
          Chennai, India<br /><a href="mailto:hello@nebulaa.ai" className="hover:text-gold-text transition-colors">hello@nebulaa.ai</a>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-[70px] gap-y-[40px]">
        <div className="flex flex-col gap-[11px]">
          <SectionLabel tone="muted" className="mb-1">Product</SectionLabel>
          {productLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-[13.5px] text-muted hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-[11px]">
          <SectionLabel tone="muted" className="mb-1">Services</SectionLabel>
          {servicesLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-[13.5px] text-muted hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-[11px]">
          <SectionLabel tone="muted" className="mb-1">Free</SectionLabel>
          {freeLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-[13.5px] text-muted hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="w-full sm:w-[220px]">
          <FooterNewsletter />
        </div>
      </div>
      </div>

      <div className="mt-[50px] pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-body text-[12px] text-muted">&copy; 2026 Nebulaa. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="/privacy-policy" className="font-body text-[12px] text-muted hover:text-ink transition-colors">Privacy</a>
          <a href="/terms" className="font-body text-[12px] text-muted hover:text-ink transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}
