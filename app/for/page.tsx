import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { industries, industryMeta } from '@/lib/industryData'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'

const seoTitle = 'Marketing for Your Kind of Business'
const seoDescription =
  'Hotels, jewellers, textile shops, food brands, financial services, real estate, furniture and more: see what Nebulaa does for the way you sell.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function IndustriesHubPage() {
  const list = Object.values(industries)

  return (
    <main className="text-ink min-h-screen">
      <section className="px-5 md:px-12 lg:px-[120px] pt-[130px] pb-12 max-w-[900px]">
        <SectionLabel className="mb-5 block">For your business</SectionLabel>
        <h1 className="neb-display text-[42px] md:text-[72px] mb-5">
          Every business sells <span className="text-gold-display">differently.</span>
        </h1>
        <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[600px]">
          A jewellery shop sells on trust built over decades. A hotel sells on the picture in a guest&apos;s
          head. Pick your kind of business to see what we do for it.
        </p>
      </section>

      <section className="px-5 md:px-12 lg:px-[120px] pb-[96px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map(ind => (
            <Link
              key={ind.slug}
              href={`/for/${ind.slug}`}
              className="group block rounded-[24px] overflow-hidden border border-rule bg-surface shadow-[0_10px_28px_rgba(20,32,58,0.07)]"
            >
              <MediaSlot id={industryMeta[ind.slug].photoSlot} ratio="3 / 2" compact />
              <div className="p-5">
                <h2 className="font-heading text-[19px] mb-1.5 flex items-center justify-between gap-2">
                  {ind.name}
                  <ArrowUpRight size={18} className="flex-shrink-0 text-coral-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h2>
                <p className="text-[14px] leading-[1.55] text-ink-2">{ind.hubBlurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
