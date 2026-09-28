'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { parseGalleryKeys, type GalleryItem } from '@/lib/gallery'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const PLACEHOLDER_COUNT = 10

/**
 * The homepage's real-proof wall — a dense row of actual client photos and
 * reels, not product diagrams. Uploaded via /admin/media's gallery section
 * with no deploy needed, so this fills in over time; until then it shows
 * clearly-labelled placeholders rather than hiding the section or shipping
 * an empty shelf, matching the placeholder convention MediaSlot already
 * uses elsewhere on the site.
 */
export default function ClientGallery() {
  const [items, setItems] = useState<GalleryItem[] | null>(null)

  useEffect(() => {
    let cancelled = false
    getMediaManifest().then(keys => {
      if (!cancelled) setItems(parseGalleryKeys(Array.from(keys)))
    })
    return () => { cancelled = true }
  }, [])

  const hasItems = items !== null && items.length > 0

  return (
    <section className="py-[90px] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="px-6 md:px-12 lg:px-[120px] mb-[42px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[18px] block">Real work, live right now</SectionLabel>
        </motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[28px] md:text-[40px] max-w-[720px]">
          <span className="text-gold-display">Real Indian businesses</span> running on Nebulaa.
        </motion.h2>
      </motion.div>

      <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 lg:px-[120px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hasItems
          ? items!.map(item => <GalleryCard key={item.key} item={item} />)
          : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => <PlaceholderCard key={i} />)}
      </div>
    </section>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="flex-shrink-0 w-[220px] rounded-[16px] overflow-hidden border border-rule bg-surface">
      <div className="relative w-full aspect-[9/16] bg-surface-2">
        {item.kind === 'video' ? (
          <video
            src={item.url}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt={item.business} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-gold-text mb-1">{item.industry}</p>
        <p className="text-[13px] text-ink-2 truncate">{item.business}</p>
      </div>
    </div>
  )
}

function PlaceholderCard() {
  return (
    <div className="flex-shrink-0 w-[220px] rounded-[16px] overflow-hidden border border-dashed border-rule-2 bg-surface/40">
      <div className="relative w-full aspect-[9/16] flex flex-col items-center justify-center gap-2.5">
        <ImageIcon size={20} className="text-faint" />
        <span className="text-[11px] text-faint text-center px-4">Client work — added via /admin/media</span>
      </div>
    </div>
  )
}
