'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Smartphone, Users } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/contact'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

/** The one real decision a visitor makes, shown as two plain choices. */
export default function Fork() {
  return (
    <section className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[720px] mb-11"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Two ways to start</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[36px] md:text-[54px]">
          Do it yourself, or <span className="text-gold-display">let our team do it.</span>
        </motion.h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-[26px] bg-peach p-7 md:p-9">
          <span className="inline-flex w-12 h-12 rounded-full bg-surface items-center justify-center mb-6"><Smartphone size={22} className="text-ink" /></span>
          <h3 className="font-heading text-[26px] leading-[1.15] mb-3">Use the app yourself</h3>
          <p className="text-[15.5px] leading-[1.6] text-ink-2 mb-6">Set it up in an afternoon, approve the week&apos;s posts from your phone in about nine minutes, and stop any month.</p>
          <p className="font-digital text-[34px] uppercase mb-6">From ₹999<span className="text-[18px] text-ink-2"> / month</span></p>
          <Button href="#pricing" variant="primary">See the plans</Button>
        </div>
        <div className="rounded-[26px] bg-mint p-7 md:p-9">
          <span className="inline-flex w-12 h-12 rounded-full bg-surface items-center justify-center mb-6"><Users size={22} className="text-ink" /></span>
          <h3 className="font-heading text-[26px] leading-[1.15] mb-3">Let the Nebulaa team run it</h3>
          <p className="text-[15.5px] leading-[1.6] text-ink-2 mb-6">We plan, shoot, post and follow up for you. You approve the work and never need to log in.</p>
          <p className="font-digital text-[34px] uppercase mb-6">Quoted <span className="text-[18px] text-ink-2">for your business</span></p>
          <Button href={waLink('Hi, I would like the Nebulaa team to run my marketing.')} variant="whatsapp">
            <WhatsAppIcon size={16} /> Talk to us
          </Button>
          <Link href="/services" className="ml-4 text-[14.5px] font-semibold underline underline-offset-4 decoration-ink/30 hover:decoration-ink">See what we do</Link>
        </div>
      </div>
    </section>
  )
}
