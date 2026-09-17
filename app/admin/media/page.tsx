import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowLeft } from 'lucide-react'
import { mediaSlots, type SlotKind } from '@/lib/mediaSlots'
import { presentMedia } from '@/lib/mediaManifest.generated'
import SectionLabel from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Media slots — Nebulaa admin',
  robots: { index: false, follow: false },
}

const GROUPS: { kind: SlotKind; title: string; note: string }[] = [
  { kind: 'screenshot', title: 'Product screenshots', note: 'Captured from the Gravity and Pulsar apps at 2x.' },
  { kind: 'logo', title: 'Client logos', note: 'SVG preferred. Each needs display permission before it goes live.' },
  { kind: 'creative', title: 'Sample creative', note: 'Illustrative of what Gravity produces — never captioned as a named client’s published work.' },
  { kind: 'photo', title: 'Activation photography', note: 'Documentary realism, Indian tier-2 retail.' },
  { kind: 'video', title: 'Video', note: 'Autoplayed muted in a phone frame. Keep under 8MB.' },
]

export default function AdminMediaPage() {
  const filled = mediaSlots.filter(s => presentMedia.includes(s.file)).length

  return (
    <main className="bg-ground text-ink min-h-screen px-6 md:px-12 lg:px-[80px] py-[70px]">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink mb-8">
        <ArrowLeft size={14} /> Admin
      </Link>

      <SectionLabel className="mb-[22px] block">Media slots</SectionLabel>
      <h1 className="neb-display text-[34px] md:text-[46px] mb-4">
        {filled} of {mediaSlots.length} slots filled.
      </h1>
      <p className="text-[16px] leading-[1.65] text-muted max-w-[68ch] mb-3">
        Drop a file into <code className="text-ink-2">public/media/</code> using the exact filename below and it
        appears everywhere that slot is used — no code change. Then run{' '}
        <code className="text-ink-2">npm run media:scan</code>, or just deploy; it runs on every build.
      </p>
      <p className="text-[14px] leading-[1.6] text-faint max-w-[68ch] mb-[52px]">
        Empty slots render a labelled placeholder on the live site rather than a blank box, so an outstanding
        asset always reads as a known gap.
      </p>

      <div className="flex flex-col gap-12">
        {GROUPS.map(group => {
          const slots = mediaSlots.filter(s => s.kind === group.kind)
          if (slots.length === 0) return null
          return (
            <section key={group.kind}>
              <h2 className="font-heading font-medium text-[24px] mb-1.5">{group.title}</h2>
              <p className="text-[14px] text-muted mb-6 max-w-[70ch]">{group.note}</p>

              <div className="flex flex-col gap-3">
                {slots.map(slot => {
                  const has = presentMedia.includes(slot.file)
                  return (
                    <div
                      key={slot.id}
                      className={`rounded-[14px] border p-5 ${
                        has ? 'border-gold/30 bg-gold/[0.05]' : 'border-rule bg-surface'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {has ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-text">
                            <Check size={13} /> filled
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                            awaiting
                          </span>
                        )}
                        <span className="font-heading text-[17px]">{slot.label}</span>
                      </div>
                      <p className="text-[14px] leading-[1.6] text-muted mb-3 max-w-[74ch]">{slot.spec}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-faint">
                        <span>
                          File <code className="text-ink-2">{slot.file}</code>
                        </span>
                        <span>{slot.dimensions}</span>
                        <span>Used on {slot.usedOn}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
