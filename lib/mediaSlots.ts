/**
 * Named asset slots.
 *
 * Every image the site is waiting on has an entry here. Drop a file into
 * `public/media/` with the slot's exact `file` name and it appears everywhere
 * the slot is referenced — no code change. Until then the slot renders a
 * labelled placeholder carrying its own spec, so nothing ships as a blank box
 * and nobody has to guess what belongs there.
 *
 * Presence is detected by `npm run media:scan`, which runs automatically
 * before every build.
 */

export type SlotKind = 'screenshot' | 'logo' | 'creative' | 'photo' | 'video'

export interface MediaSlot {
  id: string
  /** Filename to drop into public/media/ — extension included. */
  file: string
  kind: SlotKind
  label: string
  /** What to capture or produce. Written to be actionable on its own. */
  spec: string
  /** Recommended pixel dimensions. */
  dimensions: string
  /** Where it appears once filled. */
  usedOn: string
}

export const mediaSlots: MediaSlot[] = [
  // ── Gravity product screens ─────────────────────────────────────────────
  {
    id: 'gravity-calendar',
    file: 'gravity-calendar.png',
    kind: 'screenshot',
    label: 'Gravity — content calendar',
    spec: 'Month view with scheduled posts and their thumbnails visible. The strongest single proof that Gravity plans a month rather than a post.',
    dimensions: '2880×1800 (1440×900 @2x)',
    usedOn: 'Homepage Gravity section, /product/gravity/content-planning',
  },
  {
    id: 'gravity-approval',
    file: 'gravity-approval.png',
    kind: 'screenshot',
    label: 'Gravity — post approval',
    spec: 'A drafted post with the Approve / Rewrite controls showing. Backs the "nothing publishes until you tap approve" claim.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/approvals, narrative demo',
  },
  {
    id: 'gravity-strategy',
    file: 'gravity-strategy.png',
    kind: 'screenshot',
    label: 'Gravity — strategy output',
    spec: 'What Gravity produces after reading a URL: tone, ICP, competitors, channel plan. This is the hero promise, evidenced.',
    dimensions: '2880×1800',
    usedOn: 'Hero, /product/gravity/strategy-icp',
  },
  {
    id: 'gravity-campaigns',
    file: 'gravity-campaigns.png',
    kind: 'screenshot',
    label: 'Gravity — campaign builder',
    spec: 'The campaign view. Currently unmarketed entirely — no page mentions campaigns exist.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/campaigns',
  },
  {
    id: 'gravity-reels',
    file: 'gravity-reels.png',
    kind: 'screenshot',
    label: 'Gravity — reel generator',
    spec: 'Reel generation in progress or a finished reel with its scenes.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/reels, /channels/reels-shorts',
  },
  {
    id: 'gravity-inbox',
    file: 'gravity-inbox.png',
    kind: 'screenshot',
    label: 'Gravity — unified inbox',
    spec: 'Comments, DMs and replies in one view, ideally with auto-reply settings visible.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/unified-inbox',
  },
  {
    id: 'gravity-influencers',
    file: 'gravity-influencers.png',
    kind: 'screenshot',
    label: 'Gravity — influencer portal',
    spec: 'Creator list, collaborations or submission review. An entire shipped module with no page on the site today.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/influencers, /services/influencer-marketing',
  },
  {
    id: 'gravity-competitors',
    file: 'gravity-competitors.png',
    kind: 'screenshot',
    label: 'Gravity — competitor tracking',
    spec: 'Rivals being tracked, ideally alongside the counter-content drafted from them.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/competitors',
  },
  {
    id: 'gravity-analytics',
    file: 'gravity-analytics.png',
    kind: 'screenshot',
    label: 'Gravity — analytics',
    spec: 'Performance dashboard. Redact or swap client names if any are visible.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/analytics, /services/reporting',
  },

  // ── Pulsar product screens ──────────────────────────────────────────────
  {
    id: 'pulsar-whatsapp',
    file: 'pulsar-whatsapp.png',
    kind: 'screenshot',
    label: 'Pulsar — WhatsApp conversation',
    spec: 'A real qualified conversation, phone-framed, names and numbers redacted. Highest-value asset on this list — WhatsApp is the biggest differentiator and it is currently drawn with hand-built bubbles.',
    dimensions: '1290×2796 (phone @3x)',
    usedOn: 'Homepage Pulsar section, /channels/whatsapp',
  },
  {
    id: 'pulsar-leads',
    file: 'pulsar-leads.png',
    kind: 'screenshot',
    label: 'Pulsar — lead list with scores',
    spec: 'Leads with scores and statuses, enough rows to show real volume.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/leads',
  },
  {
    id: 'pulsar-broadcasts',
    file: 'pulsar-broadcasts.png',
    kind: 'screenshot',
    label: 'Pulsar — broadcast composer',
    spec: 'Composing a broadcast with the audience selected.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/broadcasts',
  },
  {
    id: 'pulsar-callqueue',
    file: 'pulsar-callqueue.png',
    kind: 'screenshot',
    label: 'Pulsar — call queue',
    spec: 'The voice calling queue. Confirmed shippable but effectively hidden on the site.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/voice-calling',
  },

  // ── Client logos ────────────────────────────────────────────────────────
  {
    id: 'logo-gandhimathi',
    file: 'logo-gandhimathi.svg',
    kind: 'logo',
    label: 'Gandhimathi Jewellers logo',
    spec: 'SVG preferred, else 512px PNG on transparent. Needs display permission.',
    dimensions: 'SVG or 512px',
    usedOn: 'Client strip, /for/jewellery-retail',
  },
  {
    id: 'logo-jkrtex',
    file: 'logo-jkrtex.svg',
    kind: 'logo',
    label: 'JKR Tex logo',
    spec: 'SVG preferred, else 512px PNG on transparent.',
    dimensions: 'SVG or 512px',
    usedOn: 'Client strip, /for/textile-apparel',
  },
  {
    id: 'logo-tnvchits',
    file: 'logo-tnvchits.svg',
    kind: 'logo',
    label: 'TNV Chits logo',
    spec: 'SVG preferred, else 512px PNG on transparent.',
    dimensions: 'SVG or 512px',
    usedOn: 'Client strip, /for/financial-services',
  },
  {
    id: 'logo-rajarams',
    file: 'logo-rajarams.svg',
    kind: 'logo',
    label: "Rajaram's logo",
    spec: 'SVG preferred, else 512px PNG on transparent.',
    dimensions: 'SVG or 512px',
    usedOn: 'Client strip, /for/fmcg-food',
  },
  {
    id: 'logo-nellaikuttam',
    file: 'logo-nellaikuttam.svg',
    kind: 'logo',
    label: 'Nellai Kuttam Snacks logo',
    spec: 'SVG preferred, else 512px PNG on transparent.',
    dimensions: 'SVG or 512px',
    usedOn: 'Client strip, /for/fmcg-food',
  },

  // ── Sample creative, per vertical ───────────────────────────────────────
  {
    id: 'creative-jewellery',
    file: 'creative-jewellery.jpg',
    kind: 'creative',
    label: 'Sample creative — jewellery',
    spec: 'A social post in the style Gravity produces for a jewellery brand. Illustrative, never captioned as a named client’s published work.',
    dimensions: '1080×1080',
    usedOn: '/for/jewellery-retail, proof gallery',
  },
  {
    id: 'creative-textile',
    file: 'creative-textile.jpg',
    kind: 'creative',
    label: 'Sample creative — textile',
    spec: 'A social post in the style Gravity produces for a textile retailer.',
    dimensions: '1080×1080',
    usedOn: '/for/textile-apparel, proof gallery',
  },
  {
    id: 'creative-fmcg',
    file: 'creative-fmcg.jpg',
    kind: 'creative',
    label: 'Sample creative — FMCG / snacks',
    spec: 'A social post in the style Gravity produces for a food brand.',
    dimensions: '1080×1080',
    usedOn: '/for/fmcg-food, proof gallery',
  },

  // ── BTL activation ──────────────────────────────────────────────────────
  {
    id: 'btl-sampling',
    file: 'btl-sampling.jpg',
    kind: 'photo',
    label: 'BTL — sampling drive',
    spec: 'A sampling table in a store aisle. Documentary realism, Indian tier-2 retail, natural light — not stock-photo gloss. Our most defensible service has no visual anywhere on the site.',
    dimensions: '2400×1600',
    usedOn: '/services/btl-activation, /services',
  },
  {
    id: 'btl-instore',
    file: 'btl-instore.jpg',
    kind: 'photo',
    label: 'BTL — in-store demo',
    spec: 'A promoter-led product demo in-store.',
    dimensions: '2400×1600',
    usedOn: '/services/btl-activation',
  },

  // ── Video ───────────────────────────────────────────────────────────────
  {
    id: 'reel-sample',
    file: 'reel-sample.mp4',
    kind: 'video',
    label: 'Sample reel',
    spec: 'A reel produced through Gravity, for autoplay muted in a phone frame. "Posts, carousels and AI reels" is currently a claim with no evidence. Keep under 8MB.',
    dimensions: '1080×1920',
    usedOn: 'Homepage Gravity section, /product/gravity/reels',
  },
]

export function getSlot(id: string): MediaSlot | undefined {
  return mediaSlots.find(s => s.id === id)
}
