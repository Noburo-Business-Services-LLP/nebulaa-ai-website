import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
