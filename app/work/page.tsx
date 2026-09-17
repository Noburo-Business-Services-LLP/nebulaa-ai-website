import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { engagements } from '@/lib/engagementData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'Engagements — How We Work | Nebulaa'
const seoDescription =
  'Three shapes of managed engagement: always-on content, market entry, and multi-market regional programmes. Scope and cadence, written down.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function WorkHubPage() {
  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Engagements</SectionLabel>
        <h1 className="font-heading font-medium text-[40px] md:text-[60px] leading-[1.06] tracking-[-0.02em] mb-[26px]" style={{ textWrap: 'pretty' }}>
          Three shapes of work.{' '}
          <span className="italic text-gold-display">Yours is one of them.</span>
        </h1>
        <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px]">
          Every engagement gets scoped individually, but they fall into three shapes. Knowing which
          one you are asking for is most of what a first call establishes — so here they are, with
          what each actually includes.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[110px]">
        <div className="flex flex-col gap-5">
          {engagements.map(eng => (
            <Link
              key={eng.slug}
              href={`/work/${eng.slug}`}
              className="group block hud-card rounded-[20px] px-7 md:px-[42px] pt-[36px] pb-9 hover:border-gold/30 transition-colors"
            >
              <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-x-[60px] gap-y-5 items-start">
                <div>
                  <h2 className="font-heading font-medium text-[26px] md:text-[32px] leading-[1.14] tracking-[-0.015em] mb-3">
                    {eng.name}
                  </h2>
                  <p className="text-[15.5px] leading-[1.68] text-muted mb-5 max-w-[58ch]">
                    {eng.subheadline}
                  </p>
                  <span className="flex items-center gap-1.5 text-[14px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                    What it includes <ArrowRight size={14} />
                  </span>
                </div>

                <div className="bg-surface-2 border border-rule rounded-[14px] px-5 py-5">
                  <div className="neb-label mb-2.5">Suited to</div>
                  <p className="text-[14px] leading-[1.6] text-ink-2">{eng.forWho}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[680px]">
          <SectionLabel className="mb-[20px] block">On results</SectionLabel>
          <h2 className="font-heading font-medium text-[28px] md:text-[38px] leading-[1.14] tracking-[-0.02em] mb-5">
            No numbers on these pages yet.
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted mb-4">
            We could put growth figures here. Plenty of sites in this category do, and a fair few of
            those figures contradict themselves from one page to the next.
          </p>
          <p className="text-[16px] leading-[1.68] text-muted">
            Ours go up when there is client work published with permission behind it, and not before.
            Until then these pages describe scope and cadence, which are things we can stand behind
            completely.
          </p>
        </div>
      </section>
    </main>
  )
}
