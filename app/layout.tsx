import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import Schema from '@/components/ui/Schema'
import { organizationSchema } from '@/lib/orgFacts'
import SiteShell from '@/components/layout/SiteShell'
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts'
import { analyticsConfig, hasGTM } from '@/lib/analytics/config'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nebulaa.ai'),
  title: {
    default: 'Nebulaa — The AI Operating System for Business',
    template: '%s | Nebulaa',
  },
  description:
    'Nebulaa runs Gravity, Orbit and Pulsar on one core — understanding your business, executing the work, and learning from what happens next.',
  keywords: [
    'AI operating system for business',
    'autonomous AI agents',
    'AI content engine',
    'AI lead generation engine',
    'AI outreach engine',
    'cross-agent intelligence',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nebulaa — The AI Operating System for Business',
    description:
      'Give us a URL. Nebulaa understands the business, activates the engines, executes the work and learns from what happens.',
    url: 'https://www.nebulaa.ai',
    siteName: 'Nebulaa',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nebulaaai',
    title: 'Nebulaa — The AI Operating System for Business',
    description: 'Gravity creates. Orbit finds. Pulsar engages. Core learns.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Orbitron:wght@500;600;700;800&display=swap" rel="stylesheet" />
        <Schema data={organizationSchema()} />
        <AnalyticsScripts />
      </head>
      <body className="bg-ground text-ink font-body antialiased selection:bg-gold/20 selection:text-gold">
        {hasGTM() && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${analyticsConfig.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
