import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageSquareQuote, Hash, Sparkles, Clock, Radio, Waypoints } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import Schema, { breadcrumbSchema } from '@/components/ui/Schema'

const seoTitle = 'Nebulaa Core — The Intelligence Behind the System'
const seoDescription =
  'Core connects what happens across Orbit, Gravity and Pulsar — observing actions, outcomes and signals, and turning them into what runs next.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

const EVENTS = [
  'Post published',
  'Lead sourced',
  'Message sent',
  'Reply received',
  'Lead qualified',
  'Conversation closed',
]

// The four real categories the memory system tracks — same as the
// homepage's SharedMemory section, not invented separately for this page.
const SIGNALS = [
  { icon: MessageSquareQuote, label: 'Copy & hooks', body: 'Which opening line got a reply, which caption fell flat.' },
  { icon: Hash, label: 'Hashtags & reach', body: 'What is pulling reach this month, dropped the moment it stops.' },
  { icon: Sparkles, label: 'Visual style', body: 'The framing and format your audience stops scrolling for.' },
  { icon: Clock, label: 'Timing & CTA', body: 'When your audience is online, and which call-to-action moves them.' },
]

export default function CorePage() {
  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Product', path: '/product' },
          { name: 'Core', path: '/product/core' },
        ])}
      />

      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[90px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/product" className="hover:text-gold-text">Product</Link>
          <span>/</span>
          <span className="text-muted">Core</span>
        </nav>

        <div className="max-w-[820px]">
          <SectionLabel className="mb-[24px] block">Core — cross-agent intelligence</SectionLabel>
          <h1
            className="neb-display text-[40px] md:text-[62px] mb-[26px]"
            style={{ textWrap: 'pretty' }}
          >
            The intelligence <span className="text-gold-display">behind the system.</span>
          </h1>
          <p className="text-[18px] leading-[1.65] text-muted max-w-[660px] mb-9">
            Core connects what happens across Orbit, Gravity and Pulsar — observing actions,
            outcomes and signals, and turning activity into learning, and learning into a better
            next action. It comes with every engine. There is nothing separate to buy.
          </p>
          <a
            href="#learning-loop"
            className="inline-flex items-center gap-2 border border-rule-2 text-ink-2 text-[15px] font-semibold px-[28px] py-[14px] rounded-full hover:border-gold hover:text-gold-text transition-colors"
          >
            See the learning loop <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Core doesn't do the work */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[720px] mb-[56px]">
          <h2 className="neb-display text-[30px] md:text-[46px]">
            Core doesn&apos;t do the work. <span className="text-gold-display">It makes the system better at doing the work.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 max-w-[900px]">
          {[
            { name: 'Gravity', role: 'creates.' },
            { name: 'Orbit', role: 'finds.' },
            { name: 'Pulsar', role: 'engages.' },
          ].map(a => (
            <HudCard key={a.name} halo="amber" className="p-7">
              <SectionLabel tone="muted" className="mb-3 block">{a.name}</SectionLabel>
              <p className="font-heading text-[20px] font-medium">{a.name} {a.role}</p>
            </HudCard>
          ))}
        </div>
        <p className="text-[16px] leading-[1.68] text-muted max-w-[600px] mt-8">
          Core observes what happens across all three, and connects it — so a pattern found in
          Gravity&apos;s content performance can shape what Pulsar says, and what Orbit looks for next.
        </p>
      </section>

      <hr className="border-t border-rule" />

      {/* From activity to signal */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[640px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">From activity to signal</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[44px]">
            Every action in the system leaves a signal for the next one.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {EVENTS.map(e => (
            <span key={e} className="hud-card flex items-center gap-2.5 rounded-full pl-4 pr-5 py-2.5 font-mono text-[12.5px] text-ink-2">
              <Radio size={13} className="text-gold-text" />
              {e}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* From signal to learning */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[640px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">From signal to learning</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[44px]">
            <span className="text-gold-display">Signals</span>, connected across actions and outcomes.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIGNALS.map((s, i) => (
            <HudCard key={s.label} halo={i % 2 === 0 ? 'amber' : 'cyan'} className="p-7 h-full">
              <s.icon size={20} className="text-gold-text mb-5" />
              <h3 className="font-heading font-medium text-[16.5px] mb-2.5">{s.label}</h3>
              <p className="text-[13.5px] leading-[1.62] text-muted">{s.body}</p>
            </HudCard>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* From learning to the next move */}
      <section id="learning-loop" className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="max-w-[640px] mb-[52px]">
          <SectionLabel className="mb-[20px] block">From learning to the next move</SectionLabel>
          <h2 className="neb-display text-[30px] md:text-[44px] mb-5">
            The system uses what it learns to decide what runs next.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 max-w-[900px]">
          {['Action', 'Outcome', 'Signal', 'Learning', 'Next action'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-3">
              <span className="hud-card rounded-full px-5 py-2.5 font-mono text-[12.5px] text-ink-2 uppercase tracking-wide">
                {step}
              </span>
              {i < arr.length - 1 && <Waypoints size={16} className="text-gold-text/50" />}
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* Close */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px] text-center">
        <h2 className="neb-display text-[28px] md:text-[42px] mb-6">
          Core comes with <span className="text-gold-display">every engine.</span>
        </h2>
        <p className="text-[16px] leading-[1.65] text-muted max-w-[480px] mx-auto mb-9">
          There is no separate Core plan. Run Orbit, Gravity or Pulsar and Core is already
          connecting what they learn.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full hover:brightness-105 transition"
        >
          See all three engines <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  )
}
