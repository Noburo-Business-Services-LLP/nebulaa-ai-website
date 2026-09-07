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
  { title: 'BTL & On-Ground Activation', body: 'In-store activation, promoter-led events, dealer and distributor trade marketing.' },
  { title: 'Brand Communication', body: 'Visual direction, messaging, campaign concepts and communication assets.' },
  { title: 'Reporting & Optimisation', body: 'Content performance, learnings and next-cycle recommendations.' },
]

export const process: ProcessStage[] = [
  { step: '01', title: 'Strategy', body: 'Business priorities, audiences, positioning, content pillars.' },
  { step: '02', title: 'Content', body: 'Monthly content system, creative direction, copy.' },
  { step: '03', title: 'Production', body: 'Shoot, edit, design — corporate, product & facility assets.' },
  { step: '04', title: 'Distribution', body: 'Social, campaigns, website, on-ground activation.' },
  { step: '05', title: 'Optimise', body: 'Performance review, learnings, next-cycle plan.' },
]

export const clients: ServiceClient[] = [
  {
    name: 'Bosch',
    stage: 'proposal',
    blurb: 'A regional marketing programme across South India — organic content, performance media and on-ground retail activation. Currently in scoping.',
  },
  {
    name: "Rajaram's",
    stage: 'proposal',
    blurb: 'Bangalore market entry for a 70-year-old Tamil Nadu snacking brand — distribution and demand-generation timed to a shared launch calendar.',
  },
  {
    name: 'Nellai Kuttam Snacks',
    stage: 'proposal',
    blurb: 'New-market entry for a legacy Tamil Nadu snacking brand — distribution paired with regional content, timed to launch.',
  },
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

export const servicesPageMeta = {
  seoTitle: 'Managed Marketing Services — Nebulaa',
  seoDescription:
    'Strategy, content, production, campaigns and on-ground activation, handled by one team under one plan — for brands entering new markets or scaling an existing one.',
}
