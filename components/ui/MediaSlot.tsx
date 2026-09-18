'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSlot } from '@/lib/mediaSlots'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { mediaUrl } from '@/lib/mediaUrl'

interface Props {
  /** Slot id from lib/mediaSlots.ts */
  id: string
  className?: string
  /** Rendered aspect ratio while empty, e.g. '16 / 10'. */
  ratio?: string
  priority?: boolean
}

const HUD_LINES = [
  'ANALYZING_BRAND_VOICE...',
  'READING_COMPETITOR_SET...',
  'DRAFTING_CONTENT_PLAN...',
  'SYNCING_CHANNELS...',
  'SCORING_INCOMING_LEAD...',
]

/**
 * A cycling HUD status line for empty media slots, so a gap in the asset
 * pipeline still reads as "the system is running" rather than a dead box.
 * Purely decorative — content is a fixed rotation, not live data.
 */
function LiveReadout() {
  const [lineIndex, setLineIndex] = useState(0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    const line = HUD_LINES[lineIndex]
    if (chars < line.length) {
      const t = setTimeout(() => setChars(c => c + 1), 28)
      return () => clearTimeout(t)
    }
    const hold = setTimeout(() => {
      setChars(0)
      setLineIndex(i => (i + 1) % HUD_LINES.length)
    }, 1400)
    return () => clearTimeout(hold)
  }, [chars, lineIndex])

  return (
    <span className="font-mono text-[11px] tracking-wide text-gold/70">
      {HUD_LINES[lineIndex].slice(0, chars)}
      <span className="inline-block w-[6px] h-[11px] bg-gold/60 ml-0.5 animate-pulse align-middle" />
    </span>
  )
}

/**
 * Renders the asset once it exists in public/media, and until then a
 * placeholder that states what belongs there. Built to look like a system
 * that's actively working — a scan sweep and a cycling status line — rather
 * than a static "awaiting asset" box, while still telling whoever's dropping
 * in the file exactly what's expected and where.
 */
export default function MediaSlot({ id, className = '', ratio = '16 / 10', priority }: Props) {
  const slot = getSlot(id)
  // null = not checked yet, so the first render never flashes the empty
  // placeholder for a slot that is actually filled.
  const [filled, setFilled] = useState<boolean | null>(null)

  useEffect(() => {
    if (!slot) return
    let cancelled = false
    getMediaManifest().then(keys => {
      if (!cancelled) setFilled(keys.has(slot.file))
    })
    return () => {
      cancelled = true
    }
  }, [slot])

  if (!slot) {
    return null
  }

  if (filled === null) {
    // Manifest hasn't resolved yet — an empty box the right size, not the
    // "awaiting asset" copy, since we don't yet know which is true.
    return <div className={className} style={{ aspectRatio: ratio }} aria-hidden="true" />
  }

  if (filled) {
    const src = mediaUrl(slot.file)
    if (slot.kind === 'video') {
      return (
        <video
          src={src}
          className={`w-full h-auto rounded-[14px] ${className}`}
          autoPlay
          muted
          loop
          playsInline
          aria-label={slot.label}
        />
      )
    }
    return (
      <Image
        src={src}
        alt={slot.label}
        width={1440}
        height={900}
        priority={priority}
        className={`w-full h-auto rounded-[14px] ${className}`}
      />
    )
  }

  return (
    <div
      className={`hud-card relative rounded-[14px] flex items-center justify-center p-6 overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
      data-media-slot={slot.id}
    >
      {/* Scanning sweep — the "system is running" cue */}
      <div
        className="absolute inset-y-0 w-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(245,166,35,0.06), transparent)',
          animation: 'neb-scan-sweep 3.2s ease-in-out infinite',
        }}
      />
      {/* Corner telemetry dot */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
        </span>
        <LiveReadout />
      </div>

      <div className="max-w-[46ch] text-center relative z-10">
        <p className="neb-label neb-label-gold mb-2.5">{slot.kind} · awaiting asset</p>
        <p className="font-heading text-[17px] text-ink mb-2">{slot.label}</p>
        <p className="font-body text-[13px] leading-[1.55] text-muted mb-3">{slot.spec}</p>
        <p className="font-body text-[11.5px] text-faint">
          Drop <code className="text-ink-2">{slot.file}</code> into <code className="text-ink-2">public/media/</code> · {slot.dimensions}
        </p>
      </div>
    </div>
  )
}
