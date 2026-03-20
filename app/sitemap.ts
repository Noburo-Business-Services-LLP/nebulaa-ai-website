import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blogData'
import { tools } from '@/lib/toolsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nebulaa.ai'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolRoutes: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const compareCompetitors = [
    'buffer', 'jasper-ai', 'clay', 'hootsuite', 'sprout-social',
    'instantly-ai', 'apollo-io', 'outreach-io', 'lemlist', 'hubspot',
  ]

  const compareRoutes: MetadataRoute.Sitemap = compareCompetitors.map(comp => ({
    url: `${base}/compare/nebulaa-vs-${comp}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const industries = [
    'saas-founders', 'real-estate', 'd2c-brands', 'coaching-consulting',
    'digital-agencies', 'edtech', 'fintech', 'healthcare-clinics',
  ]

  const industryRoutes: MetadataRoute.Sitemap = industries.map(ind => ({
    url: `${base}/for/${ind}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...toolRoutes, ...compareRoutes, ...industryRoutes]
}
