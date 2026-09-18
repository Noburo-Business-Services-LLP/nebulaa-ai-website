'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Crosshair, Search, Sparkles, Filter, Send, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import StatusIndicator from '@/components/ui/StatusIndicator'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const bullets = [
  { icon: Search, text: 'Finds real businesses matching who you actually sell to' },
  { icon: Sparkles, text: 'Enriches a contact email even when the listing never gives one' },
  { icon: Filter, text: 'Keeps only the phone-reachable, credible ones — not a scraped list' },
  { icon: Send, text: 'Drafts the opening message with the context it just gathered' },
  { icon: Crosshair, text: 'Pushes qualified leads into your CRM, assigned and ready to work' },
]

/**
 * The funnel narrows at each stage, which is the whole argument: finding
 * names is easy, and the value is in what survives qualification. The
 * figures are illustrative of one run's shape, not a performance claim.
 */
const PIPELINE = [
  { stage: 'ICP defined', count: null, note: 'Who you sell to' },
  { stage: 'Sourced', count: 142, note: 'Businesses matching the profile' },
  { stage: 'Enriched', count: 96, note: 'Verified contact emails found' },
  { stage: 'Qualified', count: 34, note: 'Phone-reachable, rated 4.2+' },
  { stage: 'Outreach drafted', count: 34, note: 'Personalised from real context' },
]

/**
 * Same live-console pattern as CoreConsole/GravitySection/PulsarSection —
 * the funnel narrows one stage at a time instead of appearing fully built,
 * so the panel reads as a run actually happening.
 */
const HANDOFF_STEP = PIPELINE.length + 1
const TOTAL = HANDOFF_STEP
const HOLD_STEPS = 16
const STEP_MS = 600

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

function PipelineRow({ row, revealed, isLast }: { row: (typeof PIPELINE)[number]; revealed: boolean; isLast: boolean }) {
  const count = useCountUp(row.count ?? 0, revealed && row.count !== null)
  return (
    <div className={`transition-all duration-400 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}>
      <div className="flex items-center justify-between gap-4 py-[11px]">
        <div className="min-w-0">
          <div className="font-heading text-[14.5px] font-medium mb-0.5">{row.stage}</div>
          <div className="neb-label leading-tight">{row.note}</div>
        </div>
        {row.count !== null && (
          <span className="font-digital text-[22px] text-gold-text tabular-nums flex-shrink-0">
            {count}
          </span>
        )}
      </div>
      {!isLast && (
        <div className="flex justify-center py-0.5" aria-hidden="true">
          <span className="w-px h-3 bg-gradient-to-b from-gold/45 to-transparent" />
        </div>
      )}
    </div>
  )
}

export default function OrbitSection() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(reduceMotion ? TOTAL : 0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setStep(s => (s >= TOTAL + HOLD_STEPS ? 0 : s + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const rowsShown = Math.max(0, Math.min(step, PIPELINE.length))
  const handoffShown = step >= HANDOFF_STEP

  return (
    <section id="orbit" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[90px] items-center">
        {/* Left — copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[22px] block">Orbit // Lead generation</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="neb-display text-[34px] md:text-[50px] mb-[26px]">
            <span className="text-gold-display">Orbit</span> finds and qualifies leads that match your ideal customer profile, then hands the warm ones to Pulsar.
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="font-body text-[17px] leading-[1.68] text-muted max-w-[480px] mb-[34px]"
          >
            Orbit turns your ideal customer profile into a prospecting engine. It finds real businesses
            that match, verifies and qualifies them, drafts outreach that reads naturally, and hands
            the warm ones to Pulsar.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-col gap-4 mb-9">
            {bullets.map(({ icon: Icon, text }) => (
              <div key={text} className="flex gap-[13px] items-start">
                <span className="w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center flex-shrink-0 mt-[1px]">
                  <Icon size={13} className="text-gold-text" />
                </span>
                <span className="text-[15.5px] leading-[1.6] text-ink-2">{text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <Link
              href="/product/orbit"
              className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-gold-text hover:gap-3 transition-all"
            >
              Explore Orbit <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — the pipeline, narrowing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.55 }}
        >
          <HudCard
            halo="cyan"
            label="Orbit // prospecting run"
            status={{ tone: handoffShown ? 'active' : 'live', label: handoffShown ? 'Complete' : 'Running' }}
          >
            <div className="flex flex-col">
              {PIPELINE.map((row, i) => (
                <PipelineRow key={row.stage} row={row} revealed={i < rowsShown} isLast={i === PIPELINE.length - 1} />
              ))}

              {/* The handoff — the point of the whole run */}
              <div
                className={`flex items-center justify-between gap-4 mt-3 pt-3.5 border-t border-rule transition-all duration-500 ${
                  handoffShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
                }`}
              >
                <span className="neb-label">Handed to Pulsar</span>
                <StatusIndicator tone="active" label="Engaging" />
              </div>
            </div>
          </HudCard>
        </motion.div>
      </div>
    </section>
  )
}
