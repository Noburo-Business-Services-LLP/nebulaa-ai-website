import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'

const seoTitle = 'Pricing — Nebulaa'
const seoDescription =
  'Gravity from ₹10,000/month, Pulsar ₹15,000, both agents ₹20,000. Managed services are scoped per engagement.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

/** The two ways to buy. Software is priced openly; services are scoped, never listed. */
const models = [
  {
    label: 'The software',
    title: 'You run it',
    body: 'Gravity and Pulsar, self-serve. Set up in an afternoon, approve from your phone, cancel the month it stops earning its keep.',
    points: [
      'Priced openly — from ₹10,000/month',
      '7-day free trial, no card',
      'Live the same week',
      'Cancel anytime',
    ],
    cta: { label: 'See the plans', href: '#plans' },
    highlight: false,
  },
  {
    label: 'The team',
    title: 'We run it',
    body: 'Strategy, content, production, campaigns and on-ground activation, handled end to end by our team — running on the same two agents.',
    points: [
      'Scoped per engagement, quoted after a call',
      'Media spend and creator fees billed at actuals',
      'Monthly reporting against agreed targets',
      'Volumes agreed up front, in writing',
    ],
    cta: { label: 'Talk to us', href: '/services' },
    highlight: true,
  },
]

export default function PricingPage() {
  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[80px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Pricing</SectionLabel>
        <h1 className="font-heading font-medium text-[40px] md:text-[60px] leading-[1.08] tracking-[-0.02em] mb-[26px]" style={{ textWrap: 'pretty' }}>
          Two ways to buy.{' '}
          <span className="italic text-gold-display">One engine underneath.</span>
        </h1>
        <p className="text-[17.5px] leading-[1.65] text-muted max-w-[620px]">
          Run the software yourself, or have our team run the whole marketing function for you. The
          agents are the same either way — the difference is whose evening it takes.
        </p>
      </section>

      {/* The fork */}
      <section className="px-6 md:px-12 lg:px-[120px] pb-[100px]">
        <div className="grid md:grid-cols-2 gap-6">
          {models.map((m) => (
            <div
              key={m.label}
              className={`rounded-[20px] px-6 md:px-[42px] pt-[44px] pb-11 ${
                m.highlight
                  ? 'bg-surface border border-gold/[0.28]'
                  : 'bg-surface border border-rule'
              }`}
            >
              <SectionLabel tone={m.highlight ? 'gold' : 'muted'} className="mb-[22px] block">
                {m.label}
              </SectionLabel>
              <h2 className="font-heading text-[30px] md:text-[34px] font-medium tracking-[-0.015em] mb-3.5">
                {m.title}
              </h2>
              <p className="font-body text-[15.5px] leading-[1.68] text-muted mb-8">{m.body}</p>
              <div className="flex flex-col gap-3 mb-9">
                {m.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-2.5">
                    <Check size={15} className="text-gold-text flex-shrink-0 mt-[3px]" />
                    <span className="text-[14.5px] leading-[1.55] text-ink-2">{pt}</span>
                  </div>
                ))}
              </div>
              <Link
                href={m.cta.href}
                className={`inline-flex items-center gap-2 text-[14.5px] font-semibold px-[26px] py-[14px] rounded-full transition-colors ${
                  m.highlight
                    ? 'border border-rule-2 text-ink-2 hover:border-gold hover:text-gold-text'
                    : 'bg-gold text-[#1A1208] hover:brightness-105'
                }`}
              >
                {m.cta.label} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Software plans + the cost comparison */}
      <div id="plans">
        <Pricing />
      </div>

      <hr className="border-t border-rule" />

      {/* Services pricing — explained, not listed */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[680px]">
          <SectionLabel className="mb-[22px] block">Managed services</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[46px] leading-[1.12] tracking-[-0.02em] mb-5">
            Why there&apos;s no price on this page.
          </h2>
          <p className="text-[16.5px] leading-[1.68] text-muted mb-5">
            A single-city content engagement and a 24-store regional programme are not the same job,
            and pricing them the same way would mean overcharging one of them. So we scope first:
            which markets, which channels, how much on-ground activity, what volumes per month.
          </p>
          <p className="text-[16.5px] leading-[1.68] text-muted mb-9">
            You get a written scope with the monthly volumes agreed up front, a retainer that covers
            the work, and media spend and creator fees billed separately at actuals — never marked up,
            never quietly absorbed into the retainer.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:brightness-105 transition"
          >
            See what we deliver <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <hr className="border-t border-rule" />

      <FAQ />
    </main>
  )
}
