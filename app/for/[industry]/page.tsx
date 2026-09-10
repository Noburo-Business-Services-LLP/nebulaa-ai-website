import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { X } from 'lucide-react'
import { getIndustryData, industries } from '@/lib/industryData'
import SectionLabel from '@/components/ui/SectionLabel'

export function generateStaticParams() {
  return Object.keys(industries).map(slug => ({ industry: slug }))
}

export async function generateMetadata({ params }: { params: { industry: string } }): Promise<Metadata> {
  const data = getIndustryData(params.industry)
  if (!data) return {}
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: { title: data.seoTitle, description: data.seoDescription },
  }
}

const AGENT_STYLE: Record<string, string> = {
  Gravity: 'bg-gold/15 text-gold-text',
  Pulsar: 'bg-orange-400/15 text-orange-400',
  Both: 'bg-purple-400/15 text-purple-300',
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const data = getIndustryData(params.industry)
  if (!data) notFound()

  return (
    <main className="bg-ground text-ink min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[900px]">
        <SectionLabel className="mb-[26px] block">{data.eyebrow}</SectionLabel>
        <h1 className="font-heading font-medium text-[38px] md:text-[60px] leading-[1.1] tracking-[-0.02em] mb-[28px]" style={{ textWrap: 'pretty' }}>
          {data.headline}
          <br />
          <span className="italic text-gold-text">{data.headlineEmphasis}</span>
        </h1>
        <p className="text-[17px] leading-[1.65] text-muted max-w-[620px] mb-9">
          {data.subheadline}
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gold text-[#1A1208] text-[15px] font-semibold px-[28px] py-[14px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
        >
          Start free trial →
        </a>
      </section>

      {/* Working with — omitted entirely for verticals with no named client yet */}
      {data.clients.length > 0 && (
        <div className="border-y border-rule py-10 px-6 md:px-12 lg:px-[120px] flex items-center gap-11 flex-wrap">
          <SectionLabel tone="muted" className="flex-shrink-0">Working with</SectionLabel>
          <div className="flex items-center gap-9 flex-wrap">
            {data.clients.map((client) => (
              <span
                key={client.name}
                className={`font-heading text-lg ${client.stage === 'proposal' ? 'text-faint' : 'text-ink-2'}`}
              >
                {client.name}
                {client.stage === 'proposal' && (
                  <span className="font-body text-[11px] tracking-[0.08em] uppercase"> · in progress</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pain points */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="font-heading font-medium text-[28px] md:text-4xl mb-8">Sound familiar?</h2>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {data.painPoints.map((pain, i) => (
            <div key={i} className="flex items-start gap-3 bg-surface border border-rule rounded-xl p-[18px]">
              <X size={15} className="text-red-400/70 mt-0.5 flex-shrink-0" />
              <p className="text-[14.5px] leading-[1.6] text-ink-2">{pain}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Use cases */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <h2 className="font-heading font-medium text-[28px] md:text-4xl mb-8">
          How Nebulaa helps <span className="italic text-gold-text">{data.name.toLowerCase()}</span>
        </h2>
        <div className="flex flex-col gap-4">
          {data.useCases.map((uc, i) => (
            <div key={i} className="bg-surface border border-rule rounded-2xl p-6 flex items-start gap-5">
              <span className={`inline-block font-body text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 ${AGENT_STYLE[uc.agent]}`}>
                {uc.agent}
              </span>
              <div>
                <h3 className="font-heading font-medium text-lg mb-1.5">{uc.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-muted">{uc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="relative px-6 md:px-12 lg:px-[120px] py-[130px] pb-[140px] text-center border-t border-rule overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="font-heading font-medium text-[32px] md:text-[50px] leading-[1.1] tracking-[-0.02em] mb-6">
            Built for {data.name.toLowerCase()}.
            <br />
            <span className="italic text-gold-text">Ready in a minute.</span>
          </h2>
          <p className="text-[16px] leading-[1.65] text-muted max-w-[480px] mx-auto mb-9">
            Give Nebulaa your website URL. It learns your brand and starts building the content queue —
            no brief, no onboarding call.
          </p>
          <a
            href="/pricing"
            className="inline-block bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
          >
            Start your free 7-day trial →
          </a>
        </div>
      </section>
    </main>
  )
}
