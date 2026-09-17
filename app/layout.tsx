import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import Schema from '@/components/ui/Schema'
import { organizationSchema } from '@/lib/orgFacts'
import SiteShell from '@/components/layout/SiteShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://nebulaa.ai'),
  title: {
    default: 'Nebulaa.ai — AI Marketing & Outreach Agents for Founders',
    template: '%s | Nebulaa.ai',
  },
  description: 'Two AI agents. Your entire GTM. Automated. Gravity posts, Pulsar calls. Built for Indian founders and SMBs. Start free — 100 credits, no card.',
  keywords: ['AI marketing automation India', 'AI outreach agent', 'GTM for startups', 'WhatsApp sales automation', 'AI sales agent SMB India'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nebulaa.ai — Your GTM Team Just Showed Up',
    description: 'Gravity posts. Pulsar calls. You close.',
    url: 'https://nebulaa.ai',
    siteName: 'Nebulaa.ai',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nebulaaai',
    title: 'Nebulaa.ai — AI Marketing & Outreach for Founders',
    description: 'Two AI agents. Your entire GTM. Automated.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <Schema data={organizationSchema()} />
      </head>
      <body className="bg-ground text-ink font-body antialiased selection:bg-gold/20 selection:text-gold">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
