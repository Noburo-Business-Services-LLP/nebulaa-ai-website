'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'nebulaa_cookie_consent'

const particles = ['🍪', '✨', '🌟', '⚡', '🚀', '💫', '🎯', '🔥']

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; emoji: string; x: number; delay: number }[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(COOKIE_KEY)) return
    const timer = setTimeout(() => {
      setVisible(true)
      // Generate floating particles
      setFloatingParticles(
        Array.from({ length: 6 }, (_, i) => ({
          id: i,
          emoji: particles[Math.floor(Math.random() * particles.length)],
          x: Math.random() * 100,
          delay: Math.random() * 2,
        }))
      )
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const accept = (all: boolean) => {
    localStorage.setItem(COOKIE_KEY, all ? 'all' : 'necessary')
    setAccepted(true)
    setTimeout(() => setVisible(false), 800)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 120, scale: 0.9 }}
          animate={accepted ? { opacity: 0, y: 120, scale: 0.8 } : { opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-xl"
        >
          <div
            className="relative bg-[#0D0C0A] border border-brand-gold/30 rounded-3xl shadow-[0_0_60px_rgba(212,175,55,0.15)] overflow-hidden"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Animated gold gradient top bar */}
            <motion.div
              className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
              animate={{ backgroundPosition: hovering ? '200% center' : '0% center' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-amber-600/5 pointer-events-none" />

            {/* Floating mini particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingParticles.map(p => (
                <motion.span
                  key={p.id}
                  className="absolute text-xs opacity-30"
                  style={{ left: `${p.x}%`, bottom: '0%' }}
                  animate={{ y: [-20, -80], opacity: [0.3, 0], scale: [0.8, 1.2] }}
                  transition={{ duration: 3, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
                >
                  {p.emoji}
                </motion.span>
              ))}
            </div>

            <div className="relative px-5 py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Left side — animated cookie character */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={hovering
                        ? { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.15, 1.15, 1] }
                        : { rotate: [0, -8, 8, 0], scale: 1 }
                      }
                      transition={hovering
                        ? { duration: 0.6, ease: 'easeInOut' }
                        : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                      }
                      className="text-4xl select-none"
                    >
                      🍪
                    </motion.div>
                    {/* Orbit ring */}
                    <motion.div
                      className="absolute inset-[-6px] border border-brand-gold/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Orbit dot */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 bg-brand-gold rounded-full"
                      style={{ top: '-3px', left: '50%', transformOrigin: '0 21px' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-body font-bold text-sm">
                        we baked some fresh cookies
                      </p>
                      <span className="text-brand-gold text-xs font-bold bg-brand-gold/10 border border-brand-gold/20 px-1.5 py-0.5 rounded-full">✨ new</span>
                    </div>
                    <p className="text-white/40 font-body text-xs leading-relaxed">
                      The digital kind — helps us understand how founders use Nebulaa so we can ship better stuff. No shady tracking, fr fr.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => accept(false)}
                    className="flex-1 sm:flex-none font-body text-xs font-semibold text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 rounded-xl px-4 py-2.5 transition-all"
                  >
                    essentials only
                  </button>
                  <motion.button
                    onClick={() => accept(true)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 sm:flex-none font-body text-xs font-bold bg-brand-gold text-brand-black rounded-xl px-4 py-2.5 hover:bg-brand-gold-dim transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    accept all 🍪
                  </motion.button>
                </div>
              </div>

              {/* Bottom hint */}
              <p className="text-white/20 font-body text-[10px] mt-3 text-center">
                by continuing you agree to our{' '}
                <a href="#" className="underline hover:text-white/40 transition-colors">privacy policy</a>
                {' '}·{' '}
                <a href="#" className="underline hover:text-white/40 transition-colors">cookie policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
