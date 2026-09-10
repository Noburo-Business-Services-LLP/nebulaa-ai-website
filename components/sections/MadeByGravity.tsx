'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { galleryItems, type GalleryItem } from '@/lib/galleryData'

function GalleryCard({ item }: { item: GalleryItem }) {
  const isPopulated = Boolean(item.post || item.image)
  const displayName = item.brand ?? item.industryLabel

  return (
    <motion.div
      variants={fadeUpVariant}
      className={`min-h-[280px] rounded-[18px] p-6 flex flex-col ${
        isPopulated
          ? 'bg-surface border border-rule'
          : 'bg-transparent border border-dashed border-rule-2'
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <SectionLabel tone="muted">{item.platform}</SectionLabel>
        {isPopulated && (
          <span className="font-body text-[13px] text-muted">{displayName}</span>
        )}
      </div>

      {isPopulated ? (
        <div className="flex-1 flex flex-col">
          {item.image ? (
            <div className="relative flex-1 rounded-[12px] overflow-hidden mb-4">
              <Image src={item.image} alt={`${displayName} post on ${item.platform}`} fill className="object-cover" />
            </div>
          ) : (
            <p className="font-body text-[15px] leading-[1.68] text-ink-2 flex-1">{item.post}</p>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between">
          <SectionLabel tone="muted">{item.industryLabel}</SectionLabel>
          <p className="font-body text-[14px] italic leading-[1.6] text-faint">
            [Real post — awaiting export]
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function MadeByGravity() {
  const populated = galleryItems.filter((i) => i.post || i.image)
  if (populated.length === 0) return null

  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[640px] mb-[78px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">Made by Gravity</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="font-heading text-[34px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium mb-[26px]"
        >
          Not mockups. <span className="italic text-gold-text">Actual posts, actually published.</span>
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="font-body text-[17px] leading-[1.68] text-muted max-w-[480px]"
        >
          Every post below was written by Gravity for a real client and went out on their channels.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {galleryItems.map((item, i) => (
          <GalleryCard key={i} item={item} />
        ))}
      </motion.div>
    </section>
  )
}
