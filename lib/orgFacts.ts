/**
 * Canonical facts about Nebulaa.
 *
 * One source for the schema markup, the facts page and anywhere a figure gets
 * repeated. The point is consistency: a model summarising us should find the
 * same price and the same product names on every page. Sites whose headline
 * numbers disagree between pages are exactly the ones that don't get cited.
 *
 * If a fact changes, it changes here and nowhere else.
 */

export const org = {
  name: 'Nebulaa',
  legalName: 'Noburo Business Services LLP',
  url: 'https://nebulaa.ai',
  email: 'hello@nebulaa.ai',
  city: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  description:
    'Nebulaa is a Chennai-based AI operating system for business. It runs three engines on one core — Gravity for content and social media, Orbit for lead generation and Pulsar for lead engagement, with Nebulaa Core learning from actions, outcomes and signals across all three — and runs managed marketing engagements for brands across South India.',
  founded: '2025',
} as const

/**
 * Monthly prices. Annual billing is 15% off, computed from these — see
 * ANNUAL_DISCOUNT below — never hardcoded a second time.
 */
export const ANNUAL_DISCOUNT = 0.15

export const products = [
  {
    name: 'Orbit',
    role: 'AI lead generation engine',
    price: 12000,
    description:
      'Finds real businesses matching your target, keeps only phone-reachable leads rated 4.2+, enriches contact emails from their website, drafts a personalized opening message, and pushes qualified leads into your CRM.',
  },
  {
    name: 'Gravity',
    role: 'AI content & social media engine',
    price: 10000,
    description:
      'Reads a website and builds a marketing strategy from it, plans the month, drafts posts, carousels and reels, tracks competitors, runs campaigns and creator collaborations, and handles the social inbox.',
  },
  {
    name: 'Pulsar',
    role: 'AI lead engagement engine',
    price: 15000,
    description:
      'Answers enquiries on WhatsApp, email and SMS within minutes, qualifies budget, timeline and fit, scores every lead, and runs broadcasts, automation and voice calling.',
  },
  {
    name: 'All three engines',
    role: 'Content, lead generation and engagement on one core',
    price: 28000,
    description:
      'Gravity, Orbit and Pulsar on one account, sharing the same business context and the same learning loop through Nebulaa Core.',
  },
] as const

/** Stated plainly because it is a question every buyer asks. */
export const servicePricingPolicy =
  'Managed services are scoped and quoted per engagement. No standard price is published, because a single-city content engagement and a multi-market regional programme are not the same job. Media spend and creator fees are billed at actuals and never marked up.'

export const capabilitiesSummary = [
  'Marketing strategy, positioning and content planning',
  'Social content production — posts, carousels, short-form video',
  'Photography, brand films and product stories',
  'Performance marketing on Meta and Google, geo-targeted',
  'Regional influencer and creator collaborations',
  'BTL and on-ground activation — sampling, in-store demos, retail activation',
  'Quick-commerce listing optimisation and discovery campaigns',
  'Monthly reporting across organic, paid, creator and on-ground activity',
] as const

export const publishingChannels = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'X',
  'YouTube Shorts',
] as const

export const conversationChannels = ['WhatsApp', 'Email', 'SMS', 'Voice'] as const

export const managedChannels = [
  'Google Business Profile',
  'Pinterest',
  'Meta and Google Ads',
  'Quick commerce — Zepto, Blinkit, Swiggy Instamart',
] as const

/** Organization + LocalBusiness, emitted site-wide from the root layout. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    legalName: org.legalName,
    url: org.url,
    email: org.email,
    description: org.description,
    foundingDate: org.founded,
    address: {
      '@type': 'PostalAddress',
      addressLocality: org.city,
      addressRegion: org.region,
      addressCountry: org.country,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    makesOffer: products.map(p => ({
      '@type': 'Offer',
      name: p.name,
      price: String(p.price),
      priceCurrency: 'INR',
      itemOffered: { '@type': 'SoftwareApplication', name: p.name, description: p.description },
    })),
  }
}
