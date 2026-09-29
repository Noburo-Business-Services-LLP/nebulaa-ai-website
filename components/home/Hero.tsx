'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import MediaSlot from '@/components/ui/MediaSlot'
import { trackCTAClick } from '@/lib/analytics/track'
import { waLink } from '@/lib/contact'

const CLIENTS = ['Gandhimathi Jewellers', 'JKR Tex', 'TNV Chits']

/**
 * A full-width video hero with the headline laid over it. The gradient
 * underneath is the fallback: a soft sunrise glow, so the section
 * is full and warm before any video is uploaded, and the video simply plays
 * over it once it is.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ground text-ink min-h-[640px] md:min-h-[720px] flex flex-col">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(60%_80%_at_92%_8%,rgba(255,203,46,0.55)_0%,rgba(255,203,46,0)_62%),radial-gradient(55%_70%_at_100%_100%,rgba(238,99,48,0.26)_0%,rgba(238,99,48,0)_66%),linear-gradient(180deg,#FBF5EA_0%,#FFEBD6_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <MediaSlot id="hero-video" ratio="auto" bare priority className="!h-full !rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBF5EA]/95 via-[#FBF5EA]/70 to-[#FBF5EA]/5" />
      </div>

      <div className="relative flex-1 flex items-center pt-[120px] md:pt-[130px] pb-12 px-5 md:px-12 lg:px-[120px]">
        <div className="max-w-[760px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neb-label block mb-5"
          >
            For hotels, shops, showrooms and small businesses
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="neb-display text-[48px] sm:text-[68px] lg:text-[92px] mb-6"
          >
            Your business deserves
            <br />
            to <span className="script-accent text-[1.12em] leading-none">be seen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-[17px] sm:text-[20px] leading-[1.55] text-ink-2 max-w-[560px] mb-8"
          >
            Customers look you up before they call. We keep your page active, find new customers and
            answer every WhatsApp enquiry within minutes, so you don&apos;t lose them to the next name on
            the list.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <Button href={waLink()} variant="whatsapp" size="lg" onClick={() => trackCTAClick('whatsapp', 'hero')}>
              <WhatsAppIcon size={18} /> WhatsApp us
            </Button>
            <Button href="/pricing" variant="secondary" size="lg" onClick={() => trackCTAClick('start_free', 'hero')}>
              Start free for 7 days <ArrowRight size={16} />
            </Button>
          </motion.div>

          <p className="text-[13.5px] text-ink-2/80">From ₹999 a month · No card to start · Set up in a day</p>
        </div>
      </div>

      <div className="relative px-5 md:px-12 lg:px-[120px] pb-8">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 pt-5 border-t border-rule">
          <span className="neb-label">Working with</span>
          {CLIENTS.map(c => (
            <span key={c} className="font-heading text-[15px] text-ink">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
