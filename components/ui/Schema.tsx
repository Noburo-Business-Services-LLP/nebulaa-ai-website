/**
 * Emits JSON-LD. Server component — schema should be in the initial HTML so a
 * crawler sees it without executing anything.
 */
export default function Schema({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Breadcrumbs, so search results show the silo rather than a bare URL. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.nebulaa.ai${item.path}`,
    })),
  }
}

export function softwareApplicationSchema(opts: {
  name: string
  description: string
  price?: number
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: opts.name,
    description: opts.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `https://www.nebulaa.ai${opts.url}`,
    ...(opts.price
      ? {
          offers: {
            '@type': 'Offer',
            price: String(opts.price),
            priceCurrency: 'INR',
          },
        }
      : {}),
  }
}

export function serviceSchema(opts: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: 'Marketing service',
    url: `https://www.nebulaa.ai${opts.url}`,
    provider: { '@type': 'Organization', name: 'Nebulaa', url: 'https://www.nebulaa.ai' },
    areaServed: { '@type': 'Country', name: 'India' },
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function articleSchema(opts: {
  headline: string
  description: string
  datePublished: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    url: `https://www.nebulaa.ai${opts.url}`,
    author: { '@type': 'Organization', name: 'Nebulaa' },
    publisher: { '@type': 'Organization', name: 'Nebulaa', url: 'https://www.nebulaa.ai' },
  }
}
