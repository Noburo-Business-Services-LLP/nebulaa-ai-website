'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X, Radar, MessageSquareText, Wrench, ScrollText, Building2, Scale, Layers } from 'lucide-react'

const GOLD_DOT_STYLE = {
  background:
    'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)',
}

const PRODUCT_LINKS = [
  { name: 'Overview', desc: 'Two agents, one engine underneath', href: '/product', icon: Layers },
  { name: 'Gravity', desc: 'Strategy, content, campaigns, creators, inbox, SEO', href: '/product/gravity', icon: Radar },
  { name: 'Pulsar', desc: 'WhatsApp, leads, broadcasts, voice, automation', href: '/product/pulsar', icon: MessageSquareText },
]

const RESOURCES_LINKS = [
  { name: 'Free tools', desc: '30 free generators and calculators, no signup', href: '/tools', icon: Wrench },
  { name: 'By industry', desc: 'How Gravity and Pulsar run per vertical', href: '/for', icon: Building2 },
  { name: 'Compare', desc: 'Nebulaa vs Buffer, Hootsuite, Jasper and more', href: '/compare', icon: Scale },
  { name: 'Playbook', desc: 'What we try, what the numbers say, what changes', href: '/blog', icon: ScrollText },
]

const MOBILE_LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Gravity', href: '/product/gravity' },
  { label: 'Pulsar', href: '/product/pulsar' },
  { label: 'Channels', href: '/channels' },
  { label: 'Services', href: '/services' },
  { label: 'Free tools', href: '/tools' },
  { label: 'By industry', href: '/for' },
  { label: 'Compare', href: '/compare' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Playbook', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-rule transition-all duration-300 ${
          scrolled ? 'bg-ground/95 backdrop-blur-lg' : 'bg-ground/80 backdrop-blur-sm'
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between py-7 px-6 md:px-12 lg:px-[120px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-light.png"
              alt="Nebulaa.ai"
              width={160}
              height={40}
              className="h-10 w-auto hover:opacity-80 transition-opacity dark:hidden"
              priority
              loading="eager"
            />
            <Image
              src="/images/logo-dark.png"
              alt=""
              aria-hidden="true"
              width={160}
              height={40}
              className="h-10 w-auto hover:opacity-80 transition-opacity brightness-110 hidden dark:block"
              priority
              loading="eager"
            />
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-[38px]">
            {/* Product dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-body text-sm text-muted hover:text-ink transition-colors"
                aria-expanded={productDropdownOpen}
              >
                Product
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${productDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {productDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-surface border border-rule-2 rounded-2xl overflow-hidden p-2"
                  >
                    {PRODUCT_LINKS.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2 border-l-2 border-transparent hover:border-l-brand-gold transition-all group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-gold-wash flex items-center justify-center flex-shrink-0">
                          <item.icon size={15} className="text-gold-text" />
                        </span>
                        <div>
                          <p className="font-body font-semibold text-sm text-ink group-hover:text-gold-text transition-colors">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-faint mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/channels"
              className="relative font-body text-sm text-muted hover:text-ink transition-colors group"
            >
              Channels
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="/services"
              className="relative font-body text-sm text-muted hover:text-ink transition-colors group"
            >
              Services
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            <a
              href="/pricing"
              className="relative font-body text-sm text-muted hover:text-ink transition-colors group"
            >
              Pricing
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-body text-sm text-muted hover:text-ink transition-colors"
                aria-expanded={resourcesDropdownOpen}
              >
                Resources
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {resourcesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-surface border border-rule-2 rounded-2xl overflow-hidden p-2"
                  >
                    {RESOURCES_LINKS.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-2 border-l-2 border-transparent hover:border-l-brand-gold transition-all group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-gold-wash flex items-center justify-center flex-shrink-0">
                          <item.icon size={15} className="text-gold-text" />
                        </span>
                        <div>
                          <p className="font-body font-semibold text-sm text-ink group-hover:text-gold-text transition-colors">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-faint mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3.5">
            <a href="#" className="font-body text-sm text-muted hover:text-ink transition-colors">
              Sign in
            </a>
            <a
              href="/pricing"
              className="font-body text-sm font-semibold bg-brand-gold text-brand-black rounded-full px-[22px] py-[11px] shadow-[0_4px_18px_rgba(245,166,35,0.20)] hover:bg-brand-gold-dim transition-all"
            >
              Start free
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-ink"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ground pt-16 px-6 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-5 pt-8">
              {MOBILE_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 font-heading text-2xl text-ink hover:text-gold-text transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-4 h-4 rounded-full flex-shrink-0" style={GOLD_DOT_STYLE} />
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto pb-10 pt-8 flex flex-col gap-3 border-t border-rule-2">
              <a
                href="#"
                className="font-body text-sm text-muted border border-rule-2 rounded-full px-5 py-3.5 text-center hover:border-gold hover:text-ink transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </a>
              <a
                href="/pricing"
                className="font-body text-sm font-semibold bg-brand-gold text-brand-black rounded-full px-5 py-3.5 text-center hover:bg-brand-gold-dim transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Start free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
