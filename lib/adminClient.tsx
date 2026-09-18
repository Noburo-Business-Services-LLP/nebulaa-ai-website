'use client'

import { useState, useEffect } from 'react'

/**
 * Shared admin session handling — one password gate, one fetch helper, used
 * by every /admin/* page. Previously duplicated inline in app/admin/page.tsx;
 * pulled out here once a second admin page (media) needed the same auth
 * instead of copy-pasting it again, with a third (SEO dashboard) on the way.
 *
 * The secret lives in sessionStorage under one key, so logging in on any
 * admin page authenticates all of them for the tab's lifetime.
 */

const SESSION_KEY = 'admin_secret'

export async function adminFetch<T = unknown>(
  url: string,
  secret: string,
  opts?: RequestInit,
): Promise<T | null> {
  const res = await fetch(url, {
    ...opts,
    headers: { 'x-admin-secret': secret, ...(opts?.headers ?? {}) },
  })
  if (res.status === 401) return null // caller decides — never auto-reload
  const data = (await res.json()) as T & { error?: string }
  if (data?.error) throw new Error(data.error)
  return data
}

/**
 * Verifies any saved session on mount (catches a stale/rotated secret),
 * then hands back { secret, verifying } — render AuthGate while there is no
 * secret, the page's real content once there is one.
 */
export function useAdminAuth() {
  const [secret, setSecret] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (!saved) {
      setVerifying(false)
      return
    }
    fetch('/api/admin/stats', { headers: { 'x-admin-secret': saved } })
      .then(res => {
        if (res.ok) setSecret(saved)
        else sessionStorage.removeItem(SESSION_KEY)
      })
      .catch(() => {})
      .finally(() => setVerifying(false))
  }, [])

  return { secret, setSecret, verifying }
}

export function AuthGate({ onAuth }: { onAuth: (secret: string) => void }) {
  const [value, setValue] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  const tryAuth = async () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setChecking(true)
    setError('')
    try {
      const res = await fetch('/api/admin/stats', { headers: { 'x-admin-secret': trimmed } })
      if (res.status === 401) {
        setError('Wrong password — try again')
        setChecking(false)
        return
      }
      sessionStorage.setItem(SESSION_KEY, trimmed)
      onAuth(trimmed)
    } catch {
      setError('Network error — try again')
    }
    setChecking(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-brand-gold font-heading text-2xl font-bold mb-2">nebulaa admin</p>
          <p className="text-white/40 text-sm font-body">content studio</p>
        </div>
        <div className="bg-[#111110] border border-white/10 rounded-2xl p-6">
          <label className="block text-white/60 text-sm font-body mb-2">Admin password</label>
          <input
            type="password"
            value={value}
            onChange={e => {
              setValue(e.target.value)
              setError('')
            }}
            onKeyDown={e => e.key === 'Enter' && tryAuth()}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-white/20 mb-4"
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            onClick={tryAuth}
            disabled={checking || !value.trim()}
            className="w-full bg-brand-gold text-brand-black font-body font-bold rounded-xl py-3 hover:bg-brand-gold-dim transition-all disabled:opacity-60"
          >
            {checking ? 'Checking...' : 'Let me in →'}
          </button>
        </div>
      </div>
    </div>
  )
}
