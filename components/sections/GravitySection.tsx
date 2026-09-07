'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, slideInLeft, staggerContainer, viewportOptions } from '@/lib/animations'

const bullets = [
  'Builds your marketing strategy first — ICP, channels, what to say',
  'Plans the month, then executes it — posts, carousels, reels',
  'Watches your rivals and drafts the counter-post, not just a report',
  'Gets sharper over time — it remembers what worked',
  'Nothing publishes until you tap approve',
]

const stats = [
  { label: 'Queued', value: '18', suffix: '' },
  { label: 'Formats', value: '3', suffix: '' },
  { label: 'Your time', value: '9', suffix: 'min' },
]

export default function GravitySection() {
  return (
    <section id="gravity" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[90px] items-center">
        {/* Left — copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[22px] block">Gravity — the marketing half</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-[34px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium mb-[26px]"
          >
            Stop planning content. <span className="italic text-brand-gold">Start approving it.</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="font-body text-[17px] leading-[1.68] text-white/55 max-w-[480px] mb-[34px]"
          >
            Gravity starts by understanding you: your customers, your channels, what actually works. Then it plans the month and drafts the posts, carousels and reels to fill it, watching your rivals so your content never plays catch-up. Your part is the last step — tap approve.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex gap-[13px] items-start">
                <span className="text-brand-gold text-sm leading-[1.6]">—</span>
                <span className="font-body text-[15px] leading-[1.6] text-white/70">{bullet}</span>
              </div>
            ))}
          </motion.div>
          <motion.a variants={fadeUpVariant} href="#how-it-works" className="mt-[38px] inline-block text-[15px] text-brand-gold hover:underline">
            See how Gravity works →
          </motion.a>
        </motion.div>

        {/* Right — product panel */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="bg-[#111111] border border-white/[0.06] rounded-[20px] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-[9px]">
              <div
                className="w-[13px] h-[13px] rounded-full"
                style={{ background: 'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)' }}
              />
              <span className="font-heading text-[13.5px] font-medium">Gravity</span>
              <span className="text-[10px] font-semibold tracking-[0.06em] text-[#4ADE80] border border-[#4ADE80]/30 rounded-full px-2 py-0.5">
                LIVE
              </span>
            </div>
            <SectionLabel tone="muted">This month&apos;s plan</SectionLabel>
          </div>

          <div className="bg-[#1A1A1A] border border-white/[0.06] rounded-[14px] p-5 mb-[14px]">
            <SectionLabel tone="muted" className="mb-3 block">Tuesday · LinkedIn</SectionLabel>
            <p className="font-body text-[14.5px] leading-[1.6] text-white/85 mb-4">
              Most of our customers don&rsquo;t compare us to other jewellers. They compare us to the shop their mother trusted for thirty years. That&rsquo;s the bar.
            </p>
            <div className="flex gap-2">
              <span className="text-[11px] text-white/45 border border-white/10 rounded-full px-[11px] py-1">Approve</span>
              <span className="text-[11px] text-white/45 border border-white/10 rounded-full px-[11px] py-1">Rewrite</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[10px]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#1A1A1A] border border-white/[0.06] rounded-xl p-[15px]">
                <SectionLabel tone="muted" className="mb-[7px] block">{stat.label}</SectionLabel>
                <div className="font-heading text-[27px]">
                  {stat.value}
                  {stat.suffix && <span className="text-[15px] text-white/45">{stat.suffix}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
