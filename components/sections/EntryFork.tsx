'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

const paths = [
  {
    label: 'I want to run it myself',
    desc: 'Self-serve Gravity and Pulsar. Set up in 60 seconds, no team needed.',
    cta: 'See product & pricing →',
    href: '#pricing',
  },
  {
    label: 'I want a team to run it for me',
    desc: 'Done-for-you marketing, AI-accelerated, delivered by Nebulaa\'s team.',
    cta: 'See managed services →',
    href: '/services/enterprise',
  },
]

export default function EntryFork() {
  return (
    <section className="bg-white dark:bg-brand-black py-16 border-b border-brand-border dark:border-white/5">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOptions}
          className="text-center font-body text-sm text-brand-muted dark:text-white/50 mb-6"
        >
          Looking for a self-serve AI tool, or a team to run this for you?
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {paths.map((p) => (
            <motion.div key={p.label} variants={fadeUpVariant}>
              <Link
                href={p.href}
                className="block bg-brand-off-white dark:bg-[#111110] border border-brand-border dark:border-white/8 rounded-2xl p-6 hover:border-brand-gold transition-all h-full"
              >
                <p className="font-heading font-bold text-lg text-brand-text dark:text-white mb-1.5">{p.label}</p>
                <p className="font-body text-sm text-brand-muted dark:text-white/50 mb-3">{p.desc}</p>
                <span className="font-body text-sm font-semibold text-brand-gold">{p.cta}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
