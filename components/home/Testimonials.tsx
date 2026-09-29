import SectionLabel from '@/components/ui/SectionLabel'
import { testimonials } from '@/lib/testimonials'

/** Renders nothing until lib/testimonials.ts has real, permissioned entries. */
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px] bg-surface-2">
      <SectionLabel className="mb-4 block">Owners, in their words</SectionLabel>
      <h2 className="neb-display text-[36px] md:text-[54px] mb-10 max-w-[720px]">
        Ask the people <span className="text-gold-display">using it.</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map(t => (
          <figure key={t.name + t.business} className="rounded-[22px] bg-surface border border-rule p-6">
            <blockquote className="text-[16px] leading-[1.6] text-ink mb-5">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              {t.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.photo} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
              )}
              <div>
                <p className="text-[14px] font-bold">{t.name}</p>
                <p className="text-[12.5px] text-muted">{t.business}, {t.town}</p>
              </div>
            </figcaption>
            {t.result && <p className="mt-4 inline-block rounded-full bg-mint px-3 py-1 text-[12px] font-bold text-ink">{t.result}</p>}
          </figure>
        ))}
      </div>
    </section>
  )
}
