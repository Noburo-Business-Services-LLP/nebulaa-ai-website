import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { engagements } from '@/lib/engagementData'
import { waLink } from '@/lib/contact'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import WorkWall from '@/components/home/WorkWall'

const seoTitle = 'Our Work: Real Posts, Reels and Client Projects'
const seoDescription =
  'See real posts and reels made for Indian businesses, and the three kinds of project our team takes on: always-on content, market entry and regional programmes.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

const TINTS = ['bg-peach', 'bg-sky', 'bg-mint']

export default function WorkHubPage() {
  return (
    <main className="text-ink min-h-screen">
      <section className="px-5 md:px-12 lg:px-[120px] pt-[130px] pb-6 max-w-[960px]">
        <SectionLabel className="mb-5 block">Our work</SectionLabel>
        <h1 className="neb-display text-[44px] md:text-[80px] mb-6">
          Made for real businesses, <span className="text-gold-display">running right now.</span>
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.55] text-ink-2 max-w-[600px]">
          Posts and reels we have made for Indian businesses, and the kinds of project our team takes on.
        </p>
      </section>

      <WorkWall />

      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px] bg-surface-2">
        <SectionLabel className="mb-4 block">When our team runs it</SectionLabel>
        <h2 className="neb-display text-[34px] md:text-[52px] mb-4 max-w-[760px]">
          Three kinds of project. <span className="text-gold-display">Yours is one of them.</span>
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-ink-2 max-w-[620px] mb-10">
          Every project is scoped for the business, but they fall into three shapes. Knowing which one you
          need is most of what our first call settles.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {engagements.map((eng, i) => (
            <Link
              key={eng.slug}
              href={`/work/${eng.slug}`}
              className={`group rounded-[26px] ${TINTS[i % 3]} p-7 flex flex-col`}
            >
              <h3 className="font-heading text-[23px] leading-[1.18] mb-3">{eng.name}</h3>
              <p className="text-[15px] leading-[1.55] text-ink-2 mb-5">{eng.subheadline}</p>
              <p className="text-[13.5px] leading-[1.5] text-ink-2 bg-surface/70 rounded-[14px] p-4 mb-6">
                <span className="block text-[11px] font-bold uppercase tracking-[0.12em] mb-1">Suited to</span>
                {eng.forWho}
              </p>
              <span className="mt-auto flex items-center gap-1.5 text-[14.5px] font-bold group-hover:gap-2.5 transition-all">
                What it includes <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-12 lg:px-[120px] py-[72px] md:py-[96px]">
        <div className="max-w-[640px]">
          <h2 className="neb-display text-[30px] md:text-[44px] mb-5">Why there are no growth figures here.</h2>
          <p className="text-[16.5px] leading-[1.6] text-ink-2 mb-6">
            We only publish results a client has agreed to share. As those come in, they go on this page
            with the client&apos;s name on them. Until then we would rather show you real work than round numbers.
          </p>
          <Button href={waLink('Hi, I would like to see examples of your work.')} variant="whatsapp">
            <WhatsAppIcon size={16} /> Ask us for examples
          </Button>
        </div>
      </section>
    </main>
  )
}
