'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'
import { ANNUAL_DISCOUNT, plans, creditTopUp } from '@/lib/orgFacts'

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
        className="max-w-[620px] mb-[54px]"
      >
        <motion.div variants={fadeUpVariant}><SectionLabel className="mb-[22px] block">Pricing</SectionLabel></motion.div>
        <motion.h2 variants={fadeUpVariant} className="neb-display text-[34px] md:text-[50px] mb-5">
          Two plans, <span className="text-gold-display">priced to make starting easy.</span>
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="font-body text-[17px] leading-[1.68] text-muted">
          Every plan runs your content, your leads and your WhatsApp replies from day one — the only
          difference is how much volume you get each month. {creditTopUp}
        </motion.p>
      </motion.div>

      {/* Monthly / annual toggle */}
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

      {/* 2 cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-[760px]">
        {plans.map((plan, i) => {
          const { display, suffix } = priceFor(plan.price, annual)
          const highlight = plan.id === 'professional'
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative bg-surface rounded-[20px] p-6 md:p-8 ${
                highlight
                  ? 'border border-gold/[0.22] shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07),0_18px_60px_rgba(245,166,35,0.07)]'
                  : 'border border-rule'
              }`}
            >
              <SectionLabel tone={highlight ? 'gold' : 'muted'} className="mb-5 block">
                {plan.name}{highlight ? ' · most popular' : ''}
              </SectionLabel>

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

              <div className="inline-flex items-center gap-2 mb-[30px] bg-gold-wash rounded-full px-3.5 py-1.5">
                <Zap size={13} className="text-gold-text" />
                <span className="font-body text-[13px] font-semibold text-gold-text">{plan.credits} credits / month</span>
              </div>

              <hr className="border-t border-rule mb-[26px]" />

              <div className="flex flex-col gap-[13px] mb-9">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2.5 font-body text-[14.5px] text-ink-2">
                    <Check size={15} className="text-gold-text flex-shrink-0 mt-[3px]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className={`w-full text-center font-body font-semibold text-[14.5px] rounded-full py-[15px] block transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  highlight
                    ? 'bg-gold text-[#1A1208] shadow-[0_6px_22px_rgba(245,166,35,0.22)]'
                    : 'border border-rule-2 text-ink-2 hover:border-gold hover:text-gold-text'
                }`}
              >
                Start with {plan.name}
              </a>
            </motion.div>
          )
        })}
      </div>

      <p className="font-body text-[13.5px] text-faint mt-8 max-w-[600px]">
        Managed engagements — where our team runs it for you instead — are scoped and quoted separately.
        <a href="/services" className="text-gold-text hover:underline ml-1">See managed services →</a>
      </p>
    </section>
  )
}
