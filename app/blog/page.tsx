import { blogPosts } from '@/lib/blogData'
import { listPublishedPosts, toMeta } from '@/lib/blogStore'
import BlogList from '@/components/sections/BlogList'

// Posts published through the admin page live in S3, not in the bundle, so the
// index has to be rebuilt periodically rather than frozen at deploy time.
export const revalidate = 300

export default async function BlogPage() {
  const published = await listPublishedPosts()
  const repoSlugs = new Set(blogPosts.map(p => p.slug))

  // Repo posts win on a slug clash — they are the ones with a static page.
  const extra = published.filter(p => !repoSlugs.has(p.slug)).map(toMeta)

  return <BlogList posts={[...extra, ...blogPosts]} />
}
