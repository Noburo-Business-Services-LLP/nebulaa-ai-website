'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/lib/blogData'
import SectionLabel from '@/components/ui/SectionLabel'
import HudCard from '@/components/ui/HudCard'
import BlogEmailCapture from '@/components/ui/BlogEmailCapture'

const categories = ['All', 'GTM Experiments', 'Founder Mistakes', 'Comparisons', 'GTM Strategy', 'Marketing Automation', 'Founder Playbook']

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

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

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-semibold rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold text-[#1A1208]'
                    : 'bg-surface-2 text-muted hover:text-ink border border-rule'
                }`}
              >
                {cat}
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
                    <div className={`h-36 bg-gradient-to-br ${post.headerColor} relative`}>
                      <span className="absolute bottom-3 left-4 font-body text-xs font-semibold bg-gold text-[#1A1208] px-3 py-1 rounded-full">
                        {post.category}
                      </span>
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
