'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter, Mail, MessageSquare, Check, MapPin, Building2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { ANNUAL_DISCOUNT } from '@/lib/orgFacts'

const gravityChannels = [Linkedin, Instagram, Twitter]
const pulsarChannels = [WhatsAppIcon, Mail, MessageSquare]
const orbitChannels = [MapPin, Building2]

const replaces = [
  { item: 'A marketing hire', cost: '₹30,000–50,000/mo' },
  { item: 'A designer for creatives', cost: '₹12,000–20,000/mo' },
  { item: 'Scheduling & content tools', cost: '₹3,000–5,000/mo' },
  { item: 'WhatsApp Business API / CRM', cost: '₹5,000–10,000/mo' },
  { item: 'Someone to answer leads fast', cost: '₹8,000–12,000/mo' },
  { item: 'Weeks spent interviewing', cost: '4–6 weeks, before they start' },
]

// The other half of the same comparison — asserting a total without
// itemising our side is only doing half the arithmetic for the reader.
const included = [
  'Strategy and ICP, built from your URL',
  'A month of content planned and drafted',
  'Posts, carousels and AI reels',
  'Competitor tracking and counter-content',
  'WhatsApp, email and SMS handled',
  'Live on Thursday, not in six weeks',
]

interface Plan {
  name: string
  label: string
  tagline: string
  monthly: number
  description: string
  channels: React.ElementType[]
  features: string[]
  cta: string
  highlight: boolean
}

const plans: Plan[] = [
  {
    name: 'Gravity',
    label: 'Gravity',
    tagline: 'AI Marketing Agent',
    monthly: 10000,
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
    name: 'Orbit',
    label: 'Orbit',
    tagline: 'AI Lead Sourcing Agent',
    monthly: 12000,
    description: 'Real businesses, qualified and ready to work.',
    channels: orbitChannels,
    features: [
      'Sources leads from Google Maps + a second source',
      'Keeps only phone-reachable, rated 4.2+',
      'Enriches contact emails from their website',
      'Drafts the first outreach message',
      'Pushes qualified leads into your CRM',
      'Round-robin assignment across reps',
      '7-day free trial',
    ],
    cta: 'Start with Orbit',
    highlight: false,
  },
  {
    name: 'Pulsar',
    label: 'Pulsar',
    tagline: 'AI Outreach Agent',
    monthly: 15000,
    description: 'Every enquiry, answered.',
    channels: pulsarChannels,
    features: [
      'WhatsApp, email & SMS',
      'Lead scoring',
      'Unlimited contacts',
      'CRM-ready exports',
      '7-day free trial',
    ],
    cta: 'Start with Pulsar',
    highlight: false,
  },
  {
    name: 'All Three Agents',
    label: 'All three agents · best value',
    tagline: 'Sourcing + Marketing + Outreach',
    monthly: 28000,
    description: 'The whole loop — leads found, content made, customers engaged. ₹9,000 less than buying separately.',
    channels: [...orbitChannels, ...gravityChannels, ...pulsarChannels],
    features: [
      'Orbit, Gravity and Pulsar on one account',
      'One shared brand memory across all three',
      'Leads sourced, qualified and handed to outreach',
      'Content planned, drafted and published',
      'WhatsApp, email & SMS outreach',
      'Priority onboarding',
      'Save ₹9,000/month vs separate',
    ],
    cta: 'Start with all three →',
    highlight: true,
  },
]

function priceFor(monthly: number, annual: boolean) {
  if (!annual) return { display: monthly, suffix: '/month' }
  const discounted = Math.round(monthly * (1 - ANNUAL_DISCOUNT))
  return { display: discounted, suffix: '/month, billed annually' }
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[620px] mb-[46px]"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-[22px] block">Pricing</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="font-heading font-medium text-[34px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] mb-5">
          Cheaper than the hire. <span className="italic text-gold-text">Faster than the agency.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-muted">
          A marketing executive costs ₹30,000–50,000 a month, plus tools, plus six weeks of interviews, plus the morning they hand in their notice. This starts working on Thursday.
        </motion.p>
      </motion.div>

      {/* Monthly / annual toggle */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="flex items-center gap-4 mb-[52px]"
      >
        <div className="hud-card inline-flex items-center rounded-full p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-colors ${
              !annual ? 'bg-gold text-[#1A1208]' : 'text-muted hover:text-ink-2'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-colors ${
              annual ? 'bg-gold text-[#1A1208]' : 'text-muted hover:text-ink-2'
            }`}
          >
            Annual
          </button>
        </div>
        <span className="font-mono text-[12px] text-gold-text tracking-wide">
          {Math.round(ANNUAL_DISCOUNT * 100)}% OFF, BILLED ANNUALLY
        </span>
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
          <span className="font-heading text-[20px] md:text-[22px] font-medium text-muted tabular-nums">₹58,000–97,000+/mo</span>
        </div>

        {/* Our side of the ledger, itemised the same way */}
        <div className="px-6 md:px-9 pt-7 pb-5 border-t border-gold/[0.18] bg-gold/[0.05]">
          <div className="neb-label neb-label-gold">What you get instead</div>
        </div>
        <div className="px-6 md:px-9 bg-gold/[0.05]">
          {included.map(item => (
            <div key={item} className="flex items-center gap-3 py-3.5 border-t border-gold/[0.14]">
              <Check size={15} className="text-gold-text flex-shrink-0" />
              <span className="font-body text-[14.5px] text-ink-2">{item}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 px-6 md:px-9 py-6 border-t border-gold/[0.18] bg-gold/[0.09]">
          <span className="font-heading text-[20px] md:text-[22px] font-medium text-gold-text">With Nebulaa</span>
          <span className="font-heading text-[24px] md:text-[26px] font-medium text-gold-text tabular-nums">From ₹{priceFor(10000, annual).display.toLocaleString('en-IN')}/mo</span>
        </div>
      </motion.div>

      {/* 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {plans.map((plan, i) => {
          const { display, suffix } = priceFor(plan.monthly, annual)
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-surface rounded-[20px] p-6 md:p-8 ${
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
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-digital text-[38px] tracking-[-0.02em] leading-none">₹{display.toLocaleString('en-IN')}</span>
              </div>
              <p className="font-mono text-[11px] text-faint mb-2.5">{suffix}</p>
              {annual && (
                <p className="font-body text-[12.5px] text-gold-text mb-2.5">
                  ₹{(display * 12).toLocaleString('en-IN')}/year, billed upfront
                </p>
              )}
              <p className="font-body text-[14.5px] leading-[1.6] text-muted mb-5">{plan.description}</p>

              <div className="flex items-center gap-3 mb-[30px]">
                {plan.channels.map((Icon, ci) => (
                  <span key={ci} className="w-7 h-7 rounded-full bg-surface-2 border border-rule flex items-center justify-center text-muted">
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
          )
        })}
      </div>
    </section>
  )
}
