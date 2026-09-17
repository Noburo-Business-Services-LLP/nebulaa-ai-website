import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { channels, type RunBy } from '@/lib/channelData'
import SectionLabel from '@/components/ui/SectionLabel'

const seoTitle = 'Channels — Where Nebulaa Publishes and Replies'
const seoDescription =
  'The channels we actually run: WhatsApp, Instagram, Facebook, LinkedIn, X, YouTube Shorts, email, SMS, voice, Google Business, Pinterest, paid media and quick commerce.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

const GROUPS: { runBy: RunBy; title: string; note: string }[] = [
  {
    runBy: 'gravity',
    title: 'Published by Gravity',
    note: 'The product plans and publishes to these directly, from one monthly content plan.',
  },
  {
    runBy: 'pulsar',
    title: 'Handled by Pulsar',
    note: 'Conversation channels. Every enquiry answered, qualified and scored, in one thread per person.',
  },
  {
    runBy: 'services',
    title: 'Run by our team',
    note: 'Part of a managed engagement rather than the self-serve product — these need a person, not just software.',
  },
]

export default function ChannelsHubPage() {
  return (
    <main className="bg-ground text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Channels</SectionLabel>
        <h1 className="font-heading font-medium text-[40px] md:text-[60px] leading-[1.06] tracking-[-0.02em] mb-[26px]" style={{ textWrap: 'pretty' }}>
          Every channel we run.{' '}
          <span className="italic text-gold-display">And who runs it.</span>
        </h1>
        <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px]">
          Some of these the product publishes to on its own. Some need our team. The difference matters
          when you are deciding what to buy, so it is marked on every one rather than blurred together.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-[120px] pb-[120px] flex flex-col gap-[72px]">
        {GROUPS.map(group => {
          const list = channels.filter(c => c.runBy === group.runBy)
          return (
            <div key={group.runBy}>
              <div className="max-w-[640px] mb-8">
                <h2 className="font-heading font-medium text-[26px] md:text-[32px] leading-[1.14] tracking-[-0.02em] mb-2.5">
                  {group.title}
                </h2>
                <p className="text-[15px] leading-[1.65] text-muted">{group.note}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map(ch => (
                  <Link
                    key={ch.slug}
                    href={`/channels/${ch.slug}`}
                    className="group block hud-card rounded-[18px] px-[28px] pt-[28px] pb-7 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-2.5">
                      <h3 className="font-heading font-medium text-[20px]">{ch.name}</h3>
                    </div>
                    <p className="text-[13.5px] leading-[1.6] text-muted mb-5">{ch.summary}</p>
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gold-text group-hover:gap-2.5 transition-all">
                      Read <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
