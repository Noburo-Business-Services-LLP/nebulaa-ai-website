'use client'

import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { trackCTAClick } from '@/lib/analytics/track'
import { waLink } from '@/lib/contact'

/** Pinned to the bottom of every phone screen: the one thing we want a visitor to do. */
export default function WhatsAppBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 bg-gradient-to-t from-ground via-ground/95 to-transparent"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
    >
      <a
        href={waLink()}
        onClick={() => trackCTAClick('whatsapp', 'pinned_bar')}
        className="flex items-center justify-center gap-2.5 w-full rounded-full bg-wa text-white font-bold text-[15.5px] py-3.5 shadow-[0_8px_24px_rgba(31,168,85,0.38)] active:scale-[0.98] transition-transform"
      >
        <WhatsAppIcon size={18} /> Chat with us on WhatsApp
      </a>
    </div>
  )
}
