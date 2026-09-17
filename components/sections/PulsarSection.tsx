'use client'

import { motion } from 'framer-motion'
import { MessageSquareText, ClipboardCheck, ListOrdered, Phone, Mail, MessageSquare } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { fadeUpVariant, slideInRight, staggerContainer, viewportOptions } from '@/lib/animations'

const bullets = [
  { icon: MessageSquareText, text: "WhatsApp, email and SMS — written the way you'd write them" },
  { icon: ClipboardCheck, text: 'Budget, timeline and fit settled before it reaches you' },
  { icon: ListOrdered, text: 'Every lead scored, so your day starts at the top of the list' },
  { icon: Phone, text: 'Voice calling where it earns its place' },
]

const channels = [
  { icon: WhatsAppIcon, name: 'WhatsApp' },
  { icon: Mail, name: 'Email' },
  { icon: MessageSquare, name: 'SMS' },
]

const thread = [
  {
    sender: 'inbound',
    msg: 'Saw your enquiry about the Anna Nagar showroom — are you looking for bridal or daily wear?',
  },
  { sender: 'outbound', msg: 'Bridal. Wedding is in March.' },
  {
    sender: 'inbound',
    msg: 'Perfect — March gives us time. Would Saturday 11am suit you for a private viewing?',
  },
]

export default function PulsarSection() {
  return (
    <section id="pulsar" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[90px] items-center">
        {/* Left — product panel */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="bg-[#0A0A0E] border border-white/[0.06] rounded-[20px] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-[9px]">
              <div
                className="w-[13px] h-[13px] rounded-full"
                style={{ background: 'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)' }}
              />
              <span className="font-heading text-[13.5px] font-medium text-white">Pulsar</span>
            </div>
            <SectionLabel tone="onDark">4 min after enquiry</SectionLabel>
          </div>

          <div className="flex flex-col gap-[11px] mb-[18px]">
            {thread.map((bubble, i) => (
              <div
                key={i}
                className={
                  bubble.sender === 'outbound'
                    ? 'self-end max-w-[78%] bg-gold/[0.13] border border-gold/[0.22] rounded-[14px_14px_4px_14px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-white/[0.88]'
                    : 'self-start max-w-[78%] bg-[#101018] border border-white/[0.06] rounded-[14px_14px_14px_4px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-white/60'
                }
              >
                {bubble.msg}
              </div>
            ))}
          </div>

          <div className="bg-[#101018] border border-white/[0.06] rounded-[14px] p-[17px] flex items-center justify-between">
            <div>
              <SectionLabel tone="onDark" className="mb-[6px] block">Scored &amp; handed over</SectionLabel>
              <div className="text-[13.5px] text-white/75">Bridal · March timeline · booked Saturday</div>
            </div>
            <div className="font-heading text-[30px] text-gold-text">86</div>
          </div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[22px] block">Pulsar // Outreach</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="neb-display text-[34px] md:text-[50px] mb-[26px]"
          >
            Follow-up <span className="text-gold-display">without the backlog.</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="font-body text-[17px] leading-[1.68] text-muted max-w-[480px] mb-[34px]"
          >
            It happens mid-billing, mid-invoice, mid-everything — and by the time you&rsquo;re free, they&rsquo;ve already messaged someone else. Pulsar replies in minutes, asks the questions you&rsquo;d ask, and hands you only the ones worth your afternoon.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-col gap-4">
            {bullets.map(({ icon: Icon, text }) => (
              <div key={text} className="flex gap-[13px] items-start">
                <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center mt-0.5">
                  <Icon size={13.5} className="text-gold-text" />
                </span>
                <span className="font-body text-[15px] leading-[1.6] text-ink-2 pt-0.5">{text}</span>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUpVariant} className="flex items-center gap-[22px] mt-[30px]">
            {channels.map(({ icon: Icon, name }) => (
              <span key={name} className="flex items-center gap-2 text-[13px] text-faint">
                <Icon size={16} />
                {name}
              </span>
            ))}
          </motion.div>
          <motion.a variants={fadeUpVariant} href="#how-it-works" className="mt-[26px] inline-block text-[15px] text-gold-text hover:underline">
            See how Pulsar works →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
