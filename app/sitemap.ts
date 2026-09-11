import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blogData'
import { tools } from '@/lib/toolsData'
import { compareData } from '@/lib/compareData'
import { industries } from '@/lib/industryData'
import { capabilities, agents } from '@/lib/productData'
import { channels } from '@/lib/channelData'
import { servicePages } from '@/lib/servicePageData'
import { engagements } from '@/lib/engagementData'
import { resources } from '@/lib/resourceData'

/**
 * Everything here is derived from the data that generates the pages, never
 * from a hand-kept list. The previous version had drifted badly — it was
 * advertising a dozen URLs that 404ed (five competitors that were never
 * written, eight industries that had since been replaced) while omitting
 * around sixty real pages. Submitting dead URLs costs crawl trust, so the
 * lists are gone.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nebulaa.ai'
  const now = new Date()

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority })

  return [
    // Core
    entry('', 1, 'weekly'),
    entry('/pricing', 0.95, 'monthly'),
    entry('/services', 0.9, 'weekly'),
    entry('/product', 0.9, 'weekly'),
    entry('/channels', 0.85, 'weekly'),
    entry('/work', 0.85, 'monthly'),
    entry('/for', 0.85, 'monthly'),
    entry('/compare', 0.8, 'monthly'),
    entry('/tools', 0.85, 'weekly'),
    entry('/blog', 0.85, 'daily'),
    entry('/resources', 0.85, 'monthly'),
    entry('/facts', 0.6, 'monthly'),

    // Product — agent hubs and every capability
    ...Object.keys(agents).map(id => entry(`/product/${id}`, 0.85, 'weekly')),
    ...capabilities.map(c => entry(`/product/${c.agent}/${c.slug}`, 0.75)),

    // Channels — search entry points
    ...channels.map(c => entry(`/channels/${c.slug}`, 0.8)),

    // Services and engagements
    ...servicePages.map(s => entry(`/services/${s.slug}`, 0.8)),
    ...engagements.map(e => entry(`/work/${e.slug}`, 0.75)),

    // Industries
    ...Object.keys(industries).map(slug => entry(`/for/${slug}`, 0.75)),

    // Comparisons — only the ones that actually exist
    ...Object.keys(compareData).map(slug => entry(`/compare/nebulaa-vs-${slug}`, 0.75)),

    // Free tools — the search engine of the site
    ...tools.map(t => entry(`/tools/${t.slug}`, 0.7)),

    // Journal
    ...blogPosts.map(p => entry(`/blog/${p.slug}`, 0.65)),

    // Gated downloads
    ...resources.map(r => entry(`/resources/${r.slug}`, 0.7)),

    // Legal
    entry('/privacy-policy', 0.3, 'yearly'),
    entry('/terms', 0.3, 'yearly'),
  ]
}
