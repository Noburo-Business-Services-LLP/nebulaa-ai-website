'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PenLine, Users, MessageCircle } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const CARDS = [
  {
    slot: 'demo-content',
    href: '/product/gravity',
    icon: PenLine,
    chip: 'bg-peach',
    title: 'Your page never goes quiet',
    body: 'Posts, photos and offers go out on their own, all month.',
  },
  {
    slot: 'demo-leads',
    href: '/product/orbit',
    icon: Users,
    chip: 'bg-sky',
    title: 'New customers get found',
    body: 'We find nearby businesses who might buy from you and reach out.',
  },
  {
    slot: 'demo-replies',
    href: '/product/pulsar',
    icon: MessageCircle,
    chip: 'bg-mint',
    title: 'Nobody waits for a reply',
    body: 'WhatsApp and email get answered in minutes, any hour.',
  },
]

/** Each card is led by a looping screen recording; the text just names what you're watching. */
export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[720px] mb-11"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">What you get</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[36px] md:text-[54px]">
          Three things you stop <span className="text-gold-display">worrying about.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid sm:grid-cols-3 gap-6"
      >
        {CARDS.map(c => (
          <motion.div key={c.slot} variants={fadeUpVariant}>
            <Link href={c.href} className="group block">
              <div className="rounded-[24px] overflow-hidden border border-rule shadow-[0_14px_34px_rgba(20,32,58,0.08)] mb-5">
                <MediaSlot id={c.slot} ratio="4 / 5" compact />
              </div>
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-10 h-10 rounded-full ${c.chip} flex items-center justify-center`}>
                  <c.icon size={18} className="text-ink" />
                </span>
                <div>
                  <h3 className="font-heading text-[19px] leading-[1.25] mb-1 group-hover:text-coral-text transition-colors">{c.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-ink-2">{c.body}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
