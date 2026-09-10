export interface IndustryUseCase {
  title: string
  desc: string
  agent: 'Gravity' | 'Pulsar' | 'Both'
}

export interface IndustryClient {
  name: string
  stage: 'active' | 'proposal'
}

export interface IndustryData {
  slug: string
  name: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  seoTitle: string
  seoDescription: string
  painPoints: string[]
  useCases: IndustryUseCase[]
  clients: IndustryClient[]
  hubBlurb: string
  hubImage: string
  /** Optional media slot id for illustrative sample creative. */
  creativeSlot?: string
}

/**
 * Real verticals, each grounded in a named client — not invented
 * segments with invented stats. If a vertical shows up here, someone
 * real is running on it or is in active proposal.
 */
export const industries: Record<string, IndustryData> = {
  'jewellery-retail': {
    slug: 'jewellery-retail',
    name: 'Jewellery & Retail',
    eyebrow: 'For jewellery & retail',
    headline: 'The shop their mother trusted for',
    headlineEmphasis: 'thirty years — online, too.',
    subheadline:
      'A jewellery buyer isn\'t comparing catalogues, they\'re comparing trust. Gravity keeps a steady drumbeat of craft, collections and occasions; Pulsar answers the WhatsApp enquiry before they walk into a rival showroom.',
    seoTitle: 'Nebulaa for Jewellery & Retail — AI Marketing & Outreach',
    seoDescription:
      'Content and WhatsApp follow-up built for jewellery and retail brands — trusted by Gandhimathi Jewellers.',
    painPoints: [
      'A festival or wedding-season collection launch with no content plan behind it',
      'A WhatsApp enquiry about a piece that goes unanswered until the customer has already visited another showroom',
      'Posting is the first thing that stops the week a big order lands',
      'No easy way to show new collections to past customers without a mass broadcast that feels like spam',
    ],
    useCases: [
      { title: 'Collection and occasion content', desc: 'Gravity plans posts and reels around festivals, wedding season and new collections, in your brand\'s tone, without a brief.', agent: 'Gravity' },
      { title: 'WhatsApp enquiry response', desc: 'Pulsar answers "do you have this in gold" and "what\'s the price" the moment it lands, and books a showroom visit for anyone serious.', agent: 'Pulsar' },
      { title: 'Competitor watch', desc: 'Gravity tracks what nearby jewellers are posting and drafts the counter-content, not just a report telling you about it.', agent: 'Gravity' },
      { title: 'Same-day dealer and retail follow-up', desc: 'Every enquiry through the day gets a same-day reply — nothing goes cold overnight.', agent: 'Pulsar' },
    ],
    clients: [{ name: 'Gandhimathi Jewellers', stage: 'active' }],
    hubBlurb: 'Craft and trust, posted consistently — enquiries answered before they cool.',
    hubImage: 'jewellery',
    creativeSlot: 'creative-jewellery',
  },
  'textile-apparel': {
    slug: 'textile-apparel',
    name: 'Textile & Apparel',
    eyebrow: 'For textile & apparel',
    headline: 'Six branches, one voice,',
    headlineEmphasis: 'every single day.',
    subheadline:
      'A multi-branch textile business can\'t run content the way a single shop does — every branch, every collection, every regional festival. Gravity plans the month once and adapts it; Pulsar catches every enquiry across every location.',
    seoTitle: 'Nebulaa for Textile & Apparel — AI Marketing & Outreach',
    seoDescription:
      'Multi-branch content and WhatsApp follow-up for textile and apparel retailers — trusted by JKR Tex.',
    painPoints: [
      'Content that works for one branch doesn\'t always translate to the next region',
      'New stock arrives faster than anyone has time to photograph and post it',
      'Regional festivals and local buying seasons need their own content calendar, not a generic one',
      'A missed WhatsApp enquiry at one branch is a lost sale that never gets tracked',
    ],
    useCases: [
      { title: 'Multi-branch content, one system', desc: 'Gravity plans the month\'s content once and localises it — the same quality bar across every branch, without a separate content person per location.', agent: 'Gravity' },
      { title: 'Regional festival planning', desc: 'Festival and season content is mapped in advance, so no branch goes quiet during the buying window that matters most to it.', agent: 'Gravity' },
      { title: 'Enquiry follow-up, every branch', desc: 'Pulsar answers WhatsApp enquiries the same day regardless of which branch they come through, and hands over anyone ready to buy.', agent: 'Pulsar' },
      { title: 'Competitor tracking', desc: 'Gravity watches what other textile retailers in the region are running and keeps your content a step ahead, not a step behind.', agent: 'Gravity' },
    ],
    clients: [{ name: 'JKR Tex', stage: 'active' }],
    hubBlurb: 'One content system for every branch — nothing goes quiet during peak season.',
    hubImage: 'textile',
    creativeSlot: 'creative-textile',
  },
  'financial-services': {
    slug: 'financial-services',
    name: 'Financial Services',
    eyebrow: 'For financial services',
    headline: 'Trust is the product.',
    headlineEmphasis: 'Content has to earn it.',
    subheadline:
      'Chits, lending and financial products sell on trust and clear communication, not hype. Gravity keeps your presence steady and plain-spoken; Pulsar answers "how does this work" the moment someone asks.',
    seoTitle: 'Nebulaa for Financial Services — AI Marketing & Outreach',
    seoDescription:
      'Steady, trust-first content and WhatsApp follow-up for financial services brands — trusted by TNV Chits.',
    painPoints: [
      'Financial products need plain-language content, not generic marketing copy that sounds like everyone else',
      'A new scheme or offer needs to reach past customers and new enquiries without a mass broadcast that reads as spam',
      'Every enquiry about terms, tenure or eligibility deserves a fast, accurate answer — not a "someone will call you back"',
      'Consistency matters more here than almost anywhere else, and it\'s the first thing that slips when the team gets busy',
    ],
    useCases: [
      { title: 'Plain-language scheme content', desc: 'Gravity writes about your products the way you\'d explain them across the counter — clear, not clever.', agent: 'Gravity' },
      { title: 'Enquiry qualification on WhatsApp', desc: 'Pulsar answers questions about eligibility, tenure and terms immediately, and hands over anyone ready to sign up.', agent: 'Pulsar' },
      { title: 'Consistent monthly presence', desc: 'A content plan built once a month means nothing goes quiet even when the team is heads-down on operations.', agent: 'Gravity' },
      { title: 'Lead scoring', desc: 'Every enquiry is scored on intent, so your team\'s time goes to the people actually ready to move, not window-shoppers.', agent: 'Pulsar' },
    ],
    clients: [{ name: 'TNV Chits', stage: 'active' }],
    hubBlurb: 'Plain-spoken, consistent content — and every enquiry answered accurately, fast.',
    hubImage: 'finance',
  },
  'fmcg-food': {
    slug: 'fmcg-food',
    name: 'FMCG & Food',
    eyebrow: 'For FMCG & food brands',
    headline: 'Awareness has to exist',
    headlineEmphasis: 'before the product hits the shelf.',
    subheadline:
      'Entering a new market only works if demand is already waiting when you launch. Gravity builds local awareness and content ahead of time; Pulsar and our team run the distribution and retail activation that gets you on shelf.',
    seoTitle: 'Nebulaa for FMCG & Food Brands — Market Entry & Growth',
    seoDescription:
      'Market-entry content, demand generation and distribution support for FMCG and food brands — trusted by Rajaram\'s and Nellai Kuttam Snacks.',
    painPoints: [
      'Launching in a new city with distribution sorted but zero awareness waiting for it',
      'No content system built for the run-up to a launch, only for after it',
      'Retail and quick-commerce visibility that never gets systematically pushed',
      'Sampling and BTL activity that happens once, then stops, instead of building toward a launch date',
    ],
    useCases: [
      { title: 'Market-entry content, ahead of launch', desc: 'Gravity builds local-market content and awareness before the product is even on shelf, so demand is waiting on day one.', agent: 'Gravity' },
      { title: 'Distribution enablement', desc: 'Our team facilitates the distributor conversations and retail cluster targeting that gets you into the right stores — appointment and execution stay yours.', agent: 'Both' },
      { title: 'Sampling and BTL, timed to launch', desc: 'On-ground activation builds through the weeks before launch, not as a one-off event after the fact.', agent: 'Both' },
      { title: 'Quick-commerce visibility', desc: 'Content and campaigns drive traffic to your live listings on Zepto, Blinkit and Instamart as availability rolls out.', agent: 'Gravity' },
    ],
    clients: [
      { name: "Rajaram's", stage: 'proposal' },
      { name: 'Nellai Kuttam Snacks', stage: 'proposal' },
    ],
    hubBlurb: 'Demand built before launch day, not scrambled together after it.',
    hubImage: 'fmcg',
    creativeSlot: 'creative-fmcg',
  },
  'industrial-b2b': {
    slug: 'industrial-b2b',
    name: 'Industrial & B2B',
    eyebrow: 'For industrial & B2B brands',
    headline: 'Regional reach, run as',
    headlineEmphasis: 'one system, not six vendors.',
    subheadline:
      'A regional B2B or industrial brand needs organic content, paid media, dealer support and on-ground activation working together — not five agencies that don\'t talk to each other. One team runs all of it.',
    seoTitle: 'Nebulaa for Industrial & B2B Brands — Regional Growth',
    seoDescription:
      'Organic content, performance media, dealer support and BTL activation for industrial and B2B brands, run as one system.',
    painPoints: [
      'Regional markets each need their own content and targeting, but there\'s no team sized to do that market by market',
      'Dealer and retail-partner communication is disconnected from the brand\'s own marketing',
      'Festival and seasonal campaigns need on-ground activation, not just a paid media budget',
      'Reporting across organic, paid, dealer and BTL activity lives in five different places, if it exists at all',
    ],
    useCases: [
      { title: 'Regional content, per market', desc: 'Dedicated content adapted to each region\'s language and buying moments, published at the cadence a serious brand needs.', agent: 'Gravity' },
      { title: 'Always-on performance media', desc: 'Meta and Google campaigns geo-targeted to each market, with regional creators adding local credibility.', agent: 'Both' },
      { title: 'Dealer and retail-cluster support', desc: 'Local promotional content and geo-targeted spend concentrated around the retail clusters where the product is actually sold.', agent: 'Both' },
      { title: 'Festival and launch activation', desc: 'On-ground activation — sampling, dealer events, retail activations — timed to the moments that matter, not run as isolated one-offs.', agent: 'Both' },
    ],
    clients: [],
    hubBlurb: 'Organic, paid, dealer support and on-ground activation — one team, one system.',
    hubImage: 'industrial',
  },
}

export function getIndustryData(slug: string): IndustryData | null {
  return industries[slug] ?? null
}
