'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import NewsletterPopup from '@/components/ui/NewsletterPopup'
import CookieConsent from '@/components/ui/CookieConsent'
import AnalyticsTracker from '@/components/ui/AnalyticsTracker'

type Theme = 'light' | 'dark'

interface ThemeCtxType { theme: Theme; toggle: () => void }
const ThemeCtx = createContext<ThemeCtxType>({ theme: 'dark', toggle: () => {} })

export function useTheme() { return useContext(ThemeCtx) }

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('nebulaa-theme') as Theme

    if (saved === 'dark' || saved === 'light') {
      // Respect explicit user choice
      setTheme(saved)
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('nebulaa-theme', theme)
  }, [theme, mounted])

  // Also listen for system-level changes (only if user hasn't saved a preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('nebulaa-theme')
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      {children}
      <AnalyticsTracker />
      <NewsletterPopup />
      <CookieConsent />
    </ThemeCtx.Provider>
  )
}
