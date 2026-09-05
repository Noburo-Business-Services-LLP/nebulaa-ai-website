'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const GOLD_DOT_STYLE = {
  background:
    'radial-gradient(circle at 34% 32%, #FFD48A 0%, #F5A623 46%, #A4650B 100%)',
}

const PRODUCT_LINKS = [
  { name: 'Gravity', desc: 'AI Marketing Engine — posts, schedules, tracks rivals', href: '#gravity' },
  { name: 'Pulsar', desc: 'AI Outreach Engine — calls, WhatsApp, email sequences', href: '#pulsar' },
]

const SERVICES_LINKS = [
  { name: 'Enterprise', desc: 'Managed marketing for established brands', href: '/services/enterprise' },
  { name: 'MSME', desc: 'Your outsourced marketing team, AI-accelerated', href: '/services/msme' },
]

const MOBILE_LINKS = [
  { label: 'Gravity', href: '#gravity' },
  { label: 'Pulsar', href: '#pulsar' },
  { label: 'Enterprise', href: '/services/enterprise' },
  { label: 'MSME', href: '/services/msme' },
  { label: 'Free tools', href: '/tools' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Journal', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 60))
    return unsub
  }, [scrollY])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] transition-all duration-300 ${
          scrolled ? 'bg-brand-black/95 backdrop-blur-lg' : 'bg-brand-black/80 backdrop-blur-sm'
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between py-7 px-6 md:px-12 lg:px-[120px]">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="Nebulaa.ai"
              width={160}
              height={40}
              className="h-10 w-auto hover:opacity-80 transition-opacity brightness-110"
              priority
              loading="eager"
            />
          </a>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-[38px]">
            {/* Product dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductDropdownOpen(true)}
              onMouseLeave={() => setProductDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-body text-sm text-white/55 hover:text-white transition-colors"
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
                    className="absolute top-full left-0 mt-2 w-64 bg-[#1A1815] border border-white/10 rounded-2xl overflow-hidden p-2"
                  >
                    {PRODUCT_LINKS.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border-l-2 border-transparent hover:border-l-brand-gold transition-all group"
                      >
                        <span className="w-5 h-5 rounded-full mt-0.5 flex-shrink-0" style={GOLD_DOT_STYLE} />
                        <div>
                          <p className="font-body font-semibold text-sm text-white/90 group-hover:text-brand-gold transition-colors">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-body text-sm text-white/55 hover:text-white transition-colors"
                aria-expanded={servicesDropdownOpen}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#1A1815] border border-white/10 rounded-2xl overflow-hidden p-2"
                  >
                    {SERVICES_LINKS.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border-l-2 border-transparent hover:border-l-brand-gold transition-all group"
                      >
                        <span className="w-5 h-5 rounded-full mt-0.5 flex-shrink-0" style={GOLD_DOT_STYLE} />
                        <div>
                          <p className="font-body font-semibold text-sm text-white/90 group-hover:text-brand-gold transition-colors">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/tools"
              className="relative font-body text-sm text-white/55 hover:text-white transition-colors group"
            >
              Free tools
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
            </Link>
            <a
              href="#pricing"
              className="relative font-body text-sm text-white/55 hover:text-white transition-colors group"
            >
              Pricing
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
            </a>
            <Link
              href="/blog"
              className="relative font-body text-sm text-white/55 hover:text-white transition-colors group"
            >
              Journal
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Right CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3.5">
            <a href="#" className="font-body text-sm text-white/55 hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="#pricing"
              className="font-body text-sm font-semibold bg-brand-gold text-brand-black rounded-full px-[22px] py-[11px] shadow-[0_4px_18px_rgba(245,166,35,0.20)] hover:bg-brand-gold-dim transition-all"
            >
              Start free
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-white"
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
            className="fixed inset-0 z-40 bg-brand-black pt-16 px-6 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-5 pt-8">
              {MOBILE_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 font-heading text-2xl text-white hover:text-brand-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-4 h-4 rounded-full flex-shrink-0" style={GOLD_DOT_STYLE} />
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto pb-10 pt-8 flex flex-col gap-3 border-t border-white/10">
              <a
                href="#"
                className="font-body text-sm text-white/55 border border-white/10 rounded-full px-5 py-3.5 text-center hover:border-brand-gold hover:text-white transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </a>
              <a
                href="#pricing"
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
