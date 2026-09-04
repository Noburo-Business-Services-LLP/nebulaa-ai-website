'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-brand-black/95 backdrop-blur-lg shadow-sm dark:shadow-none dark:border-b dark:border-white/5'
            : 'bg-white/80 dark:bg-brand-black/80 backdrop-blur-sm border-b border-brand-border dark:border-white/10'
        }`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo — bigger */}
          <a href="#" className="flex-shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="Nebulaa.ai"
              width={160}
              height={40}
              className="h-10 w-auto hover:opacity-80 transition-opacity dark:brightness-110"
              priority
              loading="eager"
            />
          </a>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-7">
            {/* Product dropdown */}
            <div className="relative" onMouseEnter={() => setProductDropdownOpen(true)} onMouseLeave={() => setProductDropdownOpen(false)}>
              <button className="flex items-center gap-1 font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-text dark:hover:text-white transition-colors">
                Product
                <ChevronDown size={14} className={`transition-transform duration-200 ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/10 rounded-2xl shadow-card dark:shadow-none overflow-hidden p-2"
                  >
                    {[
                      { icon: '🌀', name: 'Gravity', desc: 'AI Marketing Engine — posts, schedules, tracks rivals', href: '#gravity' },
                      { icon: '📞', name: 'Pulsar', desc: 'AI Outreach Engine — calls, WhatsApp, email sequences', href: '#pulsar' },
                    ].map(item => (
                      <a key={item.name} href={item.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-warm-gray dark:hover:bg-white/5 border-l-2 border-transparent hover:border-l-brand-gold transition-all group">
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-body font-semibold text-sm text-brand-text dark:text-white/90 group-hover:text-brand-gold transition-colors">{item.name}</p>
                          <p className="font-body text-xs text-brand-muted dark:text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button className="flex items-center gap-1 font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-text dark:hover:text-white transition-colors">
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/10 rounded-2xl shadow-card dark:shadow-none overflow-hidden p-2"
                  >
                    {[
                      { icon: '🏢', name: 'Enterprise', desc: 'Managed marketing for established brands', href: '/services/enterprise' },
                      { icon: '🏪', name: 'MSME', desc: 'Your outsourced marketing team, AI-accelerated', href: '/services/msme' },
                    ].map(item => (
                      <Link key={item.name} href={item.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-warm-gray dark:hover:bg-white/5 border-l-2 border-transparent hover:border-l-brand-gold transition-all group">
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-body font-semibold text-sm text-brand-text dark:text-white/90 group-hover:text-brand-gold transition-colors">{item.name}</p>
                          <p className="font-body text-xs text-brand-muted dark:text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {['How It Works', 'Pricing', 'Tools', 'Blog'].map(link => {
              const href = link === 'Tools' ? '/tools' : `#${link.toLowerCase().replace(/ /g, '-')}`
              return (
                <a key={link} href={href} className="relative font-body text-sm text-brand-muted dark:text-white/60 hover:text-brand-text dark:hover:text-white transition-colors group">
                  {link}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
                </a>
              )
            })}
          </div>

          {/* Right CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="font-body text-sm text-brand-muted dark:text-white/60 border border-brand-border dark:border-white/10 rounded-full px-5 py-2 hover:border-brand-gold hover:text-brand-text dark:hover:text-white dark:hover:border-brand-gold transition-all">
              Book a Demo
            </a>
            <a href="#" className="font-body text-sm font-semibold bg-brand-gold text-brand-black rounded-full px-5 py-2 hover:bg-brand-gold-dim transition-all animate-pulse-gold">
              Start Free Trial →
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button className="text-brand-text dark:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="fixed inset-0 z-40 bg-white dark:bg-brand-black pt-16 px-6 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-5 pt-8">
              {[
                { label: '🌀 Gravity', href: '#gravity' },
                { label: '📞 Pulsar', href: '#pulsar' },
                { label: '🏢 Enterprise Services', href: '/services/enterprise' },
                { label: '🏪 MSME Services', href: '/services/msme' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Pricing', href: '#pricing' },
                { label: '🛠 Free Tools', href: '/tools' },
                { label: 'Blog', href: '#blog' },
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-heading text-2xl text-brand-text dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto pb-10 pt-8 flex flex-col gap-3 border-t border-brand-border dark:border-white/10">
              <a href="#" className="font-body text-sm text-brand-muted dark:text-white/60 border border-brand-border dark:border-white/10 rounded-full px-5 py-3.5 text-center hover:border-brand-gold transition-all" onClick={() => setMobileOpen(false)}>
                Book a Demo
              </a>
              <a href="#" className="font-body text-sm font-semibold bg-brand-gold text-brand-black rounded-full px-5 py-3.5 text-center hover:bg-brand-gold-dim transition-all" onClick={() => setMobileOpen(false)}>
                Start Free Trial →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
