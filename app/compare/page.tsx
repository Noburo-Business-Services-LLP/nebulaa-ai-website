import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { compareData } from '@/lib/compareData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'Tools Solve Tasks. Systems Connect Them.'
const seoDescription =
  'How Nebulaa compares to Buffer, Hootsuite, Jasper AI, Clay and Instantly.ai — where they overlap, where they differ, and whether your work actually works together.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function CompareHubPage() {
  const list = Object.values(compareData)

  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[820px]">
        <SectionLabel className="mb-[26px] block">Comparisons</SectionLabel>
        <h1 className="neb-display text-[38px] md:text-[58px] mb-[26px]">
          Nebulaa vs <span className="text-gold-display">the alternatives.</span>
        </h1>
        <p className="text-[17px] leading-[1.65] text-muted max-w-[620px]">
          Most tools do one part of the job — scheduling, or writing, or outreach. Here&apos;s exactly
          where Nebulaa is stronger, and where the other tool genuinely wins, feature by feature.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[130px]">
        <div className="flex flex-col gap-5">
          {list.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/nebulaa-vs-${c.slug}`}
              className="group block hud-card rounded-[20px] px-[30px] py-[28px] hover:border-gold/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="md:w-[220px] flex-shrink-0">
                  <p className="font-heading text-xl font-medium">Nebulaa vs {c.competitor}</p>
                </div>
                <div className="flex-1 flex flex-wrap gap-x-6 gap-y-1.5">
                  {c.nebulaaStrengths.slice(0, 3).map((s) => (
                    <span key={s} className="flex items-center gap-1.5 text-[13px] text-muted">
                      <Check size={13} className="text-gold-text flex-shrink-0" />
                      {s}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-text flex-shrink-0 group-hover:gap-2.5 transition-all">
                  Compare <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
