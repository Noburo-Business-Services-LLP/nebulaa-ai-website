import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { channels, type RunBy } from '@/lib/channelData'
import SectionLabel from '@/components/ui/SectionLabel'
import Reveal from '@/components/ui/Reveal'
import { capabilityIcon, TINTS } from '@/lib/capabilityIcons'

const seoTitle = 'WhatsApp Marketing Automation & Every Channel'
const seoDescription =
  'WhatsApp, Instagram, Facebook, LinkedIn, X, YouTube, email, SMS, voice and more: which channels Nebulaa runs for you and which our team handles.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

const GROUPS: { runBy: RunBy; title: string; note: string }[] = [
  {
    runBy: 'gravity',
    title: 'Posted by Nebulaa',
    note: 'Nebulaa plans and posts to these for you, from one monthly content plan.',
  },
  {
    runBy: 'pulsar',
    title: 'Replies handled by Nebulaa',
    note: 'These are conversation channels. Every enquiry is answered, checked for fit and scored, in one thread per person.',
  },
  {
    runBy: 'services',
    title: 'Run by our team',
    note: 'These are part of a managed engagement rather than the self-serve product. They need a person, not just software.',
  },
]

export default function ChannelsHubPage() {
  return (
    <main className="text-ink min-h-screen">
      <section className="px-6 md:px-12 lg:px-[120px] pt-[140px] pb-[90px] max-w-[860px]">
        <SectionLabel className="mb-[26px] block">Channels</SectionLabel>
        <h1 className="neb-display text-[40px] md:text-[60px] mb-[26px]" style={{ textWrap: 'pretty' }}>
          Every channel we cover,{' '}
          <span className="text-gold-display">and who runs each one.</span>
        </h1>
        <p className="text-[17.5px] leading-[1.65] text-muted max-w-[640px]">
          This covers WhatsApp marketing automation and every other channel you use. Nebulaa posts to some of them
          itself, and our team runs the rest. The difference matters when you are deciding what to buy, so it is marked on every channel.
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
                {list.map((ch, i) => {
                  const Icon = capabilityIcon(ch.slug)
                  return (
                    <Reveal key={ch.slug} delay={(i % 3) * 0.07}>
                      <Link
                        href={`/channels/${ch.slug}`}
                        className="group block h-full hud-card rounded-[22px] px-[26px] pt-[26px] pb-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,32,58,0.1)]"
                      >
                        <span className={`neb-wiggle mb-5 flex w-14 h-14 items-center justify-center rounded-2xl ${TINTS[i % 4]}`}>
                          <Icon size={26} className="text-ink" strokeWidth={1.8} />
                        </span>
                        <h3 className="font-heading font-medium text-[20px] mb-2.5">{ch.name}</h3>
                        <p className="text-[14px] leading-[1.6] text-ink-2 mb-5">{ch.summary}</p>
                        <span className="flex items-center gap-1.5 text-[13px] font-bold text-coral-text group-hover:gap-2.5 transition-all">
                          Read <ArrowRight size={13} />
                        </span>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
