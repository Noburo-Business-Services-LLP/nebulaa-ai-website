'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ParticleField from '@/components/ui/ParticleField'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'

export default function Hero() {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // No live site-scan backend on the marketing site — this captures intent
    // and takes the visitor to the real starting point, same as the plain CTA did.
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-ground py-32 px-6 md:px-12 lg:px-[120px] overflow-hidden">
      {/* Full-bleed background visual — one centrepiece behind the whole hero, not boxed in a column */}
      <div className="absolute inset-0">
        <ParticleField variant="fullbleed" interactive className="absolute inset-0" />
        {/* left-to-right fade so copy stays legible over the field */}
        <div className="absolute inset-0 neb-hero-fade-x" />
        <div className="absolute inset-0 neb-hero-fade-y" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative grid lg:grid-cols-2 gap-[60px] items-center"
      >
        {/* Left — copy */}
        <div>
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[26px] block">AI marketing &amp; outreach agents</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="font-heading text-[40px] md:text-[52px] lg:text-[68px] leading-[1.06] lg:leading-[1.04] tracking-[-0.02em] font-medium text-ink mb-[22px]"
            style={{ textWrap: 'pretty' }}
          >
            Give us a URL.
            <br />
            <span className="italic text-gold-display">We&apos;ll run your marketing.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-lg leading-[1.65] text-ink-2 max-w-[520px] mb-8"
          >
            Your competitor isn&apos;t better — they&apos;re just louder. Nebulaa reads your brand in about a minute, then writes your posts, publishes every morning, and answers enquiries on WhatsApp while they&apos;re still warm.
          </motion.p>

          {/* Interactive entry point — the demo lives on the page, not just described in prose */}
          <motion.form
            variants={fadeUpVariant}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-[480px] mb-3"
          >
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="yourbrand.com"
              className="flex-1 min-w-0 bg-surface border border-rule-2 rounded-full px-6 py-4 sm:py-[15px] text-[15px] text-ink placeholder:text-faint outline-none focus:border-gold transition"
            />
            <button
              type="submit"
              className="bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-4 sm:py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition whitespace-nowrap"
            >
              Start free →
            </button>
          </motion.form>

          <motion.p variants={fadeUpVariant} className="text-[13px] text-muted mb-6">
            Free to start · No credit card required · <a href="/services" className="text-ink-2 hover:text-gold-text transition underline underline-offset-2">or have our team run it</a>
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
            <span>7-day trial</span>
            <span>·</span>
            <span>Set up with you in 24 hrs</span>
            <span>·</span>
            <span>Cancel anytime</span>
          </motion.div>
        </div>

        {/* Right — readout overlay, sitting over the full-bleed field rather than in its own box */}
        <motion.div variants={fadeUpVariant} className="hidden lg:flex justify-end">
          <div className="w-full max-w-[380px] pt-8">
            <div className="neb-label mb-4">Reading nebulaa-client.com</div>
            <div className="flex flex-col gap-2.5">
              {['Brand voice — confident, warm, unhurried', 'Customers — retail buyers, 25–45, Tamil Nadu', '3 competitors tracked'].map(line => (
                <div key={line} className="font-body text-[12.5px] text-ink-2 flex items-center gap-2.5">
                  <span className="text-[#4ADE80]">✓</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
