'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ParticleField from '@/components/ui/ParticleField'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative bg-[#0A0A0A] py-32 px-6 md:px-12 lg:px-30">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-15 items-center"
      >
        {/* Left — copy */}
        <div>
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[26px] block">AI marketing &amp; outreach agents</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="font-heading text-[52px] md:text-[74px] leading-[1.04] tracking-[-0.02em] font-medium text-[#F5F4F1] mb-[30px]"
            style={{ textWrap: 'pretty' }}
          >
            Your competitor isn&apos;t better.
            <br />
            <span className="italic text-brand-gold">They&apos;re just louder.</span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-lg leading-[1.65] text-white/55 max-w-[520px] mb-10"
          >
            Give Nebulaa your website. In about a minute it knows how you talk, who actually buys from you, and what your rivals posted this week. Then it writes your posts, publishes them every morning, and answers enquiries on WhatsApp while they&apos;re still warm.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex items-center gap-3.5 mb-[26px]">
            <a
              href="#pricing"
              className="bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
            >
              Start free — no card
            </a>
            <a
              href="/services/enterprise"
              className="border border-white/[0.12] text-white/75 text-[15px] font-medium px-7 py-[15px] rounded-full hover:border-white/25 transition"
            >
              Have our team run it
            </a>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex items-center gap-2.5 text-[13px] text-white/35">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] inline-block" />
            <span>7-day trial</span>
            <span>·</span>
            <span>Set up with you in 24 hrs</span>
            <span>·</span>
            <span>Cancel anytime</span>
          </motion.div>
        </div>

        {/* Right — centrepiece: one visual, not five */}
        <motion.div variants={fadeUpVariant} className="hidden lg:block">
          <ParticleField
            height={520}
            readout={{
              label: 'Reading nebulaa-client.com',
              lines: [
                'Brand voice — confident, warm, unhurried',
                'Customers — retail buyers, 25–45, Tamil Nadu',
                '3 competitors tracked',
              ],
              timer: '00:47',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
