import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resources } from '@/lib/resourceData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'AI Marketing Resources — Operating Knowledge'
const seoDescription =
  'Templates and playbooks to move from planning to action: festival calendar, market entry playbook, BTL checklist, content calendar. One email unlocks all.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function ResourcesHubPage() {
  const ready = resources.filter(r => r.file).length

  return (
    <main className="text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[80px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Free downloads</SectionLabel>
        <h1 className="neb-display text-[40px] md:text-[60px] mb-[26px]" style={{ textWrap: 'pretty' }}>
          The things we use,{' '}
          <span className="text-gold-display">handed over.</span>
        </h1>
        <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px]">
          These AI marketing resources are built for Indian businesses and tuned to how the year actually
          runs here. One email unlocks the set — no drip sequence afterwards. {ready} available now, the rest in
          preparation.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[120px]">
        <div className="grid md:grid-cols-2 gap-5">
          {resources.map(r => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className={`group flex flex-col justify-between bg-surface border rounded-[20px] px-[30px] pt-[32px] pb-8 transition-colors ${
                r.flagship ? 'border-gold/25 hover:border-gold/50' : 'border-rule hover:border-gold/30'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                  <span className="neb-label">{r.format}</span>
                  {!r.file && (
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-faint border border-rule rounded-full px-2 py-0.5">
                      In preparation
                    </span>
                  )}
                </div>
                <h2 className="font-heading font-medium text-[22px] leading-[1.2] mb-2">{r.title}</h2>
                <p className="text-[14.5px] leading-[1.55] text-gold-text mb-3.5">{r.subtitle}</p>
                <p className="text-[14px] leading-[1.65] text-muted mb-5">{r.description}</p>
              </div>

              <div>
                <p className="text-[13.5px] leading-[1.55] text-ink-2 mb-5">
                  <span className="text-muted">Use it to </span>
                  {r.useItTo}
                </p>
                <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                  {r.file ? 'Get it' : 'See what it covers'} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
