'use client'

import { motion } from 'framer-motion'
import { Target, CalendarCheck, Radar, TrendingUp, CircleCheck, Linkedin, Instagram, Twitter } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, slideInLeft, staggerContainer, viewportOptions } from '@/lib/animations'

const bullets = [
  { icon: Target, text: 'Builds your marketing strategy first — ICP, channels, what to say' },
  { icon: CalendarCheck, text: 'Plans the month, then executes it — posts, carousels, reels' },
  { icon: Radar, text: 'Watches your rivals and drafts the counter-post, not just a report' },
  { icon: TrendingUp, text: 'Gets sharper over time — it remembers what worked' },
  { icon: CircleCheck, text: 'Nothing publishes until you tap approve' },
]

const channels = [
  { icon: Linkedin, name: 'LinkedIn' },
  { icon: Instagram, name: 'Instagram' },
  { icon: Twitter, name: 'X' },
]

const stats = [
  { label: 'Queued', value: '18', suffix: '' },
  { label: 'Formats', value: '3', suffix: '' },
  { label: 'Your time', value: '9', suffix: 'min' },
]

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
/** 18 scheduled days across a 4-week view — matches the "Queued: 18" stat below. */
const SCHEDULED = new Set([1, 2, 4, 5, 6, 7, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 27, 28])

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
            <SectionLabel className="mb-[22px] block">Gravity // Content</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="neb-display text-[34px] md:text-[50px] mb-[26px]"
          >
            Your content system. <span className="text-gold-display">Always moving.</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="font-body text-[17px] leading-[1.68] text-muted max-w-[480px] mb-[34px]"
          >
            Gravity starts by understanding you: your customers, your channels, what actually works. Then it plans the month and drafts the posts, carousels and reels to fill it, watching your rivals so your content never plays catch-up. Your part is the last step — tap approve.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
            {bullets.map(({ icon: Icon, text }) => (
              <div key={text} className="flex gap-[13px] items-start">
                <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center mt-0.5">
                  <Icon size={13.5} className="text-gold-text" />
                </span>
                <span className="font-body text-[15px] leading-[1.6] text-ink-2 pt-0.5">{text}</span>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-[22px] mt-[30px]">
            {channels.map(({ icon: Icon, name }) => (
              <span key={name} className="flex items-center gap-2 text-[13px] text-faint">
                <Icon size={16} />
                {name}
              </span>
            ))}
          </motion.div>
          <motion.a variants={fadeUpVariant} href="#how-it-works" className="mt-[26px] inline-block text-[15px] text-gold-text hover:underline">
            See how Gravity works →
          </motion.a>
        </motion.div>

        {/* Right — product panel */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="bg-[#0A0A0E] border border-white/[0.06] rounded-[20px] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-[9px]">
              <div
                className="w-[13px] h-[13px] rounded-full"
                style={{ background: 'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)' }}
              />
              <span className="font-heading text-[13.5px] font-medium text-white">Gravity</span>
              <span className="text-[10px] font-semibold tracking-[0.06em] text-[#4ADE80] border border-[#4ADE80]/30 rounded-full px-2 py-0.5">
                LIVE
              </span>
            </div>
            <SectionLabel tone="onDark">This month&apos;s plan</SectionLabel>
          </div>

          {/* Month view — the "plans the month" claim, made visible */}
          <div className="bg-[#101018] border border-white/[0.06] rounded-[14px] p-[17px] mb-[14px]">
            <div className="grid grid-cols-7 gap-[5px] mb-2">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-[9.5px] text-center text-white/25 tracking-[0.04em]">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-[5px]">
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                const on = SCHEDULED.has(day)
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-[4px] flex items-center justify-center text-[9.5px] ${
                      on
                        ? 'bg-gold/[0.22] border border-gold/40 text-gold-text'
                        : 'bg-white/[0.03] border border-white/[0.05] text-white/20'
                    }`}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-[#101018] border border-white/[0.06] rounded-[14px] p-5 mb-[14px]">
            <SectionLabel tone="onDark" className="mb-3 block">Tuesday · LinkedIn</SectionLabel>
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
              <div key={stat.label} className="bg-[#101018] border border-white/[0.06] rounded-xl p-[15px]">
                <SectionLabel tone="onDark" className="mb-[7px] block">{stat.label}</SectionLabel>
                <div className="font-heading text-[27px] text-white">
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
