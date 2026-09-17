'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import StatusIndicator from '@/components/ui/StatusIndicator'

/**
 * The hero's live Nebulaa Core console — the master copy's "not an
 * illustration, a live simulated console".
 *
 * It runs the actual opening sequence of the product: a URL goes in, the
 * business context resolves field by field, then the engines come online.
 * Showing that beats describing it, and it is the same claim the page makes
 * in words directly beside it.
 *
 * Every step is a real thing the system does — nothing here is invented to
 * fill the panel.
 */

const CONTEXT = [
  { field: 'Business context', state: 'Ready' },
  { field: 'Audience', state: 'Identified' },
  { field: 'Positioning', state: 'Mapped' },
  { field: 'Channels', state: 'Detected' },
  { field: 'Objectives', state: 'Ready' },
] as const

const ENGINES = [
  { name: 'Core', state: 'Online' },
  { name: 'Gravity', state: 'Ready' },
  { name: 'Orbit', state: 'Ready' },
  { name: 'Pulsar', state: 'Ready' },
] as const

/** Total steps: the scan, then each context field, then each engine. */
const TOTAL = 1 + CONTEXT.length + ENGINES.length
/** Extra steps spent sitting on the finished state before the loop restarts. */
const HOLD_STEPS = 18
const STEP_MS = 620

export default function CoreConsole() {
  const reduceMotion = useReducedMotion()
  // With reduced motion the sequence is skipped, not slowed — a resolved
  // console says the same thing without anything moving.
  const [step, setStep] = useState(reduceMotion ? TOTAL : 0)

  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL)
      return
    }
    const id = setInterval(() => {
      // Hold on the completed state roughly twice as long as the build takes.
      // The panel should read as a system that is already running; someone
      // landing mid-cycle should almost always meet a resolved console, not
      // an empty one part-way through filling in.
      setStep(s => (s >= TOTAL + HOLD_STEPS ? 0 : s + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const scanning = step < 1
  const contextShown = Math.max(0, Math.min(step - 1, CONTEXT.length))
  const enginesShown = Math.max(0, Math.min(step - 1 - CONTEXT.length, ENGINES.length))
  const scanPct = Math.min(100, Math.round((step / TOTAL) * 100))

  return (
    <div className="neb-panel neb-panel-lit overflow-hidden">
      {/* Header */}
      <div className="neb-panel-rule flex items-center justify-between gap-4 px-4 py-3">
        <span className="neb-label">Nebulaa Core</span>
        <StatusIndicator tone={scanning ? 'live' : 'active'} label={scanning ? 'Scanning' : 'Online'} />
      </div>

      <div className="p-4">
        {/* The URL that started it */}
        <div className="flex items-center gap-2 mb-3">
          <span className="neb-label text-gold-text">▸</span>
          <span className="font-mono text-[12.5px] text-ink-2 truncate">https://yourbusiness.com</span>
        </div>

        {/* Scan progress */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-2">
            <span className="neb-label">
              {scanPct < 100 ? 'Analysing business' : 'Business understood'}
            </span>
            <span className="font-mono text-[12px] text-gold-text tabular-nums">{scanPct}%</span>
          </div>
          <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${scanPct}%`, boxShadow: '0 0 10px rgba(245,166,35,0.5)' }}
            />
          </div>
        </div>

        {/* Context resolving, field by field */}
        <div className="flex flex-col gap-[7px] mb-5">
          {CONTEXT.map((row, i) => {
            const done = i < contextShown
            return (
              <div
                key={row.field}
                className={`flex items-center justify-between gap-3 transition-opacity duration-300 ${
                  done ? 'opacity-100' : 'opacity-25'
                }`}
              >
                <span className="font-mono text-[12px] text-ink-2">{row.field}</span>
                <span className="flex items-center gap-2">
                  <span className={`neb-label ${done ? 'text-gold-text' : ''}`}>
                    {done ? row.state : '—'}
                  </span>
                  <span
                    className={`w-1 h-1 rounded-full ${done ? 'bg-gold' : 'bg-white/15'}`}
                    style={done ? { boxShadow: '0 0 6px rgba(245,166,35,0.7)' } : undefined}
                  />
                </span>
              </div>
            )
          })}
        </div>

        {/* Engines coming online */}
        <div className="grid grid-cols-2 gap-2">
          {ENGINES.map((engine, i) => {
            const on = i < enginesShown
            return (
              <div
                key={engine.name}
                className={`rounded-lg border px-3 py-2.5 transition-all duration-300 ${
                  on
                    ? 'border-gold/25 bg-gold/[0.06]'
                    : 'border-white/[0.06] bg-white/[0.015] opacity-40'
                }`}
              >
                <div className="font-heading text-[13.5px] font-medium mb-1">{engine.name}</div>
                {on ? (
                  <StatusIndicator tone="active" label={engine.state} pulse={false} />
                ) : (
                  <span className="neb-label">Standby</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
