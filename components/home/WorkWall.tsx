'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { getMediaManifest } from '@/lib/mediaManifestClient'
import { parseGalleryKeys, type GalleryItem } from '@/lib/gallery'
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

  useEffect(() => {
    let cancelled = false
    getMediaManifest().then(keys => {
      if (!cancelled) setItems(parseGalleryKeys(Array.from(keys)))
    })
    return () => { cancelled = true }
  }, [])

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

      <div className="flex gap-4 overflow-x-auto pb-4 px-5 md:px-12 lg:px-[120px] scroll-pl-5 md:scroll-pl-12 lg:scroll-pl-[120px] snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {hasItems
          ? items!.map(item => (
              <div key={item.key} className="snap-start flex-shrink-0 w-[190px] sm:w-[210px]">
                <div className="relative aspect-[9/16] rounded-[22px] overflow-hidden border-[5px] border-ink bg-ink shadow-[0_14px_34px_rgba(20,32,58,0.18)]">
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
