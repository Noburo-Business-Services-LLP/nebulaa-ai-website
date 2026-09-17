'use client'

import { useEffect, useState } from 'react'
import { Check, Download, ArrowRight } from 'lucide-react'
import { trackLead } from '@/lib/analytics/track'

const UNLOCK_KEY = 'nebulaa_downloads_unlocked'

interface Props {
  /** Filename in public/downloads, or null if the document isn't ready yet. */
  file: string | null
  title: string
  /** Sent with the lead so we can see which resource drove the signup. */
  source: string
}

/**
 * One email unlocks every download, not one per file. Asking six times for the
 * same address is how you get one submission and five bounces.
 *
 * The unlock is remembered in this browser only. Someone determined can open
 * the file directly — that is fine, this is a lead magnet rather than a
 * paywall, and breaking it for real people to stop a handful of others is a
 * bad trade.
 */
export default function DownloadGate({ file, title, source }: Props) {
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')

  useEffect(() => {
    try {
      if (localStorage.getItem(UNLOCK_KEY)) setUnlocked(true)
    } catch {
      /* storage blocked — the form just shows again */
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || state === 'loading') return
    setState('loading')
    try {
      const res = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `Download — ${source}` }),
      })
      if (!res.ok) throw new Error('signup failed')
      const data = await res.json().catch(() => ({}))
      try {
        localStorage.setItem(UNLOCK_KEY, '1')
      } catch {
        /* not fatal — they still get this download */
      }
      trackLead('download', { item: source, eventId: data.eventId })
      setUnlocked(true)
      setState('idle')
    } catch {
      setState('error')
    }
  }

  if (!file) {
    return (
      <div className="hud-card rounded-[18px] px-7 py-7">
        <p className="neb-label mb-2.5">In preparation</p>
        <p className="text-[15px] leading-[1.65] text-muted">
          This one is still being written. Leave your email on any other download and we will send it
          across when it is ready.
        </p>
      </div>
    )
  }

  if (unlocked) {
    return (
      <div className="bg-gold/[0.07] border border-gold/25 rounded-[18px] px-7 py-7">
        <div className="flex items-center gap-2 mb-3">
          <Check size={15} className="text-gold-text" />
          <p className="neb-label neb-label-gold">Unlocked</p>
        </div>
        <a
          href={`/downloads/${file}`}
          download
          className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[26px] py-[14px] rounded-full hover:brightness-105 transition"
        >
          <Download size={16} /> Download {title}
        </a>
        <p className="text-[13px] text-muted mt-4">
          Every other download on this site is unlocked too —{' '}
          <a href="/resources" className="text-gold-text hover:underline">
            see the set
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="hud-card rounded-[18px] px-7 py-7">
      <p className="neb-label mb-2.5">Get the file</p>
      <p className="text-[15px] leading-[1.6] text-muted mb-5 max-w-[52ch]">
        One email unlocks this and every other download here. No sequence afterwards — you will hear
        from us weekly at most, and only if you want to.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5 max-w-[460px]">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 min-w-0 bg-ground border border-rule-2 rounded-full px-5 py-3 text-[15px] text-ink placeholder:text-faint outline-none focus:border-gold transition"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex items-center justify-center gap-2 bg-gold text-[#1A1208] text-[14.5px] font-semibold px-[24px] py-3 rounded-full hover:brightness-105 transition disabled:opacity-60 whitespace-nowrap"
        >
          {state === 'loading' ? 'Unlocking…' : <>Unlock <ArrowRight size={15} /></>}
        </button>
      </form>
      {state === 'error' && (
        <p className="text-[13.5px] text-red-500 mt-3">
          That did not go through. Email hello@nebulaa.ai and we will send it directly.
        </p>
      )}
    </div>
  )
}
