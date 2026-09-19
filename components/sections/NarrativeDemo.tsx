'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Clapperboard, Image as ImageIcon, Layers } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import StatusIndicator from '@/components/ui/StatusIndicator'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { demoRuns, demoStages } from '@/lib/demoData'
import { viewportOptions } from '@/lib/animations'

/** Sub-panels use the same theme-token surface as every other HUD panel on
 *  the site (Gravity/Orbit/Pulsar) — flat hardcoded hex here was the exact
 *  "old-school, doesn't match" mismatch that got fixed everywhere else. */
const PANEL = 'bg-surface-2 border border-rule rounded-[14px]'
const FORMAT_ICONS = [Clapperboard, Layers, ImageIcon]

function Stage({
  index,
  label,
  children,
}: {
  index: number
  label: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOptions}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="grid md:grid-cols-[132px_minmax(0,1fr)] gap-x-7 gap-y-2.5"
    >
      <div className="flex md:flex-col items-baseline md:items-start gap-2.5 md:gap-1 pt-1">
        <span className="font-digital text-[11px] tabular-nums text-gold-text">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-[12px] uppercase tracking-[0.09em] text-faint">{label}</span>
      </div>
      <div className="min-w-0">{children}</div>
    </motion.div>
  )
}

export default function NarrativeDemo() {
  const [active, setActive] = useState(0)
  const run = demoRuns[active]

  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="max-w-[680px] mb-[46px]">
        <SectionLabel className="mb-[22px] block">One run, start to finish</SectionLabel>
        <h2 className="neb-display text-[34px] md:text-[50px] mb-5">
          <span className="text-gold-display">One URL in.</span> Here is what runs end to end.
        </h2>
        <p className="font-body text-[17px] leading-[1.68] text-muted">
          The same seven steps run for any business. Pick a sector and follow one all the way
          through — from reading the website to answering the enquiry it produced.
        </p>
      </div>

      {/* Sector picker */}
      <div className="flex flex-wrap gap-2 mb-7" role="tablist" aria-label="Choose a sector">
        {demoRuns.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`font-body text-[13.5px] font-medium rounded-full px-[18px] py-2.5 border transition-colors ${
              i === active
                ? 'bg-gold text-[#1A1208] border-gold'
                : 'bg-surface text-muted border-rule hover:border-gold/40 hover:text-ink'
            }`}
          >
            {r.tab}
          </button>
        ))}
      </div>

      {/* The run */}
      <AnimatePresence mode="wait">
        <motion.div
          key={run.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          <HudCard halo="amber" label={`Nebulaa // ${run.who}`} status={{ tone: 'active', label: 'Complete' }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 pb-5 border-b border-rule">
              <span className="font-heading text-[17px] text-ink">{run.who}</span>
              <span className="font-mono text-[12px] text-faint">{run.url}</span>
            </div>

            <div className="flex flex-col gap-8">
              {/* 01 — brand read */}
              <Stage index={0} label={demoStages[0].label}>
                <div className={`${PANEL} p-5`}>
                  <div className="flex flex-col gap-2.5">
                    {[
                      ['Voice', run.brandRead.tone],
                      ['Customer', run.brandRead.customer],
                      ['Competitors', run.brandRead.competitors],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col sm:flex-row sm:gap-4">
                        <span className="text-[12px] uppercase tracking-[0.08em] text-faint sm:w-[104px] flex-shrink-0 pt-0.5">
                          {k}
                        </span>
                        <span className="text-[14px] leading-[1.55] text-ink-2">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Stage>

              {/* 02 — strategy */}
              <Stage index={1} label={demoStages[1].label}>
                <div className="flex flex-wrap gap-2">
                  {run.pillars.map(p => (
                    <span
                      key={p}
                      className="text-[13px] text-ink-2 bg-white/[0.04] border border-rule rounded-full px-[14px] py-2"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Stage>

              {/* 03 — the month */}
              <Stage index={2} label={demoStages[2].label}>
                <div className={`${PANEL} p-5`}>
                  <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2 mb-4">
                    <span className="font-digital text-[30px] text-ink tabular-nums">{run.plan.slots}</span>
                    <span className="text-[13.5px] text-muted">{run.plan.formats}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-[5px] mb-3">
                    {Array.from({ length: 28 }, (_, i) => i).map(i => {
                      const on = i % 7 !== 2 && i % 7 !== 6 && i % 3 !== 0
                      const FormatIcon = FORMAT_ICONS[i % FORMAT_ICONS.length]
                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-[4px] flex items-center justify-center ${
                            on
                              ? 'bg-gold/[0.18] border border-gold/40'
                              : 'bg-white/[0.03] border border-white/[0.05]'
                          }`}
                        >
                          {on && <FormatIcon size={10} className="text-gold-text" strokeWidth={2.25} />}
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-[13px] text-faint">{run.plan.note}</p>
                </div>
              </Stage>

              {/* 04 — a drafted post */}
              <Stage index={3} label={demoStages[3].label}>
                <div className={`${PANEL} p-5`}>
                  <div className="text-[12px] uppercase tracking-[0.08em] text-faint mb-3">
                    {run.post.platform}
                  </div>
                  <p className="text-[14.5px] leading-[1.62] text-ink-2">{run.post.copy}</p>
                </div>
              </Stage>

              {/* 05 — approval */}
              <Stage index={4} label={demoStages[4].label}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[13px] font-semibold rounded-full px-[18px] py-2.5">
                    <Check size={14} /> Approve
                  </span>
                  <span className="text-[13px] text-muted border border-rule-2 rounded-full px-[16px] py-2.5">
                    Rewrite
                  </span>
                  <span className="text-[12.5px] text-faint sm:ml-2">
                    Nothing publishes until this happens.
                  </span>
                </div>
              </Stage>

              {/* 06 — the enquiry it produced */}
              <Stage index={5} label={demoStages[5].label}>
                <div className={`${PANEL} p-5`}>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-2">
                      <WhatsAppIcon size={14} className="text-[#4ADE80]" />
                      <span className="text-[12px] uppercase tracking-[0.08em] text-faint">
                        4 minutes after the post
                      </span>
                    </span>
                    <StatusIndicator tone="active" label="Replied" pulse={false} />
                  </div>

                  <div className="flex flex-col gap-2.5 mb-4">
                    <div className="self-start max-w-[80%] bg-surface border border-rule rounded-[13px_13px_13px_4px] px-4 py-3 text-[13.5px] leading-[1.5] text-muted">
                      {run.reply.inbound}
                    </div>
                    <div className="self-end max-w-[80%] bg-gold/[0.14] border border-gold/25 rounded-[13px_13px_4px_13px] px-4 py-3 text-[13.5px] leading-[1.5] text-ink-2 ml-auto">
                      {run.reply.outbound}
                    </div>
                    <div className="self-start max-w-[80%] bg-surface border border-rule rounded-[13px_13px_13px_4px] px-4 py-3 text-[13.5px] leading-[1.5] text-muted">
                      {run.reply.inboundBack}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-surface border border-rule rounded-[12px] px-4 py-3.5">
                    <div>
                      <div className="text-[11.5px] uppercase tracking-[0.08em] text-faint mb-1">
                        Scored and handed over
                      </div>
                      <div className="text-[13.5px] text-ink-2">{run.reply.handover}</div>
                    </div>
                    <div className="font-digital text-[28px] text-gold-text tabular-nums">{run.reply.score}</div>
                  </div>
                </div>
              </Stage>

              {/* 07 — the month, reported */}
              <Stage index={6} label={demoStages[6].label}>
                <div className="grid sm:grid-cols-3 gap-3">
                  {run.report.map(r => (
                    <div key={r.label} className={`${PANEL} px-5 py-4`}>
                      <div className="text-[11.5px] uppercase tracking-[0.08em] text-faint mb-2">{r.label}</div>
                      <div className="font-digital text-[26px] text-ink mb-1 tabular-nums">{r.value}</div>
                      <div className="text-[12.5px] text-faint">{r.note}</div>
                    </div>
                  ))}
                </div>
              </Stage>
            </div>
          </HudCard>
        </motion.div>
      </AnimatePresence>

      {/* Said plainly, under the thing itself. */}
      <p className="text-[13px] text-faint mt-5 max-w-[70ch]">
        An illustrative run-through using sector archetypes, not a client case study. The steps,
        formats and handover are how the product actually works; the figures are examples.
      </p>

      <div className="mt-9">
        <a
          href="/product"
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-gold-text hover:gap-3 transition-all"
        >
          See everything all three engines do <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}
