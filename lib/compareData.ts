export interface CompareData {
  slug: string
  competitor: string
  headline: string
  subheadline: string
  seoTitle: string
  seoDescription: string
  competitorDescription: string
  nebulaaStrengths: string[]
  competitorStrengths: string[]
  tableRows: { feature: string; nebulaa: string; competitor: string }[]
  verdict: string
  bestFor: { nebulaa: string; competitor: string }
}

export const compareData: Record<string, CompareData> = {
  'buffer': {
    slug: 'buffer',
    competitor: 'Buffer',
    headline: 'Nebulaa vs Buffer',
    subheadline: 'Buffer schedules your posts. Nebulaa writes them, posts them, and qualifies the leads they generate.',
    seoTitle: 'Nebulaa vs Buffer: Done-for-You vs Scheduling Only',
    seoDescription: 'Nebulaa and Buffer compared for small business owners. Buffer handles scheduling. Nebulaa handles content creation, scheduling, outreach and lead qualification.',
    competitorDescription: 'Buffer is a leading social media scheduling platform used by 140,000+ businesses. It helps teams schedule and publish posts across multiple social channels.',
    nebulaaStrengths: ['Writes content using your brand voice', 'Tracks competitor activity', 'WhatsApp and email follow-up messages', 'Calls and qualifies leads automatically'],
    competitorStrengths: ['Clean, simple scheduling UI', 'Advanced analytics dashboard', 'Team collaboration features', 'Established platform with strong integrations'],
    tableRows: [
      { feature: 'Content scheduling', nebulaa: '✅', competitor: '✅' },
      { feature: 'AI content generation', nebulaa: '✅ (Gravity)', competitor: '❌' },
      { feature: 'Brand voice learning', nebulaa: '✅', competitor: '❌' },
      { feature: 'Competitor tracking', nebulaa: '✅', competitor: '❌' },
      { feature: 'Lead qualification calls', nebulaa: '✅ (Pulsar)', competitor: '❌' },
      { feature: 'WhatsApp outreach', nebulaa: '✅', competitor: '❌' },
      { feature: 'Multi-platform posting', nebulaa: '✅', competitor: '✅' },
      { feature: 'Team collaboration', nebulaa: '❌', competitor: '✅' },
    ],
    verdict: 'If you already have a content team and just need scheduling, Buffer is excellent. If you have no content team and need posts written and leads followed up, Nebulaa does both automatically.',
    bestFor: {
      nebulaa: 'Business owners who need content written and leads qualified, without a team',
      competitor: 'Marketing teams who already produce content and need a reliable scheduling tool',
    },
  },
  'jasper-ai': {
    slug: 'jasper-ai',
    competitor: 'Jasper AI',
    headline: 'Nebulaa vs Jasper AI',
    subheadline: 'Jasper writes content when you ask. Nebulaa writes it, publishes it, and follows up with every lead it generates.',
    seoTitle: 'Nebulaa vs Jasper AI: Content Tool Comparison',
    seoDescription: 'Jasper AI writes content on demand. Nebulaa creates, schedules and publishes content automatically, then follows up with leads. Full comparison for small business owners.',
    competitorDescription: 'Jasper AI is an AI writing assistant that helps marketing teams create blog posts, social content, emails, and ad copy faster.',
    nebulaaStrengths: ['Content published automatically (no prompting needed)', 'Runs 24/7 without input', 'Built for owner-led businesses', 'Calls leads without human involvement'],
    competitorStrengths: ['World-class AI writing quality', 'Hundreds of templates', 'Brand voice training', 'Excellent for long-form content'],
    tableRows: [
      { feature: 'AI content generation', nebulaa: '✅', competitor: '✅' },
      { feature: 'Auto-publish to social', nebulaa: '✅', competitor: '❌' },
      { feature: 'Runs without daily input', nebulaa: '✅', competitor: '❌' },
      { feature: 'Lead qualification', nebulaa: '✅ (Pulsar)', competitor: '❌' },
      { feature: 'Long-form blog writing', nebulaa: '❌', competitor: '✅' },
      { feature: 'SEO optimization', nebulaa: '❌', competitor: '✅' },
      { feature: 'Outreach sequences', nebulaa: '✅', competitor: '❌' },
      { feature: 'Brand voice learning', nebulaa: '✅', competitor: '✅' },
    ],
    verdict: 'Jasper is a powerful writing tool that you operate yourself. Nebulaa works without daily input from you, so if you want the work done in the background, it is built for that.',
    bestFor: {
      nebulaa: 'Owners who want content published and leads followed up automatically, every day',
      competitor: 'Content teams who want AI assistance for high-quality writing at scale',
    },
  },
  'clay': {
    slug: 'clay',
    competitor: 'Clay',
    headline: 'Nebulaa vs Clay',
    subheadline: 'Clay adds data to your leads and sets up outreach sequences. Nebulaa messages them on WhatsApp, qualifies them in conversation, and hands you only the warm ones.',
    seoTitle: 'Nebulaa vs Clay: Lead Gen Comparison',
    seoDescription: 'Clay adds data to leads and automates outreach. Nebulaa reaches leads over WhatsApp and email, qualifies them in conversation, and books demos.',
    competitorDescription: 'Clay is a data enrichment and GTM platform that lets sales teams build highly personalized outreach sequences using 50+ data sources.',
    nebulaaStrengths: ['WhatsApp outreach built-in', 'No technical setup needed', 'Lead qualification through conversation', 'AI voice calls (sounds human)'],
    competitorStrengths: ['Best-in-class data enrichment', 'Extremely flexible waterfall logic', 'Integrates with 200+ tools', 'Loved by technical GTM teams'],
    tableRows: [
      { feature: 'WhatsApp outreach', nebulaa: '✅', competitor: '❌' },
      { feature: 'Email sequences', nebulaa: '✅', competitor: '✅' },
      { feature: 'Data enrichment', nebulaa: '❌', competitor: '✅' },
      { feature: 'No-code setup', nebulaa: '✅', competitor: '⚠️ Medium' },
      { feature: 'Social media content', nebulaa: '✅ (Gravity)', competitor: '❌' },
      { feature: 'Lead scoring', nebulaa: '✅', competitor: '✅' },
      { feature: 'CRM integrations', nebulaa: '❌', competitor: '✅' },
      { feature: 'AI voice calls', nebulaa: '✅ (Pulsar)', competitor: '❌' },
    ],
    verdict: 'Clay is powerful for technical sales teams who want to enrich data and build complex outreach logic. Nebulaa is built for owners who want leads qualified in conversation without building complex workflows.',
    bestFor: {
      nebulaa: 'Owners who want leads qualified in conversation, hands-free, with WhatsApp first and calls where they fit',
      competitor: 'RevOps and sales teams who need data enrichment and flexible sequencing workflows',
    },
  },
  'hootsuite': {
    slug: 'hootsuite',
    competitor: 'Hootsuite',
    headline: 'Nebulaa vs Hootsuite',
    subheadline: 'Hootsuite manages your social media presence. Nebulaa builds it from scratch, with content, scheduling and lead generation done for you.',
    seoTitle: 'Nebulaa vs Hootsuite: Automation Compared',
    seoDescription: 'Hootsuite manages social media. Nebulaa generates, schedules and publishes your content, and follows up with your leads.',
    competitorDescription: 'Hootsuite is one of the oldest and largest social media management platforms, used by enterprises and agencies to manage multiple accounts and teams.',
    nebulaaStrengths: ['Creates content (no team needed)', 'Runs lead outreach automatically', 'Purpose-built for founders', 'Lower price point for individuals'],
    competitorStrengths: ['Best-in-class team workflows', 'Enterprise-grade security', 'Deep analytics and reporting', 'Agency-friendly with client management'],
    tableRows: [
      { feature: 'Social scheduling', nebulaa: '✅', competitor: '✅' },
      { feature: 'AI content creation', nebulaa: '✅ (Gravity)', competitor: '⚠️ Add-on' },
      { feature: 'Team collaboration', nebulaa: '❌', competitor: '✅' },
      { feature: 'Lead qualification', nebulaa: '✅ (Pulsar)', competitor: '❌' },
      { feature: 'Competitor tracking', nebulaa: '✅', competitor: '✅' },
      { feature: 'WhatsApp outreach', nebulaa: '✅', competitor: '❌' },
      { feature: 'Enterprise features', nebulaa: '❌', competitor: '✅' },
      { feature: 'Price (entry)', nebulaa: '₹999/mo', competitor: '$99/mo' },
    ],
    verdict: 'Hootsuite is ideal for agencies and enterprise teams managing multiple brands. Nebulaa is built for a single owner who needs content and lead generation without a team.',
    bestFor: {
      nebulaa: 'Solo founders and SME owners with no marketing team',
      competitor: 'Agencies and enterprises managing social media for multiple clients',
    },
  },
  'instantly-ai': {
    slug: 'instantly-ai',
    competitor: 'Instantly.ai',
    headline: 'Nebulaa vs Instantly.ai',
    subheadline: 'Instantly sends bulk cold emails. Nebulaa follows up on WhatsApp, SMS and email, and calls when it matters.',
    seoTitle: 'Nebulaa vs Instantly.ai: Outreach Compared',
    seoDescription: 'Instantly.ai sends bulk cold email at scale. Nebulaa follows up across WhatsApp, SMS and email, plus AI voice calls.',
    competitorDescription: 'Instantly.ai is a cold email outreach platform that enables high-volume email campaigns with inbox rotation and deliverability optimization.',
    nebulaaStrengths: ['WhatsApp + SMS included', 'Content creation built-in', 'Qualifies leads in conversation', 'AI voice calls (not just email)'],
    competitorStrengths: ['Unlimited sending volume', 'Best-in-class email deliverability', 'Inbox rotation at scale', 'Excellent for high-volume cold email'],
    tableRows: [
      { feature: 'Cold email', nebulaa: '✅', competitor: '✅' },
      { feature: 'WhatsApp outreach', nebulaa: '✅', competitor: '❌' },
      { feature: 'AI voice calls', nebulaa: '✅ (Pulsar)', competitor: '❌' },
      { feature: 'Unlimited sending volume', nebulaa: '❌', competitor: '✅' },
      { feature: 'Inbox rotation', nebulaa: '❌', competitor: '✅' },
      { feature: 'Lead qualification', nebulaa: '✅', competitor: '⚠️ Basic' },
      { feature: 'Social content creation', nebulaa: '✅ (Gravity)', competitor: '❌' },
      { feature: 'India-specific (WhatsApp)', nebulaa: '✅', competitor: '❌' },
    ],
    verdict: 'Instantly is a specialist email tool for high-volume cold outreach. Nebulaa covers email, WhatsApp and voice calls, which suits the Indian market where WhatsApp is the main business communication channel.',
    bestFor: {
      nebulaa: 'Indian business owners who need outreach on several channels, including WhatsApp and phone calls',
      competitor: 'International B2B sales teams running high-volume cold email campaigns',
    },
  },
}

export function getCompareData(slug: string): CompareData | null {
  return compareData[slug] || null
}
