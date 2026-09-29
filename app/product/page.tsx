import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Brain } from 'lucide-react'
import { agents, capabilitiesFor } from '@/lib/productData'
import { waLink } from '@/lib/contact'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import HowItWorks from '@/components/home/HowItWorks'
import Fork from '@/components/home/Fork'

const seoTitle = 'How Nebulaa Works'
const seoDescription =
  'Share your website and Nebulaa plans your posts, finds new customers and answers your WhatsApp enquiries. You approve everything on your phone.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

const AREAS = [
  { id: 'gravity' as const, title: 'Content and social media', line: 'A month of posts, carousels and reels, planned and written for you.', tint: 'bg-peach' },
  { id: 'orbit' as const, title: 'Finding new customers', line: 'Nearby businesses who might buy from you, found and checked before you call.', tint: 'bg-sky' },
  { id: 'pulsar' as const, title: 'Answering enquiries', line: 'WhatsApp, email and SMS replied to in minutes, at any hour.', tint: 'bg-mint' },
]

export default function ProductPage() {
  return (
    <main className="text-ink min-h-screen">
      <section className="px-5 md:px-12 lg:px-[120px] pt-[130px] pb-14 max-w-[960px]">
        <SectionLabel className="mb-5 block">How it works</SectionLabel>
        <h1 className="neb-display text-[44px] md:text-[80px] mb-6">
          Give us your website. <span className="text-gold-display">We handle the rest.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-ink-2 max-w-[600px] mb-8">
          Nebulaa plans your posts, finds new customers and answers your enquiries. You approve everything
          on your phone, and nothing goes out without your yes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={waLink()} variant="whatsapp" size="lg">
            <WhatsAppIcon size={18} /> WhatsApp us
          </Button>
          <Button href="/pricing" variant="secondary" size="lg">See the plans <ArrowRight size={16} /></Button>
        </div>
      </section>

      <HowItWorks />

      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px]">
        <SectionLabel className="mb-4 block">What is inside</SectionLabel>
        <h2 className="neb-display text-[34px] md:text-[52px] mb-10 max-w-[760px]">
          Three jobs, <span className="text-gold-display">done for you.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {AREAS.map(a => {
            const agent = agents[a.id]
            const caps = capabilitiesFor(a.id)
            return (
              <div key={a.id} className={`rounded-[26px] ${a.tint} p-7 flex flex-col`}>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-2 mb-3">{agent.name}</p>
                <h3 className="font-heading text-[24px] leading-[1.15] mb-3">{a.title}</h3>
                <p className="text-[15.5px] leading-[1.55] text-ink-2 mb-5">{a.line}</p>
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {caps.slice(0, 6).map(c => (
                    <span key={c.slug} className="text-[12px] font-semibold bg-surface/70 rounded-full px-3 py-1">{c.name}</span>
                  ))}
                  {caps.length > 6 && <span className="text-[12px] text-ink-2 px-2 py-1">+{caps.length - 6} more</span>}
                </div>
                <Link href={`/product/${a.id}`} className="mt-auto inline-flex items-center gap-2 text-[14.5px] font-bold hover:gap-3 transition-all">
                  See what it does <ArrowRight size={15} />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="rounded-[22px] border border-rule bg-surface p-6 flex items-start gap-4">
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-gold-wash flex items-center justify-center"><ShieldCheck size={20} className="text-ink" /></span>
            <div>
              <h3 className="font-heading text-[18px] mb-1">You stay in control</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2">Every post and reply waits for your approval, or runs on rules you set. Nothing surprises you.</p>
            </div>
          </div>
          <Link href="/product/core" className="rounded-[22px] border border-rule bg-surface p-6 flex items-start gap-4 hover:border-gold transition-colors">
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-gold-wash flex items-center justify-center"><Brain size={20} className="text-ink" /></span>
            <div>
              <h3 className="font-heading text-[18px] mb-1">It gets better every week</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2">What worked and what didn&apos;t feeds the next month&apos;s plan. See how it learns →</p>
            </div>
          </Link>
        </div>
      </section>

      <Fork />
    </main>
  )
}
