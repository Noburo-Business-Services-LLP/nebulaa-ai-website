import { mediaSlots, type MediaSlot } from '@/lib/mediaSlots'
import { capabilities } from '@/lib/productData'

/**
 * Which page each photo or video slot lives on, and how essential it is. Used
 * by /admin/media to group the list by page and to open each page in edit mode.
 */
export type SlotGroupKey = 'homepage' | 'industries' | 'sample' | 'services' | 'product'

export const SLOT_GROUPS: { key: SlotGroupKey; title: string; note: string; start: boolean }[] = [
  { key: 'homepage', title: 'Homepage', note: 'The first page most people see. Start here: the hero video, three product clips, three how-it-works photos and the closing photo.', start: true },
  { key: 'industries', title: 'Industry photos', note: 'One photo per industry. Each shows as a tile on the homepage and as the background of that industry’s page.', start: true },
  { key: 'sample', title: 'Sample posts', note: 'An example post for four industry pages. Optional. The page looks fine without them.', start: false },
  { key: 'services', title: 'Services photos', note: 'Two on-ground photos for the managed services pages. Optional.', start: false },
  { key: 'product', title: 'Product screenshots', note: 'Screenshots of the app for each feature page. Optional and can wait. Empty ones are hidden from visitors.', start: false },
]

const INDUSTRY_PATH: Record<string, string> = {
  hospitality: '/for/hospitality',
  jewellery: '/for/jewellery-retail',
  textile: '/for/textile-apparel',
  food: '/for/fmcg-food',
  fmcg: '/for/fmcg-food',
  financial: '/for/financial-services',
  realestate: '/for/real-estate',
  furniture: '/for/furniture-appliances',
  automobiles: '/for/automobiles',
  industrial: '/for/industrial-b2b',
}

export function slotGroup(slot: MediaSlot): SlotGroupKey {
  const id = slot.id
  if (id === 'hero-video' || id === 'closing-photo' || id.startsWith('demo-') || id.startsWith('how-')) return 'homepage'
  if (id.startsWith('industry-')) return 'industries'
  if (id.startsWith('creative-')) return 'sample'
  if (id.startsWith('btl-')) return 'services'
  return 'product'
}

/** The page where this slot appears, so it can be opened in edit mode. */
export function slotPage(slot: MediaSlot): string {
  const id = slot.id
  const g = slotGroup(slot)
  if (g === 'homepage') return '/'
  if (g === 'industries' || g === 'sample') return INDUSTRY_PATH[id.split('-')[1]] ?? '/for'
  if (g === 'services') return '/services/btl-activation'
  const cap = capabilities.find(c => c.mediaSlot === id)
  return cap ? `/product/${cap.agent}/${cap.slug}` : '/product'
}

export const EDIT_PAGES: { label: string; path: string }[] = [
  { label: 'Homepage', path: '/' },
  { label: 'Hotels', path: '/for/hospitality' },
  { label: 'Jewellery', path: '/for/jewellery-retail' },
  { label: 'Textiles', path: '/for/textile-apparel' },
  { label: 'Food', path: '/for/fmcg-food' },
  { label: 'Financial', path: '/for/financial-services' },
  { label: 'Real estate', path: '/for/real-estate' },
  { label: 'Furniture', path: '/for/furniture-appliances' },
  { label: 'Automobiles', path: '/for/automobiles' },
  { label: 'Industrial', path: '/for/industrial-b2b' },
  { label: 'Our work', path: '/work' },
]

export function slotsInGroup(key: SlotGroupKey): MediaSlot[] {
  return mediaSlots.filter(s => slotGroup(s) === key)
}
