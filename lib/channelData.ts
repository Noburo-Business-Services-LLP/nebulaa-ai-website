/**
 * Channel pages — search entry points.
 *
 * `runBy` matters and is not decoration. Gravity publishes to Instagram,
 * Facebook, LinkedIn, X and YouTube; Pulsar handles WhatsApp, email, SMS and
 * voice. Google Business, Pinterest, paid media and quick-commerce are run by
 * the team as part of a managed engagement — the product does not publish to
 * them, and these pages say so rather than implying otherwise.
 */

export type RunBy = 'gravity' | 'pulsar' | 'services'

export interface Channel {
  slug: string
  name: string
  runBy: RunBy
  /** One line for the hub grid. */
  summary: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  /** What we actually do on this channel. */
  whatWeDo: string[]
  /** The honest limit or caveat, stated rather than buried. */
  note?: string
  faqs: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

const RUN_BY_LABEL: Record<RunBy, string> = {
  gravity: 'Published by Gravity',
  pulsar: 'Handled by Pulsar',
  services: 'Run by our team',
}

export function runByLabel(runBy: RunBy): string {
  return RUN_BY_LABEL[runBy]
}

export const channels: Channel[] = [
  {
    slug: 'whatsapp',
    name: 'WhatsApp',
    runBy: 'pulsar',
    summary: 'Where the enquiry actually arrives — answered in minutes, not Monday.',
    eyebrow: 'Channel · WhatsApp',
    headline: 'In India, the enquiry',
    headlineEmphasis: 'arrives on WhatsApp.',
    subheadline:
      'This is WhatsApp marketing automation India businesses actually need: not email, not a contact form. Someone messages your business number, usually outside working hours, and whoever answers first tends to get the sale. Pulsar replies within minutes on the official Business API.',
    whatWeDo: [
      'Replies within minutes, at any hour, in your brand voice',
      'Budget, timeline and fit established in conversation',
      'Every lead scored, so your callback list is already ordered',
      'Segmented broadcasts, with each reply handled as a real conversation',
      'Official WhatsApp Business API — not an unofficial workaround that gets numbers banned',
    ],
    faqs: [
      { q: 'Do I need the WhatsApp Business API?', a: 'Yes, and we set it up with you. It is the difference between a system that scales and a number that gets banned.' },
      { q: 'Can it use my existing business number?', a: 'Usually yes, though a number already registered on the consumer WhatsApp app has to be migrated first. We handle that during onboarding.' },
      { q: 'What about template message rules?', a: 'Business-initiated messages follow WhatsApp template policy. Replies inside an open conversation window are free-form. The system works inside those rules rather than around them.' },
    ],
    seoTitle: 'WhatsApp Marketing for Indian Businesses',
    seoDescription:
      'Answer every WhatsApp enquiry within minutes on the official Business API, qualify budget and timeline in conversation, and score every lead.',
  },
  {
    slug: 'instagram',
    name: 'Instagram',
    runBy: 'gravity',
    summary: 'Posts, carousels and reels planned a month ahead, published on schedule.',
    eyebrow: 'Channel · Instagram',
    headline: 'A month of Instagram,',
    headlineEmphasis: 'planned before it starts.',
    subheadline:
      'Instagram punishes inconsistency more than it punishes mediocrity. Gravity plans the whole month — posts, carousels and reels against your content pillars — drafts every one in your voice, and publishes at the hours your audience is actually awake.',
    whatWeDo: [
      'Posts, carousels and reels planned as a month, not a queue',
      'Creative generated from your own brand assets and palette',
      'Festival and season content mapped in advance',
      'Comments and DMs pulled into one inbox with replies drafted',
      'Publishing at peak hours per audience, in your timezone',
    ],
    faqs: [
      { q: 'Does it post automatically?', a: 'Only if you let it. By default everything queues for approval and you clear a week in a few minutes.' },
      { q: 'Can it make reels?', a: 'Yes — scene by scene, with the script written to hook, value and call to action rather than one clip with text over it.' },
      { q: 'What about Stories?', a: 'Feed posts, carousels and reels are what the product publishes. Stories are part of a managed engagement.' },
    ],
    seoTitle: 'Instagram Content Planning & Automation — Nebulaa',
    seoDescription:
      'Plan a month of Instagram posts, carousels and reels against your content pillars, drafted in your brand voice and published at peak hours.',
  },
  {
    slug: 'facebook',
    name: 'Facebook',
    runBy: 'gravity',
    summary: 'The same monthly plan, adapted for a Facebook audience.',
    eyebrow: 'Channel · Facebook',
    headline: 'Still where a lot of',
    headlineEmphasis: 'your customers are.',
    subheadline:
      'Facebook is easy to write off and, for a great many Indian businesses, wrong to. For local retail, FMCG and anything with an older or family buyer, it is often the channel producing the most enquiries. Gravity runs it from the same monthly plan.',
    whatWeDo: [
      'Posts and reels adapted for a Facebook audience, not copy-pasted from Instagram',
      'Page comments and messages in the unified inbox',
      'Festival and offer content, which performs particularly well here',
      'Scheduling to the hours this audience is active, which differ from Instagram',
    ],
    faqs: [
      { q: 'Is Facebook still worth it?', a: 'It depends entirely on who buys from you. For a jewellery showroom or a snack brand it is frequently the strongest channel; for B2B software it usually is not.' },
      { q: 'Do I need a separate content plan?', a: 'No. The same monthly plan covers both, with copy and format adapted per platform.' },
      { q: 'Does it handle Facebook ads?', a: 'Individual posts can be boosted. Full paid campaign management is part of the managed service.' },
    ],
    seoTitle: 'Facebook Page Content & Management — Nebulaa',
    seoDescription:
      'Run your Facebook page from the same monthly content plan, with copy adapted per platform, comments in one inbox and scheduling to peak hours.',
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn',
    runBy: 'gravity',
    summary: 'Founder-led B2B content, published consistently without you writing it.',
    eyebrow: 'Channel · LinkedIn',
    headline: 'Founder-led content,',
    headlineEmphasis: 'without the founder writing it.',
    subheadline:
      'LinkedIn rewards showing up with a point of view, week after week — which is exactly what a founder running a business does not have time to do. Gravity writes in your voice, against your positioning, so the consistency does not depend on your calendar.',
    whatWeDo: [
      'Posts written in your voice, against your actual positioning',
      'A month planned so consistency does not depend on your week',
      'Comments and DMs in the same inbox as everything else',
      'Competitor tracking, which on LinkedIn is genuinely useful signal',
    ],
    faqs: [
      { q: 'Will it sound like generic LinkedIn content?', a: 'It writes from your site and your strategy, and you edit before anything goes out. The failure mode you are describing comes from tools with no brand context; this one starts with it.' },
      { q: 'Company page or personal profile?', a: 'Both work. For most founder-led businesses the personal profile outperforms the company page by a wide margin.' },
      { q: 'Does it connect and message people?', a: 'Not on LinkedIn. Outreach runs on WhatsApp, email and SMS through Pulsar, where it is both more effective and within platform rules.' },
    ],
    seoTitle: 'LinkedIn Content for Founders & B2B — Nebulaa',
    seoDescription:
      'Consistent founder-led LinkedIn content written in your voice against your positioning, planned monthly and published without you drafting it.',
  },
  {
    slug: 'x',
    name: 'X',
    runBy: 'gravity',
    summary: 'Short-form posts and threads from the same content plan.',
    eyebrow: 'Channel · X',
    headline: 'Short form,',
    headlineEmphasis: 'same plan.',
    subheadline:
      'X rewards frequency and a point of view more than polish. Gravity works your pillars into short-form posts and threads, so the channel stays alive without becoming another thing to remember.',
    whatWeDo: [
      'Short-form posts and threads from your existing pillars',
      'Frequency without a separate content process',
      'Scheduling across the day rather than in one burst',
    ],
    note: 'X is a secondary channel for most Indian SMBs. Worth running if your buyers are there, not worth forcing if they are not.',
    faqs: [
      { q: 'Is X worth it for my business?', a: 'For B2B, tech and media-adjacent businesses, often yes. For local retail, usually not — and we will say so rather than sell you a channel that will not produce anything.' },
      { q: 'Can it write threads?', a: 'Yes, built from the same pillars as your longer-form content.' },
    ],
    seoTitle: 'X (Twitter) Content Scheduling — Nebulaa',
    seoDescription:
      'Short-form posts and threads built from your existing content pillars and scheduled through the day.',
  },
  {
    slug: 'youtube-shorts',
    name: 'YouTube Shorts',
    runBy: 'gravity',
    summary: 'The reels you already made, distributed where they get a second life.',
    eyebrow: 'Channel · YouTube Shorts',
    headline: 'The same reel,',
    headlineEmphasis: 'a second audience.',
    subheadline:
      'A reel that took real effort should not run on one platform. Shorts has a different discovery engine and a longer tail than Instagram, and the marginal cost of publishing there is close to zero.',
    whatWeDo: [
      'Reels formatted and published to Shorts alongside Instagram',
      'Titles and descriptions written for YouTube search, not copied from the caption',
      'A back catalogue that keeps surfacing rather than scrolling away',
    ],
    faqs: [
      { q: 'Do I need a YouTube channel already?', a: 'You need one, but it does not need an audience. Shorts discovery does not depend on subscriber count the way long-form does.' },
      { q: 'Is it the same video as the Instagram reel?', a: 'Usually the same cut, with the title and description written for how people search on YouTube.' },
    ],
    seoTitle: 'YouTube Shorts Distribution for Brands — Nebulaa',
    seoDescription:
      'Publish your reels to YouTube Shorts with titles and descriptions written for YouTube search, giving each video a second audience.',
  },
  {
    slug: 'email',
    name: 'Email',
    runBy: 'pulsar',
    summary: 'Handled in the same thread as WhatsApp, with the same qualification.',
    eyebrow: 'Channel · Email',
    headline: 'For the buyers who',
    headlineEmphasis: 'still prefer it.',
    subheadline:
      'Dealers, distributors and corporate buyers often want things in writing on email, even when everything else runs on WhatsApp. Pulsar handles it in the same conversation thread, so you read one history rather than three.',
    whatWeDo: [
      'Replies and follow-up sequences from your own domain',
      'One thread per person across email, WhatsApp and SMS',
      'The same qualification and scoring as any other channel',
      'Fallback to another channel when email goes unanswered',
    ],
    faqs: [
      { q: 'Is this a newsletter tool?', a: 'No. This is one-to-one sales conversation and follow-up. Newsletters are a different job and belong in a newsletter tool.' },
      { q: 'Does it send from my domain?', a: 'Yes, with the sending records set up properly so mail actually lands.' },
    ],
    seoTitle: 'Email Follow-up & Lead Qualification — Nebulaa',
    seoDescription:
      'Email handled in the same thread as WhatsApp and SMS, with the same qualification, scoring and follow-up sequences.',
  },
  {
    slug: 'sms',
    name: 'SMS',
    runBy: 'pulsar',
    summary: 'The channel that still gets read when nothing else does.',
    eyebrow: 'Channel · SMS',
    headline: 'Still the one that',
    headlineEmphasis: 'always gets seen.',
    subheadline:
      'SMS has no algorithm and almost universal reach, which makes it the right fallback for a customer who has not opened WhatsApp in three days — and for anything genuinely time-sensitive.',
    whatWeDo: [
      'Fallback when a WhatsApp or email thread goes quiet',
      'Time-sensitive alerts, confirmations and reminders',
      'Replies routed back into the same conversation thread',
    ],
    note: 'Best as a fallback and for time-sensitive messages rather than as a primary channel. Used badly, SMS reads as spam faster than anything else.',
    faqs: [
      { q: 'Will this annoy people?', a: 'It would, if used for everything. It is a fallback channel and a time-sensitive one, which is why it sits behind WhatsApp rather than beside it.' },
      { q: 'Does it work with DLT registration?', a: 'Indian SMS requires DLT-registered sender IDs and templates. That gets set up during onboarding.' },
    ],
    seoTitle: 'SMS Follow-up & Alerts — Nebulaa',
    seoDescription:
      'SMS as a fallback when other channels go quiet, and for time-sensitive alerts, with replies routed into the same conversation thread.',
  },
  {
    slug: 'voice',
    name: 'Voice calling',
    runBy: 'pulsar',
    summary: 'A managed call queue for the enquiries a message will not close.',
    eyebrow: 'Channel · Voice',
    headline: 'For the moments a call',
    headlineEmphasis: 'still beats a message.',
    subheadline:
      'Most of the time a message wins — it is on the customer\'s terms and it leaves a record. But some enquiries deserve a call, and some people never reply to text. The call queue works those in priority order without anyone dialling manually.',
    whatWeDo: [
      'A call queue ordered by lead score, not by whoever is free',
      'Calls triggered by silence on messaging channels',
      'Outcomes recorded against the lead alongside the message history',
    ],
    note: 'Deliberately the last channel we reach for. In this market a WhatsApp message gets answered far more often than a call from an unknown number.',
    faqs: [
      { q: 'Why do you push messaging over calling?', a: 'Because it works better here. Unknown numbers get ignored; WhatsApp gets read. We would rather tell you that than sell you call volume.' },
      { q: 'Is this cold calling?', a: 'No. It works your own enquiries and contacts.' },
    ],
    seoTitle: 'Automated Voice Follow-up Calls — Nebulaa',
    seoDescription:
      'A managed call queue that works your own enquiries in priority order, triggered by lead score or silence on messaging channels.',
  },
  {
    slug: 'google-business-profile',
    name: 'Google Business Profile',
    runBy: 'services',
    summary: 'The listing that wins the "near me" search — kept current and answered.',
    eyebrow: 'Channel · Google Business',
    headline: 'The search that ends',
    headlineEmphasis: 'in someone walking in.',
    subheadline:
      'For a business with a physical location, the Google listing is often the highest-intent surface there is — someone searching "near me" is already deciding. Our team keeps the profile current, posts to it, and makes sure reviews get answered.',
    whatWeDo: [
      'Profile optimisation — categories, attributes, hours, service areas',
      'Posts and offers published to the listing',
      'Review responses, which materially affect whether someone chooses you',
      'Photo and product listing upkeep',
    ],
    note: 'Run by our team as part of a managed engagement. Gravity does not publish to Google Business directly.',
    faqs: [
      { q: 'Can I do this on the self-serve product?', a: 'No — this one is managed. The product publishes to Instagram, Facebook, LinkedIn, X and YouTube.' },
      { q: 'Does it really matter?', a: 'For local retail it is frequently the single highest-intent channel. Someone searching "jewellery shop near me" is much closer to buying than someone scrolling a feed.' },
    ],
    seoTitle: 'Google Business Profile Management — Nebulaa',
    seoDescription:
      'Profile optimisation, posts, offers and review responses for the listing that wins local "near me" searches.',
  },
  {
    slug: 'pinterest',
    name: 'Pinterest',
    runBy: 'services',
    summary: 'Long-tail discovery for jewellery, textile, décor and food.',
    eyebrow: 'Channel · Pinterest',
    headline: 'Where a post keeps',
    headlineEmphasis: 'working for months.',
    subheadline:
      'Pinterest behaves like a search engine rather than a feed — a pin can still be driving traffic a year after it went up. For visual categories like jewellery, textile, décor and food, that long tail is worth having.',
    whatWeDo: [
      'Boards and pins built around how people actually search',
      'Existing creative repurposed rather than made from scratch',
      'A back catalogue that compounds instead of scrolling away',
    ],
    note: 'Run by our team as part of a managed engagement, for the categories where it earns its place.',
    faqs: [
      { q: 'Is Pinterest worth it in India?', a: 'For visual, aspirational categories — bridal jewellery, textiles, interiors, food — it produces steady discovery. For most B2B it does not, and we will say so.' },
      { q: 'Do I need new creative for it?', a: 'Generally no. What you are already producing gets repurposed to the format.' },
    ],
    seoTitle: 'Pinterest Marketing for Visual Brands — Nebulaa',
    seoDescription:
      'Boards and pins built around search behaviour, giving jewellery, textile, décor and food brands discovery that compounds over months.',
  },
  {
    slug: 'meta-google-ads',
    name: 'Meta & Google Ads',
    runBy: 'services',
    summary: 'Always-on paid, geo-targeted to the markets and stores that matter.',
    eyebrow: 'Channel · Paid media',
    headline: 'Paid that points at',
    headlineEmphasis: 'where you actually sell.',
    subheadline:
      'Paid media works when it is aimed at a real catchment rather than a whole country. Our team runs always-on Meta and Google campaigns geo-targeted around the markets, neighbourhoods and retail clusters where your product is genuinely available.',
    whatWeDo: [
      'Always-on awareness, consideration and retargeting campaigns',
      'Geo-targeting around real retail catchments, not whole states',
      'Local-intent search — people looking for what you sell, near where you sell it',
      'Creative produced alongside the organic plan, not separately',
    ],
    note: 'Media spend is billed at actuals and never marked up. The retainer covers the work, not the spend.',
    faqs: [
      { q: 'How much should I spend?', a: 'It depends on the catchment and the category. We scope it against your markets rather than quoting a number before we know them.' },
      { q: 'Do you mark up media spend?', a: 'No. Spend is billed at actuals and stays visible — the retainer covers management, not a cut of your budget.' },
      { q: 'Can I see what it is doing?', a: 'Yes. Monthly reporting covers what ran, what worked and what changes next.' },
    ],
    seoTitle: 'Meta & Google Ads for Indian Brands',
    seoDescription:
      'Always-on Meta and Google campaigns geo-targeted around real retail catchments, with media billed at actuals and never marked up.',
  },
  {
    slug: 'quick-commerce',
    name: 'Quick commerce',
    runBy: 'services',
    summary: 'Driving discovery on Zepto, Blinkit and Instamart where you are listed.',
    eyebrow: 'Channel · Quick commerce',
    headline: 'Being listed is not',
    headlineEmphasis: 'the same as being found.',
    subheadline:
      'Getting onto Zepto, Blinkit or Instamart is the hard part, and most brands stop there — then wonder why the listing does nothing. Our team works the discovery side: listing optimisation, geo-targeted campaigns pointed at live availability, and trial-driving offers.',
    whatWeDo: [
      'Listing optimisation so the product is findable in-app',
      'Geo-targeted campaigns aimed at areas where you are actually stocked',
      'Platform promotions and trial offers where they are worth running',
      'Tracking which markets convert, to sharpen where the next campaign spend goes',
    ],
    note: 'Run by our team as part of a managed engagement — most relevant for FMCG and food brands.',
    faqs: [
      { q: 'Do you get me listed on these platforms?', a: 'Listing and commercial terms are between you and the platform. What we run is everything that makes the listing produce sales once it exists.' },
      { q: 'Which platforms?', a: 'Zepto, Blinkit and Swiggy Instamart are the ones that matter most for Indian FMCG today.' },
      { q: 'Does this work before I have distribution?', a: 'Partly — this is why market-entry engagements start demand generation before launch, so there is interest waiting when stock arrives.' },
    ],
    seoTitle: 'Quick Commerce Growth — Zepto, Blinkit & Instamart',
    seoDescription:
      'Listing optimisation and geo-targeted campaigns that drive discovery on Zepto, Blinkit and Swiggy Instamart where your product is stocked.',
  },
]

export function getChannel(slug: string): Channel | undefined {
  return channels.find(c => c.slug === slug)
}
