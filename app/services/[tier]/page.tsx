import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serviceTiers } from '@/lib/servicesData'

export function generateStaticParams() {
  return Object.keys(serviceTiers).map(tier => ({ tier }))
}

export async function generateMetadata({ params }: { params: { tier: string } }): Promise<Metadata> {
  const data = serviceTiers[params.tier]
  if (!data) return {}
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: { title: data.seoTitle, description: data.seoDescription },
  }
}

export default function ServiceTierPage({ params }: { params: { tier: string } }) {
  const data = serviceTiers[params.tier]
  if (!data) notFound()

  const otherTier = data.slug === 'enterprise' ? serviceTiers.msme : serviceTiers.enterprise

  return (
    <main className="bg-white dark:bg-brand-black min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-brand-muted dark:text-white/40">
          <Link href="/" className="hover:text-brand-gold">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-brand-text dark:text-white/70">{data.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-20">
        {/* Hero */}
        <div className="py-16 border-b border-brand-border dark:border-white/5 mb-12">
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-brand-gold">{data.eyebrow}</span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white mt-3 mb-4 max-w-3xl">{data.headline}</h1>
          <p className="font-body text-lg text-brand-muted dark:text-white/60 max-w-2xl mb-8">{data.subheadline}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-7 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
          >
            {data.ctaLabel} →
          </a>
        </div>

        {/* Who it's for */}
        <div className="mb-14">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-4">Who this is for</h2>
          <p className="font-body text-base text-brand-muted dark:text-white/60 max-w-2xl">{data.whoFor}</p>
        </div>

        {/* What you get */}
        <div className="mb-14">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-6">What you get</h2>
          <div className="space-y-3">
            {data.whatYouGet.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-brand-warm-gray dark:bg-[#111110] border border-brand-border dark:border-white/8 rounded-xl p-4">
                <span className="text-brand-gold mt-0.5 flex-shrink-0">✓</span>
                <p className="font-body text-sm text-brand-text dark:text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        {data.clients.length > 0 && (
          <div className="mb-14">
            <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-6">Who we work with</h2>
            <div className="flex flex-wrap gap-3">
              {data.clients.map((c) => (
                <div key={c.name} className="bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/8 rounded-xl px-5 py-3">
                  <span className="font-body text-sm font-semibold text-brand-text dark:text-white">{c.name}</span>
                  {c.stage === 'proposal' && (
                    <span className="font-body text-xs text-brand-muted dark:text-white/40 ml-2">— in progress</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Illustrative examples — placeholder copy pending */}
        <div className="mb-14">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-2">The kind of shift this typically drives</h2>
          <p className="font-body text-xs text-brand-muted dark:text-white/40 mb-6">Illustrative examples, not attributed quotes.</p>
          <div className={`grid grid-cols-1 gap-6 ${data.illustrativeExamples.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {data.illustrativeExamples.map((ex, i) => (
              <div key={i} className="bg-brand-off-white dark:bg-[#111110] border border-dashed border-brand-border dark:border-white/15 rounded-2xl p-6">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-3">{ex.industryLabel}</p>
                <p className="font-body text-sm text-brand-muted-2 dark:text-white/30 italic">
                  {ex.copy ?? 'Copy pending — placeholder slot'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-link to other tier */}
        <div className="mb-14 text-center">
          <p className="font-body text-sm text-brand-muted dark:text-white/50">
            Looking for {otherTier.name === 'Enterprise' ? 'enterprise-scale' : 'MSME-scoped'} managed marketing instead?{' '}
            <Link href={`/services/${otherTier.slug}`} className="text-brand-gold hover:underline">See {otherTier.name} services →</Link>
          </p>
        </div>

        {/* CTA */}
        <div id="contact" className="text-center bg-brand-warm-gray dark:bg-[#111110] rounded-3xl p-12 border border-brand-border dark:border-white/5">
          <h2 className="font-heading font-bold text-3xl text-brand-text dark:text-white mb-4">
            Let&apos;s talk about your marketing.
          </h2>
          <p className="font-body text-base text-brand-muted dark:text-white/60 mb-8 max-w-lg mx-auto">
            Tell us about your business and we&apos;ll get back to you with how this could work.
          </p>
          <a
            href="mailto:hello@nebulaa.ai"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-8 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
          >
            {data.ctaLabel} →
          </a>
        </div>
      </div>
    </main>
  )
}
