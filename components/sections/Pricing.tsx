'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Twitter, Mail, MessageSquare, Check, MapPin, Building2 } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import StatusIndicator from '@/components/ui/StatusIndicator'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { ANNUAL_DISCOUNT } from '@/lib/orgFacts'

const gravityChannels = [Linkedin, Instagram, Twitter]
const pulsarChannels = [WhatsAppIcon, Mail, MessageSquare]
const orbitChannels = [MapPin, Building2]

// One line per agent this replaces, not just the content/response half of
// it — the total is compared against the three-agent bundle (see priceFor
// calls below), so leaving out lead sourcing entirely would understate
// what "doing it yourself" actually costs and overstate the multiple.
const replaces = [
  { item: 'A marketing hire', cost: '₹30,000–50,000/mo' },
  { item: 'A designer for creatives', cost: '₹12,000–20,000/mo' },
  { item: 'Scheduling & content tools', cost: '₹3,000–5,000/mo' },
  { item: 'An SDR to source leads', cost: '₹25,000–40,000/mo' },
  { item: 'WhatsApp Business API / CRM', cost: '₹5,000–10,000/mo' },
  { item: 'Someone to answer leads fast', cost: '₹8,000–12,000/mo' },
  { item: 'Weeks spent interviewing', cost: '4–6 weeks, before they start' },
]

// The other half of the same comparison — asserting a total without
// itemising our side is only doing half the arithmetic for the reader.
// One line per agent, matching the three roles `replaces` covers above.
const included = [
  'Strategy and ICP, built from your URL',
  'A month of content planned and drafted',
  'Posts, carousels and AI reels',
  'Competitor tracking and counter-content',
  'Leads sourced, qualified and CRM-ready',
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
    monthly: 15000,
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
    monthly: 15000,
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
    label: 'All three engines · best value',
    tagline: 'Sourcing + Marketing + Outreach',
    monthly: 30000,
    description: 'The whole loop — leads found, content made, customers engaged. Cheaper than buying separately.',
    channels: [...orbitChannels, ...gravityChannels, ...pulsarChannels],
    features: [
      'Orbit, Gravity and Pulsar on one account',
      'One shared brand memory across all three',
      'Leads sourced, qualified and handed to outreach',
      'Content planned, drafted and published',
      'WhatsApp, email & SMS outreach',
      'Priority onboarding',
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
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[34px] md:text-[50px] mb-5">
          <span className="text-gold-display">Nebulaa</span> costs less than a hire and moves faster than an agency.
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-muted">
          A marketing executive costs ₹30,000–50,000 a month, plus tools and roughly six weeks to hire. Nebulaa is set up and running within a week.
        </motion.p>
      </motion.div>

      {/* Side-by-side cost comparison — the total leads, the itemised
          arithmetic backs it up below for anyone who wants to check it,
          instead of making that arithmetic the first thing a reader has
          to wade through. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOptions}
        transition={{ duration: 0.6 }}
        className="mb-[62px]"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px flex-1 bg-rule max-w-[100px]" />
          <span className="font-mono text-[12px] text-gold-text tracking-wide whitespace-nowrap">
            ~{Math.round(83000 / priceFor(30000, annual).display)}× cheaper than hiring it out
          </span>
          <span className="h-px flex-1 bg-rule max-w-[100px]" />
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-stretch">
          {/* The manual stack */}
          <div className="hud-card rounded-[20px] overflow-hidden flex flex-col">
            <div className="px-6 md:px-8 pt-7 pb-6 border-b border-rule">
              <div className="flex items-center justify-between mb-4">
                <span className="neb-label">Doing it yourself</span>
                <StatusIndicator tone="idle" label="Manual stack" pulse={false} />
              </div>
              <span className="font-digital text-[34px] md:text-[40px] text-muted tabular-nums leading-none">
                ₹83,000–137,000<span className="text-[18px] md:text-[22px]">+/mo</span>
              </span>
            </div>
            <div className="px-6 md:px-8 py-2 flex-1">
              {replaces.map(row => (
                <div key={row.item} className="flex items-center justify-between gap-4 py-3.5 border-b border-rule last:border-b-0">
                  <span className="font-body text-[13.5px] text-faint">{row.item}</span>
                  <span className="font-mono text-[12px] text-faint text-right tabular-nums whitespace-nowrap">{row.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nebulaa */}
          <div className="rounded-[20px] overflow-hidden flex flex-col bg-gold/[0.05] border border-gold/[0.22] shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07),0_18px_60px_rgba(245,166,35,0.07)]">
            <div className="px-6 md:px-8 pt-7 pb-6 border-b border-gold/[0.18]">
              <div className="flex items-center justify-between mb-4">
                <span className="neb-label neb-label-gold">With Nebulaa</span>
                <StatusIndicator tone="active" label="Nebulaa" />
              </div>
              <span className="font-digital text-[34px] md:text-[40px] text-gold-text tabular-nums leading-none">
                ₹{priceFor(30000, annual).display.toLocaleString('en-IN')}<span className="text-[18px] md:text-[22px]">/mo</span>
              </span>
            </div>
            <div className="px-6 md:px-8 py-2 flex-1">
              {included.map(item => (
                <div key={item} className="flex items-center gap-3 py-3.5 border-b border-gold/[0.14] last:border-b-0">
                  <Check size={15} className="text-gold-text flex-shrink-0" />
                  <span className="font-body text-[13.5px] text-ink-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monthly / annual toggle — sits right above the plans it controls,
          after the reader has already seen why the price is worth it. */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="flex items-center gap-4 mb-[38px]"
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

      {/* 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {plans.map((plan, i) => {
          const { display, suffix } = priceFor(plan.monthly, annual)
          const individualTotal = plans
            .slice(0, 3)
            .reduce((sum, p) => sum + priceFor(p.monthly, annual).display, 0)
          const savings = individualTotal - display
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
                {plan.highlight && savings > 0 && (
                  <div className="font-body text-[14.5px] text-gold-text">
                    Save ₹{savings.toLocaleString('en-IN')}/month vs separate
                  </div>
                )}
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
