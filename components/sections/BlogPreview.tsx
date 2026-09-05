'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { blogPosts } from '@/lib/blogData'
import { fadeUpVariant, staggerContainer, viewportOptions } from '@/lib/animations'

export default function BlogPreview() {
  return (
    <section id="blog" className="py-[130px] px-6 md:px-12 lg:px-[120px]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="flex items-end justify-between mb-[62px]"
      >
        <div className="max-w-[640px]">
          <motion.div variants={fadeUpVariant}>
            <SectionLabel className="mb-[22px] block">The Nebulaa Blog</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="font-heading text-[42px] leading-[1.12] tracking-[-0.02em] font-medium">
            Notes from <span className="italic text-brand-gold">the work.</span>
          </motion.h2>
        </div>
        <motion.a
          variants={fadeUpVariant}
          href="/blog"
          className="hidden md:block font-body text-[14.5px] font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors whitespace-nowrap"
        >
          View all posts →
        </motion.a>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {blogPosts.map((post) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            variants={fadeUpVariant}
            className="bg-brand-dark-surface border border-white/[0.06] rounded-[18px] overflow-hidden hover:border-brand-gold/[0.18] transition-colors duration-300 group block"
          >
            <div className={`h-44 bg-gradient-to-br ${post.headerColor} relative`}>
              <span className="absolute bottom-3 left-4">
                <SectionLabel tone="muted">{post.category}</SectionLabel>
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-[19px] font-medium text-white line-clamp-2 mb-3 group-hover:text-brand-gold transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="font-body text-[14.5px] text-white/55 line-clamp-2 mb-5 leading-[1.68]">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                <span className="font-body text-[13px] text-white/35">{post.author} · {post.readTime}</span>
                <span className="font-body text-[13px] font-semibold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOptions} className="md:hidden text-center mt-8">
        <a href="/blog" className="font-body text-[14.5px] font-semibold text-brand-gold hover:text-brand-gold-dim transition-colors">View all posts →</a>
      </motion.div>
    </section>
  )
}
