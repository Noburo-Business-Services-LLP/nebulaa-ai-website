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
 * underneath is the fallback: it already looks like a sunset, so the section
 * is full and warm before any video is uploaded, and the video simply plays
 * over it once it is.
 */
export default function Hero() {
  return (
    <section className="dark relative isolate overflow-hidden bg-ground text-ink min-h-[680px] md:min-h-[760px] flex flex-col">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_85%_100%,#EE6330_0%,rgba(238,99,48,0)_60%),radial-gradient(70%_60%_at_100%_0%,#F5A623_0%,rgba(245,166,35,0)_55%),linear-gradient(160deg,#14203A_0%,#1F2A55_55%,#4A2F4F_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <MediaSlot id="hero-video" ratio="auto" bare priority className="!h-full !rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14203A]/90 via-[#14203A]/55 to-[#14203A]/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#14203A]/70 to-transparent" />
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
