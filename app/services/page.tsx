import type { Metadata } from 'next'
import { Users, Cpu, Sparkles, Target, Layers, Camera, Film, Megaphone, MapPin, Palette, BarChart3 } from 'lucide-react'
import { differentiators, capabilities, process, clients, servicesPageMeta } from '@/lib/servicesData'
import SectionLabel from '@/components/ui/SectionLabel'

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
    <main className="bg-[#0A0A0A] text-[#F5F4F1] min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[100px] max-w-[900px]">
        <SectionLabel className="mb-[26px] block">Managed services</SectionLabel>
        <h1 className="font-heading font-medium text-[42px] md:text-[68px] leading-[1.06] tracking-[-0.02em] mb-[30px]" style={{ textWrap: 'pretty' }}>
          Marketing, run as one system.
          <br />
          <span className="italic text-brand-gold">Not five vendors pretending to talk to each other.</span>
        </h1>
        <p className="text-[18.5px] leading-[1.65] text-white/55 max-w-[620px] mb-10">
          Strategy, content, production, campaigns and on-ground activation — handled by one team, under one plan, with one person accountable for all of it. We&apos;re already running this for Gandhimathi Jewellers, JKR Tex and TNV Chits, taking Rajaram&apos;s and Nellai Kuttam Snacks into new markets, and scoping a regional programme with Bosch.
        </p>
        <a
          href="#contact"
          className="inline-block bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
        >
          Book a 20-min call
        </a>
      </section>

      {/* Working with */}
      <div className="border-y border-white/[0.06] py-12 px-6 md:px-12 lg:px-[120px] flex items-center gap-11 flex-wrap">
        <SectionLabel tone="muted" className="flex-shrink-0">
          Working with
        </SectionLabel>
        <div className="flex items-center gap-9 flex-wrap">
          {clients.map((client) => (
            <span
              key={client.name}
              className={`font-heading text-xl ${client.stage === 'proposal' ? 'text-white/30' : 'text-white/[0.62]'}`}
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
              <div key={d.title} className="bg-[#151515] border border-white/[0.06] rounded-[18px] px-[34px] pt-[38px] pb-10">
                <span className="inline-flex w-10 h-10 rounded-full bg-brand-gold/10 items-center justify-center mb-5">
                  <Icon size={18} className="text-brand-gold" />
                </span>
                <h3 className="font-heading font-medium text-2xl mb-3.5">{d.title}</h3>
                <p className="text-[15px] leading-[1.68] text-white/55">{d.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-white/[0.06]" />

      {/* What we do */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">What we do</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em]">
            One team across the <span className="italic text-brand-gold">full execution layer.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c) => {
            const Icon = capabilityIcons[c.title]
            return (
              <div key={c.title} className="bg-[#151515] border border-white/[0.06] rounded-[16px] px-[26px] pt-[30px] pb-8">
                <span className="inline-flex w-9 h-9 rounded-full bg-brand-gold/10 items-center justify-center mb-4">
                  <Icon size={16} className="text-brand-gold" />
                </span>
                <h3 className="font-heading font-medium text-lg mb-2.5">{c.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-white/50">{c.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-t border-white/[0.06]" />

      {/* How we work */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[120px]">
        <div className="max-w-[640px] mb-[62px]">
          <SectionLabel className="mb-[22px] block">How we work</SectionLabel>
          <h2 className="font-heading font-medium text-4xl md:text-[48px] leading-[1.12] tracking-[-0.02em] mb-4">
            One system, five stages, <span className="italic text-brand-gold">one team accountable end to end.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {process.map((p) => (
            <div key={p.step} className="border-t border-brand-gold/30 pt-6">
              <div className="font-heading text-2xl text-brand-gold mb-3">{p.step}</div>
              <h3 className="font-heading font-medium text-lg mb-2">{p.title}</h3>
              <p className="text-[13.5px] leading-[1.6] text-white/50">{p.body}</p>
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
            href={`mailto:hello@nebulaa.ai?subject=${encodeURIComponent("Managed services — let's talk")}`}
            className="inline-block bg-brand-gold text-[#1A1208] text-[15px] font-semibold px-[34px] py-4 rounded-full shadow-[0_6px_26px_rgba(245,166,35,0.24)] hover:brightness-105 transition"
          >
            Book a 20-min call
          </a>
        </div>
      </section>
    </main>
  )
}
