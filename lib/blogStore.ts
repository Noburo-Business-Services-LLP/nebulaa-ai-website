import { readJson, writeJson, listKeys } from '@/lib/s3Store'
import type { BlogPost } from '@/lib/blogData'

/**
 * Posts written through the admin page.
 *
 * The old publish route wrote an .mdx file and then edited `lib/blogData.ts` —
 * application source — in place, which is why its own success message told you
 * to redeploy afterwards. It was a local authoring tool wearing a CMS costume,
 * and on Lambda it cannot work at all: the bundle is read-only, and even if it
 * were not, a running container editing its own source is not a publish.
 *
 * Posts now live as data. The repo's `blogPosts` array stays exactly as it is
 * and keeps generating static pages at build time; anything published since
 * the last deploy is read from S3 and rendered on demand.
 *
 * S3 is the override layer for ANY slug, including ones that also exist in
 * the repo: editing a repo post through /admin/blog saves the edited version
 * here, and the render path checks S3 first. That is an unambiguous rule —
 * "S3 present means it's the current version" — so there is never a question
 * of which of two copies is live, only whether an edit has happened since
 * the last deploy.
 */
export interface StoredPost extends BlogPost {
  content: string
  publishedAt: string
}

const KEY_PREFIX = 'blog'
const postKey = (slug: string) => `${KEY_PREFIX}/${slug}.json`

/**
 * Posts saved before the category → tags migration have `category: string`
 * and no `tags` field at all — the type says `tags: string[]` but the JSON
 * on disk doesn't know that. Reading one as-is hands the rest of the app a
 * post whose `.tags` is `undefined`, which crashes the first `.map`/
 * `.includes` call. Normalized on read so a post saved under the old shape
 * keeps working instead of needing a manual data fix.
 */
function migrateLegacyPost(post: StoredPost & { category?: string }): StoredPost {
  if (Array.isArray(post.tags)) return post
  const { category, ...rest } = post
  return { ...rest, tags: category ? [category] : [] }
}

/** Strip the stored-only fields (content, publishedAt), leaving the shape the blog components expect. */
export function toMeta(post: StoredPost): BlogPost {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- discarded on purpose
  const { content, publishedAt, ...meta } = post
  return meta
}

export async function getPublishedPost(slug: string): Promise<StoredPost | null> {
  const post = await readJson<StoredPost | null>(postKey(slug), null)
  return post ? migrateLegacyPost(post) : null
}

export async function savePublishedPost(post: StoredPost): Promise<boolean> {
  return writeJson(postKey(post.slug), post)
}

/** Metadata for every S3-published post, newest first. */
export async function listPublishedPosts(): Promise<StoredPost[]> {
  const keys = await listKeys(`${KEY_PREFIX}/`)
  const posts = await Promise.all(
    keys
      .filter(k => k.endsWith('.json'))
      .map(k => readJson<StoredPost | null>(k, null)),
  )

  return posts
    .filter((p): p is StoredPost => p !== null)
    .map(migrateLegacyPost)
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
}
