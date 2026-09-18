export interface ServiceClient {
  name: string
  stage: 'active' | 'proposal'
  blurb: string
}

export interface Capability {
  title: string
  body: string
}

export interface ProcessStage {
  step: string
  title: string
  body: string
}

export interface Differentiator {
  title: string
  body: string
}

export const differentiators: Differentiator[] = [
  {
    title: 'One team, one point of contact',
    body: "Strategy, content, production, campaigns and on-ground activation — handled by one team, under one plan, with one person accountable for all of it. Not five vendors pretending to talk to each other.",
  },
  {
    title: 'AI-accelerated, not AI-only',
    body: 'A fast-moving team paired with AI-driven systems for content, scheduling and paid promotions — so organic content, ads and outreach run as one system, not three disconnected efforts.',
  },
  {
    title: 'Built around how you sell',
    body: 'No fragmented vendors. No guessing what’s working. Just marketing built around how your business actually sells.',
  },
]

export const capabilities: Capability[] = [
  { title: 'Marketing Strategy', body: 'Positioning, content strategy, campaign themes, audience and channel planning.' },
  { title: 'Social & Content Systems', body: 'Platform-specific content engine and consistent publishing across channels.' },
  { title: 'Content & Photography', body: 'Carousels, static creatives, short-form videos, explainers, copy and photography.' },
  { title: 'Films & Production', body: 'Brand films, product and facility stories, leadership and culture videos.' },
  { title: 'Digital Campaigns', body: 'Campaign creatives, landing-page content, lead-generation communication.' },
  { title: 'BTL & On-Ground Activation', body: 'In-store activation, promoter-led events, retail and trade marketing collateral.' },
  { title: 'Brand Communication', body: 'Visual direction, messaging, campaign concepts and communication assets.' },
  { title: 'Reporting & Optimisation', body: 'Content performance, learnings and next-cycle recommendations.' },
]

export const process: ProcessStage[] = [
  { step: '01', title: 'Strategy', body: 'Business priorities, audiences, positioning, content pillars.' },
  { step: '02', title: 'Content', body: 'Monthly content system, creative direction, copy.' },
  { step: '03', title: 'Production', body: 'Shoot, edit, design — corporate, product & facility assets.' },
  { step: '04', title: 'Activation', body: 'Social, campaigns, website, on-ground activation.' },
  { step: '05', title: 'Optimise', body: 'Performance review, learnings, next-cycle plan.' },
]

export const clients: ServiceClient[] = [
  {
    name: 'Gandhimathi Jewellers',
    stage: 'active',
    blurb: 'Always-on organic content — posts, carousels and short-form video, every month.',
  },
  {
    name: 'JKR Tex',
    stage: 'active',
    blurb: 'Always-on organic content, as part of an ongoing content package.',
  },
  {
    name: 'TNV Chits',
    stage: 'active',
    blurb: 'Always-on organic content, as part of an ongoing content package.',
  },
]

export interface DeliverableStat {
  value: string
  label: string
}

export interface DeliverableRow {
  format: string
  volume: string
  covers: string
}

export interface DeliverableGroup {
  title: string
  rows: DeliverableRow[]
}

/**
 * Real monthly scope, taken from the Nellai Kuttam engagement deck.
 * Volumes are illustrative of a full-scope engagement — every deal is
 * scoped and quoted separately, which the section copy says explicitly.
 */
export const deliverableStats: DeliverableStat[] = [
  { value: '60', label: 'Image posts / month / platform' },
  { value: '8', label: 'Video reels / month / platform' },
  { value: '10', label: 'Influencer posts / month' },
  { value: '10', label: 'BTL activation days / month' },
]

export const deliverableGroups: DeliverableGroup[] = [
  {
    title: 'Organic brand content',
    rows: [
      {
        format: 'Image posts',
        volume: '60 / month (2 / day)',
        covers: 'Product, category, offers and seasonal content across Instagram & Facebook.',
      },
      {
        format: 'Video reels',
        volume: '8 / month (2 / week)',
        covers: 'Short-form video — product use, demos, behind-the-brand — across Instagram, Facebook and YouTube Shorts.',
      },
    ],
  },
  {
    title: 'Paid promotions',
    rows: [
      {
        format: 'Meta + Google Ads',
        volume: 'Always-on, all month',
        covers: 'Awareness, consideration and retargeting campaigns, geo-targeted to the markets that matter.',
      },
      {
        format: 'SEO',
        volume: 'Continuous',
        covers: 'Keyword optimisation, quick-commerce listing optimisation, Google Business profile optimisation.',
      },
    ],
  },
  {
    title: 'Influencer marketing',
    rows: [
      {
        format: 'Creator posts',
        volume: '10 / month',
        covers: 'Roughly 5 regional creators, 2 posts each — demos, use cases and reviews, published on their channel and amplified on yours.',
      },
    ],
  },
  {
    title: 'BTL activation',
    rows: [
      {
        format: 'On-ground activation',
        volume: '10 days / month',
        covers: 'Sampling drives, retail activations, local events and hyperlocal promotional activity, rotating across priority neighbourhoods.',
      },
    ],
  },
]

export const servicesPageMeta = {
  seoTitle: 'When You Need the System Built With You — Services',
  seoDescription:
    'Businesses need strategy, production, activation or market-entry expertise alongside the system — handled by one team, under one plan.',
}
