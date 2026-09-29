'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Plus, X, Loader2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { parseGalleryKeys, buildGalleryKey, type GalleryItem } from '@/lib/gallery'
import { useEditMode, uploadMedia, deleteMedia, MEDIA_UPDATED_EVENT } from '@/lib/mediaEdit'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const PASTELS = ['bg-peach', 'bg-mint', 'bg-sky', 'bg-lav']
const PLACEHOLDERS = ['Hotels & stays', 'Jewellery', 'Textiles', 'Restaurants', 'Clinics', 'Real estate', 'Retail', 'Salons']

/**
 * Proof before explanation: a row of real client posts and reels in phone
 * frames. Uploaded through the gallery in /admin/media, no deploy needed;
 * until then the soft placeholders hold the space.
 */
export default function WorkWall() {
  const [items, setItems] = useState<GalleryItem[] | null>(null)
  const { editing, secret } = useEditMode()
  const [business, setBusiness] = useState('')
  const [industry, setIndustry] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = () =>
      getMediaManifest().then(keys => {
        if (!cancelled) setItems(parseGalleryKeys(Array.from(keys)))
      })
    load()
    window.addEventListener(MEDIA_UPDATED_EVENT, load)
    return () => {
      cancelled = true
      window.removeEventListener(MEDIA_UPDATED_EVENT, load)
    }
  }, [])

  const addFiles = async (files: FileList | File[] | null | undefined) => {
    if (!files || !secret) return
    if (!business.trim() || !industry.trim()) {
      setError('Type the business name and industry first, then choose the file.')
      return
    }
    setBusy(true)
    setError('')
    try {
      for (const file of Array.from(files)) {
        await uploadMedia(file, buildGalleryKey(business, industry, file.name), secret)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }
    setBusy(false)
  }

  const hasItems = items !== null && items.length > 0

  return (
    <section className="py-[72px] md:py-[96px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="px-5 md:px-12 lg:px-[120px] mb-9 max-w-[760px]"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Real work, real businesses</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[36px] md:text-[54px]">
          This is what your page <span className="text-gold-display">could look like.</span>
        </motion.h2>
      </motion.div>

      {editing && (
        <div className="mx-5 md:mx-12 lg:mx-[120px] mb-6 rounded-[20px] border-2 border-dashed border-coral bg-white/60 p-5">
          <p className="text-[14px] font-bold mb-3 flex items-center gap-2"><Plus size={16} /> Add real work: type who it is for, then drop the photos or reels</p>
          <div className="flex flex-wrap gap-3 mb-3">
            <input value={business} onChange={e => setBusiness(e.target.value)} placeholder="Business name" className="flex-1 min-w-[180px] rounded-lg border border-rule-2 bg-surface px-3 py-2 text-[14px] outline-none focus:border-gold" />
            <input value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Industry, e.g. Jewellery" className="flex-1 min-w-[180px] rounded-lg border border-rule-2 bg-surface px-3 py-2 text-[14px] outline-none focus:border-gold" />
          </div>
          <label
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-rule-2 px-4 py-4 text-[13.5px] font-semibold ${dragOver ? 'bg-sun/40' : 'bg-surface'}`}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {busy ? 'Uploading…' : 'Click or drop photos and reels here'}
            <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={e => addFiles(e.target.files)} />
          </label>
          {error && <p className="mt-2 text-[12.5px] font-semibold text-red-700">{error}</p>}
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4 px-5 md:px-12 lg:px-[120px] scroll-pl-5 md:scroll-pl-12 lg:scroll-pl-[120px] snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hasItems
          ? items!.map(item => (
              <div key={item.key} className="snap-start flex-shrink-0 w-[190px] sm:w-[210px]">
                <div className="group relative aspect-[9/16] rounded-[22px] overflow-hidden border-[5px] border-ink bg-ink shadow-[0_14px_34px_rgba(20,32,58,0.18)]">
                  {editing && secret && (
                    <button
                      type="button"
                      onClick={() => deleteMedia(item.key, secret)}
                      className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-700 shadow"
                      aria-label={`Remove ${item.business}`}
                    >
                      <X size={16} />
                    </button>
                  )}
                  {item.kind === 'video' ? (
                    <video src={item.url} className="absolute inset-0 w-full h-full object-cover" muted loop autoPlay playsInline />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.business} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                <p className="mt-3 text-[13.5px] font-bold text-ink truncate">{item.business}</p>
                <p className="text-[12px] text-muted">{item.industry}</p>
              </div>
            ))
          : PLACEHOLDERS.map((label, i) => (
              <div key={label} className="snap-start flex-shrink-0 w-[190px] sm:w-[210px]">
                <div className={`aspect-[9/16] rounded-[22px] border-[5px] border-ink/15 ${PASTELS[i % 4]} flex flex-col items-center justify-center gap-2 px-4 text-center`}>
                  <ImageIcon size={22} className="text-coral-text" />
                  <span className="text-[12px] font-bold text-ink-2">A client&apos;s real post or reel</span>
                </div>
                <p className="mt-3 text-[13.5px] font-bold text-ink-2">{label}</p>
                <p className="text-[12px] text-muted">Add in /admin/media</p>
              </div>
            ))}
      </div>
    </section>
  )
}
