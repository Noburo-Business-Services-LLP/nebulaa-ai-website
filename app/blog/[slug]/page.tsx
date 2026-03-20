import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/blogData'
import fs from 'fs'
import path from 'path'
import BlogEmailCapture from '@/components/ui/BlogEmailCapture'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

async function getContent(slug: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export default async function BlogPost({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug)
  if (!post) notFound()

  const raw = await getContent(params.slug)
  if (!raw) notFound()

  // Simple MDX → HTML conversion for static rendering
  const lines = raw.split('\n')
  const bodyLines = lines.filter(l => !l.startsWith('---') && l.trim() !== '---')
  const body = bodyLines.join('\n')

  return (
    <>
      <main className="bg-white dark:bg-[#0A0A0A] min-h-screen pt-24 pb-20 transition-colors">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            {/* Hero gradient bar */}
            <div className={`h-1.5 w-16 bg-gradient-to-r ${post.headerColor} rounded-full mb-6`} />
            <span className="inline-block font-body text-xs font-semibold bg-brand-gold text-brand-black px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-text dark:text-white leading-tight mb-4 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 font-body text-sm text-brand-muted dark:text-white/40">
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
                return <h1 key={i} className="font-heading text-3xl font-bold text-brand-text dark:text-white mt-10 mb-4 tracking-tight">{line.slice(2)}</h1>
              if (line.startsWith('## '))
                return <h2 key={i} className="font-heading text-2xl font-bold text-brand-text dark:text-white mt-8 mb-3 tracking-tight">{line.slice(3)}</h2>
              if (line.startsWith('### '))
                return <h3 key={i} className="font-heading text-xl font-semibold text-brand-text dark:text-white/90 mt-6 mb-2">{line.slice(4)}</h3>
              if (line.startsWith('**') && line.endsWith('**') && line.length > 4)
                return <p key={i} className="font-body text-base font-bold text-brand-text dark:text-white my-2">{line.slice(2, -2)}</p>
              if (line.startsWith('*') && line.endsWith('*') && line.length > 2)
                return <p key={i} className="font-body text-sm text-brand-muted dark:text-white/50 italic my-2">{line.slice(1, -1)}</p>
              if (line.startsWith('> '))
                return (
                  <blockquote key={i} className="border-l-4 border-brand-gold pl-4 my-4">
                    <p className="font-body text-base text-brand-text dark:text-white/80 italic">{line.slice(2)}</p>
                  </blockquote>
                )
              if (line.startsWith('- ') || line.startsWith('• '))
                return (
                  <div key={i} className="flex items-start gap-2 my-1.5">
                    <span className="text-brand-gold mt-1 flex-shrink-0">•</span>
                    <p className="font-body text-base text-brand-text dark:text-white/80 leading-relaxed">{line.slice(2)}</p>
                  </div>
                )
              if (line.startsWith('---'))
                return <hr key={i} className="border-brand-border dark:border-white/10 my-8" />
              if (line.match(/^\|.+\|$/))
                return null
              if (line.trim() === '')
                return <div key={i} className="my-3" />
              return (
                <p key={i} className="font-body text-base text-brand-text dark:text-white/80 leading-relaxed my-3">{line}</p>
              )
            })}
          </div>

          {/* Email capture */}
          <BlogEmailCapture />

          {/* End CTA */}
          <div className="mt-8 bg-brand-gold-pale dark:bg-brand-gold/8 border border-brand-gold/20 dark:border-brand-gold/15 rounded-2xl p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-brand-text dark:text-white mb-2">Ready to automate your GTM?</h3>
            <p className="font-body text-sm text-brand-muted dark:text-white/50 mb-4">100 free credits. No card required. Setup in 24 hours.</p>
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black font-body font-semibold rounded-full px-6 py-3 hover:bg-brand-gold-dim transition-all hover:scale-[1.03]"
            >
              Start your free trial →
            </a>
          </div>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <a href="/blog" className="font-body text-sm text-brand-muted dark:text-white/30 hover:text-brand-gold dark:hover:text-brand-gold transition-colors">
              ← Back to all posts
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
