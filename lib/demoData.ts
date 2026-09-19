/**
 * The homepage run-through: one business, start to finish.
 *
 * Four sectors, the same seven stages. Deliberately no brand names — these are
 * sector archetypes ("a jewellery showroom in Coimbatore"), not clients, and
 * the section says so on the page. Inventing a brand and dressing it as a case
 * study is the exact thing we have been avoiding.
 */

export interface DemoRun {
  id: string
  tab: string
  /** Sector archetype, shown as the subject of the run. */
  who: string
  url: string
  brandRead: {
    tone: string
    customer: string
    competitors: string
  }
  pillars: string[]
  plan: {
    slots: number
    formats: string
    note: string
  }
  post: {
    platform: string
    day: string
    copy: string
  }
  reply: {
    inbound: string
    outbound: string
    inboundBack: string
    score: number
    handover: string
  }
  report: { label: string; value: string; note: string }[]
}

export const demoRuns: DemoRun[] = [
  {
    id: 'jewellery',
    tab: 'Jewellery',
    who: 'A jewellery showroom in Coimbatore',
    url: 'yourshowroom.com',
    brandRead: {
      tone: 'Warm, unhurried and family-run',
      customer: 'Retail buyers 28–48, wedding and festival purchases, Tamil Nadu',
      competitors: '3 nearby showrooms tracked',
    },
    pillars: ['Craft and making', 'Collections and occasions', 'Trust and heritage', 'Customer stories'],
    plan: {
      slots: 18,
      formats: 'Posts, carousels, 2 reels',
      note: 'Wedding season weighted, Diwali already mapped',
    },
    post: {
      platform: 'Tuesday · Instagram',
      day: 'Tue',
      copy:
        'Most of our customers don’t compare us to other jewellers. They compare us to the shop their mother trusted for thirty years. That’s the bar.',
    },
    reply: {
      inbound: 'Saw your bridal collection post — do you have something in antique gold?',
      outbound: 'We do — the antique bridal range is in-store now. Is this for a wedding, and roughly when?',
      inboundBack: 'Yes, my sister’s. Wedding is in March.',
      score: 86,
      handover: 'Bridal · March timeline · private viewing booked Saturday',
    },
    report: [
      { label: 'Reach', value: '+38%', note: 'vs previous month' },
      { label: 'Enquiries', value: '64', note: 'all answered same day' },
      { label: 'Your time', value: '9 min', note: 'per week, approving' },
    ],
  },
  {
    id: 'textile',
    tab: 'Textile',
    who: 'A textile retailer with six branches',
    url: 'yourtextiles.com',
    brandRead: {
      tone: 'Direct and value-led, proud of range and price',
      customer: 'Families buying for festivals and weddings, across six towns',
      competitors: '4 regional retailers tracked',
    },
    pillars: ['New arrivals', 'Festival and season', 'Range and price', 'Branch and community'],
    plan: {
      slots: 22,
      formats: 'Posts, carousels, 2 reels',
      note: 'Localised per branch, Pongal mapped ahead',
    },
    post: {
      platform: 'Friday · Instagram',
      day: 'Fri',
      copy:
        'New Kanchipuram arrivals landed at the Gandhipuram branch this morning. Forty-two designs, and the ones that go first are always the quiet ones.',
    },
    reply: {
      inbound: 'Is the new silk collection available at the Erode branch?',
      outbound: 'It is — arrived there yesterday. Are you looking for wedding or festival wear?',
      inboundBack: 'Wedding. Need it before the 20th.',
      score: 79,
      handover: 'Wedding · before 20th · Erode branch notified',
    },
    report: [
      { label: 'Reach', value: '+51%', note: 'across six branches' },
      { label: 'Enquiries', value: '140', note: 'routed to the right branch' },
      { label: 'Branches quiet', value: '0', note: 'none went dark in season' },
    ],
  },
  {
    id: 'snacks',
    tab: 'Snacks & FMCG',
    who: 'A snack brand entering Bengaluru',
    url: 'yoursnacks.com',
    brandRead: {
      tone: 'Nostalgic and regional, proud of a long recipe history',
      customer: 'Urban households and expat Tamil families, 25–45',
      competitors: '5 packaged snack brands tracked in market',
    },
    pillars: ['Recipe and origin', 'Everyday use', 'Availability and stockists', 'Festival gifting'],
    plan: {
      slots: 20,
      formats: 'Posts, carousels, 2 reels',
      note: 'Pre-launch build, weighted to the launch window',
    },
    post: {
      platform: 'Wednesday · Instagram',
      day: 'Wed',
      copy:
        'The recipe hasn’t changed since 1954. The packaging has, four times. Ask anyone who grew up on it which one they’d have kept.',
    },
    reply: {
      inbound: 'Where can I buy this in Bengaluru?',
      outbound: 'We’re on Blinkit and Instamart in Indiranagar and Koramangala from this week. Which area are you in?',
      inboundBack: 'Koramangala. Do you do bulk for offices?',
      score: 88,
      handover: 'Koramangala · bulk / corporate enquiry · flagged for follow-up',
    },
    report: [
      { label: 'Pre-launch reach', value: '2 months', note: 'before stock landed' },
      { label: 'Enquiries', value: '210', note: 'incl. 18 stockist leads' },
      { label: 'Quick-commerce', value: '2 platforms', note: 'discovery campaigns live' },
    ],
  },
  {
    id: 'chits',
    tab: 'Financial',
    who: 'A chit fund with four branches',
    url: 'yourchits.com',
    brandRead: {
      tone: 'Plain-spoken and careful, focused on explaining terms clearly',
      customer: 'Small business owners and salaried savers, 30–55',
      competitors: '3 local operators tracked',
    },
    pillars: ['How schemes work', 'Trust and track record', 'Member stories', 'Financial basics'],
    plan: {
      slots: 16,
      formats: 'Posts, carousels, 1 reel',
      note: 'Explainer-weighted, no hype language',
    },
    post: {
      platform: 'Monday · Facebook',
      day: 'Mon',
      copy:
        'A chit is not an investment scheme and we will not describe it as one. It is a way to save with a group and access that money when your turn comes. Here is exactly how the bidding works.',
    },
    reply: {
      inbound: 'What is the minimum monthly amount and how long is the tenure?',
      outbound: 'Schemes start at ₹2,000 a month, with tenures from 20 to 40 months. Are you saving toward something specific?',
      inboundBack: 'Shop renovation, sometime next year.',
      score: 74,
      handover: 'Shop renovation · ~12 month horizon · branch callback scheduled',
    },
    report: [
      { label: 'Reach', value: '+29%', note: 'steady, no spikes' },
      { label: 'Enquiries', value: '58', note: 'answered with accurate terms' },
      { label: 'Escalations', value: '6', note: 'passed to a person, as designed' },
    ],
  },
]

export const demoStages = [
  { key: 'read', label: 'Reads your brand' },
  { key: 'strategy', label: 'Builds a strategy' },
  { key: 'plan', label: 'Plans the month' },
  { key: 'draft', label: 'Drafts the work' },
  { key: 'approve', label: 'You approve' },
  { key: 'reply', label: 'Answers the enquiry' },
  { key: 'report', label: 'Reports back' },
] as const
