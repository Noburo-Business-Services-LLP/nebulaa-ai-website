'use client'

import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import MediaSlot from '@/components/ui/MediaSlot'
import { trackCTAClick } from '@/lib/analytics/track'
import { waLink } from '@/lib/contact'

/** A navy chapter over a sunset photo, ending the page the way the brochures end. */
export default function Closing() {
  return (
    <section className="dark relative bg-ground text-ink overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <MediaSlot id="closing-photo" ratio="16 / 9" compact className="!h-full !aspect-auto min-h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/85 to-ground/30" />
      </div>
      <div className="relative py-[88px] md:py-[120px] px-5 md:px-12 lg:px-[120px] max-w-[900px]">
        <h2 className="neb-display text-[44px] md:text-[76px] mb-6">
          Let&apos;s talk about
          <br />
          <span className="script-accent text-[1.15em] leading-none">your business.</span>
        </h2>
        <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[520px] mb-8">
          Tell us what you sell and where. We&apos;ll tell you what we&apos;d do, and what it costs. Twenty minutes, no pitch deck.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Button href={waLink()} variant="whatsapp" size="lg" onClick={() => trackCTAClick('whatsapp', 'closing')}>
            <WhatsAppIcon size={18} /> WhatsApp us
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">See the plans</Button>
        </div>
        <span className="neb-label tracking-[0.22em]">Strategy · Content · Reach · Enquiries</span>
      </div>
    </section>
  )
}
