export interface IndustryData {
  slug: string
  name: string
  headline: string
  subheadline: string
  seoTitle: string
  seoDescription: string
  painPoints: string[]
  useCases: { title: string; desc: string; agent: 'Gravity' | 'Pulsar' | 'Both' }[]
  stat: string
  statLabel: string
}

export const industries: Record<string, IndustryData> = {
  'saas-founders': {
    slug: 'saas-founders',
    name: 'SaaS Founders',
    headline: 'Nebulaa for SaaS Founders',
    subheadline: 'Build your audience while your product does the building. Gravity posts daily. Pulsar qualifies every trial signup.',
    seoTitle: 'AI Agents for SaaS Founders — Automated GTM by Nebulaa',
    seoDescription: 'Nebulaa helps SaaS founders automate LinkedIn content, qualify inbound leads, and run outreach sequences — without hiring a GTM team.',
    painPoints: ['No time to post consistently', 'Trial signups not converting to demos', 'Following up with every lead manually', 'Competitors always more visible on LinkedIn'],
    useCases: [
      { title: 'Daily LinkedIn thought leadership', desc: 'Gravity writes and posts founder-perspective content every day, positioning you as the go-to voice in your category.', agent: 'Gravity' },
      { title: 'Trial signup qualification', desc: 'Pulsar calls every trial signup within 15 minutes, qualifies their need, and books demos with the right ones.', agent: 'Pulsar' },
      { title: 'Competitor monitoring', desc: 'Gravity tracks what your top competitors are posting and ensures your content responds to market moves.', agent: 'Gravity' },
      { title: 'Churned customer re-engagement', desc: 'Pulsar runs automated re-engagement sequences for churned users, identifying win-back opportunities.', agent: 'Pulsar' },
    ],
    stat: '40+',
    statLabel: 'SaaS founders using Nebulaa',
  },
  'real-estate': {
    slug: 'real-estate',
    name: 'Real Estate',
    headline: 'Nebulaa for Real Estate Professionals',
    subheadline: 'New property listings go live. Pulsar calls every inquiry. Gravity posts updates that keep buyers coming back.',
    seoTitle: 'AI Agents for Real Estate — Automated Lead Follow-up by Nebulaa',
    seoDescription: 'Nebulaa helps real estate agents and developers automate lead follow-up calls, property listing posts, and buyer nurture sequences.',
    painPoints: ['Missing leads because follow-up is too slow', 'Not posting new listings consistently', 'Leads going cold before you call them', 'Spending too much time on unqualified enquiries'],
    useCases: [
      { title: 'Property listing posts', desc: 'Gravity automatically posts new listings across Instagram, Facebook, and LinkedIn with formatted descriptions and hashtags.', agent: 'Gravity' },
      { title: 'Instant inquiry follow-up', desc: 'Pulsar calls every inquiry within 2 minutes, qualifies budget and timeline, and books site visits only for serious buyers.', agent: 'Pulsar' },
      { title: 'Buyer nurture sequences', desc: 'Pulsar runs 7-day WhatsApp sequences for buyers who expressed interest but haven\'t committed yet.', agent: 'Pulsar' },
      { title: 'Market update content', desc: 'Gravity posts weekly market insights, price trends, and neighborhood guides to keep your audience engaged.', agent: 'Gravity' },
    ],
    stat: '₹2Cr+',
    statLabel: 'in deals influenced by Nebulaa follow-ups',
  },
  'd2c-brands': {
    slug: 'd2c-brands',
    name: 'D2C Brands',
    headline: 'Nebulaa for D2C Brands',
    subheadline: 'Your brand stays top of mind across every social channel while Pulsar turns abandoned cart visitors into paying customers.',
    seoTitle: 'AI Agents for D2C Brands — Social Content + Customer Follow-up by Nebulaa',
    seoDescription: 'Nebulaa helps D2C brands automate Instagram and LinkedIn content, recover abandoned carts, and follow up with wholesale inquiries.',
    painPoints: ['Inconsistent Instagram posting hurting reach', 'Abandoned cart follow-ups never happening', 'Wholesale inquiries taking too long to respond to', 'No time to create content daily'],
    useCases: [
      { title: 'Daily Instagram content', desc: 'Gravity creates product-focused posts, styling content, and behind-the-scenes stories daily, in your brand\'s visual language.', agent: 'Gravity' },
      { title: 'Abandoned cart recovery', desc: 'Pulsar sends personalized WhatsApp messages to cart abandoners within 30 minutes, recovering 15-20% of lost orders.', agent: 'Pulsar' },
      { title: 'Wholesale lead qualification', desc: 'Pulsar calls wholesale inquiries within the hour, qualifies order size and fit, and routes serious buyers to your team.', agent: 'Pulsar' },
      { title: 'Festival campaign content', desc: 'Gravity pre-plans and schedules content for Diwali, Holi, IPL season, and other cultural moments months in advance.', agent: 'Gravity' },
    ],
    stat: '23%',
    statLabel: 'average cart recovery rate with Pulsar',
  },
  'coaching-consulting': {
    slug: 'coaching-consulting',
    name: 'Coaches & Consultants',
    headline: 'Nebulaa for Coaches & Consultants',
    subheadline: 'Your expertise gets seen every day. Every discovery call request gets followed up. You focus on the actual coaching.',
    seoTitle: 'AI Agents for Coaches and Consultants — Lead Generation by Nebulaa',
    seoDescription: 'Nebulaa helps coaches and consultants build their LinkedIn audience, qualify discovery call requests, and follow up with every lead automatically.',
    painPoints: ['Forgetting to post consistently on LinkedIn', 'Discovery call requests going unanswered for days', 'Spending too much time on unfit clients', 'No system for lead nurturing'],
    useCases: [
      { title: 'Thought leadership content', desc: 'Gravity posts daily frameworks, client stories (anonymised), and expertise-positioning content to your LinkedIn and Instagram.', agent: 'Gravity' },
      { title: 'Discovery call qualification', desc: 'Pulsar calls every discovery call request within minutes, screens for budget and fit, and books only qualified calls in your calendar.', agent: 'Pulsar' },
      { title: 'Lead nurture sequences', desc: 'Pulsar runs 5-touch WhatsApp sequences for people who downloaded your freebie or attended your webinar.', agent: 'Pulsar' },
      { title: 'Testimonial amplification', desc: 'Gravity turns client testimonials and case study snippets into regular social proof posts across all platforms.', agent: 'Gravity' },
    ],
    stat: '3.2x',
    statLabel: 'more discovery calls booked monthly',
  },
  'digital-agencies': {
    slug: 'digital-agencies',
    name: 'Digital Agencies',
    headline: 'Nebulaa for Digital Agencies',
    subheadline: 'Run Nebulaa for your own agency and offer it as a service to every client. Two revenue streams, one platform.',
    seoTitle: 'AI Agents for Digital Marketing Agencies — White-label by Nebulaa',
    seoDescription: 'Nebulaa helps digital agencies automate client content, run outbound prospecting, and offer AI-powered GTM as a new service line.',
    painPoints: ['Content creation for multiple clients is time-consuming', 'No scalable outbound prospecting process', 'Difficulty differentiating from other agencies', 'Client onboarding takes too long'],
    useCases: [
      { title: 'Client content automation', desc: 'Run Gravity for each client — it learns their brand voice and posts daily without your team writing every piece of content.', agent: 'Gravity' },
      { title: 'New business development', desc: 'Pulsar runs outbound calling campaigns targeting decision-makers at companies in your ICP, booking sales calls for your team.', agent: 'Pulsar' },
      { title: 'Competitor gap analysis', desc: 'Gravity tracks what your clients\' competitors are posting and surfaces opportunities for content differentiation.', agent: 'Gravity' },
      { title: 'Lead qualification for clients', desc: 'Offer Pulsar as a lead follow-up service — every inbound lead from your client\'s campaigns gets called and qualified.', agent: 'Pulsar' },
    ],
    stat: '₹15L+',
    statLabel: 'in new client revenue unlocked by offering AI agents',
  },
}

export function getIndustryData(slug: string): IndustryData | null {
  return industries[slug] || null
}
