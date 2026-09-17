'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleField from '@/components/ui/ParticleField'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'
import { soundEngine } from '@/lib/soundEngine'
import CoreConsole from '@/components/sections/CoreConsole'
import StatusIndicator from '@/components/ui/StatusIndicator'
import Button from '@/components/ui/Button'
import { trackCTAClick } from '@/lib/analytics/track'
import { ArrowRight, ArrowDown } from 'lucide-react'

export default function Hero() {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    soundEngine.playHudActivate()
    trackCTAClick('start_with_your_url', 'hero')
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-[120px] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <ParticleField variant="fullbleed" interactive className="absolute inset-0" />
        {/* Copy sits on the dense side of the field, so it gets its own falloff. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/75 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ground/40 via-transparent to-ground pointer-events-none" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left — the statement */}
        <div className="lg:col-span-7">
          <motion.div variants={fadeUpVariant} className="mb-7">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
              <span className="neb-label">Nebulaa // Business operating system</span>
              <span className="text-white/15">|</span>
              <StatusIndicator tone="active" label="Online" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="neb-display text-[38px] sm:text-[52px] lg:text-[62px] text-ink mb-7"
          >
            Give us a URL.
            <br />
            <span className="text-gold-display">We&apos;ll run your marketing.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-[17px] sm:text-[18px] leading-[1.65] text-ink-2 max-w-[560px] mb-9"
          >
            Give Nebulaa your website. It understands your business, activates the right AI engines,
            executes the work and learns from what happens next.
          </motion.p>

          <motion.form
            variants={fadeUpVariant}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-[540px] mb-5"
          >
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 rounded-full bg-gold/25 opacity-0 group-focus-within:opacity-100 blur-sm transition duration-300" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onFocus={() => soundEngine.playHudHover()}
                placeholder="yourbusiness.com"
                aria-label="Your website address"
                className="relative w-full bg-[#08080E] border border-white/[0.14] rounded-full px-6 py-4 text-[15px] text-white placeholder:text-muted/60 outline-none focus:border-gold transition-all font-mono"
              />
            </div>

            <Button type="submit" size="lg" silent>
              Start with your URL
              <ArrowRight size={16} />
            </Button>
          </motion.form>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#gravity"
              className="inline-flex items-center gap-2 text-[13.5px] text-ink-2 hover:text-gold-text transition-colors"
            >
              Watch the system work
              <ArrowDown size={14} />
            </a>
            <span className="neb-label">7-day trial · No card · Live in 24h</span>
          </motion.div>
        </div>

        {/* Right — the system, running */}
        <motion.div variants={fadeUpVariant} className="lg:col-span-5 relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold/12 rounded-full blur-[70px] pointer-events-none" />
          <div className="relative z-10">
            <CoreConsole />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
