export interface ServiceClient {
  name: string
  stage: 'active' | 'proposal'
}

export interface IllustrativeExample {
  industryLabel: string
  copy: string | null // null = placeholder, waiting on real copy
}

export interface ServiceTierData {
  slug: 'enterprise' | 'msme'
  name: string
  eyebrow: string
  headline: string
  subheadline: string
  seoTitle: string
  seoDescription: string
  whoFor: string
  whatYouGet: string[]
  clients: ServiceClient[]
  illustrativeExamples: IllustrativeExample[]
  ctaLabel: string
}

export const serviceTiers: Record<string, ServiceTierData> = {
  enterprise: {
    slug: 'enterprise',
    name: 'Enterprise',
    eyebrow: 'Managed Marketing',
    headline: 'A marketing team, fully managed, backed by AI.',
    subheadline: 'For established brands entering new markets or scaling regional presence. Strategy, content, distribution, and sales enablement — Nebulaa\'s team owns execution end to end.',
    seoTitle: 'Enterprise Managed Marketing — Nebulaa',
    seoDescription: 'End-to-end managed marketing for established brands entering new markets — strategy, content, distribution, and sales enablement, delivered by Nebulaa\'s team.',
    whoFor: 'Established brands entering new markets or scaling regional presence.',
    whatYouGet: [
      'Dedicated account team, one point of contact',
      'Strategy, content, and distribution — planned and executed for you',
      'Sales enablement material built alongside your team',
      'AI-accelerated production — Gravity and Pulsar run underneath, you never touch the software',
    ],
    clients: [
      { name: 'Bosch', stage: 'proposal' },
      { name: 'Gandhimathi Jewellers', stage: 'active' },
      { name: 'JKR Tex', stage: 'active' },
      { name: 'TNV Chits', stage: 'active' },
    ],
    illustrativeExamples: [
      { industryLabel: 'a jewellery retail brand', copy: null },
      { industryLabel: 'a regional appliance retailer', copy: null },
      { industryLabel: 'a textile manufacturer', copy: null },
    ],
    ctaLabel: 'Talk to us about managed marketing',
  },
  msme: {
    slug: 'msme',
    name: 'MSME',
    eyebrow: 'AI-Native Services',
    headline: 'Your outsourced marketing team, powered by AI.',
    subheadline: 'For small and mid-size businesses who need marketing done, not a tool to learn. Nebulaa\'s team delivers it, using Gravity and Pulsar internally as force-multipliers — you never touch the software.',
    seoTitle: 'AI-Native Marketing Services for MSMEs — Nebulaa',
    seoDescription: 'Done-for-you digital marketing for small and mid-size businesses, delivered by Nebulaa\'s team and accelerated by AI — scoped to MSME budgets.',
    whoFor: 'Small and mid-size businesses who want marketing handled, not another tool to learn.',
    whatYouGet: [
      'A human team running your marketing day to day',
      'Content, posting, and lead follow-up handled for you',
      'Scoped to MSME budgets — priced like an agency, faster because of AI',
      'No dashboards to learn, no software to manage',
    ],
    clients: [
      { name: 'Rajaram\'s', stage: 'proposal' },
      { name: 'Nellai Kuttam Snacks', stage: 'proposal' },
    ],
    illustrativeExamples: [
      { industryLabel: 'an FMCG brand entering a new city', copy: null },
      { industryLabel: 'a local retail chain', copy: null },
    ],
    ctaLabel: 'Talk to us about your marketing',
  },
}
