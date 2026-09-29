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
    default: 'Nebulaa: Marketing for Indian Businesses',
    template: '%s | Nebulaa',
  },
  description:
    'Nebulaa keeps your page active, finds new customers and answers every WhatsApp enquiry within minutes. From ₹999 a month, or let our team run it for you.',
  keywords: [
    'marketing for Indian businesses',
    'social media marketing India',
    'WhatsApp marketing',
    'WhatsApp enquiry replies',
    'lead generation for small business',
    'AI marketing for small business',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nebulaa: Marketing for Indian Businesses',
    description:
      'Give us your website address. Nebulaa plans and posts your content, finds new customers and replies to WhatsApp enquiries.',
    url: 'https://www.nebulaa.ai',
    siteName: 'Nebulaa',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nebulaaai',
    title: 'Nebulaa: Marketing for Indian Businesses',
    description: 'Posts, new customers and WhatsApp replies for your business, from ₹999 a month.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Kaushan+Script&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <Schema data={organizationSchema()} />
        <AnalyticsScripts />
      </head>
      <body className="bg-ground text-ink font-body antialiased selection:bg-sun/60 selection:text-ink">
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
