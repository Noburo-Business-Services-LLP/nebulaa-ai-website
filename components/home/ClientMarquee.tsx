import Image from 'next/image'
import Marquee from '@/components/ui/Marquee'
import { clients } from '@/lib/clients'

/** The paying clients as a running strip, so there is always a new name coming in from the side. */
export default function ClientMarquee({ title = 'Trusted by businesses across Tamil Nadu' }: { title?: string }) {
  return (
    <section className="py-10 md:py-12 border-y border-rule bg-surface-2/60">
      <p className="neb-label text-center mb-7 px-5">{title}</p>
      <Marquee speed={50}>
        {clients.map(c => (
          <div
            key={c.name}
            className="flex-shrink-0 flex items-center gap-3.5 rounded-[18px] bg-surface border border-rule pl-3 pr-6 py-3 shadow-[0_6px_18px_rgba(20,32,58,0.06)]"
          >
            <span className="relative w-14 h-14 rounded-[12px] overflow-hidden bg-white flex-shrink-0">
              <Image src={c.logo} alt={`${c.name} logo`} fill sizes="56px" className="object-contain p-1" />
            </span>
            <span>
              <span className="block font-heading text-[15px] leading-tight text-ink whitespace-nowrap">{c.name}</span>
              {c.place && <span className="block text-[12px] text-muted">{c.place}</span>}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
