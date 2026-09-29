'use client'

import Link from 'next/link'
import Wordmark from '@/components/ui/Wordmark'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Button from '@/components/ui/Button'
import { waLink, WHATSAPP_DISPLAY } from '@/lib/contact'

const COLUMNS = [
  {
    title: 'How it works',
    links: [
      { name: 'Overview', href: '/product' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Our work', href: '/work' },
      { name: 'Channels we post on', href: '/channels' },
    ],
  },
  {
    title: 'For your business',
    links: [
      { name: 'Hotels & stays', href: '/for/hospitality' },
      { name: 'Jewellery & retail', href: '/for/jewellery-retail' },
      { name: 'Textiles & apparel', href: '/for/textile-apparel' },
      { name: 'All industries', href: '/for' },
    ],
  },
  {
    title: 'Done for you',
    links: [
      { name: 'Managed services', href: '/services' },
      { name: 'Engagements', href: '/work' },
    ],
  },
  {
    title: 'Free',
    links: [
      { name: '30 free tools', href: '/tools' },
      { name: 'Downloads', href: '/resources' },
      { name: 'Compare', href: '/compare' },
      { name: 'Blog', href: '/blog' },
    ],
  },
]

/** A warm, light footer that matches the page above it. */
export default function Footer() {
  return (
    <footer className="bg-surface-2 text-ink border-t border-rule pt-[64px] pb-28 md:pb-12 px-5 md:px-12 lg:px-[120px]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 justify-between">
        <div className="max-w-[340px]">
          <Wordmark size="lg" className="mb-5" />
          <p className="neb-display text-[26px] leading-[1.02] mb-5">
            Your business deserves to <span className="script-accent text-[1.15em]">be seen.</span>
          </p>
          <p className="font-body text-[14px] text-muted leading-[1.7] mb-6">
            Chennai, India
            <br />
            <a href="mailto:hello@nebulaa.ai" className="hover:text-ink transition-colors">hello@nebulaa.ai</a>
            <br />
            {WHATSAPP_DISPLAY}
          </p>
          <Button href={waLink()} variant="whatsapp" size="md">
            <WhatsAppIcon size={16} /> WhatsApp us
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-10 flex-1 max-w-[760px]">
          {COLUMNS.map(col => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="neb-label mb-1">{col.title}</span>
              {col.links.map(l => (
                <Link key={l.name} href={l.href} className="font-body text-[14px] text-ink-2 hover:text-ink transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="font-body text-[12px] text-muted">&copy; 2026 Nebulaa. All rights reserved.</span>
        <span className="neb-label text-[10.5px] tracking-[0.2em]">Strategy · Content · Reach · Enquiries</span>
        <div className="flex items-center gap-5">
          <Link href="/facts" className="font-body text-[12px] text-muted hover:text-ink transition-colors">Facts</Link>
          <Link href="/privacy-policy" className="font-body text-[12px] text-muted hover:text-ink transition-colors">Privacy</Link>
          <Link href="/terms" className="font-body text-[12px] text-muted hover:text-ink transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
