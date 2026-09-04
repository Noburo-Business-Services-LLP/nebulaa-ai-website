'use client'

import { useState } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const GOLD_DOT_STYLE = {
  background:
    'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)',
}

const productLinks = [
  { name: 'Gravity', href: '#gravity' },
  { name: 'Pulsar', href: '#pulsar' },
  { name: 'Pricing', href: '#pricing' },
]

const servicesLinks = [
  { name: 'Enterprise', href: '/services/enterprise' },
  { name: 'MSME', href: '/services/msme' },
]

const freeLinks = [
  { name: '30+ tools', href: '/tools' },
  { name: 'Journal', href: '/blog' },
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
          <p className="font-body text-[13.5px] text-brand-gold">You&apos;re in!</p>
          <p className="font-body text-[13px] text-white/35 mt-1">Check your inbox Mondays.</p>
        </div>
      ) : state === 'duplicate' ? (
        <p className="font-body text-[13px] text-white/35">Already subscribed!</p>
      ) : (
        <>
          <p className="font-body text-[13px] text-white/35 leading-[1.6]">
            Real GTM experiments, every Monday.
          </p>
          <form onSubmit={submit} className="flex flex-col gap-2 mt-1">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full font-body text-[13px] bg-white/5 border border-white/[0.06] rounded-lg px-3.5 py-2.5 outline-none focus:border-brand-gold transition-colors text-white placeholder:text-white/25"
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
    <footer className="relative border-t border-white/[0.06] pt-[60px] pb-[70px] px-6 md:px-12 lg:px-[120px] flex flex-col lg:flex-row items-start justify-between gap-[50px] lg:gap-[70px]">
      <div>
        <div className="flex items-center gap-[10px] mb-4">
          <div className="w-[17px] h-[17px] rounded-full flex-shrink-0" style={GOLD_DOT_STYLE} />
          <span className="font-heading text-[17px] font-normal text-white">Nebulaa</span>
        </div>
        <div className="font-body text-[13px] text-white/35 leading-[1.7]">
          Chennai, India<br />[YOUR CONTACT EMAIL]
        </div>
      </div>

      <div className="flex flex-wrap gap-x-[70px] gap-y-[40px]">
        <div className="flex flex-col gap-[11px]">
          <SectionLabel tone="muted" className="mb-1">Product</SectionLabel>
          {productLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="font-body text-[13.5px] text-white/55 hover:text-white transition-colors"
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
              className="font-body text-[13.5px] text-white/55 hover:text-white transition-colors"
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
              className="font-body text-[13.5px] text-white/55 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="w-full sm:w-[220px]">
          <FooterNewsletter />
        </div>
      </div>
    </footer>
  )
}
