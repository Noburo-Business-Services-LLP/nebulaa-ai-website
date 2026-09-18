'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageSquareText, ClipboardCheck, ListOrdered, Phone, Mail, MessageSquare, PhoneCall } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import StatusIndicator from '@/components/ui/StatusIndicator'
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
  { sender: 'inbound', msg: 'Saw your enquiry about the Anna Nagar showroom — are you looking for bridal or daily wear?' },
  { sender: 'outbound', msg: 'Bridal. Wedding is in March.' },
  { sender: 'inbound', msg: 'Perfect — March gives us time. Would Saturday 11am suit you for a private viewing?' },
] as const

const OUTREACH_ROWS = [
  { icon: WhatsAppIcon, channel: 'WhatsApp', detail: 'Follow-up on Saturday viewing', state: 'Sent' },
  { icon: Mail, channel: 'Email', detail: 'Bridal collection lookbook attached', state: 'Sent' },
]

/**
 * Three capability screens cycling on one HudCard — same pattern as
 * GravitySection and the hero's CoreConsole. Conversation replays the
 * WhatsApp exchange (Pulsar's own replies get a typing beat), then a live
 * call, then WhatsApp + email going out in parallel — the "channels this
 * actually runs" claim, made visible one screen at a time. Rows are flat
 * (a divider line, no per-row box) to match Orbit's panel style.
 */
const SCREENS = [
  { key: 'conversation', label: 'Pulsar // 4 min after enquiry', span: 9 },
  { key: 'calling', label: 'Pulsar // voice calling', span: 6 },
  { key: 'outreach', label: 'Pulsar // parallel outreach', span: 5 },
] as const
const TOTAL = SCREENS.reduce((sum, s) => sum + s.span, 0)
const STEP_MS = 640

export default function PulsarSection() {
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(reduceMotion ? TOTAL - 1 : 0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setTick(t => (t + 1) % TOTAL), STEP_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  let acc = 0
  let screenIndex = 0
  let localTick = 0
  for (let i = 0; i < SCREENS.length; i++) {
    if (tick < acc + SCREENS[i].span) {
      screenIndex = i
      localTick = tick - acc
      break
    }
    acc += SCREENS[i].span
  }
  const screen = SCREENS[screenIndex]

  return (
    <section id="pulsar" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[90px] items-center">
        {/* Left — three capability screens, cycling on one live panel */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <HudCard halo="cyan" label={screen.label} status={screenStatus(screen.key, localTick)}>
            <div className="min-h-[290px]">
              <AnimatePresence mode="wait">
                {screen.key === 'conversation' && (
                  <motion.div key="conversation" {...crossfade}>
                    <ConversationScreen localTick={localTick} />
                  </motion.div>
                )}
                {screen.key === 'calling' && (
                  <motion.div key="calling" {...crossfade}>
                    <CallingScreen localTick={localTick} />
                  </motion.div>
                )}
                {screen.key === 'outreach' && (
                  <motion.div key="outreach" {...crossfade}>
                    <OutreachScreen localTick={localTick} />
                  </motion.div>
                )}
              </AnimatePresence>
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
            <span className="text-gold-display">Pulsar</span> responds to WhatsApp, email and SMS enquiries within minutes.
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

const crossfade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.35 },
}

function screenStatus(key: (typeof SCREENS)[number]['key'], localTick: number): { tone: 'live' | 'active'; label: string } {
  if (key === 'conversation') return localTick < 6 ? { tone: 'live', label: 'Replying' } : { tone: 'active', label: 'Handed off' }
  if (key === 'calling') return localTick < 3 ? { tone: 'live', label: 'Ringing' } : { tone: 'active', label: 'Connected' }
  return localTick < 2 ? { tone: 'live', label: 'Sending' } : { tone: 'active', label: 'Sent' }
}

function TypingBubble() {
  return (
    <div className="self-start bg-surface-2 border border-rule rounded-[14px_14px_14px_4px] px-4 py-3 flex items-center gap-1 w-fit">
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

function ConversationScreen({ localTick }: { localTick: number }) {
  // typing-0, msg-0, msg-1, typing-2, msg-2, scored — same beats as before,
  // just re-scoped to this screen's own local tick.
  const msgsShown = localTick >= 5 ? 3 : localTick >= 3 ? 2 : localTick >= 2 ? 1 : 0
  const typingIndex = localTick === 1 ? 0 : localTick === 4 ? 2 : -1
  const scoredShown = localTick >= 6

  return (
    <div>
      <div className="flex flex-col gap-[11px] mb-[14px] min-h-[168px]">
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
                    ? 'max-w-[78%] bg-gold/[0.13] border border-gold/[0.22] rounded-[14px_14px_4px_14px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-ink-2 ml-auto'
                    : 'max-w-[78%] bg-surface-2 border border-rule rounded-[14px_14px_14px_4px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-muted'
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
        className={`flex items-center justify-between gap-4 pt-3.5 border-t border-rule transition-all duration-500 ${
          scoredShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
        }`}
      >
        <div>
          <SectionLabel tone="onDark" className="mb-[4px] block">Scored &amp; handed over</SectionLabel>
          <div className="text-[13px] text-ink-2">Bridal · March timeline · booked Saturday</div>
        </div>
        <div className="font-digital text-[26px] text-gold-text tabular-nums">86</div>
      </div>
    </div>
  )
}

function useElapsed(active: boolean) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!active) {
      setSeconds(0)
      return
    }
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [active])
  return seconds
}

function CallingScreen({ localTick }: { localTick: number }) {
  const connected = localTick >= 1
  const transcriptShown = localTick >= 3
  const elapsed = useElapsed(connected)
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div>
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-rule">
        <span className="flex-shrink-0 w-[38px] h-[38px] rounded-full bg-gold-wash flex items-center justify-center">
          <PhoneCall size={17} className="text-gold-text" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-heading text-[15px] font-medium">Priya Venkatesh</div>
          <div className="neb-label leading-tight">Bridal enquiry · Anna Nagar</div>
        </div>
        <span className="font-mono text-[13px] text-gold-text tabular-nums flex-shrink-0">{mm}:{ss}</span>
      </div>

      {/* Waveform — reads as a live call, not a static icon */}
      <div className="flex items-center justify-center gap-[3px] h-[46px] mb-4">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className={`w-[3px] rounded-full ${connected ? 'bg-gold/60' : 'bg-white/10'}`}
            style={
              connected
                ? {
                    height: `${14 + Math.abs(Math.sin(i * 0.9)) * 26}px`,
                    animation: `pulse 1.1s ease-in-out ${(i % 6) * 0.09}s infinite`,
                  }
                : { height: '6px' }
            }
          />
        ))}
      </div>

      <div
        className={`transition-all duration-500 ${transcriptShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
      >
        <div className="bg-surface-2 border border-rule rounded-[14px] px-4 py-[13px] text-[13.5px] leading-[1.55] text-ink-2">
          &ldquo;Confirming Saturday 11am for the private viewing — I&rsquo;ll send the address on WhatsApp.&rdquo;
        </div>
      </div>
    </div>
  )
}

function OutreachScreen({ localTick }: { localTick: number }) {
  const rowsShown = Math.max(0, Math.min(localTick, OUTREACH_ROWS.length))
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pb-3 mb-1 border-b border-rule">
        <span className="neb-label">Sent at the same moment, different channels</span>
      </div>
      {OUTREACH_ROWS.map((row, i) => {
        const shown = i < rowsShown
        return (
          <div
            key={row.channel}
            className={`flex items-center justify-between gap-4 py-[13px] transition-all duration-400 ${
              i > 0 ? 'border-t border-rule' : ''
            } ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-gold-wash flex items-center justify-center">
                <row.icon size={13} className="text-gold-text" />
              </span>
              <div className="min-w-0">
                <div className="font-heading text-[14px] font-medium">{row.channel}</div>
                <div className="font-body text-[12.5px] text-muted truncate">{row.detail}</div>
              </div>
            </div>
            <StatusIndicator tone="active" label={row.state} pulse={false} />
          </div>
        )
      })}
    </div>
  )
}
