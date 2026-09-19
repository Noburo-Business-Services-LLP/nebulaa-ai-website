import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { agents, capabilitiesFor, type AgentId } from '@/lib/productData'
import HudCard from '@/components/ui/HudCard'
import SectionLabel from '@/components/ui/SectionLabel'
import Schema, { breadcrumbSchema, softwareApplicationSchema } from '@/components/ui/Schema'
import { products } from '@/lib/orgFacts'

const ROLE: Record<string, string> = {
  orbit: 'finds and qualifies who is worth talking to',
  gravity: 'gives them a reason to say yes',
  pulsar: 'closes the conversation',
}

export function generateStaticParams() {
  return Object.keys(agents).map(agent => ({ agent }))
}

export async function generateMetadata({ params }: { params: { agent: string } }): Promise<Metadata> {
  const agent = agents[params.agent as AgentId]
  if (!agent) return {}
  return {
    title: agent.seoTitle,
    description: agent.seoDescription,
    openGraph: { title: agent.seoTitle, description: agent.seoDescription },
  }
}

export default function AgentPage({ params }: { params: { agent: string } }) {
  const agent = agents[params.agent as AgentId]
  if (!agent) notFound()

  const caps = capabilitiesFor(agent.id)
  const others = (Object.keys(agents) as AgentId[]).filter(id => id !== agent.id).map(id => agents[id])

  const priced = products.find(p => p.name === agent.name)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Product', path: '/product' },
          { name: agent.name, path: `/product/${agent.id}` },
        ])}
      />
      <Schema
        data={softwareApplicationSchema({
          name: agent.name,
          description: agent.seoDescription,
          price: priced?.price,
          url: `/product/${agent.id}`,
        })}
      />
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[80px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/product" className="hover:text-gold-text">Product</Link>
          <span>/</span>
          <span className="text-muted">{agent.name}</span>
        </nav>

        <div className="max-w-[880px]">
          <SectionLabel className="mb-[24px] block">{agent.eyebrow}</SectionLabel>
          <h1
            className="neb-display text-[40px] md:text-[62px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            {agent.headline}{' '}
            <span className="text-gold-display">{agent.headlineEmphasis}</span>
          </h1>
          <p className="text-[18px] leading-[1.65] text-muted max-w-[660px] mb-9">{agent.subheadline}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={agent.cta?.href ?? '/pricing'}
              className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:brightness-105 transition"
            >
              {agent.cta?.label ?? 'Start free trial'} <ArrowRight size={15} />
            </Link>
            <span className="text-[14.5px] text-muted">{agent.price} · {agent.priceNote ?? '7-day trial, no card'}</span>
          </div>
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Everything it does */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[660px] mb-[56px]">
          <SectionLabel className="mb-[20px] block">Everything it does</SectionLabel>
          <h2 className="neb-display text-[32px] md:text-[46px] mb-5">
            <span className="text-gold-display">{caps.length} things</span> it does.
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted">
            Most of what {agent.name} does has never been on this website. Each of these is a module
            that ships in the product today.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {caps.map(cap => (
            <Link
              key={cap.slug}
              href={`/product/${agent.id}/${cap.slug}`}
              className="group block hud-card rounded-[18px] px-[28px] pt-[30px] pb-7 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-heading font-medium text-[20px] mb-2.5">{cap.name}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-5">{cap.summary}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                Read <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* The rest of the pipeline */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <SectionLabel tone="muted" className="mb-6 block">The rest of the pipeline</SectionLabel>
        <h2 className="neb-display text-[26px] md:text-[34px] leading-[1.14] mb-8 max-w-[720px]">
          {agent.name} {ROLE[agent.id]}. Two more agents run the rest of it.
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 max-w-[880px] mb-10">
          {others.map((o, i) => (
            <Link key={o.id} href={`/product/${o.id}`} className="group block">
              <HudCard halo={i === 0 ? 'amber' : 'cyan'} className="px-7 pt-[30px] pb-8 h-full">
                <SectionLabel tone="muted" className="mb-3 block">{o.tagline}</SectionLabel>
                <h3 className="font-heading font-medium text-[22px] mb-3">{o.name}</h3>
                <p className="text-[14px] leading-[1.6] text-muted mb-6">{o.subheadline}</p>
                <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                  See {o.name} <ArrowRight size={13} />
                </span>
              </HudCard>
            </Link>
          ))}
        </div>

        <Link
          href="/product/core"
          className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-faint hover:text-gold-text transition-colors"
        >
          {agent.name} → outcome → Core → learning <ArrowRight size={12} />
        </Link>
      </section>
    </main>
  )
}
