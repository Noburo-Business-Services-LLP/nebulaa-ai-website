import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getIndustryData, industries } from '@/lib/industryData'

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

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const data = getIndustryData(params.industry)
  if (!data) notFound()

  return (
    <main className="bg-white dark:bg-brand-black min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-brand-muted dark:text-white/40">
          <Link href="/" className="hover:text-brand-gold">Home</Link>
          <span>/</span>
          <span>For</span>
          <span>/</span>
          <span className="text-brand-text dark:text-white/70">{data.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-20">
        {/* Hero */}
        <div className="py-16 border-b border-brand-border dark:border-white/5 mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white mb-4 max-w-3xl">{data.headline}</h1>
          <p className="font-body text-lg text-brand-muted dark:text-white/60 max-w-2xl mb-8">{data.subheadline}</p>
          <div className="flex items-center gap-6">
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-7 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
            >
              Start free trial →
            </a>
            <div>
              <p className="font-heading font-bold text-2xl text-brand-text dark:text-white">{data.stat}</p>
              <p className="font-body text-xs text-brand-muted dark:text-white/50">{data.statLabel}</p>
            </div>
          </div>
        </div>

        {/* Pain points */}
        <div className="mb-14">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-6">Sound familiar?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.painPoints.map((pain, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl p-4"
              >
                <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                <p className="font-body text-sm text-brand-text dark:text-white/80">{pain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div className="mb-14">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-6">
            How Nebulaa helps {data.name.toLowerCase()}
          </h2>
          <div className="space-y-4">
            {data.useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/8 rounded-2xl p-6 flex items-start gap-5"
              >
                <span
                  className={`inline-block font-body text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5 ${
                    uc.agent === 'Gravity'
                      ? 'bg-brand-gold/15 text-brand-gold'
                      : uc.agent === 'Pulsar'
                      ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      : 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                  }`}
                >
                  {uc.agent === 'Gravity' ? '🌀' : uc.agent === 'Pulsar' ? '📞' : '⚡'} {uc.agent}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">{uc.title}</h3>
                  <p className="font-body text-sm text-brand-muted dark:text-white/60 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-brand-warm-gray dark:bg-[#111110] rounded-3xl p-12 border border-brand-border dark:border-white/5">
          <h2 className="font-heading font-bold text-3xl text-brand-text dark:text-white mb-4">
            Built for {data.name}. Ready in 60 seconds.
          </h2>
          <p className="font-body text-base text-brand-muted dark:text-white/60 mb-8 max-w-lg mx-auto">
            Just give Nebulaa your website URL. It learns your brand, builds your content queue, and starts outreach — automatically.
          </p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-8 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
          >
            Start your free 7-day trial →
          </a>
        </div>
      </div>
    </main>
  )
}
