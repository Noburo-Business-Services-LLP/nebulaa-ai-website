'use client'

import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import MediaSlot from '@/components/ui/MediaSlot'
import { trackCTAClick } from '@/lib/analytics/track'
import { waLink } from '@/lib/contact'

/**
 * The page's last word, as a rounded card that sits inside the page rather
 * than a full-bleed block that ends it. A warm sunrise gradient is the
 * fallback; the closing photo covers it once uploaded.
 */
export default function Closing() {
  return (
    <section className="px-5 md:px-12 lg:px-[120px] py-10 md:py-16">
      <div className="relative isolate overflow-hidden rounded-[32px] md:rounded-[40px] bg-ground text-ink border border-rule">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(60%_90%_at_95%_0%,rgba(255,203,46,0.6)_0%,rgba(255,203,46,0)_62%),radial-gradient(60%_80%_at_100%_100%,rgba(238,99,48,0.3)_0%,rgba(238,99,48,0)_66%),linear-gradient(160deg,#FFF3E0_0%,#FFE2C4_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <MediaSlot id="closing-photo" ratio="auto" bare className="!h-full !rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF3E0]/92 via-[#FFF3E0]/60 to-transparent" />
        </div>
        <div className="relative py-14 md:py-20 px-7 md:px-14 max-w-[820px]">
          <h2 className="neb-display text-[40px] md:text-[68px] mb-5">
            Let&apos;s talk about
            <br />
            <span className="script-accent text-[1.15em] leading-none">your business.</span>
          </h2>
          <p className="text-[17px] md:text-[18px] leading-[1.6] text-ink-2 max-w-[500px] mb-8">
            Tell us what you sell and where. We&apos;ll tell you what we&apos;d do, and what it costs. Twenty minutes, no pitch deck.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button href={waLink()} variant="whatsapp" size="lg" onClick={() => trackCTAClick('whatsapp', 'closing')}>
              <WhatsAppIcon size={18} /> WhatsApp us
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">See the plans</Button>
          </div>
          <span className="neb-label tracking-[0.22em]">Strategy · Content · Reach · Enquiries</span>
        </div>
      </div>
    </section>
  )
}
