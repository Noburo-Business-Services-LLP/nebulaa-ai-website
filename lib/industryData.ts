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
    seoTitle: 'Nebulaa for Jewellery & Retail',
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
    seoTitle: 'Nebulaa for Textile & Apparel',
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
    seoTitle: 'Nebulaa for Financial Services',
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
      'Entering a new market only works if demand is already waiting when you launch. Gravity builds local awareness and content ahead of time; Pulsar and our team run the retail activation that gets you seen once you are on shelf.',
    seoTitle: 'Nebulaa for FMCG & Food Brands',
    seoDescription:
      'Market-entry content and demand generation for FMCG and food brands entering a new city.',
    painPoints: [
      'Launching in a new city with distribution sorted but zero awareness waiting for it',
      'No content system built for the run-up to a launch, only for after it',
      'Retail and quick-commerce visibility that never gets systematically pushed',
      'Sampling and BTL activity that happens once, then stops, instead of building toward a launch date',
    ],
    useCases: [
      { title: 'Market-entry content, ahead of launch', desc: 'Gravity builds local-market content and awareness before the product is even on shelf, so demand is waiting on day one.', agent: 'Gravity' },
      { title: 'Sampling and BTL, timed to launch', desc: 'On-ground activation builds through the weeks before launch, not as a one-off event after the fact.', agent: 'Both' },
      { title: 'Quick-commerce visibility', desc: 'Content and campaigns drive traffic to your live listings on Zepto, Blinkit and Instamart as availability rolls out.', agent: 'Gravity' },
    ],
    clients: [],
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
    seoTitle: 'Nebulaa for Industrial & B2B Brands',
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
  'hospitality': {
    slug: 'hospitality',
    name: 'Hospitality',
    eyebrow: 'For hotels, resorts & restaurants',
    headline: 'They book the place',
    headlineEmphasis: 'they can already picture.',
    subheadline:
      'Hospitality sells on atmosphere and on the enquiry answered while someone is still deciding. Gravity keeps the rooms, the food and the season in front of people; Pulsar answers the availability question before they check the next place.',
    seoTitle: 'Nebulaa for Hotels & Restaurants',
    seoDescription:
      'Content and enquiry handling for hotels, resorts and restaurants — seasonal campaigns and WhatsApp enquiries answered before booking elsewhere.',
    painPoints: [
      'An enquiry about availability that sits unanswered while the guest books somewhere else',
      'Seasonal demand that needs campaigns planned months ahead, not the week before',
      'Reviews that go unanswered, which future guests read more carefully than any ad',
      'Food and property photography that never makes it out of the phone it was shot on',
    ],
    useCases: [
      { title: 'Season and occasion campaigns', desc: 'Holiday seasons, long weekends and festival periods planned well ahead, when people are actually deciding where to go.', agent: 'Gravity' },
      { title: 'Availability enquiries answered fast', desc: 'Pulsar answers dates, rates and availability questions immediately, and hands over anyone ready to book.', agent: 'Pulsar' },
      { title: 'Review and listing management', desc: 'Google Business kept current and reviews answered — the surface future guests actually read before choosing.', agent: 'Both' },
      { title: 'Atmosphere content', desc: 'Rooms, food and the experience itself, published consistently rather than whenever someone remembers to post.', agent: 'Gravity' },
    ],
    clients: [],
    hubBlurb: 'Seasonal demand planned ahead, and enquiries answered while they are still deciding.',
    hubImage: 'hospitality',
  },
  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate',
    eyebrow: 'For builders & property',
    headline: 'The enquiry is worth',
    headlineEmphasis: 'too much to leave waiting.',
    subheadline:
      'One property enquiry can be worth more than a year of most businesses\' customers, which makes a slow reply extraordinarily expensive. Pulsar qualifies budget, location and timeline the moment it lands; Gravity keeps the projects visible in between.',
    seoTitle: 'Nebulaa for Real Estate Marketing',
    seoDescription:
      'Project content and instant enquiry qualification for builders and property businesses — budget, location and timeline established before your team calls.',
    painPoints: [
      'High-value enquiries going cold because nobody replied within the hour',
      'Sales teams spending their day on enquiries that were never going to buy',
      'Project updates that stop being posted once the launch excitement fades',
      'No easy way to keep past enquiries warm through a long decision cycle',
    ],
    useCases: [
      { title: 'Instant enquiry qualification', desc: 'Budget, preferred location, timeline and financing status established in conversation, before anyone from your team picks up the phone.', agent: 'Pulsar' },
      { title: 'Project and progress content', desc: 'Construction progress, layouts, amenities and locality content published consistently through a long sales cycle.', agent: 'Gravity' },
      { title: 'Long-cycle nurture', desc: 'Property decisions take months. Sequences keep enquiries warm without your team chasing manually.', agent: 'Pulsar' },
      { title: 'Locality and geo-targeted campaigns', desc: 'Paid campaigns aimed at the catchments that actually buy in your corridor.', agent: 'Both' },
    ],
    clients: [],
    hubBlurb: 'High-value enquiries qualified in minutes, and projects kept visible through a long cycle.',
    hubImage: 'realestate',
  },
  'furniture-appliances': {
    slug: 'furniture-appliances',
    name: 'Furniture & Home Appliances',
    eyebrow: 'For furniture & appliances',
    headline: 'A considered purchase',
    headlineEmphasis: 'needs more than one post.',
    subheadline:
      'Nobody buys a sofa or a refrigerator from a single ad. They research, compare, ask about warranty and delivery, then visit. Gravity carries the consideration content; Pulsar answers the questions that decide it.',
    seoTitle: 'Nebulaa for Furniture & Home Appliances Retail',
    seoDescription:
      'Consideration-stage content and enquiry handling for furniture and appliance retailers — specifications, warranty and delivery questions answered fast.',
    painPoints: [
      'Enquiries asking about price, warranty and delivery that take a day to answer',
      'A big catalogue that never gets shown properly because photographing it is a job',
      'Festival and season offers that need planning ahead of the buying window',
      'Dealer and showroom enquiries handled differently depending on who picks up',
    ],
    useCases: [
      { title: 'Catalogue and category content', desc: 'Product ranges, use cases and comparisons published steadily rather than only when a new line arrives.', agent: 'Gravity' },
      { title: 'Specification and delivery questions', desc: 'The questions that actually decide a considered purchase — warranty, delivery, installation, EMI — answered immediately and consistently.', agent: 'Pulsar' },
      { title: 'Festival and season offers', desc: 'The buying windows that matter in this category, planned and campaigned ahead of time.', agent: 'Gravity' },
      { title: 'Showroom visit booking', desc: 'Qualified enquiries converted into a booked visit rather than a maybe.', agent: 'Pulsar' },
    ],
    clients: [],
    hubBlurb: 'Consideration content plus the warranty and delivery answers that close the sale.',
    hubImage: 'furniture',
  },
  'automobiles': {
    slug: 'automobiles',
    name: 'Automobiles',
    eyebrow: 'For dealerships & auto',
    headline: 'Test drives are won',
    headlineEmphasis: 'in the first reply.',
    subheadline:
      'An auto enquiry is almost always sent to several dealers at once. The one that replies first, with a real answer about variant, price and availability, is usually the one that gets the test drive.',
    seoTitle: 'Nebulaa for Automobile Dealerships',
    seoDescription:
      'Fast enquiry qualification and consistent showroom content for dealerships — questions answered before the competing dealer replies.',
    painPoints: [
      'Enquiries sent to four dealers at once, where the slowest reply loses',
      'Finance and exchange questions that need a fast, accurate answer',
      'Service reminders and follow-ups that nobody has time to run',
      'Showroom content that stops the moment the sales team gets busy',
    ],
    useCases: [
      { title: 'First-reply advantage', desc: 'Variant, on-road price, availability and finance questions answered in minutes, while the buyer is still comparing.', agent: 'Pulsar' },
      { title: 'Test drive booking', desc: 'Qualified enquiries turned into a booked test drive with the details already captured.', agent: 'Pulsar' },
      { title: 'Showroom and model content', desc: 'New arrivals, variants, offers and customer deliveries published consistently.', agent: 'Gravity' },
      { title: 'Service and exchange follow-up', desc: 'Sequences that keep existing customers coming back for service and exchange, without manual chasing.', agent: 'Pulsar' },
    ],
    clients: [],
    hubBlurb: 'Reply first on variant, price and finance — then book the test drive.',
    hubImage: 'auto',
  },
}
export function getIndustryData(slug: string): IndustryData | null {
  return industries[slug] ?? null
}
