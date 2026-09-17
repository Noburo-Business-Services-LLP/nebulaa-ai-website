'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const steps = [
  {
    n: '01',
    title: 'Full brand context, one pass',
    body: 'Paste your website. A minute later it knows your tone, who buys from you, and what your three closest rivals put out this week. No brief to write. No onboarding call to sit through.',
  },
  {
    n: '02',
    title: 'A month planned and shipped, unattended',
    body: 'Not a post at a time — a month, mapped out and drafted in your voice: posts, carousels, the occasional reel. Diwali and Pongal are already in the plan, so you never wake up on the day with nothing ready.',
  },
  {
    n: '03',
    title: 'Every enquiry answered live',
    body: 'An enquiry at nine on a Sunday night doesn’t wait for Monday. Pulsar replies in minutes, asks what you’d have asked, and brings you in once there’s a real buyer on the other end.',
  },
]

export default function ThreeThings() {
  return (
    <section id="how-it-works" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-[640px] mb-[78px]"
      >
        <motion.div variants={fadeUpVariant}>
          <SectionLabel className="mb-[22px] block">Always on</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUpVariant}
          className="font-heading text-[33px] md:text-[50px] leading-[1.14] md:leading-[1.12] tracking-[-0.02em] font-medium"
        >
          Agent intelligence, <span className="italic text-gold-text">running twenty-four seven.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid md:grid-cols-3 gap-6"
      >
        {steps.map((step, i) => (
          <motion.div key={step.n} variants={fadeUpVariant}>
            <HudCard halo={i === 1 ? 'cyan' : 'amber'} className="p-9 h-full">
              <div className="font-mono text-[46px] text-gold-text/35 leading-none mb-7">{step.n}</div>
              <h3 className="font-heading text-[25px] font-medium mb-3.5">{step.title}</h3>
              <p className="font-body text-[15px] leading-[1.68] text-muted">{step.body}</p>
            </HudCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
