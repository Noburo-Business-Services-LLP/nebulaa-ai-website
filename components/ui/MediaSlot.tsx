'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, Clapperboard, UploadCloud, Loader2 } from 'lucide-react'
import { getSlot } from '@/lib/mediaSlots'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { mediaUrl } from '@/lib/mediaUrl'
import { useEditMode, uploadMedia, bustFor, MEDIA_UPDATED_EVENT } from '@/lib/mediaEdit'

interface Props {
  /** Slot id from lib/mediaSlots.ts */
  id: string
  className?: string
  /** Aspect ratio of the box, e.g. '4 / 5'. Photos and videos are cropped to fill it. */
  ratio?: string
  priority?: boolean
  /** Small placeholder for tight spaces (phone frames, thumbnails): an icon and the slot's name only. */
  compact?: boolean
  /** Draws nothing until a file is uploaded, for backgrounds that bring their own fallback. Use with ratio="auto". */
  bare?: boolean
}

/** Tracks whether a slot's file exists, and refreshes when something is uploaded anywhere on the page. */
export function useSlotFilled(file: string | undefined): boolean | null {
  const [filled, setFilled] = useState<boolean | null>(null)
  useEffect(() => {
    if (!file) return
    let cancelled = false
    const check = () => getMediaManifest().then(keys => { if (!cancelled) setFilled(keys.has(file)) })
    check()
    window.addEventListener(MEDIA_UPDATED_EVENT, check)
    return () => {
      cancelled = true
      window.removeEventListener(MEDIA_UPDATED_EVENT, check)
    }
  }, [file])
  return filled
}

/** Click-or-drop upload target. Used over a slot in edit mode, and as a floating chip for background slots. */
export function useSlotUpload(slotFile: string, secret: string | null) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const send = useCallback(
    async (file: File | undefined) => {
      if (!file || !secret) return
      setBusy(true)
      setError('')
      try {
        await uploadMedia(file, slotFile, secret)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed')
      }
      setBusy(false)
    },
    [slotFile, secret],
  )

  return {
    inputRef,
    busy,
    error,
    dragOver,
    open: () => inputRef.current?.click(),
    send,
    dropProps: {
      onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDragOver(true) },
      onDragLeave: () => setDragOver(false),
      onDrop: (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); send(e.dataTransfer.files?.[0]) },
    },
  }
}

/**
 * Shows the uploaded photo or video for a slot and, until then, a soft
 * placeholder. Visitors only ever see the compact placeholders (they hold the
 * layout); the long "upload this here" boxes appear only in edit mode, where
 * every slot also becomes click-or-drop to upload.
 */
export default function MediaSlot({ id, className = '', ratio = '16 / 10', priority, compact = false, bare = false }: Props) {
  const slot = getSlot(id)
  const filled = useSlotFilled(slot?.file)
  const { editing, secret } = useEditMode()
  const up = useSlotUpload(slot?.file ?? '', secret)

  if (!slot) return null

  const box = `relative w-full overflow-hidden rounded-[inherit] ${className}`
  const boxStyle = ratio === 'auto' ? undefined : { aspectRatio: ratio }
  const accept = slot.kind === 'video' ? 'video/*' : 'image/*'

  if (filled === null || (bare && !filled)) {
    return <div className={box} style={boxStyle} aria-hidden="true" />
  }

  // Visitors never see the long placeholders for slots that are still empty.
  if (!filled && !compact && !editing) return null

  const Icon = slot.kind === 'video' ? Clapperboard : ImageIcon
  const src = filled ? `${mediaUrl(slot.file)}${bustFor(slot.file)}` : ''

  const overlay = editing ? (
    <>
      <input ref={up.inputRef} type="file" accept={accept} className="hidden" onChange={e => up.send(e.target.files?.[0])} />
      <button
        type="button"
        onClick={up.open}
        {...up.dropProps}
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 text-center transition-all ${
          filled
            ? `opacity-0 hover:opacity-100 bg-ink/55 text-white ${up.dragOver ? '!opacity-100' : ''}`
            : `border-2 border-dashed border-coral bg-white/40 hover:bg-white/70 ${up.dragOver ? 'bg-white/90' : ''}`
        }`}
        aria-label={`${filled ? 'Replace' : 'Upload'} ${slot.label}`}
      >
        {up.busy ? <Loader2 size={24} className="animate-spin" /> : <UploadCloud size={24} className={filled ? '' : 'text-coral-text'} />}
        <span className={`px-3 text-[12.5px] font-bold leading-tight ${filled ? '' : 'text-ink'}`}>
          {up.busy ? 'Uploading…' : filled ? `Replace ${slot.kind}` : `Click or drop a ${slot.kind} here`}
        </span>
        {!filled && <span className="px-3 text-[11px] text-ink-2 leading-tight">{slot.label}</span>}
        {up.error && <span className="px-3 text-[11px] font-semibold text-red-700 leading-tight">{up.error}</span>}
      </button>
    </>
  ) : null

  if (filled) {
    return (
      <div className={box} style={boxStyle}>
        {slot.kind === 'video' ? (
          <video src={src} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline aria-label={slot.label} />
        ) : (
          <Image src={src} alt={slot.label} fill sizes="(min-width: 1024px) 40vw, 90vw" priority={priority} className="object-cover" unoptimized={Boolean(bustFor(slot.file))} />
        )}
        {overlay}
      </div>
    )
  }

  return (
    <div
      className={`${box} flex items-center justify-center text-center border border-dashed border-rule-2 bg-gradient-to-br from-peach via-surface-2 to-sky`}
      style={boxStyle}
      data-media-slot={slot.id}
    >
      {compact ? (
        <div className="flex flex-col items-center gap-2 px-3">
          {!editing && <Icon size={22} className="text-coral-text" />}
          {!editing && <span className="text-[11px] font-bold text-ink-2 leading-tight">{slot.label}</span>}
        </div>
      ) : (
        <div className="max-w-[44ch] px-6 py-5">
          <Icon size={26} className="text-coral-text mx-auto mb-3" />
          <p className="neb-label mb-2">{slot.kind} · to add</p>
          <p className="font-heading text-[17px] text-ink mb-2">{slot.label}</p>
          <p className="font-body text-[13px] leading-[1.55] text-ink-2 mb-3">{slot.spec}</p>
          <p className="font-body text-[11.5px] text-muted">{slot.dimensions}</p>
        </div>
      )}
      {overlay}
    </div>
  )
}
