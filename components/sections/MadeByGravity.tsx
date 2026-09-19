'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { galleryItems, type GalleryItem } from '@/lib/galleryData'

/** One metadata row. Renders nothing when the fact is unknown. */
function Meta({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between gap-3 py-[5px]">
      <span className="neb-label flex-shrink-0">{label}</span>
      <span className="font-body text-[12.5px] text-ink-2 text-right">{value}</span>
    </div>
  )
}

/**
 * An entry in the archive rather than a portfolio tile: the output itself
 * leads, and the metadata underneath says which engine made it, what it was
 * for and what happened next. That context is the difference between "look
 * what we made" and evidence that a system decided and then learned.
 */
function GalleryCard({ item }: { item: GalleryItem }) {
  const displayName = item.brand ?? item.industryLabel
  const hasMeta = Boolean(item.objective || item.format || item.outcome)

  return (
    <motion.div variants={fadeUpVariant}>
      <HudCard
        label={item.engine ? `${item.engine} // ${item.platform}` : item.platform}
        status={item.status ? { tone: 'active', label: item.status } : undefined}
        className="min-h-[280px] h-full"
      >
        {/* The output is the hero */}
        {item.image ? (
          <div className="relative h-[180px] rounded-[10px] overflow-hidden mb-4">
            <Image
              src={item.image}
              alt={`${displayName} post on ${item.platform}`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <p className="font-body text-[15px] leading-[1.68] text-ink-2 mb-4">{item.post}</p>
        )}

        {hasMeta && (
          <div className="border-t border-rule pt-2.5">
            <Meta label="Brand" value={item.brand ?? undefined} />
            <Meta label="Objective" value={item.objective} />
            <Meta label="Format" value={item.format} />
            <Meta label="Outcome" value={item.outcome} />
          </div>
        )}
      </HudCard>
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
          className="neb-display text-[34px] md:text-[50px] mb-[26px]"
        >
          Every post below went out on a real client&apos;s account.
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
        {/* Only real outputs. An empty slot used to render as a dashed
            placeholder tile; a half-filled grid of "awaiting export" cards
            reads as an unfinished page rather than as restraint. */}
        {populated.map((item, i) => (
          <GalleryCard key={i} item={item} />
        ))}
      </motion.div>
    </section>
  )
}
