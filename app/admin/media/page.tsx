'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Upload, Trash2, ExternalLink } from 'lucide-react'
import { mediaSlots, type SlotKind } from '@/lib/mediaSlots'
import { adminFetch, AuthGate, useAdminAuth } from '@/lib/adminClient'
import { invalidateMediaManifest } from '@/lib/mediaManifestClient'

interface MediaObject {
  key: string
  url: string
  size: number
  lastModified: string
}

const GROUPS: { kind: SlotKind; title: string; note: string }[] = [
  { kind: 'screenshot', title: 'Product screenshots', note: 'Captured from the Gravity and Pulsar apps at 2x.' },
  { kind: 'logo', title: 'Client logos', note: 'SVG preferred. Each needs display permission before it goes live.' },
  { kind: 'creative', title: 'Sample creative', note: 'Illustrative of what Gravity produces — never captioned as a named client’s published work.' },
  { kind: 'photo', title: 'Activation photography', note: 'Documentary realism, Indian tier-2 retail.' },
  { kind: 'video', title: 'Video', note: 'Autoplayed muted in a phone frame. Keep under 8MB.' },
]

/**
 * Uploads a file for one slot: asks the API for a presigned S3 URL (or, in
 * local dev, has the API write the bytes directly — see the route), PUTs
 * the file, then tells the shared manifest cache to refetch so every
 * MediaSlot on the site picks up the change without a reload.
 */
async function uploadSlotFile(file: File, key: string, secret: string) {
  const initRes = await fetch('/api/admin/media', {
    method: 'POST',
    headers: {
      'x-admin-secret': secret,
      'x-media-key': key,
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })
  const initData = await initRes.json()
  if (initData.error) throw new Error(initData.error)

  if (initData.uploadUrl) {
    // Production path: the POST above only minted the URL, the actual bytes
    // go straight to S3 from here.
    const putRes = await fetch(initData.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    if (!putRes.ok) throw new Error('Upload to storage failed')
  }
  // Local dev path: the POST already wrote the file — nothing further to do.

  invalidateMediaManifest()
}

function SlotRow({
  slot,
  present,
  secret,
  onChanged,
}: {
  slot: (typeof mediaSlots)[number]
  present: MediaObject | undefined
  secret: string
  onChanged: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      await uploadSlotFile(file, slot.file, secret)
      onChanged()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }
    setBusy(false)
  }

  const handleDelete = async () => {
    setBusy(true)
    setError('')
    try {
      await adminFetch('/api/admin/media', secret, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: slot.file }),
      })
      invalidateMediaManifest()
      onChanged()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
    setBusy(false)
  }

  const accept = slot.kind === 'video' ? 'video/*' : 'image/*,.svg'

  return (
    <div
      className={`rounded-[14px] border p-5 ${present ? 'border-gold/30 bg-gold/[0.05]' : 'border-rule bg-surface'}`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-2">
        {present ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-text">
            <Check size={13} /> filled
          </span>
        ) : (
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">awaiting</span>
        )}
        <span className="font-heading text-[17px]">{slot.label}</span>
      </div>
      <p className="text-[14px] leading-[1.6] text-muted mb-3 max-w-[74ch]">{slot.spec}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12.5px] text-faint mb-4">
        <span>
          File <code className="text-ink-2">{slot.file}</code>
        </span>
        <span>{slot.dimensions}</span>
        <span>Used on {slot.usedOn}</span>
        {present && <span>{(present.size / 1024).toFixed(0)} KB</span>}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold bg-gold text-[#1A1208] rounded-full px-4 py-2 hover:brightness-110 transition disabled:opacity-50"
        >
          <Upload size={13} /> {busy ? 'Working…' : present ? 'Replace' : 'Upload'}
        </button>
        {present && (
          <>
            <a
              href={present.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 border border-rule-2 rounded-full px-4 py-2 hover:border-gold transition"
            >
              <ExternalLink size={13} /> View
            </a>
            <button
              onClick={handleDelete}
              disabled={busy}
              className="inline-flex items-center gap-1.5 text-[13px] text-red-400 border border-red-400/30 rounded-full px-4 py-2 hover:bg-red-400/10 transition disabled:opacity-50"
            >
              <Trash2 size={13} /> Remove
            </button>
          </>
        )}
        {error && <span className="text-[12.5px] text-red-400">{error}</span>}
      </div>
    </div>
  )
}

function MediaManager({ secret }: { secret: string }) {
  const [objects, setObjects] = useState<MediaObject[] | null>(null)

  const refresh = useCallback(() => {
    adminFetch<MediaObject[]>('/api/admin/media', secret).then(setObjects)
  }, [secret])

  useEffect(() => { refresh() }, [refresh])

  if (!objects) {
    return <p className="text-muted">Loading…</p>
  }

  const byKey = new Map(objects.map(o => [o.key, o]))
  const filled = mediaSlots.filter(s => byKey.has(s.file)).length

  return (
    <div>
      <h1 className="neb-display text-[34px] md:text-[46px] mb-4">
        {filled} of {mediaSlots.length} slots filled.
      </h1>
      <p className="text-[15px] leading-[1.65] text-muted max-w-[68ch] mb-[52px]">
        Upload replaces the live asset immediately — no deploy needed. Files go straight to storage from
        your browser.
      </p>

      <div className="flex flex-col gap-12">
        {GROUPS.map(group => {
          const slots = mediaSlots.filter(s => s.kind === group.kind)
          if (slots.length === 0) return null
          return (
            <section key={group.kind}>
              <h2 className="font-heading font-medium text-[24px] mb-1.5">{group.title}</h2>
              <p className="text-[14px] text-muted mb-6 max-w-[70ch]">{group.note}</p>
              <div className="flex flex-col gap-3">
                {slots.map(slot => (
                  <SlotRow key={slot.id} slot={slot} present={byKey.get(slot.file)} secret={secret} onChanged={refresh} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

export default function AdminMediaPage() {
  const { secret, setSecret, verifying } = useAdminAuth()

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/40 font-body text-sm">Authenticating…</p>
      </div>
    )
  }

  if (!secret) return <AuthGate onAuth={setSecret} />

  return (
    <main className="bg-ground text-ink min-h-screen px-6 md:px-12 lg:px-[80px] py-[70px]">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink mb-8">
        <ArrowLeft size={14} /> Admin
      </Link>
      <MediaManager secret={secret} />
    </main>
  )
}
