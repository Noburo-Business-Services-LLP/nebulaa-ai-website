import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowDown, MessageCircleQuestion, CalendarCheck, MessageCircle, Star, Camera, Handshake } from 'lucide-react'
import { getIndustryData, industries, industryMeta } from '@/lib/industryData'
import { waLink } from '@/lib/contact'
import SectionLabel from '@/components/ui/SectionLabel'
import MediaSlot from '@/components/ui/MediaSlot'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import Schema, { breadcrumbSchema, serviceSchema } from '@/components/ui/Schema'

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

const PASTELS = ['bg-peach', 'bg-mint', 'bg-sky', 'bg-lav']
const USE_ICONS = [CalendarCheck, MessageCircle, Star, Camera]
const JOURNEY_TINTS = ['bg-peach', 'bg-sky', 'bg-lav', 'bg-mint', 'bg-peach', 'bg-sky']

/**
 * The industry page is the ad as a web page: the owner's own situation, what
 * changes for them, the price and a WhatsApp button that already says what
 * they run. Each industry's ads land here rather than on the homepage.
 */
export default function IndustryPage({ params }: { params: { industry: string } }) {
  const data = getIndustryData(params.industry)
  if (!data) notFound()
  const meta = industryMeta[data.slug]
  const wa = waLink(meta.waMessage)

  return (
    <main className="text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'By industry', path: '/for' },
          { name: data.name, path: `/for/${data.slug}` },
        ])}
      />
      <Schema
        data={serviceSchema({
          name: `Marketing for ${data.name}`,
          description: data.seoDescription,
          url: `/for/${data.slug}`,
        })}
      />

      {/* Hero: a photo of the industry behind the headline, on a sunset fallback */}
      <section className="dark relative isolate overflow-hidden bg-ground text-ink min-h-[560px] md:min-h-[620px] flex flex-col justify-end">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_85%_100%,#EE6330_0%,rgba(238,99,48,0)_60%),radial-gradient(70%_60%_at_100%_0%,#F5A623_0%,rgba(245,166,35,0)_55%),linear-gradient(160deg,#14203A_0%,#1F2A55_55%,#4A2F4F_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <MediaSlot id={meta.photoSlot} ratio="auto" bare priority className="!h-full !rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14203A]/90 via-[#14203A]/55 to-[#14203A]/10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#14203A]/70 to-transparent" />
        </div>
        <div className="relative px-5 md:px-12 lg:px-[120px] pt-[130px] pb-14 md:pb-16 max-w-[900px]">
          <SectionLabel className="mb-5 block">{data.eyebrow}</SectionLabel>
          <h1 className="neb-display text-[42px] sm:text-[60px] lg:text-[80px] mb-6">
            {data.headline}
            <br />
            <span className="script-accent text-[1.1em] leading-none">{data.headlineEmphasis}</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink-2 max-w-[600px] mb-8">{data.subheadline}</p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Button href={wa} variant="whatsapp" size="lg">
              <WhatsAppIcon size={18} /> WhatsApp us
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See the plans <ArrowRight size={16} />
            </Button>
          </div>
          <p className="text-[13.5px] text-ink-2/80">From ₹999 a month · 7-day free trial · No card to start</p>
        </div>
      </section>

      {data.clients.length > 0 && (
        <div className="border-b border-rule py-7 px-5 md:px-12 lg:px-[120px] flex items-center gap-x-8 gap-y-2 flex-wrap">
          <SectionLabel tone="muted">Working with</SectionLabel>
          {data.clients.map(client => (
            <span key={client.name} className={`font-heading text-[16px] ${client.stage === 'proposal' ? 'text-faint' : 'text-ink'}`}>
              {client.name}
              {client.stage === 'proposal' && <span className="text-[11px] font-bold tracking-[0.08em] uppercase"> · in progress</span>}
            </span>
          ))}
        </div>
      )}

      {/* The owner's own situation */}
      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px]">
        <SectionLabel className="mb-4 block">Sound familiar?</SectionLabel>
        <h2 className="neb-display text-[34px] md:text-[52px] mb-10 max-w-[760px]">
          If you run a {meta.person}, <span className="text-gold-display">this happens.</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.painPoints.map((pain, i) => (
            <div key={i} className={`rounded-[22px] ${PASTELS[i % 4]} p-6 flex items-start gap-4`}>
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <MessageCircleQuestion size={19} className="text-ink" />
              </span>
              <p className="text-[16px] leading-[1.55] font-medium text-ink pt-1.5">{pain}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What changes */}
      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px] bg-surface-2">
        <SectionLabel className="mb-4 block">What changes</SectionLabel>
        <h2 className="neb-display text-[34px] md:text-[52px] mb-10 max-w-[760px]">
          What we do for <span className="text-gold-display">your {meta.person}.</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.useCases.map((uc, i) => {
            const Icon = USE_ICONS[i % USE_ICONS.length]
            return (
              <div key={i} className="rounded-[22px] bg-surface border border-rule p-6 flex items-start gap-4">
                <span className={`flex-shrink-0 w-11 h-11 rounded-full ${PASTELS[i % 4]} flex items-center justify-center`}>
                  <Icon size={20} className="text-ink" />
                </span>
                <div>
                  <h3 className="font-heading text-[18px] leading-[1.25] mb-1.5">{uc.title}</h3>
                  <p className="text-[15px] leading-[1.55] text-ink-2">{uc.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Journey, where the industry has one */}
      {data.journey && (
        <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px]">
          <SectionLabel className="mb-4 block">The customer journey</SectionLabel>
          <h2 className="neb-display text-[34px] md:text-[52px] mb-10 max-w-[760px]">
            From searching to <span className="text-gold-display">staying with you.</span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {data.journey.map((step, i) => (
              <div key={step.title} className="relative">
                <div className={`h-full rounded-[20px] ${JOURNEY_TINTS[i]} p-5`}>
                  <span className="inline-flex w-8 h-8 rounded-full bg-ink text-ground text-[14px] font-extrabold items-center justify-center mb-3">{i + 1}</span>
                  <h3 className="font-heading text-[16.5px] leading-[1.25] mb-1.5">{step.title}</h3>
                  <p className="text-[13.5px] leading-[1.5] text-ink-2">{step.body}</p>
                </div>
                {i < data.journey!.length - 1 && (
                  <ArrowDown size={18} className="sm:hidden mx-auto mt-2 text-coral" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sample creative */}
      {data.creativeSlot && (
        <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px] bg-surface-2">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 items-center">
            <div>
              <SectionLabel className="mb-4 block">What it looks like</SectionLabel>
              <h2 className="neb-display text-[34px] md:text-[48px] mb-4">
                A post made <span className="text-gold-display">for {data.name.toLowerCase()}.</span>
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-2 max-w-[460px]">
                An example of the style and tone we write in for this industry. It is a sample, not a client&apos;s published post.
              </p>
            </div>
            <div className="rounded-[24px] overflow-hidden border border-rule shadow-[0_14px_34px_rgba(20,32,58,0.1)]">
              <MediaSlot id={data.creativeSlot} ratio="1 / 1" compact />
            </div>
          </div>
        </section>
      )}

      {/* Price */}
      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px]">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-[26px] bg-peach p-7 md:p-9">
            <SectionLabel tone="muted" className="mb-3 block">Use the app yourself</SectionLabel>
            <p className="font-digital text-[40px] uppercase leading-none mb-3">From ₹999<span className="text-[18px] text-ink-2"> / month</span></p>
            <p className="text-[15.5px] leading-[1.55] text-ink-2 mb-6">Posts, new customers and WhatsApp replies from day one. Stop any month.</p>
            <Button href="/pricing" variant="primary">See the plans</Button>
          </div>
          <div className="rounded-[26px] bg-mint p-7 md:p-9">
            <SectionLabel tone="muted" className="mb-3 block">Let our team run it</SectionLabel>
            <p className="font-digital text-[40px] uppercase leading-none mb-3">Quoted <span className="text-[18px] text-ink-2">for your {meta.person}</span></p>
            <p className="text-[15.5px] leading-[1.55] text-ink-2 mb-6">We plan, shoot, post and follow up. You approve and never log in.</p>
            <Button href={wa} variant="whatsapp">
              <WhatsAppIcon size={16} /> Talk to us
            </Button>
          </div>
        </div>
        <p className="mt-6 text-[14px] text-muted flex items-center gap-2">
          <Handshake size={16} className="text-coral-text" /> Not sure which fits? Message us and we&apos;ll tell you honestly.
        </p>
      </section>

      {/* Close */}
      <section className="px-5 md:px-12 lg:px-[120px] pb-16 md:pb-24">
        <div className="dark relative isolate overflow-hidden rounded-[32px] md:rounded-[40px] bg-ground text-ink">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_90%_at_95%_100%,#EE6330_0%,rgba(238,99,48,0)_62%),radial-gradient(60%_60%_at_70%_0%,#F5A623_0%,rgba(245,166,35,0)_55%),linear-gradient(150deg,#14203A_0%,#2A2C5C_60%,#5B3252_100%)]" aria-hidden="true" />
          <div className="relative py-12 md:py-16 px-7 md:px-14 max-w-[780px]">
            <h2 className="neb-display text-[36px] md:text-[60px] mb-5">
              Let&apos;s talk about
              <br />
              <span className="script-accent text-[1.15em] leading-none">your {meta.person}.</span>
            </h2>
            <p className="text-[17px] leading-[1.6] text-ink-2 max-w-[480px] mb-7">Tell us what you sell and where. We&apos;ll tell you what we&apos;d do and what it costs.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={wa} variant="whatsapp" size="lg">
                <WhatsAppIcon size={18} /> WhatsApp us
              </Button>
              <Link href="/for" className="text-[14.5px] font-semibold underline underline-offset-4 decoration-ink/30 hover:decoration-ink">See other industries</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
