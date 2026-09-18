'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const cards = [
  {
    label: 'The software',
    labelGold: false,
    title: "I'll run it myself",
    body: "Set it up in an afternoon, approve the week's posts from your phone in about nine minutes, and cancel whenever it stops being worth the cost.",
    metaPrimary: 'From ₹15,000/month',
    metaSecondary: '7-day trial, no card',
    cta: 'See pricing',
    href: '#pricing',
    goldBorder: false,
    goldCta: true,
  },
  {
    label: 'The team',
    labelGold: true,
    title: 'Someone else runs it',
    body: 'Our team plans, writes, ships and follows up, using the same engines to carry the volume — which is why our pricing comes in under a typical agency quote. You approve the work; you never need to log in.',
    metaPrimary: 'Managed marketing engagements',
    metaSecondary: 'Scoped per business',
    cta: 'Talk to us',
    href: '/services',
    goldBorder: true,
    goldCta: false,
  },
]

export default function EntryFork() {
  return (
    <section className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[660px] mb-[62px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">Two ways in</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="neb-display text-[34px] md:text-[50px] mb-5"
        >
          Who should be running this — <span className="text-gold-display">you, or us?</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-muted">
          Same engines underneath. The only question is whose evening it takes.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {cards.map((card) => (
          <motion.div
            key={card.label}
            variants={fadeUpVariant}
            className={`bg-surface rounded-[20px] pt-[46px] px-6 md:px-[42px] pb-11 ${
              card.goldBorder
                ? 'border border-gold/[0.18] shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07)]'
                : 'border border-rule'
            }`}
          >
            <SectionLabel tone={card.labelGold ? 'gold' : 'muted'} className="mb-[26px] block">
              {card.label}
            </SectionLabel>
            <h3 className="font-heading text-[32px] font-medium tracking-[-0.015em] mb-4">{card.title}</h3>
            <p className="font-body text-[15.5px] leading-[1.68] text-muted mb-[30px]">{card.body}</p>
            <div className="flex flex-col gap-3 mb-[34px]">
              <div className="text-[14.5px] text-ink-2">{card.metaPrimary}</div>
              <div className="text-[14.5px] text-muted">{card.metaSecondary}</div>
            </div>
            <Link
              href={card.href}
              className={`inline-block text-[14.5px] font-semibold px-[26px] py-[15px] rounded-full transition-colors ${
                card.goldCta
                  ? 'bg-gold text-[#1A1208] hover:bg-gold-dim'
                  : 'border border-rule-2 text-ink-2 hover:border-gold hover:text-gold-text'
              }`}
            >
              {card.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
