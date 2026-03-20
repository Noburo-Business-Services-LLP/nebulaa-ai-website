import type { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '@/lib/toolsData'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Free Marketing Tools for Founders & SMEs — Nebulaa.ai',
  description: 'Free tools for founders: LinkedIn post generator, cold email generator, hashtag generator, lead qualification calculator, and more. No login required.',
  keywords: ['free marketing tools', 'founder tools', 'linkedin post generator', 'cold email generator', 'hashtag generator'],
  openGraph: {
    title: 'Free Marketing Tools for Founders & SMEs — Nebulaa.ai',
    description: 'Free tools used by 1,000+ founders. Generate posts, emails, hashtags, and qualify leads instantly.',
    type: 'website',
  },
}

export default function ToolsPage() {
  return (
    <main className="bg-white dark:bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="bg-brand-off-white dark:bg-[#0F0E0C] border-b border-brand-border dark:border-white/5 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <SectionLabel className="mb-4 block">Free Tools</SectionLabel>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-brand-text dark:text-white tracking-tight mb-4">
            Marketing tools that actually work.
          </h1>
          <p className="font-body text-lg text-brand-muted dark:text-white/60 max-w-2xl mx-auto">
            Free tools used by 2,000+ founders and SME owners. No login. No credit card. Just results.
          </p>
        </div>
      </div>

      {/* Tools grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group block bg-white dark:bg-[#1A1815] border border-brand-border dark:border-white/8 rounded-2xl p-5 hover:border-brand-gold hover:shadow-card transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-4">{tool.icon}</div>
              <span className="inline-block text-[10px] font-body font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 dark:bg-brand-gold/15 px-2 py-0.5 rounded-full mb-2">
                {tool.category}
              </span>
              <h2 className="font-heading font-bold text-base text-brand-text dark:text-white mb-2 group-hover:text-brand-gold transition-colors leading-snug">
                {tool.name}
              </h2>
              <p className="font-body text-xs text-brand-muted dark:text-white/50 leading-relaxed">{tool.tagline}</p>
              <div className="mt-4 flex items-center gap-1 text-brand-gold font-body text-xs font-semibold">
                Use free →
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-brand-warm-gray dark:bg-[#111110] rounded-3xl p-12 border border-brand-border dark:border-white/5">
          <p className="font-body text-xs font-bold tracking-widest uppercase text-brand-gold mb-3">Want everything automated?</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-text dark:text-white mb-4">
            Stop using tools manually.<br />Let Nebulaa run them for you.
          </h2>
          <p className="font-body text-base text-brand-muted dark:text-white/60 mb-8 max-w-lg mx-auto">
            Gravity posts daily. Pulsar calls your leads. You just close deals.
          </p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-8 py-3.5 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
          >
            Start 7-day free trial →
          </a>
        </div>
      </div>
    </main>
  )
}
