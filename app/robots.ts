import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The admin surface has no business in an index.
      disallow: ['/admin', '/admin/'],
    },
    sitemap: 'https://www.nebulaa.ai/sitemap.xml',
  }
}
