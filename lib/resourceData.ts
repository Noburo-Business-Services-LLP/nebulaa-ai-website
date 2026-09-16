/**
 * Gated downloads.
 *
 * One email form unlocks the whole set rather than gating each separately —
 * asking six times for the same address is how you get one submission and five
 * bounces.
 *
 * Every one of these is drawn from work we actually do. The festival calendar
 * comes from how we plan seasonal content; the market-entry playbook is the
 * four-month model generalised; the BTL checklist is what running an
 * activation actually involves. Nothing here is a repackaged blog post.
 */

export interface Resource {
  slug: string
  title: string
  /** Shown under the title on the card. */
  subtitle: string
  /** What it is, in a sentence or two. */
  description: string
  /** The concrete reason to download it. */
  useItTo: string
  format: string
  /** File in public/downloads/, or null while it is still being prepared. */
  file: string | null
  pages?: string
  /** Marks the ones nobody else in this category publishes. */
  flagship?: boolean
  seoTitle: string
  seoDescription: string
}

export const resources: Resource[] = [
  {
    slug: 'festival-calendar',
    title: 'Indian Festival Marketing Calendar',
    subtitle: 'Every major festival, with the lead time each one needs.',
    description:
      'The festivals that move sales in India, mapped by month with the planning window each requires. Diwali content started in the last week of October has already missed. This is the calendar we plan client content against.',
    useItTo: 'Plan festival campaigns weeks ahead instead of the night before.',
    format: 'CSV + PDF',
    file: 'nebulaa-festival-marketing-calendar.csv',
    pages: '14 festivals, 5 sectors',
    flagship: true,
    seoTitle: 'Free Indian Festival Marketing Calendar 2026–27 | Nebulaa',
    seoDescription:
      'Every major Indian festival mapped with the lead time it needs, the sectors it matters most for, and what to plan. Free download.',
  },
  {
    slug: 'market-entry-playbook',
    title: 'New Market Entry Playbook',
    subtitle: 'The four-month model for launching in a new city.',
    description:
      'How to build demand in a market before your product is on the shelf — what to run each month, in what order, and what to have ready by launch week. The model we use on live market-entry engagements, written so you can run it yourself.',
    useItTo: 'Stop launching into a market that has never heard of you.',
    format: 'PDF',
    file: 'nebulaa-market-entry-playbook.md',
    pages: '4 phases, week by week',
    flagship: true,
    seoTitle: 'Free New Market Entry Playbook for Consumer Brands | Nebulaa',
    seoDescription:
      'A four-month model for entering a new city — demand generation, creators, quick commerce and sampling, sequenced to a launch date.',
  },
  {
    slug: 'btl-activation-checklist',
    title: 'BTL Activation Checklist',
    subtitle: 'What actually has to happen before a sampling day.',
    description:
      'Permissions, staffing, stock, materials, measurement — the operational checklist for running an on-ground activation. Written from running them, which is why it includes the things that go wrong rather than only the things that should happen.',
    useItTo: 'Run an activation without discovering a gap on the morning.',
    format: 'PDF',
    file: 'nebulaa-btl-activation-checklist.md',
    pages: '6 stages, pre to post',
    flagship: true,
    seoTitle: 'Free BTL Activation & Sampling Checklist | Nebulaa',
    seoDescription:
      'The operational checklist for running an on-ground sampling or retail activation in India — permissions, staffing, stock, materials and measurement.',
  },
  {
    slug: 'whatsapp-reply-templates',
    title: 'WhatsApp Reply Templates',
    subtitle: 'The replies that qualify without sounding like a bot.',
    description:
      'Opening replies, qualifying questions, follow-ups and polite closes — written for Indian business conversation rather than translated from American sales scripts. Grouped by the situations that actually recur.',
    useItTo: 'Answer enquiries fast without every reply sounding automated.',
    format: 'PDF',
    file: null,
    pages: 'In preparation',
    seoTitle: 'Free WhatsApp Business Reply Templates for Indian Businesses',
    seoDescription:
      'Opening replies, qualifying questions and follow-ups for WhatsApp business enquiries, written for how Indian customers actually message.',
  },
  {
    slug: 'content-calendar-template',
    title: 'Monthly Content Calendar Template',
    subtitle: 'A month laid out, with the format already decided.',
    description:
      'A working calendar with columns for date, platform, format, pillar, hook and status — pre-filled with a sample month so you are not starting from an empty grid. The structure Gravity plans against.',
    useItTo: 'Stop deciding what to post on the morning you post it.',
    format: 'CSV',
    file: 'nebulaa-content-calendar-template.csv',
    pages: 'One month, pre-filled',
    seoTitle: 'Free Monthly Social Media Content Calendar Template | Nebulaa',
    seoDescription:
      'A working content calendar with date, platform, format, pillar, hook and status columns, pre-filled with a sample month.',
  },
  {
    slug: 'monthly-report-template',
    title: 'Monthly Marketing Report Template',
    subtitle: 'Four questions, answered in one page.',
    description:
      'What worked, what did not, why, and what changes next month — with the metrics that belong under each. The reporting format we use with clients, which is deliberately one page rather than forty charts.',
    useItTo: 'Report to yourself, your board or your client without a dashboard export.',
    format: 'PDF',
    file: null,
    pages: 'In preparation',
    seoTitle: 'Free Monthly Marketing Report Template | Nebulaa',
    seoDescription:
      'A one-page monthly marketing report structured around what worked, what did not, why, and what changes next cycle.',
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug)
}
