'use client'

import { motion } from 'framer-motion'
import { Rocket, Store, ArrowRight } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import { fadeUpVariant, containerVariant } from '@/components/ui/variants'

export default function TargetedSolutions() {
  return (
    <section className="bg-[#000000] py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUpVariant}>
            <SectionBadge>Built for Builders — Not Marketers</SectionBadge>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-white"
          >
            Which one are you?
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Card 1 — The Founder */}
          <motion.div
            variants={fadeUpVariant}
            className="group relative bg-[#111111] border-t-2 border-t-brand-gold border border-[#2A2A2A] rounded-3xl p-10 transition-all duration-300 cursor-pointer"
            whileHover={{
              boxShadow: '0 0 40px rgba(245,166,35,0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Rocket size={32} className="text-brand-gold" />
            </div>
            <SectionBadge>For the High-Growth Founder</SectionBadge>
            <p className="text-gray-400 text-sm mb-6">Startups · Pre-seed to Series A</p>

            <blockquote className="text-white text-xl italic leading-relaxed mb-6 border-l-2 border-brand-gold pl-4">
              &ldquo;I&rsquo;m closing deals, not writing captions. Gravity runs my LinkedIn
              while Pulsar warms my pipeline.&rdquo;
            </blockquote>

            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Meet your AI GTM co-founder. No equity required.
            </p>

            <a
              href="#gravity"
              className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold hover:text-brand-gold-glow transition-colors group-hover:gap-3"
            >
              See how founders use it <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Card 2 — The Entrepreneur */}
          <motion.div
            variants={fadeUpVariant}
            className="group relative bg-[#111111] border-t-2 border-t-brand-gold/60 border border-[#2A2A2A] rounded-3xl p-10 transition-all duration-300 cursor-pointer"
            whileHover={{
              boxShadow: '0 0 40px rgba(245,166,35,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Store size={32} className="text-brand-gold" />
            </div>
            <SectionBadge>For the Local Entrepreneur</SectionBadge>
            <p className="text-gray-400 text-sm mb-6">Gyms · Tuition Centres · Agencies</p>

            <blockquote className="text-white text-xl italic leading-relaxed mb-6 border-l-2 border-brand-gold/60 pl-4">
              &ldquo;Running a gym, tuition, or agency? Pulsar calls your leads at 9am while
              you open for business.&rdquo;
            </blockquote>

            <p className="text-gray-400 text-base leading-relaxed mb-8">
              You run the shop. Nebulaa fills it.
            </p>

            <a
              href="#pulsar"
              className="inline-flex items-center gap-2 text-brand-gold text-sm font-semibold hover:text-brand-gold-glow transition-colors group-hover:gap-3"
            >
              See how SMBs use it <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
