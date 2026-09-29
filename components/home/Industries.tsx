'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const TILES = [
  { slot: 'industry-hospitality', name: 'Hotels & stays', href: '/for/hospitality' },
  { slot: 'industry-jewellery', name: 'Jewellery & retail', href: '/for/jewellery-retail' },
  { slot: 'industry-textile', name: 'Textiles & apparel', href: '/for/textile-apparel' },
  { slot: 'industry-food', name: 'Food & FMCG', href: '/for/fmcg-food' },
  { slot: 'industry-financial', name: 'Financial services', href: '/for/financial-services' },
  { slot: 'industry-realestate', name: 'Real estate', href: '/for/real-estate' },
]

/** Each tile opens a page written for that owner, which is also where that industry's ads land. */
export default function Industries() {
  return (
    <section className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[720px] mb-11"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Built for your business</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[36px] md:text-[54px]">
          Made for the way <span className="text-gold-display">you sell.</span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {TILES.map((t, i) => (
          <motion.div
            key={t.slot}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ delay: (i % 3) * 0.08 }}
          >
            <Link href={t.href} className="group relative block rounded-[22px] overflow-hidden border border-rule">
              <MediaSlot id={t.slot} ratio="4 / 3" compact />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent">
                <span className="flex items-center justify-between gap-2 text-ground font-heading text-[16px] md:text-[19px]">
                  {t.name}
                  <ArrowUpRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
