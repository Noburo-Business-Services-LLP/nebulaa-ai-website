import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Info } from 'lucide-react'
import { channels, getChannel, runByLabel } from '@/lib/channelData'
import SectionLabel from '@/components/ui/SectionLabel'
import FaqList from '@/components/ui/FaqList'
import Schema, { breadcrumbSchema, serviceSchema } from '@/components/ui/Schema'

export function generateStaticParams() {
  return channels.map(c => ({ channel: c.slug }))
}

export async function generateMetadata({ params }: { params: { channel: string } }): Promise<Metadata> {
  const ch = getChannel(params.channel)
  if (!ch) return {}
  return {
    title: ch.seoTitle,
    description: ch.seoDescription,
    openGraph: { title: ch.seoTitle, description: ch.seoDescription },
  }
}

/** Where to send someone depends on who actually runs the channel. */
const CTA = {
  gravity: { label: 'Start free trial', href: '/pricing' },
  pulsar: { label: 'Start free trial', href: '/pricing' },
  services: { label: 'Book a 20-min call', href: '/services' },
} as const

export default function ChannelPage({ params }: { params: { channel: string } }) {
  const ch = getChannel(params.channel)
  if (!ch) notFound()

  const cta = CTA[ch.runBy]
  const siblings = channels.filter(c => c.slug !== ch.slug && c.runBy === ch.runBy).slice(0, 3)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Channels', path: '/channels' },
          { name: ch.name, path: `/channels/${ch.slug}` },
        ])}
      />
      <Schema
        data={serviceSchema({ name: `${ch.name} marketing`, description: ch.seoDescription, url: `/channels/${ch.slug}` })}
      />
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[80px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/channels" className="hover:text-gold-text">Channels</Link>
          <span>/</span>
          <span className="text-muted">{ch.name}</span>
        </nav>

        <div className="max-w-[880px]">
          <div className="flex flex-wrap items-center gap-3 mb-[24px]">
            <SectionLabel>{ch.eyebrow}</SectionLabel>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted border border-rule rounded-full px-2.5 py-1">
              {runByLabel(ch.runBy)}
            </span>
          </div>
          <h1
            className="neb-display text-[38px] md:text-[58px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            {ch.headline} <span className="text-gold-display">{ch.headlineEmphasis}</span>
          </h1>
          <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px] mb-9">{ch.subheadline}</p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:brightness-105 transition"
          >
            {cta.label} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] gap-x-[80px] gap-y-10">
          <div>
            <SectionLabel className="mb-[20px] block">What we do here</SectionLabel>
            <h2 className="neb-display text-[30px] md:text-[40px]">
              On this channel, <span className="text-gold-display">specifically.</span>
            </h2>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              {ch.whatWeDo.map(item => (
                <div key={item} className="flex items-start gap-3.5 border-b border-rule pb-4">
                  <Check size={16} className="text-gold-text flex-shrink-0 mt-[3px]" />
                  <span className="text-[15.5px] leading-[1.6] text-ink-2">{item}</span>
                </div>
              ))}
            </div>

            {/* The caveat gets stated rather than buried — a channel we'd talk
                you out of is more credible than one we oversell. */}
            {ch.note && (
              <div className="flex items-start gap-3 mt-7 bg-surface-2 border border-rule rounded-[12px] p-4">
                <Info size={15} className="text-muted flex-shrink-0 mt-[2px]" />
                <p className="text-[14px] leading-[1.6] text-muted">{ch.note}</p>
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
            About this channel, <span className="text-gold-display">honestly.</span>
          </h2>
        </div>
        <FaqList faqs={ch.faqs} />
      </section>

      {siblings.length > 0 && (
        <>
          <hr className="border-t border-rule" />
          <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
            <SectionLabel className="mb-[26px] block">Related channels</SectionLabel>
            <div className="grid sm:grid-cols-3 gap-5">
              {siblings.map(s => (
                <Link
                  key={s.slug}
                  href={`/channels/${s.slug}`}
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
        </>
      )}
    </main>
  )
}
