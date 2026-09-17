import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { agents, capabilitiesFor } from '@/lib/productData'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import { BrainCircuit } from 'lucide-react'

const seoTitle = 'Product — Orbit, Gravity & Pulsar | Nebulaa'
const seoDescription =
  'Three agents on one engine. Orbit finds who to talk to, Gravity gives them a reason to say yes, Pulsar closes the conversation.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

export default function ProductPage() {
  const list = [agents.orbit, agents.gravity, agents.pulsar]

  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[880px]">
        <SectionLabel className="mb-[26px] block">The product</SectionLabel>
        <h1 className="font-heading font-medium text-[40px] md:text-[62px] leading-[1.06] tracking-[-0.02em] mb-[26px]" style={{ textWrap: 'pretty' }}>
          Three agents.{' '}
          <span className="italic text-gold-display">One engine underneath.</span>
        </h1>
        <p className="text-[18px] leading-[1.65] text-muted max-w-[640px]">
          Orbit finds and qualifies who is worth talking to. Gravity makes the marketing that gives
          them a reason to say yes. Pulsar answers them before they go somewhere else. All three share
          the same brand memory, so what one learns the others already know.
        </p>
      </section>

      {/* Core — the connecting layer, not a fourth priced card */}
      <section className="px-6 md:px-12 lg:px-[120px] pb-[80px]">
        <HudCard halo="cyan" className="p-8 md:p-10 max-w-[900px]">
          <div className="flex items-start gap-5">
            <span className="w-11 h-11 rounded-full bg-gold-wash flex items-center justify-center flex-shrink-0">
              <BrainCircuit size={20} className="text-gold-text" />
            </span>
            <div>
              <SectionLabel tone="muted" className="mb-2.5 block">Core — cross-agent intelligence</SectionLabel>
              <p className="font-heading text-[19px] md:text-[21px] font-medium mb-2.5">
                What connects all three, underneath.
              </p>
              <p className="text-[14.5px] leading-[1.65] text-muted max-w-[560px] mb-4">
                Core observes actions, outcomes and signals across Orbit, Gravity and Pulsar, and
                turns them into what runs next. It comes with every agent — there is nothing
                separate to buy.
              </p>
              <Link
                href="/product/core"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-gold-text hover:gap-2.5 transition-all"
              >
                See how Core works <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </HudCard>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[110px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(agent => {
            const caps = capabilitiesFor(agent.id)
            return (
              <div key={agent.id} className="hud-card rounded-[20px] px-7 md:px-[42px] pt-[44px] pb-10">
                <SectionLabel className="mb-[20px] block">{agent.tagline}</SectionLabel>
                <h2 className="font-heading font-medium text-[32px] md:text-[38px] leading-[1.1] tracking-[-0.015em] mb-4">
                  {agent.name}
                </h2>
                <p className="text-[15.5px] leading-[1.68] text-muted mb-7">{agent.subheadline}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {caps.slice(0, 8).map(c => (
                    <span
                      key={c.slug}
                      className="text-[12.5px] text-ink-2 border border-rule rounded-full px-[13px] py-[5px]"
                    >
                      {c.name}
                    </span>
                  ))}
                  {caps.length > 8 && (
                    <span className="text-[12.5px] text-faint px-[13px] py-[5px]">
                      +{caps.length - 8} more
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/product/${agent.id}`}
                    className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[14.5px] font-semibold px-[26px] py-[13px] rounded-full hover:brightness-105 transition"
                  >
                    Explore {agent.name} <ArrowRight size={15} />
                  </Link>
                  <span className="text-[14px] text-muted">{agent.price}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px] text-center">
        <h2 className="font-heading font-medium text-[28px] md:text-[42px] leading-[1.12] tracking-[-0.02em] mb-5">
          Or have our team <span className="italic text-gold-text">run all three for you.</span>
        </h2>
        <p className="text-[16px] leading-[1.65] text-muted max-w-[520px] mx-auto mb-9">
          Same agents underneath, with our team planning, producing and reporting on top of them —
          including the on-ground work software cannot do.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 border border-rule-2 text-ink-2 text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:border-gold hover:text-gold-text transition-colors"
        >
          See managed services <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  )
}
