import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Info } from 'lucide-react'
import { servicePages, getServicePage } from '@/lib/servicePageData'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import FaqList from '@/components/ui/FaqList'
import Schema, { breadcrumbSchema, serviceSchema } from '@/components/ui/Schema'
import TrackedLink from '@/components/ui/TrackedLink'

export function generateStaticParams() {
  return servicePages.map(s => ({ service: s.slug }))
}

export async function generateMetadata({ params }: { params: { service: string } }): Promise<Metadata> {
  const svc = getServicePage(params.service)
  if (!svc) return {}
  return {
    title: svc.seoTitle,
    description: svc.seoDescription,
    openGraph: { title: svc.seoTitle, description: svc.seoDescription },
  }
}

/** Only BTL has photography slots today; keeps the template honest elsewhere. */
const SERVICE_MEDIA: Record<string, string[]> = {
  'btl-activation': ['btl-sampling', 'btl-instore'],
}

export default function ServiceDetailPage({ params }: { params: { service: string } }) {
  const svc = getServicePage(params.service)
  if (!svc) notFound()

  const media = SERVICE_MEDIA[svc.slug] ?? []
  const siblings = servicePages.filter(s => s.slug !== svc.slug).slice(0, 3)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Services', path: '/services' },
          { name: svc.name, path: `/services/${svc.slug}` },
        ])}
      />
      <Schema
        data={serviceSchema({ name: svc.name, description: svc.seoDescription, url: `/services/${svc.slug}` })}
      />
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[80px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/services" className="hover:text-gold-text">Services</Link>
          <span>/</span>
          <span className="text-muted">{svc.name}</span>
        </nav>

        <div className="max-w-[880px]">
          <div className="flex flex-wrap items-center gap-3 mb-[24px]">
            <SectionLabel>{svc.eyebrow}</SectionLabel>
            {svc.flagship && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-text bg-gold-wash rounded-full px-2.5 py-1">
                No software does this
              </span>
            )}
          </div>
          <h1
            className="neb-display text-[38px] md:text-[58px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            {svc.headline} <span className="text-gold-display">{svc.headlineEmphasis}</span>
          </h1>
          <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px] mb-9">{svc.subheadline}</p>
          <Link
            href="/services#contact"
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:brightness-105 transition"
          >
            Book a 20-min call <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {media.length > 0 && (
        <section className="px-6 md:px-12 lg:px-[120px] pb-[90px]">
          <div className="grid md:grid-cols-2 gap-5">
            {media.map(id => (
              <MediaSlot key={id} id={id} ratio="3 / 2" />
            ))}
          </div>
        </section>
      )}

      <hr className="border-t border-rule" />

      {/* How it works */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">How it works</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            The way this <span className="text-gold-display">actually runs.</span>
          </h2>
        </div>
        <div className={`grid gap-6 ${svc.howItWorks.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {svc.howItWorks.map((step, i) => (
            <div key={step.title} className="border-t border-gold/30 pt-6">
              <div className="font-heading text-[22px] text-gold-text mb-3 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-heading font-medium text-[19px] mb-2.5">{step.title}</h3>
              <p className="text-[14.5px] leading-[1.65] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phased timeline — market entry only */}
      {svc.phases && (
        <>
          <hr className="border-t border-rule" />
          <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
            <div className="max-w-[660px] mb-[52px]">
              <SectionLabel className="mb-[20px] block">The sequence</SectionLabel>
              <h2 className="neb-display text-[30px] md:text-[42px] mb-4">
                Four months to <span className="text-gold-display">a launch that lands.</span>
              </h2>
              <p className="text-[16px] leading-[1.68] text-muted">
                Working backwards from the date, so demand is already in place when the stock is.
              </p>
            </div>

            <div className="flex flex-col gap-px bg-rule border border-rule rounded-[18px] overflow-hidden">
              {svc.phases.map(phase => (
                <div key={phase.label} className="bg-surface grid md:grid-cols-[160px_minmax(0,1fr)] gap-x-8 gap-y-3 px-6 md:px-9 py-7">
                  <div>
                    <div className="neb-label neb-label-gold mb-1.5">{phase.label}</div>
                    <div className="font-heading font-medium text-[19px]">{phase.title}</div>
                  </div>
                  <div>
                    <p className="text-[15px] leading-[1.65] text-muted mb-3">{phase.body}</p>
                    <p className="text-[14px] leading-[1.6] text-ink-2">
                      <span className="text-gold-text font-semibold">Outcome — </span>
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <hr className="border-t border-rule" />

      {/* What we run */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-x-[80px] gap-y-10">
          <div>
            <SectionLabel className="mb-[20px] block">What we run</SectionLabel>
            <h2 className="neb-display text-[30px] md:text-[40px]">
              What's <span className="text-gold-display">included.</span>
            </h2>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              {svc.whatWeRun.map(item => (
                <div key={item} className="flex items-start gap-3.5 border-b border-rule pb-4">
                  <Check size={16} className="text-gold-text flex-shrink-0 mt-[3px]" />
                  <span className="text-[15.5px] leading-[1.6] text-ink-2">{item}</span>
                </div>
              ))}
            </div>

            {svc.note && (
              <div className="flex items-start gap-3 mt-7 bg-surface-2 border border-rule rounded-[12px] p-4">
                <Info size={15} className="text-muted flex-shrink-0 mt-[2px]" />
                <p className="text-[14px] leading-[1.6] text-muted">{svc.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[44px]">
          <SectionLabel className="mb-[20px] block">Questions</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            Asked before <span className="text-gold-display">every engagement.</span>
          </h2>
        </div>
        <FaqList faqs={svc.faqs} />
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <SectionLabel className="mb-[26px] block">Also part of an engagement</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-5">
          {siblings.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block hud-card rounded-[18px] px-[26px] pt-[28px] pb-7 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-heading font-medium text-[19px] mb-2.5">{s.name}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-4">{s.summary}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                Read <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-12 lg:px-[120px] py-[120px] text-center border-t border-rule overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="neb-display text-[30px] md:text-[46px] mb-5">
            Describe your business on a call.{' '}
            <span className="text-gold-display">We&apos;ll send back a written scope.</span>
          </h2>
          <p className="text-[16px] leading-[1.65] text-muted max-w-[470px] mx-auto mb-9">
            Twenty minutes, no deck. If we are the wrong fit we will say so on the call and point you
            somewhere better.
          </p>
          <TrackedLink
            source="service_detail_page"
            href={`mailto:hello@nebulaa.ai?subject=${encodeURIComponent(`${svc.name} — let's talk`)}`}
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:brightness-105 transition"
          >
            Book a 20-min call <ArrowRight size={16} />
          </TrackedLink>
        </div>
      </section>
    </main>
  )
}
