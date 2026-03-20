'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Linkedin, Twitter } from 'lucide-react'

const productLinks = ['Gravity', 'Pulsar', 'How It Works', 'Pricing', 'Free Trial']
const companyLinks = ['Blog', 'About', 'Contact']
const toolLinks = [
  { name: 'LinkedIn Post Generator', slug: 'linkedin-post-generator' },
  { name: 'Cold Email Generator', slug: 'cold-email-generator' },
  { name: 'Hashtag Generator', slug: 'hashtag-generator' },
  { name: 'Lead Qualifier', slug: 'lead-qualification-calculator' },
  { name: 'All Free Tools →', slug: '' },
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
    <div>
      <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted-2 dark:text-white/40 mb-4">Weekly GTM Drop</p>

      {state === 'success' ? (
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <div>
            <p className="font-body text-sm font-semibold text-brand-gold">You&apos;re in!</p>
            <p className="font-body text-xs text-brand-muted dark:text-white/40">Check your inbox Mondays.</p>
          </div>
        </div>
      ) : state === 'duplicate' ? (
        <div className="flex items-center gap-2">
          <span className="text-lg">😄</span>
          <p className="font-body text-xs text-brand-muted dark:text-white/40">Already subscribed!</p>
        </div>
      ) : (
        <>
          <p className="font-body text-xs text-brand-muted dark:text-white/40 mb-3 leading-relaxed">
            Real GTM experiments. What&apos;s actually working for founders. Every Monday.
          </p>
          <form onSubmit={submit} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full font-body text-xs bg-white dark:bg-white/5 border border-brand-border dark:border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-brand-gold transition-colors text-brand-text dark:text-white placeholder:text-brand-muted-2 dark:placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full bg-brand-gold text-brand-black font-body font-bold text-xs rounded-xl py-2.5 hover:bg-brand-gold-dim transition-all disabled:opacity-60"
            >
              {state === 'loading' ? '⏳ Joining...' : 'Get weekly tips →'}
            </button>
          </form>
          <p className="font-body text-[10px] text-brand-muted-2 dark:text-white/25 mt-2">No spam. Unsubscribe anytime.</p>
        </>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-brand-off-white dark:bg-[#0F0E0C] border-t border-brand-border dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/images/logo-dark.png" alt="Nebulaa.ai" width={110} height={28} className="h-8 w-auto mb-4 hover:opacity-80 transition-opacity" />
            <p className="font-body text-sm text-brand-muted dark:text-white/40 leading-relaxed mb-5">
              Agentic AI for founders and SMBs.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-brand-gold transition-colors border border-transparent dark:border-white/10 dark:hover:border-brand-gold rounded-full p-1" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className="text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-brand-gold transition-colors border border-transparent dark:border-white/10 dark:hover:border-brand-gold rounded-full p-1" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Col 2 — Product */}
          <div>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted-2 dark:text-white/40 mb-5">Product</p>
            <ul className="space-y-3">
              {productLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Free Tools */}
          <div>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted-2 dark:text-white/40 mb-5">Free Tools</p>
            <ul className="space-y-3">
              {toolLinks.map(tool => (
                <li key={tool.slug}>
                  <a href={tool.slug ? `/tools/${tool.slug}` : '/tools'} className="font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-white transition-colors">{tool.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted-2 dark:text-white/40 mb-5">Company</p>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link}>
                  <a href={link === 'Contact' ? 'mailto:hello@nebulaa.ai' : `#${link.toLowerCase()}`} className="font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-white transition-colors">{link}</a>
                </li>
              ))}
              <li><span className="font-body text-sm text-brand-muted dark:text-white/40">hello@nebulaa.ai</span></li>
            </ul>
          </div>

          {/* Col 5 — Legal */}
          <div>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-muted-2 dark:text-white/40 mb-5">Legal</p>
            <ul className="space-y-3">
              <li><a href="/privacy-policy" className="font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-gold dark:hover:text-white transition-colors">Terms of Service</a></li>
              <li><span className="font-body text-sm text-brand-muted dark:text-white/40">Chennai, India 🇮🇳</span></li>
              <li>
                <a href="/admin" className="font-body text-xs text-brand-muted-2 dark:text-white/20 hover:text-brand-gold dark:hover:text-white/60 transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* Col 6 — Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-body text-xs text-brand-muted-2 dark:text-white/40">© 2026 Nebulaa.ai · All rights reserved</span>
          <span className="font-body text-xs text-brand-muted-2 dark:text-white/40">Built for founders. Run by AI.</span>
        </div>
      </div>
    </footer>
  )
}
