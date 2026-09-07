export interface ServiceClient {
  name: string
  stage: 'active' | 'proposal'
}

export interface IllustrativeExample {
  industryLabel: string
  copy: string | null // null = placeholder, waiting on real copy from DK — do not invent
}

export interface Differentiator {
  title: string
  body: string
}

export interface ServiceTierData {
  slug: 'enterprise' | 'msme'
  name: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  seoTitle: string
  seoDescription: string
  engagementTitle: string
  engagementBlurb: string
  whatYouGet: string[]
  clients: ServiceClient[]
  illustrativeExamples: IllustrativeExample[]
  ctaLabel: string
}

export const differentiators: Differentiator[] = [
  {
    title: 'One team, one contact',
    body: 'Not a rotating cast of account managers, and not a junior learning your business on your retainer. Whoever learns it, keeps it.',
  },
  {
    title: 'The machines do the volume',
    body: "Gravity plans the month and drafts every post, carousel and reel against it. Pulsar scores and chases every lead. Our people review, refine, and make the judgement calls — the part you're actually paying for.",
  },
  {
    title: 'You keep everything',
    body: 'Accounts, content and lead data, all in your name. Take it in-house whenever you like and the whole system walks with you. No hostages.',
  },
]

export const serviceTiers: Record<string, ServiceTierData> = {
  enterprise: {
    slug: 'enterprise',
    name: 'Enterprise',
    eyebrow: 'Managed services',
    headline: 'We run the launch.',
    headlineEmphasis: 'You run the business.',
    subheadline:
      'Gandhimathi Jewellers, JKR Tex and TNV Chits already have us doing this for them — market-entry content, dealer enablement, and a number you agreed to, every month. Bosch is next.',
    seoTitle: 'Enterprise Managed Marketing — Nebulaa',
    seoDescription:
      'End-to-end managed marketing for established brands entering new markets — strategy, content, distribution, and sales enablement, delivered by Nebulaa’s team.',
    engagementTitle: 'Entering a market, or scaling a region',
    engagementBlurb:
      "Distribution is the hard part, not the deck. Gravity builds the market-entry content plan — posts, carousels, reels — and tracks what's already working for competitors in the region. Pulsar follows up every retail and dealer enquiry the same day. Our team directs it and reports against the numbers you agreed to, every month.",
    whatYouGet: [
      'Market-entry strategy and a content plan built from it',
      'Posts, carousels and reels, localised per region',
      'Every dealer and retail enquiry followed up same-day',
      'Monthly reporting against agreed targets',
    ],
    clients: [
      { name: 'Gandhimathi Jewellers', stage: 'active' },
      { name: 'JKR Tex', stage: 'active' },
      { name: 'TNV Chits', stage: 'active' },
      { name: 'Bosch', stage: 'proposal' },
    ],
    illustrativeExamples: [
      { industryLabel: 'A jewellery retail brand', copy: null },
      { industryLabel: 'An FMCG brand entering a new city', copy: null },
      { industryLabel: 'A textile manufacturer', copy: null },
    ],
    ctaLabel: 'Book a 20-min call',
  },
  msme: {
    slug: 'msme',
    name: 'MSME',
    eyebrow: 'Managed services',
    headline: 'A marketing team,',
    headlineEmphasis: 'priced like one person.',
    subheadline:
      "Gravity plans your month, Pulsar answers your WhatsApp — our team runs both and calls you once a month to say what worked. Rajaram's and Nellai Kuttam Snacks are piloting it now.",
    seoTitle: 'AI-Native Marketing Services for MSMEs — Nebulaa',
    seoDescription:
      'Done-for-you digital marketing for small and mid-size businesses, delivered by Nebulaa’s team and accelerated by AI — scoped to MSME budgets.',
    engagementTitle: "A marketing team you couldn't otherwise afford",
    engagementBlurb:
      "The same engine, sized for you. Gravity plans your month and drafts the posts; Pulsar answers every WhatsApp enquiry before it goes cold. Our team runs it, checks it, and calls you once a month to say what's working.",
    whatYouGet: [
      'A month of content, planned and drafted for you',
      'Every WhatsApp enquiry answered and scored',
      'Festival and season campaigns planned ahead',
      'A monthly call, in plain language',
    ],
    clients: [
      { name: "Rajaram's", stage: 'proposal' },
      { name: 'Nellai Kuttam Snacks', stage: 'proposal' },
    ],
    illustrativeExamples: [
      { industryLabel: 'A jewellery retail brand', copy: null },
      { industryLabel: 'An FMCG brand entering a new city', copy: null },
      { industryLabel: 'A textile manufacturer', copy: null },
    ],
    ctaLabel: 'Book a 20-min call',
  },
}
