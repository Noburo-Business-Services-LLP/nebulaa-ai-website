import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { resources, getResource } from '@/lib/resourceData'
import SectionLabel from '@/components/ui/SectionLabel'
import DownloadGate from '@/components/ui/DownloadGate'
import Schema, { breadcrumbSchema } from '@/components/ui/Schema'

export function generateStaticParams() {
  return resources.map(r => ({ resource: r.slug }))
}

export async function generateMetadata({ params }: { params: { resource: string } }): Promise<Metadata> {
  const r = getResource(params.resource)
  if (!r) return {}
  return {
    title: r.seoTitle,
    description: r.seoDescription,
    openGraph: { title: r.seoTitle, description: r.seoDescription },
  }
}

export default function ResourcePage({ params }: { params: { resource: string } }) {
  const r = getResource(params.resource)
  if (!r) notFound()

  const others = resources.filter(o => o.slug !== r.slug).slice(0, 3)

  return (
    <main className="bg-ground text-ink min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: 'Resources', path: '/resources' },
          { name: r.title, path: `/resources/${r.slug}` },
        ])}
      />

      <section className="px-6 md:px-12 lg:px-[120px] pt-[130px] pb-[70px]">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint mb-8">
          <Link href="/resources" className="hover:text-gold-text">Resources</Link>
          <span>/</span>
          <span className="text-muted">{r.title}</span>
        </nav>

        <div className="max-w-[820px]">
          <div className="flex flex-wrap items-center gap-3 mb-[22px]">
            <SectionLabel>{r.format}</SectionLabel>
            {r.pages && <span className="text-[12.5px] text-faint">{r.pages}</span>}
          </div>
          <h1
            className="font-heading font-medium text-[36px] md:text-[52px] leading-[1.1] tracking-[-0.02em] mb-[20px]"
            style={{ textWrap: 'pretty' }}
          >
            {r.title}
          </h1>
          <p className="text-[18px] leading-[1.5] text-gold-text mb-6">{r.subtitle}</p>
          <p className="text-[16.5px] leading-[1.7] text-muted max-w-[620px] mb-4">{r.description}</p>
          <p className="text-[16px] leading-[1.7] text-ink-2 max-w-[620px]">
            <span className="text-muted">Use it to </span>
            {r.useItTo}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[100px]">
        <div className="max-w-[820px]">
          <DownloadGate file={r.file} title={r.title} source={r.title} />
        </div>
      </section>

      <hr className="border-t border-rule" />

      <section className="px-6 md:px-12 lg:px-[120px] py-[100px]">
        <SectionLabel className="mb-[26px] block">Also free</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-5">
          {others.map(o => (
            <Link
              key={o.slug}
              href={`/resources/${o.slug}`}
              className="group block hud-card rounded-[18px] px-[26px] pt-[28px] pb-7 hover:border-gold/30 transition-colors"
            >
              <h3 className="font-heading font-medium text-[18px] leading-[1.25] mb-2.5">{o.title}</h3>
              <p className="text-[13.5px] leading-[1.6] text-muted mb-4">{o.subtitle}</p>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                {o.file ? 'Get it' : 'Preview'} <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
