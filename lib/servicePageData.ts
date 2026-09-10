/**
 * Managed service pages.
 *
 * Written against the real engagement material — the capabilities deck, the
 * Bosch regional proposal and the Nellai Kuttam market-entry scope. Formats
 * and cadence described here are things we actually run.
 *
 * No pricing appears on any of these pages by design: a single-city content
 * engagement and a multi-store regional programme are not the same job, and
 * publishing one number would misprice both.
 */

export interface ServiceStep {
  title: string
  body: string
}

export interface Phase {
  label: string
  title: string
  body: string
  outcome: string
}

export interface ServicePage {
  slug: string
  name: string
  /** One line for the services hub. */
  summary: string
  /** Marks the three nobody else in this category offers. */
  flagship?: boolean
  eyebrow: string
  headline: string
  headlineEmphasis: string
  subheadline: string
  howItWorks: ServiceStep[]
  whatWeRun: string[]
  /** Only the market-entry page uses the phased timeline. */
  phases?: Phase[]
  note?: string
  faqs: { q: string; a: string }[]
  seoTitle: string
  seoDescription: string
}

export const servicePages: ServicePage[] = [
  {
    slug: 'market-entry',
    name: 'Market entry',
    summary: 'Demand built in the months before launch, not scrambled after it.',
    flagship: true,
    eyebrow: 'Service · market entry',
    headline: 'Start building the market',
    headlineEmphasis: 'before you are on the shelf.',
    subheadline:
      'Most brands enter a new city by sorting distribution first and marketing second, then wonder why the stock sits. We run it the other way round: demand generation starts months before launch, so there is already interest waiting when the product arrives.',
    howItWorks: [
      { title: 'Pick the market and the date', body: 'One city, one launch window. Everything else works backwards from it.' },
      { title: 'Build awareness first', body: 'Local content, creators and geo-targeted campaigns run in the months before anything is on a shelf.' },
      { title: 'Layer in trial and availability', body: 'Sampling and retail activation as launch approaches, timed to when stock actually lands.' },
      { title: 'Convert at launch', body: 'By launch week the brand is familiar, the listings are live, and the activation is already running.' },
    ],
    phases: [
      {
        label: 'Month 1',
        title: 'Build the market',
        body: 'City-focused campaigns begin, a local audience starts forming, relevant creators are identified, quick-commerce availability is mapped and priority retail clusters are agreed.',
        outcome: 'People in the city begin encountering the brand before launch.',
      },
      {
        label: 'Month 2',
        title: 'Build product interest',
        body: 'Product-focused communication increases, creator collaborations go live, quick-commerce discovery activity starts and sampling begins in priority areas.',
        outcome: 'Consumers move from "I have seen this brand" to "I want to try it."',
      },
      {
        label: 'Month 3',
        title: 'Create purchase intent',
        body: 'Performance campaigns intensify, offer communication goes out, traffic is driven to live listings, and sampling and BTL step up as distribution readiness completes.',
        outcome: 'Demand is being created while availability is being put in place.',
      },
      {
        label: 'Month 4',
        title: 'Launch and convert',
        body: 'The brand is visible across digital, creators keep recommending, listings are promoted where available, and retail activation supports the launch on the ground.',
        outcome: 'You enter with awareness, availability and activity already working.',
      },
    ],
    whatWeRun: [
      'Localised content and a city-specific content calendar',
      'Geo-targeted Meta and Google campaigns around real catchments',
      'Regional creator collaborations for local credibility',
      'Sampling, retail activation and hyperlocal promotion',
      'Quick-commerce listing optimisation and discovery campaigns',
      'Distributor introductions through existing regional relationships',
    ],
    note: 'The timeline above is the shape of the model, not a fixed contract. A faster launch or several cities at once changes the scope and the sequence.',
    faqs: [
      { q: 'Do you handle distribution itself?', a: 'We facilitate introductions and support the conversations. Distributor appointment, commercial negotiation and sales execution stay with you and your partners — we are not a distribution company and would not do it well.' },
      { q: 'How far ahead should we start?', a: 'Three to four months before launch is where this model works. Starting a month out still helps, but you lose most of the compounding.' },
      { q: 'What if the launch date moves?', a: 'It frequently does. The sequence shifts with it — the point is that activity is timed to the date, whenever the date turns out to be.' },
      { q: 'Can you do more than one city?', a: 'Yes, and the model repeats per market. Costs and team scale with the number of cities, which is part of what gets scoped.' },
    ],
    seoTitle: 'New Market Entry Marketing for FMCG & Consumer Brands | Nebulaa',
    seoDescription:
      'Demand generation that starts months before launch — local content, creators, geo-targeted campaigns, sampling and quick-commerce discovery, timed to your launch date.',
  },
  {
    slug: 'btl-activation',
    name: 'BTL & on-ground activation',
    summary: 'Sampling, in-store demos and outdoor branding, run every month.',
    flagship: true,
    eyebrow: 'Service · BTL activation',
    headline: 'The part that happens',
    headlineEmphasis: 'off the screen.',
    subheadline:
      'Someone has to stand in the aisle and hand your product to a customer. No software does that, which is exactly why it works — and why almost every AI marketing tool competing with us simply cannot offer it.',
    howItWorks: [
      { title: 'Pick the catchments', body: 'The neighbourhoods, stores and clusters where your product is actually available and your buyer actually shops.' },
      { title: 'Run a monthly cycle', body: 'Activation days rotate across priority areas rather than firing once and stopping.' },
      { title: 'Tie it back to the digital', body: 'Geo-targeted campaigns run around the same catchments in the same weeks, so the two reinforce each other.' },
    ],
    whatWeRun: [
      'Sampling drives in stores and high-footfall locations',
      'Promoter-led in-store product demonstrations',
      'In-store standees and point-of-sale visibility',
      'Outdoor activations at local events and neighbourhood clusters',
      'Bus-back advertising and auto-rickshaw branding for city-level presence',
      'Dealer and distributor trade marketing support',
    ],
    note: 'Activation investment depends on format, city and scale, and is scoped and quoted once specific activations are confirmed.',
    faqs: [
      { q: 'How is this different from hiring a local BTL agency?', a: 'A BTL agency runs the activation and hands you photographs. We run it alongside the digital campaign targeting the same catchment in the same week, and report both together.' },
      { q: 'Who staffs the activations?', a: 'Promoters and staff are arranged and managed as part of the engagement.' },
      { q: 'How do you measure something on the ground?', a: 'Participation, samples distributed, dealer engagement and the movement in the geo-targeted digital campaigns running around the same clusters. It is not as clean as a click, and we do not pretend otherwise.' },
    ],
    seoTitle: 'BTL Activation, Sampling & In-Store Demos in India | Nebulaa',
    seoDescription:
      'Sampling drives, promoter-led in-store demos, standees, outdoor activations and vehicle branding, rotated monthly across your priority retail catchments.',
  },
  {
    slug: 'distribution-enablement',
    name: 'Distribution enablement',
    summary: 'Introductions into a distributor network — the conversation stays yours.',
    flagship: true,
    eyebrow: 'Service · distribution',
    headline: 'The introduction,',
    headlineEmphasis: 'not the negotiation.',
    subheadline:
      'Entering a new market means finding distributors who will actually carry you, which usually means knowing someone. We use existing regional relationships to open those conversations — and then stay out of the commercial terms, which are yours to set.',
    howItWorks: [
      { title: 'Identify the right partners', body: 'Distributors whose existing lines, coverage and retail relationships fit the product and the market.' },
      { title: 'Open the conversation', body: 'A warm introduction through an existing relationship, which travels considerably further than a cold approach.' },
      { title: 'Support the early discussions', body: 'Coordination and context while the relationship forms — then it is between you and them.' },
    ],
    whatWeRun: [
      'Identifying relevant distributor opportunities per market',
      'Introductions through existing regional relationships',
      'Coordination during early channel conversations',
      'Context and materials that make the brand easy to say yes to',
    ],
    note: 'Distributor appointment, commercial negotiation and sales execution remain with you and your appointed partners. Our role is network access, introduction and facilitation — nothing beyond that.',
    faqs: [
      { q: 'Can you guarantee distribution?', a: 'No, and anyone who does is selling you something. We can open doors that are hard to open cold; whether a distributor takes the line depends on your product and your terms.' },
      { q: 'Do you take a cut of distribution revenue?', a: 'No. This is part of the engagement, not a brokerage arrangement.' },
      { q: 'Which markets do you have relationships in?', a: 'Strongest across Tamil Nadu and the wider South. Worth a direct conversation about the specific city you have in mind.' },
    ],
    seoTitle: 'Distribution Enablement & Distributor Introductions | Nebulaa',
    seoDescription:
      'Warm introductions into regional distributor networks for brands entering a new market — appointment and negotiation stay with you.',
  },
  {
    slug: 'performance-marketing',
    name: 'Performance marketing',
    summary: 'Always-on Meta and Google, aimed at real catchments.',
    eyebrow: 'Service · paid media',
    headline: 'Paid pointed at where',
    headlineEmphasis: 'you actually sell.',
    subheadline:
      'National targeting wastes most of a regional brand\'s budget. We run always-on Meta and Google campaigns geo-targeted around the specific markets, neighbourhoods and retail clusters where your product is available and your buyer is standing.',
    howItWorks: [
      { title: 'Map the catchments', body: 'Where the product is stocked, where the buyer lives, and which clusters are worth concentrating spend around.' },
      { title: 'Run always-on', body: 'Awareness, consideration and retargeting running continuously rather than in campaign bursts.' },
      { title: 'Optimise on real signal', body: 'Spend moves toward the areas and creatives producing enquiries, reviewed every cycle.' },
    ],
    whatWeRun: [
      'Meta campaigns — awareness, consideration, retargeting and promotions',
      'Google search and demand-generation with regional targeting',
      'Local-intent search around retail catchments',
      'Creative produced alongside the organic plan rather than separately',
      'Monthly reporting on CTR, CPC, CPM and what converted',
    ],
    note: 'Media spend is billed at actuals and never marked up. The retainer covers running the campaigns, not a percentage of your budget.',
    faqs: [
      { q: 'What budget do I need?', a: 'It depends on the catchment and category. We scope it against your markets rather than quoting a figure before knowing them.' },
      { q: 'Do you mark up media spend?', a: 'No. Spend is billed at actuals and stays visible to you. Charging a percentage of budget creates an incentive to spend more, which is not an incentive we want.' },
      { q: 'Who owns the ad accounts?', a: 'You do. Accounts stay in your name and the campaign history goes with you if we stop working together.' },
    ],
    seoTitle: 'Performance Marketing & Paid Media Management | Nebulaa',
    seoDescription:
      'Always-on Meta and Google campaigns geo-targeted around real retail catchments, with media billed at actuals and never marked up.',
  },
  {
    slug: 'influencer-marketing',
    name: 'Influencer marketing',
    summary: 'Regional micro and nano creators, sourced and managed end to end.',
    eyebrow: 'Service · creators',
    headline: 'Local credibility,',
    headlineEmphasis: 'borrowed properly.',
    subheadline:
      'A regional creator with eight thousand engaged followers in your city is usually worth more than a national name with two million spread across the country. We source them, brief them, review what they produce and measure what it did.',
    howItWorks: [
      { title: 'Source for fit, not follower count', body: 'Micro and nano creators whose audience genuinely overlaps with your buyer, in your market and language.' },
      { title: 'Brief and coordinate', body: 'What is being made, when it goes out, what must be said and what must not.' },
      { title: 'Review, publish, amplify', body: 'Work is reviewed before it goes live, published on their channel, then amplified on yours.' },
    ],
    whatWeRun: [
      'Creator sourcing and vetting per market and language',
      'Collaboration briefs with terms recorded against them',
      'Submission review before anything publishes',
      'Amplification of creator content on your own channels',
      'Per-creator performance, so you know who to work with again',
    ],
    note: 'Creator fees are billed at actuals, separately from the retainer, and are never marked up.',
    faqs: [
      { q: 'How many creators is right?', a: 'For most regional engagements, roughly five creators producing a couple of posts each per month works better than one larger name.' },
      { q: 'Do you guarantee results from creator posts?', a: 'No. We can guarantee the work is briefed, reviewed and measured — not that a given creator will produce a hit.' },
      { q: 'What if a creator does something off-brand?', a: 'Submissions are reviewed before publishing, which is the entire reason the review step exists.' },
    ],
    seoTitle: 'Regional Influencer & Creator Marketing in India | Nebulaa',
    seoDescription:
      'Micro and nano creator campaigns sourced by audience fit rather than follower count, briefed, reviewed before publishing and measured per creator.',
  },
  {
    slug: 'content-production',
    name: 'Content & production',
    summary: 'Photography, film, carousels and short-form, produced in-house.',
    eyebrow: 'Service · production',
    headline: 'Somebody still has to',
    headlineEmphasis: 'make the thing.',
    subheadline:
      'Generated creative covers a great deal, but not a product shoot, a facility film or a founder interview. Our team produces the assets that need producing, and Gravity handles the volume around them.',
    howItWorks: [
      { title: 'Work out what needs shooting', body: 'What genuinely requires a camera, versus what can be produced without one.' },
      { title: 'Produce it', body: 'Product and facility photography, brand films, leadership and culture video, shot to a plan rather than ad hoc.' },
      { title: 'Feed the system', body: 'Everything produced becomes a brand asset the content engine draws on for months afterwards.' },
    ],
    whatWeRun: [
      'Product and catalogue photography',
      'Brand films, product stories and facility films',
      'Leadership, culture and founder-led video',
      'Carousels, static creative, explainers and copy',
      'Short-form video for reels and Shorts',
    ],
    faqs: [
      { q: 'Do I need a shoot at all?', a: 'Less often than you would think, and more often than a pure software vendor will admit. A jewellery brand needs real product photography; a services business frequently does not.' },
      { q: 'Who owns the footage?', a: 'You do — raw and edited. It stays yours if we stop working together.' },
      { q: 'How often do you shoot?', a: 'Typically a periodic shoot that stocks the content engine for months, rather than a monthly production cycle.' },
    ],
    seoTitle: 'Content Production, Photography & Brand Films | Nebulaa',
    seoDescription:
      'Product photography, brand films, facility stories and short-form video produced in-house, feeding a content engine that runs on them for months.',
  },
  {
    slug: 'strategy',
    name: 'Marketing strategy',
    summary: 'Positioning, pillars and channel planning before anything gets made.',
    eyebrow: 'Service · strategy',
    headline: 'Deciding what to say',
    headlineEmphasis: 'before saying it everywhere.',
    subheadline:
      'Most marketing problems presented as execution problems are actually positioning problems. Before content gets planned, we work out what the brand stands for, who it is for, and which channels are worth the money.',
    howItWorks: [
      { title: 'Understand the business', body: 'How you actually sell today, who buys, what the objection is, and where growth is expected to come from.' },
      { title: 'Set the positioning', body: 'What you stand for, said in a way a customer would recognise rather than an internal statement.' },
      { title: 'Plan the channels', body: 'Content pillars, campaign themes, audiences and channel priorities — with the ones not worth running named as such.' },
    ],
    whatWeRun: [
      'Positioning and messaging',
      'Audience definition and content pillars',
      'Channel planning, including channels to skip',
      'Campaign themes mapped to the commercial calendar',
      'Visual direction and communication assets',
    ],
    faqs: [
      { q: 'Is this a separate paid engagement?', a: 'It is the first phase of a managed engagement rather than a standalone deliverable, because a strategy nobody executes is not worth much.' },
      { q: 'How is this different from what Gravity does automatically?', a: 'Gravity builds a working strategy from your website in about a minute, and for a lot of businesses that is genuinely enough. This is for when the positioning itself is the open question.' },
      { q: 'How long does it take?', a: 'Typically the first few weeks of an engagement, running in parallel with early content rather than blocking it.' },
    ],
    seoTitle: 'Marketing Strategy & Positioning for Indian Brands | Nebulaa',
    seoDescription:
      'Positioning, audience definition, content pillars and channel planning — including which channels are not worth your money.',
  },
  {
    slug: 'reporting',
    name: 'Reporting',
    summary: 'What worked, what did not, why, and what changes next month.',
    eyebrow: 'Service · reporting',
    headline: 'Four questions,',
    headlineEmphasis: 'answered every month.',
    subheadline:
      'Most agency reporting is a screenshot of a dashboard with the good numbers circled. Every month we answer the same four questions in plain language: what worked, what did not, why, and what changes next cycle.',
    howItWorks: [
      { title: 'Everything is tracked on its own terms', body: 'Organic reach and engagement, paid CTR, CPC and conversions, creator cost efficiency, and BTL participation. Different work, different measures.' },
      { title: 'It gets written up, not exported', body: 'A monthly report in plain language, not a PDF of charts you have to interpret.' },
      { title: 'It changes the next cycle', body: 'The findings alter the next month\'s plan, and the report says explicitly what is changing and why.' },
    ],
    whatWeRun: [
      'Organic performance — reach, engagement, follower movement',
      'Paid performance — CTR, CPC, CPM and conversions',
      'Creator performance and cost efficiency',
      'BTL participation and dealer engagement',
      'A monthly review call, in plain language',
    ],
    faqs: [
      { q: 'How often do we meet?', a: 'Monthly as standard, with the report circulated before the call so it is a discussion rather than a presentation.' },
      { q: 'What if a month goes badly?', a: 'The report says so and says why. A report that never contains bad news is not a report.' },
      { q: 'Can I see the raw data?', a: 'Yes. The accounts are in your name and you have access to everything underneath the report.' },
    ],
    seoTitle: 'Monthly Marketing Reporting & Review | Nebulaa',
    seoDescription:
      'Every month: what worked, what did not, why, and what changes next cycle — across organic, paid, creator and on-ground activity.',
  },
]

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find(s => s.slug === slug)
}
