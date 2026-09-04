'use client'

import NewsletterPopup from '@/components/ui/NewsletterPopup'
import CookieConsent from '@/components/ui/CookieConsent'
import AnalyticsTracker from '@/components/ui/AnalyticsTracker'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AnalyticsTracker />
      <NewsletterPopup />
      <CookieConsent />
    </>
  )
}
