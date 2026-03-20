'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const plans = [
  {
    name: 'Gravity',
    emoji: '🌀',
    tagline: 'AI Marketing Agent',
    price: '₹7,500',
    description: 'Automate your entire social media presence. Posts, scheduling, competitor tracking — on autopilot.',
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
    badge: null,
  },
  {
    name: 'Both Agents',
    emoji: '⚡',
    tagline: 'Marketing + Outreach',
    price: '₹10,000',
    description: 'Your complete GTM team. Gravity handles marketing, Pulsar closes leads. Two agents, one plan.',
    features: [
      'Everything in Gravity',
      'Everything in Pulsar',
      'WhatsApp + voice campaigns',
      'Lead scoring & qualification',
      'Email follow-up sequences',
      'Priority onboarding',
      'Save ₹5,000/month vs separate',
    ],
    cta: 'Start with Both →',
    highlight: true,
    badge: 'BEST VALUE',
  },
  {
    name: 'Pulsar',
    emoji: '📞',
    tagline: 'AI Outreach Agent',
    price: '₹7,500',
    description: 'Automated calls, WhatsApp follow-ups, and email sequences. Never let a lead go cold again.',
    features: [
      'AI voice calling',
      'WhatsApp sequences',
      'Email follow-ups',
      'Lead scoring',
      'Unlimited contacts',
      'CRM-ready exports',
      '7-day free trial',
    ],
    cta: 'Start with Pulsar',
    highlight: false,
    badge: null,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white dark:bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <motion.div variants={fadeUpVariant}><SectionLabel className="mb-4 block">Pricing</SectionLabel></motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight leading-none mb-4">
            Simple, honest pricing.
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="font-body text-sm text-brand-muted dark:text-white/50 max-w-md mx-auto">
            Pick the agent you need. Upgrade to both anytime. The average marketing hire costs ₹30–50k/month — plus tools.
          </motion.p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOptions}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={plan.highlight ? { boxShadow: '0 8px 64px rgba(245,184,0,0.3)' } : { boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
              className={`relative rounded-4xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-white dark:bg-[#1A1815] border-2 border-brand-gold shadow-gold-md'
                  : 'bg-brand-off-white dark:bg-[#111110] border border-brand-border dark:border-white/8 md:mt-6'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-gold text-brand-black text-[10px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap tracking-widest flex items-center gap-1.5">
                    <Zap size={10} className="fill-current" />{plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{plan.emoji}</span>
                  <span className="font-heading font-bold text-xl text-brand-text dark:text-white">{plan.name}</span>
                </div>
                <p className="font-body text-xs text-brand-muted dark:text-white/40 uppercase tracking-widest font-semibold">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="font-heading font-bold text-5xl text-brand-text dark:text-white leading-none">{plan.price}</span>
                <span className="font-body text-brand-muted dark:text-white/40 text-sm ml-2">/month</span>
              </div>
              <p className="font-body text-sm text-brand-muted dark:text-white/50 mb-6 leading-relaxed">{plan.description}</p>

              <div className="w-full h-px bg-brand-border dark:bg-white/8 mb-6" />

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-brand-gold flex-shrink-0" />
                    <span className="font-body text-sm text-brand-text dark:text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`w-full text-center font-body font-bold text-sm rounded-full py-3.5 block transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-brand-gold text-brand-black hover:bg-brand-gold-dim animate-pulse-gold'
                    : 'border border-brand-border dark:border-white/10 text-brand-text dark:text-white/80 hover:border-brand-gold hover:text-brand-gold dark:hover:border-brand-gold dark:hover:text-brand-gold'
                }`}
              >
                {plan.cta}
              </a>

              {plan.highlight && (
                <p className="text-center font-body text-xs text-brand-muted-2 dark:text-white/30 mt-3">7-day trial · No credit card · We set it up with you</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} className="text-center font-body text-sm text-brand-muted dark:text-white/40 mt-10">
          All plans include: white-glove onboarding · 7-day free trial · cancel anytime · 100 trial credits
        </motion.p>
      </div>
    </section>
  )
}
