import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blogData'
import { listPublishedPosts, toMeta } from '@/lib/blogStore'
import BlogList from '@/components/sections/BlogList'

const seoTitle = 'AI Marketing Blog — Experiments, Not Theory'
const seoDescription =
  'The Nebulaa AI marketing blog: real experiments run on real accounts — what we tried, what the numbers said, what changed, and what the system learned.'

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  openGraph: { title: seoTitle, description: seoDescription },
}

// Posts published through the admin page live in S3, not in the bundle, so the
// index has to be rebuilt periodically rather than frozen at deploy time.
export const revalidate = 300

export default async function BlogPage() {
  const published = await listPublishedPosts()
  const overrides = new Map(published.map(p => [p.slug, toMeta(p)]))

  // An S3 entry for a repo slug is an edit made through /admin/blog — its
  // metadata (title, excerpt, tags…) is what should show in the list, same
  // as the post page itself preferring S3 content. See lib/blogStore.ts.
  const merged = blogPosts.map(p => overrides.get(p.slug) ?? p)
  const newSlugs = new Set(blogPosts.map(p => p.slug))
  const brandNew = published.filter(p => !newSlugs.has(p.slug)).map(toMeta)

  return <BlogList posts={[...brandNew, ...merged]} />
}
