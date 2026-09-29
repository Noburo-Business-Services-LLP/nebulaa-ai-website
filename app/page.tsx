import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import ClientMarquee from '@/components/home/ClientMarquee'
import WorkWall from '@/components/home/WorkWall'
import WhatYouGet from '@/components/home/WhatYouGet'
import HowItWorks from '@/components/home/HowItWorks'
import Industries from '@/components/home/Industries'
import Fork from '@/components/home/Fork'
import Testimonials from '@/components/home/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Closing from '@/components/home/Closing'

const seoTitle = 'Marketing for Indian Businesses: Posts, New Customers and WhatsApp Replies'
const seoDescription =
  'Nebulaa keeps your page active, finds new customers and answers every WhatsApp enquiry within minutes. From ₹999 a month, or let our team run it for you.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

/**
 * Ten sections, in the order a visitor's questions come up: is this for me,
 * does it work, what do I get, how easy is it, is it for my kind of business,
 * how do I start, what does it cost, can I ask something, can I talk to you.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ClientMarquee />
      <WorkWall />
      <WhatYouGet />
      <HowItWorks />
      <Industries />
      <Fork />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Closing />
    </main>
  )
}
