'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { blogPosts } from '@/lib/blogData'
import SectionLabel from '@/components/ui/SectionLabel'
import BlogEmailCapture from '@/components/ui/BlogEmailCapture'

const categories = ['All', 'GTM Experiments', 'Founder Mistakes', 'Comparisons', 'GTM Strategy', 'Marketing Automation', 'Founder Playbook']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory)

  return (
    <>
      <main className="bg-white dark:bg-[#0A0A0A] min-h-screen pt-24 pb-20 transition-colors">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <SectionLabel className="mb-4 block">The Playbook</SectionLabel>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-brand-text dark:text-white tracking-tight mb-3">
              GTM playbooks that actually get implemented.
            </h1>
            <p className="font-body text-base text-brand-muted dark:text-white/50">No theory. Just what works for founders with no time.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-semibold rounded-full px-4 py-1.5 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-gold text-brand-black'
                    : 'bg-brand-warm-gray dark:bg-white/5 text-brand-muted dark:text-white/50 hover:text-brand-text dark:hover:text-white border border-brand-border dark:border-white/10'
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
                  className="bg-white dark:bg-[#111110] rounded-2xl border border-brand-border dark:border-white/8 overflow-hidden hover:shadow-card-hover dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 group block"
                >
                  <div className={`h-36 bg-gradient-to-br ${post.headerColor} relative`}>
                    <span className="absolute bottom-3 left-4 font-body text-xs font-semibold bg-brand-gold text-brand-black px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-semibold text-base text-brand-text dark:text-white mb-2 group-hover:text-brand-gold transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-brand-muted dark:text-white/50 line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-brand-border dark:border-white/8 pt-3">
                      <span className="font-body text-xs text-brand-muted-2 dark:text-white/30">{post.readTime} · {post.date}</span>
                      <span className="font-body text-xs font-semibold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </>
  )
}
