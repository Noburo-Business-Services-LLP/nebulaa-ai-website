import { notFound } from 'next/navigation'
import Image from 'next/image'
import { blogPosts, type BlogPost } from '@/lib/blogData'
import { getPublishedPost, toMeta } from '@/lib/blogStore'
import { getRepoPost, getRepoContent, stripFrontmatter } from '@/lib/blogRepo'
import { mediaUrl } from '@/lib/mediaUrl'
import { renderInlineMarkdown } from '@/lib/renderInlineMarkdown'
import BlogEmailCapture from '@/components/ui/BlogEmailCapture'
import HudCard from '@/components/ui/HudCard'

interface Props { params: { slug: string } }

/**
 * Only the repo's posts are prerendered. A slug published through the admin
 * page is not known at build time, so it falls through to an on-demand render
 * that reads the post from S3 — which is why dynamicParams stays on.
 */
export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export const dynamicParams = true
export const revalidate = 300

export default async function BlogPost({ params }: Props) {
  // S3 is checked first: it's the override layer for any slug, so an edit
  // made through /admin/blog to a repo post is what renders here, not the
  // frozen-at-last-deploy .mdx file. See lib/blogStore.ts.
  let post: BlogPost | undefined
  let raw: string | null = null

  const stored = await getPublishedPost(params.slug)
  if (stored) {
    post = toMeta(stored)
    raw = stored.content
  } else {
    post = getRepoPost(params.slug)
    raw = post ? getRepoContent(params.slug) : null
  }

  if (!post || !raw) notFound()

  const body = stripFrontmatter(raw)

  return (
    <>
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            {post.heroImage ? (
              <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden mb-7">
                <Image src={mediaUrl(post.heroImage)} alt={post.title} fill priority className="object-cover" />
              </div>
            ) : (
              <div className={`h-1.5 w-16 bg-gradient-to-r ${post.headerColor} rounded-full mb-6`} />
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-block font-body text-xs font-semibold bg-gold text-[#1A1208] px-3 py-1 rounded-full hover:brightness-110 transition"
                >
                  #{tag}
                </a>
              ))}
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-ink leading-tight mb-4 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 font-mono text-[12.5px] text-faint">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Body */}
          <div className="prose-nebulaa">
            {body.split('\n').map((line, i) => {
              if (line.startsWith('# '))
                return <h1 key={i} className="font-heading text-3xl font-bold text-ink mt-10 mb-4 tracking-tight">{renderInlineMarkdown(line.slice(2))}</h1>
              if (line.startsWith('## '))
                return <h2 key={i} className="font-heading text-2xl font-bold text-ink mt-8 mb-3 tracking-tight">{renderInlineMarkdown(line.slice(3))}</h2>
              if (line.startsWith('### '))
                return <h3 key={i} className="font-heading text-xl font-semibold text-ink-2 mt-6 mb-2">{renderInlineMarkdown(line.slice(4))}</h3>
              // A line that is bold/italic in its entirety reads as a standalone
              // callout rather than a sentence with an emphasized word — kept
              // distinct from the general paragraph case below, which now
              // handles **bold**/*italic* mixed into running text instead of
              // leaving the literal asterisks in, e.g. inside a bullet.
              if (line.startsWith('**') && line.endsWith('**') && line.length > 4)
                return <p key={i} className="font-body text-base font-bold text-ink my-2">{renderInlineMarkdown(line.slice(2, -2))}</p>
              if (line.startsWith('*') && line.endsWith('*') && line.length > 2)
                return <p key={i} className="font-body text-sm text-muted italic my-2">{renderInlineMarkdown(line.slice(1, -1))}</p>
              if (line.startsWith('> '))
                return (
                  <blockquote key={i} className="border-l-4 border-gold pl-4 my-4">
                    <p className="font-body text-base text-ink-2 italic">{renderInlineMarkdown(line.slice(2))}</p>
                  </blockquote>
                )
              if (line.startsWith('- ') || line.startsWith('• '))
                return (
                  <div key={i} className="flex items-start gap-2 my-1.5">
                    <span className="text-gold-text mt-1 flex-shrink-0">•</span>
                    <p className="font-body text-base text-ink-2 leading-relaxed">{renderInlineMarkdown(line.slice(2))}</p>
                  </div>
                )
              if (line.startsWith('---'))
                return <hr key={i} className="border-rule my-8" />
              if (line.match(/^\|.+\|$/))
                return null
              if (line.trim() === '')
                return <div key={i} className="my-3" />
              return (
                <p key={i} className="font-body text-base text-ink-2 leading-relaxed my-3">{renderInlineMarkdown(line)}</p>
              )
            })}
          </div>

          {/* Email capture */}
          <BlogEmailCapture />

          {/* End CTA */}
          <HudCard halo="amber" className="mt-8 p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-ink mb-2">Ready to automate your GTM?</h3>
            <p className="font-body text-sm text-muted mb-4">100 free credits. No card required. Setup in 24 hours.</p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 bg-gold text-[#1A1208] font-body font-semibold rounded-full px-6 py-3 hover:brightness-105 transition-all hover:scale-[1.03]"
            >
              Start your free trial →
            </a>
          </HudCard>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <a href="/blog" className="font-body text-sm text-faint hover:text-gold-text transition-colors">
              ← Back to all posts
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
