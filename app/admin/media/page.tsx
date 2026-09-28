'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Upload, Trash2, ExternalLink, UploadCloud, X } from 'lucide-react'
import { mediaSlots, type SlotKind } from '@/lib/mediaSlots'
import { buildGalleryKey, parseGalleryKeys, type GalleryItem } from '@/lib/gallery'
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

/**
 * Drop many files at once and each is matched to a slot by exact filename
 * (case-insensitive) — so whoever is capturing screenshots just names each
 * file after the slot ("gravity-calendar.png") and drops the whole batch in
 * one go, rather than finding and clicking "Upload" 24 times.
 */
function BulkSlotDrop({ secret, onChanged }: { secret: string; onChanged: () => void }) {
  const [dragOver, setDragOver] = useState(false)
  const [results, setResults] = useState<{ name: string; status: 'ok' | 'unmatched' | 'error'; detail?: string }[]>([])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const slotByFilename = new Map(mediaSlots.map(s => [s.file.toLowerCase(), s]))

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setBusy(true)
    const next: typeof results = []
    for (const file of Array.from(files)) {
      const slot = slotByFilename.get(file.name.toLowerCase())
      if (!slot) {
        next.push({ name: file.name, status: 'unmatched', detail: 'No slot has this exact filename' })
        continue
      }
      try {
        await uploadSlotFile(file, slot.file, secret)
        next.push({ name: file.name, status: 'ok', detail: slot.label })
      } catch (e) {
        next.push({ name: file.name, status: 'error', detail: e instanceof Error ? e.message : 'Upload failed' })
      }
    }
    setResults(next)
    setBusy(false)
    onChanged()
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
      className={`rounded-[16px] border-2 border-dashed p-8 text-center transition-colors mb-12 ${
        dragOver ? 'border-gold bg-gold/[0.06]' : 'border-rule-2'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <UploadCloud size={22} className="mx-auto mb-3 text-faint" />
      <p className="text-[15px] text-ink-2 mb-1">
        Drop a batch of files here, named to match their slot — e.g. <code className="text-gold-text">gravity-calendar.png</code>
      </p>
      <p className="text-[13px] text-faint mb-4">Each one is matched by exact filename and uploaded automatically.</p>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-rule-2 rounded-full px-4 py-2 hover:border-gold transition disabled:opacity-50"
      >
        {busy ? 'Uploading…' : 'Choose files'}
      </button>

      {results.length > 0 && (
        <div className="mt-6 flex flex-col gap-1.5 text-left max-w-[520px] mx-auto">
          {results.map(r => (
            <div key={r.name} className="flex items-center gap-2 text-[13px]">
              {r.status === 'ok' ? (
                <Check size={13} className="text-gold-text flex-shrink-0" />
              ) : (
                <X size={13} className="text-red-400 flex-shrink-0" />
              )}
              <span className="text-ink-2">{r.name}</span>
              <span className="text-faint">— {r.detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface PendingGalleryFile {
  file: File
  business: string
  industry: string
  previewUrl: string
}

/**
 * The open-ended companion to the fixed slots above — as many real client
 * photos and reels as the team has, not a predefined list. Metadata rides
 * in the filename (see lib/gallery.ts) so no database is needed; the
 * public homepage gallery reads it straight off the same manifest this
 * page uses.
 */
function GalleryManager({ secret }: { secret: string }) {
  const [items, setItems] = useState<GalleryItem[] | null>(null)
  const [pending, setPending] = useState<PendingGalleryFile[]>([])
  const [busy, setBusy] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const refresh = useCallback(() => {
    adminFetch<MediaObject[]>('/api/admin/media', secret).then(objects =>
      setItems(parseGalleryKeys((objects ?? []).map(o => o.key))),
    )
  }, [secret])

  useEffect(() => { refresh() }, [refresh])

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const additions = Array.from(files).map(file => ({
      file,
      business: '',
      industry: '',
      previewUrl: URL.createObjectURL(file),
    }))
    setPending(p => [...p, ...additions])
  }

  const updatePending = (i: number, field: 'business' | 'industry', value: string) => {
    setPending(p => p.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)))
  }

  const removePending = (i: number) => {
    setPending(p => p.filter((_, idx) => idx !== i))
  }

  const uploadAll = async () => {
    setBusy(true)
    for (const item of pending) {
      if (!item.business.trim() || !item.industry.trim()) continue
      const key = buildGalleryKey(item.business, item.industry, item.file.name)
      await uploadSlotFile(item.file, key, secret)
    }
    setPending([])
    setBusy(false)
    refresh()
  }

  const deleteItem = async (key: string) => {
    await adminFetch('/api/admin/media', secret, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    })
    invalidateMediaManifest()
    refresh()
  }

  const readyCount = pending.filter(p => p.business.trim() && p.industry.trim()).length

  return (
    <section className="mt-16 pt-12 border-t border-rule">
      <h2 className="font-heading font-medium text-[24px] mb-1.5">Client work gallery</h2>
      <p className="text-[14px] text-muted mb-6 max-w-[70ch]">
        Real client photos and reels for the homepage proof wall. Upload as many as you like, one at a
        time or in bulk — each needs a business name and industry so it can be captioned.
      </p>

      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
        className={`rounded-[16px] border-2 border-dashed p-6 text-center transition-colors mb-6 ${
          dragOver ? 'border-gold bg-gold/[0.06]' : 'border-rule-2'
        }`}
      >
        <input ref={inputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={e => addFiles(e.target.files)} />
        <UploadCloud size={20} className="mx-auto mb-2.5 text-faint" />
        <p className="text-[14px] text-ink-2 mb-3">Drop photos or reels here, or pick files — any number at once</p>
        <button
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-rule-2 rounded-full px-4 py-2 hover:border-gold transition"
        >
          Choose files
        </button>
      </div>

      {pending.length > 0 && (
        <div className="flex flex-col gap-3 mb-8">
          {pending.map((item, i) => (
            <div key={item.previewUrl} className="flex items-center gap-4 rounded-[12px] border border-rule bg-surface p-3.5">
              {item.file.type.startsWith('video') ? (
                <video src={item.previewUrl} className="w-16 h-16 rounded-[8px] object-cover flex-shrink-0" muted />
              ) : (
                <img src={item.previewUrl} alt="" className="w-16 h-16 rounded-[8px] object-cover flex-shrink-0" />
              )}
              <input
                type="text"
                placeholder="Business name"
                value={item.business}
                onChange={e => updatePending(i, 'business', e.target.value)}
                className="flex-1 min-w-0 bg-surface-2 border border-rule rounded-lg px-3 py-2 text-[13.5px] outline-none focus:border-gold"
              />
              <input
                type="text"
                placeholder="Industry (e.g. Jewellery)"
                value={item.industry}
                onChange={e => updatePending(i, 'industry', e.target.value)}
                className="flex-1 min-w-0 bg-surface-2 border border-rule rounded-lg px-3 py-2 text-[13.5px] outline-none focus:border-gold"
              />
              <button onClick={() => removePending(i)} className="flex-shrink-0 text-faint hover:text-red-400 transition-colors">
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={uploadAll}
            disabled={busy || readyCount === 0}
            className="self-start inline-flex items-center gap-1.5 text-[13px] font-semibold bg-gold text-[#1A1208] rounded-full px-5 py-2.5 hover:brightness-110 transition disabled:opacity-50"
          >
            <Upload size={13} /> {busy ? 'Uploading…' : `Upload ${readyCount} of ${pending.length}`}
          </button>
          {readyCount < pending.length && (
            <p className="text-[12.5px] text-faint">
              Files missing a business name or industry are skipped until filled in.
            </p>
          )}
        </div>
      )}

      {items === null ? (
        <p className="text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-[13.5px] text-faint">No gallery items yet — uploads above will appear here and on the homepage.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.key} className="rounded-[12px] border border-rule bg-surface overflow-hidden">
              {item.kind === 'video' ? (
                <video src={item.url} className="w-full h-32 object-cover" muted loop autoPlay playsInline />
              ) : (
                <img src={item.url} alt={item.business} className="w-full h-32 object-cover" />
              )}
              <div className="p-3">
                <p className="text-[13.5px] font-semibold text-ink truncate">{item.business}</p>
                <p className="text-[12px] text-faint mb-2.5">{item.industry}</p>
                <button
                  onClick={() => deleteItem(item.key)}
                  className="inline-flex items-center gap-1 text-[12px] text-red-400 hover:underline"
                >
                  <Trash2 size={11} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
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
      <p className="text-[15px] leading-[1.65] text-muted max-w-[68ch] mb-8">
        Upload replaces the live asset immediately — no deploy needed. Files go straight to storage from
        your browser.
      </p>

      <BulkSlotDrop secret={secret} onChanged={refresh} />

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

      <GalleryManager secret={secret} />
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
