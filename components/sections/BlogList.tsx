'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/lib/blogData'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import BlogEmailCapture from '@/components/ui/BlogEmailCapture'

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  // A tag clicked on a post page (a different route) links here as
  // /blog?tag=X — read once on mount so that link actually lands filtered
  // rather than dropping the visitor on the unfiltered index.
  const searchParams = useSearchParams()
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') || 'All')
  // The filter bar is whatever tags actually exist across these posts, not a
  // fixed list — a tag that no post carries yet shouldn't show as a filter
  // with nothing behind it, and a new tag typed in the editor appears here
  // the moment a post uses it.
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))]
  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tags.includes(activeTag))

  return (
    <>
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <SectionLabel className="mb-4 block">Nebulaa Labs</SectionLabel>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-ink tracking-tight mb-3">
              Experiments. Systems. Signals.
            </h1>
            <p className="font-body text-base text-muted">No theory. Just what works for founders with no time.</p>
          </div>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`font-body text-sm font-semibold rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  activeTag === tag
                    ? 'bg-gold text-[#1A1208]'
                    : 'bg-surface-2 text-muted hover:text-ink border border-rule'
                }`}
              >
                {tag === 'All' ? tag : `#${tag}`}
              </button>
            ))}
          </div>

          {/* Email capture banner */}
          <div className="mb-10">
            <BlogEmailCapture />
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filtered.map(post => (
                <motion.a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group block"
                >
                  <HudCard halo="amber" className="overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                    <div className={`h-36 bg-gradient-to-br ${post.headerColor} relative flex items-end gap-1.5 p-4 flex-wrap`}>
                      {post.tags.slice(0, 2).map(tag => (
                        <button
                          key={tag}
                          onClick={e => {
                            e.preventDefault()
                            setActiveTag(tag)
                          }}
                          className="font-body text-xs font-semibold bg-gold text-[#1A1208] px-3 py-1 rounded-full hover:brightness-110 transition"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                    <div className="p-5">
                      <h2 className="font-heading font-semibold text-base text-ink mb-2 group-hover:text-gold-text transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="font-body text-sm text-muted line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between border-t border-rule pt-3">
                        <span className="font-body text-xs text-faint">{post.readTime} · {post.date}</span>
                        <span className="font-body text-xs font-semibold text-gold-text opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                      </div>
                    </div>
                  </HudCard>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </>
  )
}
