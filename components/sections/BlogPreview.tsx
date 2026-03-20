'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { blogPosts } from '@/lib/blogData'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

export default function BlogPreview() {
  return (
    <section id="blog" className="bg-white dark:bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="flex items-end justify-between mb-12">
          <div>
            <motion.div variants={fadeUpVariant}><SectionLabel className="mb-3 block">The Nebulaa Blog</SectionLabel></motion.div>
            <motion.h2 variants={fadeUpVariant} className="font-heading font-bold text-3xl md:text-4xl text-brand-text dark:text-white tracking-tight max-w-lg">
              GTM playbooks that actually get implemented.
            </motion.h2>
          </div>
          <motion.a variants={fadeUpVariant} href="/blog" className="hidden md:block font-body text-sm font-semibold text-brand-gold hover:underline whitespace-nowrap">
            View all posts →
          </motion.a>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              variants={fadeUpVariant}
              className="bg-white dark:bg-[#1A1815] rounded-2xl border border-brand-border dark:border-white/10 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group block"
            >
              {/* Header gradient */}
              <div className={`h-44 bg-gradient-to-br ${post.headerColor} relative`}>
                <span className="absolute bottom-3 left-4 font-body text-xs font-semibold bg-brand-gold text-brand-black px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading font-semibold text-base text-brand-text dark:text-white line-clamp-2 mb-2 group-hover:text-brand-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-brand-muted dark:text-white/50 line-clamp-2 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-brand-border dark:border-white/10 pt-3">
                  <span className="font-body text-xs text-brand-muted-2 dark:text-white/30">{post.author} · {post.readTime}</span>
                  <span className="font-body text-xs font-semibold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} className="md:hidden text-center mt-8">
          <a href="/blog" className="font-body text-sm font-semibold text-brand-gold hover:underline">View all posts →</a>
        </motion.div>
      </div>
    </section>
  )
}
