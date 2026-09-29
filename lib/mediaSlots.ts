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
  {
    id: 'gravity-seo',
    file: 'gravity-seo.png',
    kind: 'screenshot',
    label: 'Gravity — SEO assistant',
    spec: 'The search-term gap view — terms with buying intent competitors rank for and you do not.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/seo-assistant',
  },
  {
    id: 'gravity-ai-memory',
    file: 'gravity-ai-memory.png',
    kind: 'screenshot',
    label: 'Gravity — AI memory',
    spec: 'What got published, what was edited before approval, and how that is feeding the next month’s plan.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/ai-memory',
  },
  {
    id: 'gravity-upload',
    file: 'gravity-upload.png',
    kind: 'screenshot',
    label: 'Gravity — upload & schedule',
    spec: 'A bulk upload of the brand’s own photography or video, queued and scheduled per platform.',
    dimensions: '2880×1800',
    usedOn: '/product/gravity/upload-schedule',
  },

  // ── Orbit product screens ───────────────────────────────────────────────
  {
    id: 'orbit-sourcing',
    file: 'orbit-sourcing.png',
    kind: 'screenshot',
    label: 'Orbit — lead sourcing',
    spec: 'Businesses matching an ICP query, with location and category visible. The clearest single proof that Orbit finds real, named businesses rather than a scraped list.',
    dimensions: '2880×1800',
    usedOn: 'Homepage Orbit section, /product/orbit/lead-sourcing',
  },
  {
    id: 'orbit-qualification',
    file: 'orbit-qualification.png',
    kind: 'screenshot',
    label: 'Orbit — lead qualification',
    spec: 'The filtered list after the phone-reachable and rating checks — fewer rows than sourcing, visibly higher quality.',
    dimensions: '2880×1800',
    usedOn: '/product/orbit/lead-qualification',
  },
  {
    id: 'orbit-crm',
    file: 'orbit-crm.png',
    kind: 'screenshot',
    label: 'Orbit — CRM sync',
    spec: 'A lead landing in the CRM already staged: Company, Contact and Pipeline record linked, assigned to a rep.',
    dimensions: '2880×1800',
    usedOn: '/product/orbit/crm-sync',
  },
  {
    id: 'orbit-email-enrichment',
    file: 'orbit-email-enrichment.png',
    kind: 'screenshot',
    label: 'Orbit — email enrichment',
    spec: 'A qualified lead record with a real contact email attached, pulled from its website — ideally shown next to a filtered-out noreply/placeholder address to make the filtering visible.',
    dimensions: '2880×1800',
    usedOn: '/product/orbit/email-enrichment',
  },
  {
    id: 'orbit-outreach',
    file: 'orbit-outreach.png',
    kind: 'screenshot',
    label: 'Orbit — personalized outreach draft',
    spec: 'A drafted opening message for a specific lead, with enough of the lead\'s own context (website, business type) visible alongside it to show the message isn\'t a generic template.',
    dimensions: '2880×1800',
    usedOn: '/product/orbit/personalized-outreach',
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
  {
    id: 'pulsar-automation',
    file: 'pulsar-automation.png',
    kind: 'screenshot',
    label: 'Pulsar — follow-up sequences',
    spec: 'A running sequence monitor — what’s queued, what fired, what stalled and needs a person.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/automation',
  },
  {
    id: 'pulsar-ai-agents',
    file: 'pulsar-ai-agents.png',
    kind: 'screenshot',
    label: 'Pulsar — AI agent configuration',
    spec: 'The agent editor: a named agent with its brief, tone and guardrails visible, plus routing rules showing how conversations get sent to it.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/ai-agents',
  },
  {
    id: 'pulsar-knowledge-base',
    file: 'pulsar-knowledge-base.png',
    kind: 'screenshot',
    label: 'Pulsar — knowledge base',
    spec: 'The knowledge base editor loaded with real products, pricing or policy entries, ideally alongside a gaps/handover report of questions it couldn\'t answer.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/knowledge-base',
  },
  {
    id: 'pulsar-email-sms',
    file: 'pulsar-email-sms.png',
    kind: 'screenshot',
    label: 'Pulsar — email & SMS thread',
    spec: 'One contact\'s unified thread showing messages across WhatsApp, email and SMS in a single view, replying on whichever channel the contact wrote on.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/email-sms',
  },
  {
    id: 'pulsar-tasks',
    file: 'pulsar-tasks.png',
    kind: 'screenshot',
    label: 'Pulsar — tasks & activity trail',
    spec: 'A qualified lead turned into a dated task assigned to a named person, with the activity trail (calls, messages, notes, outcomes) visible beneath it.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/tasks-activities',
  },
  {
    id: 'pulsar-analytics',
    file: 'pulsar-analytics.png',
    kind: 'screenshot',
    label: 'Pulsar — response time & conversion analytics',
    spec: 'The analytics dashboard broken down by channel, agent and team member, with response time and conversion sitting alongside each other as the two headline numbers.',
    dimensions: '2880×1800',
    usedOn: '/product/pulsar/analytics',
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
    usedOn: '/for/jewellery-retail, homepage narrative demo, proof gallery',
  },
  {
    id: 'creative-textile',
    file: 'creative-textile.jpg',
    kind: 'creative',
    label: 'Sample creative — textile',
    spec: 'A social post in the style Gravity produces for a textile retailer.',
    dimensions: '1080×1080',
    usedOn: '/for/textile-apparel, homepage narrative demo, proof gallery',
  },
  {
    id: 'creative-fmcg',
    file: 'creative-fmcg.jpg',
    kind: 'creative',
    label: 'Sample creative — FMCG / snacks',
    spec: 'A social post in the style Gravity produces for a food brand.',
    dimensions: '1080×1080',
    usedOn: '/for/fmcg-food, homepage narrative demo, proof gallery',
  },
  {
    id: 'creative-financial',
    file: 'creative-financial.jpg',
    kind: 'creative',
    label: 'Sample creative — financial services',
    spec: 'A social post in the style Gravity produces for a chits/financial-services brand — trust and clarity over hard-sell.',
    dimensions: '1080×1080',
    usedOn: '/for/financial-services, homepage narrative demo',
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
