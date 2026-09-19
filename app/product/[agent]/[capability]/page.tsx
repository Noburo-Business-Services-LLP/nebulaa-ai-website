import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { capabilities, getCapability, capabilitiesFor, agents, type AgentId } from '@/lib/productData'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import FaqList from '@/components/ui/FaqList'
import Schema, { breadcrumbSchema, softwareApplicationSchema } from '@/components/ui/Schema'

export function generateStaticParams() {
  return capabilities.map(c => ({ agent: c.agent, capability: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { agent: string; capability: string }
}): Promise<Metadata> {
  const cap = getCapability(params.agent as AgentId, params.capability)
  if (!cap) return {}
  return {
    title: cap.seoTitle,
    description: cap.seoDescription,
    openGraph: { title: cap.seoTitle, description: cap.seoDescription },
  }
}

export default function CapabilityPage({
  params,
}: {
  params: { agent: string; capability: string }
}) {
  const agentId = params.agent as AgentId
  const agent = agents[agentId]
  const cap = agent ? getCapability(agentId, params.capability) : undefined
  if (!agent || !cap) notFound()

  // two siblings, so every page links sideways as well as up
  const siblings = capabilitiesFor(agentId).filter(c => c.slug !== cap.slug).slice(0, 3)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Product', path: '/product' },
          { name: agent.name, path: `/product/${agent.id}` },
          { name: cap.name, path: `/product/${agent.id}/${cap.slug}` },
        ])}
      />
      <Schema
        data={softwareApplicationSchema({
          name: `${agent.name} — ${cap.name}`,
          description: cap.seoDescription,
          url: `/product/${agent.id}/${cap.slug}`,
        })}
      />
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[80px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/product" className="hover:text-gold-text">Product</Link>
          <span>/</span>
          <Link href={`/product/${agent.id}`} className="hover:text-gold-text">{agent.name}</Link>
          <span>/</span>
          <span className="text-muted">{cap.name}</span>
        </nav>

        <div className="max-w-[880px]">
          <SectionLabel className="mb-[24px] block">{cap.eyebrow}</SectionLabel>
          <h1
            className="neb-display text-[38px] md:text-[58px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            {cap.headline}{' '}
            <span className="text-gold-display">{cap.headlineEmphasis}</span>
          </h1>
          <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px] mb-9">{cap.subheadline}</p>
          <Link
            href={agent.cta?.href ?? '/pricing'}
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:brightness-105 transition"
          >
            {agent.cta?.label ?? 'Start free trial'} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {cap.mediaSlot && (
        <section className="px-6 md:px-12 lg:px-[120px] pb-[90px]">
          <MediaSlot id={cap.mediaSlot} ratio="16 / 10" />
        </section>
      )}

      <hr className="border-t border-rule" />

      {/* How it works */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">How it works</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            Three steps, <span className="text-gold-display">start to finish.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cap.steps.map((step, i) => (
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

      <hr className="border-t border-rule" />

      {/* What you get */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-x-[80px] gap-y-10">
          <div>
            <SectionLabel className="mb-[20px] block">What you get</SectionLabel>
            <h2 className="neb-display text-[30px] md:text-[40px]">
              What&apos;s <span className="text-gold-display">included.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {cap.whatYouGet.map(item => (
              <div key={item} className="flex items-start gap-3.5 border-b border-rule pb-4">
                <Check size={16} className="text-gold-text flex-shrink-0 mt-[3px]" />
                <span className="text-[15.5px] leading-[1.6] text-ink-2">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* FAQ */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <div className="max-w-[640px] mb-[44px]">
          <SectionLabel className="mb-[20px] block">Questions</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[42px]">
            The ones people <span className="text-gold-display">actually ask.</span>
          </h2>
        </div>
        <FaqList faqs={cap.faqs} />
      </section>

      <hr className="border-t border-rule" />

      {/* Siblings */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <SectionLabel className="mb-[26px] block">Also in {agent.name}</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-5">
          {siblings.map(s => (
            <Link
              key={s.slug}
              href={`/product/${agent.id}/${s.slug}`}
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

      {/* Close */}
      <section className="relative px-6 md:px-12 lg:px-[120px] py-[120px] text-center border-t border-rule overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="neb-display text-[30px] md:text-[46px] mb-5">
            {agent.cta ? (
              <>{agent.name}, running on your business.{' '}<span className="text-gold-display">See it for yourself.</span></>
            ) : (
              <>Give it a URL.{' '}<span className="text-gold-display">See what it builds from your business.</span></>
            )}
          </h2>
          <p className="text-[16px] leading-[1.65] text-muted max-w-[460px] mx-auto mb-9">
            {agent.cta
              ? `${agent.price} — ${agent.priceNote ?? 'talk to us'}.`
              : 'Seven days free, no card required. Most accounts have something worth publishing by day two.'}
          </p>
          <Link
            href={agent.cta?.href ?? '/pricing'}
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:brightness-105 transition"
          >
            {agent.cta?.label ?? 'Start free trial'} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
