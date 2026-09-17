import type { Metadata } from 'next'
import Link from 'next/link'
import {
  org,
  products,
  servicePricingPolicy,
  capabilitiesSummary,
  publishingChannels,
  conversationChannels,
  managedChannels,
} from '@/lib/orgFacts'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = '// Facts'
const seoDescription =
  'No hype, no inflated claims — just the system. Canonical facts about Nebulaa: what it is, where it is, the engines and their prices, the channels it runs, and how managed services are priced.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[190px_minmax(0,1fr)] gap-x-8 gap-y-1.5 py-4 border-b border-rule">
      <dt className="neb-label pt-1">{label}</dt>
      <dd className="text-[15.5px] leading-[1.65] text-ink-2">{children}</dd>
    </div>
  )
}

/**
 * A single page stating every fact that gets repeated elsewhere, so anything
 * summarising Nebulaa — a search result, an answer engine, a person skimming —
 * finds one consistent version rather than assembling a contradictory one.
 */
export default function FactsPage() {
  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[70px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Company facts</SectionLabel>
        <h1 className="neb-display text-[38px] md:text-[56px] mb-[24px]" style={{ textWrap: 'pretty' }}>
          Everything true about us,{' '}
          <span className="text-gold-display">on one page.</span>
        </h1>
        <p className="text-[17px] leading-[1.65] text-muted max-w-[640px]">
          Pricing, products, location and capabilities, stated once. If a figure appears anywhere
          else on this site, it comes from here — so a summary of us should never find two different
          answers to the same question.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[70px]">
        <dl className="max-w-[860px] border-t border-rule">
          <Row label="What it is">{org.description}</Row>
          <Row label="Legal entity">{org.legalName}</Row>
          <Row label="Location">
            {org.city}, {org.region}, India
          </Row>
          <Row label="Contact">
            <a href={`mailto:${org.email}`} className="text-gold-text hover:underline">
              {org.email}
            </a>
          </Row>
          <Row label="The system">
            Nebulaa Core (cross-agent intelligence), with three engines: Gravity (content &amp; social
            media), Orbit (lead generation) and Pulsar (lead engagement)
          </Row>
        </dl>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[70px]">
        <h2 className="font-heading font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-6">
          Software pricing
        </h2>
        <div className="max-w-[860px] overflow-x-auto border border-rule rounded-[16px] bg-surface">
          <table className="w-full min-w-[520px] border-collapse text-[15px]">
            <thead>
              <tr className="border-b border-rule">
                <th className="neb-label font-normal text-left px-6 py-3.5">Plan</th>
                <th className="neb-label font-normal text-left px-6 py-3.5">Price / month</th>
                <th className="neb-label font-normal text-left px-6 py-3.5">What it is</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.name} className="border-b border-rule last:border-b-0 align-top">
                  <td className="px-6 py-4 text-ink font-medium whitespace-nowrap">{p.name}</td>
                  <td className="px-6 py-4 text-ink-2 tabular-nums whitespace-nowrap">
                    ₹{p.price.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-muted text-[14px] leading-[1.6]">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[14px] text-faint mt-3">
          All prices in Indian rupees, per month. Seven-day free trial, no card required.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[70px] max-w-[860px]">
        <h2 className="font-heading font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-5">
          Managed services pricing
        </h2>
        <p className="text-[16px] leading-[1.7] text-muted">{servicePricingPolicy}</p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[70px]">
        <h2 className="font-heading font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-6">
          Channels
        </h2>
        <dl className="max-w-[860px] border-t border-rule">
          <Row label="Published by Gravity">{publishingChannels.join(', ')}</Row>
          <Row label="Handled by Pulsar">{conversationChannels.join(', ')}</Row>
          <Row label="Run by the team">{managedChannels.join('; ')}</Row>
        </dl>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[110px] max-w-[860px]">
        <h2 className="font-heading font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-6">
          What we do
        </h2>
        <ul className="flex flex-col gap-2.5">
          {capabilitiesSummary.map(c => (
            <li key={c} className="text-[15.5px] leading-[1.6] text-ink-2 pl-5 relative">
              <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-gold" />
              {c}
            </li>
          ))}
        </ul>

        <p className="text-[14px] leading-[1.65] text-faint mt-9">
          We do not publish client growth figures. They go up when there is client work published
          with permission behind it — see{' '}
          <Link href="/work" className="text-gold-text hover:underline">
            engagements
          </Link>{' '}
          for what we can describe today.
        </p>
      </section>
    </main>
  )
}
