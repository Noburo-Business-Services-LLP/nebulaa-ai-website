import SectionLabel from '@/components/ui/SectionLabel'
import { testimonials, sampleTestimonials } from '@/lib/testimonials'

// Samples show in development and preview builds only. Production shows real ones or nothing.
const SHOW_SAMPLES = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_SAMPLE_TESTIMONIALS === 'true'

/** Real, permissioned entries only on the live site; sample cards are tagged and hidden in production. */
export default function Testimonials() {
  const list = testimonials.length > 0 ? testimonials : SHOW_SAMPLES ? sampleTestimonials : []
  if (list.length === 0) return null

  return (
    <section className="py-[72px] md:py-[96px] px-5 md:px-12 lg:px-[120px] bg-surface-2">
      <SectionLabel className="mb-4 block">Owners, in their words</SectionLabel>
      <h2 className="neb-display text-[36px] md:text-[54px] mb-10 max-w-[720px]">
        Ask the people <span className="text-gold-display">using it.</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {list.map(t => (
          <figure key={t.name + t.business} className="rounded-[22px] bg-surface border border-rule p-6">
            {t.sample && (
              <span className="inline-block mb-3 rounded-full bg-peach px-2.5 py-0.5 text-[11px] font-bold text-ink-2">Sample, not a real customer</span>
            )}
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
