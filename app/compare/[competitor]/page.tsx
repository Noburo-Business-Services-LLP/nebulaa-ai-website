import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCompareData, compareData } from '@/lib/compareData'

export function generateStaticParams() {
  return Object.keys(compareData).map(slug => ({ competitor: `nebulaa-vs-${slug}` }))
}

export async function generateMetadata({ params }: { params: { competitor: string } }): Promise<Metadata> {
  const slug = params.competitor.replace('nebulaa-vs-', '')
  const data = getCompareData(slug)
  if (!data) return {}
  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: { title: data.seoTitle, description: data.seoDescription },
  }
}

export default function ComparePage({ params }: { params: { competitor: string } }) {
  const slug = params.competitor.replace('nebulaa-vs-', '')
  const data = getCompareData(slug)
  if (!data) notFound()

  return (
    <main className="bg-white dark:bg-brand-black min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-brand-muted dark:text-white/40">
          <Link href="/" className="hover:text-brand-gold">Home</Link>
          <span>/</span>
          <span>Compare</span>
          <span>/</span>
          <span className="text-brand-text dark:text-white/70">{data.headline}</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        {/* Hero */}
        <div className="text-center py-12 border-b border-brand-border dark:border-white/5 mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white mb-4">{data.headline}</h1>
          <p className="font-body text-lg text-brand-muted dark:text-white/60 max-w-2xl mx-auto">{data.subheadline}</p>
        </div>

        {/* Quick verdict */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-brand-gold/10 dark:bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-6">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">Best for</p>
            <p className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">Nebulaa</p>
            <p className="font-body text-sm text-brand-muted dark:text-white/60">{data.bestFor.nebulaa}</p>
          </div>
          <div className="bg-brand-off-white dark:bg-white/5 border border-brand-border dark:border-white/8 rounded-2xl p-6">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-brand-muted dark:text-white/40 mb-3">Best for</p>
            <p className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">{data.competitor}</p>
            <p className="font-body text-sm text-brand-muted dark:text-white/60">{data.bestFor.competitor}</p>
          </div>
        </div>

        {/* Feature table */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-brand-border dark:border-white/8">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-off-white dark:bg-white/5 border-b border-brand-border dark:border-white/8">
                  <th className="font-body text-sm font-semibold text-brand-text dark:text-white text-left px-5 py-3">Feature</th>
                  <th className="font-body text-sm font-semibold text-brand-gold text-center px-5 py-3">Nebulaa</th>
                  <th className="font-body text-sm font-semibold text-brand-muted dark:text-white/60 text-center px-5 py-3">{data.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {data.tableRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-brand-border dark:border-white/5 ${
                      i % 2 === 0 ? 'bg-white dark:bg-brand-black' : 'bg-brand-off-white/50 dark:bg-white/[0.02]'
                    }`}
                  >
                    <td className="font-body text-sm text-brand-text dark:text-white px-5 py-3">{row.feature}</td>
                    <td className="font-body text-sm text-center px-5 py-3">{row.nebulaa}</td>
                    <td className="font-body text-sm text-center px-5 py-3">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What each does well */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/8 rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-brand-text dark:text-white mb-4">Where Nebulaa stands out</h3>
            <ul className="space-y-2">
              {data.nebulaaStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-brand-text dark:text-white/80">
                  <span className="text-brand-gold mt-0.5 flex-shrink-0">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/8 rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-brand-text dark:text-white mb-4">Where {data.competitor} stands out</h3>
            <ul className="space-y-2">
              {data.competitorStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-brand-text dark:text-white/80">
                  <span className="text-brand-muted dark:text-white/40 mt-0.5 flex-shrink-0">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-brand-warm-gray dark:bg-[#111110] rounded-2xl p-8 border border-brand-border dark:border-white/5 mb-12">
          <h2 className="font-heading font-bold text-xl text-brand-text dark:text-white mb-3">Our verdict</h2>
          <p className="font-body text-base text-brand-muted dark:text-white/60 leading-relaxed">{data.verdict}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-heading font-bold text-2xl text-brand-text dark:text-white mb-4">Ready to try Nebulaa?</p>
          <p className="font-body text-base text-brand-muted dark:text-white/60 mb-6">7-day free trial. No credit card required.</p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-8 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
          >
            Start free trial →
          </a>
        </div>
      </div>
    </main>
  )
}
