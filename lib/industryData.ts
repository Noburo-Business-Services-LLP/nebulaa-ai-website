export interface IndustryUseCase {
  title: string
  desc: string
  agent?: 'Content and social' | 'Answering enquiries' | 'Both'
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
  /** Optional step-by-step buyer journey, shown as photo-style cards joined by arrows. */
  journey?: { title: string; body: string }[]
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
      'A jewellery buyer isn\'t comparing catalogues, they\'re comparing trust. We keep a steady stream of craft, collections and occasions in front of them; we answer the WhatsApp enquiry before they walk into a rival showroom.',
    seoTitle: 'AI Marketing for Jewellery & Retail Stores',
    seoDescription:
      'Content and WhatsApp follow-up built for jewellery and retail brands — trusted by Gandhimathi Jewellers.',
    painPoints: [
      'A festival or wedding-season collection launch with no content plan behind it',
      'A WhatsApp enquiry about a piece that goes unanswered until the customer has already visited another showroom',
      'Posting is the first thing that stops the week a big order lands',
      'No easy way to show new collections to past customers without a mass broadcast that feels like spam',
    ],
    useCases: [
      { title: 'Collection and occasion content', desc: 'We plan posts and reels around festivals, wedding season and new collections, in your brand\'s tone, without a brief.', agent: 'Content and social' },
      { title: 'WhatsApp enquiry response', desc: 'We answer "do you have this in gold" and "what\'s the price" the moment it lands, and book a showroom visit for anyone serious.', agent: 'Answering enquiries' },
      { title: 'Competitor watch', desc: 'We track what nearby jewellers are posting and draft the counter-content, not just a report telling you about it.', agent: 'Content and social' },
      { title: 'Same-day dealer and retail follow-up', desc: 'Every enquiry through the day gets a same-day reply — nothing goes cold overnight.', agent: 'Answering enquiries' },
    ],
    clients: [{ name: 'New Ganthimathi Jewellery, Panruti', stage: 'active' }],
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
      'A retailer with more than one branch can\'t run content the way a single shop does — every branch, every collection, every regional festival. We plan the month once and adapt it across branches; we catch every enquiry across every location.',
    seoTitle: 'AI Marketing for Textile & Apparel Retailers',
    seoDescription:
      'Multi-branch content and WhatsApp follow-up for textile and apparel retailers — trusted by JKR Tex.',
    painPoints: [
      'Content that works for one branch doesn\'t always translate to the next region',
      'New stock arrives faster than anyone has time to photograph and post it',
      'Regional festivals and local buying seasons need their own content calendar, not a generic one',
      'A missed WhatsApp enquiry at one branch is a lost sale that never gets tracked',
    ],
    useCases: [
      { title: 'Multi-branch content, one system', desc: 'We plan the month\'s content once and localise it — the same quality bar across every branch, without a separate content person per location.', agent: 'Content and social' },
      { title: 'Regional festival planning', desc: 'Festival and season content is mapped in advance, so no branch goes quiet during the buying window that matters most to it.', agent: 'Content and social' },
      { title: 'Enquiry follow-up, every branch', desc: 'We answer WhatsApp enquiries the same day regardless of which branch they come through, and hand over anyone ready to buy.', agent: 'Answering enquiries' },
      { title: 'Competitor tracking', desc: 'We watch what other textile retailers in the region are running and keep your content a step ahead, not a step behind.', agent: 'Content and social' },
    ],
    clients: [{ name: 'JKR Tex, Neyveli and 5 more branches', stage: 'active' }],
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
      'Chits, lending and financial products sell on trust and clear communication, not hype. We keep your presence steady and plain-spoken; we answer "how does this work" the moment someone asks.',
    seoTitle: 'AI Marketing for Financial Services Brands',
    seoDescription:
      'Steady, trust-first content and WhatsApp follow-up for financial services brands — trusted by TNV Chits.',
    painPoints: [
      'Financial products need plain-language content, not generic marketing copy that sounds like everyone else',
      'A new scheme or offer needs to reach past customers and new enquiries without a mass broadcast that reads as spam',
      'Every enquiry about terms, tenure or eligibility deserves a fast, accurate answer — not a "someone will call you back"',
      'Consistency matters more here than almost anywhere else, and it\'s the first thing that slips when the team gets busy',
    ],
    useCases: [
      { title: 'Plain-language scheme content', desc: 'We write about your products the way you\'d explain them across the counter — clear, not clever.', agent: 'Content and social' },
      { title: 'Enquiry qualification on WhatsApp', desc: 'We answer questions about eligibility, tenure and terms immediately, and hand over anyone ready to sign up.', agent: 'Answering enquiries' },
      { title: 'Consistent monthly presence', desc: 'A content plan built once a month means nothing goes quiet even when the team is heads-down on operations.', agent: 'Content and social' },
      { title: 'Lead scoring', desc: 'Every enquiry is scored on intent, so your team\'s time goes to the people actually ready to move, not window-shoppers.', agent: 'Answering enquiries' },
    ],
    clients: [{ name: 'TNV Chit Funds, Neyveli and 6 more branches', stage: 'active' }],
    hubBlurb: 'Plain-spoken, consistent content — and every enquiry answered accurately, fast.',
    hubImage: 'finance',
    creativeSlot: 'creative-financial',
  },
  'fmcg-food': {
    slug: 'fmcg-food',
    name: 'FMCG & Food',
    eyebrow: 'For FMCG & food brands',
    headline: 'Awareness has to exist',
    headlineEmphasis: 'before the product hits the shelf.',
    subheadline:
      'A new-market launch only works if demand is already waiting when you arrive. We build local awareness and content ahead of time, and our team runs the retail activation that gets you seen once you are on shelf.',
    seoTitle: 'AI Marketing for FMCG & Food Brands',
    seoDescription:
      'Market-entry content and demand generation for FMCG and food brands entering a new city.',
    painPoints: [
      'Launching in a new city with stock ready but zero awareness waiting for it',
      'No content system built for the run-up to a launch, only for after it',
      'Retail and quick-commerce visibility that never gets systematically pushed',
      'Sampling and BTL activity that happens once, then stops, instead of building toward a launch date',
    ],
    useCases: [
      { title: 'Market-entry content, ahead of launch', desc: 'We build local-market content and awareness before the product is even on shelf, so demand is waiting on day one.', agent: 'Content and social' },
      { title: 'Sampling and BTL, timed to launch', desc: 'On-ground activation builds through the weeks before launch, not as a one-off event after the fact. Delivered through our partner network.', agent: 'Both' },
      { title: 'Quick-commerce visibility', desc: 'Content and campaigns drive traffic to your live listings on Zepto, Blinkit and Instamart as availability rolls out.', agent: 'Content and social' },
    ],
    clients: [{ name: 'Cuddalore Essence Mart, Cuddalore', stage: 'active' }],
    hubBlurb: 'Demand built before launch day, not scrambled together after it.',
    hubImage: 'fmcg',
    creativeSlot: 'creative-fmcg',
  },
  'industrial-b2b': {
    slug: 'industrial-b2b',
    name: 'Industrial & B2B',
    eyebrow: 'For industrial & B2B brands',
    headline: 'Regional reach,',
    headlineEmphasis: 'run as one connected system.',
    subheadline:
      'Organic content, paid media, dealer support and on-ground activation need to work together, not sit with five agencies that don\'t talk to each other. One team runs all of it.',
    seoTitle: 'AI Marketing for Industrial & B2B Brands',
    seoDescription:
      'Organic content, performance media, dealer support and BTL activation for industrial and B2B brands, run as one system.',
    painPoints: [
      'Regional markets each need their own content and targeting, but there\'s no team sized to do that market by market',
      'Dealer and retail-partner communication is disconnected from the brand\'s own marketing',
      'Festival and seasonal campaigns need on-ground activation, not just a paid media budget',
      'Reporting across organic, paid, dealer and BTL activity lives in five different places, if it exists at all',
    ],
    useCases: [
      { title: 'Regional content, per market', desc: 'Dedicated content adapted to each region\'s language and buying moments, published at the cadence a serious brand needs.', agent: 'Content and social' },
      { title: 'Always-on performance media', desc: 'Meta and Google campaigns geo-targeted to each market, with regional creators adding local credibility.', agent: 'Both' },
      { title: 'Dealer and retail-cluster support', desc: 'Local promotional content and geo-targeted spend concentrated around the retail clusters where the product is actually sold.', agent: 'Both' },
      { title: 'Festival and launch activation', desc: 'On-ground activation — sampling, dealer events, retail activations — timed to the moments that matter, not run as isolated one-offs. Delivered through our partner network.', agent: 'Both' },
    ],
    clients: [],
    hubBlurb: 'Organic, paid, dealer support and on-ground activation — one team, one system.',
    hubImage: 'industrial',
  },
  'hospitality': {
    slug: 'hospitality',
    name: 'Hotels & stays',
    eyebrow: 'For hotels, resorts, homestays and restaurants',
    headline: "A guest doesn't book a room.",
    headlineEmphasis: 'They buy an experience.',
    subheadline:
      'We plan and post a month of photos and reels that show your property at its best, and answer every WhatsApp enquiry within minutes, so the guest books with you and not the next place they check.',
    seoTitle: 'Marketing for Hotels, Resorts and Homestays',
    seoDescription:
      'More bookings for hotels, resorts and homestays: a month of posts and reels planned for you, and every WhatsApp enquiry answered within minutes.',
    painPoints: [
      'An enquiry about availability sits unanswered while the guest books somewhere else',
      'Seasonal demand needs planning months ahead, not the week before',
      'Reviews go unanswered, and future guests read them more carefully than any ad',
      'Good photos of the rooms and the food never leave the phone they were shot on',
    ],
    useCases: [
      { title: 'Season and festival campaigns', desc: 'Holidays, long weekends and festival periods planned well ahead, when people are actually deciding where to go.' },
      { title: 'Availability answered fast', desc: 'Dates, rates and room questions get a reply in minutes, and anyone ready to book is passed to you.' },
      { title: 'Reviews and your Google listing', desc: 'Your listing kept current and reviews answered, the place guests look before they choose.' },
      { title: 'Photos and reels of your property', desc: 'Rooms, food and the view, posted steadily instead of whenever someone remembers.' },
    ],
    journey: [
      { title: 'They find you', body: 'On Google and Instagram, searching for a stay.' },
      { title: 'They picture it', body: 'Your photos and reels make them imagine the trip.' },
      { title: 'They trust you', body: 'Reviews and real photos remove the doubt.' },
      { title: 'They message you', body: 'A WhatsApp enquiry, answered in minutes.' },
      { title: 'They book and stay', body: 'The enquiry becomes a booking.' },
      { title: 'They come back', body: 'Good posts and replies bring them back.' },
    ],
    clients: [{ name: 'Casita Inn, Yercaud', stage: 'active' }],
    hubBlurb: 'Seasonal demand planned ahead, and every enquiry answered while the guest is still deciding.',
    hubImage: 'hospitality',
  },

  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate',
    eyebrow: 'For builders & property',
    headline: 'The enquiry is worth',
    headlineEmphasis: 'too much to leave waiting.',
    subheadline:
      'One property enquiry can be worth more than a year of most businesses\' customers, which makes a slow reply extraordinarily expensive. We qualify budget, location and timeline the moment an enquiry lands; we keep the projects visible in between.',
    seoTitle: 'AI Marketing for Real Estate & Builders',
    seoDescription:
      'Project content and instant enquiry qualification for builders and property businesses — budget, location and timeline established before your team calls.',
    painPoints: [
      'High-value enquiries going cold because nobody replied within the hour',
      'Sales teams spending their day on enquiries that were never going to buy',
      'Project updates that stop being posted once the launch excitement fades',
      'No easy way to keep past enquiries warm through a long decision cycle',
    ],
    useCases: [
      { title: 'Instant enquiry qualification', desc: 'Budget, preferred location, timeline and financing status established in conversation, before anyone from your team picks up the phone.', agent: 'Answering enquiries' },
      { title: 'Project and progress content', desc: 'Construction progress, layouts, amenities and locality content published consistently through a long sales cycle.', agent: 'Content and social' },
      { title: 'Long-cycle nurture', desc: 'Property decisions take months. Sequences keep enquiries warm without your team chasing manually.', agent: 'Answering enquiries' },
      { title: 'Locality and geo-targeted campaigns', desc: 'Paid campaigns aimed at the catchments that actually buy in your corridor.', agent: 'Both' },
    ],
    clients: [{ name: 'Neyveli Srinivasa Properties, Neyveli', stage: 'active' }],
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
      'Furniture and appliances are considered purchases nobody buys from a single ad. Buyers research, compare, ask about warranty and delivery, then visit. We carry the consideration content; we answer the questions that decide it.',
    seoTitle: 'AI Marketing for Furniture & Appliance Retailers',
    seoDescription:
      'Consideration-stage content and enquiry handling for furniture and appliance retailers — specifications, warranty and delivery questions answered fast.',
    painPoints: [
      'Enquiries asking about price, warranty and delivery that take a day to answer',
      'A big catalogue that never gets shown properly because photographing it is a job',
      'Festival and season offers that need planning ahead of the buying window',
      'Dealer and showroom enquiries handled differently depending on who picks up',
    ],
    useCases: [
      { title: 'Catalogue and category content', desc: 'Product ranges, use cases and comparisons published steadily rather than only when a new line arrives.', agent: 'Content and social' },
      { title: 'Specification and delivery questions', desc: 'The questions that actually decide a considered purchase — warranty, delivery, installation, EMI — answered immediately and consistently.', agent: 'Answering enquiries' },
      { title: 'Festival and season offers', desc: 'The buying windows that matter in this category, planned and campaigned ahead of time.', agent: 'Content and social' },
      { title: 'Showroom visit booking', desc: 'Qualified enquiries converted into a booked visit rather than a maybe.', agent: 'Answering enquiries' },
    ],
    clients: [{ name: 'T.R.M Santhi Agencies, Vadalur', stage: 'active' }],
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
      'An automobile enquiry is almost always sent to several dealers at once. The one that replies first, with a real answer about variant, price and availability, usually gets the test drive.',
    seoTitle: 'AI Marketing for Automobile Dealerships',
    seoDescription:
      'Fast enquiry qualification and consistent showroom content for dealerships — questions answered before the competing dealer replies.',
    painPoints: [
      'Enquiries sent to four dealers at once, where the slowest reply loses',
      'Finance and exchange questions that need a fast, accurate answer',
      'Service reminders and follow-ups that nobody has time to run',
      'Showroom content that stops the moment the sales team gets busy',
    ],
    useCases: [
      { title: 'First-reply advantage', desc: 'Variant, on-road price, availability and finance questions answered in minutes, while the buyer is still comparing.', agent: 'Answering enquiries' },
      { title: 'Test drive booking', desc: 'Qualified enquiries turned into a booked test drive with the details already captured.', agent: 'Answering enquiries' },
      { title: 'Showroom and model content', desc: 'New arrivals, variants, offers and customer deliveries published consistently.', agent: 'Content and social' },
      { title: 'Service and exchange follow-up', desc: 'Sequences that keep existing customers coming back for service and exchange, without manual chasing.', agent: 'Answering enquiries' },
    ],
    clients: [],
    hubBlurb: 'Reply first on variant, price and finance — then book the test drive.',
    hubImage: 'auto',
  },
}
export function getIndustryData(slug: string): IndustryData | null {
  return industries[slug] ?? null
}

/** Photo slot behind each industry's hero and tile, and the message the WhatsApp button pre-types. */
export const industryMeta: Record<string, { photoSlot: string; waMessage: string; person: string }> = {
  'hospitality': { photoSlot: 'industry-hospitality', person: 'hotel', waMessage: 'Hi, I run a hotel and want more bookings.' },
  'jewellery-retail': { photoSlot: 'industry-jewellery', person: 'jewellery shop', waMessage: 'Hi, I run a jewellery shop and want more customers.' },
  'textile-apparel': { photoSlot: 'industry-textile', person: 'textile business', waMessage: 'Hi, I run a textile business and want more customers.' },
  'financial-services': { photoSlot: 'industry-financial', person: 'financial services business', waMessage: 'Hi, I run a financial services business and want more enquiries.' },
  'fmcg-food': { photoSlot: 'industry-food', person: 'food business', waMessage: 'Hi, I run a food business and want to reach more customers.' },
  'real-estate': { photoSlot: 'industry-realestate', person: 'real estate business', waMessage: 'Hi, I sell property and want more enquiries.' },
  'furniture-appliances': { photoSlot: 'industry-furniture', person: 'furniture or appliance store', waMessage: 'Hi, I run a furniture store and want more showroom visits.' },
  'automobiles': { photoSlot: 'industry-automobiles', person: 'dealership', waMessage: 'Hi, I run a dealership and want more test drives.' },
  'industrial-b2b': { photoSlot: 'industry-industrial', person: 'business', waMessage: 'Hi, I run a B2B business and want more leads.' },
}
