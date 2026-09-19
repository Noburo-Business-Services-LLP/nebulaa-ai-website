import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { engagements, getEngagement } from '@/lib/engagementData'
import SectionLabel from '@/components/ui/SectionLabel'
import FaqList from '@/components/ui/FaqList'
import Schema, { breadcrumbSchema, serviceSchema } from '@/components/ui/Schema'

export function generateStaticParams() {
  return engagements.map(e => ({ engagement: e.slug }))
}

export async function generateMetadata({ params }: { params: { engagement: string } }): Promise<Metadata> {
  const eng = getEngagement(params.engagement)
  if (!eng) return {}
  return {
    title: eng.seoTitle,
    description: eng.seoDescription,
    openGraph: { title: eng.seoTitle, description: eng.seoDescription },
  }
}

export default function EngagementPage({ params }: { params: { engagement: string } }) {
  const eng = getEngagement(params.engagement)
  if (!eng) notFound()

  const others = engagements.filter(e => e.slug !== eng.slug)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Engagements', path: '/work' },
          { name: eng.name, path: `/work/${eng.slug}` },
        ])}
      />
      <Schema
        data={serviceSchema({ name: eng.name, description: eng.seoDescription, url: `/work/${eng.slug}` })}
      />
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[80px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/work" className="hover:text-gold-text">Engagements</Link>
          <span>/</span>
          <span className="text-muted">{eng.name}</span>
        </nav>

        <div className="max-w-[880px]">
          <SectionLabel className="mb-[24px] block">{eng.eyebrow}</SectionLabel>
          <h1
            className="neb-display text-[38px] md:text-[58px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            {eng.headline} <span className="text-gold-display">{eng.headlineEmphasis}</span>
          </h1>
          <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px] mb-7">{eng.subheadline}</p>
          <p className="text-[14px] text-faint mb-9">
            <span className="uppercase tracking-[0.08em] text-muted">Suited to</span> — {eng.forWho}
          </p>
          <Link
            href="/services#contact"
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:brightness-105 transition"
          >
            Book a 20-min call <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Scope */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[660px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">What it includes</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px] mb-4">
            The scope, <span className="text-gold-display">written down.</span>
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted">
            Agreed in writing before anything starts, so the retainer cannot quietly shrink over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eng.scope.map(group => (
            <div key={group.group} className="hud-card rounded-[18px] px-[28px] pt-[28px] pb-7">
              <h3 className="font-heading font-medium text-[19px] mb-5 pb-3.5 border-b border-gold/30">
                {group.group}
              </h3>
              <div className="flex flex-col gap-3.5">
                {group.items.map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <Check size={15} className="text-gold-text flex-shrink-0 mt-[3px]" />
                    <span className="text-[14px] leading-[1.6] text-ink-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Rhythm */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[46px]">
          <SectionLabel className="mb-[20px] block">How it runs</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            The rhythm of it.
          </h2>
        </div>
        <div className="flex flex-col gap-px bg-rule border border-rule rounded-[18px] overflow-hidden">
          {eng.rhythm.map(phase => (
            <div key={phase.label} className="bg-surface grid md:grid-cols-[150px_minmax(0,1fr)] gap-x-8 gap-y-2 px-6 md:px-9 py-6">
              <div className="neb-label neb-label-gold pt-1">{phase.label}</div>
              <p className="text-[15px] leading-[1.65] text-muted">{phase.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* What changes */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-x-[80px] gap-y-10">
          <div>
            <SectionLabel className="mb-[20px] block">What changes</SectionLabel>
            <h2 className="neb-display text-[30px] md:text-[40px] mb-4">
              What the engagement is <span className="text-gold-display">actually for.</span>
            </h2>
            <p className="text-[15px] leading-[1.65] text-muted">
              We are not putting numbers on this page until there is published client work we can
              point at. What follows is what the engagement is for.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {eng.whatChanges.map(item => (
              <div key={item} className="flex items-start gap-3.5 border-b border-rule pb-4">
                <Check size={16} className="text-gold-text flex-shrink-0 mt-[3px]" />
                <span className="text-[15.5px] leading-[1.6] text-ink-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[44px]">
          <SectionLabel className="mb-[20px] block">Questions</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            Before you ask <span className="text-gold-display">on the call.</span>
          </h2>
        </div>
        <FaqList faqs={eng.faqs} />
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <SectionLabel className="mb-[26px] block">The other shapes</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-5">
          {others.map(o => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              className="group block hud-card rounded-[18px] px-[28px] pt-[28px] pb-7 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-heading font-medium text-[20px] mb-2.5">{o.name}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-4">{o.summary}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                Read <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
