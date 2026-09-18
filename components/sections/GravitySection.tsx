'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Target, CalendarCheck, Radar, TrendingUp, CircleCheck,
  Linkedin, Instagram, Twitter, Clapperboard, Image as ImageIcon, Layers, Inbox,
} from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import StatusIndicator from '@/components/ui/StatusIndicator'
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

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
/** 18 scheduled days across a 4-week view. Each cell's format cycles
 *  reel/carousel/image so the grid reads as actual posts, not a bare
 *  schedule of numbers. */
const SCHEDULED = new Set([1, 2, 4, 5, 6, 7, 9, 11, 13, 14, 16, 18, 20, 21, 23, 25, 27, 28])
const FORMAT_ICONS = [Clapperboard, Layers, ImageIcon]

const STUDIO_JOBS = [
  { icon: Clapperboard, title: 'Diwali collection teaser', kind: 'Reel', state: 'Rendering' },
  { icon: Layers, title: 'New arrivals — 6 slides', kind: 'Carousel', state: 'Ready' },
  { icon: ImageIcon, title: 'Bridal set — product shot', kind: 'Image', state: 'Ready' },
]

const INBOX_ROWS = [
  { icon: Instagram, from: '@ananya.k', channel: 'Instagram DM', msg: 'Do you ship to Bangalore?', state: 'Replied' },
  { icon: Linkedin, from: 'Rohit Sharma', channel: 'LinkedIn comment', msg: 'Loved the Diwali carousel!', state: 'Replied' },
  { icon: Twitter, from: '@styled_by_mira', channel: 'X mention', msg: 'tagged you in a repost', state: 'Drafting' },
]

/**
 * Three capability screens cycling on one HudCard, the same live-console
 * pattern as the hero's CoreConsole — a single tick counter drives which
 * screen is active and how far its own reveal has progressed, so the panel
 * keeps demonstrating what Gravity actually does (plans the month, makes
 * the assets, handles the inbox) instead of freezing on one static screen.
 * Rows are flat — a divider line, no per-row box — matching Orbit's panel
 * right below it rather than the boxed-card look this used to have.
 */
const SCREENS = [
  { key: 'calendar', label: "Gravity // this month's plan", span: 8 },
  { key: 'studio', label: 'Gravity // content studio', span: 6 },
  { key: 'inbox', label: 'Gravity // unified inbox', span: 6 },
] as const
const TOTAL = SCREENS.reduce((sum, s) => sum + s.span, 0)
const STEP_MS = 580

export default function GravitySection() {
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(reduceMotion ? TOTAL - 1 : 0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setTick(t => (t + 1) % TOTAL), STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  let acc = 0
  let screenIndex = 0
  let localTick = 0
  for (let i = 0; i < SCREENS.length; i++) {
    if (tick < acc + SCREENS[i].span) {
      screenIndex = i
      localTick = tick - acc
      break
    }
    acc += SCREENS[i].span
  }
  const screen = SCREENS[screenIndex]

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
            Gravity turns a month of content into <span className="text-gold-display">a single afternoon of approvals.</span>
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

        {/* Right — three capability screens, cycling on one live panel */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <HudCard halo="amber" label={screen.label} status={screenStatus(screen.key, localTick)}>
            <div className="min-h-[290px]">
              <AnimatePresence mode="wait">
                {screen.key === 'calendar' && (
                  <motion.div key="calendar" {...crossfade}>
                    <CalendarScreen localTick={localTick} />
                  </motion.div>
                )}
                {screen.key === 'studio' && (
                  <motion.div key="studio" {...crossfade}>
                    <StudioScreen localTick={localTick} />
                  </motion.div>
                )}
                {screen.key === 'inbox' && (
                  <motion.div key="inbox" {...crossfade}>
                    <InboxScreen localTick={localTick} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </HudCard>
        </motion.div>
      </div>
    </section>
  )
}

const crossfade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35 },
}

function screenStatus(key: (typeof SCREENS)[number]['key'], localTick: number): { tone: 'live' | 'active'; label: string } {
  if (key === 'calendar') return localTick < 4 ? { tone: 'live', label: 'Planning' } : { tone: 'active', label: 'Live' }
  if (key === 'studio') return localTick < 3 ? { tone: 'live', label: 'Rendering' } : { tone: 'active', label: 'Ready' }
  return localTick < 3 ? { tone: 'live', label: 'Scanning' } : { tone: 'active', label: 'Auto-replying' }
}

function CalendarScreen({ localTick }: { localTick: number }) {
  const weeksShown = Math.max(0, Math.min(localTick, 4))
  const scanPct = Math.min(100, Math.round((weeksShown / 4) * 100))

  return (
    <div>
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

      <div className="grid grid-cols-7 gap-[5px] mb-2">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="text-[9.5px] text-center text-faint tracking-[0.04em]">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[5px] mb-4">
        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
          const week = Math.floor((day - 1) / 7)
          const revealed = week < weeksShown
          const on = revealed && SCHEDULED.has(day)
          const FormatIcon = FORMAT_ICONS[day % FORMAT_ICONS.length]
          return (
            <div
              key={day}
              className={`aspect-square rounded-[4px] flex items-center justify-center transition-all duration-300 ${
                !revealed
                  ? 'bg-white/[0.015] border border-white/[0.03]'
                  : on
                  ? 'bg-gold/[0.18] border border-gold/40'
                  : 'bg-white/[0.03] border border-white/[0.05]'
              }`}
            >
              {on && <FormatIcon size={10} className="text-gold-text" strokeWidth={2.25} />}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-4 pt-3.5 border-t border-rule">
        <span className="flex items-center gap-1.5 text-[11.5px] text-faint">
          <Clapperboard size={11} className="text-gold-text" /> Reels
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-faint">
          <Layers size={11} className="text-gold-text" /> Carousels
        </span>
        <span className="flex items-center gap-1.5 text-[11.5px] text-faint">
          <ImageIcon size={11} className="text-gold-text" /> Images
        </span>
        <span className="ml-auto font-heading text-[15px] text-gold-text tabular-nums">18 queued</span>
      </div>
    </div>
  )
}

function StudioScreen({ localTick }: { localTick: number }) {
  const rowsShown = Math.max(0, Math.min(localTick, STUDIO_JOBS.length))
  return (
    <div className="flex flex-col">
      {STUDIO_JOBS.map((job, i) => {
        const shown = i < rowsShown
        const rendering = job.state === 'Rendering'
        return (
          <div
            key={job.title}
            className={`flex items-center justify-between gap-4 py-[13px] transition-all duration-400 ${
              i > 0 ? 'border-t border-rule' : ''
            } ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center">
                <job.icon size={13} className="text-gold-text" />
              </span>
              <div className="min-w-0">
                <div className="font-heading text-[14px] font-medium truncate">{job.title}</div>
                <div className="neb-label leading-tight">{job.kind}</div>
              </div>
            </div>
            {rendering ? (
              <StatusIndicator tone="live" label="Rendering" />
            ) : (
              <StatusIndicator tone="active" label="Ready" pulse={false} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function InboxScreen({ localTick }: { localTick: number }) {
  const rowsShown = Math.max(0, Math.min(localTick, INBOX_ROWS.length))
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pb-3 mb-1 border-b border-rule">
        <Inbox size={13} className="text-gold-text" />
        <span className="neb-label">Every DM, comment and mention — one queue</span>
      </div>
      {INBOX_ROWS.map((row, i) => {
        const shown = i < rowsShown
        return (
          <div
            key={row.from}
            className={`flex items-center justify-between gap-4 py-[13px] transition-all duration-400 ${
              i > 0 ? 'border-t border-rule' : ''
            } ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center">
                <row.icon size={13} className="text-gold-text" />
              </span>
              <div className="min-w-0">
                <div className="font-heading text-[13.5px] font-medium truncate">{row.from}</div>
                <div className="font-body text-[12.5px] text-muted truncate">{row.msg}</div>
              </div>
            </div>
            <StatusIndicator tone={row.state === 'Replied' ? 'active' : 'live'} label={row.state} pulse={row.state !== 'Replied'} />
          </div>
        )
      })}
    </div>
  )
}
