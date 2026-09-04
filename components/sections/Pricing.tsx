'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const plans = [
  {
    name: 'Gravity',
    label: 'Gravity',
    emoji: '🌀',
    tagline: 'AI Marketing Agent',
    price: '₹10,000',
    description: 'Content, out the door daily.',
    features: [
      'Daily AI-written posts',
      'LinkedIn, Instagram & Twitter',
      'Festival calendar included',
      'Competitor tracking',
      'Brand voice setup (60 sec)',
      '3 platforms included',
      '7-day free trial',
    ],
    cta: 'Start with Gravity',
    highlight: false,
  },
  {
    name: 'Both Agents',
    label: 'Both agents · best value',
    emoji: '⚡',
    tagline: 'Marketing + Outreach',
    price: '₹15,000',
    description: 'The whole loop — content in, customers out. ₹10,000 less than buying the two separately.',
    features: [
      'Everything in Gravity',
      'Everything in Pulsar',
      'WhatsApp + voice campaigns',
      'Lead scoring & qualification',
      'Email follow-up sequences',
      'Priority onboarding',
      'Save ₹10,000/month vs separate',
    ],
    cta: 'Start with Both →',
    highlight: true,
  },
  {
    name: 'Pulsar',
    label: 'Pulsar',
    emoji: '📞',
    tagline: 'AI Outreach Agent',
    price: '₹15,000',
    description: 'Every enquiry, answered.',
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
        <motion.h2 variants={fadeUpVariant} className="font-heading font-medium text-[50px] leading-[1.12] tracking-[-0.02em] mb-5">
          Cheaper than the hire. <span className="italic text-brand-gold">Faster than the agency.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-white/55">
          A marketing executive costs ₹30,000–50,000 a month, plus tools, plus six weeks of interviews, plus the morning they hand in their notice. This starts working on Thursday.
        </motion.p>
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
            className={`relative bg-brand-dark-surface rounded-[20px] p-10 ${
              plan.highlight
                ? 'border border-brand-gold/[0.22] shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07),0_18px_60px_rgba(245,166,35,0.07)]'
                : 'border border-white/[0.06]'
            }`}
          >
            {/* Header */}
            <SectionLabel tone={plan.highlight ? 'gold' : 'muted'} className="mb-5 block">
              {plan.label}
            </SectionLabel>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-2.5">
              <span className="font-heading text-[46px] tracking-[-0.02em] leading-none">{plan.price}</span>
              <span className="font-body text-sm text-white/35">/month</span>
            </div>
            <p className="font-body text-[14.5px] leading-[1.6] text-white/55 mb-[30px]">{plan.description}</p>

            <hr className="border-t border-white/[0.06] mb-[26px]" />

            {/* Features */}
            <div className="flex flex-col gap-[13px] mb-9">
              {plan.features.map(f => (
                <div key={f} className="font-body text-[14.5px] text-white/70">{f}</div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className={`w-full text-center font-body font-semibold text-[14.5px] rounded-full py-[13px] block transition-all hover:scale-[1.02] active:scale-[0.98] ${
                plan.highlight
                  ? 'bg-brand-gold text-[#1A1208] shadow-[0_6px_22px_rgba(245,166,35,0.22)]'
                  : 'border border-white/[0.14] text-white/80 hover:border-brand-gold hover:text-brand-gold'
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
