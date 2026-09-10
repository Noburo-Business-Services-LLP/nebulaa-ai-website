'use client'

import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter, Mail, MessageSquare } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const gravityChannels = [Linkedin, Instagram, Twitter]
const pulsarChannels = [WhatsAppIcon, Mail, MessageSquare]

const replaces = [
  { item: 'A marketing hire', cost: '₹30,000–50,000/mo' },
  { item: 'A designer for creatives', cost: '₹12,000–20,000/mo' },
  { item: 'Scheduling & content tools', cost: '₹3,000–5,000/mo' },
  { item: 'WhatsApp Business API / CRM', cost: '₹5,000–10,000/mo' },
  { item: 'Someone to answer leads fast', cost: '₹8,000–12,000/mo' },
  { item: 'Weeks spent interviewing', cost: '4–6 weeks, before they start' },
]

const plans = [
  {
    name: 'Gravity',
    label: 'Gravity',
    tagline: 'AI Marketing Agent',
    price: '₹10,000',
    description: 'A strategy, then a month of content to run it.',
    channels: gravityChannels,
    features: [
      'Marketing strategy & ICP, built in',
      'Monthly content plan, auto-generated',
      'Posts, carousels & AI reels',
      'Competitor tracking → counter-content',
      'Learns your brand over time',
      'LinkedIn, Instagram & X',
      '7-day free trial',
    ],
    cta: 'Start with Gravity',
    highlight: false,
  },
  {
    name: 'Both Agents',
    label: 'Both agents · best value',
    tagline: 'Marketing + Outreach',
    price: '₹20,000',
    description: 'The whole loop — content in, customers out. ₹5,000 less than buying the two separately.',
    channels: [...gravityChannels, ...pulsarChannels],
    features: [
      'Strategy, monthly plan & content — Gravity',
      'WhatsApp, email & SMS outreach — Pulsar',
      'Posts, carousels & AI reels',
      'Competitor tracking → counter-content',
      'Lead scoring & qualification',
      'Priority onboarding',
      'Save ₹5,000/month vs separate',
    ],
    cta: 'Start with Both →',
    highlight: true,
  },
  {
    name: 'Pulsar',
    label: 'Pulsar',
    tagline: 'AI Outreach Agent',
    price: '₹15,000',
    description: 'Every enquiry, answered.',
    channels: pulsarChannels,
    features: [
      'WhatsApp, email & SMS',
      'Lead scoring',
      'Unlimited contacts',
      'CRM-ready exports',
    ],
    cta: 'Start with Pulsar',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[620px] mb-[62px]"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-[22px] block">Pricing</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="font-heading font-medium text-[34px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] mb-5">
          Cheaper than the hire. <span className="italic text-gold-text">Faster than the agency.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-muted">
          A marketing executive costs ₹30,000–50,000 a month, plus tools, plus six weeks of interviews, plus the morning they hand in their notice. This starts working on Thursday.
        </motion.p>
      </motion.div>

      {/* Itemized cost comparison — do the arithmetic for the reader, not just assert the conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOptions}
        transition={{ duration: 0.6 }}
        className="bg-surface border border-rule rounded-[20px] overflow-hidden mb-[62px]"
      >
        <div className="px-6 md:px-9 pt-7 pb-5">
          <div className="neb-label">What you&apos;d otherwise be paying for</div>
        </div>
        <div className="px-6 md:px-9">
          {replaces.map(row => (
            <div key={row.item} className="flex items-center justify-between gap-4 py-4 border-t border-rule">
              <span className="font-body text-[14.5px] text-ink-2">{row.item}</span>
              <span className="font-body text-[14.5px] text-muted text-right">{row.cost}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 px-6 md:px-9 py-6 border-t border-rule-2 bg-surface-2">
          <span className="font-heading text-[20px] md:text-[22px] font-medium">Doing it yourself</span>
          <span className="font-heading text-[20px] md:text-[22px] font-medium text-muted">₹58,000–97,000+/mo</span>
        </div>
        <div className="flex items-center justify-between gap-4 px-6 md:px-9 py-6 border-t border-gold/[0.18] bg-gold/[0.06]">
          <span className="font-heading text-[20px] md:text-[22px] font-medium text-gold-text">With Nebulaa</span>
          <span className="font-heading text-[24px] md:text-[26px] font-medium text-gold-text">From ₹10,000/mo</span>
        </div>
      </motion.div>

      {/* 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative bg-surface rounded-[20px] p-6 md:p-10 ${
              plan.highlight
                ? 'border border-gold/[0.22] shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07),0_18px_60px_rgba(245,166,35,0.07)]'
                : 'border border-rule'
            }`}
          >
            {/* Header */}
            <SectionLabel tone={plan.highlight ? 'gold' : 'muted'} className="mb-5 block">
              {plan.label}
            </SectionLabel>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2.5">
              <span className="font-heading text-[46px] tracking-[-0.02em] leading-none">{plan.price}</span>
              <span className="font-body text-sm text-faint">/month</span>
            </div>
            <p className="font-body text-[14.5px] leading-[1.6] text-muted mb-5">{plan.description}</p>

            <div className="flex items-center gap-3 mb-[30px]">
              {plan.channels.map((Icon, i) => (
                <span key={i} className="w-7 h-7 rounded-full bg-surface-2 border border-rule flex items-center justify-center text-muted">
                  <Icon size={13.5} />
                </span>
              ))}
            </div>

            <hr className="border-t border-rule mb-[26px]" />

            {/* Features */}
            <div className="flex flex-col gap-[13px] mb-9">
              {plan.features.map(f => (
                <div key={f} className="font-body text-[14.5px] text-ink-2">{f}</div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className={`w-full text-center font-body font-semibold text-[14.5px] rounded-full py-[15px] block transition-all hover:scale-[1.02] active:scale-[0.98] ${
                plan.highlight
                  ? 'bg-gold text-[#1A1208] shadow-[0_6px_22px_rgba(245,166,35,0.22)]'
                  : 'border border-rule-2 text-ink-2 hover:border-gold hover:text-gold-text'
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
