export interface GalleryItem {
  /** Which client/brand this went out for. null = awaiting real example. */
  brand: string | null
  /** Industry label, always safe to show even before we have the real post. */
  industryLabel: string
  platform: 'LinkedIn' | 'Instagram' | 'X'
  /** The actual post text Gravity produced. null = empty slot. */
  post: string | null
  /** Path under /public to a real screenshot, once supplied. null = empty slot. */
  image: string | null

  /**
   * Archive metadata. The point of the gallery is not "here is a nice post" —
   * it is that the system decided to make this, for a reason, and something
   * happened afterwards. Every field is optional and simply not rendered when
   * absent, because a missing fact must never be filled with a plausible one.
   */
  /** Which engine produced it. */
  engine?: 'Gravity' | 'Orbit' | 'Pulsar'
  /** What it was trying to achieve. */
  objective?: string
  /** Post, carousel, reel, campaign… */
  format?: string
  /** Published / approved / generated. */
  status?: string
  /** What actually happened — the signal that returned to Core. */
  outcome?: string
}

/**
 * Real Gravity output only. Do NOT write sample posts here to fill space —
 * an empty slot is honest, an invented post is the exact problem we removed
 * from the testimonials. DK supplies these.
 *
 * MadeByGravity renders nothing at all while every slot is empty, so the
 * homepage never shows a gallery of placeholders. Populate `post` or `image`
 * on an entry and the section appears on its own.
 */
export const galleryItems: GalleryItem[] = [
  { brand: null, industryLabel: 'Jewellery retail', platform: 'Instagram', post: null, image: null },
  { brand: null, industryLabel: 'Textiles', platform: 'LinkedIn', post: null, image: null },
  { brand: null, industryLabel: 'FMCG', platform: 'Instagram', post: null, image: null },
  { brand: null, industryLabel: 'Financial services', platform: 'LinkedIn', post: null, image: null },
]
