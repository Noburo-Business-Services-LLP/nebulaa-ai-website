'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Wordmark from '@/components/ui/Wordmark'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Button from '@/components/ui/Button'
import { trackCTAClick } from '@/lib/analytics/track'
import { waLink } from '@/lib/contact'

/**
 * Four words and a button. The old menu asked a visitor to understand the
 * product's architecture (Product, Core, Channels, Services, Resources, each
 * with a sub-menu) before deciding whether to care. Free tools, the blog,
 * comparisons and the rest live in the footer; their URLs are unchanged.
 */
const INDUSTRY_LINKS = [
  { name: 'Hotels & stays', href: '/for/hospitality' },
  { name: 'Jewellery & retail', href: '/for/jewellery-retail' },
  { name: 'Textiles & apparel', href: '/for/textile-apparel' },
  { name: 'Food & FMCG', href: '/for/fmcg-food' },
  { name: 'Financial services', href: '/for/financial-services' },
  { name: 'Real estate', href: '/for/real-estate' },
  { name: 'Furniture & appliances', href: '/for/furniture-appliances' },
  { name: 'Automobiles', href: '/for/automobiles' },
  { name: 'Industrial & B2B', href: '/for/industrial-b2b' },
]

const LINKS = [
  { label: 'How it works', href: '/product' },
  { label: 'Our work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  // The homepage and industry pages open on a dark hero, so the bar wears cream text until you scroll past it.
  const pathname = usePathname()
  const hasDarkHero = pathname === '/' || /^\/for\/[^/]+$/.test(pathname)
  const overHero = hasDarkHero && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wa = waLink()

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          overHero
            ? 'dark bg-transparent'
            : scrolled
            ? 'bg-ground/95 backdrop-blur-md border-b border-rule'
            : 'bg-ground/80 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between py-4 px-5 md:px-12 lg:px-[120px] gap-6">
          <Link href="/" className="flex-shrink-0" aria-label="Nebulaa home">
            <Wordmark className="hover:opacity-80 transition-opacity" />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-9 ml-4 mr-auto">
            <Link href="/product" className="font-body text-[14.5px] font-semibold text-ink-2 hover:text-ink transition-colors whitespace-nowrap">
              How it works
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-body text-[14.5px] font-semibold text-ink-2 hover:text-ink transition-colors whitespace-nowrap"
                aria-expanded={industriesOpen}
                onClick={() => setIndustriesOpen(o => !o)}
              >
                For your business
                <ChevronDown size={14} className={`transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 w-64"
                  >
                    <div className="bg-surface border border-rule rounded-2xl p-2 shadow-[0_18px_48px_rgba(20,32,58,0.14)]">
                      {INDUSTRY_LINKS.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3.5 py-2.5 rounded-xl font-body text-[14px] font-medium text-ink-2 hover:bg-gold-wash hover:text-ink transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.slice(1).map(l => (
              <Link key={l.href} href={l.href} className="font-body text-[14.5px] font-semibold text-ink-2 hover:text-ink transition-colors whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              href={wa}
              variant="whatsapp"
              size="sm"
              onClick={() => trackCTAClick('whatsapp', 'navbar_desktop')}
            >
              <WhatsAppIcon size={15} /> WhatsApp us
            </Button>
            <Button href="/pricing" variant="secondary" size="sm" onClick={() => trackCTAClick('start_free', 'navbar_desktop')}>
              Start free
            </Button>
          </div>

          <button
            className="md:hidden text-ink p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-0 z-40 bg-ground pt-20 px-5 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 pt-4">
              {[...LINKS.slice(0, 1), ...LINKS.slice(1)].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-[26px] text-ink py-2.5 border-b border-rule"
                >
                  {l.label}
                </Link>
              ))}
              <p className="neb-label mt-6 mb-2">For your business</p>
              {INDUSTRY_LINKS.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-[17px] font-medium text-ink-2 py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-24 pt-8 flex flex-col gap-3">
              <Button href={wa} variant="whatsapp" block onClick={() => { setMobileOpen(false); trackCTAClick('whatsapp', 'navbar_mobile') }}>
                <WhatsAppIcon size={16} /> WhatsApp us
              </Button>
              <Button href="/pricing" variant="secondary" block onClick={() => setMobileOpen(false)}>
                Start free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
