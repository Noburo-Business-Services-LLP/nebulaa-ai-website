import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serviceTiers, differentiators } from '@/lib/servicesData'
import SectionLabel from '@/components/ui/SectionLabel'

export function generateStaticParams() {
  return Object.keys(serviceTiers).map(tier => ({ tier }))
}

export async function generateMetadata({ params }: { params: { tier: string } }): Promise<Metadata> {
  const data = serviceTiers[params.tier]
  if (!data) return {}
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: { title: data.seoTitle, description: data.seoDescription },
  }
}

export default function ServiceTierPage({ params }: { params: { tier: string } }) {
  const data = serviceTiers[params.tier]
  if (!data) notFound()

  const otherTier = data.slug === 'enterprise' ? serviceTiers.msme : serviceTiers.enterprise
  const engagements = [data, otherTier]

  return (
    <main className="bg-[#0A0A0A] text-[#F5F4F1] min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[100px] max-w-[900px]">
        <SectionLabel className="mb-[26px] block">{data.eyebrow}</SectionLabel>
        <h1 className="font-heading font-medium text-[42px] md:text-[68px] leading-[1.06] tracking-[-0.02em] mb-[30px]" style={{ textWrap: 'pretty' }}>
          {data.headline}
          <br />
          <span className="italic text-brand-gold">{data.headlineEmphasis}</span>
        </h1>
        <p className="text-[18.5px] leading-[1.65] text-white/55 max-w-[620px] mb-10">
          {data.subheadline}
        </p>
        <a
          href="#contact"
          className="inline-block bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
        >
          {data.ctaLabel}
        </a>
      </section>

      <hr className="border-t border-white/[0.06]" />

      {/* How it differs */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((d) => (
            <div key={d.title} className="bg-[#151515] border border-white/[0.06] rounded-[18px] px-[34px] pt-[38px] pb-10">
              <h3 className="font-heading font-medium text-2xl mb-3.5">{d.title}</h3>
              <p className="text-[15px] leading-[1.68] text-white/55">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/[0.06]" />

      {/* Two engagements */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px] pb-[130px]">
        <div className="max-w-[620px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">Two shapes</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em]">
            Same team. <span className="italic text-brand-gold">Different weight.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {engagements.map((tier) => (
            <div key={tier.slug} className="bg-[#151515] border border-white/[0.06] rounded-[20px] px-[42px] pt-[46px] pb-[46px]">
              <SectionLabel tone="muted" className="mb-6 block">{tier.name}</SectionLabel>
              <h3 className="font-heading font-medium text-[28px] md:text-[34px] leading-tight tracking-[-0.015em] mb-[18px]">
                {tier.engagementTitle}
              </h3>
              <p className="text-[15.5px] leading-[1.68] text-white/55 mb-[34px]">
                {tier.engagementBlurb}
              </p>
              <hr className="border-t border-white/[0.06] mb-[30px]" />
              <div className="flex flex-col gap-[14px] mb-[38px]">
                {tier.whatYouGet.map((item) => (
                  <div key={item} className="flex gap-[13px]">
                    <span className="text-brand-gold">&mdash;</span>
                    <span className="text-[14.5px] leading-[1.6] text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              <SectionLabel tone="muted" className="mb-4 block">Currently working with</SectionLabel>
              <div className="flex flex-wrap gap-2.5">
                {tier.clients.map((c) => (
                  <span
                    key={c.name}
                    className={
                      c.stage === 'active'
                        ? 'text-[13.5px] text-white/70 border border-white/10 rounded-full px-[15px] py-[7px]'
                        : 'text-[13.5px] text-white/35 border border-dashed border-white/10 rounded-full px-[15px] py-[7px]'
                    }
                  >
                    {c.name}
                    {c.stage === 'proposal' && ' · in progress'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/[0.06]" />

      {/* What it looks like — illustrative, clearly labelled */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-5">
          <SectionLabel className="mb-[22px] block">What changes</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em] mb-4">
            The kind of shift this <span className="italic text-brand-gold">typically drives.</span>
          </h2>
          <p className="text-[14.5px] leading-[1.6] text-white/35">
            Illustrative examples by category &mdash; not attributed quotes, not case studies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-[52px]">
          {data.illustrativeExamples.map((ex) => (
            <div key={ex.industryLabel} className="border border-dashed border-white/[0.14] rounded-[18px] px-[30px] pt-[34px] pb-9 bg-white/[0.015]">
              <SectionLabel tone="muted" className="mb-[18px] block">{ex.industryLabel}</SectionLabel>
              <p className="text-[14.5px] leading-[1.7] text-white/30 italic">
                {ex.copy ?? '[Copy from DK]'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section id="contact" className="relative px-6 md:px-12 lg:px-[120px] py-[130px] pb-[140px] text-center border-t border-white/[0.06] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="font-heading font-medium text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.02em] mb-6">
            Tell us what you sell.
            <br />
            <span className="italic text-brand-gold">We&apos;ll tell you what we&apos;d do.</span>
          </h2>
          <p className="text-[17px] leading-[1.65] text-white/55 max-w-[480px] mx-auto mb-10">
            Twenty minutes, no deck, no pitch. If we&apos;re the wrong fit we&apos;ll say so on the call and point you somewhere better.
          </p>
          <a
            href={`mailto:hello@nebulaa.ai?subject=${encodeURIComponent(`${data.name} services — let's talk`)}`}
            className="inline-block bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[34px] py-4 rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
          >
            {data.ctaLabel}
          </a>
        </div>
      </section>
    </main>
  )
}
