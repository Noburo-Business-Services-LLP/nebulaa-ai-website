import type { Metadata } from 'next'
import { Target, Layers, Camera, Film, Megaphone, MapPin, Palette, BarChart3 } from 'lucide-react'
import {
  differentiators,
  capabilities,
  process,
  deliverableStats,
  deliverableGroups,
  servicesPageMeta,
} from '@/lib/servicesData'
import SectionLabel from '@/components/ui/SectionLabel'
import ClientMarquee from '@/components/home/ClientMarquee'
import { TeamIllustration, MachineAndPersonIllustration, TargetIllustration } from '@/components/ui/Illustrations'
import MediaSlot from '@/components/ui/MediaSlot'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import { capabilityIcon, TINTS } from '@/lib/capabilityIcons'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { waLink } from '@/lib/contact'
import { servicePages } from '@/lib/servicePageData'
import StatCounter from '@/components/ui/StatCounter'

export const metadata: Metadata = {
  title: servicesPageMeta.seoTitle,
  description: servicesPageMeta.seoDescription,
  openGraph: { title: servicesPageMeta.seoTitle, description: servicesPageMeta.seoDescription },
}

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
    <main className="text-ink min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[100px] max-w-[900px]">
        <SectionLabel className="mb-[26px] block">Managed services</SectionLabel>
        <h1 className="neb-display text-[42px] md:text-[68px] mb-[30px]" style={{ textWrap: 'pretty' }}>
          <span className="text-gold-display">One team</span> runs your entire marketing function.
        </h1>
        <p className="text-[18.5px] leading-[1.6] text-ink-2 max-w-[620px] mb-9">
          Strategy, content, shoots, campaigns and on-ground work, all handled by one team under one plan,
          with one person accountable for all of it. We already do this for nine businesses across Tamil Nadu, from jewellers and textile shops to hotels and chit funds.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={waLink('Hi, I would like the Nebulaa team to run my marketing.')} variant="whatsapp" size="lg">
            <WhatsAppIcon size={18} /> WhatsApp us
          </Button>
          <Button href="#contact" variant="secondary" size="lg">How a call works</Button>
        </div>
      </section>

      <ClientMarquee title="Businesses we run marketing for" />

      {/* Why us: three cards with a moving picture each */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[90px]">
        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => {
            const Art = [TeamIllustration, MachineAndPersonIllustration, TargetIllustration][i]
            const tint = ['bg-peach', 'bg-sky', 'bg-mint'][i]
            return (
              <Reveal key={d.title} delay={i * 0.1}>
                <div className={`group h-full rounded-[28px] ${tint} px-7 pt-8 pb-9 transition-transform duration-300 hover:-translate-y-1.5`}>
                  <Art />
                  <h3 className="font-heading text-[24px] leading-[1.18] mt-5 mb-2.5">{d.title}</h3>
                  <p className="text-[16px] leading-[1.5] text-ink-2">{d.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* What we do */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">What we do</SectionLabel>
          <h2 className="neb-display text-4xl md:text-[48px]">
            One team across the <span className="text-gold-display">full execution layer.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c, ci) => {
            const Icon = capabilityIcons[c.title]
            return (
              <Reveal key={c.title} delay={(ci % 4) * 0.06}>
                <div className="group h-full hud-card rounded-[22px] px-[24px] pt-[24px] pb-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,32,58,0.1)]">
                  <span className={`neb-wiggle mb-4 flex w-14 h-14 items-center justify-center rounded-2xl ${TINTS[ci % 4]}`}>
                    <Icon size={26} className="text-ink" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-heading font-medium text-[18px] mb-2">{c.title}</h3>
                  <p className="text-[14px] leading-[1.55] text-ink-2">{c.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* The eight services, each with its own page */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[660px] mb-[52px]">
          <SectionLabel className="mb-[22px] block">The engagement</SectionLabel>
          <h2 className="neb-display text-4xl md:text-[48px] mb-5">
            The <span className="text-gold-display">seven services</span> we deliver.
          </h2>
          <p className="text-[16px] leading-[1.68] text-muted">
            Market entry and BTL activation need people on the ground. No software competitor
            offers them, because software cannot. On-ground work is delivered through our partner network.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicePages.map((svc, si) => {
            const SvcIcon = capabilityIcon(svc.slug)
            return (
            <Reveal key={svc.slug} delay={(si % 4) * 0.06}>
            <Link
              href={`/services/${svc.slug}`}
              className={`group block h-full rounded-[22px] px-[26px] pt-[26px] pb-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,32,58,0.1)] ${
                svc.flagship
                  ? 'bg-surface border-gold/40'
                  : 'bg-surface border-rule'
              }`}
            >
              <span className={`neb-wiggle mb-4 flex w-12 h-12 items-center justify-center rounded-2xl ${TINTS[si % 4]}`}>
                <SvcIcon size={22} className="text-ink" strokeWidth={1.8} />
              </span>
              {svc.flagship && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.08em] text-gold-text bg-gold-wash rounded-full px-2 py-0.5 mb-3">
                  On the ground
                </span>
              )}
              <h3 className="font-heading font-medium text-[19px] mb-2.5">{svc.name}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-5">{svc.summary}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-bold text-coral-text group-hover:gap-2.5 transition-all">
                Read <ArrowRight size={13} />
              </span>
            </Link>
            </Reveal>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-rule" />

      {/* What we deliver, every month */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[680px] mb-[52px]">
          <SectionLabel className="mb-[22px] block">What we deliver</SectionLabel>
          <h2 className="neb-display text-4xl md:text-[48px] mb-5">
            We agree the <span className="text-gold-display">full month&apos;s deliverables</span> with you in advance.
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
              <div className="font-heading text-[44px] leading-none text-[#1A1208] mb-2.5">
                <StatCounter value={Number(s.value)} />
              </div>
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
          <h2 className="neb-display text-4xl md:text-[48px] mb-4">
            Five stages, run by <span className="text-gold-display">the same team</span> from first draft to report.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {process.map((p, pi) => {
            const PIcon = [Target, Palette, Camera, Megaphone, BarChart3][pi] ?? Target
            return (
              <Reveal key={p.step} delay={pi * 0.08}>
                <div className={`group h-full rounded-[22px] ${TINTS[pi % 4]} p-5 transition-transform duration-300 hover:-translate-y-1`}>
                  <span className="neb-wiggle mb-4 flex w-12 h-12 items-center justify-center rounded-2xl bg-surface">
                    <PIcon size={22} className="text-ink" strokeWidth={1.8} />
                  </span>
                  <div className="text-[11px] font-extrabold tracking-[0.14em] text-ink-2 mb-1">STEP {p.step}</div>
                  <h3 className="font-heading text-[19px] mb-1.5">{p.title}</h3>
                  <p className="text-[14px] leading-[1.5] text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Close */}
      <section id="contact" className="relative px-6 md:px-12 lg:px-[120px] py-[130px] pb-[140px] text-center border-t border-rule overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 62%)' }}
        />
        <div className="relative">
          <h2 className="neb-display text-[36px] md:text-[56px] mb-6">
            Message us and we&apos;ll send a written scope within <span className="text-gold-display">two working days.</span>
          </h2>
          <p className="text-[17px] leading-[1.65] text-muted max-w-[480px] mx-auto mb-10">
            Twenty minutes, no deck, no pitch. If we&apos;re the wrong fit we&apos;ll say so on the call and point you somewhere better.
          </p>
          <Button href={waLink('Hi, I would like the Nebulaa team to run my marketing.')} variant="whatsapp" size="lg">
            <WhatsAppIcon size={18} /> WhatsApp us to book
          </Button>
        </div>
      </section>
    </main>
  )
}
