import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import SiteShell from '@/components/layout/SiteShell'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

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
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Nebulaa.ai',
              applicationCategory: 'BusinessApplication',
              description: 'Agentic AI for marketing and outreach. Built for Indian founders and SMBs.',
              url: 'https://nebulaa.ai',
              offers: { '@type': 'Offer', price: '10000', priceCurrency: 'INR' },
            }),
          }}
        />
      </head>
      <body className="bg-white dark:bg-brand-black text-brand-text dark:text-white font-body antialiased">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
