import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/lib/industryData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'AI Workflows Built Around Your Business — By Industry'
const seoDescription =
  'What running the system looks like inside your industry. How Gravity, Orbit and Pulsar operate for jewellery & retail, textile & apparel, financial services, FMCG & food, and industrial & B2B.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function IndustriesHubPage() {
  const list = Object.values(industries)

  return (
    <main className="text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[820px]">
        <SectionLabel className="mb-[26px] block">By industry</SectionLabel>
        <h1 className="neb-display text-[38px] md:text-[58px] mb-[26px]">
          Every industry sells <span className="text-gold-display">differently.</span>
        </h1>
        <p className="text-[17px] leading-[1.65] text-muted max-w-[620px]">
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
              className="group block hud-card rounded-[20px] px-[30px] pt-[32px] pb-[30px] hover:border-gold/30 transition-colors"
            >
              <SectionLabel tone="muted" className="mb-4 block">{ind.name}</SectionLabel>
              <p className="text-[15px] leading-[1.6] text-muted mb-5">{ind.hubBlurb}</p>
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-faint">
                  {ind.clients.length > 0 ? ind.clients.map(c => c.name).join(', ') : 'Sector capability'}
                </span>
                <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
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
