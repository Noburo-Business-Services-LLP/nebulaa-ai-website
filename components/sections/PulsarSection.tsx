'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageSquareText, ClipboardCheck, ListOrdered, Phone, Mail, MessageSquare } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
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
] as const

/**
 * Same self-running build sequence as CoreConsole/GravitySection: a step
 * counter plays out the actual claim — Pulsar drafting and sending a reply
 * within minutes — instead of showing a finished conversation as a static
 * screenshot. Pulsar's own messages ('inbound' here, left-aligned) get a
 * brief typing indicator before they land, since drafting the reply live
 * is the whole point being demonstrated.
 */
const STEPS = [
  'typing-0',
  'msg-0',
  'msg-1',
  'typing-2',
  'msg-2',
  'scored',
] as const
const TOTAL = STEPS.length
const HOLD_STEPS = 16
const STEP_MS = 720

function useCountUp(target: number, active: boolean, duration = 650) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) {
      setDisplay(0)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return display
}

function TypingBubble() {
  return (
    <div className="self-start bg-surface-2 border border-rule rounded-[14px_14px_14px_4px] px-4 py-3 flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-[5px] h-[5px] rounded-full bg-faint animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}

export default function PulsarSection() {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(reduceMotion ? TOTAL : 0)

  useEffect(() => {
    if (reduceMotion) {
      setStep(TOTAL)
      return
    }
    const id = setInterval(() => {
      setStep(s => (s >= TOTAL + HOLD_STEPS ? 0 : s + 1))
    }, STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  const phase = STEPS[Math.min(step, TOTAL) - 1] ?? null
  const msgsShown = step >= 1 ? (step >= 5 ? 3 : step >= 3 ? 2 : step >= 2 ? 1 : 0) : 0
  const typingIndex = phase === 'typing-0' ? 0 : phase === 'typing-2' ? 2 : -1
  const scoredShown = step >= TOTAL
  const score = useCountUp(86, scoredShown)

  return (
    <section id="pulsar" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[90px] items-center">
        {/* Left — product panel, a live-running reply sequence rather than a static mock */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <HudCard
            halo="cyan"
            label="Pulsar // 4 min after enquiry"
            status={{ tone: scoredShown ? 'active' : 'live', label: scoredShown ? 'Handed off' : 'Replying' }}
          >
            <div className="flex flex-col gap-[11px] mb-[18px] min-h-[168px]">
              {thread.map((bubble, i) => {
                const shown = i < msgsShown
                return (
                  <div
                    key={i}
                    className={`transition-all duration-400 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0 overflow-hidden'}`}
                  >
                    <div
                      className={
                        bubble.sender === 'outbound'
                          ? 'self-end max-w-[78%] bg-gold/[0.13] border border-gold/[0.22] rounded-[14px_14px_4px_14px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-ink-2 ml-auto'
                          : 'self-start max-w-[78%] bg-surface-2 border border-rule rounded-[14px_14px_14px_4px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-muted'
                      }
                    >
                      {bubble.msg}
                    </div>
                  </div>
                )
              })}
              {typingIndex >= 0 && <TypingBubble />}
            </div>

            <div
              className={`bg-surface-2 border border-rule rounded-[14px] p-[17px] flex items-center justify-between transition-all duration-500 ${
                scoredShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <div>
                <SectionLabel tone="onDark" className="mb-[6px] block">Scored &amp; handed over</SectionLabel>
                <div className="text-[13.5px] text-ink-2">Bridal · March timeline · booked Saturday</div>
              </div>
              <div className="font-digital text-[30px] text-gold-text tabular-nums">{score}</div>
            </div>
          </HudCard>
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
