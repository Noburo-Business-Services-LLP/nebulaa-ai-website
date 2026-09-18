/**
 * The site's SEO content architecture, not a content-type label:
 *  - Pillar     — broad market/problem education. No product pitch — this is
 *                 what earns topical authority for the terms buyers search
 *                 before they know a solution like Nebulaa exists.
 *  - Cluster    — how a specific Nebulaa engine solves a specific problem.
 *                 Links back to a Pillar post; targets solution-aware search.
 *  - Case Study — a real run with real numbers. Bottom-funnel proof.
 *  - Comparison — "Nebulaa vs X" pages. Branded/comparison search intent,
 *                 kept distinct from Cluster because the intent differs.
 *
 * One list, imported by the publish route, the admin editor and the public
 * blog index filter, so there is exactly one place this can drift from.
 */
export const BLOG_CATEGORIES = ['Pillar', 'Cluster', 'Case Study', 'Comparison'] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
