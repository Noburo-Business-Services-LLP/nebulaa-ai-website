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
    description: 'Free tools for founders and SME owners. Generate posts, emails, hashtags, and qualify leads instantly.',
    type: 'website',
  },
}

const grouped = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
  ;(acc[tool.category] ||= []).push(tool)
  return acc
}, {})

export default function ToolsPage() {
  return (
    <main className="bg-[#0A0A0A] text-[#F5F4F1] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[76px] max-w-[900px]">
        <div className="neb-glow-wash" />
        <div className="relative">
          <SectionLabel className="mb-[26px] block">Free tools · no signup</SectionLabel>
          <h1 className="font-heading font-medium text-[42px] md:text-[64px] leading-[1.06] tracking-[-0.02em] mb-7" style={{ textWrap: 'pretty' }}>
            Take the tools.
            <br />
            <span className="italic text-brand-gold">Keep them. Pay nothing.</span>
          </h1>
          <p className="text-[17px] md:text-[18px] leading-[1.65] text-white/55 max-w-[600px]">
            Each one runs on the same model that writes for Gravity. No signup, no card, no follow-up sequence afterwards — given what Pulsar does for a living, that would be a bit much. Use them forever and never speak to us. But if you&apos;re opening four of them every Monday, you already know what the product is for.
          </p>
        </div>
      </section>

      {/* Search affordance — visual only, wiring is out of scope */}
      <div className="px-6 md:px-12 lg:px-[120px] pb-[60px]">
        <div className="bg-[#151515] border border-white/10 rounded-[14px] px-[22px] py-[17px] flex items-center gap-[13px] max-w-[620px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-3.5-3.5"></path>
          </svg>
          <span className="text-[15px] text-white/35">Search tools — &ldquo;cold email&rdquo;, &ldquo;ICP&rdquo;, &ldquo;CAC&rdquo;&hellip;</span>
        </div>
      </div>

      {/* Tools, grouped by category */}
      <div className="px-6 md:px-12 lg:px-[120px] pb-[40px]">
        {Object.entries(grouped).map(([category, categoryTools]) => (
          <div key={category} className="mb-[60px]">
            <div className="flex items-baseline gap-4 mb-[26px]">
              <span className="font-heading font-medium text-[28px]">{category}</span>
              <SectionLabel tone="muted">{`${categoryTools.length} tool${categoryTools.length === 1 ? '' : 's'}`}</SectionLabel>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryTools.map(tool => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group block bg-[#151515] border border-white/[0.06] rounded-2xl px-6 py-[26px] hover:border-brand-gold/60 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="text-[26px] mb-4">{tool.icon}</div>
                  <h3 className="text-[15.5px] font-medium mb-[7px] text-[#F5F4F1] group-hover:text-brand-gold transition-colors leading-snug">
                    {tool.name.replace(/^Free /, '')}
                  </h3>
                  <p className="text-[13.5px] leading-[1.55] text-white/45">{tool.tagline}</p>
                  <div className="mt-4 text-brand-gold text-xs font-semibold">Use free &rarr;</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-t border-white/[0.06]" />

      {/* Bridge to product */}
      <section className="px-6 md:px-12 lg:px-[120px] py-[110px]">
        <div className="bg-[#151515] border border-brand-gold/[0.18] rounded-[24px] p-10 md:p-[62px] grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-[60px] items-center shadow-[inset_0_1px_0_0_rgba(255,214,150,0.07)]">
          <div>
            <SectionLabel className="mb-[22px] block">When one tool stops being enough</SectionLabel>
            <h2 className="font-heading font-medium text-[32px] md:text-[42px] leading-[1.14] tracking-[-0.02em] mb-5">
              These make one thing. <span className="italic text-brand-gold">Gravity makes all of it, every morning.</span>
            </h2>
            <p className="text-[15.5px] md:text-base leading-[1.68] text-white/55 max-w-[520px]">
              A tool forgets you the moment you close the tab. The product remembers your voice, your customers and your calendar — and it doesn&apos;t wait to be asked.
            </p>
          </div>
          <div className="flex flex-col gap-[13px]">
            <a
              href="/#pricing"
              className="bg-brand-gold text-[#1A1208] text-[15px] font-semibold py-[15px] rounded-full text-center shadow-[0_6px_22px_rgba(245,166,35,0.22)] hover:brightness-105 transition"
            >
              Start free — no card
            </a>
            <a
              href="/#gravity"
              className="border border-white/[0.14] text-white/80 text-[15px] font-medium py-[15px] rounded-full text-center hover:border-white/30 transition"
            >
              See what Gravity does
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
