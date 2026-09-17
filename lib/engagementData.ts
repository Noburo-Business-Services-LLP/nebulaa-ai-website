/**
 * Engagement shapes.
 *
 * Deliberately not nine sector pages — those would duplicate /for, which
 * already covers how the agents serve each vertical. What a buyer actually
 * needs to work out is which *shape* of engagement they are asking for, and
 * there are three real ones, each drawn from live proposal material:
 *
 *   always-on      — the ongoing content packages
 *   market-entry   — the pre-launch demand model
 *   regional       — the multi-market organic + paid + BTL programme
 *
 * No client names and no outcome figures, per the standing decision. Scope and
 * cadence are real; results are described qualitatively until there is
 * something published we can point at.
 */

export interface EngagementPhase {
  label: string
  body: string
}

export interface Engagement {
  slug: string
  name: string
  summary: string
  forWho: string
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  /** What is actually delivered, month after month. */
  scope: { group: string; items: string[] }[]
  /** How the engagement runs over time. */
  rhythm: EngagementPhase[]
  /** What changes — qualitative, deliberately not a metrics table. */
  whatChanges: string[]
  faqs: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

export const engagements: Engagement[] = [
  {
    slug: 'always-on-content',
    name: 'Always-on content',
    summary: 'A consistent monthly presence for a brand that already has customers.',
    forWho: 'Established local and regional brands with an existing customer base',
    eyebrow: 'Engagement · always-on',
    headline: 'The month gets made',
    headlineEmphasis: 'whether you have time or not.',
    subheadline:
      'The most common engagement, and the least dramatic. An established business with real customers that goes quiet online for weeks at a time because everyone is busy running it. We take the content off the team entirely and keep it moving.',
    scope: [
      {
        group: 'Every month',
        items: [
          'A month of content planned against agreed pillars',
          'Posts, carousels and short-form video drafted and produced',
          'Festival and season campaigns mapped ahead of the window',
          'Publishing across your connected channels, at the right hours',
        ],
      },
      {
        group: 'Ongoing',
        items: [
          'Comments, DMs and enquiries answered rather than accumulating',
          'Competitor tracking, with content that answers what they run',
          'A monthly call in plain language — what worked, what did not, why',
        ],
      },
    ],
    rhythm: [
      { label: 'Week 1', body: 'Strategy and pillars agreed, channels connected, brand assets collected.' },
      { label: 'Week 2', body: 'The first month is planned and drafted, and you review it as a batch.' },
      { label: 'Ongoing', body: 'Content ships continuously; you approve. One review call a month.' },
    ],
    whatChanges: [
      'The account stops going quiet for weeks when the business gets busy',
      'Enquiries get answered the same day rather than whenever someone checks',
      'Festival and season windows get planned for instead of missed',
      'Someone is accountable for it, which is usually the actual difference',
    ],
    faqs: [
      { q: 'How much of my team\'s time does this take?', a: 'Approvals, and one call a month. Most owners spend under half an hour a week on it once it is running.' },
      { q: 'Do we need to do a shoot?', a: 'Not to start. Most of the first months run on generated creative and what you already have. A shoot becomes worth it once the cadence is established.' },
      { q: 'What if we want to say something specific?', a: 'Tell us and it goes into the plan. The calendar is a working document, not a locked schedule.' },
    ],
    seoTitle: 'Always-On Content Engagement — Managed Marketing',
    seoDescription:
      'A consistent monthly content engagement for established brands: planning, production, publishing, enquiry handling and a monthly review.',
  },
  {
    slug: 'market-entry',
    name: 'Market entry',
    summary: 'Demand built in the months before a launch, so it is waiting when the stock lands.',
    forWho: 'Brands taking an existing product into a new city or market',
    eyebrow: 'Engagement · market entry',
    headline: 'Awareness waiting',
    headlineEmphasis: 'when the stock arrives.',
    subheadline:
      'A brand with a proven product in one market, going into another. The failure mode is sorting distribution first and marketing second, then watching stock sit. This engagement runs demand generation ahead of the launch date, so awareness is already there by the time distribution is sorted.',
    scope: [
      {
        group: 'Demand generation',
        items: [
          'City-specific content and a local content calendar',
          'Geo-targeted Meta and Google campaigns around real catchments',
          'Regional creator collaborations for local credibility',
          'Quick-commerce listing optimisation and discovery campaigns',
        ],
      },
      {
        group: 'On the ground',
        items: [
          'Sampling drives in priority neighbourhoods',
          'Retail activations and in-store demonstrations',
          'Local events and hyperlocal promotional activity',
        ],
      },
    ],
    rhythm: [
      { label: 'Month 1', body: 'Build the market — campaigns begin, audience forms, creators identified, retail clusters agreed.' },
      { label: 'Month 2', body: 'Build product interest — creator collaborations go live, sampling starts in priority areas.' },
      { label: 'Month 3', body: 'Create purchase intent — performance intensifies, BTL steps up as launch approaches.' },
      { label: 'Month 4', body: 'Launch and convert — visible across digital, listings promoted, activation supporting on the ground.' },
    ],
    whatChanges: [
      'The brand is already familiar in the market by the time it is on shelf',
      'Listings have traffic pointed at them rather than sitting undiscovered',
      'Launch week has activity around it, not just stock in a warehouse',
    ],
    faqs: [
      { q: 'How far ahead should we start?', a: 'Three to four months. Starting a month out still helps, but most of the compounding is lost.' },
      { q: 'Can you run several cities at once?', a: 'Yes, and the model repeats per market. Team and cost scale with the number of cities, which gets scoped up front.' },
    ],
    seoTitle: 'Market Entry Engagement for New City Launches',
    seoDescription:
      'A four-month engagement building demand before launch — local content, creators, geo-targeted campaigns, sampling and quick commerce.',
  },
  {
    slug: 'regional-programme',
    name: 'Regional programme',
    summary: 'Organic, paid and on-ground activation run as one system across multiple markets.',
    forWho: 'Brands with distribution across several markets, regions or retail networks',
    eyebrow: 'Engagement · regional',
    headline: 'Three pillars,',
    headlineEmphasis: 'one execution system.',
    subheadline:
      'The largest shape we run. A brand present across several markets or a retail network, where organic content, paid media and on-ground activation all need to happen — and currently happen through different vendors who never speak to each other.',
    scope: [
      {
        group: 'Pillar one — organic',
        items: [
          'Dedicated regional pages or market-specific content where it makes sense',
          'Daily content tuned to each market, in local language where relevant',
          'Product education, real usage, testimonials, promotions and festival content',
        ],
      },
      {
        group: 'Pillar two — performance',
        items: [
          'Always-on Meta campaigns — awareness, engagement, retargeting',
          'Google search and demand generation with regional targeting',
          'Micro and nano regional creators chosen for local credibility',
        ],
      },
      {
        group: 'Pillar three — BTL and retail',
        items: [
          'Festival and seasonal activation across regional occasions',
          'Product launches, dealer events and retail activations',
          'Geo-targeted spend concentrated around priority retail clusters',
          'Dealer-specific communication and point-of-sale support',
        ],
      },
    ],
    rhythm: [
      { label: 'Phase 1', body: 'Understand objectives, set market priorities, agree the content calendar, begin organic and digital promotion.' },
      { label: 'Phase 2', body: 'Manage paid and creator campaigns, execute BTL where scheduled, optimise in real time.' },
      { label: 'Continuous', body: 'Monitor, learn, optimise, execute again — with every layer tracked on its own terms.' },
    ],
    whatChanges: [
      'Consumer communication connects to where the product is actually sold',
      'Each market gets content adapted to it rather than a national message',
      'Dealer and retail activity stops being disconnected from brand marketing',
      'Reporting arrives as one picture instead of three vendors\' separate claims',
    ],
    faqs: [
      { q: 'How many markets can this cover?', a: 'It scales by market. The model is the same whether it is three cities or a retail network across a state — the team and the cost scale with it.' },
      { q: 'Do you work with our existing agencies?', a: 'We can, though the reason this works is that the three pillars run together. Splitting them across vendors is usually the problem being solved.' },
      { q: 'How is BTL measured?', a: 'Participation, samples distributed, dealer engagement, and movement in the geo-targeted campaigns running around the same clusters. It is not as clean as a click and we say so.' },
    ],
    seoTitle: 'Regional Marketing Programme — Organic, Paid & BTL',
    seoDescription:
      'Organic content, performance media and on-ground retail activation run as one system across multiple markets, reported together.',
  },
]

export function getEngagement(slug: string): Engagement | undefined {
  return engagements.find(e => e.slug === slug)
}
