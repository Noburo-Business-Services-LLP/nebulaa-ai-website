import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Minus } from 'lucide-react'
import { getCompareData, compareData } from '@/lib/compareData'

/** Renders the ✅/❌ markers stored in compareData as real icons rather than emoji. */
function SupportCell({ value }: { value: string }) {
  const supported = value.startsWith('✅')
  const unsupported = value.startsWith('❌')
  if (!supported && !unsupported) {
    return <span className="text-ink-2">{value}</span>
  }
  const note = value.slice(1).trim()
  return (
    <span className="inline-flex items-center justify-center gap-1.5">
      {supported ? (
        <Check size={16} className="text-gold-text" aria-label="Included" />
      ) : (
        <Minus size={16} className="text-muted/50" aria-label="Not included" />
      )}
      {note && <span className="text-muted text-[13px]">{note}</span>}
    </span>
  )
}

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
    <main className="bg-ground min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-muted">
          <Link href="/" className="hover:text-gold-text">Home</Link>
          <span>/</span>
          <span>Compare</span>
          <span>/</span>
          <span className="text-ink-2">{data.headline}</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        {/* Hero */}
        <div className="text-center py-12 border-b border-rule mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-ink mb-4">{data.headline}</h1>
          <p className="font-body text-lg text-ink-2 max-w-2xl mx-auto">{data.subheadline}</p>
        </div>

        {/* Quick verdict */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-gold-text mb-3">Best for</p>
            <p className="font-heading font-bold text-base text-ink mb-1">Nebulaa</p>
            <p className="font-body text-sm text-ink-2">{data.bestFor.nebulaa}</p>
          </div>
          <div className="bg-surface-2 border border-rule rounded-2xl p-6">
            <p className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-3">Best for</p>
            <p className="font-heading font-bold text-base text-ink mb-1">{data.competitor}</p>
            <p className="font-body text-sm text-ink-2">{data.bestFor.competitor}</p>
          </div>
        </div>

        {/* Feature table */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl text-ink mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-rule">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-2 border-b border-rule">
                  <th className="font-body text-sm font-semibold text-ink text-left px-5 py-3">Feature</th>
                  <th className="font-body text-sm font-semibold text-gold-text text-center px-5 py-3">Nebulaa</th>
                  <th className="font-body text-sm font-semibold text-ink-2 text-center px-5 py-3">{data.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {data.tableRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-rule ${
                      i % 2 === 0 ? 'bg-ground' : 'bg-surface-2/50 dark:bg-white/[0.02]'
                    }`}
                  >
                    <td className="font-body text-sm text-ink px-5 py-3">{row.feature}</td>
                    <td className="font-body text-sm text-center px-5 py-3"><SupportCell value={row.nebulaa} /></td>
                    <td className="font-body text-sm text-center px-5 py-3"><SupportCell value={row.competitor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What each does well */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-surface border border-rule rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-ink mb-4">Where Nebulaa stands out</h3>
            <ul className="space-y-2">
              {data.nebulaaStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-2">
                  <span className="text-gold-text mt-0.5 flex-shrink-0">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-rule rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg text-ink mb-4">Where {data.competitor} stands out</h3>
            <ul className="space-y-2">
              {data.competitorStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-body text-sm text-ink-2">
                  <span className="text-muted mt-0.5 flex-shrink-0">→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-surface-2 dark:bg-[#111110] rounded-2xl p-8 border border-rule mb-12">
          <h2 className="font-heading font-bold text-xl text-ink mb-3">Our verdict</h2>
          <p className="font-body text-base text-ink-2 leading-relaxed">{data.verdict}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-heading font-bold text-2xl text-ink mb-4">Ready to try Nebulaa?</p>
          <p className="font-body text-base text-ink-2 mb-6">7-day free trial. No credit card required.</p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-8 py-3.5 hover:brightness-110 transition-all hover:scale-[1.03]"
          >
            Start free trial →
          </a>
        </div>
      </div>
    </main>
  )
}
