/**
 * Tags, not categories.
 *
 * The previous version of this file locked every post into exactly one of
 * four invented buckets (Pillar/Cluster/Case Study/Comparison) — a
 * classification scheme picked from a framework someone mentioned, applied
 * without checking it against what the actual posts are. A post can
 * genuinely be both a founder mistake AND a case study; forcing one label
 * throws that away, and there was no way to verify the framework was even
 * the right one.
 *
 * Tags fix both problems: a post can carry as many as are actually true,
 * and each one is a plain, checkable claim about the content rather than a
 * position in someone's content-marketing model. This list is a starting
 * vocabulary for the admin UI's suggestions, not an enum — the tag field
 * accepts anything, including new tags that aren't listed here yet.
 */
export const SUGGESTED_TAGS = [
  'Founder Mistakes',
  'Founder Playbook',
  'Case Study',
  'GTM Experiments',
  'Product Comparisons',
  'Product Features',
  'Market Insight',
  'Outreach',
  'Content Strategy',
  'LinkedIn',
  'WhatsApp',
] as const
