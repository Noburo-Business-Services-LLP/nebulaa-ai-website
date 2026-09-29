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
  url: 'https://www.nebulaa.ai',
  email: 'hello@nebulaa.ai',
  city: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  description:
    'Nebulaa is a Chennai-based AI operating system for business. It runs three engines on one core — Gravity for content and social media, Orbit for lead generation and Pulsar for outreach, with Nebulaa Core learning from actions, outcomes and signals across all three — and runs managed marketing engagements for brands across South India.',
  founded: '2025',
} as const

/**
 * Monthly prices. Annual billing is a flat 10% off the 12-month total,
 * computed from these — see ANNUAL_DISCOUNT below — never hardcoded a
 * second time.
 */
export const ANNUAL_DISCOUNT = 0.1

/**
 * Self-serve pricing, as of the 2026-09 pricing change: two credit-based
 * plans instead of one price per engine. A credit covers one unit of work
 * across content, leads or outreach — a drafted post, a sourced-and-
 * qualified lead, a WhatsApp reply — so the plan you're on is about volume,
 * not which engine you're allowed to use; every plan runs all three.
 * Running low before the month resets is a top-up, not a plan change.
 *
 * Website-only for now — the credit meter itself isn't wired into the
 * product yet, so treat these as the announced price, not (yet) an
 * enforced one.
 */
export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 60,
    price: 999,
    description:
      'Content posted, leads coming in, enquiries answered — everything running from the first day, sized for one person getting started.',
    features: [
      '60 credits a month, shared across content, leads and outreach',
      'A full month of content planned and posted',
      'Leads sourced and qualified from your target market',
      'WhatsApp, email and SMS enquiries answered automatically',
      '1 team member',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    credits: 200,
    price: 1999,
    description:
      'The same system at real volume — more content, more leads, more of the team working from it.',
    features: [
      '200 credits a month, shared across content, leads and outreach',
      'Everything in Starter',
      'Higher lead volume, with priority qualification',
      'Voice calling for your highest-intent leads',
      'Up to 5 team members',
    ],
  },
] as const

/** Buying more credits mid-month, rather than waiting for the plan to reset. */
export const creditTopUp =
  'Credits run low before the month resets, top up any time from inside the app — nothing pauses while you wait for the next cycle.'

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
    makesOffer: plans.map(p => ({
      '@type': 'Offer',
      name: `Nebulaa ${p.name}`,
      price: String(p.price),
      priceCurrency: 'INR',
      itemOffered: { '@type': 'SoftwareApplication', name: `Nebulaa ${p.name}`, description: p.description },
    })),
  }
}
