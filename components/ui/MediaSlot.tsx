'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, Clapperboard } from 'lucide-react'
import { getSlot } from '@/lib/mediaSlots'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { mediaUrl } from '@/lib/mediaUrl'

interface Props {
  /** Slot id from lib/mediaSlots.ts */
  id: string
  className?: string
  /** Aspect ratio of the box, e.g. '4 / 5'. Photos and videos are cropped to fill it. */
  ratio?: string
  priority?: boolean
  /**
   * Small placeholder for tight spaces (phone frames, thumbnails): an icon and
   * the slot's name only, no capture instructions.
   */
  compact?: boolean
  /** Draws nothing until a file is uploaded, for backgrounds that bring their own fallback. Use with ratio="auto". */
  bare?: boolean
}

/**
 * Shows the uploaded photo or video for a slot (uploaded in /admin/media, no
 * deploy needed) and, until then, a soft labelled placeholder that says what
 * belongs there. Media always fills the box and is cropped to the ratio, so a
 * row of mixed uploads still lines up.
 */
export default function MediaSlot({ id, className = '', ratio = '16 / 10', priority, compact = false, bare = false }: Props) {
  const slot = getSlot(id)
  // null = not checked yet, so a filled slot never flashes its placeholder.
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

  if (!slot) return null

  const box = `relative w-full overflow-hidden rounded-[inherit] ${className}`
  const boxStyle = ratio === 'auto' ? undefined : { aspectRatio: ratio }

  if (filled === null || (bare && !filled)) {
    return <div className={box} style={boxStyle} aria-hidden="true" />
  }

  if (filled) {
    const src = mediaUrl(slot.file)
    return (
      <div className={box} style={boxStyle}>
        {slot.kind === 'video' ? (
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={slot.label}
          />
        ) : (
          <Image
            src={src}
            alt={slot.label}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            priority={priority}
            className="object-cover"
          />
        )}
      </div>
    )
  }

  const Icon = slot.kind === 'video' ? Clapperboard : ImageIcon

  return (
    <div
      className={`${box} flex items-center justify-center text-center border border-dashed border-rule-2 bg-gradient-to-br from-peach via-surface-2 to-sky`}
      style={boxStyle}
      data-media-slot={slot.id}
    >
      {compact ? (
        <div className="flex flex-col items-center gap-2 px-3">
          <Icon size={22} className="text-coral-text" />
          <span className="text-[11px] font-bold text-ink-2 leading-tight">{slot.label}</span>
        </div>
      ) : (
        <div className="max-w-[44ch] px-6 py-5">
          <Icon size={26} className="text-coral-text mx-auto mb-3" />
          <p className="neb-label mb-2">{slot.kind} · to add</p>
          <p className="font-heading text-[17px] text-ink mb-2">{slot.label}</p>
          <p className="font-body text-[13px] leading-[1.55] text-ink-2 mb-3">{slot.spec}</p>
          <p className="font-body text-[11.5px] text-muted">
            Upload <code className="text-ink-2">{slot.file}</code> in /admin/media · {slot.dimensions}
          </p>
        </div>
      )}
    </div>
  )
}
