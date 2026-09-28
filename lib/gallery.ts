/**
 * The homepage "client work" gallery — an open-ended companion to the fixed
 * slots in mediaSlots.ts. A slot is "the one screenshot for this spot"; the
 * gallery is "as many real client photos and reels as the team uploads,"
 * so it can't be a fixed list. Metadata (business name, industry) rides in
 * the filename instead of a database, matching this repo's existing
 * no-deploy-needed media pattern — /api/media/manifest already lists every
 * object key with no auth, so the gallery needs no new endpoint either.
 */
import { mediaUrl } from '@/lib/mediaUrl'

export const GALLERY_PREFIX = 'gallery/'

export interface GalleryItem {
  key: string
  url: string
  business: string
  industry: string
  kind: 'photo' | 'video'
  uploadedAt: number
}

const VIDEO_EXTENSIONS = new Set(['mp4', 'mov', 'webm'])

function slugify(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '') || 'untitled'
}

function unslugify(value: string): string {
  return value.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Builds the storage key for a new gallery upload — call before uploading. */
export function buildGalleryKey(business: string, industry: string, filename: string): string {
  const ext = (filename.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '')
  const stamp = Date.now()
  return `${GALLERY_PREFIX}${stamp}__${slugify(industry)}__${slugify(business)}.${ext}`
}

/** Parses a storage key back into gallery metadata. Returns null for anything not gallery-shaped. */
export function parseGalleryKey(key: string): GalleryItem | null {
  if (!key.startsWith(GALLERY_PREFIX)) return null
  const rest = key.slice(GALLERY_PREFIX.length)
  const match = rest.match(/^(\d+)__([a-z0-9-]+)__([a-z0-9-]+)\.([a-zA-Z0-9]+)$/)
  if (!match) return null
  const [, stamp, industrySlug, businessSlug, ext] = match
  return {
    key,
    url: mediaUrl(key),
    business: unslugify(businessSlug),
    industry: unslugify(industrySlug),
    kind: VIDEO_EXTENSIONS.has(ext.toLowerCase()) ? 'video' : 'photo',
    uploadedAt: Number(stamp),
  }
}

/** Parses every gallery-shaped key out of a manifest's key list, newest first. */
export function parseGalleryKeys(keys: string[]): GalleryItem[] {
  return keys
    .map(parseGalleryKey)
    .filter((item): item is GalleryItem => item !== null)
    .sort((a, b) => b.uploadedAt - a.uploadedAt)
}
