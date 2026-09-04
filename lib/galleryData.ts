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
}

/**
 * Real Gravity output only. Do NOT write sample posts here to fill space —
 * an empty slot is honest, an invented post is the exact problem we removed
 * from the testimonials. DK supplies these.
 */
export const galleryItems: GalleryItem[] = [
  { brand: null, industryLabel: 'Jewellery retail', platform: 'Instagram', post: null, image: null },
  { brand: null, industryLabel: 'Textiles', platform: 'LinkedIn', post: null, image: null },
  { brand: null, industryLabel: 'FMCG', platform: 'Instagram', post: null, image: null },
  { brand: null, industryLabel: 'Financial services', platform: 'LinkedIn', post: null, image: null },
]
