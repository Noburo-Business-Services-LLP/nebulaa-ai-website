import type { Metadata } from 'next'
import { Users, Cpu, Sparkles, Target, Layers, Camera, Film, Megaphone, MapPin, Palette, BarChart3 } from 'lucide-react'
import {
  differentiators,
  capabilities,
  process,
  clients,
  deliverableStats,
  deliverableGroups,
  servicesPageMeta,
} from '@/lib/servicesData'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { servicePages } from '@/lib/servicePageData'

export const metadata: Metadata = {
  title: servicesPageMeta.seoTitle,
  description: servicesPageMeta.seoDescription,
  openGraph: { title: servicesPageMeta.seoTitle, description: servicesPageMeta.seoDescription },
}

const differentiatorIcons = [Users, Cpu, Sparkles]

const capabilityIcons: Record<string, typeof Target> = {
  'Marketing Strategy': Target,
  'Social & Content Systems': Layers,
  'Content & Photography': Camera,
  'Films & Production': Film,
  'Digital Campaigns': Megaphone,
  'BTL & On-Ground Activation': MapPin,
  'Brand Communication': Palette,
  'Reporting & Optimisation': BarChart3,
}

export default function ServicesPage() {
  return (
    <main className="bg-ground text-ink min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[100px] max-w-[900px]">
        <SectionLabel className="mb-[26px] block">Managed services</SectionLabel>
        <h1 className="font-heading font-medium text-[42px] md:text-[68px] leading-[1.06] tracking-[-0.02em] mb-[30px]" style={{ textWrap: 'pretty' }}>
          Marketing, run as one system.
          <br />
          <span className="italic text-gold-text">Not five vendors pretending to talk to each other.</span>
        </h1>
        <p className="text-[18.5px] leading-[1.65] text-muted max-w-[620px] mb-10">
          Strategy, content, production, campaigns and on-ground activation — handled by one team, under one plan, with one person accountable for all of it. We&apos;re already running this for Gandhimathi Jewellers, JKR Tex and TNV Chits, and taking Rajaram&apos;s and Nellai Kuttam Snacks into new markets.
        </p>
        <a
          href="#contact"
          className="inline-block bg-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
        >
          Book a 20-min call
        </a>
      </section>

      {/* Working with */}
      <div className="border-y border-rule py-12 px-6 md:px-12 lg:px-[120px] flex items-center gap-11 flex-wrap">
        <SectionLabel tone="muted" className="flex-shrink-0">
          Working with
        </SectionLabel>
        <div className="flex items-center gap-9 flex-wrap">
          {clients.map((client) => (
            <span
              key={client.name}
              className={`font-heading text-xl ${client.stage === 'proposal' ? 'text-faint' : 'text-ink-2'}`}
            >
              {client.name}
              {client.stage === 'proposal' && (
                <span className="font-body text-[11px] tracking-[0.08em] uppercase"> · in progress</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Differentiators */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => {
            const Icon = differentiatorIcons[i]
            return (
              <div key={d.title} className="bg-surface border border-rule rounded-[18px] px-[34px] pt-[38px] pb-10">
                <span className="inline-flex w-10 h-10 rounded-full bg-gold-wash items-center justify-center mb-5">
                  <Icon size={18} className="text-gold-text" />
                </span>
                <h3 className="font-heading font-medium text-2xl mb-3.5">{d.title}</h3>
                <p className="text-[15px] leading-[1.68] text-muted">{d.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* What we do */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">What we do</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em]">
            One team across the <span className="italic text-gold-text">full execution layer.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c) => {
            const Icon = capabilityIcons[c.title]
            return (
              <div key={c.title} className="bg-surface border border-rule rounded-[16px] px-[26px] pt-[30px] pb-8">
                <span className="inline-flex w-9 h-9 rounded-full bg-gold-wash items-center justify-center mb-4">
                  <Icon size={16} className="text-gold-text" />
                </span>
                <h3 className="font-heading font-medium text-lg mb-2.5">{c.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-muted">{c.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* The eight services, each with its own page */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[660px] mb-[52px]">
          <SectionLabel className="mb-[22px] block">The engagement</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em] mb-5">
            Seven things we run. <span className="italic text-gold-text">Two nobody else can.</span>
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted">
            Market entry and BTL activation need people on the ground. No software competitor
            offers them, because software cannot.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicePages.map(svc => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className={`group block rounded-[16px] px-[26px] pt-[28px] pb-7 border transition-colors ${
                svc.flagship
                  ? 'bg-surface border-gold/25 hover:border-gold/50'
                  : 'bg-surface border-rule hover:border-gold/30'
              }`}
            >
              {svc.flagship && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-text bg-gold-wash rounded-full px-2 py-0.5 mb-3">
                  On the ground
                </span>
              )}
              <h3 className="font-heading font-medium text-[19px] mb-2.5">{svc.name}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-5">{svc.summary}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                Read <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* What we deliver, every month */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[680px] mb-[52px]">
          <SectionLabel className="mb-[22px] block">What we deliver</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em] mb-5">
            A month of work, <span className="italic text-gold-text">counted out in advance.</span>
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted">
            No retainer that quietly shrinks. Here&apos;s what a full-scope engagement looks like in a
            month — volumes are agreed up front and scoped to your market before anything is signed.
          </p>
        </div>

        {/* Headline volumes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/20 rounded-[16px] overflow-hidden mb-[52px]">
          {deliverableStats.map((s) => (
            <div key={s.label} className="bg-gold px-6 py-8 text-center">
              <div className="font-heading text-[44px] leading-none text-[#1A1208] mb-2.5">{s.value}</div>
              <div className="font-body text-[11.5px] leading-[1.4] uppercase tracking-[0.07em] text-[#1A1208]/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="flex flex-col gap-10">
          {deliverableGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-heading font-medium text-[26px] mb-1 pb-3.5 border-b border-gold/30">
                {group.title}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse">
                  <thead>
                    <tr className="text-left">
                      <th className="neb-label font-normal py-3.5 pr-5 w-[22%] align-top">Format</th>
                      <th className="neb-label font-normal py-3.5 pr-5 w-[22%] align-top">Volume</th>
                      <th className="neb-label font-normal py-3.5 align-top">What it covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.format} className="border-t border-rule align-top">
                        <td className="py-[18px] pr-5 text-[14.5px] text-gold-text">{row.format}</td>
                        <td className="py-[18px] pr-5 text-[14.5px] text-ink-2">{row.volume}</td>
                        <td className="py-[18px] text-[14.5px] leading-[1.6] text-muted">{row.covers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13.5px] leading-[1.6] text-faint mt-9 max-w-[680px]">
          Media spend and creator fees are billed separately, at actuals — never marked up and never
          buried inside the retainer.
        </p>

        {/* On-ground activation is the least visible thing we do and the hardest
            for a competitor to copy — it should not be text-only. */}
        <div className="grid md:grid-cols-2 gap-5 mt-[52px]">
          <MediaSlot id="btl-sampling" ratio="3 / 2" />
          <MediaSlot id="btl-instore" ratio="3 / 2" />
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* How we work */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">How we work</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em] mb-4">
            One system, five stages, <span className="italic text-gold-text">one team accountable end to end.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {process.map((p) => (
            <div key={p.step} className="border-t border-gold/30 pt-6">
              <div className="font-heading text-2xl text-gold-text mb-3">{p.step}</div>
              <h3 className="font-heading font-medium text-lg mb-2">{p.title}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section id="contact" className="relative px-6 md:px-12 lg:px-[120px] py-[130px] pb-[140px] text-center border-t border-rule overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="font-heading font-medium text-[36px] md:text-[56px] leading-[1.08] tracking-[-0.02em] mb-6">
            Tell us what you sell.
            <br />
            <span className="italic text-gold-text">We&apos;ll tell you what we&apos;d do.</span>
          </h2>
          <p className="text-[17px] leading-[1.65] text-muted max-w-[480px] mx-auto mb-10">
            Twenty minutes, no deck, no pitch. If we&apos;re the wrong fit we&apos;ll say so on the call and point you somewhere better.
          </p>
          <a
            href={`mailto:hello@nebulaa.ai?subject=${encodeURIComponent("Managed services — let's talk")}`}
            className="inline-block bg-gold text-[#1A1208] text-[15px] font-semibold px-[34px] py-4 rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
          >
            Book a 20-min call
          </a>
        </div>
      </section>
    </main>
  )
}
