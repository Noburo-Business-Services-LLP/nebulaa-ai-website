'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { tools } from '@/lib/toolsData'

const FEATURED_SLUGS = [
  'linkedin-post-generator',
  'cold-email-generator',
  'icp-builder',
  'lead-qualification-calculator',
]

const featured = FEATURED_SLUGS
  .map((slug) => tools.find((t) => t.slug === slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t))

export default function ToolsTeaser() {
  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-[54px]"
      >
        <div className="max-w-[620px]">
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[22px] block">Free tools</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-[50px] leading-[1.12] tracking-[-0.02em] font-medium mb-5"
          >
            Take thirty tools. <span className="italic text-brand-gold">Pay nothing. Ever.</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="font-body text-[17px] leading-[1.68] text-white/55"
          >
            Every one of them runs on the same model that writes for Gravity. No signup, no card, no drip campaign afterwards. If they&apos;re all you ever need from us, that&apos;s a perfectly good outcome.
          </motion.p>
        </div>
        <motion.div variants={fadeUpVariant} className="flex-shrink-0 pb-1.5">
          <Link href="/tools" className="font-body text-[15px] text-brand-gold hover:underline">
            Browse all 30+ →
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {featured.map((tool) => (
          <motion.div key={tool.slug} variants={fadeUpVariant}>
            <Link
              href={`/tools/${tool.slug}`}
              className="block bg-[#151515] border border-white/[0.06] rounded-2xl px-6 py-[26px] h-full transition-colors hover:border-white/[0.14]"
            >
              <div className="font-body text-[15.5px] font-medium mb-2">{tool.name}</div>
              <div className="font-body text-[13.5px] leading-[1.55] text-white/45">{tool.tagline}</div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
