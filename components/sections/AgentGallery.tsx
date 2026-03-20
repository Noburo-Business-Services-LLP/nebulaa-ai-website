'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import Button from '@/components/ui/Button'
import { fadeUpVariant, containerVariant } from '@/components/ui/variants'

const gravityFeatures = [
  'Ingests your website in 60 seconds. Learns your brand voice, your ICP, your competitors — before writing a word.',
  'Writes and schedules posts for LinkedIn, Instagram, and Twitter/X. Every day. Automatically.',
  'Tracks what your rivals are posting. Flags gaps. Suggests counter-content before you notice the trend.',
  'Built-in festival and cultural calendar — Diwali, IPL, Budget Day — so you never miss a viral moment.',
  'Learns your brand voice over time. The longer it runs, the better it gets.',
]

const pulsarFeatures = [
  'Calls your leads and qualifies them in real-time — in your voice, your language, your script. Sounds human.',
  'Sends WhatsApp messages, emails, and SMS follow-ups automatically. Right message, right channel, right time.',
  'Runs multi-step outreach sequences — set the flow once, Pulsar runs it forever.',
  'Bulk WhatsApp campaigns for launches and promotions. Thousands of personalised messages, one click.',
  'Hands off only warm, qualified leads to you. Everyone else stays in the sequence.',
]

const scheduledPosts = [
  {
    platform: 'LI',
    platformColor: '#0A66C2',
    platformLabel: 'LinkedIn',
    text: 'Why 80% of Indian founders burn out before hitting ₹1Cr ARR — and the one habit that changed everything for me.',
    badge: 'Scheduled',
    time: 'Today, 9:00 AM',
  },
  {
    platform: 'IG',
    platformColor: '#E1306C',
    platformLabel: 'Instagram',
    text: 'Your brand is not what you say it is. It\'s what your audience feels when they scroll past your post at 2am.',
    badge: 'Scheduled',
    time: 'Tomorrow, 8:30 AM',
  },
  {
    platform: 'TW',
    platformColor: '#1DA1F2',
    platformLabel: 'Twitter/X',
    text: 'Hot take: The best GTM strategy for early-stage is to be *undeniably specific* about who you help and how.',
    badge: 'Drafting',
    time: 'Wed, 10:00 AM',
  },
]

const leads = [
  { name: 'Rahul S.', status: 'Qualified', icon: '✓', color: 'text-brand-gold', channel: '📞' },
  { name: 'Priya M.', status: 'Calling...', icon: '●', color: 'text-green-400 animate-pulse', channel: '📞' },
  { name: 'Aditya K.', status: 'WhatsApp Sent', icon: '✓', color: 'text-brand-gold', channel: '💬' },
  { name: 'Divya R.', status: 'Scheduled', icon: '○', color: 'text-gray-400', channel: '📧' },
]

function GravityMockup() {
  return (
    <motion.div
      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden animate-float"
      style={{ boxShadow: 'inset 0 0 60px rgba(245,184,0,0.04)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌀</span>
          <span className="text-white text-sm font-semibold font-heading">Gravity — Content Queue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-brand-gold text-xs font-semibold">LIVE</span>
        </div>
      </div>

      {/* Posts */}
      <div className="p-4 space-y-3">
        {scheduledPosts.map((post, i) => (
          <div key={i} className="bg-[#111111] rounded-xl p-3 border border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: post.platformColor }}
                >
                  {post.platform}
                </div>
                <span className="text-gray-400 text-xs">{post.platformLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-[10px]">{post.time}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    post.badge === 'Scheduled'
                      ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  {post.badge}
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">{post.text}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#2A2A2A] flex items-center gap-2">
        <CheckCircle size={14} className="text-brand-gold" />
        <span className="text-brand-gold text-xs font-medium">Brand Voice: Active ✓</span>
      </div>
    </motion.div>
  )
}

function PulsarMockup() {
  return (
    <motion.div
      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ boxShadow: 'inset 0 0 60px rgba(245,184,0,0.04)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <span className="text-lg">📞</span>
          <span className="text-white text-sm font-semibold font-heading">Pulsar — Live Outreach</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-semibold">3 calls in progress</span>
        </div>
      </div>

      {/* Leads list */}
      <div className="p-4 space-y-2">
        {leads.map((lead, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-[#111111] rounded-xl px-4 py-3 border border-[#2A2A2A]"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-xs text-gray-400 font-semibold">
                {lead.name[0]}
              </div>
              <span className="text-white text-sm">{lead.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">{lead.channel}</span>
              <span className={`text-xs font-medium ${lead.color}`}>{lead.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#2A2A2A]">
        <span className="text-brand-gold text-sm font-semibold">12 leads qualified today</span>
      </div>
    </motion.div>
  )
}

export default function AgentGallery() {
  return (
    <>
      {/* GRAVITY */}
      <section id="gravity" className="bg-[#000000] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUpVariant}>
                <SectionBadge>🌀 Gravity</SectionBadge>
              </motion.div>
              <motion.h2
                variants={fadeUpVariant}
                className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-white mb-6"
              >
                Your AI
                <br />
                Marketing Engine.
              </motion.h2>
              <motion.div variants={containerVariant} className="space-y-4">
                {gravityFeatures.map((feat, i) => (
                  <motion.div key={i} variants={fadeUpVariant} className="flex gap-3">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">→</span>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feat}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <GravityMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PULSAR */}
      <section id="pulsar" className="bg-[#111111] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">
            {/* Mockup — left on desktop */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="order-2 lg:order-1"
            >
              <PulsarMockup />
            </motion.div>

            {/* Copy — right on desktop */}
            <motion.div
              variants={containerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeUpVariant}>
                <SectionBadge>📞 Pulsar</SectionBadge>
              </motion.div>
              <motion.h2
                variants={fadeUpVariant}
                className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-white mb-6"
              >
                Your AI
                <br />
                Outreach Engine.
              </motion.h2>
              <motion.div variants={containerVariant} className="space-y-4">
                {pulsarFeatures.map((feat, i) => (
                  <motion.div key={i} variants={fadeUpVariant} className="flex gap-3">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">→</span>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{feat}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-width CTA */}
      <section className="bg-[#000000] py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button variant="primary" size="lg">
            Start Your Free Trial — 100 Credits Included →
          </Button>
          <p className="text-gray-500 text-sm mt-4">
            No credit card required &nbsp;·&nbsp; 7-day trial &nbsp;·&nbsp; We&apos;ll set it up with you
          </p>
        </motion.div>
      </section>
    </>
  )
}
