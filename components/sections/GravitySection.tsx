'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Target, CalendarCheck, Radar, TrendingUp, CircleCheck, Linkedin, Instagram, Twitter } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
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
  { label: 'Queued', value: 18, suffix: '' },
  { label: 'Formats', value: 3, suffix: '' },
  { label: 'Your time', value: 9, suffix: 'min' },
]

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
/** 18 scheduled days across a 4-week view — matches the "Queued: 18" stat below. */
const SCHEDULED = new Set([1, 2, 4, 5, 6, 7, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 27, 28])

/**
 * Same live-console pattern as the hero's CoreConsole: a fixed step counter
 * drives a self-running build sequence — the month fills in week by week,
 * then a drafted post appears, then this month's numbers land — so the
 * panel reads as a system doing the work, not a static screenshot of one.
 */
const WEEKS_REVEALED = 4
const DRAFT_STEP = WEEKS_REVEALED + 1
const BUTTONS_STEP = DRAFT_STEP + 1
const STATS_STEP = BUTTONS_STEP + 1
const TOTAL = STATS_STEP
const HOLD_STEPS = 16
const STEP_MS = 560

function useCountUp(target: number, active: boolean, duration = 700) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) {
      setDisplay(0)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return display
}

function StatCell({ label, value, suffix, active }: { label: string; value: number; suffix: string; active: boolean }) {
  const display = useCountUp(value, active)
  return (
    <div
      className={`bg-surface-2 border rounded-xl p-[15px] transition-all duration-500 ${
        active ? 'border-rule opacity-100 translate-y-0' : 'border-rule opacity-0 translate-y-1.5'
      }`}
    >
      <SectionLabel tone="onDark" className="mb-[7px] block">{label}</SectionLabel>
      <div className="font-digital text-[27px] text-ink tabular-nums">
        {display}
        {suffix && <span className="text-[15px] text-muted">{suffix}</span>}
      </div>
    </div>
  )
}

export default function GravitySection() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(reduceMotion ? TOTAL : 0)

  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL)
      return
    }
    const id = setInterval(() => {
      setStep(s => (s >= TOTAL + HOLD_STEPS ? 0 : s + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const weeksShown = Math.max(0, Math.min(step, WEEKS_REVEALED))
  const draftShown = step >= DRAFT_STEP
  const buttonsShown = step >= BUTTONS_STEP
  const statsShown = step >= STATS_STEP
  const scanPct = Math.min(100, Math.round((step / TOTAL) * 100))

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

        {/* Right — product panel, a live-running build sequence rather than a static mock */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <HudCard
            halo="amber"
            label="Gravity // this month's plan"
            status={{ tone: scanPct < 100 ? 'live' : 'active', label: scanPct < 100 ? 'Planning' : 'Live' }}
          >
            {/* Build progress — same telemetry bar as the hero console */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="neb-label">{scanPct < 100 ? 'Filling the month' : 'Plan ready'}</span>
                <span className="font-mono text-[12px] text-gold-text tabular-nums">{scanPct}%</span>
              </div>
              <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${scanPct}%`, boxShadow: '0 0 10px rgba(245,166,35,0.5)' }}
                />
              </div>
            </div>

            {/* Month view — weeks fill in as the plan is built */}
            <div className="bg-surface-2 border border-rule rounded-[14px] p-[17px] mb-[14px]">
              <div className="grid grid-cols-7 gap-[5px] mb-2">
                {WEEKDAYS.map((d, i) => (
                  <div key={i} className="text-[9.5px] text-center text-faint tracking-[0.04em]">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-[5px]">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
                  const week = Math.floor((day - 1) / 7)
                  const revealed = week < weeksShown
                  const on = revealed && SCHEDULED.has(day)
                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-[4px] flex items-center justify-center text-[9.5px] transition-all duration-300 ${
                        !revealed
                          ? 'bg-white/[0.015] border border-white/[0.03] text-transparent'
                          : on
                          ? 'bg-gold/[0.22] border border-gold/40 text-gold-text'
                          : 'bg-white/[0.03] border border-white/[0.05] text-faint'
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Drafted post — appears once the plan is built */}
            <div
              className={`bg-surface-2 border border-rule rounded-[14px] p-5 mb-[14px] transition-all duration-500 ${
                draftShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <SectionLabel tone="onDark" className="mb-3 block">Tuesday · LinkedIn</SectionLabel>
              <p className="font-body text-[14.5px] leading-[1.6] text-ink-2 mb-4">
                Most of our customers don&rsquo;t compare us to other jewellers. They compare us to the shop their mother trusted for thirty years. That&rsquo;s the bar.
              </p>
              <div className={`flex gap-2 transition-opacity duration-400 ${buttonsShown ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-[11px] text-muted border border-rule-2 rounded-full px-[11px] py-1">Approve</span>
                <span className="text-[11px] text-muted border border-rule-2 rounded-full px-[11px] py-1">Rewrite</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[10px]">
              {stats.map((stat) => (
                <StatCell key={stat.label} {...stat} active={statsShown} />
              ))}
            </div>
          </HudCard>
        </motion.div>
      </div>
    </section>
  )
}
