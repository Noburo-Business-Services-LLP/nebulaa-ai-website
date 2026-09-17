'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  /** The number itself, e.g. 60, 99.4, 24. */
  value: number
  /** Decimal places to hold at (e.g. 1 for "99.4"). */
  decimals?: number
  prefix?: string
  suffix?: string
  /** Total count-up duration in ms. Kept short — this reads as a system
   * reporting a live figure, not a decorative animation to sit and watch. */
  duration?: number
  className?: string
}

/**
 * A stat that counts up fast and settles, the way a HUD readout reports a
 * number rather than a marketing site revealing one. Runs once, when it
 * scrolls into view. Respects prefers-reduced-motion by rendering the final
 * value immediately.
 */
export default function StatCounter({ value, decimals = 0, prefix = '', suffix = '', duration = 900, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      // Ease-out-expo: fast climb, sharp settle — the "pops into place" feel.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <motion.span
      ref={ref}
      className={`font-digital tabular-nums ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}
