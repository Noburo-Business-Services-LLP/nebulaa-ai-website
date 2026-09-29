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
 * The hook is the brochure's line, not a product description: name the owner,
 * name the outcome, and put two buttons under it. A real reel plays in the
 * phone; until one is uploaded the frame shows a soft placeholder.
 */
export default function Hero() {
  return (
    <section className="relative pt-[120px] md:pt-[140px] pb-14 px-5 md:px-12 lg:px-[120px] overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-sun/30 blur-[90px] pointer-events-none" aria-hidden="true" />
      <div className="relative grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neb-label neb-label-gold block mb-5"
          >
            For hotels, shops, showrooms and small businesses
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="neb-display text-[46px] sm:text-[64px] lg:text-[84px] mb-6"
          >
            Your business deserves
            <br />
            to <span className="script-accent text-[1.12em] leading-none">be seen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-[17px] sm:text-[19px] leading-[1.6] text-ink-2 max-w-[540px] mb-8"
          >
            Customers look you up before they call. We keep your page active, find new customers and
            answer every WhatsApp enquiry within minutes, so you don&apos;t lose them to the next name on
            the list.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap items-center gap-3 mb-7"
          >
            <Button href={waLink()} variant="whatsapp" size="lg" onClick={() => trackCTAClick('whatsapp', 'hero')}>
              <WhatsAppIcon size={18} /> WhatsApp us
            </Button>
            <Button href="/pricing" variant="secondary" size="lg" onClick={() => trackCTAClick('start_free', 'hero')}>
              Start free for 7 days <ArrowRight size={16} />
            </Button>
          </motion.div>

          <p className="text-[13px] text-muted mb-8">From ₹999 a month · No card to start · Set up in a day</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-rule">
            <span className="neb-label text-muted">Working with</span>
            {CLIENTS.map(c => (
              <span key={c} className="font-heading text-[15px] text-ink-2">{c}</span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-[250px] sm:w-[290px]">
            <div className="absolute -inset-3 rounded-[46px] bg-gradient-to-br from-sun via-gold to-coral opacity-70 blur-[2px] rotate-[4deg]" aria-hidden="true" />
            <div className="relative rounded-[38px] border-[7px] border-ink bg-ink overflow-hidden shadow-[0_24px_60px_rgba(20,32,58,0.3)]">
              <MediaSlot id="hero-video" ratio="9 / 19" compact priority />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
