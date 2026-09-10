import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/lib/industryData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'Nebulaa by Industry — AI Marketing for Every Vertical'
const seoDescription =
  'How Gravity and Pulsar run for jewellery & retail, textile & apparel, financial services, FMCG & food, and industrial & B2B brands.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function IndustriesHubPage() {
  const list = Object.values(industries)

  return (
    <main className="bg-[#0A0A0A] text-[#F5F4F1] min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[820px]">
        <SectionLabel className="mb-[26px] block">By industry</SectionLabel>
        <h1 className="font-heading font-medium text-[38px] md:text-[58px] leading-[1.1] tracking-[-0.02em] mb-[26px]">
          Every industry sells <span className="italic text-brand-gold">differently.</span>
        </h1>
        <p className="text-[17px] leading-[1.65] text-white/55 max-w-[620px]">
          A jewellery brand sells on trust built over decades. A snack brand entering a new city needs
          demand waiting before launch. Gravity and Pulsar adapt to how your business actually sells —
          here&apos;s what that looks like for each one we run today.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[130px]">
        <div className="grid sm:grid-cols-2 gap-5">
          {list.map((ind) => (
            <Link
              key={ind.slug}
              href={`/for/${ind.slug}`}
              className="group block bg-[#151515] border border-white/[0.06] rounded-[20px] px-[30px] pt-[32px] pb-[30px] hover:border-brand-gold/30 transition-colors"
            >
              <SectionLabel tone="muted" className="mb-4 block">{ind.name}</SectionLabel>
              <p className="text-[15px] leading-[1.6] text-white/60 mb-5">{ind.hubBlurb}</p>
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-white/35">
                  {ind.clients.map(c => c.name).join(', ')}
                </span>
                <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-gold group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
