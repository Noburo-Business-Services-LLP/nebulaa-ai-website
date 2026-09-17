'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getStoredConsent, setStoredConsent } from '@/lib/analytics/consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (getStoredConsent()) return
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const accept = (all: boolean) => {
    setStoredConsent(all ? 'all' : 'necessary')
    setAccepted(true)
    setTimeout(() => setVisible(false), 400)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 24 }}
          animate={accepted ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="bg-surface border border-rule-2 rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <p className="font-body text-[14px] text-ink mb-1.5">Cookies</p>
                <p className="font-body text-[13px] leading-[1.6] text-muted">
                  We use cookies to understand how the site is used and to measure our ads on Google and
                  Meta. Accept to help us show you more relevant ads, or continue with essential cookies
                  only. See our{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-ink-2 underline underline-offset-2 hover:text-gold-text transition-colors"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex gap-2.5 flex-shrink-0">
                <button
                  onClick={() => accept(false)}
                  className="font-body text-[13px] text-muted hover:text-ink border border-rule-2 hover:border-rule-2 rounded-full px-[18px] py-2.5 transition-colors"
                >
                  Essential only
                </button>
                <button
                  onClick={() => accept(true)}
                  className="font-body text-[13px] font-semibold bg-gold text-[#1A1208] rounded-full px-[18px] py-2.5 hover:bg-gold-dim transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
